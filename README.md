# Isadora França Silva — site profissional

Site institucional e de agendamentos para Isadora França Silva, biomédica
esteta em Contagem/MG, formada pelo Centro Universitário UNA. Apresenta sua
formação e experiência, informações sobre botox e atendimento domiciliar, e
permite agendamento (com ou sem conta) com redirecionamento para WhatsApp.
Conta com área da cliente e painel administrativo para Isadora gerenciar
clientes e agenda.

## Stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [React Three Fiber](https://r3f.docs.pmnd.rs/) + [drei](https://github.com/pmndrs/drei) (cena 3D do hero)
- [Supabase](https://supabase.com/) (PostgreSQL + Auth + Row Level Security)
- Integração com WhatsApp para confirmação de agendamentos

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

Copie `.env.example` para `.env.local` e preencha com as credenciais reais
quando a integração com Supabase estiver disponível (Etapa 8).

## Conteúdo do site

Todo dado real do negócio (formação, experiência, valores, contatos, etc.)
está centralizado em [`docs/CONTEUDO.md`](./docs/CONTEUDO.md), a fonte única
da verdade. Nenhuma página deve apresentar informação que não esteja
documentada ali — campos ainda não confirmados aparecem como pendentes até
serem validados por Isadora.

## Roadmap de desenvolvimento

O projeto é construído em etapas pequenas, uma por commit, com aprovação
antes de avançar para a próxima.

- [x] **1. Estrutura inicial e README** — scaffold Next.js + TypeScript +
      Tailwind, documentação base e controle de conteúdo.
- [x] **2. Identidade visual e logo** — paleta blush/rosé-gold/vinho,
      tipografia Playfair Display + Poppins, monograma "IF" e favicon.
- [x] **3. Cabeçalho, navegação e página inicial** — hero com cena 3D
      interativa (React Three Fiber) em tom blush-300, diferenciais e
      teasers de botox/atendimento domiciliar; páginas provisórias para
      as rotas do menu ainda não construídas.
- [x] **4. Página sobre a Isadora** — retrato, apresentação em primeira pessoa,
      formação, experiência assistida, cursos e contato.
- [x] **5. Página de botox** — feita fora de ordem, a pedido da Isadora:
      produto (Dysport), filosofia de atendimento (naturalidade, segurança,
      sem exagero) e valor (a partir de R$750, inicial).
- [x] **6. Atendimento domiciliar** — como funciona, privacidade do
      endereço, CTA pelo WhatsApp (região/taxa combinadas diretamente,
      ainda `PENDENTE` para publicação).
- [x] **7. Formulário de agendamento** — nome, WhatsApp, data, horário e
      observações, com e-mail opcional e consentimento para lembretes de
      cuidado (ver "Lembretes automáticos" abaixo). Envio abre o WhatsApp
      com tudo preenchido; sem persistência em banco ainda (Etapa 8).
- [x] **8. Banco de dados (Supabase)** — projeto real criado em
      09/09/2026, as 4 migrações rodadas e verificadas
      (`node scripts/check-supabase.mjs`): tabelas, coluna `user_id` e
      RLS todas confirmadas funcionando. O formulário de agendamento já
      persiste de verdade.
- [x] **9. Integração com WhatsApp** — entregue como parte da Etapa 7: o
      agendamento redireciona para o WhatsApp da Isadora com a mensagem
      já preenchida (nome, data, horário, observações, e-mail).
- [x] **10. Cadastro e login** — tela de boas-vindas na raiz ("/"): entrar,
      criar conta, esqueci minha senha e "continuar sem conta" (via
      Supabase Auth). A página inicial de conteúdo mudou para `/inicio`.
      Falta a Área da cliente (Etapa 11) para o login ter o que mostrar
      depois de entrar.
- [x] **11. Área da cliente** — "/meus-atendimentos" lista os
      agendamentos de quem está logada (data, horário, status,
      observações), via policies de RLS só de leitura. O agendamento
      feito com a conta logada é automaticamente ligado a ela — não
      precisa preencher nada a mais. Cabeçalho mostra "Meus
      atendimentos"/"Sair" para quem está logada.
- [x] **12. Painel administrativo** — "/painel", exclusivo pra conta com
      claim de admin (ver "Painel administrativo" abaixo). Abas
      Agendamentos (todas as clientes, muda status, marca "realizado" —
      isso preenche `procedimento_realizado_em` automaticamente) e
      Pacientes (lista completa).
- [x] **13. Privacidade e consentimento (LGPD)** —
      "/politica-de-privacidade" (dados coletados, para que servem,
      terceiros envolvidos — Supabase/Resend/OpenAI/WhatsApp, cookies,
      direitos da titular) e "/politica-de-cancelamento" (honesta sobre
      não haver prazo/taxa formal ainda definidos). Linkadas no rodapé,
      no formulário de agendamento e na tela de login/cadastro.
- [x] **14. Responsividade, acessibilidade e testes** — página 404 com a
      identidade do site; removido código morto do hero 3D antigo (5
      arquivos + dependências @react-three/three, -55 pacotes); nav do
      cabeçalho preparada para não estourar com todos os itens da conta
      admin; conferido em mobile (375px) nas páginas novas.
- [x] **15. Preparação para hospedagem e domínio** — metadados para
      compartilhamento (Open Graph/Twitter, com a foto real da Isadora),
      `sitemap.xml` e `robots.txt` (área da cliente e painel fora de
      buscadores), e o passo a passo de deploy abaixo. Falta só o deploy
      em si e apontar o domínio de verdade — ação de vocês, não código.
- [x] **16. Assistente virtual "Helena"** — mascote, chat com respostas
      rápidas e atalhos, integração de IA preparada no servidor
      (ativação real ainda pendente de chave/modelo configurados).
- [x] **17. Lembretes de pós-procedimento** — completa: notificação para
      Isadora e e-mail de cuidados para a cliente disparam no envio do
      agendamento; `/api/cron/lembretes` roda 1x por dia (Vercel Cron,
      grátis no plano Hobby) e envia o e-mail de acompanhamento 14 dias
      após `procedimento_realizado_em`, sem duplicar (ver seção abaixo).

## Fluxo de autenticação (Etapa 10 — implementada)

A conta é sempre **opcional**. Ninguém precisa fazer login para conhecer o
site, ler sobre botox ou solicitar um agendamento — só precisa ver a tela
de boas-vindas primeiro (decisão de 09/09/2026) e apertar "Continuar sem
conta", um clique.

### Rotas

- **`/`** — tela de boas-vindas (entrar / criar conta / continuar sem
  conta). Primeira coisa que qualquer visitante vê.
- **`/inicio`** — a página inicial de conteúdo (hero, diferenciais,
  teasers). Para onde "Continuar sem conta" e o login bem-sucedido levam,
  e para onde a logo do cabeçalho aponta em todas as páginas.

### Tela de acesso (login / cadastro) — `src/components/LoginForm.tsx`

- Logomarca "IF" e assinatura "Isadora França | Biomedicina Estética".
- Campo de e-mail.
- Campo de senha.
- Botão "Entrar".
- Opção "Criar minha conta".
- Opção "Esqueci minha senha".
- Botão destacado "Continuar sem conta".
- Identidade visual rosa blush, branca e elegante.
- Layout responsivo, com prioridade para uso no celular.

Usa Supabase Auth (`src/lib/supabaseClient.ts`, chave anônima). Sem
`NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY` configuradas, o
formulário avisa que o login ainda não está disponível — "continuar sem
conta" segue funcionando normalmente (é só um link, não depende disso).

### Fluxo como visitante (sem conta)

Ao agendar sem conta, a cliente informa apenas o necessário para o
atendimento — **nome e WhatsApp** — sem exigir e-mail nem senha.

### Fluxo com conta (opcional)

Criar conta é opcional e serve para a cliente acompanhar o status dos
próprios agendamentos ao longo do tempo. Não existe cadastro público de
conta administrativa: o painel administrativo é de acesso exclusivo da
Isadora.

### O que permanece acessível sem login

O site institucional, a página de botox e o formulário de agendamento
continuam **totalmente acessíveis sem login** em qualquer momento do fluxo.

## Segurança e privacidade

- Autenticação via Supabase Auth; painel administrativo protegido por rota.
- Row Level Security no banco de dados para isolar dados por cliente.
- Nenhuma chave privada exposta no frontend — apenas variáveis `NEXT_PUBLIC_*`
  chegam ao navegador; o restante fica só no servidor.
- `.env.example` nunca contém credenciais reais.
- Coleta apenas os dados necessários para o agendamento (nome, telefone,
  endereço, data/horário, observações), com consentimento explícito.
- Endereço e dados da cliente nunca ficam visíveis publicamente — só
  acessíveis à própria cliente e à Isadora no painel administrativo.
- Nenhum prontuário médico é implementado nesta primeira versão.

## Helena — integração preparada (Etapa 16 antecipada por solicitação)

Mascote e chat disponíveis em todas as páginas. Atalhos de Botox, WhatsApp
 e Instagram funcionam sem IA. Para ativar respostas, defina no `.env.local`:

```dotenv
OPENAI_API_KEY=sua_chave_privada
OPENAI_MODEL=id_do_modelo_compativel_com_responses
```

Reinicie `npm run dev`. Nunca use `NEXT_PUBLIC_` na chave nem a envie ao Git.
Sem configuração, o chat explica a indisponibilidade, sem simular IA.
A integração usa POST `/api/helena` e a Responses API, com `store: false`.
O navegador guarda apenas a conversa em memória; não há banco ou logs de
mensagens na aplicação. Isso não equivale a retenção zero no provedor.
O consentimento é obrigatório antes de enviar mensagens à OpenAI.

Base pública: `src/lib/helena.ts`, revisada a partir de `docs/CONTEUDO.md`.
Atualize ambas quando dados ou disponibilidade das páginas mudarem. Não
copie o documento interno integral para o prompt. A Helena não executa
agendamentos, não possui ferramentas e não faz avaliação clínica.

Validação: `node scripts/test-helena.cjs`, `npm run lint`, `npm run build`.
Os testes da API usam resposta simulada; teste real depende da chave/modelo.
Antes de publicar com IA: validar respostas reais, configurar limites de
uso/custo no provedor e proteção distribuída no gateway. O limite atual é
local por processo (20 requisições/minuto, 3 simultâneas), não global entre
réplicas. Revisar a política de privacidade na etapa correspondente.

Helena verifica a configuração ao abrir. Sem chave/modelo, oferece respostas
prontas identificadas e atalhos; não exibe formulário nem pede consentimento
para OpenAI. Respostas prontas rodam no navegador, sem enviar mensagens.

### Helena sem chave — IA local com Ollama

Neste Mac, Ollama foi instalado e iniciado como serviço local. Modelo:
`qwen3:4b-instruct`. Configuração privada em `.env.local`:

```dotenv
HELENA_PROVIDER=ollama
OLLAMA_MODEL=qwen3:4b-instruct
```

Reinicie o Next após alterar o ambiente. O status consulta o modelo instalado;
mensagens são processadas pelo Ollama em 127.0.0.1:11434, sem envio à OpenAI.
O primeiro pedido pode demorar enquanto o modelo carrega na memória.
Para parar o serviço: `brew services stop ollama`; para voltar:
`brew services start ollama`. Em outro computador: instalar Ollama e executar
`ollama pull qwen3:4b-instruct`. O modelo fica fora do Git.

Esta configuração atende o desenvolvimento local. Hospedagem não tem acesso
ao localhost deste Mac; exige infraestrutura de inferência própria ou provedor.

## Banco de dados (Etapa 8)

O formulário de agendamento já tenta salvar cliente + agendamento no
Supabase (`status: aguardando_confirmacao`), em paralelo aos e-mails —
uma capacidade não depende da outra, e nenhuma delas afeta o
redirecionamento ao WhatsApp, que continua sendo o canal garantido.

### Como ativar

1. Crie um projeto gratuito em [supabase.com](https://supabase.com/).
2. No SQL Editor do projeto, rode as migrações em `supabase/migrations/`
   **em ordem** (`0001_init.sql`, `0002_...`, `0003_...`, `0004_...`).
3. Copie a URL do projeto, a **chave de serviço** e a **chave anônima**
   para `.env.local` (a anônima é segura para expor no navegador —
   é sujeita a RLS; a de serviço não, ela ignora RLS):

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico
```

4. Reinicie `npm run dev`.

Sem essas variáveis, a rota responde normalmente (200) com
`salvoNoBanco: false` — o formulário e o WhatsApp continuam funcionando.
A chave de serviço nunca deve ser exposta ao navegador (por isso não leva
o prefixo `NEXT_PUBLIC_`) nem commitada.

Validação: `node scripts/test-agendamento.cjs` (Supabase mockado, nenhuma
chamada real).

### Diagnóstico de um projeto real

`node scripts/check-supabase.mjs` conecta no projeto configurado em
`.env.local` (chave de serviço) e confere, nessa ordem: se as tabelas
`clientes`/`agendamentos` existem, se a leitura anônima está corretamente
bloqueada por RLS (deve retornar vazio, nunca erro nem dado), e se a
coluna `user_id` existe. Útil para descobrir rapidamente qual migração
ainda falta rodar num projeto novo, sem precisar adivinhar pelo erro do
SQL Editor.

## Painel administrativo (Etapa 12)

`/painel` — exclusivo para a conta da Isadora, com duas abas:

- **Agendamentos:** todas as clientes, com um seletor de status
  (aguardando confirmação / confirmado / realizado / cancelado). Marcar
  como "realizado" preenche `procedimento_realizado_em` com a data de
  hoje automaticamente — é o gatilho dos lembretes de 14 dias (Etapa 17).
- **Pacientes:** lista completa de clientes cadastradas.

### Como promover a conta da Isadora a administradora

Depois que ela criar a conta normalmente pelo site ("/"), rode **uma
única vez** no SQL Editor do Supabase (troque o e-mail):

```sql
update auth.users
set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'::jsonb
where email = 'email-da-isadora@exemplo.com';
```

Ela precisa sair e entrar de novo depois disso — o claim novo só aparece
numa sessão nova. Sem esse passo, a conta funciona normalmente como
cliente comum (vê só os próprios agendamentos em "Meus atendimentos",
não o painel).

## E-mails automáticos do agendamento (parte da Etapa 17, já implementada)

Ao enviar o formulário de /agendamento, além do redirecionamento ao
WhatsApp (canal garantido, não depende de configuração nenhuma), o site
tenta enviar até dois e-mails via [Resend](https://resend.com/):

- Para Isadora (`ISADORA_NOTIFICATION_EMAIL`): aviso de novo pedido, com
  os dados preenchidos — reforço caso a cliente feche o WhatsApp antes de
  enviar a mensagem.
- Para a cliente, só se ela informou e-mail **e** aceitou o checkbox de
  lembretes: um e-mail de cuidados assinado por Isadora França Silva, com
  as mesmas informações já usadas na página /botox (fonte: bula do Dysport).

### Como ativar

```dotenv
RESEND_API_KEY=sua_chave_privada
RESEND_FROM_EMAIL=remetente_verificado_no_resend
ISADORA_NOTIFICATION_EMAIL=email_da_isadora
```

Crie uma conta gratuita em [resend.com](https://resend.com/), verifique um
domínio (ou use o remetente de testes deles) e gere a API key. Reinicie
`npm run dev`/o deploy depois de configurar. Sem essas variáveis, a rota
`/api/agendamento` responde `202` sem enviar nada — o formulário e o
WhatsApp continuam funcionando normalmente.

Validação: `node scripts/test-agendamento.cjs` (Resend mockado, nenhuma
chamada real).

WhatsApp automático de verdade (a máquina mandar mensagem sozinha, sem a
cliente clicar) continua fora do escopo por enquanto — exige a API oficial
do WhatsApp Business (Meta), com aprovação e custo por mensagem.

## Lembretes automáticos de pós-procedimento (Etapa 17 — completa)

A cliente informa um e-mail (opcional) e um WhatsApp no formulário de
agendamento, com um checkbox de consentimento separado para receber
lembretes de cuidado. 14 dias após Isadora marcar o procedimento como
realizado no painel administrativo, o sistema envia automaticamente um
e-mail perguntando como ficou o resultado.

- **Canal: só e-mail**, de propósito — WhatsApp/SMS automáticos exigem
  aprovação da API oficial do WhatsApp Business (Meta) ou um provedor de
  SMS (Twilio), com custo por mensagem. Avaliar quando o volume de
  clientes justificar.
- **Serviço de e-mail:** [Resend](https://resend.com/) (mesma
  configuração da Etapa 7 — `RESEND_API_KEY` e `RESEND_FROM_EMAIL`).
- **Gatilho:** campo `procedimento_realizado_em`, preenchido pela Isadora
  no painel (`/painel`) ao marcar um agendamento como "realizado" — não a
  data agendada, pois pode haver remarcação.
- **Job:** `src/app/api/cron/lembretes/route.ts`, chamado 1x por dia pelo
  Vercel Cron (`vercel.json`, `0 12 * * *` — roda entre meio-dia e 13h
  UTC, grátis no plano Hobby). Busca agendamentos com `status: realizado`,
  `procedimento_realizado_em` = hoje menos 14 dias e
  `lembrete_enviado_em` nulo; envia só para quem tem e-mail **e** aceitou
  lembretes; marca `lembrete_enviado_em` logo depois, pra nunca duplicar
  o envio mesmo se o job rodar mais de uma vez no mesmo dia.
- **Proteção:** a rota exige o header
  `Authorization: Bearer <CRON_SECRET>`. Defina `CRON_SECRET` (uma string
  aleatória qualquer) nas variáveis de ambiente do projeto na Vercel — ela
  manda esse valor automaticamente em toda chamada de cron job, então
  ninguém de fora consegue disparar a rota manualmente.
- **Consentimento:** separado do consentimento de agendamento (LGPD, ver
  `/politica-de-privacidade`), com o e-mail deixando claro que veio por
  causa desse aceite e que a cliente pode pedir para não receber mais.

Validação: `node scripts/test-lembretes.cjs` (Supabase e Resend mockados,
nenhuma chamada real).

## Hospedagem e domínio (Etapa 15)

### Deploy na Vercel

1. Crie uma conta grátis em [vercel.com](https://vercel.com/) (dá para
   entrar direto com a conta do GitHub).
2. **"Add New" → "Project"** → selecione o repositório
   `MatheusMeirellesGomes/IsadoraFrancaSilva`.
3. A Vercel detecta que é um projeto Next.js sozinha — não precisa mudar
   nenhuma configuração de build.
4. Antes de clicar em "Deploy", adicione as variáveis de ambiente (aba
   **Environment Variables**) com os mesmos nomes e valores do seu
   `.env.local`: `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
   `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `ISADORA_NOTIFICATION_EMAIL`,
   `CRON_SECRET` (gere um valor novo, não precisa ser o mesmo de
   desenvolvimento) e, se a Helena com IA estiver ativa,
   `OPENAI_API_KEY`/`OPENAI_MODEL`. `HELENA_PROVIDER=ollama` **não**
   funciona em produção — o Ollama só roda localmente; sem
   `OPENAI_API_KEY`, a Helena simplesmente oferece as respostas prontas,
   sem IA (comportamento já esperado, não quebra nada).
5. Clique em **Deploy**. Em poucos minutos o site fica no ar num endereço
   `algo.vercel.app`.

### Domínio próprio (IsadoraFrancaSilva.com.br)

1. Registre o domínio num registrador (Registro.br é o oficial para
   `.com.br`).
2. No projeto da Vercel: **Settings → Domains** → adicione
   `isadorafrancasilva.com.br` (e, se quiser, `www.isadorafrancasilva.com.br`
   redirecionando para o principal).
3. A Vercel mostra exatamente quais registros DNS configurar
   (normalmente um registro `A` ou `CNAME`) — copie e cadastre no painel
   do Registro.br. A propagação costuma levar de alguns minutos a
   algumas horas.
4. Depois do domínio ativo, atualize `metadataBase` em
   `src/app/layout.tsx` e as URLs em `src/app/sitemap.ts` e
   `src/app/robots.ts` **só se o domínio final for diferente** do que já
   está configurado (`https://isadorafrancasilva.com.br`) — se for esse
   mesmo, não precisa mudar nada.
