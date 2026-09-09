"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

type Modo = "entrar" | "criar" | "esqueci";

const TITULOS: Record<Modo, string> = {
  entrar: "Entrar",
  criar: "Criar minha conta",
  esqueci: "Esqueci minha senha",
};

export function LoginForm() {
  const [modo, setModo] = useState<Modo>("entrar");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  async function enviar(event: React.FormEvent) {
    event.preventDefault();
    setErro("");
    setMensagem("");

    if (!supabase) {
      setErro(
        "O login ainda não está disponível. Você pode continuar sem conta para agendar normalmente."
      );
      return;
    }

    setCarregando(true);
    try {
      if (modo === "entrar") {
        const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
        if (error) throw error;
        router.push("/inicio");
        return;
      }

      if (modo === "criar") {
        const { error } = await supabase.auth.signUp({ email, password: senha });
        if (error) throw error;
        setMensagem("Conta criada! Verifique seu e-mail para confirmar o cadastro.");
        return;
      }

      // modo === "esqueci"
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      setMensagem("Se este e-mail tiver uma conta, você vai receber um link para redefinir a senha.");
    } catch (erroCapturado) {
      setErro(
        erroCapturado instanceof Error
          ? erroCapturado.message
          : "Não consegui completar essa ação. Tente novamente."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 py-16">
      <Logo className="mb-8" />

      <div className="w-full rounded-3xl border border-blush-200 bg-white p-8 shadow-lg shadow-blush-300/30">
        <h1 className="mb-6 text-center font-display text-2xl font-semibold text-wine">
          {TITULOS[modo]}
        </h1>

        <form onSubmit={enviar} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="mb-1 block text-sm font-medium text-wine">
              E-mail
            </label>
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-blush-300 px-4 py-3 text-base outline-rosegold-500"
              placeholder="seuemail@exemplo.com"
            />
          </div>

          {modo !== "esqueci" && (
            <div>
              <label htmlFor="login-senha" className="mb-1 block text-sm font-medium text-wine">
                Senha
              </label>
              <input
                id="login-senha"
                type="password"
                required
                minLength={6}
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                className="w-full rounded-xl border border-blush-300 px-4 py-3 text-base outline-rosegold-500"
                placeholder="••••••••"
              />
            </div>
          )}

          {erro && (
            <p role="alert" className="text-sm text-red-700">
              {erro}
            </p>
          )}
          {mensagem && (
            <p role="status" className="text-sm text-wine">
              {mensagem}
            </p>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-full bg-wine px-8 py-3 font-body text-sm font-semibold text-white shadow-lg shadow-wine/30 transition-transform hover:scale-105 disabled:opacity-60"
          >
            {carregando ? "Enviando…" : TITULOS[modo]}
          </button>
        </form>

        <div className="mt-5 flex flex-col items-center gap-2 text-sm">
          {modo === "entrar" && (
            <>
              <button
                type="button"
                onClick={() => { setModo("criar"); setErro(""); setMensagem(""); }}
                className="font-medium text-rosegold-600 hover:underline"
              >
                Criar minha conta
              </button>
              <button
                type="button"
                onClick={() => { setModo("esqueci"); setErro(""); setMensagem(""); }}
                className="text-graphite/70 hover:underline"
              >
                Esqueci minha senha
              </button>
            </>
          )}
          {modo !== "entrar" && (
            <button
              type="button"
              onClick={() => { setModo("entrar"); setErro(""); setMensagem(""); }}
              className="font-medium text-rosegold-600 hover:underline"
            >
              Já tenho conta — entrar
            </button>
          )}
        </div>
      </div>

      <Link
        href="/inicio"
        className="mt-6 w-full rounded-full border-2 border-wine px-8 py-3 text-center font-body text-sm font-semibold text-wine transition-colors hover:bg-blush-100"
      >
        Continuar sem conta
      </Link>
      <p className="mt-3 max-w-sm text-center text-xs text-graphite/60">
        Não é preciso criar conta para navegar ou agendar. A conta é só
        para você acompanhar seus próprios agendamentos depois.
      </p>
    </div>
  );
}
