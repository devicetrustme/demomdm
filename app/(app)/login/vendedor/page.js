"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, User } from "lucide-react";
import { useSession } from "../../../../lib/session";
import { VENDORS } from "../../../../lib/mock-data";

export default function LoginVendedorPage() {
  const { login } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("alberto.ramirez@honor.mx");
  const [password, setPassword] = useState("demo123");

  const handleLogin = (e) => {
    e.preventDefault();
    const vendor = VENDORS[0]; // usuario demo fijo para validar la UI
    login("vendor", vendor.name, { vendorId: vendor.id, region: vendor.region });
    router.push("/portal");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center mb-3">
            <User className="w-5 h-5 text-white" />
          </div>
          <p className="text-base font-semibold text-slate-900">Portal del vendedor</p>
          <p className="text-sm text-slate-400">Acceso interno — HONOR México</p>
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
        <p className="text-sm text-slate-400 text-center mt-4 flex items-center justify-center gap-1">
          <Shield className="w-3 h-3" /> En producción esto usa Supabase Auth + MFA
        </p>
      </div>
    </div>
  );
}
