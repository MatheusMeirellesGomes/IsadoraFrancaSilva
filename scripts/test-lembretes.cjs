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
let failSend = false;
class ResendMock {
  constructor(key) { this.key = key; }
  get emails() {
    return { send: async (payload) => { if (failSend) return {data:null,error:{message:"falha"}}; sent.push(payload); return { data: { id: 'test' } }; } };
  }
}

function supabaseMock(agendamentosFixture) {
  const atualizacoes = [];
  return {
    atualizacoes,
    from(table) {
      assert.equal(table, 'agendamentos');
      return {
        select() {
          return {
            eq: () => ({
              lte: () => ({
                is: async () => ({ data: agendamentosFixture, error: null }),
              }),
            }),
          };
        },
        update(payload) {
          return {
            eq: async (field, value) => {
              atualizacoes.push({ id: value, payload });
              return { data: null, error: null };
            },
          };
        },
      };
    },
  };
}
const supabaseState = { client: null };

const route = load('src/app/api/cron/lembretes/route.ts', {
  'next/server': { NextResponse: Response },
  'resend': { Resend: ResendMock },
  '@/lib/agendamentoEmails': emails,
  '@/lib/supabaseAdmin': { getSupabaseAdmin: () => supabaseState.client },
}, { process: { env } });

function req(headers = {}) {
  const request = new Request('http://localhost:3000/api/cron/lembretes', { headers });
  request.nextUrl = new URL(request.url);
  return request;
}

(async () => {
  // Sem CRON_SECRET configurado: sempre 401, mesmo com header.
  assert.equal((await route.GET(req({ authorization: 'Bearer qualquer' }))).status, 401);

  env.CRON_SECRET = 'segredo-de-teste';

  // Header ausente ou errado: 401. Nenhuma chamada ao banco/e-mail acontece.
  assert.equal((await route.GET(req())).status, 401);
  assert.equal((await route.GET(req({ authorization: 'Bearer errado' }))).status, 401);

  const auth = { authorization: 'Bearer segredo-de-teste' };

  // Autorizado, mas sem Supabase configurado: não quebra, só avisa.
  const semBanco = await route.GET(req(auth));
  assert.equal(semBanco.status, 200);
  assert.deepEqual(await semBanco.json(), { enviados: 0, motivo: 'Supabase não configurado.' });

  supabaseState.client = supabaseMock([]);

  // Banco configurado, sem Resend: não quebra, só avisa.
  const semEmail = await route.GET(req(auth));
  assert.deepEqual(await semEmail.json(), { enviados: 0, motivo: 'Resend não configurado.' });

  env.RESEND_API_KEY = 'test-only';
  env.RESEND_FROM_EMAIL = 'nao-responda@isadorafrancasilva.com.br';

  // Três agendamentos batendo a data: só um deve receber o e-mail
  // (os outros dois não têm e-mail ou não aceitaram lembretes).
  supabaseState.client = supabaseMock([
    { id: 'ag-1', clientes: { nome: 'Maria', email: 'maria@exemplo.com', aceita_lembretes: true } },
    { id: 'ag-2', clientes: { nome: 'Joana', email: null, aceita_lembretes: true } },
    { id: 'ag-3', clientes: { nome: 'Clara', email: 'clara@exemplo.com', aceita_lembretes: false } },
  ]);
  const resultado = await route.GET(req(auth));
  const corpo = await resultado.json();
  assert.deepEqual(corpo, { enviados: 1, total: 3 });
  assert.equal(sent.length, 1);
  assert.equal(sent[0].to, 'maria@exemplo.com');
  assert.match(sent[0].text, /Maria/);
  assert.match(sent[0].subject, /botox/i);
  assert.equal(supabaseState.client.atualizacoes.length, 1);
  assert.equal(supabaseState.client.atualizacoes[0].id, 'ag-1');
  assert.ok(supabaseState.client.atualizacoes[0].payload.lembrete_enviado_em, 'deveria marcar lembrete_enviado_em');

  failSend = true;
  supabaseState.client = supabaseMock([{id:'falha',clientes:{nome:'Teste',email:'teste@example.com',aceita_lembretes:true}}]);
  assert.equal((await (await route.GET(req(auth))).json()).enviados,0);
  assert.equal(supabaseState.client.atualizacoes.length,0);

  console.log('Lembretes: autorização (sem segredo, ausente, errado), Supabase/Resend independentes, e envio seletivo (só quem tem e-mail e aceitou) com marcação de lembrete_enviado_em aprovados. Nenhuma chamada real ao Resend/Supabase.');
})().catch(e => { console.error(e); process.exitCode = 1; });
