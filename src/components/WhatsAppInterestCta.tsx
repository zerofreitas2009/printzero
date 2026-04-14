import { ArrowRight, X } from "lucide-react";
import { useEffect, useId, useState } from "react";

const buildWhatsAppLink = (base: string, message: string) => {
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}text=${encodeURIComponent(message)}`;
};

export default function WhatsAppInterestCta({
  label = "Chamar no WhatsApp",
  techWhatsApp,
  assistWhatsApp,
  onTechClick,
  onAssistClick,
  techMessage = "Olá! Quero saber mais sobre sites e sistemas (SaaS). Pode me ajudar?",
  assistMessage = "Olá! Preciso de reparo/conserto de celular. Pode me ajudar?",
}: {
  label?: string;
  techWhatsApp: string;
  assistWhatsApp: string;
  onTechClick?: () => void;
  onAssistClick?: () => void;
  techMessage?: string;
  assistMessage?: string;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const go = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal to-sky-400 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:opacity-95"
        aria-haspopup="dialog">
        {label}
        <ArrowRight className="h-4 w-4" />
      </button>

      {open ? (
        <>
          {/* Overlay/backdrop */}
          <div
            className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}>
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-deep shadow-[0_20px_80px_rgba(0,0,0,0.75)]">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-white/5 px-5 py-4">
                <div>
                  <div id={titleId} className="text-base font-semibold">
                    Como podemos te ajudar?
                  </div>
                  <div className="mt-1 text-sm text-white/70">
                    Escolha uma opção para abrir o WhatsApp com mensagem personalizada.
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Fechar"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[70vh] overflow-auto p-5">
                <div className="grid gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      onTechClick?.();
                      go(buildWhatsAppLink(techWhatsApp, techMessage));
                    }}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-left transition hover:border-white/20 hover:bg-white/10">
                    <div className="text-sm font-semibold">Quero saber sobre sites/sistemas</div>
                    <div className="mt-1 text-xs text-white/70">
                      Falar com o setor comercial tech.
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onAssistClick?.();
                      go(buildWhatsAppLink(assistWhatsApp, assistMessage));
                    }}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-left transition hover:border-white/20 hover:bg-white/10">
                    <div className="text-sm font-semibold">Preciso de reparo/conserto</div>
                    <div className="mt-1 text-xs text-white/70">
                      Ir direto para a assistência técnica.
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white/90 transition hover:bg-white/10">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}