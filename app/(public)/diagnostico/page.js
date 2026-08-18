"use client";

import { useState } from "react";
import { Shield, ChevronLeft, ArrowUp, Minus, Check, Calendar, Download } from "lucide-react";
import { TopBar, PhoneFrame } from "../../../components/ui";
import { useDataStore } from "../../../lib/data-store";
import { STATES, DEMO_MODALITIES } from "../../../lib/mock-data";
import { QUESTIONS, calcRisk } from "../../../lib/diagnostic-logic";
import { isValidEmail, isValidPhone, findDuplicateOpportunity, isFutureDateTime } from "../../../lib/validators";
import { buildIcs, downloadIcs } from "../../../lib/ics";

const RESULT_COPY = {
  alta: {
    icon: ArrowUp,
    text: "No pueden bloquear equipos perdidos ni retirar accesos. La información de su empresa está expuesta ahora mismo.",
  },
  media: {
    icon: Minus,
    text: "Nadie tiene claro quién controla claves, apps y actualizaciones de esos celulares. Es momento de ordenarlo.",
  },
  baja: {
    icon: Check,
    text: "Ya tienen control y un proceso claro. Podemos revisar si hay algo más fino que reforzar.",
  },
};

export default function DiagnosticoPage() {
  const [welcomeSeen, setWelcomeSeen] = useState(false);
  const [step, setStep] = useState(0);
  const [answersById, setAnswersById] = useState({});
  const [done, setDone] = useState(false);
  const total = QUESTIONS.length;

  const choose = (optIndex) => {
    const current = QUESTIONS[step];
    const next = { ...answersById, [current.id]: optIndex };
    setAnswersById(next);
    if (step < total - 1) setStep(step + 1);
    else setDone(true);
  };

  const reset = () => {
    setWelcomeSeen(false);
    setStep(0);
    setAnswersById({});
    setDone(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar title="Diagnóstico público" />
      <PhoneFrame>
        {!welcomeSeen ? (
          <WelcomeScreen onStart={() => setWelcomeSeen(true)} />
        ) : done ? (
          <ResultAndContact answersById={answersById} onReset={reset} />
        ) : (
          <div className="h-full flex flex-col">
            <div className="px-5 pt-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-slate-900 tracking-tight">
                  Diagnóstico de ciberseguridad
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100 mb-1.5">
                <div
                  className="h-1.5 rounded-full bg-blue-600 transition-all"
                  style={{ width: `${((step + 1) / total) * 100}%` }}
                />
              </div>
              <p className="text-sm text-slate-400 mb-6">
                Pregunta {step + 1} de {total}
              </p>
            </div>

            <div className="px-5 flex-1">
              <p className="text-base font-semibold text-slate-900 leading-snug mb-5">
                {QUESTIONS[step].q}
              </p>
              <div className="space-y-2.5">
                {QUESTIONS[step].opts.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => choose(i)}
                    className="w-full text-left px-4 py-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-base text-slate-700 transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-5 pb-5 pt-3">
              <button
                onClick={() => step > 0 && setStep(step - 1)}
                className="flex items-center gap-1 text-sm text-slate-400"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Anterior
              </button>
            </div>
          </div>
        )}
      </PhoneFrame>
    </div>
  );
}

function WelcomeScreen({ onStart }) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-5">
        <Shield className="w-7 h-7 text-blue-600" />
      </div>
      <p className="text-base font-semibold text-slate-900 mb-3">
        Bienvenido al Diagnóstico de Control Remoto ScaleFusion
      </p>
      <p className="text-sm text-slate-500 leading-relaxed mb-2">
        En este diagnóstico podrás identificar si tu empresa presenta riesgos
        de ciberseguridad relacionados con el uso de teléfonos móviles.
      </p>
      <p className="text-sm text-slate-500 leading-relaxed mb-8">
        Al finalizar, recibirás una evaluación inicial y podrás pedir ayuda.
      </p>
      <button onClick={onStart} className="w-full py-3 rounded-lg bg-blue-600 text-white text-base font-medium">
        Comenzar diagnóstico
      </button>
    </div>
  );
}

const initialContactForm = {
  nombre: "", compania: "", correo: "", telefono: "", estado: "", privacyConsent: false,
};

const initialDemoForm = {
  requestedDate: "", requestedTime: "", modality: "videollamada",
};

