export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-deep/50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-start">
          <div>
            <div className="text-lg font-semibold">PrintZero</div>
            <div className="mt-1 text-sm text-white/70">
              Tecnologia, sistemas e assistência técnica.
            </div>

            <div className="mt-4 text-sm text-white/70">
              <div>
                CNPJ: <span className="text-white">29.304.820/0001-59</span>
              </div>
              <div className="mt-2">
                Avenida Pauliceia, 767
                <br />
                CEP 07744-025 — Caieiras — SP
              </div>
            </div>
          </div>

          <div className="grid w-full gap-6 sm:w-auto sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold">Sistemas / Sites</div>
              <div className="mt-2 text-sm text-white/70">
                <div>
                  WhatsApp: <span className="text-white">(11) 97549-5126</span>
                </div>
                <div>
                  E-mail: <span className="text-white">zerofreitas2026@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold">Conserto de Celulares</div>
              <div className="mt-2 text-sm text-white/70">
                <div>
                  WhatsApp: <span className="text-white">(11) 99389-1011</span>
                </div>
                <div>
                  E-mail: <span className="text-white">printzeroinfo@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-1 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} PrintZero. Todos os direitos reservados.</div>
          <div className="text-white/40">Build: 2026-04-14-1</div>
        </div>
      </div>
    </footer>
  );
}