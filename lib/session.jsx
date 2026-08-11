"use client";

import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext(null);
const STORAGE_KEY = "honor_demo_session";

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSession(JSON.parse(raw));
    } catch (e) {
      // localStorage no disponible (ej. modo privado) — seguimos sin sesión
    }
    setReady(true);
  }, []);

  const login = (role, name, extra = {}) => {
    const s = { role, name, ...extra };
    setSession(s);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    } catch (e) {}
  };

  const logout = () => {
    setSession(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  return (
    <SessionContext.Provider value={{ session, ready, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession debe usarse dentro de SessionProvider");
  return ctx;
}
