import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { emailAcompanhamento14Dias } from "@/lib/agendamentoEmails";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

type ClienteRelacionado = { nome: string; email: string | null; aceita_lembretes: boolean };

function autorizado(request: NextRequest): boolean {
  const esperado = process.env.CRON_SECRET;
  if (!esperado) return false;
  return request.headers.get("authorization") === `Bearer ${esperado}`;
}

// Data de 14 dias atrás, em YYYY-MM-DD (fuso local do servidor).
function dataAlvoISO(): string {
  const data = new Date();
  data.setDate(data.getDate() - 14);
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

/**
 * Disparado 1x por dia pelo Vercel Cron (ver vercel.json). Busca
 * agendamentos marcados como "realizado" há exatamente 14 dias, com
 * consentimento de lembretes e ainda não notificados, e envia o e-mail
 * de acompanhamento — marcando lembrete_enviado_em para nunca duplicar.
 */
export async function GET(request: NextRequest) {
  if (!autorizado(request)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ enviados: 0, motivo: "Supabase não configurado." });
  }
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return NextResponse.json({ enviados: 0, motivo: "Resend não configurado." });
  }

  const { data: agendamentos, error } = await supabase
    .from("agendamentos")
    .select("id, clientes(nome, email, aceita_lembretes)")
    .eq("status", "realizado")
    .eq("procedimento_realizado_em", dataAlvoISO())
    .is("lembrete_enviado_em", null);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL;
  let enviados = 0;

  for (const agendamento of agendamentos ?? []) {
    const cliente = agendamento.clientes as unknown as ClienteRelacionado | null;
    if (!cliente?.email || !cliente.aceita_lembretes) continue;

    try {
      const { assunto, texto } = emailAcompanhamento14Dias(cliente.nome);
      await resend.emails.send({ from, to: cliente.email, subject: assunto, text: texto });
      await supabase
        .from("agendamentos")
        .update({ lembrete_enviado_em: new Date().toISOString() })
        .eq("id", agendamento.id);
      enviados++;
    } catch {
      // Uma falha de envio não deve travar os demais agendamentos do dia.
    }
  }

  return NextResponse.json({ enviados, total: agendamentos?.length ?? 0 });
}
