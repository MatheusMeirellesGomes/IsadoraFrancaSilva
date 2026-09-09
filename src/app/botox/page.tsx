import Link from "next/link";
import { Header } from "@/components/Header";

export default function BotoxPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="bg-gradient-to-b from-blush-300 via-blush-100 to-white px-6 py-16 text-center sm:py-20">
          <p className="mb-3 font-display text-sm uppercase tracking-[0.25em] text-rosegold-600">
            Biomedicina Estética
          </p>
          <h1 className="font-display text-4xl font-semibold text-wine sm:text-5xl">
            Botox
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-body text-base text-graphite/80">
            Aplico toxina botulínica com técnica, segurança e respeito ao
            que já é bonito em você.
          </p>
        </section>

        <section className="mx-auto grid max-w-4xl gap-6 px-6 py-16 sm:grid-cols-2">
          <div className="rounded-3xl border border-blush-200 bg-blush-50/60 p-8 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-wine">
              Produto utilizado
            </h2>
            <p className="mt-3 font-body text-sm text-graphite/80">
              Trabalho com Dysport, uma toxina botulínica tipo A consolidada
              e reconhecida no mercado, que escolhi pela qualidade e
              precisão de resultado.
            </p>
          </div>

          <div className="rounded-3xl border border-blush-200 bg-blush-50/60 p-8 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-wine">
              Filosofia de atendimento
            </h2>
            <p className="mt-3 font-body text-sm text-graphite/80">
              A prioridade é sempre a sua naturalidade. Zelo pela segurança
              em cada etapa do procedimento e evito o exagero — o objetivo
              é realçar sua autoestima, nunca alterar quem você é.
            </p>
          </div>
        </section>

        <section className="bg-blush-100/60 py-16">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="font-display text-2xl font-semibold text-wine">
              Valor
            </h2>
            <p className="mt-3 font-body text-3xl font-semibold text-wine">
              A partir de R$ 750
            </p>
            <p className="mt-2 font-body text-sm text-graphite/70">
              Valor inicial de lançamento, sujeito a atualização.
            </p>
            <Link
              href="/agendamento"
              className="mt-8 inline-block rounded-full bg-wine px-8 py-3 font-body text-sm font-semibold text-white shadow-lg shadow-wine/30 transition-transform hover:scale-105"
            >
              Agendar atendimento
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
