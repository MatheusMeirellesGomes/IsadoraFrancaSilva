import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { CONTACTS } from "@/lib/contacts";

export const metadata: Metadata = {
  title: "Política de Cancelamento | Isadora França Silva",
  description: "Como funciona o cancelamento ou remarcação do seu atendimento.",
};

export default function PoliticaDeCancelamentoPage() {
  return (
    <>
      <Header />
      <main className="bg-white px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm uppercase tracking-[.18em] text-[#794354]">Combinado com clareza</p>
          <h1 className="mt-4 font-display text-4xl text-wine">Política de Cancelamento</h1>
          <p className="mt-3 text-sm text-graphite/60">Última atualização: 09 de setembro de 2026.</p>

          <div className="mt-10 space-y-6 text-base leading-8 text-graphite">
            <p>
              O agendamento pelo site nunca é confirmado automaticamente —
              ele começa como &quot;aguardando confirmação&quot; e eu
              confirmo, remarco ou cancelo diretamente com você pelo
              WhatsApp.
            </p>
            <p>
              Se você precisar cancelar ou remarcar, me avise assim que
              possível pelo{" "}
              <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-link">
                WhatsApp
              </a>{" "}
              — conversamos e encontramos o melhor horário para as duas.
            </p>
            <p className="rounded-2xl bg-blush-100 p-5 text-sm leading-7 text-wine">
              Ainda não defini um prazo mínimo de aviso nem uma taxa para
              cancelamentos de última hora. Enquanto isso não for formalizado,
              cada caso é combinado individualmente pelo WhatsApp. Esta
              página será atualizada assim que essas condições forem
              definidas.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
