import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
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

function PageviewTracker() {
  const location = useLocation();
  const lastPathRef = useRef<string>("");

  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`;
    if (lastPathRef.current === path) return;
    lastPathRef.current = path;

    const session_id = getOrCreateSessionId();
    const referrer = document.referrer || undefined;

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
      <PageviewTracker />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/consertos-de-celular" element={<ConsertosDeCelular />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}