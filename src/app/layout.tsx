import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Isadora França Silva | Biomedicina Estética",
  description:
    "Site profissional de Isadora França Silva, biomédica esteta em Contagem/MG. Em construção.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
