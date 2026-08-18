"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, Check, ArrowUp, Minus, Bot, X } from "lucide-react";
import { RequireRole } from "../../../../lib/require-role";
import { useSession } from "../../../../lib/session";
import { useDataStore } from "../../../../lib/data-store";
import { AppTopBar } from "../../../../components/ui";
import { VENDORS } from "../../../../lib/mock-data";
import { QUESTIONS, calcRisk } from "../../../../lib/diagnostic-logic";
import { isValidEmail, isValidPhone } from "../../../../lib/validators";
import { SCALEFUSION_TIPS } from "../../../../lib/scalefusion-tips";

const RESULT_ICON = { alta: ArrowUp, media: Minus, baja: Check };
const RESULT_TEXT = {
  alta: "Riesgo alto — conviene avanzar rápido con este cliente.",
  media: "Riesgo medio — buena oportunidad para ofrecer la solución.",
  baja: "Riesgo bajo — ya tienen algo de control, pero hay espacio para mejorar.",
};

function VendorDiagnosticoContent() {
  const router = useRouter();
  const { session } = useSession();
  const { addOpportunityFromVendorDiagnostic } = useDataStore();

  const [step, setStep] = useState(0);
  const [answersById, setAnswersById] = useState({});
  const [done, setDone] = useState(false);
  const [clientName, setClientName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [createdOpp, setCreatedOpp] = useState(null);
  const [formError, setFormError] = useState("");
  const [activeTip, setActiveTip] = useState(null); // { text } — pop-up de guía tras responder
  const total = QUESTIONS.length;

  const choose = (optIndex) => {
    const current = QUESTIONS[step];
    const next = { ...answersById, [current.id]: optIndex };
    setAnswersById(next);
    const tip = SCALEFUSION_TIPS[current.id]?.[optIndex];
    if (tip) {
      // Muestra la guía primero; avanzar de pregunta queda pendiente hasta que la cierre.
      setActiveTip({ text: tip });
    } else {
      advance();
    }
  };

  const advance = () => {
    setActiveTip(null);
    if (step < total - 1) setStep((s) => s + 1);
    else setDone(true);
  };

  const guardar = () => {
    if (email && !isValidEmail(email)) {
      setFormError("El correo no tiene un formato válido.");
      return;
    }
    if (phone && !isValidPhone(phone)) {
      setFormError("El teléfono debe tener al menos 10 dígitos.");
      return;
    }
    setFormError("");
    const vendor = VENDORS.find((v) => v.id === session.vendorId);
    const risk = calcRisk(answersById);
    const opp = addOpportunityFromVendorDiagnostic(
      { client: clientName || "Cliente sin nombre", company, email, phone, city, risk: risk.level },
      vendor
    );
    setCreatedOpp(opp);
  };

  if (createdOpp) {
    return (
      <div className="min-h-screen">
        <AppTopBar title="Diagnóstico" />
        <div className="max-w-md mx-auto px-6 py-16 text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-base font-semibold text-slate-900 mb-1">Diagnóstico guardado</p>
          <p className="text-sm text-slate-500 mb-6">{createdOpp.client} ya está en tu lista de oportunidades.</p>
          <button
            onClick={() => router.push(`/portal/oportunidad/${createdOpp.id}`)}
            className="w-full bg-blue-600 text-white text-base font-medium py-2.5 rounded-lg mb-2"
          >
            Ver la oportunidad
          </button>
          <button onClick={() => router.push("/portal")} className="w-full text-slate-500 text-base py-2.5">
            Volver al menú
          </button>
        </div>
      </div>
    );
  }

  if (done) {
    const risk = calcRisk(answersById);
    const Icon = RESULT_ICON[risk.level];
    const toneBg = { alta: "bg-red-50", media: "bg-amber-50", baja: "bg-emerald-50" }[risk.level];
    const toneText = { alta: "text-red-600", media: "text-amber-600", baja: "text-emerald-600" }[risk.level];

    return (
      <div className="min-h-screen">
        <AppTopBar title="Diagnóstico" />
        <div className="max-w-md mx-auto px-5 py-8">
          <div className="text-center mb-6">
            <div className={`w-14 h-14 rounded-full ${toneBg} flex items-center justify-center mx-auto mb-3`}>
              <Icon className={`w-6 h-6 ${toneText}`} />
            </div>
            <p className="text-base font-semibold text-slate-900">{risk.label}</p>
            <p className="text-sm text-slate-500 mt-1">{RESULT_TEXT[risk.level]}</p>
          </div>

          <p className="text-sm font-medium text-slate-500 mb-2">Datos del cliente</p>
          <div className="space-y-2.5 mb-5">
            <input
              value={clientName} onChange={(e) => setClientName(e.target.value)}
              placeholder="Nombre del contacto"
              className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5"
            />
            <input
              value={company} onChange={(e) => setCompany(e.target.value)}
              placeholder="Compañía"
              className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5"
            />
            <input
              value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo"
              className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5"
            />
            <input
              value={phone} onChange={(e) => setPhone(e.target.value)}
              placeholder="Teléfono"
              className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5"
            />
            <input
              value={city} onChange={(e) => setCity(e.target.value)}
              placeholder="Ciudad"
              className="w-full text-base border border-slate-200 rounded-lg px-3 py-2.5"
            />
          </div>

          {formError && <p className="text-sm text-red-600 mb-3">{formError}</p>}

          <button
            onClick={guardar}
            disabled={!clientName}
            className="w-full bg-blue-600 text-white text-base font-medium py-3 rounded-lg disabled:opacity-40"
          >
            Guardar como nueva oportunidad
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AppTopBar title="Diagnóstico" />
      <div className="max-w-md mx-auto px-5 py-6">
        <Link href="/portal" className="flex items-center gap-1.5 text-sm text-slate-400 mb-5">
          <ArrowLeft className="w-3.5 h-3.5" /> Menú principal
        </Link>

        <div className="h-1.5 w-full rounded-full bg-slate-100 mb-1.5">
          <div className="h-1.5 rounded-full bg-blue-600 transition-all" style={{ width: `${((step + 1) / total) * 100}%` }} />
        </div>
        <p className="text-sm text-slate-400 mb-6">Pregunta {step + 1} de {total}</p>

        <p className="text-base font-semibold text-slate-900 leading-snug mb-5">{QUESTIONS[step].q}</p>
        <div className="space-y-2.5 mb-4">
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

        <button onClick={() => step > 0 && setStep(step - 1)} className="flex items-center gap-1 text-sm text-slate-400">
          <ChevronLeft className="w-3.5 h-3.5" /> Anterior
        </button>
      </div>

      {activeTip && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-end sm:items-center justify-center z-20 px-4 pb-4 sm:pb-0">
          <div className="bg-white rounded-xl w-full max-w-sm p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-sm font-semibold text-slate-900">Guía rápida — ScaleFusion</p>
              <button onClick={advance} className="ml-auto text-slate-300">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-base text-slate-600 leading-relaxed mb-4">{activeTip.text}</p>
            <button onClick={advance} className="w-full bg-blue-600 text-white text-base font-medium py-2.5 rounded-lg">
              Entendido, continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VendorDiagnosticoPage() {
  return (
    <RequireRole roles="vendor" loginPath="/login/vendedor">
      <VendorDiagnosticoContent />
    </RequireRole>
  );
}
