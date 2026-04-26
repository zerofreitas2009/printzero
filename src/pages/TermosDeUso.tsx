import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Reveal from "../components/Reveal";
import WhatsAppFab from "../components/WhatsAppFab";

export default function TermosDeUso() {
  useEffect(() => {
    document.title = "Termos de Uso | PrintZero";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <WhatsAppFab />

      <main className="pt-24">
        <section className="relative py-12" aria-label="Termos de Uso">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_30%_20%,rgba(0,116,217,0.22),transparent_60%)]" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-deep to-transparent" />
          </div>

          <div className="mx-auto max-w-4xl px-4">
            <Reveal>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Termos de Uso
              </h1>
            </Reveal>

            <Reveal delayMs={80}>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
                <div className="prose prose-invert max-w-none prose-p:text-white/75 prose-li:text-white/75">
                  <p>
                    Ao acessar e utilizar este site, você concorda com os presentes
                    Termos de Uso.
                  </p>

                  <h2>Finalidade do site</h2>
                  <p>
                    O site da PrintZero tem finalidade informativa sobre nossos serviços
                    de informática, sistemas, tecnologia e assistência técnica.
                  </p>

                  <h2>Propriedade intelectual</h2>
                  <p>
                    Todo o conteúdo disponibilizado neste site (textos, imagens,
                    logotipos e materiais) é de propriedade da PrintZero, salvo quando
                    indicado de forma diferente. É proibida a reprodução, distribuição ou
                    uso do conteúdo sem autorização prévia.
                  </p>

                  <h2>Proteção de dados e legislação aplicável</h2>
                  <p>
                    O uso do site implica a aceitação das leis brasileiras aplicáveis,
                    incluindo as normas de proteção de dados, quando pertinentes.
                  </p>

                  <h2>Alterações</h2>
                  <p>
                    A PrintZero pode atualizar estes Termos de Uso a qualquer momento,
                    para refletir melhorias no site ou mudanças legais.
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
