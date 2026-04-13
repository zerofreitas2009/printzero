import {
  ArrowLeft,
  ArrowRight,
  BatteryCharging,
  Camera,
  CircleCheck,
  LaptopMinimal,
  Mic,
  Smartphone,
  Usb,
  Volume2,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import EmailContactForm from "../components/EmailContactForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Reveal from "../components/Reveal";
import WhatsAppFab from "../components/WhatsAppFab";
import { trackLeadEvent } from "../lib/pzLeadTracking";

const WHATSAPP_ASSISTENCIA = "https://wa.me/5511993891011";

const techServices = [
  {
    icon: Smartphone,
    title: "Troca de Tela",
    desc: "Substituição de display e touchscreen com alinhamento e testes completos.",
  },
  {
    icon: BatteryCharging,
    title: "Troca de Bateria",
    desc: "Recupere autonomia e segurança com bateria nova e calibragem.",
  },
  {
    icon: Usb,
    title: "Conector de Carga",
    desc: "Reparo/substituição de conector e limpeza de oxidação.",
  },
  {
    icon: Camera,
    title: "Câmera",
    desc: "Correção de falhas, troca de módulo e ajustes de foco.",
  },
  {
    icon: Mic,
    title: "Microfone",
    desc: "Reparo de áudio baixo, ruído e falhas em chamadas/gravações.",
  },
  {
    icon: Volume2,
    title: "Alto-falante",
    desc: "Troca e manutenção para som limpo e sem distorções.",
  },
  {
    icon: LaptopMinimal,
    title: "Software & Otimização",
    desc: "Formatação, atualizações, limpeza, backup e recuperação.",
  },
];

export default function ConsertosDeCelular() {
  useEffect(() => {
    document.title = "Consertos de Celular | PrintZero";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <WhatsAppFab />

      <main className="pt-24">
        <section className="relative py-12" aria-label="Consertos de Celular">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_30%_20%,rgba(0,116,217,0.22),transparent_60%)]" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-deep to-transparent" />
          </div>

          <div className="mx-auto max-w-6xl px-4">
            <Reveal>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white">
                <ArrowLeft className="h-4 w-4" />
                Voltar para a Home
              </Link>
            </Reveal>

            <Reveal delayMs={80}>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Assistência Técnica de Celulares
              </h1>
            </Reveal>

            <Reveal delayMs={140}>
              <p className="mt-3 max-w-2xl text-base text-white/75 sm:text-lg">
                Serviço rápido, transparente e com checklist de testes. Envie o modelo do
                aparelho e o problema para receber o orçamento.
              </p>
            </Reveal>

            <Reveal delayMs={200}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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
                <a
                  href="mailto:printzeroinfo@gmail.com"
                  onClick={() =>
                    trackLeadEvent({
                      event_type: "contact_click",
                      contact_kind: "assistencia",
                      contact_channel: "email",
                    })
                  }
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  printzeroinfo@gmail.com
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-14" aria-label="Lista de serviços">
          <div className="mx-auto max-w-6xl px-4">
            <Reveal>
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Serviços Técnicos
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-white/70">
                    Se não encontrar o seu problema na lista, chame no WhatsApp — também
                    fazemos diagnóstico.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {techServices.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <Reveal key={s.title} delayMs={idx * 70}>
                    <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glow transition hover:-translate-y-1 hover:border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-royal/25 text-sky-200">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-lg font-semibold">{s.title}</div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-white/70">
                        {s.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="pb-14" aria-label="Contato por e-mail">
          <div className="mx-auto max-w-6xl px-4">
            <Reveal>
              <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
                <EmailContactForm
                  kind="assistencia"
                  title="Enviar e-mail — Assistência técnica"
                  phoneLabel="(11) 99389-1011"
                  toEmailLabel="printzeroinfo@gmail.com"
                />

                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-glow">
                  <div className="text-lg font-semibold">Dica para agilizar</div>
                  <p className="mt-2 text-sm text-white/70">
                    Informe o modelo do aparelho, se caiu/molhou, e quando o problema
                    começou. Se puder, envie fotos/vídeos no WhatsApp.
                  </p>
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
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                    Chamar no WhatsApp
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="pb-16" aria-label="Como funciona">
          <div className="mx-auto max-w-6xl px-4">
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-7 shadow-glow">
                <div className="text-xl font-semibold">Como funciona</div>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {["Você descreve o problema", "Fazemos diagnóstico e orçamento", "Reparo + checklist de testes"].map(
                    (t, idx) => (
                      <div
                        key={t}
                        className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-royal/25 text-sky-200">
                          <CircleCheck className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{idx + 1}.</div>
                          <div className="text-sm text-white/75">{t}</div>
                        </div>
                      </div>
                    )
                  )}
                </div>
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
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                  Solicitar orçamento
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} </div>
  );
};
} </div>
  );
}