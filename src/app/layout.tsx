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
