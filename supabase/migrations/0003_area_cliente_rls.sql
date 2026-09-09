-- Etapa 11 — Área da cliente: policies de leitura para a cliente logada
-- ver os próprios dados. Só SELECT — toda escrita continua passando pelo
-- servidor (chave de serviço em src/lib/supabaseAdmin.ts), nunca direto
-- do navegador.

create policy "cliente vê o próprio cadastro"
  on clientes
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "cliente vê os próprios agendamentos"
  on agendamentos
  for select
  to authenticated
  using (
    exists (
      select 1 from clientes
      where clientes.id = agendamentos.cliente_id
        and clientes.user_id = auth.uid()
    )
  );
