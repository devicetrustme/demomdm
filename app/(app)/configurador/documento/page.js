"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Printer, Shield, ArrowLeft } from "lucide-react";
import { RequireRole } from "../../../../lib/require-role";
import { useDataStore } from "../../../../lib/data-store";
import { POLICIES, PROFILE_TYPES, LICENSE_CATALOG } from "../../../../lib/mock-data";

const PLATFORM_LABEL = { android: "Android", ios: "iOS", both: "Ambas" };
const LICENSE_LABEL = Object.fromEntries(LICENSE_CATALOG.map((l) => [l.id, l.label]));

function DocumentoContent() {
  const params = useSearchParams();
  const clientId = params.get("clientId");
  const { opportunities } = useDataStore();
  const opp = opportunities.find((o) => o.id === clientId);
  const config = opp?.deliveryConfig;

  // El título de la pestaña se usa como nombre sugerido al guardar el PDF
  // desde el diálogo de impresión del navegador.
  useEffect(() => {
    if (opp) document.title = `ScaleFusion - ${opp.client}${opp.deliveryConfig?.trackingNumber ? ` - ${opp.deliveryConfig.trackingNumber}` : ""}`;
  }, [opp]);

  if (!opp || !config) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-sm text-slate-400 px-6 text-center gap-4">
        <p>
          No hay una configuración generada todavía para esta oportunidad.
          Vuelve al Configurador MDM y complétalo hasta el final.
        </p>
        {clientId && (
          <Link href={`/portal/oportunidad/${clientId}`} className="text-blue-600 flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" /> Volver a la oportunidad
          </Link>
        )}
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

      <div className="no-print sticky top-0 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between z-10 gap-3">
        <Link href={`/portal/oportunidad/${opp.id}`} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 shrink-0">
          <ArrowLeft className="w-3.5 h-3.5" /> Volver
        </Link>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg shrink-0"
        >
          <Printer className="w-4 h-4" /> Imprimir / Guardar como PDF
        </button>
      </div>

      <div className="print-page max-w-2xl mx-auto bg-white my-8 p-10 shadow-sm">
        {/* Encabezado */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-2">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-base font-semibold text-slate-900">ScaleFusion</span>
          </div>
          <p className="text-sm text-slate-400">Documento de configuración MDM</p>
        </div>

        {config.trackingNumber && (
          <p className="text-sm text-blue-600 font-medium mb-6">
            Folio de seguimiento: {config.trackingNumber}
          </p>
        )}

        <h1 className="text-xl font-semibold text-slate-900 mb-1">{opp.client}</h1>
        <p className="text-sm text-slate-400 mb-4">
          {opp.city} · Región {opp.region} · Plataforma general: {PLATFORM_LABEL[config.platform]} · Generado el {config.acceptedAt}
        </p>

        {config.licenseId && (
          <div className="bg-slate-50 rounded-lg px-4 py-3 mb-6">
            <p className="text-sm font-medium text-slate-900">
              Licencia {LICENSE_LABEL[config.licenseId] || config.licenseId}
            </p>
            <p className="text-sm text-blue-700 font-medium">
              ${(config.monthlyValue || 0).toLocaleString("es-MX")} MXN/mes · ${(config.annualValue || 0).toLocaleString("es-MX")} MXN/año
            </p>
          </div>
        )}

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

        {/* Persona que recibirá la consola */}
        {config.consoleRecipient?.name && (
          <div className="border-t border-slate-200 pt-6 mt-2 mb-6">
            <p className="text-sm font-semibold text-slate-900 mb-2">Persona que recibirá la consola de administración</p>
            <table className="w-full text-sm text-slate-700">
              <tbody>
                <tr><td className="py-1 pr-3 text-slate-400 w-28">Nombre</td><td className="py-1 font-medium">{config.consoleRecipient.name}</td></tr>
                <tr><td className="py-1 pr-3 text-slate-400">Puesto</td><td className="py-1">{config.consoleRecipient.position}</td></tr>
                <tr><td className="py-1 pr-3 text-slate-400">Compañía</td><td className="py-1">{config.consoleRecipient.company}</td></tr>
                <tr><td className="py-1 pr-3 text-slate-400">Correo</td><td className="py-1">{config.consoleRecipient.email}</td></tr>
                <tr><td className="py-1 pr-3 text-slate-400">Teléfono celular</td><td className="py-1">{config.consoleRecipient.phone}</td></tr>
              </tbody>
            </table>
          </div>
        )}

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
