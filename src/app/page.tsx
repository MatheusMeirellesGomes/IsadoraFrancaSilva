import Link from "next/link";
import { Header } from "@/components/Header";
import { Hero3DLoader } from "@/components/Hero3DLoader";

const DIFERENCIAIS = [
  "Atendimento humanizado e acolhedor",
  "Atenção aos detalhes",
  "Segurança clínica",
  "Naturalidade dos resultados",
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="relative overflow-hidden bg-gradient-to-b from-blush-300 via-blush-100 to-white">
          <div className="mx-auto grid max-w-5xl items-center gap-8 px-6 py-16 sm:py-24 md:grid-cols-2">
            <div className="text-center md:text-left">
              <p className="mb-3 font-display text-sm uppercase tracking-[0.25em] text-rosegold-600">
                Biomedicina Estética
              </p>
              <h1 className="font-display text-4xl font-semibold leading-tight text-wine sm:text-5xl">
                Isadora França Silva
              </h1>
              <p className="mx-auto mt-4 max-w-md font-body text-base text-graphite/80 md:mx-0">
                Aplico botox com técnica, segurança e cuidado — no conforto
                da sua casa, em Contagem/MG.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
                <Link
                  href="/agendamento"
                  className="rounded-full bg-wine px-8 py-3 font-body text-sm font-semibold text-white shadow-lg shadow-wine/30 transition-transform hover:scale-105"
                >
                  Agendar atendimento
                </Link>
                <Link
                  href="/botox"
                  className="rounded-full border border-rosegold-500 px-8 py-3 font-body text-sm font-semibold text-wine transition-colors hover:bg-blush-100"
                >
                  Conhecer o botox
                </Link>
              </div>
            </div>

            <div className="mx-auto h-64 w-64 sm:h-80 sm:w-80">
              <Hero3DLoader />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="mb-8 text-center font-display text-2xl font-semibold text-wine">
            Por que me escolher
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {DIFERENCIAIS.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-blush-200 bg-blush-50/60 p-5 text-center shadow-sm"
              >
                <p className="font-body text-sm font-medium text-graphite">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-blush-100/60 py-16">
          <div className="mx-auto grid max-w-5xl gap-6 px-6 sm:grid-cols-2">
            <Link
              href="/botox"
              className="group rounded-3xl bg-white p-8 shadow-md shadow-blush-300/40 transition-transform hover:-translate-y-1"
            >
              <h3 className="font-display text-xl font-semibold text-wine">Botox</h3>
              <p className="mt-2 font-body text-sm text-graphite/80">
                Entenda como funciona a aplicação, os cuidados e o que
                esperar do procedimento.
              </p>
              <span className="mt-4 inline-block font-body text-sm font-medium text-rosegold-600 group-hover:underline">
                Saiba mais →
              </span>
            </Link>

            <Link
              href="/atendimento-domiciliar"
              className="group rounded-3xl bg-white p-8 shadow-md shadow-blush-300/40 transition-transform hover:-translate-y-1"
            >
              <h3 className="font-display text-xl font-semibold text-wine">
                Atendimento domiciliar
              </h3>
              <p className="mt-2 font-body text-sm text-graphite/80">
                Vou até você, com todo o cuidado e praticidade que sua
                rotina merece.
              </p>
              <span className="mt-4 inline-block font-body text-sm font-medium text-rosegold-600 group-hover:underline">
                Saiba mais →
              </span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
