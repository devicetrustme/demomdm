"use client";

import Link from "next/link";
import { Shield, ChevronRight, Briefcase, Users, Layers, Wrench, Settings } from "lucide-react";

const MENU = [
  { href: "/login/vendedor", icon: Briefcase, title: "Entrar como vendedor", desc: "Ver oportunidades y hacer diagnósticos" },
  { href: "/login/gerente", icon: Users, title: "Entrar como gerente", desc: "Asignar oportunidades al equipo" },
  { href: "/login/subdirector", icon: Layers, title: "Entrar como Subdirector", desc: "Pipeline de un solo canal" },
  { href: "/login/tecnico", icon: Wrench, title: "Entrar como técnico", desc: "Ver y completar instalaciones" },
  { href: "/login/configurador", icon: Settings, title: "Configurador de equipos", desc: "Armar la entrega para un cliente" },
];

export default function AccesoInternoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-center px-6 py-6">
        <div className="flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-slate-900">ScaleFusion Telcel</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center px-6">
        <p className="text-base font-semibold text-slate-900 mb-1">Sesión cerrada</p>
        <p className="text-sm text-slate-400 mb-6">Elige con qué cuenta quieres entrar</p>

        <div className="w-full max-w-md space-y-2.5">
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

        <Link href="/" className="text-sm text-slate-400 mt-6 hover:text-slate-600">
          Ir a la página del cliente
        </Link>
      </div>

      <p className="text-center text-sm text-slate-300 py-6">Powered by Biso Consulting</p>
    </div>
  );
}
