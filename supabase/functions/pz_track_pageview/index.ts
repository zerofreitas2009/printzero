import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0?target=deno&deno-std=0.190.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type Payload = {
  path?: string;
  referrer?: string;
  session_id?: string;
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function trimOrNull(v: unknown, maxLen: number) {
  if (typeof v !== "string") return null;
  const t = v.trim();
  if (!t) return null;
  return t.length > maxLen ? t.slice(0, maxLen) : t;
}

function getClientIp(req: Request) {
  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;

  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || null;

  const xRealIp = req.headers.get("x-real-ip");
  if (xRealIp) return xRealIp;

  return null;
}

function getCountry(req: Request) {
  return (
    req.headers.get("cf-ipcountry") ||
    req.headers.get("x-vercel-ip-country") ||
    null
  );
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
      console.error("[pz_track_pageview] Missing Supabase env", {
        hasUrl: Boolean(url),
        hasServiceRoleKey: Boolean(serviceRoleKey),
      });
      return json({ error: "Server misconfigured" }, 500);
    }

    const body = (await req.json()) as Payload;

    const path = trimOrNull(body.path, 300);
    if (!path) return json({ error: "path inválido" }, 400);

    const referrer = trimOrNull(body.referrer, 800);
    const sessionId = trimOrNull(body.session_id, 120);

    // Como agora queremos 1 registro por sessão, o session_id é obrigatório.
    if (!sessionId) return json({ error: "session_id inválido" }, 400);

    const userAgent =
      (req.headers.get("user-agent") ?? "").slice(0, 1000) || null;
    const ip = getClientIp(req);
    const ipCountry = getCountry(req);

    const supabase = createClient(url, serviceRoleKey);

    const { error } = await supabase.from("pz_pageviews").upsert(
      {
        path,
        referrer,
        session_id: sessionId,
        user_agent: userAgent,
        ip,
        ip_country: ipCountry,
      },
      {
        onConflict: "session_id",
        ignoreDuplicates: true,
      }
    );

    if (error) {
      console.error("[pz_track_pageview] Upsert error", { error });
      return json({ error: "Insert failed" }, 500);
    }

    return json({ ok: true });
  } catch (error) {
    console.error("[pz_track_pageview] Unexpected error", { error });
    return json({ error: "Unexpected error" }, 500);
  }
});