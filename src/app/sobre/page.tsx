import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { CONTACTS } from "@/lib/contacts";

export const metadata: Metadata = {
  title: "Sobre mim | Isadora França Silva",
  description: "Conheça a formação em Biomedicina pela UNA, a experiência e a forma de cuidar de Isadora França Silva, em Contagem/MG.",
};

export default function SobrePage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-gradient-to-br from-white via-blush-100 to-blush-200">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 md:grid-cols-2 md:gap-16 md:py-16">
            <div>
              <p className="text-sm uppercase tracking-[.18em] text-[#794354]">Sobre mim</p>
              <h1 className="mt-4 font-display text-4xl leading-tight text-wine sm:text-5xl">Sou Isadora França.<br /><span className="italic text-[#8e485d]">Prazer em te receber.</span></h1>
              <p className="mt-6 text-lg leading-8">Sou formada em Biomedicina pelo Centro Universitário UNA e estou em Contagem, Minas Gerais. Minha trajetória reúne formação acadêmica e experiência prática em ambiente clínico, com foco na estética.</p>
              <p className="mt-4 text-base leading-8">Acredito no cuidado que começa pela escuta. Acolhimento, atenção aos detalhes e respeito à sua naturalidade orientam a forma como quero estar presente em cada atendimento.</p>
            </div>
            <figure className="portrait-composition mx-auto w-full max-w-md">
              <div className="portrait-outline" aria-hidden="true" />
              <div className="portrait-photo"><Image src="/images/isadora-franca.jpeg" alt="Isadora França Silva sorrindo, de jaleco branco." fill priority sizes="(max-width: 767px) 90vw, 448px" className="portrait-image" /></div>
              <figcaption className="portrait-caption"><span className="font-display">Isadora França</span><span>Biomedicina Estética</span></figcaption>
            </figure>
          </div>
        </section>

        <section className="mx-auto grid max-w-5xl gap-10 px-6 py-14 md:grid-cols-[1fr_1.6fr]">
          <div><p className="text-sm uppercase tracking-widest text-[#794354]">Minha trajetória</p><h2 className="mt-3 font-display text-3xl text-wine">Conhecimento<br />e experiência.</h2></div>
          <div className="space-y-9 border-l border-blush-300 pl-6 sm:pl-9">
            <article><p className="text-sm font-medium text-[#794354]">2021 — 2025</p><h3 className="mt-2 font-display text-2xl text-wine">Graduação em Biomedicina</h3><p className="mt-3 text-base leading-8">Concluí minha formação no Centro Universitário UNA, construindo a base acadêmica da minha atuação.</p></article>
            <article><p className="text-sm font-medium text-[#794354]">Julho de 2023 — abril de 2026</p><h3 className="mt-2 font-display text-2xl text-wine">Vivência na Clínica Dra. Ana Lemos</h3><p className="mt-3 text-base leading-8">Em Contagem, auxiliei em procedimentos estéticos faciais e corporais e acompanhei avaliação, preparo e cuidados antes e depois do atendimento.</p><p className="mt-3 text-base leading-8">Tive experiência prática assistida com toxina botulínica, preenchimentos, bioestimuladores, fios de PDO e peelings. Também acompanhei rotinas em ambiente cirúrgico, sem realizar cirurgias.</p><p className="mt-4 rounded-xl bg-blush-100 p-4 text-sm leading-7 text-wine">Essa vivência faz parte da minha experiência anterior. Atualmente, o procedimento que ofereço de forma autônoma é a aplicação de toxina botulínica.</p></article>
          </div>
        </section>

        <section className="bg-blush-50 px-6 py-14">
          <div className="mx-auto max-w-5xl"><p className="text-sm uppercase tracking-widest text-[#794354]">Além da graduação</p><h2 className="mt-3 font-display text-3xl text-wine">Cursos e treinamentos</h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              <li className="rounded-2xl border border-blush-200 bg-white p-6"><h3 className="font-display text-xl text-wine">Peelings químicos</h3><p className="mt-3 text-base leading-7">Curso de Gerenciamento de Peelings Químicos com o professor Márcio Guidomi.</p></li>
              <li className="rounded-2xl border border-blush-200 bg-white p-6"><h3 className="font-display text-xl text-wine">Estética avançada</h3><p className="mt-3 text-base leading-7">Participação em workshops práticos na área da estética.</p></li>
              <li className="rounded-2xl border border-blush-200 bg-white p-6"><h3 className="font-display text-xl text-wine">Técnicas injetáveis</h3><p className="mt-3 text-base leading-7">Treinamento em harmonização facial e técnicas injetáveis.</p></li>
            </ul>
            <p className="mt-5 text-sm leading-7 text-[#625459]">Os cursos integram minha trajetória de aprendizado; não representam uma lista de serviços disponíveis.</p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-14 text-center"><p className="text-sm uppercase tracking-widest text-[#794354]">Meu jeito de cuidar</p><h2 className="mt-3 font-display text-3xl text-wine">Quero que você se sinta ouvida.</h2><p className="mt-5 text-lg leading-8">Meu compromisso é com um atendimento humanizado, cuidadoso e atento à sua individualidade. Quero acolher suas dúvidas e conversar com clareza sobre suas expectativas.</p><a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="portrait-primary mt-7">Converse comigo pelo WhatsApp <span aria-hidden="true">↗</span><span className="sr-only"> (nova aba)</span></a></section>
      </main>
    </>
  );
}
