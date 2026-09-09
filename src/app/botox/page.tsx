import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { CONTACTS } from "@/lib/contacts";

export const metadata: Metadata = {
  title: "Botox e Dysport | Isadora França Silva",
  description: "Conheça a toxina botulínica utilizada por Isadora França, entenda o efeito temporário, a importância da avaliação e tire suas dúvidas.",
};
const source = "https://www.ipsen.com/brazil/wp-content/uploads/sites/22/2025/06/Dysport_Bula-Paciente-Patient.pdf";
const questions = [
  { title: "Quando aparece o efeito?", answer: "O efeito é gradual. A bula descreve resposta significativa geralmente entre 7 e 14 dias e efeito máximo dentro de um mês. O tempo varia entre pessoas e indicações." },
  { title: "Quanto tempo dura?", answer: "A bula informa duração aproximada de 3 a 4 meses na maior parte dos casos. Isso não é uma garantia individual nem define, sozinho, quando repetir a aplicação." },
  { title: "Quem precisa de atenção especial?", answer: "Informe alergias, doenças, medicamentos, gestação ou amamentação. Alergia aos componentes e infecção no local de aplicação são contraindicações. A avaliação individual é indispensável." },
  { title: "Quais cuidados devo ter?", answer: "Peça orientações individualizadas antes e depois do procedimento. Se surgirem dificuldades para respirar, engolir ou falar após a aplicação, procure assistência médica imediatamente." },
  { title: "Como posso saber mais sobre o atendimento?", answer: "Você pode conversar comigo pelo WhatsApp para esclarecer suas dúvidas e consultar as informações do atendimento. O contato não confirma automaticamente um agendamento." },
];

export default function BotoxPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-gradient-to-br from-white via-blush-100 to-blush-200 px-6 py-14 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm uppercase tracking-[.18em] text-[#794354]">Conhecer o procedimento</p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-wine sm:text-6xl">Botox, com cuidado<br /><span className="italic text-[#8e485d]">e informação.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-graphite">Meu foco é valorizar a sua naturalidade. Aqui, explico o produto que utilizo e o que considerar antes de decidir pelo procedimento.</p>
            <a href="#duvidas" className="contact-link mt-6 inline-block">Veja as dúvidas frequentes ↓</a>
          </div>
        </section>

        <section className="mx-auto grid max-w-5xl gap-10 px-6 py-14 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-sm uppercase tracking-widest text-[#794354]">O produto que utilizo</p>
            <h2 className="mt-3 font-display text-3xl text-wine">Conheça o Dysport</h2>
            <p className="mt-5 text-base leading-8">Trabalho com Dysport®, uma preparação de toxina botulínica tipo A. Ela reduz temporariamente a atividade dos músculos tratados e tem indicação para linhas faciais relacionadas à contração muscular.</p>
            <p className="mt-4 text-base leading-8">A escolha do tratamento depende de avaliação profissional. O resultado e sua duração variam; não existe promessa de um efeito idêntico para todas as pessoas.</p>
          </div>
          <aside className="rounded-3xl border border-blush-200 bg-blush-50 p-7 sm:p-9">
            <h2 className="font-display text-2xl text-wine">Naturalidade como prioridade</h2>
            <p className="mt-4 text-base leading-8">Zelo pelo cuidado em cada etapa e pela atenção aos detalhes. Minha proposta é acolher suas dúvidas e respeitar o que você busca, sem incentivar exageros.</p>
            <p className="mt-5 border-t border-blush-200 pt-5 text-base leading-8">Antes de qualquer decisão, é importante conversar sobre expectativas, histórico de saúde e se o procedimento é adequado para você.</p>
          </aside>
        </section>

        <section id="duvidas" className="scroll-mt-28 bg-blush-50 px-6 py-14">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm uppercase tracking-widest text-[#794354]">Para decidir com informação</p>
            <h2 className="mt-3 font-display text-3xl text-wine">Suas dúvidas, com clareza</h2>
            <div className="mt-8 divide-y divide-blush-200 border-y border-blush-200">
              {questions.map(({title, answer}) => (
                <details key={title} className="botox-faq py-1">
                  <summary className="cursor-pointer py-5 pr-3 text-base font-medium text-wine">{title}</summary>
                  <p className="pb-6 pr-4 text-base leading-8 text-graphite">{answer}</p>
                </details>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-[#625459]">Informações educativas baseadas na <a href={source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">bula do paciente de Dysport — Ipsen (PDF, nova aba)</a>. Não substituem uma avaliação individual. Consulte a bula para a lista completa de riscos e precauções.</p>
          </div>
        </section>

        <section className="px-6 py-14">
          <div className="mx-auto grid max-w-5xl gap-8 rounded-3xl bg-wine p-8 text-white sm:p-12 md:grid-cols-2 md:items-center">
            <div><p className="text-sm uppercase tracking-widest">Valor atual</p><h2 className="mt-3 font-display text-5xl">R$ 750</h2><p className="mt-4 text-base leading-relaxed">Valor inicial, sujeito a alteração futura.</p></div>
            <div><h3 className="font-display text-2xl">Vamos conversar sobre o seu cuidado?</h3><p className="mt-3 text-base leading-relaxed">Fale comigo para tirar dúvidas e confirmar as condições do atendimento.</p><a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-full bg-white px-6 py-4 text-sm font-semibold text-wine outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">Conversar pelo WhatsApp <span aria-hidden="true">↗</span><span className="sr-only"> (abre em nova aba)</span></a></div>
          </div>
        </section>
      </main>
    </>
  );
}
