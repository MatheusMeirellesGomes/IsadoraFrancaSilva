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
- [ ] 6. Atendimento domiciliar
- [ ] 7. Formulário de agendamento
- [ ] 8. Banco de dados (Supabase)
- [ ] 9. Integração com WhatsApp
- [ ] 10. Cadastro e login (opcional para a cliente)
- [ ] 11. Área da cliente
- [ ] 12. Painel administrativo
- [ ] 13. Privacidade e consentimento (LGPD)
- [ ] 14. Responsividade, acessibilidade e testes
- [ ] 15. Preparação para hospedagem e domínio (IsadoraFrancaSilva.com.br)
- [ ] 16. Assistente virtual "Helena" (chatbox com tira-dúvidas e
      redirecionamentos)

## Fluxo de autenticação (detalhamento da Etapa 10)

A conta é sempre **opcional**. Ninguém precisa fazer login para conhecer o
site, ler sobre botox ou solicitar um agendamento.

### Tela de acesso (login / cadastro)

- Logomarca "IF" e assinatura "Isadora França | Biomedicina Estética".
- Campo de e-mail.
- Campo de senha.
- Botão "Entrar".
- Opção "Criar minha conta".
- Opção "Esqueci minha senha".
- Botão destacado "Continuar sem conta".
- Identidade visual rosa blush, branca e elegante.
- Layout responsivo, com prioridade para uso no celular.

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
