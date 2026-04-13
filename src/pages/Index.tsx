import { ArrowRight, CheckCircle2, ExternalLink, Smartphone } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { trackLeadEvent } from "../lib/pzLeadTracking";
import Header from "../components/Header";
import Reveal from "../components/Reveal";
import WhatsAppFab from "../components/WhatsAppFab";

const WHATSAPP = "https://wa.me/5511975495126";
const WHATSAPP_ASSISTENCIA = "https://wa.me/5511993891011";

type Service = {
  emoji: string;
  title: string;
  desc: string;
};

const services: Service[] = [
  {
    emoji: "🖥️",
    title: "Sites Institucionais & Landing Pages",
    desc: "Design moderno, rápido e pensado para conversão — com SEO e performance.",
  },
  {
    emoji: "⚙️",
    title: "Sistemas SaaS Sob Medida",
    desc: "Pet Shop, Comércio, Indústria, Financeiro, HelpDesk e muito mais.",
  },
  {
    emoji: "🔗",
    title: "Automação & Integrações",
    desc: "APIs, relatórios, dashboards e fluxos que reduzem custos e aumentam produtividade.",
  },
];

const saasExamples = ["Pet Shop", "Comércio", "Indústria", "Financeiro", "HelpDesk"];

const clientPortfolio = [
  { name: "RL Consultoria em TI", url: "https://rlcti.com.br/" },
  { name: "LOHN Advocacia", url: "https://advocacialohn.adv.br/" },
  { name: "LocalDesk Sistema de Chamados", url: "https://localdesk.buscalocal.net/" },
  { name: "BuscaLocal Sistemas de Buscas de Negócio", url: "https://buscalocal.net/" },
];

