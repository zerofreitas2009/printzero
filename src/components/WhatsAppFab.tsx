import { MessageCircle } from "lucide-react";
import { trackLeadEvent } from "../lib/pzLeadTracking";

type Props = {
  phone?: string;
  text?: string;
  className?: string;
};

export default function WhatsAppFab({
  phone = "5511978711907",
  text =
    "Olá! Vim pela página da PrintZero e quero contratar serviços de informática (site/sistema).",
  className,
}: Props) {
  const msg = encodeURIComponent(text);

  return (
    <a
      href={`https://wa.me/${phone}?text=${msg}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      onClick={() =>
        trackLeadEvent({
          event_type: "contact_click",
          contact_kind: "orcamento",
          contact_channel: "whatsapp",
        })
      }
      className={[
        "fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 transition hover:scale-[1.03] hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-white/30",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}