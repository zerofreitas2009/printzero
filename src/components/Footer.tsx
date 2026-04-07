export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-deep/50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="text-lg font-semibold">PrintZero</div>
            <div className="text-sm text-white/70">
              Tecnologia, sistemas e assistência técnica.
            </div>
          </div>
          <div className="text-sm text-white/70">
            <div>
              E-mail: <span className="text-white">printzeroinfo@gmail.com</span>
            </div>
            <div>
              WhatsApp: <span className="text-white">(11) 97549-5126</span>
            </div>
          </div>
        </div>
        <div className="mt-8 text-xs text-white/50">
          © {new Date().getFullYear()} PrintZero. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
