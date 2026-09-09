"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CONTACTS } from "@/lib/contacts";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

type FormState = {
  nome: string;
  whatsapp: string;
  email: string;
  data: string;
  horario: string;
  observacoes: string;
  aceitaLembretes: boolean;
};

const EMPTY_FORM: FormState = {
  nome: "",
  whatsapp: "",
  email: "",
  data: "",
  horario: "",
  observacoes: "",
  aceitaLembretes: false,
};

function formatDataParaMensagem(valor: string) {
  const [ano, mes, dia] = valor.split("-").map(Number);
  const data = new Date(ano, mes - 1, dia);
  return data.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getDataMinima() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function montarMensagem(form: FormState) {
  const linhas = [
    "Olá, Isadora! Gostaria de agendar um atendimento.",
    `Nome: ${form.nome}`,
    `Data desejada: ${formatDataParaMensagem(form.data)}`,
    `Horário: ${form.horario}`,
    `Observações: ${form.observacoes.trim() || "—"}`,
  ];
  if (form.email.trim()) {
    linhas.push(`E-mail: ${form.email.trim()}`);
    linhas.push(
      form.aceitaLembretes
        ? "Aceito receber lembretes de cuidado por e-mail."
        : "Não quero lembretes de cuidado por e-mail."
    );
  }
  linhas.push("", "Aguardo a confirmação, obrigada!");
  return linhas.join("\n");
}

// Canal auxiliar (e-mail + banco) — nunca bloqueia nem afeta o WhatsApp,
// que é o canal garantido. Se a cliente estiver logada, manda o token da
// sessão para o agendamento ficar ligado à conta dela ("Meus
// atendimentos"); sem Supabase configurado, segue sem token normalmente.
async function notificarAgendamento(form: FormState) {
  const supabase = getSupabaseBrowserClient();
  let accessToken: string | undefined;
  if (supabase) {
    const { data } = await supabase.auth.getSession();
    accessToken = data.session?.access_token;
  }

  await fetch("/api/agendamento", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify({
      nome: form.nome,
      whatsapp: form.whatsapp,
      email: form.email || undefined,
      data: form.data,
      dataFormatada: formatDataParaMensagem(form.data),
      horario: form.horario,
      observacoes: form.observacoes || undefined,
      aceitaLembretes: form.aceitaLembretes,
    }),
  });
}

export function BookingForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  useEffect(() => {
    let active = true;
    const supabase = getSupabaseBrowserClient();
    supabase?.auth.getUser().then(({data}) => {
      if (!active || !data.user) return;
      const user = data.user;
      setForm(current => ({...current, email: current.email || user.email || "", whatsapp: current.whatsapp || user.user_metadata.telefone || "", aceitaLembretes: Boolean(user.user_metadata.aceita_lembretes_email)}));
    });
    return () => { active = false; };
  }, []);
  function atualizar<K extends keyof FormState>(campo: K, valor: FormState[K]) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  }

  function enviar(event: React.FormEvent) {
    event.preventDefault();
    const mensagem = montarMensagem(form);
    const url = `${CONTACTS.whatsapp}?text=${encodeURIComponent(mensagem)}`;
    // window.open precisa ficar aqui, síncrono no clique — se entrasse
    // depois de um await, navegadores podem bloquear como pop-up.
    window.open(url, "_blank", "noopener,noreferrer");
    notificarAgendamento(form).catch(() => {});
  }

  return (
    <form onSubmit={enviar} className="mx-auto max-w-xl space-y-5">
      <div>
        <label htmlFor="nome" className="mb-1 block text-sm font-medium text-wine">
          Nome
        </label>
        <input
          id="nome"
          required
          value={form.nome}
          onChange={(event) => atualizar("nome", event.target.value)}
          className="w-full rounded-xl border border-blush-300 px-4 py-3 text-base outline-rosegold-500"
          placeholder="Seu nome completo"
        />
      </div>

      <div>
        <label htmlFor="whatsapp" className="mb-1 block text-sm font-medium text-wine">
          WhatsApp
        </label>
        <input
          id="whatsapp"
          type="tel"
          required
          value={form.whatsapp}
          onChange={(event) => atualizar("whatsapp", event.target.value)}
          className="w-full rounded-xl border border-blush-300 px-4 py-3 text-base outline-rosegold-500"
          placeholder="(31) 9XXXX-XXXX"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-wine">
          E-mail <span className="font-normal text-graphite/60">(opcional)</span>
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(event) => {
            const email = event.target.value;
            setForm((atual) => ({
              ...atual,
              email,
              aceitaLembretes: email.trim() ? atual.aceitaLembretes : false,
            }));
          }}
          className="w-full rounded-xl border border-blush-300 px-4 py-3 text-base outline-rosegold-500"
          placeholder="seuemail@exemplo.com"
        />
        <label className="mt-2 flex items-start gap-2 text-sm text-graphite/80">
          <input
            type="checkbox"
            checked={form.aceitaLembretes}
            disabled={!form.email.trim()}
            onChange={(event) => atualizar("aceitaLembretes", event.target.checked)}
            className="mt-0.5"
          />
          <span>
            Quero receber lembretes de cuidado por e-mail depois do
            atendimento. (Precisa de um e-mail preenchido acima.)
          </span>
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="data" className="mb-1 block text-sm font-medium text-wine">
            Data desejada
          </label>
          <input
            id="data"
            type="date"
            required
            min={getDataMinima()}
            value={form.data}
            onChange={(event) => atualizar("data", event.target.value)}
            className="w-full rounded-xl border border-blush-300 px-4 py-3 text-base outline-rosegold-500"
          />
        </div>
        <div>
          <label htmlFor="horario" className="mb-1 block text-sm font-medium text-wine">
            Horário
          </label>
          <input
            id="horario"
            type="time"
            required
            value={form.horario}
            onChange={(event) => atualizar("horario", event.target.value)}
            className="w-full rounded-xl border border-blush-300 px-4 py-3 text-base outline-rosegold-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="observacoes" className="mb-1 block text-sm font-medium text-wine">
          Observações <span className="font-normal text-graphite/60">(opcional)</span>
        </label>
        <textarea
          id="observacoes"
          rows={3}
          value={form.observacoes}
          onChange={(event) => atualizar("observacoes", event.target.value)}
          className="w-full rounded-xl border border-blush-300 px-4 py-3 text-base outline-rosegold-500"
          placeholder="Alguma informação que Isadora deva saber antes do atendimento?"
        />
      </div>

      <p className="text-sm text-graphite/70">
        Não é preciso criar conta. Ao confirmar, você será direcionada ao
        WhatsApp com esses dados já preenchidos — Isadora confirma, remarca
        ou cancela diretamente com você por lá. Veja a{" "}
        <Link href="/politica-de-privacidade" className="underline underline-offset-4 hover:text-wine">
          Política de Privacidade
        </Link>{" "}
        e a{" "}
        <Link href="/politica-de-cancelamento" className="underline underline-offset-4 hover:text-wine">
          Política de Cancelamento
        </Link>
        .
      </p>

      <button
        type="submit"
        className="w-full rounded-full bg-wine px-8 py-3 font-body text-sm font-semibold text-white shadow-lg shadow-wine/30 transition-transform hover:scale-105"
      >
        Continuar no WhatsApp
      </button>
    </form>
  );
}
