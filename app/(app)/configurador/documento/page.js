"use client";

import { useSearchParams } from "next/navigation";
import { Printer, Shield } from "lucide-react";
import { RequireRole } from "../../../../lib/require-role";
import { useDataStore } from "../../../../lib/data-store";
import { POLICIES, PROFILE_TYPES } from "../../../../lib/mock-data";

const PLATFORM_LABEL = { android: "Android", ios: "iOS", both: "Ambas" };

function DocumentoContent() {
  const params = useSearchParams();
  const clientId = params.get("clientId");
  const { opportunities } = useDataStore();
  const opp = opportunities.find((o) => o.id === clientId);
  const config = opp?.deliveryConfig;

  if (!opp || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-slate-400 px-6 text-center">
        No hay una configuración generada todavía para esta oportunidad.
        Vuelve al Configurador MDM y complétalo hasta el final.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .print-page { box-shadow: none !important; margin: 0 !important; }
        }
      `}</style>

      <div className="no-print sticky top-0 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between z-10">
        <p className="text-sm text-slate-500">Vista previa del documento</p>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg"
        >
          <Printer className="w-4 h-4" /> Imprimir / Guardar como PDF
        </button>
      </div>

      <div className="print-page max-w-2xl mx-auto bg-white my-8 p-10 shadow-sm">
        {/* Encabezado */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-slate-900">HONOR México</span>
          </div>
          <p className="text-xs text-slate-400">Documento de configuración MDM</p>
        </div>

        <h1 className="text-xl font-semibold text-slate-900 mb-1">{opp.client}</h1>
        <p className="text-sm text-slate-400 mb-6">
          {opp.city} · Región {opp.region} · Plataforma general: {PLATFORM_LABEL[config.platform]} · Generado el {config.acceptedAt}
        </p>

        {/* Perfiles */}
        {config.segments.map((s, i) => (
          <div key={s.id} className="mb-8 break-inside-avoid">
            <div className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-2.5 mb-3">
              <p className="text-sm font-semibold text-slate-900">
                Perfil {i + 1}: {s.name} — {PLATFORM_LABEL[s.platform] || ""}
              </p>
              <p className="text-sm text-slate-500">
                {s.devices} equipos · {PROFILE_TYPES.find((p) => p.key === s.profileType)?.label}
              </p>
            </div>

            <p className="text-xs font-medium text-slate-500 mb-2">Políticas de seguridad aplicadas</p>
            <ul className="mb-3 space-y-1">
              {POLICIES.filter((p) => s.policies.includes(p.key)).map((p) => (
                <li key={p.key} className="text-sm text-slate-700 flex gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>
                    <span className="font-medium">{p.label}</span>
                    <span className="text-slate-400"> — {p.hint}</span>
                  </span>
                </li>
              ))}
              {s.policies.length === 0 && <li className="text-sm text-slate-400">Sin políticas activas.</li>}
            </ul>

            <p className="text-xs font-medium text-slate-500 mb-2">Aplicaciones instaladas</p>
            <p className="text-sm text-slate-700 mb-3">
              {s.apps.length > 0 ? s.apps.join(", ") : "Sin aplicaciones seleccionadas."}
            </p>

            {s.zeroTouchEnabled && (
              <p className="text-sm text-blue-700 bg-blue-50 rounded-lg px-3 py-2">
                Inscripción automática vía {s.platform === "ios" ? "Apple Business Manager" : "Zero-Touch"} con la
                cuenta <span className="font-medium">{s.zeroTouchEmail}</span>.
              </p>
            )}
          </div>
        ))}

        {/* Firma de aceptación */}
        <div className="border-t border-slate-200 pt-6 mt-8">
          <p className="text-sm font-medium text-slate-900 mb-1">Firma de aceptación</p>
          <p className="text-xs text-slate-500 mb-8">
            Confirmo que esta configuración corresponde exactamente a lo solicitado para {opp.client}.
          </p>
          <div className="flex items-end justify-between gap-8">
            <div className="flex-1">
              <div className="border-b border-slate-400 mb-1.5 h-10" />
              <p className="text-sm text-slate-700">{config.acceptedBy}</p>
              <p className="text-xs text-slate-400">Nombre y firma de aceptación</p>
            </div>
            <div className="w-32">
              <div className="border-b border-slate-400 mb-1.5 h-10" />
              <p className="text-sm text-slate-700">{config.acceptedAt}</p>
              <p className="text-xs text-slate-400">Fecha</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DocumentoPage() {
  return (
    <RequireRole roles={["vendor", "manager", "configurador"]} loginPath="/login/configurador">
      <DocumentoContent />
    </RequireRole>
  );
}
