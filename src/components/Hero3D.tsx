"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { HeroScene } from "@/components/HeroScene";
import { ErrorBoundaryToFallback } from "@/components/ErrorBoundaryToFallback";
import { isWebglAvailable } from "@/lib/isWebglAvailable";

function FallbackGlow() {
  return (
    <div
      aria-hidden
      className="h-full w-full rounded-full bg-gradient-to-br from-blush-200 via-blush-300 to-rosegold-400 blur-2xl"
    />
  );
}

/**
 * Cena 3D interativa do monograma "IF" para o hero da página inicial.
 * Só roda no cliente (importada com next/dynamic + ssr:false), com
 * fallback visual caso o navegador não suporte WebGL ou a cena falhe em
 * tempo de execução, e respeita prefers-reduced-motion.
 */
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Hero3D() {
  // Só renderiza no cliente (ssr:false), então document/window sempre existem
  // aqui — computar no inicializador evita um setState síncrono no efeito.
  const [webglOk] = useState(() => isWebglAvailable());
  const [reduceMotion, setReduceMotion] = useState(prefersReducedMotion);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (event: MediaQueryListEvent) => setReduceMotion(event.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  if (!webglOk) {
    return <FallbackGlow />;
  }

  return (
    <ErrorBoundaryToFallback fallback={<FallbackGlow />}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <HeroScene reduceMotion={reduceMotion} />
        </Suspense>
      </Canvas>
    </ErrorBoundaryToFallback>
  );
}
