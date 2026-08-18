"use client";

import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext(null);
const STORAGE_KEY = "honor_demo_session";

// Roles internos (equipo comercial) — al cerrar sesión, regresan al menú de
// acceso interno en vez de la landing pública, para poder cambiar de cuenta
// rápido. El resto (cliente, técnico, configurador) va a la landing normal.
const INTERNAL_LOGOUT_ROLES = ["vendor", "manager", "subdirector"];

export function logoutDestination(role) {
  return INTERNAL_LOGOUT_ROLES.includes(role) ? "/acceso-interno" : "/";
}

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(false);
  const [justLoggedIn, setJustLoggedIn] = useState(false);

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
    setJustLoggedIn(true);
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

  const clearJustLoggedIn = () => setJustLoggedIn(false);

  return (
    <SessionContext.Provider value={{ session, ready, login, logout, justLoggedIn, clearJustLoggedIn }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession debe usarse dentro de SessionProvider");
  return ctx;
}
