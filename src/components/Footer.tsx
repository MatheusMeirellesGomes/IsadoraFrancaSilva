import { CONTACTS } from "@/lib/contacts";

export function Footer() {
  return (
    <footer className="border-t border-blush-200 bg-[#fff7f9]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2">
        <div>
          <p className="font-display text-2xl text-wine">Isadora França</p>
          <p className="mt-2 text-sm text-[#794354]">Biomedicina Estética · Contagem/MG</p>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-graphite">Cuidado, acolhimento e atenção à sua naturalidade.</p>
        </div>
        <nav aria-label="Contatos e redes sociais" className="sm:justify-self-end">
          <h2 className="font-display text-xl text-wine">Vamos conversar?</h2>
          <p className="mt-2 text-sm text-graphite">Tire suas dúvidas ou acompanhe meu trabalho.</p>
          <div className="mt-4 flex flex-col items-start gap-3">
            <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-link">WhatsApp · {CONTACTS.phoneLabel} <span aria-hidden="true">↗</span><span className="sr-only"> (abre em nova aba)</span></a>
            <a href={CONTACTS.instagram} target="_blank" rel="noopener noreferrer" className="contact-link">Instagram · {CONTACTS.instagramLabel} <span aria-hidden="true">↗</span><span className="sr-only"> (abre em nova aba)</span></a>
          </div>
        </nav>
      </div>
      <div className="border-t border-blush-200 px-6 py-5 text-center text-xs leading-relaxed text-[#794354]">© {new Date().getFullYear()} Isadora França Silva. Todos os direitos reservados.</div>
    </footer>
  );
}
