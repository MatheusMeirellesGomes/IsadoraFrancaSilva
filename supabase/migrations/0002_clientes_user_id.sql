-- Etapa 10 — vincula uma conta de login (Supabase Auth) a um cliente.
-- Nullable: a conta é sempre opcional, cliente pode existir sem login
-- (fluxo de visitante do agendamento).

alter table clientes
  add column if not exists user_id uuid references auth.users(id) on delete set null;

create unique index if not exists clientes_user_id_key
  on clientes (user_id)
  where user_id is not null;

-- RLS segue sem policy pública (ver 0001_init.sql) — a policy que permite
-- a cliente logada ver/editar o próprio registro entra na Etapa 11
-- (Área da cliente), junto com a página que efetivamente usa isso.