// Formulario reducido a lo esencial: 5 campos (el Estado es indispensable
// para enrutar automáticamente a la región correcta) + un consentimiento.
// Todo lo demás (puesto, preferencia de contacto, WhatsApp aparte, cita)
// se captura después, cuando el vendedor ya está en contacto real.
function ResultAndContact({ answersById, onReset }) {
  const { addOpportunityFromDiagnostic, addDemoRequest, opportunities } = useDataStore();
  const risk = calcRisk(answersById);
  const copy = RESULT_COPY[risk.level];
  const Icon = copy.icon;
  const toneBg = { red: "bg-red-50", amber: "bg-amber-50", green: "bg-emerald-50" }[risk.tone];
  const toneText = { red: "text-red-600", amber: "text-amber-600", green: "text-emerald-600" }[risk.tone];

  // phases: result -> contact_form -> confirmed -> (opcional) demo_form -> demo_confirmed
  const [phase, setPhase] = useState("result");
  const [contactForm, setContactForm] = useState(initialContactForm);
  const [demoForm, setDemoForm] = useState(initialDemoForm);
  const [error, setError] = useState("");
  const [createdOpp, setCreatedOpp] = useState(null);
  const [icsContent, setIcsContent] = useState(null);

  const updateContact = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setContactForm({ ...contactForm, [field]: value });
  };
  const updateDemo = (field) => (e) => setDemoForm({ ...demoForm, [field]: e.target.value });

  const submitContact = () => {
    const f = contactForm;
    if (!f.nombre || !f.compania || !f.correo || !f.telefono || !f.estado) {
      setError("Completa todos los campos.");
      return;
    }
    if (!isValidEmail(f.correo)) { setError("El correo no tiene un formato válido."); return; }
    if (!isValidPhone(f.telefono)) { setError("El teléfono debe tener al menos 10 dígitos."); return; }
    if (!f.privacyConsent) { setError("Necesitamos tu autorización para contactarte."); return; }

    const duplicate = findDuplicateOpportunity(opportunities, { email: f.correo, phone: f.telefono });
    if (duplicate) {
      setError("Ya tenías un diagnóstico registrado con estos datos — un asesor te contactará pronto.");
      return;
    }

    setError("");
    const opp = addOpportunityFromDiagnostic({
      client: f.nombre, company: f.compania,
      email: f.correo, phone: f.telefono, whatsapp: f.telefono,
      state: f.estado, risk: risk.level,
    });
    setCreatedOpp(opp);
    setPhase("confirmed");
  };

  const submitDemo = () => {
    const f = demoForm;
    if (!f.requestedDate || !f.requestedTime) { setError("Elige fecha y hora."); return; }
    if (!isFutureDateTime(f.requestedDate, f.requestedTime)) { setError("Elige una fecha y hora futuras."); return; }
    setError("");

    addDemoRequest({
      opportunityId: createdOpp?.id,
      attendeeName: contactForm.nombre, company: contactForm.compania, email: contactForm.correo, phone: contactForm.telefono,
      requestedDate: f.requestedDate, requestedTime: f.requestedTime, timezone: "America/Mexico_City",
      durationMinutes: 30, modality: f.modality, consentInvite: true,
    });

    const start = new Date(`${f.requestedDate}T${f.requestedTime}`);
    const ics = buildIcs({
      uid: `demo-${createdOpp?.id || Date.now()}@scalefusion.mx`,
      title: `Demostración ScaleFusion — ${contactForm.compania}`,
      description: `Demostración con ${contactForm.nombre} (${contactForm.compania}). Modalidad: ${f.modality}.`,
      start,
      durationMinutes: 30,
      attendeeEmails: [contactForm.correo].filter(Boolean),
      location: f.modality,
    });
    setIcsContent(ics);
    setPhase("demo_confirmed");
  };

  // ---------- Pantallas ----------

  if (phase === "demo_confirmed") {
    return (
      <div className="h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
          <Check className="w-7 h-7 text-blue-600" />
        </div>
        <p className="text-base font-semibold text-slate-900 mb-2">¡Quedó agendado!</p>
        <p className="text-sm text-slate-500 mb-4">Un asesor te contactará a la hora elegida.</p>
        {icsContent && (
          <button
            onClick={() => downloadIcs(icsContent, "demostracion-scalefusion.ics")}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-blue-200 text-blue-700 text-sm font-medium mb-2"
          >
            <Download className="w-4 h-4" /> Descargar invitación de calendario
          </button>
        )}
        <button onClick={onReset} className="mt-3 text-sm text-slate-400">Reiniciar demo</button>
      </div>
    );
  }

  if (phase === "demo_form") {
    return (
      <div className="h-full flex flex-col px-5 py-5">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-blue-600" />
          <p className="text-base font-semibold text-slate-900">¿Cuándo te viene bien?</p>
        </div>
        <div className="space-y-2.5 mb-4">
          <div className="grid grid-cols-2 gap-2">
            <input type="date" value={demoForm.requestedDate} onChange={updateDemo("requestedDate")}
              className="text-base border border-slate-200 rounded-lg px-3 py-2.5" />
            <input type="time" value={demoForm.requestedTime} onChange={updateDemo("requestedTime")}
              className="text-base border border-slate-200 rounded-lg px-3 py-2.5" />
          </div>
          <select value={demoForm.modality} onChange={updateDemo("modality")}
            className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700">
            {DEMO_MODALITIES.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
        </div>
        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
        <button onClick={submitDemo} className="w-full py-3 rounded-lg bg-blue-600 text-white text-base font-medium">
          Confirmar cita
        </button>
        <button onClick={() => setPhase("confirmed")} className="mt-2 text-sm text-slate-400">Volver</button>
      </div>
    );
  }

  if (phase === "confirmed") {
    return (
      <div className="h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
          <Check className="w-7 h-7 text-blue-600" />
        </div>
        <p className="text-base font-semibold text-slate-900 mb-1">¡Listo!</p>
        <p className="text-sm text-slate-500 mb-1">
          Un asesor de tu zona te va a contactar pronto.
        </p>
        <p className="text-sm text-slate-400 mb-6">
          {createdOpp?.region && createdOpp.region !== "Sin asignar" ? `Región ${createdOpp.region}` : "Tu zona se está confirmando"}
        </p>
        <p className="text-sm text-slate-400 mb-2">¿Prefieres elegir tú el horario?</p>
        <button
          onClick={() => setPhase("demo_form")}
          className="w-full py-3 rounded-lg border border-blue-200 text-blue-700 text-sm font-medium flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4" /> Elegir fecha y hora
        </button>
        <button onClick={onReset} className="mt-4 text-sm text-slate-400">Reiniciar demo</button>
      </div>
    );
  }

  if (phase === "contact_form") {
    return (
      <div className="h-full flex flex-col px-5 py-5">
        <p className="text-base font-semibold text-slate-900 mb-1">Solo necesitamos esto</p>
        <p className="text-sm text-slate-400 mb-4">4 datos y listo.</p>

        <div className="space-y-2.5 mb-4">
          <input placeholder="Nombre" value={contactForm.nombre} onChange={updateContact("nombre")}
            className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5" />
          <input placeholder="Compañía" value={contactForm.compania} onChange={updateContact("compania")}
            className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5" />
          <input placeholder="Correo" value={contactForm.correo} onChange={updateContact("correo")}
            className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5" />
          <input placeholder="Teléfono / WhatsApp" value={contactForm.telefono} onChange={updateContact("telefono")}
            className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5" />
          <select value={contactForm.estado} onChange={updateContact("estado")}
            className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700">
            <option value="">Estado</option>
            {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <label className="flex items-start gap-2.5 cursor-pointer pt-1">
            <span
              onClick={() => setContactForm({ ...contactForm, privacyConsent: !contactForm.privacyConsent })}
              className={`w-5 h-5 mt-0.5 rounded flex items-center justify-center border shrink-0 ${
                contactForm.privacyConsent ? "bg-blue-600 border-blue-600" : "border-slate-300"
              }`}
            >
              {contactForm.privacyConsent && <Check className="w-3.5 h-3.5 text-white" />}
            </span>
            <span className="text-sm text-slate-600">Acepto que me contacten sobre esto.</span>
          </label>
        </div>

        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

        <button onClick={submitContact} className="w-full py-3 rounded-lg bg-blue-600 text-white text-base font-medium">
          Enviar
        </button>
        <button onClick={() => setPhase("result")} className="mt-2 text-sm text-slate-400">Volver</button>
      </div>
    );
  }

  // phase === "result"
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center">
      <div className={`w-16 h-16 rounded-full ${toneBg} flex items-center justify-center mb-4`}>
        <Icon className={`w-7 h-7 ${toneText}`} />
      </div>
      <p className="text-base font-semibold text-slate-900 mb-2">{risk.label}</p>
      <p className="text-sm text-slate-500 leading-relaxed mb-6">{copy.text}</p>
      <button onClick={() => setPhase("contact_form")} className="w-full py-3 rounded-lg bg-blue-600 text-white text-base font-medium">
        Recibir ayuda gratis
      </button>
      <button onClick={onReset} className="mt-3 text-sm text-slate-400">Reiniciar demo</button>
    </div>
  );
}
