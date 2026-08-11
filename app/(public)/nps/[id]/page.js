"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Star, Check } from "lucide-react";
import { useDataStore } from "../../../../lib/data-store";

export default function NpsPage() {
  const { id } = useParams();
  const { opportunities, submitNps } = useDataStore();
  const opp = opportunities.find((o) => o.id === id);
  const [score, setScore] = useState(null);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);

  if (!opp) {
    return <div className="min-h-screen flex items-center justify-center text-base text-slate-400">Encuesta no encontrada.</div>;
  }

  const submit = () => {
    if (score === null) return;
    submitNps(opp.id, score, comment);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div className="max-w-sm">
          <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-base font-semibold text-slate-900 mb-1">¡Gracias por tu respuesta!</p>
          <p className="text-sm text-slate-500">Nos ayuda a mejorar cómo entregamos tu solución.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center">
        <Star className="w-6 h-6 text-blue-600 mx-auto mb-3" />
        <p className="text-base font-semibold text-slate-900 mb-1">¿Cómo fue tu experiencia, {opp.client}?</p>
        <p className="text-sm text-slate-500 mb-6">Del 0 al 10, ¿qué tan probable es que nos recomiendes?</p>

        <div className="grid grid-cols-11 gap-1 mb-4">
          {Array.from({ length: 11 }).map((_, n) => (
            <button
              key={n}
              onClick={() => setScore(n)}
              className={`text-sm py-2 rounded-md border ${score === n ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200 text-slate-500"}`}
            >
              {n}
            </button>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="¿Algo que quieras contarnos? (opcional)"
          className="w-full text-sm border border-slate-200 rounded-lg p-2.5 h-16 resize-none mb-4"
        />

        <button onClick={submit} disabled={score === null} className="w-full bg-blue-600 text-white text-base font-medium py-2.5 rounded-lg disabled:opacity-40">
          Enviar
        </button>
      </div>
    </div>
  );
}
