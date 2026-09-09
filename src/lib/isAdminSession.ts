import type { Session } from "@supabase/supabase-js";

/**
 * Verifica o claim role="admin" em app_metadata da sessão atual. Esse
 * campo só pode ser definido com a chave de serviço (ver
 * supabase/migrations/0004_painel_admin_rls.sql) — nunca pela própria
 * pessoa logada, então isso é seguro de checar no navegador: a proteção
 * de verdade dos dados é a policy de RLS, que faz a mesma checagem no
 * banco. Isto aqui só decide o que mostrar na interface.
 */
export function isAdminSession(session: Session | null): boolean {
  return session?.user.app_metadata?.role === "admin";
}
