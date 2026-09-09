import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { emailCuidadosCliente, emailNotificacaoIsadora, type DadosAgendamento } from "@/lib/agendamentoEmails";

export const runtime = "nodejs";
// Proteção local por processo. Antes de publicar, usar limite distribuído no gateway (ver src/app/api/helena/route.ts).
let windowStart = Date.now();
let requests = 0;
const reply = (error: string, status: number) => NextResponse.json({ error }, { status });
const configured = () => Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);

function validDados(value: unknown): value is DadosAgendamento {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.nome === "string" && v.nome.trim().length > 0 && v.nome.length <= 200 &&
    typeof v.whatsapp === "string" && v.whatsapp.trim().length > 0 && v.whatsapp.length <= 40 &&
    typeof v.dataFormatada === "string" && v.dataFormatada.length <= 100 &&
    typeof v.horario === "string" && v.horario.length <= 20 &&
    (v.observacoes === undefined || (typeof v.observacoes === "string" && v.observacoes.length <= 1000)) &&
    (v.email === undefined || (typeof v.email === "string" && v.email.length <= 200)) &&
    typeof v.aceitaLembretes === "boolean"
  );
}

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) return reply("Origem inválida.", 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return reply("Formato inválido.", 415);
  // Sem chave configurada: não é erro do cliente, só não há o que enviar ainda.
  if (!configured()) return NextResponse.json({ enviado: false, motivo: "não configurado" }, { status: 202 });
  if (Date.now() - windowStart > 60_000) { windowStart = Date.now(); requests = 0; }
  if (requests >= 20) return reply("Muitas solicitações. Tente novamente em instantes.", 429);

  let body: unknown;
  try { body = await request.json(); } catch { return reply("Mensagem inválida.", 400); }
  if (!validDados(body)) return reply("Dados inválidos.", 400);
  requests++;

  const dados = body;
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL!;
  const enviados: string[] = [];

  try {
    if (process.env.ISADORA_NOTIFICATION_EMAIL) {
      const { assunto, texto } = emailNotificacaoIsadora(dados);
      await resend.emails.send({
        from,
        to: process.env.ISADORA_NOTIFICATION_EMAIL,
        subject: assunto,
        text: texto,
      });
      enviados.push("isadora");
    }

    if (dados.aceitaLembretes && dados.email?.trim()) {
      const { assunto, texto } = emailCuidadosCliente(dados);
      await resend.emails.send({
        from,
        to: dados.email.trim(),
        subject: assunto,
        text: texto,
      });
      enviados.push("cliente");
    }
  } catch {
    // Falha no envio de e-mail nunca deve travar o agendamento — o WhatsApp já é o canal principal e garantido.
    return NextResponse.json({ enviado: false, motivo: "falha no envio" }, { status: 502 });
  }

  return NextResponse.json({ enviado: true, destinatarios: enviados });
}
