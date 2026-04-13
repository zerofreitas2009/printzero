import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { trackLeadEvent } from "../lib/pzLeadTracking";

type NavItem = { label: string; href: string };

const navItems: NavItem[] = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio (Sistemas)", href: "#portfolio" },
  { label: "Assistência Técnica (Celulares)", href: "/consertos-de-celular" },
  { label: "Contato", href: "/contato" },
];

function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = useMemo(() => location.pathname === "/", [location.pathname]);

  useEffect(() => {
    if (!isHome) return;
    if (!location.hash) return;
    scrollToHash(location.hash);
  }, [isHome, location.hash]);

  function onNavClick(href: string) {
    setOpen(false);

    if (href.startsWith("/")) {
      navigate(href);
      return;
    }

    // Âncoras na home
    if (!isHome) {
      navigate(`/${href}`);
      return;
    }

    scrollToHash(href);
  }

  return (
    <header className="fixed top-0 z-40 w-full border-b border-white/10 bg-deep/70 backdrop-blur supports-[backdrop-filter]:bg-deep/55">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/logo-oficial.png"
            alt="PrintZero"
            className="h-9 w-auto rounded-md"
            loading="eager"
          />
          <div className="hidden sm:block">
            <div className="text-sm font-semibold tracking-wide">PrintZero</div>
            <div className="text-xs text-white/70">Tecnologia e Serviços</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => onNavClick(item.href)}
              className="text-sm text-white/80 transition hover:text-white">
              {item.label}
            </button>
          ))}
          <a
            href="https://wa.me/5511975495126"
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              trackLeadEvent({
                event_type: "contact_click",
                contact_kind: "orcamento",
                contact_channel: "whatsapp",
              })
            }
            className="rounded-full bg-gradient-to-r from-royal to-sky-400 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:opacity-95">
            WhatsApp
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/90 transition hover:bg-white/10 md:hidden"
          aria-label="Abrir menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-deep/80 px-4 py-4 backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => onNavClick(item.href)}
                className="rounded-lg px-3 py-2 text-left text-sm text-white/85 transition hover:bg-white/10 hover:text-white">
                {item.label}
              </button>
            ))}
            <a
              href="https://wa.me/5511975495126"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackLeadEvent({
                  event_type: "contact_click",
                  contact_kind: "orcamento",
                  contact_channel: "whatsapp",
                })
              }
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-royal to-sky-400 px-4 py-3 text-sm font-semibold text-white shadow-glow">
              Falar no WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}