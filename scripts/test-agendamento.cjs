const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
function load(file, imports, extra = {}) {
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  new Function('exports', 'require', 'process', code)(exports, name => imports[name], extra.process);
  return exports;
}
const emails = load('src/lib/agendamentoEmails.ts', {});
const env = {};
const sent = [];
class ResendMock {
  constructor(key) { this.key = key; }
  get emails() {
    return { send: async (payload) => { sent.push(payload); return { data: { id: 'test' } }; } };
  }
}
const route = load('src/app/api/agendamento/route.ts', {
  'next/server': { NextResponse: Response },
  'resend': { Resend: ResendMock },
  '@/lib/agendamentoEmails': emails,
}, { process: { env } });

function req(body, headers = {}) {
  const request = new Request('http://localhost:3000/api/agendamento', {
    method: 'POST',
    headers: { origin: 'http://localhost:3000', 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
  request.nextUrl = new URL(request.url);
  return request;
}

const dadosValidos = {
  nome: 'Maria Teste',
  whatsapp: '(31) 91234-5678',
  email: 'maria@exemplo.com',
  dataFormatada: 'quinta-feira, 15 de outubro de 2026',
  horario: '14:30',
  observacoes: 'Primeira vez',
  aceitaLembretes: true,
};

(async () => {
  // Origem inválida
  assert.equal((await route.POST(req(dadosValidos, { origin: 'https://other.example' }))).status, 403);

  // Sem chave configurada: não erra, só não envia
  const semChave = await route.POST(req(dadosValidos));
  assert.equal(semChave.status, 202);
  assert.equal((await semChave.json()).enviado, false);
  assert.equal(sent.length, 0);

  // Configura e testa dados inválidos
  env.RESEND_API_KEY = 'test-only';
  env.RESEND_FROM_EMAIL = 'nao-responda@isadorafrancasilva.com.br';
  assert.equal((await route.POST(req({ nome: '' }))).status, 400);

  // Envio completo (Isadora + cliente, pois aceitaLembretes=true e email preenchido)
  env.ISADORA_NOTIFICATION_EMAIL = 'isadora@exemplo.com';
  const ok = await route.POST(req(dadosValidos));
  assert.equal(ok.status, 200);
  const body = await ok.json();
  assert.equal(body.enviado, true);
  assert.deepEqual(body.destinatarios.sort(), ['cliente', 'isadora']);
  assert.equal(sent.length, 2);
  assert.equal(sent[0].to, 'isadora@exemplo.com');
  assert.match(sent[0].text, /Maria Teste/);
  assert.equal(sent[1].to, 'maria@exemplo.com');
  assert.match(sent[1].text, /Isadora França Silva/);
  assert.match(sent[1].text, /dificuldade para respirar/i);

  // Sem consentimento: só notifica Isadora, não manda cuidados pro cliente
  sent.length = 0;
  const semConsentimento = await route.POST(req({ ...dadosValidos, aceitaLembretes: false }));
  const body2 = await semConsentimento.json();
  assert.deepEqual(body2.destinatarios, ['isadora']);
  assert.equal(sent.length, 1);

  console.log('Agendamento: origem, validação, envio simulado (Isadora + cliente) e consentimento aprovados. Nenhuma chamada real ao Resend.');
})().catch(e => { console.error(e); process.exitCode = 1; });
