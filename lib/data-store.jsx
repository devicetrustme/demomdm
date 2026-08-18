"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  INITIAL_OPPORTUNITIES, INITIAL_MESSAGES, INITIAL_DIAGNOSTICS,
  guessRegionFromState, guessRegion, technicianForRegion,
} from "./mock-data";

const DataContext = createContext(null);
const OPP_KEY = "honor_demo_opportunities";
const MSG_KEY = "honor_demo_messages";
const DIAG_KEY = "honor_demo_diagnostics";
const NPS_KEY = "honor_demo_nps";
const DEMO_REQ_KEY = "honor_demo_demo_requests";

export function DataProvider({ children }) {
  const [opportunities, setOpportunities] = useState(INITIAL_OPPORTUNITIES);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [diagnostics, setDiagnostics] = useState(INITIAL_DIAGNOSTICS);
  const [npsSurveys, setNpsSurveys] = useState([]);
  const [demoRequests, setDemoRequests] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const rawOpp = window.localStorage.getItem(OPP_KEY);
      const rawMsg = window.localStorage.getItem(MSG_KEY);
      const rawDiag = window.localStorage.getItem(DIAG_KEY);
      const rawNps = window.localStorage.getItem(NPS_KEY);
      const rawDemoReq = window.localStorage.getItem(DEMO_REQ_KEY);
      if (rawOpp) setOpportunities(JSON.parse(rawOpp));
      if (rawMsg) setMessages(JSON.parse(rawMsg));
      if (rawDiag) setDiagnostics(JSON.parse(rawDiag));
      if (rawNps) setNpsSurveys(JSON.parse(rawNps));
      if (rawDemoReq) setDemoRequests(JSON.parse(rawDemoReq));
    } catch (e) {}
    setReady(true);
  }, []);

  useEffect(() => { if (ready) try { window.localStorage.setItem(OPP_KEY, JSON.stringify(opportunities)); } catch (e) {} }, [opportunities, ready]);
  useEffect(() => { if (ready) try { window.localStorage.setItem(MSG_KEY, JSON.stringify(messages)); } catch (e) {} }, [messages, ready]);
  useEffect(() => { if (ready) try { window.localStorage.setItem(DIAG_KEY, JSON.stringify(diagnostics)); } catch (e) {} }, [diagnostics, ready]);
  useEffect(() => { if (ready) try { window.localStorage.setItem(NPS_KEY, JSON.stringify(npsSurveys)); } catch (e) {} }, [npsSurveys, ready]);
  useEffect(() => { if (ready) try { window.localStorage.setItem(DEMO_REQ_KEY, JSON.stringify(demoRequests)); } catch (e) {} }, [demoRequests, ready]);

  const updateStatus = (id, status) => {
    setOpportunities((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  // Licencia + tamaño estimado de la oportunidad — se puede definir desde el
  // pipeline (antes de llegar al Configurador MDM), para ponderar el valor
  // del negocio desde etapas tempranas.
  const updateOpportunityLicense = (id, { licenseId, deviceCountEstimate }) => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === id ? { ...o, licenseId, deviceCountEstimate } : o))
    );
  };

  // Diagnóstico público → crea el registro de diagnóstico + la oportunidad "nueva",
  // enrutada por región según el Estado seleccionado (o la ciudad como respaldo).
  const addOpportunityFromDiagnostic = (opp) => {
    const region = guessRegion(opp.city) || guessRegionFromState(opp.state) || "Sin asignar";
    const id = "o" + Date.now();
    const newOpp = {
      id,
      client: opp.client || "Prospecto sin nombre",
      company: opp.company || "",
      position: opp.position || "",
      email: opp.email || "",
      phone: opp.phone || "",
      whatsapp: opp.whatsapp || opp.phone || "",
      contactPreference: opp.contactPreference || "",
      city: opp.city,
      state: opp.state,
      region,
      segment: null,          // el gerente decide PyME/Corporativo al revisar
      managerId: null,        // visible para ambos gerentes de la región hasta que uno la tome
      vendorId: null,
      technicianId: null,
      status: "asignada",     // aparece en bandeja de gerente como pendiente de asignar vendedor
      deliveryStatus: "none",
      createdAt: new Date().toISOString().slice(0, 10),
      risk: opp.risk || "media",
      source: "landing_publica",
    };
    setOpportunities((prev) => [newOpp, ...prev]);
    setDiagnostics((prev) => [
      { id: "d" + Date.now(), client: newOpp.client, region, risk: newOpp.risk, createdAt: newOpp.createdAt },
      ...prev,
    ]);
    return newOpp;
  };

  // Solicitud de demostración — independiente de la oportunidad en sí (se puede
  // agendar al momento del diagnóstico o después, desde el portal del vendedor).
  const addDemoRequest = (data) => {
    const id = "dr" + Date.now();
    const request = {
      id,
      opportunityId: data.opportunityId || null,
      attendeeName: data.attendeeName,
      company: data.company,
      email: data.email,
      phone: data.phone,
      whatsapp: data.whatsapp,
      requestedDate: data.requestedDate,
      requestedTime: data.requestedTime,
      timezone: data.timezone || "America/Mexico_City",
      durationMinutes: data.durationMinutes || 30,
      modality: data.modality || "videollamada",
      comments: data.comments || "",
      consentInvite: !!data.consentInvite,
      status: "agendada",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setDemoRequests((prev) => [request, ...prev]);
    return request;
  };

  // Gerente asigna la oportunidad a un vendedor de su región (y confirma el segmento).
  const assignToVendor = (opportunityId, { vendorId, managerId, segment }) => {
    setOpportunities((prev) =>
      prev.map((o) =>
        o.id === opportunityId
          ? { ...o, vendorId, managerId, segment, status: "asignada", assignedToVendorAt: new Date().toISOString().slice(0, 10) }
          : o
      )
    );
  };

  // Se dispara automáticamente al generar el PDF en el Configurador MDM:
  // la oportunidad pasa a manos del técnico de la región correspondiente.
  const sendToTechnician = (opportunityId, checklist) => {
    setOpportunities((prev) =>
      prev.map((o) => {
        if (o.id !== opportunityId) return o;
        const tech = technicianForRegion(o.region);
        return {
          ...o,
          technicianId: tech.id,
          deliveryStatus: "en_proceso",
          deliveryChecklist: checklist,
          sentToTechnicianAt: new Date().toISOString().slice(0, 10),
        };
      })
    );
  };

  // Guarda la configuración completa (plataforma, perfiles, políticas, apps,
  // Zero-Touch/ABM y la aceptación firmada) para poder generar el documento
  // PDF imprimible con todo el detalle.
  const saveDeliveryConfig = (opportunityId, config) => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === opportunityId ? { ...o, deliveryConfig: config } : o))
    );
  };

  const toggleChecklistItem = (opportunityId, itemKey) => {
    setOpportunities((prev) =>
      prev.map((o) =>
        o.id === opportunityId
          ? { ...o, deliveryChecklist: o.deliveryChecklist.map((c) => (c.key === itemKey ? { ...c, done: !c.done } : c)) }
          : o
      )
    );
  };

  // El técnico marca "Completado": sincroniza estado en portal del vendedor/gerente
  // y dispara automáticamente la encuesta NPS al cliente.
  const completeDelivery = (opportunityId) => {
    setOpportunities((prev) =>
      prev.map((o) =>
        o.id === opportunityId
          ? { ...o, deliveryStatus: "completado", deliveryCompletedAt: new Date().toISOString().slice(0, 10) }
          : o
      )
    );
    setNpsSurveys((prev) => [
      ...prev,
      { id: "nps" + Date.now(), opportunityId, score: null, comment: null, sentAt: new Date().toISOString().slice(0, 10) },
    ]);
  };

  const submitNps = (opportunityId, score, comment) => {
    setNpsSurveys((prev) =>
      prev.map((n) => (n.opportunityId === opportunityId ? { ...n, score, comment, respondedAt: new Date().toISOString().slice(0, 10) } : n))
    );
  };

  // Diagnóstico hecho en vivo por el vendedor (Portal → Generar diagnóstico).
  // A diferencia del diagnóstico público, aquí no pasa por la bandeja del gerente:
  // se auto-asigna directo al vendedor porque ya está frente al cliente.
  const addOpportunityFromVendorDiagnostic = (opp, vendor) => {
    const id = "o" + Date.now();
    const newOpp = {
      id,
      client: opp.client || "Cliente sin nombre",
      company: opp.company || "",
      email: opp.email || "",
      phone: opp.phone || "",
      city: opp.city || "",
      state: opp.state || "",
      region: vendor.region,
      segment: null,
      managerId: vendor.managerId,
      vendorId: vendor.id,
      technicianId: null,
      status: "asignada",
      deliveryStatus: "none",
      createdAt: new Date().toISOString().slice(0, 10),
      risk: opp.risk || "media",
      source: "portal_vendedor",
    };
    setOpportunities((prev) => [newOpp, ...prev]);
    setDiagnostics((prev) => [
      { id: "d" + Date.now(), client: newOpp.client, region: vendor.region, risk: newOpp.risk, createdAt: newOpp.createdAt },
      ...prev,
    ]);
    return newOpp;
  };

  const addMessage = (msg) => {
    setMessages((prev) => [{ id: "m" + Date.now(), createdAt: new Date().toISOString().slice(0, 10), read: false, ...msg }, ...prev]);
  };

  const markMessageRead = (id) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  return (
    <DataContext.Provider
      value={{
        opportunities, messages, diagnostics, npsSurveys, demoRequests, ready,
        updateStatus, updateOpportunityLicense, addOpportunityFromDiagnostic, addOpportunityFromVendorDiagnostic, assignToVendor,
        sendToTechnician, saveDeliveryConfig, toggleChecklistItem, completeDelivery, submitNps, addMessage, markMessageRead,
        addDemoRequest,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataStore() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useDataStore debe usarse dentro de DataProvider");
  return ctx;
}
