"use client";

import Link from "next/link";
import {
  Shield, ChevronRight, ClipboardCheck, Briefcase, Users, Wrench, Settings,
} from "lucide-react";

const MENU = [
  {
    href: "/diagnostico",
    icon: ClipboardCheck,
    title: "Hacer el diagnóstico",
    desc: "Las 5 preguntas que ve el cliente",
  },
  {
    href: "/login/vendedor",
    icon: Briefcase,
    title: "Entrar como vendedor",
    desc: "Ver oportunidades y hacer diagnósticos",
  },
  {
    href: "/login/gerente",
    icon: Users,
    title: "Entrar como gerente",
    desc: "Asignar oportunidades al equipo",
  },
  {
    href: "/login/tecnico",
    icon: Wrench,
    title: "Entrar como técnico",
    desc: "Ver y completar instalaciones",
  },
  {
    href: "/login/configurador",
    icon: Settings,
    title: "Configurador de equipos",
    desc: "Armar la entrega para un cliente",
  },
];

export default function PublicHome() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-center px-6 py-4">
        <div className="flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-slate-900">HONOR México</span>
        </div>
      </div>

      {/* Hero — lo que vería un cliente real */}
      <div className="px-6 pt-4 pb-10 text-center">
        <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold mb-3">
          Diagnóstico gratuito · 3 minutos
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight mb-3 leading-snug max-w-lg mx-auto">
          ¿Qué pasa si hoy se pierde un celular de tu empresa?
        </h1>
        <p className="text-base text-slate-500 mb-2 max-w-md mx-auto">
          Así arranca el diagnóstico que ve el cliente. Debajo puedes entrar a cualquier
          otra parte del sistema para mostrar la demo completa.
        </p>
      </div>

      {/* Menú permanente — para navegar la demo sin escribir direcciones */}
      <div className="flex-1 px-6 pb-10">
        <div className="max-w-md mx-auto space-y-2.5">
          {MENU.map((m) => (
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
      </div>
    </div>
  );
}
