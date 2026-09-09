// Conteúdo revisado a partir de docs/CONTEUDO.md e da página /botox
// (que cita a bula do paciente Dysport — Ipsen). Nunca incluir promessa de
// resultado, dose, protocolo próprio ou dado que não esteja confirmado ali.

export type DadosAgendamento = {
  nome: string;
  whatsapp: string;
  email?: string;
  /** Data em formato ISO (YYYY-MM-DD), usada para persistir no banco. */
  data: string;
  dataFormatada: string;
  horario: string;
  observacoes?: string;
  aceitaLembretes: boolean;
};

export function emailNotificacaoIsadora(dados: DadosAgendamento) {
  const assunto = `Novo pedido de agendamento — ${dados.nome}`;
  const linhas = [
    `Nome: ${dados.nome}`,
    `WhatsApp: ${dados.whatsapp}`,
    `Data desejada: ${dados.dataFormatada}`,
    `Horário: ${dados.horario}`,
    `Observações: ${dados.observacoes?.trim() || "—"}`,
    `E-mail informado: ${dados.email?.trim() || "não informado"}`,
    `Aceitou lembretes de cuidado: ${dados.aceitaLembretes ? "sim" : "não"}`,
    "",
    "Este pedido ainda depende da confirmação diretamente pelo WhatsApp — não há agenda automática.",
  ];
  return { assunto, texto: linhas.join("\n") };
}

export function emailCuidadosCliente(dados: DadosAgendamento) {
  const assunto = "Cuidados para o seu atendimento — Isadora França Silva";
  const texto = `Olá, ${dados.nome}!

Recebi sua solicitação de agendamento para ${dados.dataFormatada}, às ${dados.horario}. Vou confirmar com você diretamente pelo WhatsApp.

Enquanto isso, separei algumas informações gerais sobre a aplicação de toxina botulínica (Dysport), baseadas na bula do paciente:

- O efeito é gradual: resposta significativa costuma aparecer entre 7 e 14 dias, com efeito máximo dentro de cerca de um mês. Esse prazo varia de pessoa para pessoa.
- A duração aproximada é de 3 a 4 meses na maioria dos casos — isso não é uma garantia individual.
- Se você tiver alergias, doenças, usar medicamentos, estiver grávida ou amamentando, me avise antes do atendimento.
- Qualquer dificuldade para respirar, engolir ou falar após a aplicação exige assistência médica imediata.

Essas informações são educativas e não substituem a conversa que teremos pessoalmente sobre suas expectativas e seu histórico de saúde. Você pode ver mais detalhes e a fonte completa na página de Botox do site.

Qualquer dúvida, é só me chamar no WhatsApp.

Com carinho,
Isadora França Silva
Biomedicina Estética — Contagem/MG

—
Você recebeu este e-mail porque solicitou lembretes de cuidado ao preencher o formulário de agendamento.`;
  return { assunto, texto };
}

/** Disparado pelo job da Etapa 17, 14 dias após o procedimento marcado como realizado. */
export function emailAcompanhamento14Dias(nome: string) {
  const assunto = "Como você está, depois do seu botox? — Isadora França Silva";
  const texto = `Olá, ${nome}!

Já se passaram 14 dias desde o seu atendimento, e eu gostaria de saber como você está se sentindo com o resultado.

Se surgiu alguma dúvida, algo te incomodou ou você simplesmente quer conversar sobre o que achou, me chame no WhatsApp — fico feliz em ouvir.

Com carinho,
Isadora França Silva
Biomedicina Estética — Contagem/MG

—
Você recebeu este e-mail porque aceitou receber lembretes de cuidado ao agendar. Se não quiser mais recebê-los, é só me avisar pelo WhatsApp.`;
  return { assunto, texto };
}
