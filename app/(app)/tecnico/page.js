"use client";

import { RequireRole } from "../../../lib/require-role";
import { useSession } from "../../../lib/session";
import { useDataStore } from "../../../lib/data-store";
import { AppTopBar, Pill } from "../../../components/ui";
import { Check, MapPin } from "lucide-react";

function TecnicoContent() {
  const { session } = useSession();
  const { opportunities, toggleChecklistItem, completeDelivery } = useDataStore();

  const myTasks = opportunities.filter((o) => o.technicianId === session.technicianId && o.deliveryChecklist);

  return (
    <div className="min-h-screen">
      <AppTopBar title="Portal del técnico" />
      <div className="max-w-2xl mx-auto px-5 py-6">
        <p className="text-base font-semibold text-slate-900 mb-1">Mis tareas asignadas</p>
        <p className="text-sm text-slate-400 mb-5">{session.name} · cubre {session.regionsCovered?.join(", ")}</p>

        <div className="space-y-4">
          {myTasks.map((o) => {
            const allDone = o.deliveryChecklist.every((c) => c.done);
            return (
              <div key={o.id} className="bg-white border border-slate-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-base font-medium text-slate-900">{o.client}</p>
                  <Pill tone={o.deliveryStatus === "completado" ? "green" : "amber"}>
                    {o.deliveryStatus === "completado" ? "Completado" : "En proceso"}
                  </Pill>
                </div>
                <p className="text-sm text-slate-400 flex items-center gap-1 mb-3">
                  <MapPin className="w-3 h-3" /> {o.city} · Región {o.region}
                </p>

                <div className="space-y-1.5 mb-3">
                  {o.deliveryChecklist.map((item) => (
                    <label key={item.key} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <span
                        onClick={() => o.deliveryStatus !== "completado" && toggleChecklistItem(o.id, item.key)}
                        className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                          item.done ? "bg-blue-600 border-blue-600" : "border-slate-300"
                        }`}
                      >
                        {item.done && <Check className="w-3 h-3 text-white" />}
                      </span>
                      {item.label}
                    </label>
                  ))}
                </div>

                {o.deliveryStatus !== "completado" ? (
                  <button
                    disabled={!allDone}
                    onClick={() => completeDelivery(o.id)}
                    className="w-full bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg disabled:opacity-40"
                  >
                    Marcar como Completado
                  </button>
                ) : (
                  <p className="text-sm text-emerald-600 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Delivery completado el {o.deliveryCompletedAt} · encuesta NPS enviada al cliente
                  </p>
                )}
              </div>
            );
          })}
          {myTasks.length === 0 && (
            <p className="text-sm text-slate-400 text-center pt-10">No tienes tareas de entrega asignadas todavía.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TecnicoPage() {
  return (
    <RequireRole roles="technician" loginPath="/login/tecnico">
      <TecnicoContent />
    </RequireRole>
  );
}
