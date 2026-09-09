import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Bem-vinda | Isadora França Silva",
  description:
    "Entre na sua conta ou continue sem conta para conhecer o site de Isadora França Silva.",
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
