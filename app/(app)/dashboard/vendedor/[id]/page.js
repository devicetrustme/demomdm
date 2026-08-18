"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Send, X } from "lucide-react";
import { RequireRole } from "../../../../../lib/require-role";
import { useSession } from "../../../../../lib/session";
import { useDataStore } from "../../../../../lib/data-store";
import { AppTopBar, Pill } from "../../../../../components/ui";
import { VENDORS, statusMeta } from "../../../../../lib/mock-data";
import { opportunityMonthlyValue, formatMXN } from "../../../../../lib/finance";

function VendedorDrillDownContent() {
  const { id } = useParams();
  const { session } = useSession();
  const { opportunities, addMessage } = useDataStore();
  const [msgOpen, setMsgOpen] = useState(false);
  const [msgText, setMsgText] = useState("¿Cómo va todo? Coordinemos una demo esta semana.");

  const vendor = VENDORS.find((v) => v.id === id);
  const opps = opportunities.filter((o) => o.vendorId === id);
  const backHref = session.role === "subdirector" ? "/subdireccion" : "/dashboard";
  const backLabel = session.role === "subdirector" ? "Subdirección" : "Dashboard";

  if (!vendor) {
    return (
      <div className="max-w-md mx-auto px-5 py-10 text-center text-base text-slate-400">
        Vendedor no encontrado. <Link href={backHref} className="text-blue-600">Volver</Link>
      </div>
    );
  }

  const sendMessage = () => {
    addMessage({ from: session.name, to: vendor.id, text: msgText });
    setMsgOpen(false);
  };

  return (
    <div className="min-h-screen">
      <AppTopBar title="Detalle del vendedor" />
      <div className="max-w-2xl mx-auto px-5 py-6">
        <Link href={backHref} className="flex items-center gap-1.5 text-sm text-slate-400 mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> {backLabel}
        </Link>

        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-medium text-base">
              {vendor.avatar}
            </div>
            <div>
              <p className="text-base font-semibold text-slate-900">{vendor.name}</p>
              <p className="text-sm text-slate-400">Región {vendor.region} · {opps.length} oportunidades</p>
            </div>
          </div>
          <button
            onClick={() => setMsgOpen(true)}
            className="flex items-center gap-1.5 bg-blue-600 text-white text-sm px-3 py-2 rounded-lg"
          >
            <Send className="w-3.5 h-3.5" /> Mensaje
          </button>
        </div>

        <p className="text-sm font-medium text-slate-500 mb-2">Oportunidades activas</p>
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          {opps.map((o, i) => {
            const st = statusMeta(o.status);
            const value = opportunityMonthlyValue(o);
            return (
              <div
                key={o.id}
                className={`flex items-center justify-between px-4 py-3 text-sm ${
                  i !== opps.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <div>
                  <p className="text-slate-900 font-medium">{o.client}</p>
                  <p className="text-slate-400 text-xs">{o.city} · {o.createdAt}</p>
                </div>
                <div className="flex items-center gap-2">
                  {value > 0 && <span className="text-slate-500">{formatMXN(value)}/mes</span>}
                  <Pill tone={st.tone}>{st.label}</Pill>
                </div>
              </div>
            );
          })}
          {opps.length === 0 && (
            <p className="text-sm text-slate-400 text-center py-8">Sin oportunidades registradas.</p>
          )}
        </div>
      </div>

      {msgOpen && (
        <div className="fixed inset-0 bg-slate-900/30 flex items-center justify-center z-10">
          <div className="bg-white rounded-xl w-80 p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <p className="text-base font-semibold text-slate-900">Mensaje a {vendor.name}</p>
              <X onClick={() => setMsgOpen(false)} className="w-4 h-4 text-slate-400 cursor-pointer" />
            </div>
            <textarea
              value={msgText}
              onChange={(e) => setMsgText(e.target.value)}
              className="w-full h-20 text-sm border border-slate-200 rounded-lg p-2.5 resize-none"
            />
            <button onClick={sendMessage} className="w-full mt-3 bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg">
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VendedorDrillDownPage() {
  return (
    <RequireRole roles={["manager", "subdirector"]} loginPath="/login/gerente">
      <VendedorDrillDownContent />
    </RequireRole>
  );
}
