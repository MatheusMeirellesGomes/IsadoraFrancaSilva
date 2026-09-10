import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Entrar | Isadora França Silva",
  description:
    "Acompanhe seus atendimentos e escolha suas preferências de contato. Criar conta é opcional.",
};

export default function WelcomePage() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-white via-blush-100 to-blush-200">
        <LoginForm />
      </main>
    </>
  );
}
