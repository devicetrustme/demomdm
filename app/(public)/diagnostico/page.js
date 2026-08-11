"use client";

import { useState } from "react";
import { Shield, ChevronLeft, ArrowUp, Minus, Check, Calendar } from "lucide-react";
import { TopBar, PhoneFrame } from "../../../components/ui";
import { useDataStore } from "../../../lib/data-store";
import { STATES } from "../../../lib/mock-data";
import { QUESTIONS, calcRisk } from "../../../lib/diagnostic-logic";

const RESULT_COPY = {
  alta: {
    icon: ArrowUp,
    text: "No pueden bloquear equipos perdidos ni retirar accesos. La información de su empresa está expuesta ahora mismo.",
    cta: "Agendar 15 min esta semana",
  },
  media: {
    icon: Minus,
    text: "Nadie tiene claro quién controla claves, apps y actualizaciones de esos celulares. Es momento de ordenarlo.",
    cta: "Agendar 15 min esta semana",
  },
  baja: {
    icon: Check,
    text: "Ya tienen control y un proceso claro. Podemos revisar si hay algo más fino que reforzar.",
    cta: "Agendar revisión gratuita",
  },
};

const SLOTS = ["Mar 9:00", "Mar 12:00", "Mié 10:00", "Mié 16:00", "Jue 9:30", "Jue 11:00"];

export default function DiagnosticoPage() {
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
    setStep(0);
    setAnswersById({});
    setDone(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar title="Diagnóstico público" />
      <PhoneFrame>
        {done ? (
          <ResultAndSchedule answersById={answersById} onReset={reset} />
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

function ResultAndSchedule({ answersById, onReset }) {
  const { addOpportunityFromDiagnostic } = useDataStore();
  const risk = calcRisk(answersById);
  const copy = RESULT_COPY[risk.level];
  const Icon = copy.icon;
  const toneBg = { red: "bg-red-50", amber: "bg-amber-50", green: "bg-emerald-50" }[risk.tone];
  const toneText = { red: "text-red-600", amber: "text-amber-600", green: "text-emerald-600" }[risk.tone];

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [slot, setSlot] = useState(null);
  const [form, setForm] = useState({ nombre: "", correo: "", telefono: "", ciudad: "", estado: "" });
  const [error, setError] = useState("");
  const [assignedRegion, setAssignedRegion] = useState(null);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = () => {
    if (!form.nombre || !form.correo || !form.telefono || !form.ciudad || !form.estado || !slot) {
      setError("Completa todos los campos y elige un horario.");
      return;
    }
    setError("");
    const opp = addOpportunityFromDiagnostic({ client: form.nombre, city: form.ciudad, state: form.estado, risk: risk.level });
    setAssignedRegion(opp.region);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
          <Check className="w-7 h-7 text-blue-600" />
        </div>
        <p className="text-base font-semibold text-slate-900 mb-2">¡Listo, quedó agendado!</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-1">{slot} — un asesor de tu zona te contactará.</p>
        <p className="text-sm text-slate-400">
          Enrutado automáticamente a {assignedRegion && assignedRegion !== "Sin asignar" ? `la región ${assignedRegion}` : "revisión manual (estado sin catálogo aún)"}.
        </p>
        <button onClick={onReset} className="mt-6 text-sm text-slate-400">Reiniciar demo</button>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="h-full flex flex-col px-5 py-5 overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-blue-600" />
          <p className="text-base font-semibold text-slate-900">Agenda 15 minutos</p>
        </div>

        <div className="space-y-2.5 mb-4">
          <input placeholder="Nombre" value={form.nombre} onChange={update("nombre")}
            className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5" />
          <input placeholder="Correo" value={form.correo} onChange={update("correo")}
            className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5" />
          <input placeholder="Teléfono" value={form.telefono} onChange={update("telefono")}
            className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5" />
          <input placeholder="Ciudad" value={form.ciudad} onChange={update("ciudad")}
            className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5" />
          <select value={form.estado} onChange={update("estado")}
            className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700">
            <option value="">Estado</option>
            {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <p className="text-sm text-slate-400 mb-2">Elige un horario disponible</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {SLOTS.map((s) => (
            <button
              key={s}
              onClick={() => setSlot(s)}
              className={`text-sm py-2 rounded-lg border transition-colors ${
                slot === s ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200 text-slate-600 hover:border-blue-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

        <button onClick={submit} className="w-full py-3 rounded-lg bg-blue-600 text-white text-base font-medium">
          Confirmar cita
        </button>
        <button onClick={() => setShowForm(false)} className="mt-2 text-sm text-slate-400">Volver</button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center">
      <div className={`w-16 h-16 rounded-full ${toneBg} flex items-center justify-center mb-4`}>
        <Icon className={`w-7 h-7 ${toneText}`} />
      </div>
      <p className="text-base font-semibold text-slate-900 mb-2">{risk.label}</p>
      <p className="text-sm text-slate-500 leading-relaxed mb-6">{copy.text}</p>
      <button onClick={() => setShowForm(true)} className="w-full py-3 rounded-lg bg-blue-600 text-white text-base font-medium">
        {copy.cta}
      </button>
      <button onClick={onReset} className="mt-3 text-sm text-slate-400">Reiniciar demo</button>
    </div>
  );
}