export default function Index() {
  useEffect(() => {
    document.title = "PrintZero | Agência de Tecnologia e Serviços";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <WhatsAppFab />

      {/* HERO */}
      <section id="inicio" className="relative pt-24" aria-label="Início">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_70%_20%,rgba(0,116,217,0.26),transparent_60%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-deep to-transparent" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 md:grid-cols-2 md:pb-20">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                <span className="h-2 w-2 rounded-full bg-royal shadow-[0_0_0_4px_rgba(0,116,217,0.18)]" />
                Transformação digital com foco em resultado
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Transforme seu negócio com tecnologia que
                <span className="bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">
                  {" "}gera crescimento
                </span>
              </h1>
            </Reveal>

            <Reveal delayMs={140}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                Sites institucionais, sistemas SaaS e suporte técnico — do planejamento ao
                lançamento. Design limpo, performance e experiência premium.
              </p>
            </Reveal>

            <Reveal delayMs={200}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackLeadEvent({
                      event_type: "contact_click",
                      contact_kind: "orcamento",
                      contact_channel: "whatsapp",
                    })
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal to-sky-400 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:opacity-95">
                  Chamar no WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </a>
                <button
                  onClick={() =>
                    document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10">
                  Ver serviços
                </button>
              </div>
            </Reveal>

            <Reveal delayMs={260}>
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "Alta performance e SEO",
                  "Design responsivo (Mobile First)",
                  "Sistemas sob medida",
                  "Suporte e assistência técnica",
                ].map((t) => (
                  <div
                    key={t}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-sky-300" />
                    {t}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal className="md:justify-self-end" delayMs={120}>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-glow">
              <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-royal/25 blur-3xl" />
              <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />

              <div className="relative">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-semibold">Preview</div>
                  <div className="text-xs text-white/60">UI moderna • clean</div>
                </div>
                <img
                  src="/assets/desenhos-home.png"
                  alt="Desenhos e referência visual da página principal"
                  className="w-full rounded-xl border border-white/10"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="scroll-mt-24 py-16" aria-label="Serviços">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">Serviços</h2>
                <p className="mt-2 max-w-2xl text-white/70">
                  Construímos experiências digitais com base em estratégia, design e
                  tecnologia — e damos suporte quando você precisa.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {services.map((s, idx) => (
              <Reveal key={s.title} delayMs={idx * 80}>
                <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glow transition hover:-translate-y-1 hover:border-white/20">
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-royal/20 text-[22px] leading-none shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] select-none">
                      {s.emoji}
                    </div>
                    <div>
                      <div className="text-lg font-semibold">{s.title}</div>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        {s.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {idx === 1
                      ? saasExamples.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
                            {tag}
                          </span>
                        ))
                      : null}
                  </div>

                  <div className="mt-auto">
                    <div className="mt-6 h-px w-full bg-gradient-to-r from-white/0 via-white/15 to-white/0" />

                    <a
                      href={WHATSAPP}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() =>
                        trackLeadEvent({
                          event_type: "contact_click",
                          contact_kind: "orcamento",
                          contact_channel: "whatsapp",
                        })
                      }
                      className="mt-5 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal to-sky-400 px-5 text-sm font-semibold leading-none text-white shadow-glow transition hover:opacity-95">
                      Solicitar orçamento
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delayMs={260}>
              <div className="h-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-glow">
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-royal/25 text-sky-200">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold">
                      Acessórios & Conserto de Celulares
                    </div>
                    <div className="text-sm text-white/70">
                      Página exclusiva com lista completa de serviços.
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Link
                    to="/consertos-de-celular"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-[13px] font-semibold leading-none text-white transition hover:bg-white/10 md:px-5 md:text-sm">
                    Ver assistência técnica
                    <ArrowRight className="h-4 w-4 shrink-0 text-white/70" />
                  </Link>
                  <a
                    href={WHATSAPP_ASSISTENCIA}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      trackLeadEvent({
                        event_type: "contact_click",
                        contact_kind: "assistencia",
                        contact_channel: "whatsapp",
                      })
                    }
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal to-sky-400 px-4 text-[13px] font-semibold leading-none text-white shadow-glow transition hover:opacity-95 md:px-5 md:text-sm">
                    Falar no WhatsApp
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* NOSSOS PRODUTOS */}
      <section id="portfolio" className="scroll-mt-24 py-16" aria-label="Portfólio e sistemas">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight">
              Nossos Produtos (Sistemas Prontos)
            </h2>
            <p className="mt-2 max-w-2xl text-white/70">
              Soluções prontas para acelerar sua operação, com experiência refinada e
              evolução contínua.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-glow">
                <div className="border-b border-white/10 bg-white/5 px-5 py-4">
                  <div className="text-sm font-semibold">🎬 Vídeo de apresentação</div>
                  <div className="text-xs text-white/60">
                    Apresentação do LocalDesk (Sistema de Chamados)
                  </div>
                </div>
                <div className="aspect-video">
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube.com/embed/60tT3xcmDsM"
                    title="Apresentação do LocalDesk (Sistema de Chamados)"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </Reveal>

            <div className="grid gap-5">
              <Reveal delayMs={80}>
                <a
                  href="https://localdesk.buscalocal.net/"
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glow transition hover:-translate-y-1 hover:border-white/20">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-semibold">🎧 LocalDesk</div>
                      <p className="mt-2 text-sm text-white/70">
                        Centralize atendimento e gestão com um HelpDesk moderno.
                      </p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-white/60 transition group-hover:text-white" />
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-200 group-hover:text-white">
                    Acessar
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </a>
              </Reveal>

              <Reveal delayMs={160}>
                <a
                  href="https://buscalocal.net/"
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glow transition hover:-translate-y-1 hover:border-white/20">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-semibold">📍 BuscaLocal</div>
                      <p className="mt-2 text-sm text-white/70">
                        Presença digital com foco em descoberta, tráfego e conversão.
                      </p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-white/60 transition group-hover:text-white" />
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-200 group-hover:text-white">
                    Acessar
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </a>
              </Reveal>

              <Reveal delayMs={240}>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-royal/20 to-white/5 p-6">
                  <div className="text-sm font-semibold">✨ Quer um sistema próprio?</div>
                  <p className="mt-2 text-sm text-white/70">
                    Criamos SaaS sob medida com UI moderna, escalabilidade e manutenção.
                  </p>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      trackLeadEvent({
                        event_type: "contact_click",
                        contact_kind: "orcamento",
                        contact_channel: "whatsapp",
                      })
                    }
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                    Pedir orçamento
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFÓLIO CLIENTES */}
      <section className="py-16" aria-label="Portfólio de clientes">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight">Portfólio de Clientes</h2>
            <p className="mt-2 max-w-2xl text-white/70">
              Uma galeria limpa com marcas atendidas em sites institucionais.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clientPortfolio.map((item, idx) => (
              <Reveal key={item.url} delayMs={idx * 60}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-20 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 text-center text-xs font-semibold text-white/80 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10">
                  <span className="leading-snug">{item.name}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ASSISTÊNCIA */}
      <section id="assistencia" className="scroll-mt-24 py-16" aria-label="Assistência Técnica">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-7 shadow-glow">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <div className="text-2xl font-semibold">Assistência Técnica de Celulares</div>
                  <p className="mt-2 max-w-2xl text-sm text-white/70">
                    Diagnóstico, troca de peças, reparos e otimizações. Atendimento ágil
                    com transparência.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/consertos-de-celular"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                    Ver serviços técnicos
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={WHATSAPP_ASSISTENCIA}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      trackLeadEvent({
                        event_type: "contact_click",
                        contact_kind: "assistencia",
                        contact_channel: "whatsapp",
                      })
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal to-sky-400 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:opacity-95">
                    Orçar no WhatsApp
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}