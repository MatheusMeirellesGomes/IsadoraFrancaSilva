import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null | undefined;

/**
 * Cliente Supabase para o navegador — usa a chave anônima (segura para
 * expor publicamente), sujeita a Row Level Security. Diferente de
 * src/lib/supabaseAdmin.ts, que é somente servidor e ignora RLS.
 *
 * Retorna null quando as variáveis de ambiente não estão configuradas,
 * para telas de login/cadastro degradarem graciosamente em vez de
 * quebrar.
 */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  client = url && anonKey ? createClient(url, anonKey) : null;
  return client;
}
