"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "./session";

// Envuelve una página protegida. Si no hay sesión o el rol no coincide,
// redirige al login correspondiente. `roles` acepta uno o varios roles válidos.
export function RequireRole({ roles, loginPath, children }) {
  const { session, ready } = useSession();
  const router = useRouter();
  const allowed = Array.isArray(roles) ? roles : [roles];

  useEffect(() => {
    if (ready && (!session || !allowed.includes(session.role))) {
      router.replace(loginPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, session]);

  if (!ready) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-slate-400">Cargando…</div>;
  }
  if (!session || !allowed.includes(session.role)) return null;

  return children;
}
