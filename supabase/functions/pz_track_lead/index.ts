import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type EventType = "contact_click" | "form_submit";

type ContactKind = "orcamento" | "assistencia";

type ContactChannel = "whatsapp" | "email" | "page_link";

type Payload = {
  event_type: EventType;
  contact_kind: ContactKind;
  contact_channel: ContactChannel;

  page_path?: string;
  referrer?: string;

  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;

  session_id?: string;

  locale?: string;
  timezone?: string;

  platform?: unknown;
  screen?: unknown;

  // opcional (somente em form_submit)
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function isValidEventType(v: unknown): v is EventType {
  return v === "contact_click" || v === "form_submit";
}

function isValidContactKind(v: unknown): v is ContactKind {
  return v === "orcamento" || v === "assistencia";
}

function isValidContactChannel(v: unknown): v is ContactChannel {
  return v === "whatsapp" || v === "email" || v === "page_link";
}

function trimOrUndefined(v: unknown, maxLen: number) {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  if (!t) return undefined;
  return t.length > maxLen ? t.slice(0, maxLen) : t;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const url = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!url || !serviceRoleKey) {
      console.error("[pz_track_lead] Missing Supabase env", {
        hasUrl: Boolean(url),
        hasServiceRoleKey: Boolean(serviceRoleKey),
      });
      return json({ error: "Server misconfigured" }, 500);
    }

    const body = (await req.json()) as Partial<Payload>;

    if (!isValidEventType(body.event_type)) {
      return json({ error: "event_type inválido" }, 400);
    }

    if (!isValidContactKind(body.contact_kind)) {
      return json({ error: "contact_kind inválido" }, 400);
    }

    if (!isValidContactChannel(body.contact_channel)) {
      return json({ error: "contact_channel inválido" }, 400);
    }

    const userAgent = req.headers.get("user-agent") ?? undefined;

    const supabase = createClient(url, serviceRoleKey);

    const { error } = await supabase.from("pz_lead_events").insert({
      event_type: body.event_type,
      contact_kind: body.contact_kind,
      contact_channel: body.contact_channel,

      page_path: trimOrUndefined(body.page_path, 300),
      referrer: trimOrUndefined(body.referrer, 800),

      utm_source: trimOrUndefined(body.utm_source, 200),
      utm_medium: trimOrUndefined(body.utm_medium, 200),
      utm_campaign: trimOrUndefined(body.utm_campaign, 200),
      utm_term: trimOrUndefined(body.utm_term, 200),
      utm_content: trimOrUndefined(body.utm_content, 200),

      session_id: trimOrUndefined(body.session_id, 120),

      locale: trimOrUndefined(body.locale, 40),
      timezone: trimOrUndefined(body.timezone, 80),

      platform: body.platform ?? null,
      screen: body.screen ?? null,
      user_agent: userAgent?.slice(0, 1000) ?? null,

      name: trimOrUndefined(body.name, 200),
      email: trimOrUndefined(body.email, 200),
      phone: trimOrUndefined(body.phone, 40),
      subject: trimOrUndefined(body.subject, 200),
    });

    if (error) {
      console.error("[pz_track_lead] Insert error", { error });
      return json({ error: "Insert failed" }, 500);
    }

    console.log("[pz_track_lead] ok", {
      event_type: body.event_type,
      contact_kind: body.contact_kind,
      contact_channel: body.contact_channel,
    });

    return json({ ok: true });
  } catch (error) {
    console.error("[pz_track_lead] Unexpected error", { error });
    return json({ error: "Unexpected error" }, 500);
  }
});
