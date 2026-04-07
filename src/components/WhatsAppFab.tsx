import { MessageCircle } from "lucide-react";

const WHATSAPP_PHONE = "5511975495126";
const WHATSAPP_TEXT = encodeURIComponent(
  "Olá! Quero um orçamento para site/sistema ou assistência técnica."
);

export default function WhatsAppFab() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_PHONE}?text=${WHATSAPP_TEXT}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 transition hover:scale-[1.03] hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-white/30">
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
