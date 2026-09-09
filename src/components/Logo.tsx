type LogoProps = {
  /** Mostra a assinatura "Isadora França | Biomedicina Estética" ao lado do monograma. */
  withSignature?: boolean;
  className?: string;
};

/**
 * Monograma "IF" — letras desenhadas em vetor (não depende de fonte
 * carregada), anel duplo rosé-gold sobre fundo blush e um detalhe
 * botânico discreto. Mesmo desenho do favicon (src/app/icon.svg), para
 * a marca ficar idêntica em todo lugar.
 */
export function Logo({ withSignature = true, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="shrink-0"
        width="52"
        height="52"
        role="img"
        aria-label="Monograma Isadora França"
      >
<path d="M31 23h23v2c-7 0-8 2-8 8v35c0 6 1 8 8 8v2H31v-2c7 0 8-2 8-8V33c0-6-1-8-8-8z" fill="#5B1A2B"/><path d="M49 23h31l1 15h-2c-2-10-6-12-16-12h-4v23h5c7 0 9-2 10-8h2v20h-2c-1-7-3-9-10-9h-5v17c0 5 2 7 9 7v2H49v-2c4-1 4-3 4-8V33c0-5 0-7-4-8z" fill="#5B1A2B"/><path d="M20 60c-2-18 5-36 22-45M59 86c15-4 25-16 27-30" fill="none" stroke="#B08A4E" stroke-width="1.2"/><path d="m77 18 2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="#B08A4E"/>
      </svg>
      {withSignature && (
        <div className="leading-tight">
          <p className="font-display text-lg font-semibold text-wine">
            Isadora França
          </p>
          <p className="text-xs uppercase tracking-[0.15em] text-[#794354]">
            Biomedicina Estética
          </p>
        </div>
      )}
    </div>
  );
}
