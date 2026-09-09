-- Etapa 8 — estrutura inicial do banco de dados.
-- Rodar no SQL editor do projeto Supabase (ou via `supabase db push`).

create extension if not exists "pgcrypto";

create table if not exists clientes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  whatsapp text not null,
  email text,
  -- Endereço nunca é exposto publicamente — só o servidor (chave de
  -- serviço) e, nas Etapas 11/12, a própria cliente e a Isadora acessam.
  endereco text,
  aceita_lembretes boolean not null default false,
  criado_em timestamptz not null default now()
);

create table if not exists agendamentos (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid not null references clientes(id) on delete cascade,
  data date not null,
  horario time not null,
  observacoes text,
  status text not null default 'aguardando_confirmacao'
    check (status in ('aguardando_confirmacao', 'confirmado', 'realizado', 'cancelado')),
  -- Data em que a Isadora marcou o procedimento como realizado (painel da
  -- Etapa 12) — é o gatilho do lembrete de 14 dias (Etapa 17), não a data
  -- agendada, pois pode haver remarcação.
  procedimento_realizado_em date,
  lembrete_enviado_em timestamptz,
  criado_em timestamptz not null default now()
);

create index if not exists agendamentos_cliente_id_idx on agendamentos (cliente_id);
create index if not exists agendamentos_status_idx on agendamentos (status);

alter table clientes enable row level security;
alter table agendamentos enable row level security;

-- Nenhuma policy pública é criada de propósito: por enquanto só o
-- servidor acessa estas tabelas, com a chave de serviço (que ignora RLS).
-- Policies para a cliente ver os próprios agendamentos (Etapa 11) e para
-- o painel administrativo da Isadora (Etapa 12) entram quando o login
-- existir — sem elas, RLS habilitada e sem policy bloqueia todo acesso
-- via chave anônima, que é o comportamento seguro que queremos agora.
