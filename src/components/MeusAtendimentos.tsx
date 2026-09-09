"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

type Agendamento = {
  id: string;
  data: string;
  horario: string;
  observacoes: string | null;
  status: string;
};

const STATUS_LABEL: Record<string, string> = {
  aguardando_confirmacao: "Aguardando confirmação",
  confirmado: "Confirmado",
  realizado: "Realizado",
  cancelado: "Cancelado",
};

const STATUS_COR: Record<string, string> = {
  aguardando_confirmacao: "bg-rosegold-300/40 text-wine",
  confirmado: "bg-blush-300/60 text-wine",
  realizado: "bg-blush-100 text-graphite",
  cancelado: "bg-graphite/10 text-graphite/70",
};

function formatarData(iso: string) {
  const [ano, mes, dia] = iso.split("-").map(Number);
  return new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type Estado =
  | { tipo: "carregando" }
  | { tipo: "sem_supabase" }
  | { tipo: "deslogada" }
  | { tipo: "erro" }
  | { tipo: "pronto"; agendamentos: Agendamento[] };

export function MeusAtendimentos() {
  // Checar a existência do cliente no inicializador (em vez de num efeito)
  // evita um setState síncrono logo no primeiro efeito.
  const [estado, setEstado] = useState<Estado>(() =>
    getSupabaseBrowserClient() ? { tipo: "carregando" } : { tipo: "sem_supabase" }
  );

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    let ativo = true;
    (async () => {
      const { data: sessao } = await supabase.auth.getSession();
      if (!sessao.session) {
        if (ativo) setEstado({ tipo: "deslogada" });
        return;
      }

      const { data, error } = await supabase
        .from("agendamentos")
        .select("id, data, horario, observacoes, status")
        .order("data", { ascending: false });

      if (!ativo) return;
      if (error) {
        setEstado({ tipo: "erro" });
      } else {
        setEstado({ tipo: "pronto", agendamentos: (data as Agendamento[]) ?? [] });
      }
    })();

    return () => {
      ativo = false;
    };
  }, []);

  if (estado.tipo === "carregando") {
    return <p className="text-center text-sm text-graphite/60">Carregando…</p>;
  }

  if (estado.tipo === "sem_supabase") {
    return (
      <p className="mx-auto max-w-md text-center text-sm text-graphite/70">
        Essa área ainda não está disponível. Você pode agendar normalmente
        pelo formulário.
      </p>
    );
  }

  if (estado.tipo === "deslogada") {
    return (
      <div className="mx-auto max-w-md text-center">
        <p className="text-sm text-graphite/70">
          Você precisa entrar na sua conta para ver seus atendimentos.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-full bg-wine px-8 py-3 font-body text-sm font-semibold text-white shadow-lg shadow-wine/30 transition-transform hover:scale-105"
        >
          Entrar
        </Link>
      </div>
    );
  }

  if (estado.tipo === "erro") {
    return (
      <p className="mx-auto max-w-md text-center text-sm text-graphite/70">
        Não consegui carregar seus atendimentos agora. Tente novamente em
        instantes.
      </p>
    );
  }

  if (estado.agendamentos.length === 0) {
    return (
      <div className="mx-auto max-w-md text-center">
        <p className="text-sm text-graphite/70">
          Você ainda não tem nenhum atendimento agendado.
        </p>
        <Link
          href="/agendamento"
          className="mt-4 inline-block rounded-full bg-wine px-8 py-3 font-body text-sm font-semibold text-white shadow-lg shadow-wine/30 transition-transform hover:scale-105"
        >
          Agendar atendimento
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {estado.agendamentos.map((agendamento) => (
        <div
          key={agendamento.id}
          className="rounded-2xl border border-blush-200 bg-white p-6 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-display text-lg font-semibold text-wine">
              {formatarData(agendamento.data)} às {agendamento.horario}
            </p>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_COR[agendamento.status] ?? "bg-blush-100 text-graphite"}`}
            >
              {STATUS_LABEL[agendamento.status] ?? agendamento.status}
            </span>
          </div>
          {agendamento.observacoes && (
            <p className="mt-2 text-sm text-graphite/70">{agendamento.observacoes}</p>
          )}
        </div>
      ))}
    </div>
  );
}
