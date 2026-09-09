import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase com a chave de serviço — **somente servidor**, nunca
 * importar em componentes de cliente. A chave de serviço ignora Row Level
 * Security, então este arquivo é o único ponto de acesso ao banco por
 * enquanto (não há login de cliente ainda — Etapas 10/11).
 *
 * Retorna null quando as variáveis de ambiente não estão configuradas,
 * para que quem chamar possa degradar graciosamente em vez de quebrar.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
