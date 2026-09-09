import { BrandPanel } from "@/components/BrandPanel";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { CONTACTS } from "@/lib/contacts";

export const metadata: Metadata = {
  title: "Atendimento domiciliar | Isadora França Silva",
  description:
    "Aplicação de botox no conforto da sua casa, em Contagem/MG, com privacidade e o mesmo cuidado de sempre.",
};

export default function AtendimentoDomiciliarPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-gradient-to-br from-white via-blush-100 to-blush-200 px-6 py-14 sm:py-20">
          <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[1.4fr_1fr]"><div>
            <p className="text-sm uppercase tracking-[.18em] text-[#794354]">
              Como eu atendo
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-wine sm:text-6xl">
              Seu botox,
              <br />
              <span className="italic text-[#8e485d]">na sua casa.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-graphite">
              Levo até você a mesma técnica, segurança e cuidado que
              ofereceria em qualquer atendimento — sem você precisar sair de
              casa.
            </p>
          </div><BrandPanel title="Um cuidado perto de você." text="Converse comigo para combinar a região, a data e os detalhes do atendimento." /></div>
        </section>

        <section className="mx-auto grid max-w-5xl gap-10 px-6 py-14 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-sm uppercase tracking-widest text-[#794354]">
              Por que atendimento domiciliar
            </p>
            <h2 className="mt-3 font-display text-3xl text-wine">
              Conforto, sem abrir mão do cuidado
            </h2>
            <p className="mt-5 text-base leading-8">
              Prefiro levar o atendimento até você: sem deslocamento, sem
              sala de espera, no seu horário e no seu ambiente. Chego com
              tudo o que preciso para o procedimento.
            </p>
            <p className="mt-4 text-base leading-8">
              A avaliação, a conversa sobre suas expectativas e o cuidado
              técnico são os mesmos de qualquer atendimento — só o lugar
              muda.
            </p>
          </div>
          <aside className="rounded-3xl border border-blush-200 bg-blush-50 p-7 sm:p-9">
            <h2 className="font-display text-2xl text-wine">
              Sua privacidade em primeiro lugar
            </h2>
            <p className="mt-4 text-base leading-8">
              Seu endereço é usado só para combinarmos o atendimento — fica
              entre nós, nunca é exposto publicamente.
            </p>
            <p className="mt-5 border-t border-blush-200 pt-5 text-base leading-8">
              Cidades e bairros atendidos, além de uma eventual taxa de
              deslocamento, são combinados diretamente com você antes da
              confirmação.
            </p>
          </aside>
        </section>

        <section className="px-6 py-14">
          <div className="mx-auto grid max-w-5xl gap-8 rounded-3xl bg-wine p-8 text-white sm:p-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm uppercase tracking-widest">
                Vamos combinar seu atendimento?
              </p>
              <h2 className="mt-3 font-display text-3xl">
                Fale comigo pelo WhatsApp
              </h2>
            </div>
            <div>
              <p className="text-base leading-relaxed">
                Conto pra você como funciona, confirmo se atendo sua região e
                combinamos data e horário.
              </p>
              <a
                href={CONTACTS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full bg-white px-6 py-4 text-sm font-semibold text-wine outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                Conversar pelo WhatsApp <span aria-hidden="true">↗</span>
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
