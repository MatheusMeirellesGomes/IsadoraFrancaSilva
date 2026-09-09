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
        width="48"
        height="48"
        role="img"
        aria-label="Monograma Isadora França"
      >
        <circle cx="50" cy="50" r="47" fill="#FDEEF1" />
        <circle cx="50" cy="50" r="47" fill="none" stroke="#C9A66B" strokeWidth="1.4" />
        <circle cx="50" cy="50" r="41" fill="none" stroke="#D9BD8D" strokeWidth="0.6" opacity="0.55" />

        <g fill="#5B1A2B">
          <rect x="32" y="30" width="16" height="4.5" rx="1.5" />
          <rect x="37.5" y="34" width="5" height="26" rx="1" />
          <rect x="32" y="59.5" width="16" height="4.5" rx="1.5" />

          <rect x="49" y="30" width="5.5" height="34" rx="1" />
          <rect x="49" y="30" width="21" height="5" rx="1.5" />
          <rect x="49" y="43" width="16" height="5" rx="1.5" />
          <rect x="46" y="59.5" width="11" height="4" rx="1.5" />
        </g>

        <path d="M 26 70 Q 50 80 74 70" fill="none" stroke="#C9A66B" strokeWidth="1.3" strokeLinecap="round" />
        <g fill="#D9BD8D">
          <ellipse cx="50" cy="76" rx="2" ry="4" />
          <ellipse cx="45" cy="78" rx="1.6" ry="3.2" transform="rotate(-35 45 78)" />
          <ellipse cx="55" cy="78" rx="1.6" ry="3.2" transform="rotate(35 55 78)" />
        </g>
      </svg>
      {withSignature && (
        <div className="leading-tight">
          <p className="font-display text-lg font-semibold text-wine">
            Isadora França
          </p>
          <p className="text-xs uppercase tracking-[0.15em] text-rosegold-600">
            Biomedicina Estética
          </p>
        </div>
      )}
    </div>
  );
}
