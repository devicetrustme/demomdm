"use client";

import Link from "next/link";
import { Shield, Smartphone, Apple, ArrowLeft, LogOut } from "lucide-react";
import { useSession } from "../lib/session";
import { useRouter } from "next/navigation";

// Barra simple usada en páginas públicas / de prueba, con link de regreso al home.
export function TopBar({ title }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white">
      <Link href="/" className="flex items-center gap-2 text-slate-500 text-sm hover:text-blue-600">
        <ArrowLeft className="w-3.5 h-3.5" /> Inicio
      </Link>
      <div className="flex items-center gap-1.5">
        <Shield className="w-3.5 h-3.5 text-blue-600" />
        <span className="text-sm font-semibold text-slate-900">{title}</span>
      </div>
      <span className="w-12" />
    </div>
  );
}

// Barra superior de las áreas autenticadas: muestra el nombre de la sesión y logout.
export function AppTopBar({ title }) {
  const { session, logout } = useSession();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white">
      <div className="flex items-center gap-1.5">
        <Shield className="w-3.5 h-3.5 text-blue-600" />
        <span className="text-sm font-semibold text-slate-900">{title}</span>
      </div>
      <div className="flex items-center gap-3">
        {session?.name && <span className="text-sm text-slate-400">{session.name}</span>}
        <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-slate-400 hover:text-red-600">
          <LogOut className="w-3.5 h-3.5" /> Salir
        </button>
      </div>
    </div>
  );
}

export function PhoneFrame({ children }) {
  return (
    <div className="mx-auto w-[320px] rounded-[2rem] border border-slate-200 bg-white shadow-sm overflow-hidden mt-8">
      <div className="h-6 bg-slate-900 flex items-center justify-center">
        <div className="w-16 h-1 rounded-full bg-slate-700" />
      </div>
      <div className="min-h-[560px] overflow-y-auto">{children}</div>
    </div>
  );
}

export function DesktopFrame({ children }) {
  return (
    <div className="max-w-5xl mx-auto w-full rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden mt-8">
      <div className="h-8 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 px-3">
        <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
      </div>
      <div className="min-h-[600px]">{children}</div>
    </div>
  );
}

export function Pill({ tone = "slate", children }) {
  const tones = {
    slate: "bg-slate-100 text-slate-600",
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function PlatformIcon({ platform, className }) {
  if (platform === "both") {
    return (
      <span className="flex items-center gap-1">
        <Smartphone className={className + " text-blue-600"} />
        <Apple className={className + " text-slate-700"} />
      </span>
    );
  }
  return platform === "android" ? (
    <Smartphone className={className + " text-blue-600"} />
  ) : (
    <Apple className={className + " text-slate-700"} />
  );
}

// Indicador de pasos para flujos tipo wizard (usado en el Configurador MDM).
export function Stepper({ steps, current }) {
  return (
    <div className="flex items-center gap-1.5 px-5 py-3 border-b border-slate-100 overflow-x-auto">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-1.5 shrink-0">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${
              i < current ? "bg-blue-600 text-white" : i === current ? "bg-blue-100 text-blue-700 border border-blue-600" : "bg-slate-100 text-slate-400"
            }`}
          >
            {i + 1}
          </div>
          <span className={`text-sm ${i === current ? "text-slate-900 font-medium" : "text-slate-400"}`}>{label}</span>
          {i < steps.length - 1 && <span className="w-4 h-px bg-slate-200 mx-1" />}
        </div>
      ))}
    </div>
  );
}
