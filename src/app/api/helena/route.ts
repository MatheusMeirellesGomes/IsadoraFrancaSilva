import { NextRequest, NextResponse } from "next/server";
import { HELENA_CONTEXT, validMessages } from "@/lib/helena";

export const runtime = "nodejs";
// Proteção local por processo. Antes de publicar com IA, usar limite distribuído no gateway.
let windowStart = Date.now();
let requests = 0;
let active = 0;
const reply = (error: string, status: number) => NextResponse.json({ error }, { status });
export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) return reply("Origem inválida.", 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return reply("Formato inválido.", 415);
  if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL) return reply("A conversa por IA ainda não está disponível. Use os atalhos abaixo ou fale com Isadora pelo WhatsApp.", 503);
  if (Date.now() - windowStart > 60_000) { windowStart = Date.now(); requests = 0; }
  if (requests >= 20 || active >= 3) return reply("Estou recebendo muitas mensagens. Tente novamente em um minuto.", 429);
  // Limite real de leitura, inclusive para requisições sem Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return reply("Mensagem inválida.", 400);
  let raw = "";
  let bytes = 0;
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 24_000) { await reader.cancel(); return reply("Mensagem muito longa.", 413); }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
  } catch { return reply("Não consegui ler a mensagem.", 400); }
  let body;
  try { body = JSON.parse(raw); } catch { return reply("Mensagem inválida.", 400); }
  if (!body || body.consent !== true || !validMessages(body.messages)) return reply("Confira a mensagem e o consentimento.", 400);
  requests++; active++;
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL, instructions: HELENA_CONTEXT, input: body.messages, max_output_tokens: 450, store: false }),
      signal: AbortSignal.timeout(25_000),
    });
    if (!response.ok) return reply("Não consegui responder agora. Tente novamente ou fale com Isadora pelo WhatsApp.", 502);
    const data = await response.json();
    const text = (data.output ?? []).flatMap((item: { content?: { type: string; text?: string }[] }) => item.content ?? [])
      .filter((part: { type: string }) => part.type === "output_text")
      .map((part: { text?: string }) => part.text ?? "").join("\n").trim();
    if (!text) return reply("Não consegui responder agora. Use um dos atalhos abaixo.", 502);
    return NextResponse.json({ message: text.slice(0, 1500) });
  } catch { return reply("A resposta demorou mais que o esperado. Tente novamente.", 504); }
  finally { active--; }
}
