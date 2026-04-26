import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Reveal from "../components/Reveal";
import WhatsAppFab from "../components/WhatsAppFab";

export default function PoliticaDePrivacidade() {
  useEffect(() => {
    document.title = "Política de Privacidade | PrintZero";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <WhatsAppFab />

      <main className="pt-24">
        <section className="relative py-12" aria-label="Política de Privacidade">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_30%_20%,rgba(0,116,217,0.22),transparent_60%)]" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-deep to-transparent" />
          </div>

          <div className="mx-auto max-w-4xl px-4">
            <Reveal>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Política de Privacidade
              </h1>
            </Reveal>

            <Reveal delayMs={80}>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
                <div className="prose prose-invert max-w-none prose-p:text-white/75 prose-li:text-white/75">
                  <p>
                    A PrintZero respeita a sua privacidade. Esta Política de Privacidade
                    descreve como coletamos e utilizamos informações ao acessar nosso
                    site e ao solicitar nossos serviços.
                  </p>

                  <h2>Coleta de dados</h2>
                  <p>
                    Coletamos dados básicos de contato fornecidos por você, como nome,
                    e-mail e telefone/WhatsApp, para fins de atendimento e prestação de
                    serviços (incluindo assistência técnica e serviços relacionados).
                  </p>

                  <h2>Uso das informações</h2>
                  <p>
                    As informações coletadas são utilizadas para responder solicitações,
                    enviar orçamentos, realizar atendimento, e manter comunicação sobre a
                    prestação do serviço.
                  </p>

                  <h2>Compartilhamento</h2>
                  <p>
                    A PrintZero não compartilha suas informações com terceiros sem a sua
                    autorização, exceto quando necessário para cumprir obrigações legais.
                  </p>

                  <h2>Contato</h2>
                  <p>
                    Em caso de dúvidas sobre esta Política de Privacidade, entre em
                    contato pelo e-mail: <a href="mailto:zerofreitas2009@gmail.com">zerofreitas2009@gmail.com</a>.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
