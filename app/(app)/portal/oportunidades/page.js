"use client";

import Link from "next/link";
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import { RequireRole } from "../../../../lib/require-role";
import { useSession } from "../../../../lib/session";
import { useDataStore } from "../../../../lib/data-store";
import { AppTopBar, Pill } from "../../../../components/ui";
import { statusMeta, licenseById } from "../../../../lib/mock-data";

function OportunidadesContent() {
  const { session } = useSession();
  const { opportunities } = useDataStore();
  const myOpps = opportunities.filter((o) => o.vendorId === session.vendorId);

  return (
    <div className="min-h-screen">
      <AppTopBar title="Mis oportunidades" />
      <div className="max-w-md mx-auto px-5 py-6">
        <Link href="/portal" className="flex items-center gap-1.5 text-sm text-slate-400 mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Menú principal
        </Link>

        <div className="space-y-2.5">
          {myOpps.map((o) => {
            const st = statusMeta(o.status);
            const lic = o.licenseId ? licenseById(o.licenseId) : null;
            const monthlyValue = lic && o.deviceCountEstimate ? lic.price * o.deviceCountEstimate : null;
            return (
              <Link
                key={o.id}
                href={`/portal/oportunidad/${o.id}`}
                className="block rounded-xl border border-slate-200 bg-white p-3.5 hover:border-blue-300 transition-colors"
              >
                <div className="mb-2">
                  <p className="text-base font-medium text-slate-900">{o.client}</p>
                  {o.company && <p className="text-sm text-slate-400">{o.company}</p>}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Pill tone={st.tone}>{st.label}</Pill>
                  <span className="inline-flex items-center gap-1 text-sm text-slate-400">
                    <Clock className="w-3 h-3" /> {o.createdAt}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-slate-400">
                    <MapPin className="w-3 h-3" /> {o.city}
                  </span>
                  {monthlyValue && (
                    <span className="text-sm text-blue-600 font-medium">
                      ${monthlyValue.toLocaleString("es-MX")}/mes
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
          {myOpps.length === 0 && (
            <p className="text-sm text-slate-400 text-center pt-10">Aún no tienes oportunidades asignadas.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OportunidadesPage() {
  return (
    <RequireRole roles="vendor" loginPath="/login/vendedor">
      <OportunidadesContent />
    </RequireRole>
  );
}
