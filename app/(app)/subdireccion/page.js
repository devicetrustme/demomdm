"use client";

import { useState } from "react";
import Link from "next/link";
import { TrendingUp, Users, UserCog, Briefcase, ChevronRight, ChevronDown } from "lucide-react";
import { RequireRole } from "../../../lib/require-role";
import { useSession } from "../../../lib/session";
import { useDataStore } from "../../../lib/data-store";
import { AppTopBar, Pill } from "../../../components/ui";
import { MANAGERS, VENDORS, CHANNEL_LABEL, statusMeta } from "../../../lib/mock-data";
import { opportunityMonthlyValue, formatMXN } from "../../../lib/finance";

function SubdireccionContent() {
  const { session } = useSession();
  const { opportunities } = useDataStore();
  const [expandedManager, setExpandedManager] = useState(null);

  // A diferencia del Director (que ve todo su alcance de regiones), el
  // Subdirector solo ve las gerencias que cuelgan de su propio canal.
  const managersInScope = MANAGERS.filter((m) => m.subDirectorId === session.subDirectorId);
  const managerIds = managersInScope.map((m) => m.id);
  const vendorsInScope = VENDORS.filter((v) => managerIds.includes(v.managerId));
  const vendorIds = vendorsInScope.map((v) => v.id);
  const oppsInScope = opportunities.filter((o) => vendorIds.includes(o.vendorId));

  const openOpps = oppsInScope.filter((o) => o.status !== "concluida");
  const closedOpps = oppsInScope.filter((o) => o.status === "concluida");
  const pipelineValue = openOpps.reduce((sum, o) => sum + opportunityMonthlyValue(o), 0);
  const closedValue = closedOpps.reduce((sum, o) => sum + opportunityMonthlyValue(o), 0);

  const byManager = managersInScope.map((m) => {
    const vIds = vendorsInScope.filter((v) => v.managerId === m.id).map((v) => v.id);
    const opps = oppsInScope.filter((o) => vIds.includes(o.vendorId));
    const value = opps.reduce((sum, o) => sum + opportunityMonthlyValue(o), 0);
    return { manager: m, opps, value };
  });

  const byVendor = vendorsInScope.map((v) => {
    const opps = oppsInScope.filter((o) => o.vendorId === v.id);
    const value = opps.reduce((sum, o) => sum + opportunityMonthlyValue(o), 0);
    const manager = MANAGERS.find((m) => m.id === v.managerId);
    return { vendor: v, manager, opps, value };
  }).sort((a, b) => b.value - a.value);

  return (
    <div className="min-h-screen">
      <AppTopBar title="Dashboard del Subdirector" />
      <div className="max-w-4xl mx-auto px-5 py-6">
        <div className="mb-5">
          <p className="text-base font-semibold text-slate-900">{session.name}</p>
          <p className="text-sm text-slate-400">
            Canal {CHANNEL_LABEL[session.channel]} · Reporta a {session.directorName} · Regiones: {session.regions?.join(", ")}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="rounded-xl border border-slate-200 p-3.5">
            <TrendingUp className="w-4 h-4 text-blue-600 mb-2" />
            <p className="text-lg font-semibold text-slate-900">{formatMXN(pipelineValue)}</p>
            <p className="text-sm text-slate-400">Pipeline abierto / mes</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-3.5">
            <TrendingUp className="w-4 h-4 text-emerald-600 mb-2" />
            <p className="text-lg font-semibold text-slate-900">{formatMXN(closedValue)}</p>
            <p className="text-sm text-slate-400">Valor ganado / mes</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-3.5">
            <UserCog className="w-4 h-4 text-blue-600 mb-2" />
            <p className="text-lg font-semibold text-slate-900">{managersInScope.length}</p>
            <p className="text-sm text-slate-400">Gerencias</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-3.5">
            <Users className="w-4 h-4 text-blue-600 mb-2" />
            <p className="text-lg font-semibold text-slate-900">{vendorsInScope.length}</p>
            <p className="text-sm text-slate-400">Vendedores</p>
          </div>
        </div>

        <p className="text-sm font-medium text-slate-500 mb-2 flex items-center gap-1.5">
          <UserCog className="w-3.5 h-3.5" /> Pipeline por gerencia
        </p>
        <div className="rounded-xl border border-slate-200 overflow-hidden mb-6">
          {byManager.map((row, i) => (
            <div key={row.manager.id} className={i !== byManager.length - 1 ? "border-b border-slate-100" : ""}>
              <button
                onClick={() => setExpandedManager(expandedManager === row.manager.id ? null : row.manager.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-slate-50 transition-colors"
              >
                <div className="text-left">
                  <p className="text-slate-900 font-medium">{row.manager.name}</p>
                  <p className="text-slate-400 text-sm">Región {row.manager.region} · {row.opps.length} oportunidades</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-medium">{formatMXN(row.value)}/mes</span>
                  {expandedManager === row.manager.id ? <ChevronDown className="w-4 h-4 text-slate-300" /> : <ChevronRight className="w-4 h-4 text-slate-300" />}
                </div>
              </button>
              {expandedManager === row.manager.id && (
                <div className="px-4 pb-3 space-y-1.5">
                  {row.opps.length === 0 && <p className="text-sm text-slate-400">Sin oportunidades todavía.</p>}
                  {row.opps.map((o) => {
                    const st = statusMeta(o.status);
                    const vendor = VENDORS.find((v) => v.id === o.vendorId);
                    return (
                      <div key={o.id} className="flex items-center justify-between text-sm bg-slate-50 rounded-lg px-3 py-2">
                        <div>
                          <span className="text-slate-800 font-medium">{o.client}</span>
                          <span className="text-slate-400"> · {vendor?.name || "sin vendedor"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Pill tone={st.tone}>{st.label}</Pill>
                          <span className="text-slate-500">{formatMXN(opportunityMonthlyValue(o))}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-sm font-medium text-slate-500 mb-2 flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5" /> Pipeline por vendedor
        </p>
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          {byVendor.map((row, i) => (
            <Link
              key={row.vendor.id}
              href={`/dashboard/vendedor/${row.vendor.id}`}
              className={`flex items-center justify-between px-4 py-3 text-sm hover:bg-slate-50 transition-colors ${
                i !== byVendor.length - 1 ? "border-b border-slate-100" : ""
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-medium text-sm">
                  {row.vendor.avatar}
                </div>
                <div>
                  <p className="text-slate-900 font-medium">{row.vendor.name}</p>
                  <p className="text-slate-400 text-sm">{row.manager?.name} · {row.opps.length} oportunidades</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-medium">{formatMXN(row.value)}/mes</span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            </Link>
          ))}
          {byVendor.length === 0 && (
            <p className="text-sm text-slate-400 text-center py-8">Sin vendedores en este canal todavía.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SubdireccionPage() {
  return (
    <RequireRole roles="subdirector" loginPath="/login/subdirector">
      <SubdireccionContent />
    </RequireRole>
  );
}
