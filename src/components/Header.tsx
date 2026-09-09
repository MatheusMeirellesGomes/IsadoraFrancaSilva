"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

const NAV_LINKS = [
  { href: "/sobre", label: "Sobre" },
  { href: "/botox", label: "Botox" },
  { href: "/atendimento-domiciliar", label: "Atendimento domiciliar" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-blush-200/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Página inicial" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium text-graphite transition-colors hover:text-wine"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/agendamento"
            className="hidden rounded-full bg-wine px-5 py-2 font-body text-sm font-medium text-white shadow-md shadow-wine/20 transition-transform hover:scale-105 sm:inline-block"
          >
            Agendar
          </Link>
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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 font-body text-sm font-medium text-graphite hover:bg-blush-100"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/agendamento"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-wine px-4 py-2 text-center font-body text-sm font-medium text-white"
          >
            Agendar
          </Link>
        </nav>
      )}
    </header>
  );
}
