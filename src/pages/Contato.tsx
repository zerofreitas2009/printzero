import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmailContactForm from "../components/EmailContactForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Reveal from "../components/Reveal";
import WhatsAppFab from "../components/WhatsAppFab";

const WHATSAPP_SISTEMAS = "https://wa.me/5511975495126";
const WHATSAPP_ASSISTENCIA = "https://wa.me/5511993891011";

type Kind = "orcamento" | "assistencia";

export default function Contato() {
  const [contactKind, setContactKind] = useState<Kind>("orcamento");

  useEffect(() => {
    document.title = "Contato | PrintZero";
  }, []);

  const contact =
    contactKind === "assistencia"
      ? {
          kind: "assistencia" as const,
          headline: "Contato — Conserto de Celulares",
          description:
            "Para conserto de celulares, diagnóstico e reparos. Envie os detalhes para agilizar o atendimento.",
          phone: "(11) 99389-1011",
          whatsapp: WHATSAPP_ASSISTENCIA,
          email: "printzeroinfo@gmail.com",
          formTitle: "Enviar e-mail — Conserto de Celulares",
        }
      : {
          kind: "orcamento" as const,
          headline: "Contato — Sistemas e Sites",
          description:
            "Para orçamento de desenvolvimento (sites/sistemas) ou para adquirir o sistema de chamados LocalDesk.",
          phone: "(11) 97549-5126",
          whatsapp: WHATSAPP_SISTEMAS,
          email: "zerofreitas2026@gmail.com",
          formTitle: "Enviar e-mail — Sistemas (Sites / SaaS / LocalDesk)",
        };

  return (
    <div className="min-h-screen">
      <Header />
      <WhatsAppFab />

      <main className="pt-24">
        <section className="relative py-12" aria-label="Contato">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_30%_20%,rgba(0,116,217,0.22),transparent_60%)]" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-deep to-transparent" />
          </div>

          <div className="mx-auto max-w-6xl px-4">
            <Reveal>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white">
                <ArrowRight className="h-4 w-4 rotate-180" />
                Voltar para a Home
              </Link>
            </Reveal>

            <Reveal delayMs={80}>
              <div className="mt-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                    Contato
                  </h1>
                  <p className="mt-2 max-w-2xl text-white/70">
                    Escolha o tipo de atendimento e envie sua mensagem.
                  </p>
                </div>

                <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-1">
                  <button
                    type="button"
                    onClick={() => setContactKind("orcamento")}
                    className={
                      contactKind === "orcamento"
                        ? "h-10 rounded-full bg-white/10 px-4 text-sm font-semibold text-white"
                        : "h-10 rounded-full px-4 text-sm font-semibold text-white/70 transition hover:text-white"
                    }>
                    Sistemas
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactKind("assistencia")}
                    className={
                      contactKind === "assistencia"
                        ? "h-10 rounded-full bg-white/10 px-4 text-sm font-semibold text-white"
                        : "h-10 rounded-full px-4 text-sm font-semibold text-white/70 transition hover:text-white"
                    }>
                    Conserto de Celulares
                  </button>
                </div>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-start">
              <Reveal>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-7 shadow-glow">
                  <div className="text-xl font-semibold">{contact.headline}</div>
                  <p className="mt-2 text-sm text-white/70">{contact.description}</p>

                  <div className="mt-5 grid gap-2 text-sm text-white/70">
                    <div>
                      Telefone/WhatsApp: <span className="text-white">{contact.phone}</span>
                    </div>
                    <div>
                      E-mail: <span className="text-white">{contact.email}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={`mailto:${contact.email}`}
                      className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10">
                      Enviar e-mail
                    </a>
                    <a
                      href={contact.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal to-sky-400 px-6 text-sm font-semibold text-white shadow-glow transition hover:opacity-95">
                      Chamar no WhatsApp
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>

                  {contactKind === "assistencia" ? (
                    <div className="mt-6">
                      <div className="text-xs text-white/50">
                        Lista de serviços e detalhes completos:
                      </div>
                      <Link
                        to="/consertos-de-celular"
                        className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-sky-200 transition hover:text-white">
                        Abrir Assistência Técnica
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  ) : null}
                </div>
              </Reveal>

              <Reveal delayMs={80}>
                <EmailContactForm
                  kind={contact.kind}
                  title={contact.formTitle}
                  phoneLabel={contact.phone}
                  toEmailLabel={contact.email}
                />
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
