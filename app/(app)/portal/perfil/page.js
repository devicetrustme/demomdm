"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, User, Check } from "lucide-react";
import { RequireRole } from "../../../../lib/require-role";
import { useSession } from "../../../../lib/session";
import { AppTopBar } from "../../../../components/ui";

function PerfilContent() {
  const { session } = useSession();
  const [saved, setSaved] = useState(false);
  const [pw, setPw] = useState({ actual: "", nueva: "", confirmar: "" });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    setPw({ actual: "", nueva: "", confirmar: "" });
  };

  return (
    <div className="min-h-screen">
      <AppTopBar title="Mi perfil" />
      <div className="max-w-md mx-auto px-5 py-6">
        <Link href="/portal" className="flex items-center gap-1.5 text-sm text-slate-400 mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Menú principal
        </Link>

        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900">{session.name}</p>
            <p className="text-sm text-slate-400">Región {session.region} · Vendedor</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-sm font-medium text-slate-500 mb-3">Cambiar contraseña</p>
          <form onSubmit={handleSave} className="space-y-2.5">
            <input
              type="password" placeholder="Contraseña actual" value={pw.actual}
              onChange={(e) => setPw({ ...pw, actual: e.target.value })}
              className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5"
            />
            <input
              type="password" placeholder="Nueva contraseña" value={pw.nueva}
              onChange={(e) => setPw({ ...pw, nueva: e.target.value })}
              className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5"
            />
            <input
              type="password" placeholder="Confirmar nueva contraseña" value={pw.confirmar}
              onChange={(e) => setPw({ ...pw, confirmar: e.target.value })}
              className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5"
            />
            <button type="submit" className="w-full bg-blue-600 text-white text-base font-medium py-2.5 rounded-lg mt-1">
              Guardar cambios
            </button>
          </form>
          {saved && (
            <p className="flex items-center gap-1.5 text-sm text-emerald-600 mt-3">
              <Check className="w-3.5 h-3.5" /> Contraseña actualizada (demo, sin conexión real)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PerfilPage() {
  return (
    <RequireRole roles="vendor" loginPath="/login/vendedor">
      <PerfilContent />
    </RequireRole>
  );
}
