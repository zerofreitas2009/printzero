import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

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

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const smtpUser = Deno.env.get("PZ_ZOHO_SMTP_USER");
    const smtpPass = Deno.env.get("PZ_ZOHO_SMTP_PASS");
    const fromEmail = Deno.env.get("PZ_ZOHO_FROM") ?? smtpUser;

    if (!smtpUser || !smtpPass || !fromEmail) {
      console.error("[pz_send_email_printzero] Missing secrets", {
        hasUser: Boolean(smtpUser),
        hasPass: Boolean(smtpPass),
        hasFrom: Boolean(fromEmail),
      });
      return json(
        {
          error:
            "Email não configurado. Configure os secrets PZ_ZOHO_SMTP_USER, PZ_ZOHO_SMTP_PASS e (opcional) PZ_ZOHO_FROM.",
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
      kind === "assistencia" ? "printzeroinfo@gmail.com" : "contato@printzero.com.br";

    const label = kind === "assistencia" ? "Assistência" : "Sistemas/Sites";

    const html = `
      <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#0b1220;">
        <h2 style="margin:0 0 12px 0;">Contato — ${escapeHtml(label)}</h2>
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

    const text = [
      `Contato — ${label}`,
      ``,
      `Nome: ${name}`,
      `E-mail: ${email}`,
      `Telefone: ${phone}`,
      `Assunto: ${subject}`,
      ``,
      `Mensagem:`,
      message,
    ].join("\n");

    const client = new SMTPClient({
      connection: {
        hostname: "smtp.zoho.com",
        port: 465,
        tls: true,
        auth: {
          username: smtpUser,
          password: smtpPass,
        },
      },
    });

    try {
      await client.send({
        from: fromEmail,
        to,
        subject: `[PrintZero] ${label}: ${subject}`,
        content: text,
        html,
        replyTo: email,
      });
    } finally {
      await client.close();
    }

    console.log("[pz_send_email_printzero] ok", { kind, to });
    return json({ ok: true });
  } catch (error) {
    console.error("[pz_send_email_printzero] Unexpected error", { error });
    return json({ error: "smtp_auth_failed" }, 500);
  }
});
