"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { isAdminSession } from "@/lib/isAdminSession";

type Agendamento = {
  id: string;
  data: string;
  horario: string;
  observacoes: string | null;
  status: string;
  procedimento_realizado_em: string | null;
  clientes: { nome: string; whatsapp: string; email: string | null } | null;
};

type Paciente = {
  id: string;
  nome: string;
  whatsapp: string;
  email: string | null;
  aceita_lembretes: boolean;
  criado_em: string;
};

const STATUS_OPCOES = [
  { valor: "aguardando_confirmacao", rotulo: "Aguardando confirmação" },
  { valor: "confirmado", rotulo: "Confirmado" },
  { valor: "realizado", rotulo: "Realizado" },
  { valor: "cancelado", rotulo: "Cancelado" },
];

function formatarData(iso: string) {
  const [ano, mes, dia] = iso.split("-").map(Number);
  return new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function hojeISO() {
  const hoje = new Date();
  return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
}

type Estado =
  | { tipo: "carregando" }
  | { tipo: "sem_supabase" }
  | { tipo: "sem_acesso" }
  | { tipo: "erro" }
  | { tipo: "pronto" };

export function PainelAdministrativo() {
  const [estado, setEstado] = useState<Estado>(() =>
    getSupabaseBrowserClient() ? { tipo: "carregando" } : { tipo: "sem_supabase" }
  );
  const [aba, setAba] = useState<"agendamentos" | "pacientes">("agendamentos");
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [salvandoId, setSalvandoId] = useState<string | null>(null);

  async function carregar() {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    const [respAgendamentos, respPacientes] = await Promise.all([
      supabase
        .from("agendamentos")
        .select("id, data, horario, observacoes, status, procedimento_realizado_em, clientes(nome, whatsapp, email)")
        .order("data", { ascending: false }),
      supabase
        .from("clientes")
        .select("id, nome, whatsapp, email, aceita_lembretes, criado_em")
        .order("criado_em", { ascending: false }),
    ]);

    if (respAgendamentos.error || respPacientes.error) {
      setEstado({ tipo: "erro" });
      return;
    }

    setAgendamentos((respAgendamentos.data as unknown as Agendamento[]) ?? []);
    setPacientes((respPacientes.data as Paciente[]) ?? []);
    setEstado({ tipo: "pronto" });
  }

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    let ativo = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!isAdminSession(data.session)) {
        if (ativo) setEstado({ tipo: "sem_acesso" });
        return;
      }
      await carregar();
    })();

    return () => {
      ativo = false;
    };
  }, []);

  async function alterarStatus(agendamento: Agendamento, novoStatus: string) {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    setSalvandoId(agendamento.id);
    await supabase
      .from("agendamentos")
      .update({
        status: novoStatus,
        procedimento_realizado_em: novoStatus === "realizado" ? hojeISO() : null,
      })
      .eq("id", agendamento.id);
    await carregar();
    setSalvandoId(null);
  }

  if (estado.tipo === "carregando") {
    return <p className="text-center text-sm text-graphite/60">Carregando…</p>;
  }

  if (estado.tipo === "sem_supabase") {
    return (
      <p className="mx-auto max-w-md text-center text-sm text-graphite/70">
        O painel ainda não está disponível.
      </p>
    );
  }

  if (estado.tipo === "sem_acesso") {
    return (
      <div className="mx-auto max-w-md text-center">
        <p className="text-sm text-graphite/70">
          Esta área é exclusiva da administradora. Entre com a conta
          autorizada para acessar.
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
        Não consegui carregar o painel agora. Tente novamente em instantes.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => setAba("agendamentos")}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
            aba === "agendamentos" ? "bg-wine text-white" : "bg-white text-graphite border border-blush-300"
          }`}
        >
          Agendamentos ({agendamentos.length})
        </button>
        <button
          type="button"
          onClick={() => setAba("pacientes")}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
            aba === "pacientes" ? "bg-wine text-white" : "bg-white text-graphite border border-blush-300"
          }`}
        >
          Pacientes ({pacientes.length})
        </button>
      </div>

      {aba === "agendamentos" && (
        <div className="space-y-4">
          {agendamentos.length === 0 && (
            <p className="text-center text-sm text-graphite/60">Nenhum agendamento ainda.</p>
          )}
          {agendamentos.map((agendamento) => (
            <div key={agendamento.id} className="rounded-2xl border border-blush-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-display text-lg font-semibold text-wine">
                    {agendamento.clientes?.nome ?? "Cliente removido"}
                  </p>
                  <p className="text-sm text-graphite/70">
                    {formatarData(agendamento.data)} às {agendamento.horario}
                  </p>
                  {agendamento.clientes && (
                    <p className="mt-1 text-sm text-graphite/70">
                      {agendamento.clientes.whatsapp}
                      {agendamento.clientes.email ? ` · ${agendamento.clientes.email}` : ""}
                    </p>
                  )}
                  {agendamento.observacoes && (
                    <p className="mt-2 text-sm italic text-graphite/70">
                      &ldquo;{agendamento.observacoes}&rdquo;
                    </p>
                  )}
                </div>
                <select
                  value={agendamento.status}
                  disabled={salvandoId === agendamento.id}
                  onChange={(event) => alterarStatus(agendamento, event.target.value)}
                  className="rounded-xl border border-blush-300 px-3 py-2 text-sm outline-rosegold-500"
                >
                  {STATUS_OPCOES.map((opcao) => (
                    <option key={opcao.valor} value={opcao.valor}>
                      {opcao.rotulo}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {aba === "pacientes" && (
        <div className="space-y-4">
          {pacientes.length === 0 && (
            <p className="text-center text-sm text-graphite/60">Nenhuma paciente ainda.</p>
          )}
          {pacientes.map((paciente) => (
            <div key={paciente.id} className="rounded-2xl border border-blush-200 bg-white p-6 shadow-sm">
              <p className="font-display text-lg font-semibold text-wine">{paciente.nome}</p>
              <p className="text-sm text-graphite/70">{paciente.whatsapp}</p>
              {paciente.email && <p className="text-sm text-graphite/70">{paciente.email}</p>}
              <p className="mt-2 text-xs text-graphite/50">
                {paciente.aceita_lembretes ? "Aceita lembretes de cuidado por e-mail" : "Não aceita lembretes por e-mail"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
