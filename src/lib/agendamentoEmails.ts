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
    "Olá, Isadora! Há um novo pedido aguardando sua avaliação.",
    "",
    `Nome: ${dados.nome}`,
    `WhatsApp: ${dados.whatsapp}`,
    `Data desejada: ${dados.dataFormatada}`,
    `Horário: ${dados.horario}`,
    `E-mail informado: ${dados.email?.trim() || "não informado"}`,
    `Aceitou lembretes de cuidado: ${dados.aceitaLembretes ? "sim" : "não"}`,
    "",
    "Acesse seu painel para confirmar, recusar ou remarcar este pedido:",
    "https://isadorafrancasilva.com/painel",
    "Combine qualquer alteração também com a cliente. O horário ainda não está confirmado.",
  ];
  const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]!));
  const html = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:28px;color:#542333;background:#fff7f9"><h1 style="font-size:24px">Novo pedido de agendamento</h1><p>Olá, Isadora! Uma cliente está aguardando sua avaliação.</p><p><strong>${escapeHtml(dados.nome)}</strong></p><p>Data desejada: ${escapeHtml(dados.dataFormatada)}<br>Horário: ${escapeHtml(dados.horario)}</p><p><a href="https://isadorafrancasilva.com/painel" style="display:inline-block;background:#601a31;color:white;padding:14px 22px;border-radius:24px;text-decoration:none">Ver no meu painel</a></p><p>Entre com sua conta para confirmar, recusar ou remarcar. Este pedido ainda não está confirmado.</p></div>`;
  return { assunto, texto: linhas.join("\n"), html };
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

Já se passaram pelo menos 14 dias desde o seu atendimento. Gostaria de saber como você está e combinar seu retorno para acompanhar o resultado.

Se surgiu alguma dúvida, algo te incomodou ou você simplesmente quer conversar sobre o que achou, me chame no WhatsApp: https://wa.me/5531995262194 — fico feliz em ouvir. O retorno será combinado comigo, sem confirmação automática.

Com carinho,
Isadora França Silva
Biomedicina Estética — Contagem/MG

—
Você recebeu este e-mail porque aceitou receber lembretes de cuidado ao agendar. Se não quiser mais recebê-los, é só me avisar pelo WhatsApp.`;
  return { assunto, texto };
}
