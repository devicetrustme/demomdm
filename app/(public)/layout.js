import Chatbot from "../../components/Chatbot";

// Layout de las rutas públicas: landing, diagnóstico y encuesta NPS.
// Deliberadamente NO importa nada de sesión/autenticación — es un entorno
// 100% independiente del área logueada, como pide la regla arquitectónica global.
export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      {children}
      <Chatbot />
    </div>
  );
}
