"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users, MapPin, MessageCircle, LayoutGrid, Send, TrendingUp, X, ChevronRight, Inbox, BarChart3,
} from "lucide-react";
import { RequireRole } from "../../../lib/require-role";
import { useSession } from "../../../lib/session";
import { useDataStore } from "../../../lib/data-store";
import { AppTopBar, Pill } from "../../../components/ui";
import { vendorsForManager, managersForRegion, CHANNEL_LABEL } from "../../../lib/mock-data";
import { opportunityMonthlyValue, formatMXN } from "../../../lib/finance";

function DashboardContent() {
  const { session } = useSession();
  const { opportunities, diagnostics, addMessage, assignToVendor } = useDataStore();
  const [msgTarget, setMsgTarget] = useState(null);
  const [msgText, setMsgText] = useState("Recuerden dar seguimiento a las oportunidades con más de 5 días sin movimiento.");
  const [assigningId, setAssigningId] = useState(null);

  const myVendors = vendorsForManager(session.managerId);

  // Bandeja: oportunidades nuevas de la región, aún sin vendedor — visibles para
  // ambos gerentes (PyME/Corporativo) de esa región hasta que uno la asigna.
  const inbox = opportunities.filter((o) => o.region === session.region && !o.vendorId);

  // Actividad de mis propios vendedores ya asignados
  const myOpps = opportunities.filter((o) => myVendors.some((v) => v.id === o.vendorId));
  const totalOpen = myOpps.filter((o) => o.status !== "concluida").length;
  const pipelineValue = myOpps.filter((o) => o.status !== "concluida").reduce((sum, o) => sum + opportunityMonthlyValue(o), 0);
  const vendorStats = myVendors.map((v) => {
    const opps = opportunities.filter((o) => o.vendorId === v.id);
    return { ...v, openCount: opps.filter((o) => o.status !== "concluida").length, total: opps.length };
  });
  const maxOpen = Math.max(1, ...vendorStats.map((v) => v.openCount));

  // Panel de diagnósticos — últimos 7 días, de toda la región (no solo mis vendedores)
  const regionDiagnostics = diagnostics.filter((d) => d.region === session.region);
  const riskCounts = { alta: 0, media: 0, baja: 0 };
  regionDiagnostics.forEach((d) => { riskCounts[d.risk] = (riskCounts[d.risk] || 0) + 1; });

  const sendMessage = () => {
    if (msgTarget === "all") myVendors.forEach((v) => addMessage({ from: session.name, to: v.id, text: msgText }));
    else if (msgTarget) addMessage({ from: session.name, to: msgTarget, text: msgText });
    setMsgTarget(null);
  };

  const handleAssign = (oppId, vendorId) => {
    assignToVendor(oppId, { vendorId, managerId: session.managerId, segment: session.segment });
    setAssigningId(null);
  };

  return (
    <div className="min-h-screen">
      <AppTopBar title="Dashboard del gerente" />
      <div className="max-w-5xl mx-auto flex">
        <div className="w-48 border-r border-slate-100 p-4 hidden md:flex md:flex-col gap-1 min-h-[calc(100vh-57px)]">
          {[
            { icon: LayoutGrid, label: "Resumen", active: true },
            { icon: Inbox, label: "Bandeja" },
            { icon: Users, label: "Vendedores" },
            { icon: MessageCircle, label: "Mensajes" },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm ${item.active ? "bg-blue-50 text-blue-700 font-medium border-l-2 border-blue-600" : "text-slate-500"}`}>
              <item.icon className="w-3.5 h-3.5" /> {item.label}
            </div>
          ))}
        </div>

        <div className="flex-1 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-base font-semibold text-slate-900">Región {session.region} · {CHANNEL_LABEL[session.segment] || session.segment}</p>
              <p className="text-sm text-slate-400">{session.name}</p>
            </div>
            <button onClick={() => setMsgTarget("all")} className="flex items-center gap-1.5 bg-blue-600 text-white text-sm px-3.5 py-2 rounded-lg">
              <Send className="w-3.5 h-3.5" /> Enviar mensaje
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <div className="rounded-xl border border-slate-200 p-3.5">
              <TrendingUp className="w-4 h-4 text-blue-600 mb-2" />
              <p className="text-lg font-semibold text-slate-900">{totalOpen}</p>
              <p className="text-sm text-slate-400">Oportunidades abiertas</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-3.5">
              <TrendingUp className="w-4 h-4 text-emerald-600 mb-2" />
              <p className="text-lg font-semibold text-slate-900">{formatMXN(pipelineValue)}</p>
              <p className="text-sm text-slate-400">Pipeline / mes</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-3.5">
              <Users className="w-4 h-4 text-blue-600 mb-2" />
              <p className="text-lg font-semibold text-slate-900">{myVendors.length}</p>
              <p className="text-sm text-slate-400">Vendedores en el equipo</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-3.5">
              <Inbox className="w-4 h-4 text-blue-600 mb-2" />
              <p className="text-lg font-semibold text-slate-900">{inbox.length}</p>
              <p className="text-sm text-slate-400">Nuevas por asignar</p>
            </div>
          </div>

          {/* Bandeja de entrada */}
          <p className="text-sm font-medium text-slate-500 mb-2">Bandeja de entrada — Región {session.region}</p>
          <div className="rounded-xl border border-slate-200 overflow-hidden mb-5">
            {inbox.map((o, i) => (
              <div key={o.id} className={`px-4 py-3 text-sm ${i !== inbox.length - 1 ? "border-b border-slate-100" : ""}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <p className="text-slate-900 font-medium">{o.client}</p>
                    <p className="text-slate-400 text-xs">{o.city} · Riesgo {o.risk} · {o.createdAt}</p>
                  </div>
                  <button
                    onClick={() => setAssigningId(assigningId === o.id ? null : o.id)}
                    className="text-sm bg-blue-600 text-white px-2.5 py-1.5 rounded-lg shrink-0"
                  >
                    Asignar / Enviar
                  </button>
                </div>
                {assigningId === o.id && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {myVendors.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => handleAssign(o.id, v.id)}
                        className="text-sm border border-slate-200 rounded-lg px-2.5 py-1.5 hover:border-blue-400 hover:text-blue-600"
                      >
                        {v.name}
                      </button>
                    ))}
                    {myVendors.length === 0 && <p className="text-sm text-slate-400">No tienes vendedores asignados.</p>}
                  </div>
                )}
              </div>
            ))}
            {inbox.length === 0 && <p className="text-sm text-slate-400 text-center py-6">Sin oportunidades nuevas por ahora.</p>}
          </div>

          {/* Panel de análisis de diagnóstico */}
          <p className="text-sm font-medium text-slate-500 mb-2 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5" /> Panel de análisis de diagnóstico — Región {session.region}
          </p>
          <div className="rounded-xl border border-slate-200 p-4 mb-5">
            <div className="flex items-center gap-4">
              {[
                { key: "alta", label: "Riesgo alto", tone: "bg-red-500" },
                { key: "media", label: "Riesgo medio", tone: "bg-amber-500" },
                { key: "baja", label: "Riesgo bajo", tone: "bg-emerald-500" },
              ].map((r) => (
                <div key={r.key} className="flex-1 text-center">
                  <div className="flex items-end justify-center h-16 mb-2">
                    <div className={`w-8 ${r.tone} rounded-t`} style={{ height: `${Math.min(100, (riskCounts[r.key] || 0) * 20 + 8)}%` }} />
                  </div>
                  <p className="text-base font-semibold text-slate-900">{riskCounts[r.key] || 0}</p>
                  <p className="text-xs text-slate-400">{r.label}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-400 mt-3">{regionDiagnostics.length} diagnósticos recibidos en la región.</p>
          </div>

          <p className="text-sm font-medium text-slate-500 mb-2">Actividad por vendedor</p>
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            {vendorStats.map((v, i) => (
              <Link key={v.id} href={`/dashboard/vendedor/${v.id}`} className={`flex items-center justify-between px-4 py-3 text-sm hover:bg-slate-50 transition-colors ${i !== vendorStats.length - 1 ? "border-b border-slate-100" : ""}`}>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-medium text-xs">{v.avatar}</div>
                  <div>
                    <p className="text-slate-900 font-medium">{v.name}</p>
                    <p className="text-slate-400 text-xs">Región {v.region}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500">{v.total} totales</span>
                  <Pill tone="blue">{v.openCount} abiertas</Pill>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                </div>
              </Link>
            ))}
            {vendorStats.length === 0 && <p className="text-sm text-slate-400 text-center py-6">Sin vendedores en tu equipo todavía.</p>}
          </div>
        </div>
      </div>

      {msgTarget && (
        <div className="fixed inset-0 bg-slate-900/30 flex items-center justify-center z-10">
          <div className="bg-white rounded-xl w-80 p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <p className="text-base font-semibold text-slate-900">
                {msgTarget === "all" ? "Mensaje a todo el equipo" : "Mensaje directo"}
              </p>
              <X onClick={() => setMsgTarget(null)} className="w-4 h-4 text-slate-400 cursor-pointer" />
            </div>
            <textarea value={msgText} onChange={(e) => setMsgText(e.target.value)} className="w-full h-20 text-sm border border-slate-200 rounded-lg p-2.5 resize-none" />
            <button onClick={sendMessage} className="w-full mt-3 bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg">Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <RequireRole roles="manager" loginPath="/login/gerente">
      <DashboardContent />
    </RequireRole>
  );
}
