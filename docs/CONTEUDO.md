# Conteúdo do site — fonte única da verdade

Este arquivo é a referência oficial dos dados reais de Isadora França Silva.
**Nenhuma página do site deve apresentar informação que não esteja aqui.**

Legenda dos marcadores usados neste arquivo:

- **`PENDENTE`** — informação ainda não fornecida. A interface pública deve
  **omitir completamente** o campo correspondente (sem rótulos como "em
  breve" ou "a confirmar") até que o dado seja fornecido e confirmado.
- **`PENDENTE DE CONFIRMAÇÃO PARA USO PÚBLICO`** — informação já registrada
  internamente para referência da equipe, mas ainda **não autorizada por
  Isadora** para aparecer no site. Também deve ser omitida da interface
  pública até a confirmação — o valor já anotado fica guardado aqui apenas
  como referência interna, nunca é publicado antecipadamente.

Última atualização: 2026-09-09.

## Identificação

- **Nome completo:** Isadora França Silva
- **Localização:** Contagem/MG
- **Instagram profissional:** [@isaa.franca](https://instagram.com/isaa.franca) — confirmado para uso público.
- **WhatsApp profissional:** +55 31 99526-2194 (`5531995262194`) — confirmado para uso público.
- **CRBM (registro profissional):** `PENDENTE`

## Formação acadêmica

- Graduação em Biomedicina — Centro Universitário UNA, 2021 a 2025.
- Curso de Gerenciamento de Peelings Químicos — professor Márcio Guidomi.
- Workshops práticos em estética avançada.
- Treinamento em harmonização facial e técnicas injetáveis.
- Próxima especialização pretendida: `PENDENTE`

## Experiência profissional

- Clínica Dra. Ana Lemos, Contagem/MG — julho de 2023 a abril de 2026.
- Auxiliou em procedimentos estéticos faciais e corporais.
- Experiência prática assistida com: toxina botulínica, preenchimentos,
  bioestimuladores, fios de PDO e peelings.
- Acompanhou avaliação, preparo, pré e pós-atendimento de pacientes.
- Contato com ambiente cirúrgico envolvendo blefaroplastia, lifting,
  cervicoplastia, bichectomia e rinomodelação (**apenas acompanhamento**,
  nunca execução — ela não realiza procedimentos cirúrgicos).

## Tom de voz

Todo texto narrativo do site é escrito **em primeira pessoa**, como se a
própria Isadora estivesse falando diretamente com a cliente — "Trabalho
com...", "Zelo pela...", "Vou até você...". Nunca em terceira pessoa
("Isadora trabalha...", "Isadora zela...").

Exceções (permanecem em terceira pessoa/neutras, por convenção):
- Nome/assinatura da marca (logo, `<title>`, meta description) — funciona
  como um cartão de visita, não como uma frase falada.
- `aria-label` e textos técnicos/acessibilidade que descrevem um elemento
  visual (ex: "Monograma Isadora França").

## Diferenciais

- Atendimento humanizado e acolhedor.
- Atenção aos detalhes.
- Segurança clínica.
- Naturalidade dos resultados.

## Regra de apresentação dos procedimentos

**Serviço oferecido de forma autônoma, hoje: apenas botox / toxina botulínica.**

Preenchimentos, bioestimuladores, fios de PDO e peelings **não podem ser
listados como serviços disponíveis**. Podem aparecer somente em contexto de
experiência anterior (na Clínica Dra. Ana Lemos) ou como "planos futuros",
sempre deixando claro que não são oferecidos por ela de forma autônoma no
momento, para não confundir a cliente.

Procedimentos cirúrgicos (blefaroplastia, lifting, cervicoplastia,
bichectomia, rinomodelação) **nunca devem ser apresentados como serviço
dela** — apenas, se fizer sentido no texto de "Sobre", como vivência de
acompanhamento em ambiente clínico durante a experiência na clínica.

## Botox — produto e abordagem

- **Produto utilizado:** Dysport (toxina botulínica tipo A). Usar descrição
  informativa, sem superioridade ou garantia de resultado.
- **Filosofia de atendimento:** prioriza a naturalidade do resultado da
  cliente, zela pela segurança acima de tudo e evita o exagero — o
  objetivo é devolver autoestima, não alterar a aparência de forma
  artificial ou chamativa.

## Botox — dados comerciais

- **Valor atual do botox:** R$ 750 — valor inicial enquanto Isadora está
  começando, confirmado para uso público e sujeito a alteração futura.
  Não apresentar como preço permanente nem como promoção com prazo definido.
  Atualizar este documento quando o novo valor for confirmado.
- **Regiões de aplicação oferecidas:** `PENDENTE`
- **Taxa de deslocamento:** `PENDENTE`
- **Cidades e bairros atendidos:** `PENDENTE` (sede: Contagem/MG)
- **Dias e horários disponíveis:** `PENDENTE`
- **Formas de pagamento:** `PENDENTE`
- **Política de cancelamento:** `PENDENTE`

## Atendimento

- Modalidade atual: atendimento domiciliar (a profissional vai até a cliente).
- O endereço residencial informado não é um local de atendimento ao público.
  Não publicar endereço residencial, mapa ou indicação de atendimento no local.
  O endereço completo não é armazenado neste repositório.
- Foto de apresentação: retrato real enviado pelo usuário em 09/09/2026,
  autorizado para a página inicial, em `public/images/isadora-franca.jpeg`.
  Preservar a aparência original; enquadramento feito por CSS. Não usar
  imagens de banco fingindo ser a Isadora.

## Identidade visual (definida na Etapa 2)

- **Paleta** (tokens em `tailwind.config.ts`):
  - `blush` (50–900) — rosa blush claro a vinho, base #E27A93 (500).
  - `rosegold` (300–600) — detalhes em rosé/dourado discreto, base #C9A66B (500).
  - `wine` — #5B1A2B, textos de destaque.
  - `graphite` — #33302E, texto padrão.
  - Branco (#FFFFFF) predominante como fundo.
- **Tipografia:** Playfair Display (serif, títulos/logo — `font-display`) +
  Poppins (sans, corpo de texto/UI — `font-body`), carregadas via
  `next/font/google` em `src/app/layout.tsx`.
- **Tom:** feminino, moderno, elegante, profissional — nunca infantil ou
  genérico.
- **Tom dominante (a partir da Etapa 3):** `blush-300` é a cor de destaque
  preferida da Isadora — usada como base do gradiente do hero da página
  inicial. `blush-500` fica reservado para o anel/gema da cena 3D e
  detalhes pontuais, não como fundo grande.
- **Direção "moderno/estilizado/3D":** Isadora pediu algo com cena 3D
  interativa de verdade (não só efeito de profundidade em CSS). Implementado
  com React Three Fiber + drei. Primeira versão (anel + gema) foi trocada
  por não ficar clara ("parecia um planeta") — versão atual é um medalhão
  rosé-gold com as letras "IF" montadas em volume 3D dentro do anel,
  girando devagar como um pingente, reagindo sutilmente ao ponteiro, com
  fallback estático para quem não tiver WebGL e respeito a
  `prefers-reduced-motion`.
- **Logo:** monograma "IF" em anel rosé-gold sobre fundo blush, com a
  assinatura "Isadora França | Biomedicina Estética" — componente em
  `src/components/Logo.tsx`, favicon em `src/app/icon.svg`.

## Assistente virtual "Helena" (Etapa 16)

- **Nome:** Helena.
- **Persona:** robozinha rosa, fofa, elegante — combina com a identidade
  visual do site.
- **Mensagem de saudação:** "Sou a assistente virtual Helena, como posso
  ajudar?"
- **Função:** tirar dúvidas frequentes (usando só o conteúdo confirmado
  neste arquivo) e redirecionar a cliente para as páginas de botox,
  agendamento ou WhatsApp — não substitui o formulário de agendamento nem
  toma decisões clínicas.

## Como manter este arquivo

Sempre que uma informação `PENDENTE` for confirmada, atualizar este arquivo
**no mesmo commit** que passa a usá-la na interface, e atualizar a data no
topo. Isso mantém o conteúdo do site sempre rastreável a uma decisão real.

## Revisão da apresentação — 09/09/2026

A página inicial usa o retrato real como destaque, com moldura blush e
monograma IF estático em relevo. A cena WebGL anterior não é mais carregada
na inicial. Seus componentes e dependências foram preservados para evitar
remoções fora do escopo. A página Sobre continua reservada para a Etapa 4.

## Complemento da página Botox e contatos — 09/09/2026

- Conteúdo educativo: ação temporária da toxina, variação dos resultados,
  importância da avaliação, dúvidas sobre efeito, duração e precauções.
- Fonte: https://www.ipsen.com/brazil/wp-content/uploads/sites/22/2025/06/Dysport_Bula-Paciente-Patient.pdf
- Os prazos da bula são referências gerais, não garantias individuais.
- Não foram definidos locais de aplicação, doses ou protocolos próprios.
- Valor público: R$ 750, inicial e sujeito a alteração, sem “a partir de”.
- Rodapé global com WhatsApp, Instagram e copyright de ano automático.
- Links de contato abrem o canal; não confirmam nem enviam agendamentos.
- **Decisão do Matheus (09/09/2026):** não publicar no site nenhuma menção
  a "ambiente hospitalar" ou "clínica médica" — Isadora ainda não tem
  clínica própria, e trazer isso à tona geraria uma dúvida que não ajuda
  a apresentação do atendimento domiciliar. O link da bula continua
  disponível na página (fonte acima) para quem quiser ler o documento
  completo por conta própria; a página em si nunca resume ou cita esse
  trecho específico. Registro e habilitação seguem pendentes.

## Helena — implementação inicial

Etapa 16 antecipada por pedido explícito do usuário em 09/09/2026.
Mascote rosa gerada para o projeto, botão flutuante, chat com consentimento,
atalhos reais e integração de IA no servidor preparados. Ativação depende
 de chave e modelo no ambiente; sem eles, não há respostas de IA.
A base pública em src/lib/helena.ts exclui informações internas e deve ser
mantida junto deste documento. Próximas páginas continuam nas etapas
originais; a Helena não confirma agendamentos e não presta aconselhamento
clínico individual. A ativação e validação ao vivo continuam pendentes.

## Etapa 4 — Sobre mim concluída

Página /sobre apresenta retrato autorizado também nesta página, graduação
UNA (2021–2025), experiência assistida na Clínica Dra. Ana Lemos
(julho/2023–abril/2026), cursos confirmados e valores de atendimento.
A vivência clínica e os cursos não são apresentados como serviços atuais.
Não foram inventados histórias pessoais, títulos ou registros profissionais.
Helena atualizada para reconhecer a nova página e oferecer atalho.

## Fotos por página — atualização

Foto de jaleco exclusiva da inicial: public/images/isadora-franca.jpeg.
Sobre mim usa o novo retrato pessoal enviado e autorizado pelo usuário:
public/images/isadora-sobre.jpeg. Aparência preservada, enquadramento por CSS.

## Helena local sem chave

Integração alternativa com Ollama preparada para desenvolvimento no Mac.
O consentimento distingue IA local de OpenAI. Nenhuma mensagem do modo
local é enviada à OpenAI. Uso hospedado exige infraestrutura separada.

## Lembretes automáticos de pós-procedimento — decisão de escopo

Pedido de Matheus em 09/09/2026: capturar e-mail e telefone da cliente
para notificações, e enviar uma mensagem automática 14 dias após o botox
perguntando como ficou o resultado.

Decisão (com aprovação de Matheus): primeira versão usa **apenas e-mail**
automático — WhatsApp automático de verdade exige aprovação da API oficial
do WhatsApp Business pelo Meta (número comercial verificado, template de
mensagem pré-aprovado, custo por mensagem) e SMS via Twilio/similar tem
custo por envio; ambos ficam como evolução futura, quando o volume de
clientes justificar o investimento. O telefone continua sendo capturado
desde já no agendamento (já é necessário para o WhatsApp da Etapa 9), só o
disparo automático do lembrete é que começa só por e-mail.

Detalhamento técnico completo em README.md, seção "Lembretes automáticos
de pós-procedimento (Etapa 17 — planejada)". Resumo: e-mail opcional +
checkbox de consentimento específico no formulário de agendamento (Etapa
7); campo `procedimento_realizado_em` marcado pela Isadora no painel
(Etapa 12) dispara a contagem dos 14 dias — não a data agendada, por causa
de remarcações; um job diário (cron) identifica quem completou 14 dias e
ainda não recebeu o lembrete, envia via Resend e registra
`lembrete_enviado_em` para nunca duplicar o envio.

Ainda não implementado — depende das Etapas 7, 8 e 12 existirem primeiro.

## Etapa 6 — Atendimento domiciliar concluída

Página /atendimento-domiciliar publicada: como funciona (leva os materiais,
mesma técnica e avaliação de um atendimento comum), privacidade do
endereço (uso só para combinar o atendimento, nunca público) e CTA pelo
WhatsApp. Região atendida e taxa de deslocamento seguem `PENDENTE` — a
página deixa explícito que isso é combinado diretamente pelo WhatsApp, sem
listar cidades/bairros/valores. Nenhuma menção a ambiente hospitalar ou
clínico, conforme decisão registrada acima. Helena atualizada para
reconhecer a página como publicada e oferecer o atalho.

## Etapa 7 — Formulário de agendamento (em andamento)

Publicado em duas partes, cada uma com seu commit:

1. Formulário (nome, WhatsApp, data, horário, observações) que monta uma
   mensagem formatada e abre o WhatsApp de Isadora — sem exigir conta,
   sem persistência em banco (Etapa 8 ainda não existe).
2. Campo de e-mail opcional + checkbox de consentimento para lembretes de
   cuidado (groundwork da Etapa 17). **Solução interina:** como ainda não
   há banco de dados, o e-mail e a resposta ao consentimento são incluídos
   no próprio texto da mensagem de WhatsApp, para não se perderem — viram
   registro real assim que a Etapa 8 existir. O checkbox fica desabilitado
   até um e-mail ser preenchido, e é limpo automaticamente se o e-mail for
   apagado.

Faltam ainda: persistência real (Etapa 8), status "aguardando confirmação"
e o painel para Isadora gerenciar (Etapa 12).

## E-mails automáticos de agendamento (parte da Etapa 17, adiantada)

Pedido de Matheus em 09/09/2026: quando alguém agenda, ele quer que Isadora
seja avisada automaticamente (não só depender da cliente enviar a
mensagem do WhatsApp), e que a cliente receba um e-mail com cuidados,
assinado por Isadora França Silva.

Implementado: `src/app/api/agendamento/route.ts`, chamado pelo formulário
de agendamento em paralelo ao redirecionamento ao WhatsApp (que continua
sendo o canal garantido — o e-mail é um reforço, nunca bloqueia nem afeta
o WhatsApp se falhar). Usa Resend. Envia até dois e-mails:

1. **Notificação para Isadora** (`ISADORA_NOTIFICATION_EMAIL`): dados do
   pedido — nome, WhatsApp, data, horário, observações, e-mail informado
   e se a cliente aceitou lembretes. Só é enviada se esse e-mail estiver
   configurado.
2. **Cuidados para a cliente**: enviado só se ela informou e-mail **e**
   marcou o consentimento de lembretes no formulário. Conteúdo baseado nos
   mesmos fatos já usados na página /botox (fonte: bula do paciente
   Dysport — Ipsen): efeito gradual (7–14 dias, máximo em ~1 mês), duração
   aproximada de 3–4 meses (não é garantia individual), aviso de
   contraindicações a informar antes do atendimento, e o alerta de
   segurança (dificuldade para respirar/engolir/falar exige assistência
   médica imediata). Nenhuma instrução clínica nova foi inventada — é o
   mesmo conteúdo já vetado, reaproveitado.

**Ainda não implementado (depende de infraestrutura externa):** o envio
real só funciona quando `RESEND_API_KEY` e `RESEND_FROM_EMAIL` estiverem
configurados em `.env.local` — isso exige criar uma conta gratuita no
Resend e verificar um domínio/remetente, o que só a Isadora/Matheus podem
fazer (não é algo que eu consiga criar por vocês). Até lá, a rota responde
`202` sem enviar nada, sem quebrar o formulário. `ISADORA_NOTIFICATION_EMAIL`
também está `PENDENTE` — ainda não temos um e-mail dela confirmado.

**Sobre WhatsApp automático de verdade** (a máquina mandar mensagem pelo
WhatsApp sozinha, sem o clique da cliente): continua exigindo a API oficial
do WhatsApp Business, decisão já registrada acima como evolução futura —
não foi implementado agora.

Testes automatizados: `node scripts/test-agendamento.cjs` (origem,
validação, envio simulado com Resend mockado — nenhuma chamada real).

## Etapa 8 — Banco de dados (em andamento)

Schema inicial em `supabase/migrations/0001_init.sql`: tabelas `clientes`
(nome, whatsapp, email, endereço, aceita_lembretes) e `agendamentos`
(cliente_id, data, horário, observações, status, procedimento_realizado_em,
lembrete_enviado_em). RLS habilitada nas duas, sem nenhuma policy pública
— por enquanto só o servidor acessa via chave de serviço (não existe
login de cliente ainda). Endereço nunca é exposto publicamente, conforme
a regra já registrada em "Atendimento".

Ligado: `/api/agendamento` agora também tenta salvar cliente + agendamento
no Supabase (`status: aguardando_confirmacao`), em paralelo ao e-mail —
uma capacidade não depende da outra, e nenhuma delas afeta o WhatsApp, que
continua sendo o canal garantido. Sem `NEXT_PUBLIC_SUPABASE_URL`/
`SUPABASE_SERVICE_ROLE_KEY` configuradas, a rota responde normalmente
(200) só que com `salvoNoBanco: false`.

Simplificação atual: cada envio do formulário cria uma nova linha em
`clientes` (não há deduplicação por WhatsApp/e-mail ainda) — perfis de
cliente de verdade e o vínculo com login chegam nas Etapas 10/11.

Ainda falta: criar o projeto Supabase de verdade (conta e credenciais são
do Matheus/Isadora, não consigo criar por vocês) e rodar a migração nele.

Testes automatizados: `node scripts/test-agendamento.cjs` (agora também
cobre e-mail/banco configurados independentemente, com Supabase mockado).

## Etapa 10 — Cadastro e login (em andamento)

Decisão de Matheus em 09/09/2026: a **raiz do site ("/") passou a ser a
tela de boas-vindas** (entrar / criar conta / continuar sem conta) — não
a página inicial de conteúdo, que se mudou para `/inicio`. Quem clica
"Continuar sem conta" cai direto em `/inicio`; ninguém é bloqueado, é só
a primeira tela que aparece. Isso não contradiz a regra de "agendamento
sem login" já registrada — ela continua valendo, só muda o que aparece
primeiro.

Implementado: `src/components/LoginForm.tsx` (entrar, criar conta,
esqueci minha senha, continuar sem conta — via Supabase Auth) na raiz;
conteúdo da home antiga movido para `/inicio`; todos os links internos
que apontavam para "/" foram atualizados para "/inicio" (logo do
cabeçalho, botão "voltar" das páginas provisórias). A rota `/login`
separada foi removida — "/" cumpre esse papel agora.

Sem `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`
configuradas, o formulário mostra um aviso e não quebra — "continuar sem
conta" sempre funciona independente disso.

Falta: página do painel/área da cliente (Etapas 11/12) e policies de RLS
para a cliente logada acessar os próprios dados.

## Etapa 11 — Área da cliente ("Meus atendimentos") (em andamento)

Pedido de Matheus em 09/09/2026: quem cria conta deve ter uma aba própria
mostrando as informações dos atendimentos dela.

Parte 1: `supabase/migrations/0003_area_cliente_rls.sql` — policies de
**leitura** (só SELECT) para a cliente autenticada ver o próprio registro
em `clientes` e os próprios `agendamentos` (via `auth.uid() = user_id`).
Nenhuma policy de escrita é criada — toda gravação continua passando
pelo servidor com a chave de serviço, nunca direto do navegador.

Ainda faltam (próximos commits): ligar o agendamento à conta quando a
cliente estiver logada (hoje toda submissão cria uma linha nova e solta
em `clientes`, sem `user_id`) e a página `/meus-atendimentos` que lista
os dados usando essas policies.
