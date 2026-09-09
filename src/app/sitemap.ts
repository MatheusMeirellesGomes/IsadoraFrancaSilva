import type { MetadataRoute } from "next";

const BASE_URL = "https://isadorafrancasilva.com.br";

// Só páginas públicas, pensadas para busca — área da cliente, painel e
// a tela de login/boas-vindas ficam de fora de propósito (ver robots.ts).
const PAGINAS_PUBLICAS = [
  "/inicio",
  "/sobre",
  "/botox",
  "/atendimento-domiciliar",
  "/agendamento",
  "/politica-de-privacidade",
  "/politica-de-cancelamento",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGINAS_PUBLICAS.map((caminho) => ({
    url: `${BASE_URL}${caminho}`,
    lastModified: new Date(),
  }));
}
