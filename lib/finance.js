import { licenseById } from "./mock-data";

// El valor real (del Configurador MDM, con cantidad de equipos ya definida
// técnicamente) siempre tiene prioridad sobre el estimado capturado a mano
// en la ficha de la oportunidad — ambos usan la misma licencia y precio,
// solo cambia de dónde sale la cantidad de equipos.
export function opportunityMonthlyValue(opp) {
  if (opp.deliveryConfig?.monthlyValue) return opp.deliveryConfig.monthlyValue;
  if (opp.licenseId && opp.deviceCountEstimate) {
    const lic = licenseById(opp.licenseId);
    return lic ? lic.price * Number(opp.deviceCountEstimate) : 0;
  }
  return 0;
}

export function opportunityAnnualValue(opp) {
  return opportunityMonthlyValue(opp) * 12;
}

export function formatMXN(n) {
  return `$${Math.round(n).toLocaleString("es-MX")}`;
}
