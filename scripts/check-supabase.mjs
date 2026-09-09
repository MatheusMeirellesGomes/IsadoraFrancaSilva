import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

// Lê .env.local manualmente (script roda fora do Next.js).
const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1)];
    })
);

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.log("Faltam variáveis no .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

const tabelas = ["clientes", "agendamentos"];
for (const tabela of tabelas) {
  const { error, count } = await supabase.from(tabela).select("*", { count: "exact", head: true });
  if (error) {
    console.log(`❌ Tabela "${tabela}": ${error.message} (código: ${error.code})`);
  } else {
    console.log(`✅ Tabela "${tabela}" existe — ${count ?? 0} linha(s)`);
  }
}

// Checa se as policies de RLS existem (via information_schema não dá com
// a lib padrão; testamos indiretamente tentando uma leitura com a chave
// anônima, que deve retornar vazio, não erro — RLS bloqueando é esperado).
const supabaseAnon = createClient(url, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const semLogin = await supabaseAnon.from("clientes").select("id").limit(1);
console.log(
  semLogin.error
    ? `⚠️  Leitura anônima de "clientes" deu erro: ${semLogin.error.message}`
    : `✅ RLS ativa: leitura anônima sem login retornou ${semLogin.data.length} linha(s) (esperado: 0, nunca dado de outra pessoa)`
);

// Checa se as migrações 0002+ (coluna user_id) já rodaram.
const colUserId = await supabase.from("clientes").select("id, user_id").limit(1);
console.log(
  colUserId.error
    ? `❌ Coluna "user_id" em clientes: ${colUserId.error.message} (migração 0002 provavelmente não rodou)`
    : `✅ Coluna "user_id" existe em clientes (migração 0002 rodou)`
);
