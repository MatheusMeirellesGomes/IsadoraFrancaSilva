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

const store = {};
let idCounter = 0;
function supabaseMock() {
  return {
    auth: {
      getUser: async (token) => {
        if (token === 'valid-token') return { data: { user: { id: 'user-1' } }, error: null };
        return { data: { user: null }, error: { message: 'invalid token' } };
      },
    },
    from(table) {
      return {
        insert(payload) {
          const record = { id: `id-${++idCounter}`, ...payload };
          (store[table] ??= []).push(record);
          const resultPromise = Promise.resolve({ data: null, error: null });
          return {
            select: () => ({ single: async () => ({ data: record, error: null }) }),
            then: (resolve, reject) => resultPromise.then(resolve, reject),
          };
        },
        select() {
          return {
            eq: (field, value) => ({
              maybeSingle: async () => {
                const found = (store[table] || []).find((r) => r[field] === value);
                return { data: found || null, error: null };
              },
            }),
          };
        },
        update(payload) {
          return {
            eq: async (field, value) => {
              const found = (store[table] || []).find((r) => r[field] === value);
              if (found) Object.assign(found, payload);
              return { data: null, error: null };
            },
          };
        },
      };
    },
  };
}
const supabaseState = { client: null };

const route = load('src/app/api/agendamento/route.ts', {
  'next/server': { NextResponse: Response },
  'resend': { Resend: ResendMock },
  '@/lib/agendamentoEmails': emails,
  '@/lib/supabaseAdmin': { getSupabaseAdmin: () => supabaseState.client },
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
  data: '2026-10-15',
  dataFormatada: 'quinta-feira, 15 de outubro de 2026',
  horario: '14:30',
  observacoes: 'Primeira vez',
  aceitaLembretes: true,
};

(async () => {
  // Origem inválida
  assert.equal((await route.POST(req(dadosValidos, { origin: 'https://other.example' }))).status, 403);

  // Data em formato errado é rejeitada
  assert.equal((await route.POST(req({ ...dadosValidos, data: '15/10/2026' }))).status, 400);

  // Nada configurado: 200, mas nenhum efeito colateral
  const nada = await route.POST(req(dadosValidos));
  assert.equal(nada.status, 200);
  const bodyNada = await nada.json();
  assert.deepEqual(bodyNada, { destinatariosEmail: [], salvoNoBanco: false });
  assert.equal(sent.length, 0);
  assert.equal((store.clientes || []).length, 0);

  // Só e-mail configurado
  env.RESEND_API_KEY = 'test-only';
  env.RESEND_FROM_EMAIL = 'nao-responda@isadorafrancasilva.com.br';
  env.ISADORA_NOTIFICATION_EMAIL = 'isadora@exemplo.com';
  const soEmail = await route.POST(req(dadosValidos));
  const bodySoEmail = await soEmail.json();
  assert.deepEqual(bodySoEmail.destinatariosEmail, []);
  assert.equal(bodySoEmail.salvoNoBanco, false);
  assert.equal(sent.length, 0, 'não notificar pedidos que não foram salvos');

  // Também com banco configurado, sem login: cria cliente solto (sem user_id)
  supabaseState.client = supabaseMock();
  const semLogin = await route.POST(req(dadosValidos));
  const bodySemLogin = await semLogin.json();
  assert.equal(bodySemLogin.salvoNoBanco, true);
  assert.equal(sent.length, 2);
  assert.match(sent[0].html, /https:\/\/isadorafrancasilva.com\/painel/);
  assert.match(sent[1].text, /Isadora França Silva/);
  assert.equal(store.clientes.length, 1);
  assert.equal(store.clientes[0].user_id, undefined);
  assert.equal(store.agendamentos.length, 1);
  assert.equal(store.agendamentos[0].status, 'aguardando_confirmacao');
  assert.equal(store.agendamentos[0].cliente_id, store.clientes[0].id);
  assert.equal(store.agendamentos[0].data, '2026-10-15');

  // Logada (token válido): primeiro agendamento cria o cliente já ligado à conta
  const logada1 = await route.POST(req(dadosValidos, { authorization: 'Bearer valid-token' }));
  assert.equal((await logada1.json()).salvoNoBanco, true);
  assert.equal(store.clientes.length, 2);
  const clienteLogado = store.clientes.find((c) => c.user_id === 'user-1');
  assert.ok(clienteLogado, 'deveria ter criado um cliente com user_id');

  // Segundo agendamento da mesma conta reaproveita o mesmo cliente (não duplica)
  const logada2 = await route.POST(req({ ...dadosValidos, horario: '16:00' }, { authorization: 'Bearer valid-token' }));
  assert.equal((await logada2.json()).salvoNoBanco, true);
  assert.equal(store.clientes.length, 2, 'não deveria criar um segundo cliente para a mesma conta');
  assert.equal(store.agendamentos.filter((a) => a.cliente_id === clienteLogado.id).length, 2);

  // Token inválido é tratado como visitante (não quebra, não vincula)
  const tokenInvalido = await route.POST(req(dadosValidos, { authorization: 'Bearer lixo' }));
  assert.equal((await tokenInvalido.json()).salvoNoBanco, true);
  assert.equal(store.clientes.length, 3);

  // Sem consentimento: só notifica Isadora por e-mail, mas ainda salva no banco
  delete env.ISADORA_NOTIFICATION_EMAIL;
  sent.length = 0;
  const semConsentimento = await route.POST(req({ ...dadosValidos, aceitaLembretes: false }));
  const bodySemConsentimento = await semConsentimento.json();
  assert.deepEqual(bodySemConsentimento.destinatariosEmail, ['isadora']);
  assert.equal(bodySemConsentimento.salvoNoBanco, true);
  assert.equal(sent[0].to, 'isadorafrancasilva@gmail.com');
  assert.ok(!emails.emailNotificacaoIsadora({...dadosValidos, nome: '<script>bad</script>'}).html.includes('<script>'));

  console.log('Agendamento: origem, validação de data, envio condicionado ao pedido salvo, destinatário padrão e escape de HTML, vínculo de conta (sessão válida/inválida/ausente, sem duplicar cliente) e consentimento aprovados. Nenhuma chamada real ao Resend/Supabase.');
})().catch(e => { console.error(e); process.exitCode = 1; });
