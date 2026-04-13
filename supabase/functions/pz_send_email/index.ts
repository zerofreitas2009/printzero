import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type Kind = "assistencia" | "orcamento";

type Payload = {
  kind: Kind;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail = Deno.env.get("PRINTZERO_FROM_EMAIL");

    if (!resendKey || !fromEmail) {
      console.error("[pz_send_email] Missing secrets", {
        hasResendKey: Boolean(resendKey),
        hasFromEmail: Boolean(fromEmail),
      });
      return json(
        {
          error:
            "Email não configurado. Configure os secrets RESEND_API_KEY e PRINTZERO_FROM_EMAIL.",
        },
        500,
      );
    }

    const body = (await req.json()) as Partial<Payload>;

    const kind = body.kind;
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const subject = (body.subject ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!kind || (kind !== "assistencia" && kind !== "orcamento")) {
      return json({ error: "kind inválido" }, 400);
    }

    if (!name || !email || !phone || !subject || !message) {
      return json({ error: "Campos obrigatórios faltando" }, 400);
    }

    const to =
      kind === "assistencia"
        ? "printzeroinfo@gmail.com"
        : "zerofreitas2026@gmail.com";

    const label = kind === "assistencia" ? "Assistência Técnica" : "Orçamento";

    const html = `
      <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#0b1220;">
        <h2 style="margin:0 0 12px 0;">Contato — ${label}</h2>
        <p style="margin:0 0 16px 0; color:#334155;">Novo contato enviado pelo site PrintZero.</p>
        <table style="border-collapse:collapse; width:100%; max-width:680px;">
          <tr><td style="padding:8px 0; width:140px; color:#64748b;">Nome</td><td style="padding:8px 0;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 0; width:140px; color:#64748b;">E-mail</td><td style="padding:8px 0;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px 0; width:140px; color:#64748b;">Telefone</td><td style="padding:8px 0;">${escapeHtml(phone)}</td></tr>
          <tr><td style="padding:8px 0; width:140px; color:#64748b;">Assunto</td><td style="padding:8px 0;">${escapeHtml(subject)}</td></tr>
        </table>
        <div style="margin-top:16px; padding:14px 16px; background:#f1f5f9; border-radius:12px;">
          <div style="font-size:12px; color:#64748b; margin-bottom:6px;">Mensagem</div>
          <div style="white-space:pre-wrap;">${escapeHtml(message)}</div>
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [to],
        subject: `[PrintZero] ${label}: ${subject}`,
        html,
        reply_to: email,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[pz_send_email] Resend error", {
        status: res.status,
        errText,
      });
      return json({ error: "Falha ao enviar e-mail" }, 500);
    }

    const data = await res.json();
    console.log("[pz_send_email] Email sent", { kind, to, data });

    return json({ ok: true });
  } catch (error) {
    console.error("[pz_send_email] Unexpected error", { error });
    return json({ error: "Erro inesperado" }, 500);
  }
});

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

