import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import ConsertosDeCelular from "./pages/ConsertosDeCelular";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/consertos-de-celular" element={<ConsertosDeCelular />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}