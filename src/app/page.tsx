import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Isadora França Silva | Biomedicina Estética",
  description:
    "Botox aplicado com técnica, segurança e cuidado — no conforto da sua casa, em Contagem/MG.",
};

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
        <section className="portrait-hero">
          <div className="portrait-layout">
            <div className="portrait-copy">
              <p className="portrait-eyebrow">Isadora França Silva · Biomedicina Estética</p>
              <h1 className="portrait-heading">
                Cuidado que acolhe.<br />
                <span>Beleza que é sua.</span>
              </h1>
              <p className="portrait-intro">
                Sou Isadora França. Meu atendimento une atenção aos detalhes,
                acolhimento e respeito à sua naturalidade.
              </p>
              <p className="portrait-description">
                Levo esse cuidado até você, com atendimento domiciliar
                e aplicação de toxina botulínica.
              </p>
              <div className="portrait-actions">
                <Link href="/botox" className="portrait-primary">Conhecer o botox <span aria-hidden="true">↗</span></Link>
                <Link href="/sobre" className="portrait-secondary">Sobre mim <span aria-hidden="true">→</span></Link>
              </div>
              <div className="portrait-credentials">
                <span>Formada em Biomedicina pela UNA</span>
                <span>Contagem · MG</span>
              </div>
            </div>
            <figure className="portrait-composition">
              <div className="portrait-outline" aria-hidden="true" />
              <div className="portrait-photo">
                <Image
                  src="/images/isadora-franca.jpeg"
                  alt="Isadora França Silva sorrindo, usando jaleco branco."
                  fill
                  priority
                  sizes="(max-width: 767px) 90vw, 480px"
                  className="portrait-image"
                />
              </div>
              <div className="portrait-seal" aria-hidden="true">
                <span>IF</span>
              </div>
              <figcaption className="portrait-caption">
                <span className="font-display">Isadora França</span>
                <span>Biomedicina Estética</span>
              </figcaption>
            </figure>
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
