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
  const [busca, setBusca] = useState("");
  const [filtroData, setFiltroData] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [aviso, setAviso] = useState("");
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

  async function salvar(event: React.FormEvent<HTMLFormElement>, agendamento: Agendamento) {
    event.preventDefault();
    const supabase = getSupabaseBrowserClient();
    if (!supabase || salvandoId) return;
    const fields = new FormData(event.currentTarget);
    const status = String(fields.get("status"));
    const realizado = String(fields.get("realizado") || "");
    if (status === "realizado" && (!realizado || realizado > hojeISO())) { setAviso("Informe a data real do procedimento, até hoje."); return; }
    const data = String(fields.get("data"));
    const horario = String(fields.get("horario"));
    if (status === "confirmado" && agendamentos.some(a => a.id !== agendamento.id && a.status === "confirmado" && a.data === data && a.horario.slice(0,5) === horario.slice(0,5))) { setAviso("Já existe atendimento confirmado nesse horário. Escolha outro horário."); return; }
    setSalvandoId(agendamento.id); setAviso("");
    try {
      const { data: atualizado, error } = await supabase.from("agendamentos").update({status, data, horario, procedimento_realizado_em: status === "realizado" ? realizado : null}).eq("id", agendamento.id).select("id").single();
      if (error || !atualizado) throw new Error();
      await carregar(); setAviso("Atendimento atualizado. Combine qualquer mudança também com a paciente.");
    } catch { setAviso("Não consegui salvar. Nenhuma confirmação de alteração foi recebida; tente novamente."); }
    finally { setSalvandoId(null); }
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
          href="/entrar"
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
    <div className="mx-auto max-w-5xl">
      <section className="mb-8 rounded-3xl bg-white p-7 shadow-sm">
        <p className="text-sm text-[#794354]">Seu espaço de organização</p>
        <h2 className="mt-2 font-display text-3xl text-wine">Olá, Isadora.</h2>
        <p className="mt-3 text-base leading-7">Vamos cuidar da sua agenda? Veja seus atendimentos, acompanhe solicitações e encontre suas pacientes.</p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[['Hoje', agendamentos.filter(a=>a.data===hojeISO() && a.status!=="cancelado").length], ['Aguardando',agendamentos.filter(a=>a.status==="aguardando_confirmacao").length], ['Confirmados',agendamentos.filter(a=>a.status==="confirmado").length], ['Pacientes',pacientes.length]].map(([label,count])=><div key={label} className="rounded-xl bg-blush-50 p-4"><p className="font-display text-3xl text-wine">{count}</p><p className="text-sm">{label}</p></div>)}
        </div>
      </section>
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <label className="text-sm">Buscar paciente<input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Nome, telefone ou e-mail" className="mt-1 w-full rounded-xl border p-3" /></label>
        {aba === "agendamentos" && <><label className="text-sm">Dia<input type="date" value={filtroData} onChange={e=>setFiltroData(e.target.value)} className="mt-1 w-full rounded-xl border p-3" /></label><label className="text-sm">Situação<select value={filtroStatus} onChange={e=>setFiltroStatus(e.target.value)} className="mt-1 w-full rounded-xl border p-3"><option value="">Todas</option>{STATUS_OPCOES.map(o=><option key={o.valor} value={o.valor}>{o.rotulo}</option>)}</select></label></>}
      </div>
      <div className="mb-5 flex gap-4 text-sm text-wine"><button onClick={()=>{setFiltroData(hojeISO());setAba("agendamentos");}}>Ver hoje</button><button onClick={()=>{setBusca("");setFiltroData("");setFiltroStatus("");}}>Limpar filtros</button><button onClick={()=>carregar()}>Atualizar agenda</button></div>
      {aviso && <p role="status" className="mb-5 rounded-xl bg-white p-4 text-wine">{aviso}</p>}
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
          {agendamentos.filter(a => (!filtroData || a.data === filtroData) && (!filtroStatus || a.status === filtroStatus) && [a.clientes?.nome,a.clientes?.whatsapp,a.clientes?.email].join(" ").toLowerCase().includes(busca.toLowerCase())).sort((a,b)=> (a.data+a.horario).localeCompare(b.data+b.horario)).map((agendamento) => (
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
                <form onSubmit={e=>salvar(e,agendamento)} className="grid w-full gap-3 border-t border-blush-200 pt-4 sm:grid-cols-2">
                  <label className="text-sm">Data do atendimento<input name="data" type="date" required defaultValue={agendamento.data} className="mt-1 w-full rounded-xl border p-2" /></label>
                  <label className="text-sm">Horário<input name="horario" type="time" required defaultValue={agendamento.horario.slice(0,5)} className="mt-1 w-full rounded-xl border p-2" /></label>
                  <label className="text-sm">Situação<select name="status" defaultValue={agendamento.status} className="mt-1 w-full rounded-xl border p-2">{STATUS_OPCOES.map(o=><option key={o.valor} value={o.valor}>{o.rotulo}</option>)}</select></label>
                  <label className="text-sm">Data em que realizou o procedimento<input name="realizado" type="date" max={hojeISO()} defaultValue={agendamento.procedimento_realizado_em || ""} className="mt-1 w-full rounded-xl border p-2" /></label>
                  <p className="text-xs leading-6 text-[#794354]">Ao marcar como realizado, informe a data efetiva. O lembrete de acompanhamento conta 14 dias a partir dela.</p>
                  <button disabled={salvandoId!==null} className="rounded-full bg-wine px-5 py-3 text-sm text-white disabled:opacity-50">{salvandoId===agendamento.id ? "Salvando…" : "Salvar atendimento"}</button>
                </form>
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
          {pacientes.filter(p=>[p.nome,p.whatsapp,p.email].join(" ").toLowerCase().includes(busca.toLowerCase())).map((paciente) => (
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
