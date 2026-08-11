"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Smartphone, Apple, Plus, Check, FileDown, X, ChevronRight, ChevronLeft, ArrowLeft,
} from "lucide-react";
import { RequireRole } from "../../../lib/require-role";
import { useDataStore } from "../../../lib/data-store";
import { AppTopBar, Pill, Stepper, PlatformIcon } from "../../../components/ui";
import { POLICIES, APP_CATALOG, PROFILE_TYPES, DEFAULT_POLICIES_BY_PROFILE } from "../../../lib/mock-data";

const STEPS = ["Cliente", "Plataforma", "Cantidad de equipos", "Tipo de uso", "Seguridad y apps", "Confirmar"];

function ConfiguradorContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { opportunities, sendToTechnician, saveDeliveryConfig, updateStatus } = useDataStore();

  const prefilledId = params.get("clientId");
  const prefilledName = params.get("clientName");

  const [step, setStep] = useState(0);
  const [clientId, setClientId] = useState(prefilledId || "");
  const [clientName, setClientName] = useState(prefilledName || "");
  const [platform, setPlatform] = useState(null);
  const [totalDevices, setTotalDevices] = useState("");
  const [segmentMode, setSegmentMode] = useState(null); // rol | area | unico
  const [segments, setSegments] = useState([]);
  const [activeSegmentId, setActiveSegmentId] = useState(null);
  const [sent, setSent] = useState(false);
  const [acceptedByName, setAcceptedByName] = useState("");
  const [acceptedConfirm, setAcceptedConfirm] = useState(false);

  const totalAssigned = segments.reduce((sum, s) => sum + (Number(s.devices) || 0), 0);
  const totalTarget = Number(totalDevices) || 0;

  const addSegment = () => {
    const id = "seg" + Date.now();
    setSegments((prev) => [
      ...prev,
      { id, name: "", devices: "", platform: platform !== "both" ? platform : null, profileType: null, policies: [], apps: [], zeroTouchEnabled: null, zeroTouchEmail: "" },
    ]);
    setActiveSegmentId(id);
  };

  const updateSegment = (id, patch) => {
    setSegments((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const removeSegment = (id) => {
    setSegments((prev) => prev.filter((s) => s.id !== id));
  };

  const togglePolicy = (segId, key) => {
    setSegments((prev) =>
      prev.map((s) =>
        s.id === segId
          ? { ...s, policies: s.policies.includes(key) ? s.policies.filter((p) => p !== key) : [...s.policies, key] }
          : s
      )
    );
  };

  const toggleApp = (segId, app) => {
    setSegments((prev) =>
      prev.map((s) =>
        s.id === segId
          ? { ...s, apps: s.apps.includes(app) ? s.apps.filter((a) => a !== app) : [...s.apps, app] }
          : s
      )
    );
  };

  const canNext = useMemo(() => {
    if (step === 0) return clientName.trim().length > 0;
    if (step === 1) return !!platform;
    if (step === 2) return totalTarget > 0 && !!segmentMode && segments.length > 0 && segments.every((s) => !!s.platform);
    if (step === 3) return segments.length > 0 && segments.every((s) => s.name && s.devices && s.profileType && s.zeroTouchEnabled !== null && (!s.zeroTouchEnabled || s.zeroTouchEmail));
    if (step === 4) return segments.every((s) => s.policies.length > 0);
    return true;
  }, [step, clientName, platform, totalTarget, segmentMode, segments]);

  const goNext = () => step < STEPS.length - 1 && setStep(step + 1);
  const goBack = () => step > 0 && setStep(step - 1);

  const generatePDF = () => {
    // Aquí se dispara la función real de generación de PDF + envío por correo (Resend).
    // En esta demo local simulamos el envío por correo, y además generamos de
    // verdad un documento imprimible (vía window.print del navegador) con la
    // firma de aceptación, y entregamos la tarea al técnico con un checklist
    // derivado de los perfiles configurados (incluye Zero-Touch/ABM si aplica).
    if (clientId) {
      const checklist = segments.flatMap((s) => {
        const platformLabel = { android: "Android", ios: "iOS" }[s.platform] || "";
        const items = [
          { key: `${s.id}-perfil`, label: `Configurar perfil "${s.name}" ${platformLabel ? `(${platformLabel}) ` : ""}— ${PROFILE_TYPES.find((p) => p.key === s.profileType)?.label} — ${s.devices} equipos`, done: false },
          { key: `${s.id}-policies`, label: `Aplicar ${s.policies.length} políticas de seguridad en "${s.name}"`, done: false },
          { key: `${s.id}-apps`, label: `Instalar ${s.apps.length} apps en "${s.name}"`, done: false },
        ];
        if (s.zeroTouchEnabled) {
          items.push({
            key: `${s.id}-zerotouch`,
            label: `Inscribir "${s.name}" vía ${s.platform === "ios" ? "Apple Business Manager" : "Zero-Touch"} con la cuenta ${s.zeroTouchEmail}`,
            done: false,
          });
        }
        return items;
      });
      sendToTechnician(clientId, checklist);
      saveDeliveryConfig(clientId, {
        platform, segments,
        acceptedBy: acceptedByName,
        acceptedAt: new Date().toISOString().slice(0, 10),
      });
      updateStatus(clientId, "delivery");
    }
    setSent(true);
  };

  const openPrintableDocument = () => {
    window.open(`/configurador/documento?clientId=${clientId}`, "_blank");
  };

  if (sent) {
    return (
      <div className="min-h-screen">
        <AppTopBar title="Configurador MDM" />
        <div className="max-w-md mx-auto px-6 py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
            <Check className="w-7 h-7 text-emerald-600" />
          </div>
          <p className="text-base font-semibold text-slate-900 mb-1">PDF generado y enviado</p>
          <p className="text-sm text-slate-500 mb-6">
            El resumen técnico de {clientName} se envió al correo del cliente.
          </p>
          <div className="space-y-2">
            <button
              onClick={openPrintableDocument}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white text-base font-medium py-2.5 rounded-lg"
            >
              <FileDown className="w-4 h-4" /> Ver / descargar documento PDF
            </button>
            <button
              onClick={() => router.push(clientId ? `/portal/oportunidad/${clientId}` : "/portal")}
              className="w-full bg-blue-600 text-white text-base font-medium py-2.5 rounded-lg"
            >
              Volver a la oportunidad
            </button>
            <button onClick={() => router.push("/portal")} className="w-full text-slate-500 text-base py-2.5">
              Salir
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AppTopBar title="Configurador MDM" />
      <Stepper steps={STEPS} current={step} />
      <div className="max-w-2xl mx-auto px-5 py-6">
        {step === 0 && (
          <StepCliente
            clientId={clientId} clientName={clientName} setClientId={setClientId} setClientName={setClientName}
            opportunities={opportunities} locked={!!prefilledId}
          />
        )}
        {step === 1 && <StepPlataforma platform={platform} setPlatform={setPlatform} />}
        {step === 2 && (
          <StepVolumen
            totalDevices={totalDevices} setTotalDevices={setTotalDevices}
            segmentMode={segmentMode} setSegmentMode={setSegmentMode}
            segments={segments} addSegment={addSegment} updateSegment={updateSegment} removeSegment={removeSegment}
            totalAssigned={totalAssigned} totalTarget={totalTarget} globalPlatform={platform}
          />
        )}
        {step === 3 && (
          <StepPerfiles segments={segments} updateSegment={updateSegment} />
        )}
        {step === 4 && (
          <StepPoliticasApps
            segments={segments} platform={platform}
            activeSegmentId={activeSegmentId || segments[0]?.id} setActiveSegmentId={setActiveSegmentId}
            togglePolicy={togglePolicy} toggleApp={toggleApp}
          />
        )}
        {step === 5 && (
          <StepConfirmar
            clientName={clientName} platform={platform} segments={segments}
            acceptedByName={acceptedByName} setAcceptedByName={setAcceptedByName}
            acceptedConfirm={acceptedConfirm} setAcceptedConfirm={setAcceptedConfirm}
          />
        )}

        <div className="flex items-center justify-between mt-6">
          <button onClick={goBack} disabled={step === 0} className="flex items-center gap-1 text-sm text-slate-400 disabled:opacity-0">
            <ChevronLeft className="w-3.5 h-3.5" /> Anterior
          </button>
          {step < STEPS.length - 1 ? (
            <button
              onClick={goNext}
              disabled={!canNext}
              className="flex items-center gap-1.5 bg-blue-600 text-white text-base font-medium px-5 py-2.5 rounded-lg disabled:opacity-40"
            >
              Siguiente <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={generatePDF}
              disabled={!acceptedByName || !acceptedConfirm}
              className="flex items-center gap-2 bg-blue-600 text-white text-base font-medium px-5 py-2.5 rounded-lg disabled:opacity-40"
            >
              <FileDown className="w-4 h-4" /> Generar y enviar PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Paso 1 — Identificación del cliente
function StepCliente({ clientId, clientName, setClientId, setClientName, opportunities, locked }) {
  return (
    <div>
      <p className="text-base font-semibold text-slate-900 mb-1">¿Para qué cliente es este delivery?</p>
      <p className="text-sm text-slate-400 mb-4">
        {locked ? "Conectado automáticamente desde el pipeline." : "Elige una oportunidad existente o escribe el nombre."}
      </p>
      {locked ? (
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3.5">
          <p className="text-base font-medium text-slate-900">{clientName}</p>
          <p className="text-sm text-blue-600 mt-0.5">Oportunidad #{clientId} · desde el Portal del vendedor</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          <select
            value={clientId}
            onChange={(e) => {
              const opp = opportunities.find((o) => o.id === e.target.value);
              setClientId(e.target.value);
              if (opp) setClientName(opp.client);
            }}
            className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5"
          >
            <option value="">— Elegir del pipeline —</option>
            {opportunities.map((o) => (
              <option key={o.id} value={o.id}>{o.client}</option>
            ))}
          </select>
          <p className="text-sm text-slate-400 text-center">o escribe un nombre nuevo</p>
          <input
            value={clientName}
            onChange={(e) => { setClientName(e.target.value); setClientId(""); }}
            placeholder="Nombre del cliente"
            className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5"
          />
        </div>
      )}
    </div>
  );
}

// Paso 2 — Entorno operativo
function StepPlataforma({ platform, setPlatform }) {
  const options = [
    { key: "android", label: "Android", icon: Smartphone },
    { key: "ios", label: "iOS", icon: Apple },
    { key: "both", label: "Ambas", icon: null },
  ];
  return (
    <div>
      <p className="text-base font-semibold text-slate-900 mb-1">¿Qué tipo de dispositivo compró el cliente?</p>
      <p className="text-sm text-slate-400 mb-4">Esto define el catálogo de apps disponible más adelante.</p>
      <div className="grid grid-cols-3 gap-3">
        {options.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setPlatform(opt.key)}
            className={`flex flex-col items-center gap-2 rounded-xl border py-6 text-base font-medium transition-colors ${
              platform === opt.key ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-blue-300"
            }`}
          >
            {opt.key === "both" ? (
              <span className="flex items-center gap-1.5"><Smartphone className="w-5 h-5" /><Apple className="w-5 h-5" /></span>
            ) : (
              <opt.icon className="w-5 h-5" />
            )}
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Paso 3 — Volumen y segmentación
function StepVolumen({ totalDevices, setTotalDevices, segmentMode, setSegmentMode, segments, addSegment, updateSegment, removeSegment, totalAssigned, totalTarget, globalPlatform }) {
  const modes = [
    { key: "rol", label: "Por rol o puesto" },
    { key: "area", label: "Por área o departamento" },
    { key: "unico", label: "Un solo perfil para todos", tag: "Más común" },
  ];
  const mismatch = totalTarget > 0 && segments.length > 0 && totalAssigned !== totalTarget;
  const needsPlatformPerSegment = globalPlatform === "both";

  return (
    <div>
      <p className="text-base font-semibold text-slate-900 mb-1">¿Cuántos equipos en total?</p>
      <input
        type="number" min="1" value={totalDevices} onChange={(e) => setTotalDevices(e.target.value)}
        placeholder="Ej. 150" className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5 mb-5"
      />

      <p className="text-base font-semibold text-slate-900 mb-1">¿Cómo vas a segmentar estos equipos?</p>
      <p className="text-sm text-slate-400 mb-3">Cada segmento se convertirá en un perfil de configuración distinto.</p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => { setSegmentMode(m.key); if (segments.length === 0) addSegment(); }}
            className={`text-sm font-medium rounded-xl border py-3 px-2 transition-colors ${
              segmentMode === m.key ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600"
            }`}
          >
            {m.label}
            {m.tag && <span className="block text-xs font-normal text-blue-500 mt-0.5">{m.tag}</span>}
          </button>
        ))}
      </div>

      {needsPlatformPerSegment && segmentMode && (
        <p className="text-sm text-blue-600 bg-blue-50 rounded-lg px-3 py-2 mb-3">
          Elegiste "Ambas" plataformas — dile a cada segmento si sus equipos son Android o iOS,
          por ejemplo "Ventas" con equipos Android y "Dirección" con equipos iOS.
        </p>
      )}

      {segmentMode && (
        <div className="space-y-2.5">
          {segments.map((s) => (
            <div key={s.id} className="border border-slate-200 rounded-lg p-2.5 space-y-2">
              <div className="flex items-center gap-2">
                <input
                  value={s.name} onChange={(e) => updateSegment(s.id, { name: e.target.value })}
                  placeholder="Nombre del segmento (ej. Ventas)"
                  className="flex-1 text-sm border-none focus:outline-none"
                />
                <input
                  type="number" value={s.devices} onChange={(e) => updateSegment(s.id, { devices: e.target.value })}
                  placeholder="# equipos" className="w-20 text-sm border border-slate-200 rounded px-2 py-1.5"
                />
                {segments.length > 1 && (
                  <button onClick={() => removeSegment(s.id)}><X className="w-3.5 h-3.5 text-slate-400" /></button>
                )}
              </div>
              {needsPlatformPerSegment && (
                <div className="flex gap-1.5">
                  {[
                    { key: "android", label: "Android" },
                    { key: "ios", label: "iOS" },
                  ].map((p) => (
                    <button
                      key={p.key}
                      onClick={() => updateSegment(s.id, { platform: p.key })}
                      className={`flex-1 text-sm font-medium rounded-lg border py-1.5 transition-colors ${
                        s.platform === p.key ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-500"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {segmentMode !== "unico" && (
            <button onClick={addSegment} className="flex items-center gap-1.5 text-sm text-blue-600">
              <Plus className="w-3.5 h-3.5" /> Agregar otro segmento
            </button>
          )}
          <p className={`text-sm ${mismatch ? "text-amber-600" : "text-slate-400"}`}>
            {totalAssigned} de {totalTarget || 0} equipos asignados
            {mismatch ? " — revisa que sume el total" : ""}
          </p>
        </div>
      )}
    </div>
  );
}

// Paso 4 — Perfiles de uso
function StepPerfiles({ segments, updateSegment }) {
  return (
    <div>
      <p className="text-base font-semibold text-slate-900 mb-1">¿Cómo va a usarse cada grupo de equipos?</p>
      <p className="text-sm text-slate-400 mb-4">Elige el tipo — ya dejamos marcadas las opciones típicas de seguridad, las puedes ajustar después.</p>
      <div className="space-y-4">
        {segments.map((s) => (
          <div key={s.id} className="border border-slate-200 rounded-xl p-3.5">
            <p className="text-sm font-medium text-slate-900 mb-2.5 flex items-center gap-1.5">
              {s.name || "Segmento sin nombre"} · {s.devices || 0} equipos
              {s.platform && <PlatformIcon platform={s.platform} className="w-3 h-3" />}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {PROFILE_TYPES.map((p) => (
                <button
                  key={p.key}
                  onClick={() => {
                    const patch = { profileType: p.key };
                    if (s.policies.length === 0) patch.policies = DEFAULT_POLICIES_BY_PROFILE[p.key] || [];
                    updateSegment(s.id, patch);
                  }}
                  className={`text-left rounded-lg border px-3 py-2.5 transition-colors ${
                    s.profileType === p.key ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-300"
                  }`}
                >
                  <p className="text-sm font-medium text-slate-900">{p.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{p.desc}</p>
                </button>
              ))}
            </div>
            {s.profileType && (
              <p className="text-xs text-blue-600 mt-2.5 mb-3">
                ✓ Ya marcamos {s.policies.length} políticas típicas para este tipo — las puedes cambiar en el siguiente paso.
              </p>
            )}
            {s.profileType && (
              <div className="border-t border-slate-100 pt-3 mt-1">
                <p className="text-sm text-slate-700 mb-2">
                  ¿Los equipos de "{s.name || "este grupo"}" necesitan quedar listos para usarse sin configurarlos a mano?
                </p>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => updateSegment(s.id, { zeroTouchEnabled: true })}
                    className={`flex-1 text-sm font-medium rounded-lg border py-2 transition-colors ${
                      s.zeroTouchEnabled ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600"
                    }`}
                  >
                    Sí, inscripción automática
                  </button>
                  <button
                    onClick={() => updateSegment(s.id, { zeroTouchEnabled: false, zeroTouchEmail: "" })}
                    className={`flex-1 text-sm font-medium rounded-lg border py-2 transition-colors ${
                      s.zeroTouchEnabled === false ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600"
                    }`}
                  >
                    No, se configura manual
                  </button>
                </div>
                {s.zeroTouchEnabled && (
                  <div>
                    <p className="text-xs text-slate-400 mb-1.5">
                      {s.platform === "ios"
                        ? "Se inscribe vía Apple Business Manager. ¿Con qué correo se va a dar de alta la cuenta?"
                        : s.platform === "android"
                        ? "Se inscribe vía Zero-Touch de Android. ¿Con qué correo se va a dar de alta la cuenta?"
                        : "Se inscribe vía Zero-Touch (Android) o Apple Business Manager (iOS). ¿Con qué correo se va a dar de alta la cuenta?"}
                    </p>
                    <input
                      type="email"
                      value={s.zeroTouchEmail || ""}
                      onChange={(e) => updateSegment(s.id, { zeroTouchEmail: e.target.value })}
                      placeholder="correo@empresa.com"
                      className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Paso 5 — Políticas de seguridad y apps
function StepPoliticasApps({ segments, platform, activeSegmentId, setActiveSegmentId, togglePolicy, toggleApp }) {
  const activeSegment = segments.find((s) => s.id === activeSegmentId) || segments[0];
  if (!activeSegment) return null;

  return (
    <div>
      <p className="text-base font-semibold text-slate-900 mb-1">Políticas y aplicaciones por perfil</p>
      <p className="text-sm text-slate-400 mb-4">Elige el segmento y marca lo que aplique.</p>

      <div className="flex gap-1.5 mb-4 flex-wrap">
        {segments.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSegmentId(s.id)}
            className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border ${
              activeSegment.id === s.id ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200 text-slate-500"
            }`}
          >
            {s.platform && <PlatformIcon platform={s.platform} className="w-3 h-3" />}
            {s.name || "Segmento"}
          </button>
        ))}
      </div>

      <p className="text-sm text-slate-400 -mt-2 mb-4">
        Mostrando catálogo para <span className="font-medium text-slate-600">{({ android: "Android", ios: "iOS", both: "Ambas" })[activeSegment.platform] || "esta plataforma"}</span>.
      </p>

      <p className="text-sm font-medium text-slate-500 mb-2">Políticas de seguridad</p>
      <div className="rounded-xl border border-slate-200 p-3.5 mb-4">
        <div className="space-y-3">
          {POLICIES.map((policy) => (
            <label key={policy.key} className="flex items-start gap-2.5 cursor-pointer">
              <span
                onClick={() => togglePolicy(activeSegment.id, policy.key)}
                className={`w-5 h-5 mt-0.5 rounded flex items-center justify-center border shrink-0 ${
                  activeSegment.policies.includes(policy.key) ? "bg-blue-600 border-blue-600" : "border-slate-300"
                }`}
              >
                {activeSegment.policies.includes(policy.key) && <Check className="w-3.5 h-3.5 text-white" />}
              </span>
              <span>
                <span className="block text-sm text-slate-800 font-medium">{policy.label}</span>
                <span className="block text-xs text-slate-400">{policy.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <p className="text-sm font-medium text-slate-500 mb-2">Aplicaciones</p>
      <div className="rounded-xl border border-slate-200 p-3.5 mb-4">
        <div className="grid grid-cols-2 gap-2">
          {APP_CATALOG.map((app) => (
            <label key={app} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
              <span
                onClick={() => toggleApp(activeSegment.id, app)}
                className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                  activeSegment.apps.includes(app) ? "bg-blue-600 border-blue-600" : "border-slate-300"
                }`}
              >
                {activeSegment.apps.includes(app) && <Check className="w-3 h-3 text-white" />}
              </span>
              {app}
            </label>
          ))}
        </div>

        <CustomAppsField segment={activeSegment} toggleApp={toggleApp} />
      </div>
    </div>
  );
}

// Campo para agregar apps que no están en el catálogo — quedan como chips removibles.
function CustomAppsField({ segment, toggleApp }) {
  const [text, setText] = useState("");
  const customApps = segment.apps.filter((a) => !APP_CATALOG.includes(a));

  const add = () => {
    const name = text.trim();
    if (!name || segment.apps.includes(name)) return;
    toggleApp(segment.id, name);
    setText("");
  };

  return (
    <div className="mt-3 pt-3 border-t border-slate-100">
      <p className="text-sm text-slate-400 mb-2">¿Falta alguna app? Agrégala aquí</p>
      <div className="flex gap-1.5 mb-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder="Nombre de la app"
          className="flex-1 text-sm border border-slate-200 rounded-lg px-2.5 py-2"
        />
        <button onClick={add} className="text-sm bg-slate-900 text-white px-3 py-2 rounded-lg shrink-0">
          Agregar
        </button>
      </div>
      {customApps.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {customApps.map((app) => (
            <span key={app} className="flex items-center gap-1 text-sm bg-blue-50 text-blue-700 pl-2.5 pr-1.5 py-1 rounded-full">
              {app}
              <button onClick={() => toggleApp(segment.id, app)} className="hover:text-blue-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// Paso 6 — Checkup final
function StepConfirmar({ clientName, platform, segments, acceptedByName, setAcceptedByName, acceptedConfirm, setAcceptedConfirm }) {
  const platformLabel = { android: "Android", ios: "iOS", both: "Ambas" }[platform];
  return (
    <div>
      <p className="text-base font-semibold text-slate-900 mb-1">Revisa antes de generar el documento</p>
      <p className="text-sm text-slate-400 mb-4">{clientName} · Plataforma: {platformLabel}</p>

      <div className="space-y-3 mb-5">
        {segments.map((s) => (
          <div key={s.id} className="border border-slate-200 rounded-xl p-3.5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-base font-medium text-slate-900 flex items-center gap-1.5">
                {s.name}
                {s.platform && <PlatformIcon platform={s.platform} className="w-3 h-3" />}
              </p>
              <Pill tone="blue">{PROFILE_TYPES.find((p) => p.key === s.profileType)?.label}</Pill>
            </div>
            <p className="text-sm text-slate-400 mb-2">{s.devices} equipos</p>
            <p className="text-sm text-slate-500">{s.policies.length} políticas activas · {s.apps.length} apps incluidas</p>
            {s.zeroTouchEnabled && (
              <p className="text-sm text-blue-600 mt-1.5">
                Inscripción automática con {s.zeroTouchEmail}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
        <p className="text-sm font-medium text-slate-900 mb-1">Firma de aceptación</p>
        <p className="text-xs text-slate-400 mb-3">
          El cliente confirma que esta configuración corresponde exactamente a lo que solicitó.
        </p>
        <input
          value={acceptedByName}
          onChange={(e) => setAcceptedByName(e.target.value)}
          placeholder="Nombre de quien acepta (cliente)"
          className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 mb-3"
        />
        <label className="flex items-start gap-2.5 cursor-pointer">
          <span
            onClick={() => setAcceptedConfirm(!acceptedConfirm)}
            className={`w-5 h-5 mt-0.5 rounded flex items-center justify-center border shrink-0 ${
              acceptedConfirm ? "bg-blue-600 border-blue-600" : "border-slate-300 bg-white"
            }`}
          >
            {acceptedConfirm && <Check className="w-3.5 h-3.5 text-white" />}
          </span>
          <span className="text-sm text-slate-600">
            Confirmo que revisé esta configuración y es lo que se solicitó.
          </span>
        </label>
      </div>
    </div>
  );
}

export default function ConfiguradorPage() {
  return (
    <RequireRole roles={["vendor", "manager", "configurador"]} loginPath="/login/configurador">
      <ConfiguradorContent />
    </RequireRole>
  );
}
