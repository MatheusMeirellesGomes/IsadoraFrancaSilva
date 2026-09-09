import Link from "next/link";
import { Header } from "@/components/Header";

type PlaceholderPageProps = {
  title: string;
  etapa: string;
};

/** Página provisória para rotas do menu cujo conteúdo ainda não foi construído. */
export function PlaceholderPage({ title, etapa }: PlaceholderPageProps) {
  return (
    <>
      <Header />
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-white px-6 text-center">
        <h1 className="font-display text-3xl font-semibold text-wine">{title}</h1>
        <p className="max-w-md font-body text-sm text-graphite/70">
          Esta página está em construção — chega na {etapa} do roadmap.
        </p>
        <Link
          href="/inicio"
          className="font-body text-sm font-medium text-rosegold-600 hover:underline"
        >
          ← Voltar para a página inicial
        </Link>
      </main>
    </>
  );
}
