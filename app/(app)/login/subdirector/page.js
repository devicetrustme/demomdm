"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Layers } from "lucide-react";
import { useSession } from "../../../../lib/session";
import { SUBDIRECTORS, DIRECTORS } from "../../../../lib/mock-data";

export default function LoginSubdirectorPage() {
  const { login } = useSession();
  const router = useRouter();
  const [subDirectorId, setSubDirectorId] = useState(SUBDIRECTORS[0].id);
  const [password, setPassword] = useState("demo123");

  const handleLogin = (e) => {
    e.preventDefault();
    const sd = SUBDIRECTORS.find((s) => s.id === subDirectorId);
    const director = DIRECTORS.find((d) => d.id === sd.directorId);
    login("subdirector", sd.name, {
      subDirectorId: sd.id, channel: sd.channel, regions: sd.regions, directorName: director?.name,
    });
    router.push("/subdireccion");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center mb-3">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <p className="text-base font-semibold text-slate-900">Dashboard del Subdirector</p>
          <p className="text-sm text-slate-400">Acceso interno — ScaleFusion Telcel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label className="text-sm text-slate-500 mb-1 block">Perfil de subdirector (demo)</label>
            <select
              value={subDirectorId}
              onChange={(e) => setSubDirectorId(e.target.value)}
              className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5"
            >
              {SUBDIRECTORS.map((sd) => (
                <option key={sd.id} value={sd.id}>{sd.name}</option>
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
          <Shield className="w-3 h-3" /> Cada subdirector ve solo las gerencias de su propio canal
        </p>
      </div>
    </div>
  );
}
