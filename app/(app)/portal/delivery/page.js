"use client";

import Link from "next/link";
import { ArrowLeft, Truck, MapPin } from "lucide-react";
import { RequireRole } from "../../../../lib/require-role";
import { useSession } from "../../../../lib/session";
import { useDataStore } from "../../../../lib/data-store";
import { AppTopBar, Pill } from "../../../../components/ui";
import { DELIVERY_STATUS, TECHNICIANS } from "../../../../lib/mock-data";

function DeliveryContent() {
  const { session } = useSession();
  const { opportunities } = useDataStore();
  const myDeliveries = opportunities.filter(
    (o) => o.vendorId === session.vendorId && o.deliveryStatus && o.deliveryStatus !== "none"
  );

  return (
    <div className="min-h-screen">
      <AppTopBar title="Delivery" />
      <div className="max-w-md mx-auto px-5 py-6">
        <Link href="/portal" className="flex items-center gap-1.5 text-sm text-slate-400 mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Menú principal
        </Link>

        <p className="text-sm text-slate-400 mb-4">
          Visibilidad en tiempo real de lo que el equipo técnico va avanzando en tus entregas.
        </p>

        <div className="space-y-2.5">
          {myDeliveries.map((o) => {
            const meta = DELIVERY_STATUS[o.deliveryStatus];
            const tech = TECHNICIANS.find((t) => t.id === o.technicianId);
            const doneCount = o.deliveryChecklist?.filter((c) => c.done).length || 0;
            const totalCount = o.deliveryChecklist?.length || 0;
            return (
              <div key={o.id} className="bg-white border border-slate-200 rounded-xl p-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-base font-medium text-slate-900">{o.client}</p>
                  <Pill tone={meta.tone}>{meta.label}</Pill>
                </div>
                <p className="text-sm text-slate-400 flex items-center gap-1 mb-2">
                  <MapPin className="w-3 h-3" /> {o.city} · Técnico: {tech?.name || "Por asignar"}
                </p>
                {totalCount > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${(doneCount / totalCount) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400">{doneCount}/{totalCount}</span>
                  </div>
                )}
              </div>
            );
          })}
          {myDeliveries.length === 0 && (
            <p className="text-sm text-slate-400 text-center pt-10 flex flex-col items-center gap-2">
              <Truck className="w-5 h-5 text-slate-300" />
              Aún no tienes entregas en proceso.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DeliveryPage() {
  return (
    <RequireRole roles="vendor" loginPath="/login/vendedor">
      <DeliveryContent />
    </RequireRole>
  );
}
