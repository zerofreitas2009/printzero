import { type FormEvent, useMemo, useState } from "react";
import { supabase } from "../integrations/supabase/client";

type Kind = "assistencia" | "orcamento";

type Props = {
  kind: Kind;
  title: string;
  toEmailLabel: string;
  phoneLabel: string;
};

export default function EmailContactForm({
  kind,
  title,
  toEmailLabel,
  phoneLabel,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState<null | "ok" | "error">(null);

  const canSubmit = useMemo(() => {
    return (
      name.trim() &&
      email.trim() &&
      phone.trim() &&
      subject.trim() &&
      message.trim() &&
      !loading
    );
  }, [email, loading, message, name, phone, subject]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setSent(null);

    const { error } = await supabase.functions.invoke("printzero-send-email", {
      body: {
        kind,
        name,
        email,
        phone,
        subject,
        message,
      },
    });

    setLoading(false);

    if (error) {
      setSent("error");
      return;
    }

    setSent("ok");
    setName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glow">
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/70">
        <div>
          Telefone: <span className="text-white">{phoneLabel}</span>
        </div>
        <div>
          E-mail: <span className="text-white">{toEmailLabel}</span>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <div>
          <label className="text-sm font-semibold text-white/85">Nome *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-deep/40 px-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/20"
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-white/85">E-mail *</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              type="email"
              className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-deep/40 px-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/20"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-white/85">Telefone *</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(11) 99999-9999"
              className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-deep/40 px-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/20"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-white/85">Assunto *</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={
              kind === "assistencia"
                ? "Ex.: troca de tela / conector / diagnóstico"
                : "Ex.: orçamento de site / sistema / LocalDesk"
            }
            className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-deep/40 px-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/20"
            required
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-white/85">Mensagem *</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              kind === "assistencia"
                ? "Descreva o modelo do aparelho e o problema"
                : "Descreva o que você precisa (site, sistema, integrações...)"
            }
            rows={6}
            className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-deep/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/20"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-1 inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-royal to-sky-400 px-6 text-sm font-semibold text-white shadow-glow transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? "Enviando..." : "Enviar mensagem"}
        </button>

        {sent === "ok" ? (
          <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            Mensagem enviada com sucesso. Em breve entraremos em contato.
          </div>
        ) : null}

        {sent === "error" ? (
          <div className="rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            Não foi possível enviar agora. Tente novamente ou chame no WhatsApp.
          </div>
        ) : null}

        <div className="text-xs text-white/50">
          Ao enviar, você concorda em ser contatado(a) pela PrintZero.
        </div>
      </form>
    </div>
  );
}
