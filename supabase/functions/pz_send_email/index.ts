import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
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

function isValidEmail(value: string) {
  // simples o suficiente para validar remetente/headers (evita caracteres inválidos)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
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
    const fromEnv = (Deno.env.get("RESEND_FROM") ?? "").trim();

    if (!resendKey) {
      console.error("[pz_send_email] Missing secrets", {
        hasResendKey: Boolean(resendKey),
      });
      return json(
        {
          error: "Email não configurado. Configure o secret RESEND_API_KEY.",
        },
        500,
      );
    }

    // Remetente RFC 5322: "Nome" <email@dominio>
    // Observação: "contato@app:printzero.com.br" não é um e-mail válido (":" não é permitido em domínio).
    const fromAddress = isValidEmail(fromEnv) ? fromEnv : "contato@printzero.com.br";
    const from = `"Contato - PrintZero" <${fromAddress}>`;

    const body = (await req.json()) as {
      name?: string;
      email?: string;
      kind?: string;
      message?: string;
      phone?: string;
      subject?: string;
    };

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const kind = (body.kind ?? "").trim();
    const message = (body.message ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const subject = (body.subject ?? "").trim();

    if (!name || !email || !kind || !message) {
      return json({ error: "Campos obrigatórios faltando." }, 400);
    }

    // Destinatário por área (PrintZero):
    // - assistencia -> printzeroinfo@gmail.com
    // - sistemas/sites (orcamento) -> contato@printzero.com.br
    const toEmail = kind === "assistencia" ? "printzeroinfo@gmail.com" : "contato@printzero.com.br";

    const subjectMap: Record<string, string> = {
      suporte: "Suporte técnico - PrintZero",
      sites: "Orçamento - Sistemas e Sites - PrintZero",
      orcamento: "Orçamento - PrintZero",
    };

    const finalSubject = subject
      ? `[PrintZero] ${subject}`
      : subjectMap[kind] ?? "Mensagem - PrintZero";

    const emailHtml = `
      <h2>Nova mensagem do site</h2>
      <p><strong>Tipo:</strong> ${escapeHtml(kind)}</p>
      <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Telefone:</strong> ${escapeHtml(phone)}</p>` : ""}
      ${subject ? `<p><strong>Assunto:</strong> ${escapeHtml(subject)}</p>` : ""}
      <p><strong>Mensagem:</strong></p>
      <p>${escapeHtml(message).replaceAll("\n", "<br/>")}</p>
    `;

    const emailText = [
      "Nova mensagem do site",
      "",
      `Tipo: ${kind}`,
      `Nome: ${name}`,
      `E-mail: ${email}`,
      phone ? `Telefone: ${phone}` : null,
      subject ? `Assunto: ${subject}` : null,
      "",
      "Mensagem:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [toEmail],
        reply_to: email,
        subject: finalSubject,
        html: emailHtml,
        text: emailText,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("[pz_send_email] Resend error", {
        status: response.status,
        body: text,
      });
      return json({ error: "Falha ao enviar e-mail." }, 500);
    }

    console.log("[pz_send_email] ok", { kind, toEmail });
    return json({ ok: true });
  } catch (error) {
    console.error("[pz_send_email] Unexpected error", { error });
    return json({ error: "Erro interno." }, 500);
  }
});