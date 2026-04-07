import { Navigate, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import ConsertosDeCelular from "./pages/ConsertosDeCelular";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/consertos-de-celular" element={<ConsertosDeCelular />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
