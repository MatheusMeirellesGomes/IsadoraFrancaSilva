"use client";

import { useState } from "react";

type Pedido = { data: string; status: string };
type Props = { agendamentos: Pedido[]; selecionado: string; onSelecionar: (dia: string) => void };

export function CalendarioAgenda({ agendamentos, selecionado, onSelecionar }: Props) {
  const hoje = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const [mes, setMes] = useState(() => (selecionado || hoje).slice(0, 7));
  const [ano, numeroMes] = mes.split("-").map(Number);
  const inicio = new Date(ano, numeroMes - 1, 1);
  const total = new Date(ano, numeroMes, 0).getDate();
  const titulo = inicio.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  function mover(delta: number) {
    const data = new Date(ano, numeroMes - 1 + delta, 1);
    const novoMes = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}`;
    setMes(novoMes);
    onSelecionar(`${novoMes}-01`);
  }
  const dias = Array.from({ length: Math.ceil((inicio.getDay() + total) / 7) * 7 }, (_, i) => {
    const dia = i - inicio.getDay() + 1;
    return dia > 0 && dia <= total ? `${mes}-${String(dia).padStart(2, "0")}` : null;
  });
  return <section aria-label="Calendário de agendamentos" className="mb-8 overflow-hidden rounded-3xl border border-blush-200 bg-white shadow-sm">
    <div className="flex flex-wrap items-center justify-between gap-4 bg-blush-50 p-5 sm:p-7">
      <div><p className="text-xs uppercase tracking-widest text-[#794354]">Um dia de cada vez, Isadora</p><h2 aria-live="polite" className="mt-2 font-display text-2xl capitalize text-wine sm:text-3xl">{titulo}</h2></div>
      <div className="flex items-center gap-2"><button type="button" aria-label="Mês anterior" onClick={() => mover(-1)} className="h-11 w-11 rounded-full border border-blush-300 bg-white text-wine">←</button><button type="button" onClick={() => { setMes(hoje.slice(0,7)); onSelecionar(hoje); }} className="h-11 rounded-full bg-wine px-5 text-sm text-white">Hoje</button><button type="button" aria-label="Próximo mês" onClick={() => mover(1)} className="h-11 w-11 rounded-full border border-blush-300 bg-white text-wine">→</button></div>
    </div>
    <p className="px-5 pt-5 text-sm text-graphite/70">Escolha uma data para ver as clientes e organizar os horários abaixo.</p>
    <div className="p-2 sm:p-5">
      <div className="grid grid-cols-7 text-center text-xs font-medium text-[#794354]">{['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].map(dia => <div key={dia} className="py-3">{dia}</div>)}</div>
      <div className="grid grid-cols-7 gap-1 sm:gap-2">{dias.map((data, i) => {
        if (!data) return <div key={`vazio-${i}`} aria-hidden="true" />;
        const pedidos = agendamentos.filter(a => a.data === data);
        const pendentes = pedidos.filter(a => a.status === "aguardando_confirmacao").length;
        const ativo = data === selecionado;
        return <button type="button" key={data} aria-pressed={ativo} aria-current={data === hoje ? "date" : undefined} aria-label={`${Number(data.slice(-2))} de ${titulo}, ${pedidos.length} agendamentos, ${pendentes} pendentes${data === hoje ? ', hoje' : ''}`} onClick={() => onSelecionar(data)} className={`flex min-h-20 min-w-0 flex-col items-center justify-start rounded-xl border px-1 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine sm:min-h-24 ${ativo ? 'border-wine bg-wine text-white shadow-md' : data === hoje ? 'border-wine bg-blush-50 text-wine' : 'border-blush-100 text-graphite hover:border-blush-300 hover:bg-blush-50'}`}>
          <span className="text-base font-semibold">{Number(data.slice(-2))}</span>
          {pedidos.length > 0 && <span className={`mt-2 text-[10px] sm:text-xs ${ativo ? 'text-white' : 'text-[#794354]'}`}>{pedidos.length}<span className="hidden sm:inline"> agend.</span></span>}
          {pendentes > 0 && <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />}
        </button>;
      })}</div>
    </div>
    <div className="flex flex-wrap items-center gap-4 border-t border-blush-100 px-5 py-4 text-xs text-graphite/70"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-400" />Há pedidos aguardando confirmação</span><span>Os totais incluem cancelados, para preservar o histórico.</span></div>
  </section>;
}
