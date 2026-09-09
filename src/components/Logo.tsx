type LogoProps = {
  /** Mostra a assinatura "Isadora França | Biomedicina Estética" ao lado do monograma. */
  withSignature?: boolean;
  className?: string;
};

/**
 * Monograma "IF" em anel rosé-gold sobre fundo blush, com a assinatura
 * completa da marca. As letras usam a fonte de exibição (Playfair
 * Display, ver src/app/layout.tsx) — por depender da fonte carregada via
 * next/font, este componente deve ser usado dentro da árvore da aplicação,
 * não como favicon estático (ver src/app/icon.svg para essa versão).
 */
export function Logo({ withSignature = true, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        width="48"
        height="48"
        role="img"
        aria-label="Monograma Isadora França"
      >
        <circle cx="32" cy="32" r="31" fill="#FDEEF1" />
        <circle
          cx="32"
          cy="32"
          r="29.5"
          fill="none"
          stroke="#C9A66B"
          strokeWidth="1"
        />
        <text
          x="32"
          y="41"
          textAnchor="middle"
          fontFamily="var(--font-display), Georgia, serif"
          fontSize="26"
          fontWeight="600"
          fill="#5B1A2B"
        >
          IF
        </text>
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
