import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { HelenaChat } from "@/components/HelenaChat";
import { Footer } from "@/components/Footer";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const TITULO = "Isadora França Silva | Biomedicina Estética";
const DESCRICAO =
  "Aplicação de botox com técnica, segurança e cuidado, no conforto da sua casa, em Contagem/MG. Agende sem precisar criar conta.";

export const metadata: Metadata = {
  metadataBase: new URL("https://isadorafrancasilva.com.br"),
  title: TITULO,
  description: DESCRICAO,
  openGraph: {
    title: TITULO,
    description: DESCRICAO,
    url: "/",
    siteName: "Isadora França Silva",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/isadora-franca.jpeg",
        width: 1320,
        height: 1371,
        alt: "Isadora França Silva sorrindo, usando jaleco branco.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRICAO,
    images: ["/images/isadora-franca.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${playfairDisplay.variable} ${poppins.variable} font-body bg-white text-graphite`}
      >
        {children}
        <Footer />
        <HelenaChat />
      </body>
    </html>
  );
}
