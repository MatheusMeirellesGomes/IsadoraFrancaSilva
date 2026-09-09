import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PainelAdministrativo } from "@/components/PainelAdministrativo";

export const metadata: Metadata = {
  title: "Painel | Isadora França Silva",
  description: "Painel administrativo — agendamentos e pacientes.",
};

export default function PainelPage() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-gradient-to-br from-white via-blush-100 to-blush-200 px-6 py-14 sm:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[.18em] text-[#794354]">Área restrita</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-wine">Painel</h1>
        </div>
        <PainelAdministrativo />
      </main>
    </>
  );
}
