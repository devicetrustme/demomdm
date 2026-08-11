"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Wrench } from "lucide-react";
import { useSession } from "../../../../lib/session";
import { TECHNICIANS } from "../../../../lib/mock-data";

export default function LoginTecnicoPage() {
  const { login } = useSession();
  const router = useRouter();
  const [techId, setTechId] = useState("t1");
  const [password, setPassword] = useState("demo123");

  const handleLogin = (e) => {
    e.preventDefault();
    const tech = TECHNICIANS.find((t) => t.id === techId);
    login("technician", tech.name, { technicianId: tech.id, regionsCovered: tech.regionsCovered });
    router.push("/tecnico");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center mb-3">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <p className="text-base font-semibold text-slate-900">Portal del técnico</p>
          <p className="text-sm text-slate-400">Acceso interno — HONOR México</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label className="text-sm text-slate-500 mb-1 block">Perfil de técnico (demo)</label>
            <select
              value={techId}
              onChange={(e) => setTechId(e.target.value)}
              className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5"
            >
              {TECHNICIANS.map((t) => (
                <option key={t.id} value={t.id}>{t.name} — {t.regionsCovered.join(", ")}</option>
              ))}
            </select>
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
