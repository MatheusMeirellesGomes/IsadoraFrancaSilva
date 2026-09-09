"use client";

import { useState } from "react";
import { CONTACTS } from "@/lib/contacts";

type FormState = {
  nome: string;
  whatsapp: string;
  data: string;
  horario: string;
  observacoes: string;
};

const EMPTY_FORM: FormState = {
  nome: "",
  whatsapp: "",
  data: "",
  horario: "",
  observacoes: "",
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
    "",
    "Aguardo a confirmação, obrigada!",
  ];
  return linhas.join("\n");
}

export function BookingForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  function atualizar<K extends keyof FormState>(campo: K, valor: FormState[K]) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  }

  function enviar(event: React.FormEvent) {
    event.preventDefault();
    const mensagem = montarMensagem(form);
    const url = `${CONTACTS.whatsapp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank", "noopener,noreferrer");
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
        ou cancela diretamente com você por lá.
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
