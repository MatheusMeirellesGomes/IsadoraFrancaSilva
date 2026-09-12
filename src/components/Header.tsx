"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { isAdminSession } from "@/lib/isAdminSession";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/botox", label: "Botox" },
  { href: "/atendimento-domiciliar", label: "Atendimento domiciliar" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [logada, setLogada] = useState(false);
  const [admin, setAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setLogada(Boolean(data.session));
      setAdmin(isAdminSession(data.session));
    });
    const { data: assinatura } = supabase.auth.onAuthStateChange((_evento, sessao) => {
      setLogada(Boolean(sessao));
      setAdmin(isAdminSession(sessao));
    });
    return () => assinatura.subscription.unsubscribe();
  }, []);

  async function sair() {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
  }

  const links = admin ? [{ href: "/painel", label: "Meu painel" }, { href: "/", label: "Ver site" }] : NAV_LINKS;

  const contaLink = logada
    ? { href: "/meus-atendimentos", label: "Meus agendamentos" }
    : { href: "/entrar", label: "Entrar" };

  return (
    <header className="sticky top-0 z-20 border-b border-blush-200/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href={admin ? "/painel" : "/"} aria-label={admin ? "Meu painel" : "Página inicial"} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden flex-wrap items-center justify-end gap-x-6 gap-y-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium text-graphite transition-colors hover:text-wine"
            >
              {link.label}
            </Link>
          ))}
          {!admin && <Link
            href={contaLink.href}
            className="font-body text-sm font-medium text-graphite transition-colors hover:text-wine"
          >
            {contaLink.label}
          </Link>}

          {logada && (
            <button
              type="button"
              onClick={sair}
              className="font-body text-sm font-medium text-graphite/70 transition-colors hover:text-wine"
            >
              Sair
            </button>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {!admin && <Link
            href="/agendamento"
            className="hidden rounded-full bg-wine px-5 py-2 font-body text-sm font-medium text-white shadow-md shadow-wine/20 transition-transform hover:scale-105 sm:inline-block"
          >
            Agendar
          </Link>}
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-blush-300 text-wine md:hidden"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-blush-200/60 bg-white px-6 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 font-body text-sm font-medium text-graphite hover:bg-blush-100"
            >
              {link.label}
            </Link>
          ))}
          {!admin && <Link
            href={contaLink.href}
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2 font-body text-sm font-medium text-graphite hover:bg-blush-100"
          >
            {contaLink.label}
          </Link>}

          {logada && (
            <button
              type="button"
              onClick={sair}
              className="rounded-lg px-3 py-2 text-left font-body text-sm font-medium text-graphite/70 hover:bg-blush-100"
            >
              Sair
            </button>
          )}
          {!admin && <Link
            href="/agendamento"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-wine px-4 py-2 text-center font-body text-sm font-medium text-white"
          >
            Agendar
          </Link>}
        </nav>
      )}
    </header>
  );
}
