"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CONTACTS } from "@/lib/contacts";
import type { HelenaMessage } from "@/lib/helena";

const QUICK_ANSWERS = [
  { question: "Qual é o valor?", answer: "O valor atual do botox é R$ 750, inicial e sujeito a alteração futura. Confirme as condições diretamente com Isadora pelo WhatsApp." },
  { question: "Qual produto ela utiliza?", answer: "Isadora utiliza Dysport, uma toxina botulínica tipo A. A página Sobre o botox explica o procedimento e reúne dúvidas frequentes. A avaliação individual deve ser feita com a profissional." },
  { question: "Como eu agendo?", answer: "Use o atalho Agendar atendimento: preencha nome, WhatsApp, data e horário, e você será direcionada ao WhatsApp com tudo preenchido para Isadora confirmar. Não é preciso criar conta." },
  { question: "Como falar com Isadora?", answer: "Use o botão Falar com Isadora para abrir o WhatsApp (31) 99526-2194. Você pode tirar dúvidas sobre atendimento e disponibilidade. Esse contato não confirma automaticamente um agendamento." },
  { question: "Ela atende na minha casa?", answer: "Sim, o atendimento é domiciliar — Isadora vai até você. Região atendida e uma eventual taxa de deslocamento são combinadas diretamente pelo WhatsApp. Veja mais em Atendimento domiciliar." },
  { question: "Qual é a formação dela?", answer: "Isadora é formada em Biomedicina pela UNA (2021–2025). Teve experiência assistida na Clínica Dra. Ana Lemos, de julho de 2023 a abril de 2026. Conheça sua trajetória em Conhecer Isadora." },
];
export function HelenaChat() {
  const [provider, setProvider] = useState("openai");
  const [status, setStatus] = useState<"loading" | "configured" | "offline">("loading");
  const [quickAnswer, setQuickAnswer] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [consent, setConsent] = useState(false);
  const [messages, setMessages] = useState<HelenaMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);
  const launchRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const pending = useRef<AbortController | null>(null);
  const lock = useRef(false);
  useEffect(() => () => pending.current?.abort(), []);
  useEffect(() => { if (open) closeRef.current?.focus(); }, [open]);
  useEffect(() => {
    if (open && scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy, open]);
  useEffect(() => {
    const panel = panelRef.current;
    if (!open || !panel) return;
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey) return; // Preserve zoom do navegador/trackpad.
      const form = (event.target as HTMLElement).closest<HTMLElement>(".helena-form");
      const target = form && form.scrollHeight > form.clientHeight ? form : scrollRef.current;
      if (!target) return;
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? target.clientHeight : 1;
      target.scrollTop += event.deltaY * unit;
    };
    panel.addEventListener("wheel", wheel, { passive: false });
    return () => panel.removeEventListener("wheel", wheel);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    fetch("/api/helena", { signal: controller.signal, cache: "no-store" })
      .then(response => { if (!response.ok) throw new Error(); return response.json(); })
      .then(data => { setProvider(data.provider); setStatus(data.configured ? "configured" : "offline"); })
      .catch(() => { if (!controller.signal.aborted) setStatus("offline"); });
    return () => controller.abort();
  }, [open]);
  function close() { setOpen(false); launchRef.current?.focus(); }
  async function send(event: React.FormEvent) {
    event.preventDefault();
    if (!draft.trim() || !consent || status !== "configured" || lock.current) return;
    lock.current = true; setBusy(true); setError("");
    const message: HelenaMessage = { role: "user", content: draft.trim() };
    const history = [...messages.slice(-10), message];
    setMessages(history); setDraft("");
    const controller = new AbortController(); pending.current = controller;
    const timeout = setTimeout(() => controller.abort(), 95_000);
    try {
      const response = await fetch("/api/helena", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history, consent: true }), signal: controller.signal });
      const data = await response.json();
      if (!response.ok) { if (response.status === 503) setStatus("offline"); throw new Error(data.error || "Não consegui responder agora."); }
      setMessages([...history, { role: "assistant", content: data.message }]);
    } catch (reason) {
      setMessages(history.slice(0, -1)); setDraft(message.content);
      setError(reason instanceof Error && reason.name !== "AbortError" ? reason.message : "Não consegui conectar. Tente novamente ou use o WhatsApp.");
    } finally { clearTimeout(timeout); pending.current = null; lock.current = false; setBusy(false); }
  }
  return (
    <div className="helena-widget">
      {open && <section ref={panelRef} id="helena-chat" role="dialog" aria-modal="false" aria-labelledby="helena-title" className="helena-panel" onKeyDown={e => { if (e.key === "Escape") close(); }}>
        <header className="helena-header">
          <Image src="/images/helena.png" alt="" width={52} height={52} className="rounded-full" />
          <div><h2 id="helena-title">Helena</h2><p>{status === "configured" ? "Assistente virtual · IA" : "Assistente virtual · Guia do site"}</p></div>
          <button ref={closeRef} onClick={close} aria-label="Fechar conversa com Helena" className="helena-close">×</button>
        </header>
        <div ref={scrollRef} tabIndex={0} className="helena-scroll" role="log" aria-label="Conversa com Helena" aria-live="polite">
          <p className="helena-bubble">Olá! Sou a Helena, assistente virtual da Isadora. Como posso te ajudar? Posso explicar as informações do site e mostrar onde encontrar o que você procura.</p>
          <div className="helena-quick">
            <p className="text-xs text-[#794354]">Respostas rápidas do site · sem IA</p>
            {QUICK_ANSWERS.map((item, index) => <button type="button" key={item.question} onClick={() => setQuickAnswer(index)} aria-pressed={quickAnswer === index}>{item.question}</button>)}
            {quickAnswer !== null && <p className="helena-bubble mt-3"><strong className="block text-xs mb-1">Resposta pronta</strong>{QUICK_ANSWERS[quickAnswer].answer}</p>}
          </div>
          {messages.map((message, index) => <p key={index} className={`helena-bubble ${message.role === "user" ? "helena-user" : ""}`}><span className="sr-only">{message.role === "user" ? "Você" : "Helena"}: </span>{message.content}</p>)}
          {busy && <p className="text-sm text-wine" role="status">Helena está preparando uma resposta…</p>}
        </div>
        <nav aria-label="Atalhos da Helena" className="helena-shortcuts">
          <Link href="/botox" onClick={close}>Sobre o botox</Link>
          <Link href="/atendimento-domiciliar" onClick={close}>Atendimento domiciliar</Link>
          <Link href="/sobre" onClick={close}>Conhecer Isadora</Link>
          <Link href="/agendamento" onClick={close}>Agendar atendimento</Link>
          <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer">Falar com Isadora ↗<span className="sr-only"> (nova aba)</span></a>
          <a href={CONTACTS.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗<span className="sr-only"> (nova aba)</span></a>
        </nav>
        {status !== "configured" ? <div className="helena-form"><p className="text-sm leading-6 text-[#794354]" role="status">{status === "loading" ? "Verificando a conversa por IA…" : "Por enquanto, posso ajudar com as respostas rápidas acima. A conversa livre por IA ainda não está ativa."}</p></div> : <form onSubmit={send} className="helena-form">
          <label className="helena-consent"><input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} disabled={busy} />{provider === "local" ? "Aceito processar minhas mensagens pela IA local deste site." : "Aceito enviar minhas mensagens à OpenAI para receber respostas de IA."}</label>
          <p className="helena-note">Não envie dados de saúde ou documentos. A Helena pode errar e não substitui avaliação profissional. Conversa mantida só enquanto esta página estiver aberta.</p>
          {error && <p role="alert" className="helena-error">{error}</p>}
          <div className="helena-input-row"><label htmlFor="helena-message" className="sr-only">Sua mensagem</label><input id="helena-message" value={draft} onChange={e => setDraft(e.target.value)} maxLength={1000} placeholder="Escreva sua dúvida…" disabled={busy} autoComplete="off" /><button type="submit" disabled={!consent || busy || !draft.trim()} aria-label="Enviar mensagem">↑</button></div>
        </form>}
      </section>}
      <button ref={launchRef} className="helena-launch" onClick={() => open ? close() : setOpen(true)} aria-expanded={open} aria-controls="helena-chat" aria-label={open ? "Fechar Helena" : "Conversar com Helena, assistente virtual"}>
        {!open && <span className="helena-invite">Olá, sou a Helena!<small>Como posso te ajudar?</small></span>}
        <Image src="/images/helena.png" alt="" width={76} height={76} />
      </button>
    </div>
  );
}
