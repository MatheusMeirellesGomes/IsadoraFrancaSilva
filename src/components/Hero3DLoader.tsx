"use client";

import dynamic from "next/dynamic";

// `ssr: false` só é permitido dentro de um Client Component — por isso este
// wrapper existe separado da página (Server Component) que o usa.
const Hero3D = dynamic(() => import("@/components/Hero3D").then((mod) => mod.Hero3D), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-br from-blush-200 via-blush-300 to-rosegold-300" />
  ),
});

export function Hero3DLoader() {
  return <Hero3D />;
}
