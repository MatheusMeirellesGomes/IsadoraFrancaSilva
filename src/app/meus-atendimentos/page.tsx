import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { MeusAtendimentos } from "@/components/MeusAtendimentos";

export const metadata: Metadata = {
  title: "Meus atendimentos | Isadora França Silva",
  description: "Acompanhe seus atendimentos agendados com Isadora França Silva.",
};

export default function MeusAtendimentosPage() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-white via-blush-100 to-blush-200 px-6 py-14 sm:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[.18em] text-[#794354]">Minha conta</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-wine">
            Meus atendimentos
          </h1>
        </div>
        <MeusAtendimentos />
      </main>
    </>
  );
}
