import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { emailCuidadosCliente, emailNotificacaoIsadora, type DadosAgendamento } from "@/lib/agendamentoEmails";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
// Proteção local por processo. Antes de publicar, usar limite distribuído no gateway (ver src/app/api/helena/route.ts).
let windowStart = Date.now();
let requests = 0;
const reply = (error: string, status: number) => NextResponse.json({ error }, { status });
const emailConfigurado = () => Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);

function validDados(value: unknown): value is DadosAgendamento {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.nome === "string" && v.nome.trim().length > 0 && v.nome.length <= 200 &&
    typeof v.whatsapp === "string" && v.whatsapp.trim().length > 0 && v.whatsapp.length <= 40 &&
    typeof v.data === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v.data) &&
    typeof v.dataFormatada === "string" && v.dataFormatada.length <= 100 &&
    typeof v.horario === "string" && v.horario.length <= 20 &&
    (v.observacoes === undefined || (typeof v.observacoes === "string" && v.observacoes.length <= 1000)) &&
    (v.email === undefined || (typeof v.email === "string" && v.email.length <= 200)) &&
    typeof v.aceitaLembretes === "boolean"
  );
}

// Envia os e-mails do agendamento (Isadora + cliente, se aplicável). Nunca
// lança — uma falha aqui não pode derrubar a resposta nem o resto da rota.
async function enviarEmails(dados: DadosAgendamento): Promise<string[]> {
  if (!emailConfigurado()) return [];
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL!;
  const enviados: string[] = [];
  try {
    {
      const { assunto, texto, html } = emailNotificacaoIsadora(dados);
      const result = await resend.emails.send({ from, to: process.env.ISADORA_NOTIFICATION_EMAIL?.trim() || "isadorafrancasilva@gmail.com", subject: assunto, text: texto, html });
      if (!result.error && result.data) enviados.push("isadora");
    }
    if (dados.aceitaLembretes && dados.email?.trim()) {
      const { assunto, texto } = emailCuidadosCliente(dados);
      const result = await resend.emails.send({ from, to: dados.email.trim(), subject: assunto, text: texto });
      if (!result.error && result.data) enviados.push("cliente");
    }
  } catch {
    // Falha no e-mail nunca deve travar o agendamento — o WhatsApp é o canal garantido.
  }
  return enviados;
}

// Se o pedido trouxer um token de sessão válido, resolve o id do usuário
// logado — usado para ligar o agendamento à conta dele. Nunca lança.
async function getUserIdDoToken(request: NextRequest): Promise<string | null> {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.auth.getUser(auth.slice("Bearer ".length));
    if (error || !data.user) return null;
    return data.user.id;
  } catch {
    return null;
  }
}

// Persiste cliente + agendamento no Supabase. Nunca lança, mesma lógica.
// Quando userId está presente, reaproveita (ou cria e liga) um único
// registro de cliente por conta, em vez de uma linha nova a cada envio.
async function salvarNoBanco(dados: DadosAgendamento, userId: string | null): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;
  try {
    const dadosCliente = {
      nome: dados.nome,
      whatsapp: dados.whatsapp,
      email: dados.email?.trim() || null,
      aceita_lembretes: dados.aceitaLembretes,
    };

    let clienteId: string;

    if (userId) {
      const { data: existente } = await supabase
        .from("clientes")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      if (existente) {
        clienteId = existente.id;
        await supabase.from("clientes").update(dadosCliente).eq("id", clienteId);
      } else {
        const { data: novo, error } = await supabase
          .from("clientes")
          .insert({ ...dadosCliente, user_id: userId })
          .select("id")
          .single();
        if (error || !novo) return false;
        clienteId = novo.id;
      }
    } else {
      const { data: novo, error } = await supabase
        .from("clientes")
        .insert(dadosCliente)
        .select("id")
        .single();
      if (error || !novo) return false;
      clienteId = novo.id;
    }

    const { error: erroAgendamento } = await supabase.from("agendamentos").insert({
      cliente_id: clienteId,
      data: dados.data,
      horario: dados.horario,
      observacoes: dados.observacoes?.trim() || null,
      status: "aguardando_confirmacao",
    });
    return !erroAgendamento;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) return reply("Origem inválida.", 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return reply("Formato inválido.", 415);
  if (Date.now() - windowStart > 60_000) { windowStart = Date.now(); requests = 0; }
  if (requests >= 20) return reply("Muitas solicitações. Tente novamente em instantes.", 429);

  let body: unknown;
  try { body = await request.json(); } catch { return reply("Mensagem inválida.", 400); }
  if (!validDados(body)) return reply("Dados inválidos.", 400);
  requests++;

  const dados = body;
  const userId = await getUserIdDoToken(request);
  const salvoNoBanco = await salvarNoBanco(dados, userId);
  const destinatariosEmail = salvoNoBanco ? await enviarEmails(dados) : [];

  return NextResponse.json({ destinatariosEmail, salvoNoBanco });
}
