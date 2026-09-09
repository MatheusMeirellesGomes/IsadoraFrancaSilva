import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { BookingForm } from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Agendamento | Isadora França Silva",
  description:
    "Solicite seu atendimento domiciliar com Isadora França Silva — sem precisar criar conta.",
};

export default function AgendamentoPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-gradient-to-br from-white via-blush-100 to-blush-200 px-6 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[.18em] text-[#794354]">
              Vamos agendar?
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-wine sm:text-5xl">
              Solicitar atendimento
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-graphite">
              Preencha seus dados e escolha o dia e horário que preferir. Eu
              confirmo com você diretamente pelo WhatsApp.
            </p>
          </div>
        </section>

        <section className="px-6 py-14">
          <BookingForm />
        </section>
      </main>
    </>
  );
}
