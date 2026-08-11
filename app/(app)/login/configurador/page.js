"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Settings } from "lucide-react";
import { useSession } from "../../../../lib/session";

export default function LoginConfiguradorPage() {
  const { login } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("tecnico.mdm@honor.mx");
  const [password, setPassword] = useState("demo123");

  const handleLogin = (e) => {
    e.preventDefault();
    login("configurador", "Acceso técnico directo");
    router.push("/configurador");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center mb-3">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <p className="text-base font-semibold text-slate-900">Configurador MDM</p>
          <p className="text-sm text-slate-400">Acceso independiente — HONOR México</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label className="text-sm text-slate-500 mb-1 block">Correo</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5"
            />
          </div>
          <div>
            <label className="text-sm text-slate-500 mb-1 block">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white text-base font-medium py-2.5 rounded-lg mt-2">
            Iniciar sesión (usuario demo)
          </button>
        </form>
        <p className="text-sm text-slate-400 text-center mt-4 leading-relaxed">
          Nota: la ruta principal es lanzarlo desde el Portal del vendedor.
          <br />Este acceso es solo para uso técnico independiente.
        </p>
      </div>
    </div>
  );
}
