import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import ConsertosDeCelular from "./pages/ConsertosDeCelular";
import Contato from "./pages/Contato";
import { supabase } from "./integrations/supabase/client";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return null;
}

function getOrCreateSessionId() {
  const key = "pz_session_id";
  const existing = localStorage.getItem(key);
  if (existing) return existing;

  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  localStorage.setItem(key, id);
  return id;
}

function hasTrackedSession(sessionId: string) {
  return localStorage.getItem("pz_session_tracked") === sessionId;
}

function markTrackedSession(sessionId: string) {
  localStorage.setItem("pz_session_tracked", sessionId);
}

function SessionAccessTracker() {
  const location = useLocation();

  useEffect(() => {
    const session_id = getOrCreateSessionId();
    if (hasTrackedSession(session_id)) return;

    // Registra apenas 1 vez por sessão (primeira página visitada).
    const path = `${location.pathname}${location.search}${location.hash}`;
    const referrer = document.referrer || undefined;

    markTrackedSession(session_id);

    // Fire-and-forget: não bloqueia navegação.
    supabase.functions.invoke("pz_track_pageview", {
      body: {
        path,
        referrer,
        session_id,
      },
    });
  }, [location.pathname, location.search, location.hash]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SessionAccessTracker />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/consertos-de-celular" element={<ConsertosDeCelular />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}