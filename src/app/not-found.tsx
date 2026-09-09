import Link from "next/link";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-white px-6 text-center">
        <p className="text-sm uppercase tracking-[.18em] text-[#794354]">Página não encontrada</p>
        <h1 className="font-display text-4xl font-semibold text-wine">Ops, esse link não existe.</h1>
        <p className="max-w-md text-base text-graphite/70">
          A página que você procura pode ter mudado de endereço ou nunca
          existiu. Vamos te levar de volta.
        </p>
        <Link
          href="/inicio"
          className="mt-4 inline-block rounded-full bg-wine px-8 py-3 font-body text-sm font-semibold text-white shadow-lg shadow-wine/30 transition-transform hover:scale-105"
        >
          Voltar para a página inicial
        </Link>
      </main>
    </>
  );
}
