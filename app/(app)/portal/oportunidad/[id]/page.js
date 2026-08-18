"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Settings, PartyPopper, LogOut, Calendar, Check, Download, X, FileText } from "lucide-react";
import { RequireRole } from "../../../../../lib/require-role";
import { useSession, logoutDestination } from "../../../../../lib/session";
import { useDataStore } from "../../../../../lib/data-store";
import { AppTopBar, Pill } from "../../../../../components/ui";
import { STATUS_OPTIONS, statusMeta, TIMEZONES, DEMO_MODALITIES, LICENSE_CATALOG, licenseById } from "../../../../../lib/mock-data";
import { isFutureDateTime } from "../../../../../lib/validators";
import { buildIcs, downloadIcs } from "../../../../../lib/ics";

function OportunidadContent() {
  const { id } = useParams();
  const router = useRouter();
  const { session, logout } = useSession();
  const { opportunities, updateStatus, updateOpportunityLicense, addDemoRequest } = useDataStore();
  const opp = opportunities.find((o) => o.id === id);
  const [justClosed, setJustClosed] = useState(false);
  const [licenseId, setLicenseId] = useState("");
  const [deviceCountEstimate, setDeviceCountEstimate] = useState("");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    requestedDate: "", requestedTime: "", timezone: "America/Mexico_City",
    durationMinutes: 30, modality: "videollamada", comments: "",
  });
  const [scheduleError, setScheduleError] = useState("");
  const [icsReady, setIcsReady] = useState(null);

  useEffect(() => {
    if (opp) {
      setLicenseId(opp.licenseId || "");
      setDeviceCountEstimate(opp.deviceCountEstimate ? String(opp.deviceCountEstimate) : "");
    }
  }, [opp?.id]);

  const saveLicense = () => {
    updateOpportunityLicense(id, {
      licenseId: licenseId || null,
      deviceCountEstimate: Number(deviceCountEstimate) || 0,
    });
  };

  if (!opp) {
    return (
      <div className="max-w-md mx-auto px-5 py-10 text-center text-base text-slate-400">
        Oportunidad no encontrada. <Link href="/portal/oportunidades" className="text-blue-600">Volver</Link>
      </div>
    );
  }

  const handleStatusChange = (e) => {
    const next = e.target.value;
    if (next === "en_evaluacion" && opp.status !== "en_evaluacion") {
      // Se ofrece la opción de agendar la llamada antes de confirmar el cambio.
      setShowScheduleModal(true);
      return;
    }
    updateStatus(opp.id, next);
    if (next === "concluida") setJustClosed(true);
  };

  const updateScheduleField = (field) => (e) => setScheduleForm({ ...scheduleForm, [field]: e.target.value });

  const confirmScheduleAndUpdate = () => {
    const f = scheduleForm;
    if (!f.requestedDate || !f.requestedTime) { setScheduleError("Elige fecha y hora."); return; }
    if (!isFutureDateTime(f.requestedDate, f.requestedTime)) { setScheduleError("Elige una fecha y hora futuras."); return; }
    setScheduleError("");

    addDemoRequest({
      opportunityId: opp.id,
      attendeeName: opp.client, company: opp.company, email: opp.email, phone: opp.phone,
      requestedDate: f.requestedDate, requestedTime: f.requestedTime, timezone: f.timezone,
      durationMinutes: f.durationMinutes, modality: f.modality, comments: f.comments, consentInvite: true,
    });

    const start = new Date(`${f.requestedDate}T${f.requestedTime}`);
    const ics = buildIcs({
      uid: `llamada-${opp.id}@honor.mx`,
      title: `Llamada de seguimiento — ${opp.company || opp.client}`,
      description: `Llamada de evaluación con ${opp.client}${opp.company ? ` (${opp.company})` : ""}. ${f.comments || ""}`,
      start,
      durationMinutes: Number(f.durationMinutes),
      attendeeEmails: [opp.email].filter(Boolean),
      location: f.modality,
    });
    setIcsReady(ics);
    updateStatus(opp.id, "en_evaluacion");
  };

  const skipScheduleAndUpdate = () => {
    setShowScheduleModal(false);
    setScheduleError("");
    updateStatus(opp.id, "en_evaluacion");
  };

  const closeScheduleModal = () => {
    setShowScheduleModal(false);
    setIcsReady(null);
    setScheduleForm({ requestedDate: "", requestedTime: "", timezone: "America/Mexico_City", durationMinutes: 30, modality: "videollamada", comments: "" });
  };

  const handleSalir = () => {
    router.push("/portal/oportunidades");
  };

  const handleSalirYLogout = () => {
    router.push(logoutDestination(session.role));
    setTimeout(() => logout(), 300);
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
          {opp.company && <p className="text-sm text-slate-500 mb-1">{opp.company}{opp.position ? ` · ${opp.position}` : ""}</p>}
          <p className="text-sm text-slate-400 mb-3">{opp.city} · Región {opp.region} · Creada {opp.createdAt}</p>
          {(opp.email || opp.phone) && (
            <p className="text-sm text-slate-400 mb-3">
              {opp.email}{opp.email && opp.phone ? " · " : ""}{opp.phone}
            </p>
          )}
          <Pill tone={st.tone}>{st.label}</Pill>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-4">
          <label className="text-sm font-medium text-slate-500 mb-2 block">Licencia y valor estimado</label>
          <p className="text-xs text-slate-400 mb-3">
            Para ir pensando en el tamaño de esta oportunidad — precios en MXN, sin IVA incluido.
          </p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {LICENSE_CATALOG.map((l) => (
              <button
                key={l.id}
                onClick={() => setLicenseId(l.id)}
                className={`text-left rounded-lg border px-3 py-2.5 transition-colors ${
                  licenseId === l.id ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-300"
                }`}
              >
                <p className="text-sm font-semibold text-slate-900">{l.label}</p>
                <p className="text-xs text-slate-400">${l.price} MXN/equipo/mes</p>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="number" min="0" value={deviceCountEstimate}
              onChange={(e) => setDeviceCountEstimate(e.target.value)}
              placeholder="# equipos estimados"
              className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2.5"
            />
            <button onClick={saveLicense} className="text-sm bg-slate-900 text-white px-4 py-2.5 rounded-lg shrink-0">
              Guardar
            </button>
          </div>
          {licenseId && Number(deviceCountEstimate) > 0 && (
            <p className="text-sm text-blue-600 font-medium">
              Valor estimado: ${(licenseById(licenseId).price * Number(deviceCountEstimate)).toLocaleString("es-MX")} MXN/mes
              · ${(licenseById(licenseId).price * Number(deviceCountEstimate) * 12).toLocaleString("es-MX")} MXN/año
            </p>
          )}
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

        {opp.deliveryConfig && (
          <Link
            href={`/configurador/documento?clientId=${opp.id}`}
            className="w-full flex items-center justify-center gap-2 border border-slate-200 text-slate-700 text-base font-medium py-3 rounded-lg mt-2.5"
          >
            <FileText className="w-4 h-4" /> Ver documento PDF generado
          </Link>
        )}
      </div>

      {showScheduleModal && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-end sm:items-center justify-center z-20 px-4 pb-4 sm:pb-0">
          <div className="bg-white rounded-xl w-full max-w-sm p-5 shadow-lg">
            {icsReady ? (
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="text-sm font-semibold text-slate-900 mb-1">Llamada agendada</p>
                <p className="text-sm text-slate-500 mb-4">{opp.client} quedó en "En evaluación".</p>
                <button
                  onClick={() => downloadIcs(icsReady, "llamada-seguimiento.ics")}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-blue-200 text-blue-700 text-sm font-medium mb-2"
                >
                  <Download className="w-4 h-4" /> Descargar invitación de calendario
                </button>
                <button onClick={closeScheduleModal} className="w-full text-slate-500 text-sm py-2">Cerrar</button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <p className="text-sm font-semibold text-slate-900">¿Cuándo quiere la llamada?</p>
                  <button onClick={() => setShowScheduleModal(false)} className="ml-auto text-slate-300">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-slate-400 mb-3">
                  Opcional — puedes agendarla ahora o hacerlo después.
                </p>
                <div className="space-y-2.5 mb-3">
                  <div className="grid grid-cols-2 gap-2">
                    <input type="date" value={scheduleForm.requestedDate} onChange={updateScheduleField("requestedDate")}
                      className="text-sm border border-slate-200 rounded-lg px-3 py-2.5" />
                    <input type="time" value={scheduleForm.requestedTime} onChange={updateScheduleField("requestedTime")}
                      className="text-sm border border-slate-200 rounded-lg px-3 py-2.5" />
                  </div>
                  <select value={scheduleForm.timezone} onChange={updateScheduleField("timezone")}
                    className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700">
                    {TIMEZONES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                  <div className="grid grid-cols-2 gap-2">
                    <select value={scheduleForm.durationMinutes} onChange={updateScheduleField("durationMinutes")}
                      className="text-sm border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700">
                      {[15, 30, 45, 60].map((m) => <option key={m} value={m}>{m} minutos</option>)}
                    </select>
                    <select value={scheduleForm.modality} onChange={updateScheduleField("modality")}
                      className="text-sm border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700">
                      {DEMO_MODALITIES.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                    </select>
                  </div>
                </div>
                {scheduleError && <p className="text-sm text-red-600 mb-2">{scheduleError}</p>}
                <button onClick={confirmScheduleAndUpdate} className="w-full bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg mb-2">
                  Agendar y continuar
                </button>
                <button onClick={skipScheduleAndUpdate} className="w-full text-slate-500 text-sm py-2">
                  Omitir por ahora
                </button>
              </>
            )}
          </div>
        </div>
      )}
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
