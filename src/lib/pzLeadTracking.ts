import { supabase } from "../integrations/supabase/client";

type EventType = "contact_click" | "form_submit";
type ContactKind = "orcamento" | "assistencia";
type ContactChannel = "whatsapp" | "email" | "page_link";

export type PzLeadEventPayload = {
  event_type: EventType;
  contact_kind: ContactKind;
  contact_channel: ContactChannel;
  page_path?: string;
  referrer?: string;
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
};

function getSessionId() {
  try {
    const key = "pz_sid";
    const existing = localStorage.getItem(key);
    if (existing) return existing;

    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}_${Math.random().toString(16).slice(2)}`;

    localStorage.setItem(key, id);
    return id;
  } catch {
    return undefined;
  }
}

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_term: params.get("utm_term") ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
  };
}

function getPlatform() {
  const isCoarse =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches;

  const width = typeof window !== "undefined" ? window.innerWidth : undefined;

  const deviceType = isCoarse || (width != null && width < 768) ? "mobile" : "desktop";

  return {
    deviceType,
    platform: navigator.platform ?? undefined,
  };
}

function getScreen() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function trackLeadEvent(payload: PzLeadEventPayload) {
  try {
    const locale = navigator.language ?? undefined;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    void supabase.functions.invoke("pz_track_lead", {
      body: {
        ...getUtmParams(),
        session_id: getSessionId(),
        locale,
        timezone,
        platform: getPlatform(),
        screen: getScreen(),
        page_path: payload.page_path ?? window.location.pathname,
        referrer: payload.referrer ?? document.referrer ?? undefined,
        ...payload,
      },
    });
  } catch {
    // tracking é best-effort
  }
}
