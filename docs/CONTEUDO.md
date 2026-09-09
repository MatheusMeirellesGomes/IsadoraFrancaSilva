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
- Fotografias profissionais: `PENDENTE` — não usar banco de imagens fingindo
  ser a Isadora; preparar espaços reservados no layout até haver fotos reais.

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
