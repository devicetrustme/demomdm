"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Settings, PartyPopper, LogOut } from "lucide-react";
import { RequireRole } from "../../../../../lib/require-role";
import { useSession } from "../../../../../lib/session";
import { useDataStore } from "../../../../../lib/data-store";
import { AppTopBar, Pill } from "../../../../../components/ui";
import { STATUS_OPTIONS, statusMeta } from "../../../../../lib/mock-data";

function OportunidadContent() {
  const { id } = useParams();
  const router = useRouter();
  const { logout } = useSession();
  const { opportunities, updateStatus } = useDataStore();
  const opp = opportunities.find((o) => o.id === id);
  const [justClosed, setJustClosed] = useState(false);

  if (!opp) {
    return (
      <div className="max-w-md mx-auto px-5 py-10 text-center text-base text-slate-400">
        Oportunidad no encontrada. <Link href="/portal/oportunidades" className="text-blue-600">Volver</Link>
      </div>
    );
  }

  const handleStatusChange = (e) => {
    const next = e.target.value;
    updateStatus(opp.id, next);
    if (next === "concluida") setJustClosed(true);
  };

  const handleSalir = () => {
    router.push("/portal/oportunidades");
  };

  const handleSalirYLogout = () => {
    logout();
    router.push("/");
  };

  if (justClosed) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppTopBar title="Cierre de venta" />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-sm w-full text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <PartyPopper className="w-7 h-7 text-emerald-600" />
            </div>
            <p className="text-base font-semibold text-slate-900 mb-1">¡Venta concluida!</p>
            <p className="text-sm text-slate-500 mb-6">{opp.client} quedó marcada como concluida.</p>
            <div className="space-y-2">
              <button onClick={handleSalir} className="w-full bg-blue-600 text-white text-base font-medium py-2.5 rounded-lg">
                Volver a mis oportunidades
              </button>
              <button
                onClick={handleSalirYLogout}
                className="w-full flex items-center justify-center gap-1.5 text-slate-500 text-base py-2.5"
              >
                <LogOut className="w-4 h-4" /> Salir
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const st = statusMeta(opp.status);

  return (
    <div className="min-h-screen">
      <AppTopBar title="Detalle de oportunidad" />
      <div className="max-w-md mx-auto px-5 py-6">
        <Link href="/portal/oportunidades" className="flex items-center gap-1.5 text-sm text-slate-400 mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Mis oportunidades
        </Link>

        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-4">
          <p className="text-base font-semibold text-slate-900 mb-1">{opp.client}</p>
          <p className="text-sm text-slate-400 mb-3">{opp.city} · Región {opp.region} · Creada {opp.createdAt}</p>
          <Pill tone={st.tone}>{st.label}</Pill>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-4">
          <label className="text-sm font-medium text-slate-500 mb-2 block">Actualizar estatus</label>
          <select
            value={opp.status}
            onChange={handleStatusChange}
            className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <Link
          href={`/configurador?clientId=${opp.id}&clientName=${encodeURIComponent(opp.client)}`}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white text-base font-medium py-3 rounded-lg"
        >
          <Settings className="w-4 h-4" /> Abrir configurador MDM
        </Link>
      </div>
    </div>
  );
}

export default function OportunidadPage() {
  return (
    <RequireRole roles="vendor" loginPath="/login/vendedor">
      <OportunidadContent />
    </RequireRole>
  );
}
