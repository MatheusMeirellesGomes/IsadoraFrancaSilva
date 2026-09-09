import { Logo } from "@/components/Logo";

const swatches = [
  { name: "blush-100", className: "bg-blush-100", textOn: "text-graphite" },
  { name: "blush-300", className: "bg-blush-300", textOn: "text-graphite" },
  { name: "blush-500", className: "bg-blush-500", textOn: "text-white" },
  { name: "rosegold-500", className: "bg-rosegold-500", textOn: "text-white" },
  { name: "wine", className: "bg-wine", textOn: "text-white" },
  { name: "graphite", className: "bg-graphite", textOn: "text-white" },
];

/**
 * Página temporária de identidade visual (Etapa 2). A página inicial
 * definitiva, com cabeçalho e navegação, chega na Etapa 3.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-12 bg-white px-6 py-16 text-center">
      <Logo />

      <p className="max-w-md text-sm text-graphite/70">
        Identidade visual em validação — site em construção.
      </p>

      <section className="w-full max-w-2xl">
        <h2 className="mb-4 font-display text-sm uppercase tracking-[0.2em] text-rosegold-600">
          Paleta
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {swatches.map((swatch) => (
            <div
              key={swatch.name}
              className={`${swatch.className} ${swatch.textOn} flex h-20 items-end rounded-lg p-2 text-xs font-medium`}
            >
              {swatch.name}
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-2xl text-left">
        <h2 className="mb-4 text-center font-display text-sm uppercase tracking-[0.2em] text-rosegold-600">
          Tipografia
        </h2>
        <p className="font-display text-3xl font-semibold text-wine">
          Isadora França Silva
        </p>
        <p className="font-body text-base text-graphite">
          Biomedicina Estética — atendimento humanizado, seguro e natural.
        </p>
      </section>
    </main>
  );
}
