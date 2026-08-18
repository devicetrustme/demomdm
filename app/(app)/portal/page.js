"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Briefcase, ClipboardPlus, Truck, MessageCircle, User, ChevronRight, X, Bell } from "lucide-react";
import { RequireRole } from "../../../lib/require-role";
import { useSession } from "../../../lib/session";
import { useDataStore } from "../../../lib/data-store";
import { AppTopBar, PhoneFrame } from "../../../components/ui";

function PortalContent() {
  const { session, justLoggedIn, clearJustLoggedIn } = useSession();
  const { opportunities, messages } = useDataStore();
  const router = useRouter();
  const myOpps = opportunities.filter((o) => o.vendorId === session.vendorId);
  const enProceso = myOpps.filter((o) => o.deliveryStatus && o.deliveryStatus !== "none").length;
  const unread = messages.filter((m) => m.to === session.vendorId && !m.read);

  const [showPopup, setShowPopup] = useState(false);

  // Al arrancar la sesión (justo después del login), si hay mensajes o
  // avisos nuevos, se muestra una sola vez — no se repite al navegar
  // internamente dentro del portal.
  useEffect(() => {
    if (justLoggedIn) {
      if (unread.length > 0) setShowPopup(true);
      clearJustLoggedIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [justLoggedIn]);

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
        <div className="h-full flex flex-col relative">
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
            <Link href="/portal/mensajes" className="relative flex items-center gap-1.5 text-sm text-slate-400">
              <MessageCircle className="w-4 h-4" />
              Mensajes
              {unread.length > 0 && (
                <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-medium flex items-center justify-center">
                  {unread.length}
                </span>
              )}
            </Link>
            <Link href="/portal/perfil" className="flex items-center gap-1.5 text-sm text-slate-400">
              <User className="w-4 h-4" /> Mi perfil
            </Link>
          </div>

          {showPopup && (
            <div className="absolute inset-0 bg-slate-900/40 flex items-end justify-center z-10">
              <div className="bg-white rounded-t-2xl w-full p-5 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-blue-600" />
                    <p className="text-base font-semibold text-slate-900">
                      {unread.length === 1 ? "Tienes 1 mensaje nuevo" : `Tienes ${unread.length} mensajes nuevos`}
                    </p>
                  </div>
                  <button onClick={() => setShowPopup(false)}><X className="w-4 h-4 text-slate-400" /></button>
                </div>
                <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                  {unread.slice(0, 3).map((m) => (
                    <div key={m.id} className="bg-slate-50 rounded-lg px-3 py-2">
                      <p className="text-sm font-medium text-slate-800">{m.from}</p>
                      <p className="text-sm text-slate-500 line-clamp-2">{m.text}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => router.push("/portal/mensajes")}
                  className="w-full bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg"
                >
                  Ver mensajes
                </button>
              </div>
            </div>
          )}
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
