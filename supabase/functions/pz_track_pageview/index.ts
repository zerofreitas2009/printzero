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
    const userAgent = (req.headers.get("user-agent") ?? "").slice(0, 1000) || null;

    const supabase = createClient(url, serviceRoleKey);

    const { error } = await supabase.from("pz_pageviews").insert({
      path,
      referrer,
      session_id: sessionId,
      user_agent: userAgent,
    });

    if (error) {
      console.error("[pz_track_pageview] Insert error", { error });
      return json({ error: "Insert failed" }, 500);
    }

    return json({ ok: true });
  } catch (error) {
    console.error("[pz_track_pageview] Unexpected error", { error });
    return json({ error: "Unexpected error" }, 500);
  }
});
