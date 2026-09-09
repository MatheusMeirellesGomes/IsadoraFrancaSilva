-- Etapa 12 — Painel administrativo: policies de RLS para a conta
-- administradora (a Isadora) ver e gerenciar todas as clientes e
-- agendamentos.
--
-- O que faz alguém "admin" é um claim em app_metadata (role: "admin") no
-- próprio usuário do Supabase Auth — não uma coluna numa tabela nossa.
-- Isso é proposital: app_metadata só pode ser alterado com a chave de
-- serviço (nunca pela própria pessoa logada), então ninguém consegue se
-- promover a admin criando conta pelo site normalmente.
--
-- Depois de a Isadora criar a conta dela pelo site, promova-a rodando
-- ISSO UMA ÚNICA VEZ no SQL Editor do Supabase (troque o e-mail):
--
--   update auth.users
--   set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'::jsonb
--   where email = 'email-da-isadora@exemplo.com';
--
-- Ela precisa sair e entrar de novo (ou esperar o token expirar) depois
-- disso, para o novo claim aparecer na sessão.

create policy "admin vê todas as clientes"
  on clientes
  for select
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin atualiza clientes"
  on clientes
  for update
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin vê todos os agendamentos"
  on agendamentos
  for select
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin atualiza agendamentos"
  on agendamentos
  for update
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
