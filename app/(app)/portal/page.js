"use client";

import Link from "next/link";
import { Briefcase, ClipboardPlus, Truck, MessageCircle, User, ChevronRight } from "lucide-react";
import { RequireRole } from "../../../lib/require-role";
import { useSession } from "../../../lib/session";
import { useDataStore } from "../../../lib/data-store";
import { AppTopBar, PhoneFrame } from "../../../components/ui";

function PortalContent() {
  const { session } = useSession();
  const { opportunities } = useDataStore();
  const myOpps = opportunities.filter((o) => o.vendorId === session.vendorId);
  const enProceso = myOpps.filter((o) => o.deliveryStatus && o.deliveryStatus !== "none").length;

  const menu = [
    {
      href: "/portal/oportunidades",
      icon: Briefcase,
      title: "Mis oportunidades",
      desc: `${myOpps.length} clientes en tu lista`,
    },
    {
      href: "/portal/diagnostico",
      icon: ClipboardPlus,
      title: "Hacer un diagnóstico",
      desc: "Para un cliente nuevo, frente a frente",
    },
    {
      href: "/portal/delivery",
      icon: Truck,
      title: "Ver instalaciones",
      desc: `${enProceso} en proceso con el técnico`,
    },
  ];

  return (
    <div>
      <AppTopBar title="Portal del vendedor" />
      <PhoneFrame>
        <div className="h-full flex flex-col">
          <div className="px-5 pt-5 pb-4">
            <p className="text-sm text-slate-400">Hola,</p>
            <p className="text-base font-semibold text-slate-900">{session.name}</p>
          </div>

          <div className="px-5 flex-1 space-y-3">
            {menu.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="flex items-center gap-3.5 bg-white border border-slate-200 rounded-xl px-4 py-4 hover:border-blue-300 hover:bg-blue-50/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <m.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-slate-900">{m.title}</p>
                  <p className="text-sm text-slate-400">{m.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-100 px-5 py-3 flex justify-around">
            <Link href="/portal/mensajes" className="flex items-center gap-1.5 text-sm text-slate-400">
              <MessageCircle className="w-4 h-4" /> Mensajes
            </Link>
            <Link href="/portal/perfil" className="flex items-center gap-1.5 text-sm text-slate-400">
              <User className="w-4 h-4" /> Mi perfil
            </Link>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}

export default function PortalPage() {
  return (
    <RequireRole roles="vendor" loginPath="/login/vendedor">
      <PortalContent />
    </RequireRole>
  );
}
