"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Shield, ChevronRight, Lock, ChevronDown, ChevronUp,
  ClipboardCheck, Briefcase, Users, Wrench, Settings, Layers,
} from "lucide-react";

const INTERNAL_LINKS = [
  { href: "/login/vendedor", icon: Briefcase, label: "Vendedor" },
  { href: "/login/gerente", icon: Users, label: "Gerente" },
  { href: "/login/subdirector", icon: Layers, label: "Subdirector" },
  { href: "/login/tecnico", icon: Wrench, label: "Técnico" },
  { href: "/login/configurador", icon: Settings, label: "Configurador" },
];

export default function PublicHome() {
  const [showInternal, setShowInternal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-slate-900">ScaleFusion Telcel</span>
        </div>
        <button
          onClick={() => setShowInternal(!showInternal)}
          className="flex items-center gap-1 text-xs text-slate-300 hover:text-slate-500"
        >
          <Lock className="w-3 h-3" /> Acceso interno
          {showInternal ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {showInternal && (
        <div className="border-b border-slate-100 px-6 py-3">
          <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
            {INTERNAL_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex flex-col items-center gap-1 text-center bg-slate-50 border border-slate-200 rounded-lg py-2.5 hover:border-blue-300"
              >
                <l.icon className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[11px] text-slate-500">{l.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold mb-3">
          Diagnóstico gratuito · 3 minutos
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight mb-4 leading-snug max-w-lg">
          ¿Qué pasa si hoy se pierde un celular de tu empresa?
        </h1>
        <p className="text-base text-slate-500 mb-8 max-w-md">
          Responde 5 preguntas rápidas y descubre en segundos qué tan expuesta
          está la información de tu empresa.
        </p>
        <Link
          href="/diagnostico"
          className="inline-flex items-center gap-2 bg-blue-600 text-white text-base font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ClipboardCheck className="w-4 h-4" /> Hacer mi diagnóstico <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <p className="text-center text-sm text-slate-300 pb-6">Powered by Biso Consulting</p>
    </div>
  );
}
