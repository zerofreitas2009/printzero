import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";

type PortfolioItem = {
  name: string;
  url: string;
};

export default function PortfolioCarousel({
  items,
  ariaLabel = "Carrossel de portfólio",
}: {
  items: PortfolioItem[];
  ariaLabel?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByViewport = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        aria-label={ariaLabel}
        className="flex gap-4 overflow-x-auto pb-2 pt-1 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="group snap-start shrink-0 w-[260px] sm:w-[300px] lg:w-[320px]">
            <div className="flex h-20 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 text-center text-xs font-semibold text-white/80 shadow-glow transition group-hover:-translate-y-0.5 group-hover:border-white/20 group-hover:bg-white/10">
              <span className="leading-snug">{item.name}</span>
            </div>
          </a>
        ))}
      </div>

      <button
        type="button"
        aria-label="Voltar"
        onClick={() => scrollByViewport(-1)}
        className="absolute left-0 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-deep/70 p-2 text-white/80 shadow-glow backdrop-blur transition hover:bg-deep/90 hover:text-white md:inline-flex">
        <ArrowLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Avançar"
        onClick={() => scrollByViewport(1)}
        className="absolute right-0 top-1/2 hidden translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-deep/70 p-2 text-white/80 shadow-glow backdrop-blur transition hover:bg-deep/90 hover:text-white md:inline-flex">
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
