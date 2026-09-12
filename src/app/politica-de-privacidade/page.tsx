import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { CONTACTS } from "@/lib/contacts";

export const metadata: Metadata = {
  title: "Política de Privacidade | Isadora França Silva",
  description: "Como os seus dados são coletados, usados e protegidos neste site.",
};

export default function PoliticaDePrivacidadePage() {
  return (
    <>
      <Header />
      <main className="bg-white px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm uppercase tracking-[.18em] text-[#794354]">Transparência</p>
          <h1 className="mt-4 font-display text-4xl text-wine">Política de Privacidade</h1>
          <p className="mt-3 text-sm text-graphite/60">Última atualização: 09 de setembro de 2026.</p>

          <div className="mt-10 space-y-8 text-base leading-8 text-graphite">
            <section>
              <h2 className="font-display text-xl text-wine">Quem sou eu, nesse contexto</h2>
              <p className="mt-3">
                Este site pertence a Isadora França Silva, biomédica esteta em
                Contagem/MG. Sou eu quem decide como os dados coletados aqui
                são usados. Dúvidas sobre esta política ou sobre seus dados
                podem ser tiradas diretamente comigo pelo{" "}
                <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-link">
                  WhatsApp
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-wine">Quais dados eu coleto</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li><strong>Ao agendar:</strong> nome, WhatsApp, data e horário desejados, observações que você escrever, e e-mail (opcional).</li>
                <li><strong>Se você criar uma conta:</strong> e-mail e senha (a senha nunca fica visível para mim — quem cuida disso é o Supabase, a plataforma de autenticação).</li>
                <li><strong>Se você conversar com a Helena (assistente virtual):</strong> as mensagens que você digitar, só enviadas a um provedor de IA depois de você marcar a caixa de consentimento específica daquela conversa.</li>
              </ul>
              <p className="mt-3">
                Não peço nem armazeno dados de saúde, documentos de
                identidade ou informações sensíveis por este site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-wine">Para que uso esses dados</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Confirmar e organizar o seu atendimento.</li>
                <li>Entrar em contato sobre o agendamento, quando necessário.</li>
                <li>Enviar lembretes de cuidado por e-mail — só se você marcar essa opção explicitamente no formulário de agendamento.</li>
                <li>Se você tiver conta, mostrar seus próprios agendamentos em &quot;Meus agendamentos&quot;.</li>
              </ul>
              <p className="mt-3">
                Não uso seus dados para publicidade, não vendo nem
                compartilho sua lista de contatos com terceiros para fins de
                marketing.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-wine">Quem mais tem acesso aos dados</h2>
              <p className="mt-3">Uso alguns serviços de terceiros para o site funcionar:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li><strong>Supabase:</strong> guarda o banco de dados (clientes e agendamentos) e cuida do login. Protegido por controle de acesso — cada cliente só vê os próprios dados; eu, como administradora, vejo todos.</li>
                <li><strong>Resend:</strong> envia os e-mails de notificação e de cuidados, quando aplicável.</li>
                <li><strong>OpenAI (ou um modelo de IA local, dependendo da configuração):</strong> só recebe as mensagens que você mandar para a Helena, e só depois do seu consentimento explícito naquela conversa.</li>
                <li><strong>WhatsApp/Meta:</strong> ao clicar em qualquer botão de WhatsApp, você sai deste site e entra na conversa pelo aplicativo deles, sujeito à política de privacidade do WhatsApp.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-wine">Cookies e armazenamento local</h2>
              <p className="mt-3">
                Se você criar conta e entrar, o navegador guarda sua sessão
                localmente (armazenamento local do próprio navegador, não um
                cookie de rastreamento) para você continuar logada entre uma
                visita e outra. Não uso cookies de publicidade nem de
                rastreamento de terceiros.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-wine">Por quanto tempo guardo seus dados</h2>
              <p className="mt-3">
                Enquanto durar nosso relacionamento profissional ou enquanto
                sua conta existir. Ainda não defini um prazo formal de
                retenção — se você quiser que seus dados sejam apagados
                antes disso, é só pedir (veja abaixo).
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-wine">Seus direitos (LGPD)</h2>
              <p className="mt-3">
                Você pode, a qualquer momento, pedir para: saber quais dados
                tenho sobre você, corrigir dados incorretos, apagar seus
                dados, ou retirar um consentimento que tenha dado (como o de
                receber lembretes por e-mail). É só me chamar pelo{" "}
                <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-link">
                  WhatsApp
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
