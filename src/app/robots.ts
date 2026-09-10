import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Área privada (dados da cliente) e o painel administrativo nunca
      // devem aparecer em buscadores.
      disallow: ["/meus-atendimentos", "/painel", "/api/"],
    },
    sitemap: "https://isadorafrancasilva.com/sitemap.xml",
  };
}
