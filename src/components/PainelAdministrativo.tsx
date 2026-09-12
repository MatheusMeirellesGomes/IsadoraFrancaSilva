"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarioAgenda } from "@/components/CalendarioAgenda";
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
  { valor: "cancelado", rotulo: "Cancelado / recusado" },
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
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
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
  const [filtroData, setFiltroData] = useState(hojeISO);
  const [filtroStatus, setFiltroStatus] = useState("");
  const [aviso, setAviso] = useState("");
  const [aba, setAba] = useState<"agendamentos" | "pacientes" | "calendario">("agendamentos");
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [salvandoId, setSalvandoId] = useState<string | null>(null);

  function abrirResumo(tipo: "hoje" | "pendentes" | "confirmados" | "pacientes") {
    setBusca("");
    setFiltroData(tipo === "hoje" ? hojeISO() : "");
    setFiltroStatus(tipo === "pendentes" ? "aguardando_confirmacao" : tipo === "confirmados" ? "confirmado" : "");
    setAba(tipo === "pacientes" ? "pacientes" : "agendamentos");
  }

  const agendamentosVisiveis = agendamentos.filter(a =>
    ((aba === "calendario" ? a.data === filtroData : !filtroData || a.data === filtroData)) && (!filtroStatus || a.status === filtroStatus) &&
    [a.clientes?.nome, a.clientes?.whatsapp, a.clientes?.email].join(" ").toLowerCase().includes(busca.toLowerCase())
  ).sort((a,b) => (a.data+a.horario).localeCompare(b.data+b.horario));
  const pacientesVisiveis = pacientes.filter(p => [p.nome,p.whatsapp,p.email].join(" ").toLowerCase().includes(busca.toLowerCase()));

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
        <p className="mt-3 text-base leading-7">Aqui você organiza seus horários, confirma novos pedidos e acompanha suas clientes. Comece pela agenda de hoje ou pelas solicitações pendentes.</p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {([
            { tipo: "hoje", label: "Atendimentos hoje", count: agendamentos.filter(a => a.data === hojeISO()).length },
            { tipo: "pendentes", label: "Solicitações pendentes", count: agendamentos.filter(a => a.status === "aguardando_confirmacao").length },
            { tipo: "confirmados", label: "Confirmados", count: agendamentos.filter(a => a.status === "confirmado").length },
            { tipo: "pacientes", label: "Clientes cadastradas", count: pacientes.length },
          ] as const).map(item => <button type="button" key={item.tipo} onClick={() => abrirResumo(item.tipo)} className="rounded-2xl border border-blush-200 bg-blush-50 p-4 text-left transition hover:border-wine focus-visible:outline focus-visible:outline-2 focus-visible:outline-wine"><span className="block font-display text-3xl text-wine">{item.count}</span><span className="mt-2 block text-sm">{item.label}</span><span className="mt-3 block text-xs text-wine">Visualizar →</span></button>)}
        </div>
      </section>
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <label className="text-sm">Buscar paciente<input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Nome, telefone ou e-mail" className="mt-1 w-full rounded-xl border p-3" /></label>
        {aba === "agendamentos" && <><label className="text-sm">Dia<input type="date" value={filtroData} onChange={e=>setFiltroData(e.target.value)} className="mt-1 w-full rounded-xl border p-3" /></label><label className="text-sm">Situação<select value={filtroStatus} onChange={e=>setFiltroStatus(e.target.value)} className="mt-1 w-full rounded-xl border p-3"><option value="">Todas</option>{STATUS_OPCOES.map(o=><option key={o.valor} value={o.valor}>{o.rotulo}</option>)}</select></label></>}
      </div>
      <div className="mb-5 flex flex-wrap gap-4 text-sm text-wine"><button onClick={()=>{abrirResumo("hoje");}}>Ver hoje</button><button onClick={()=>{setBusca("");setFiltroData(aba === "calendario" ? filtroData : "");setFiltroStatus("");}}>Limpar filtros</button><button onClick={()=>carregar()}>Atualizar agenda</button></div>
      {aviso && <p role="status" className="mb-5 rounded-xl bg-white p-4 text-wine">{aviso}</p>}
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        <button type="button" aria-pressed={aba === "calendario"} onClick={() => { setAba("calendario"); setFiltroData(hojeISO()); setFiltroStatus(""); setBusca(""); }} className={`rounded-full px-5 py-2 text-sm font-medium ${aba === "calendario" ? "bg-wine text-white" : "border border-blush-300 bg-white text-graphite"}`}>Calendário</button>
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

      {aba === "calendario" && <CalendarioAgenda agendamentos={agendamentos} selecionado={filtroData} onSelecionar={dia => { setFiltroData(dia); setBusca(""); setFiltroStatus(""); }} />}

      {(aba === "agendamentos" || aba === "calendario") && (
        <div className="space-y-4">
          <h2 className="font-display text-2xl text-wine">{aba === "calendario" ? `Agendamentos de ${formatarData(filtroData)}` : filtroData === hojeISO() ? "Sua agenda de hoje" : filtroStatus === "aguardando_confirmacao" ? "Solicitações para avaliar" : "Sua agenda"}</h2>
          <p className="text-sm text-graphite/70">{agendamentosVisiveis.length} agendamento(s). Para aprovar, escolha Confirmado; para recusar, Cancelado / recusado. Ajuste a data e o horário para remarcar e salve.</p>
          {agendamentosVisiveis.length === 0 && (
            <p className="text-center text-sm text-graphite/60">Nenhum agendamento para os filtros selecionados. Consulte as solicitações pendentes ou limpe os filtros para ver toda a agenda.</p>
          )}
          {agendamentosVisiveis.map((agendamento) => (
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
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${agendamento.status === "aguardando_confirmacao" ? "bg-amber-50 text-amber-900" : agendamento.status === "confirmado" ? "bg-emerald-50 text-emerald-900" : "bg-blush-100 text-wine"}`}>{STATUS_OPCOES.find(o => o.valor === agendamento.status)?.rotulo ?? agendamento.status}</span>
                <form key={`${agendamento.data}-${agendamento.horario}-${agendamento.status}-${agendamento.procedimento_realizado_em}`} onSubmit={e=>salvar(e,agendamento)} className="grid w-full gap-3 border-t border-blush-200 pt-4 sm:grid-cols-2">
                  <label className="text-sm">Data do atendimento<input name="data" type="date" required defaultValue={agendamento.data} className="mt-1 w-full rounded-xl border p-2" /></label>
                  <label className="text-sm">Horário<input name="horario" type="time" required defaultValue={agendamento.horario.slice(0,5)} className="mt-1 w-full rounded-xl border p-2" /></label>
                  <label className="text-sm">Situação<select name="status" defaultValue={agendamento.status} className="mt-1 w-full rounded-xl border p-2">{STATUS_OPCOES.map(o=><option key={o.valor} value={o.valor}>{o.rotulo}</option>)}</select></label>
                  <label className="text-sm">Data em que realizou o procedimento<input name="realizado" type="date" max={hojeISO()} defaultValue={agendamento.procedimento_realizado_em || ""} className="mt-1 w-full rounded-xl border p-2" /></label>
                  <p className="text-xs leading-6 text-[#794354]">Ao marcar como realizado, informe a data efetiva. O lembrete de acompanhamento conta 14 dias a partir dela.</p>
                  <button disabled={salvandoId!==null} className="rounded-full bg-wine px-5 py-3 text-sm text-white disabled:opacity-50">{salvandoId===agendamento.id ? "Salvando…" : "Salvar alterações"}</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}

      {aba === "pacientes" && (
        <div className="space-y-4">
          {pacientesVisiveis.length === 0 && (
            <p className="text-center text-sm text-graphite/60">Nenhuma cliente encontrada.</p>
          )}
          {pacientesVisiveis.map((paciente) => (
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
