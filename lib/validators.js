// Validaciones simples reutilizables entre el diagnóstico público y el
// diagnóstico del portal del vendedor.

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

// Acepta 10 dígitos (México) con o sin espacios/guiones.
export function isValidPhone(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  return digits.length >= 10;
}

// Evita registrar el mismo prospecto dos veces desde la landing pública,
// comparando por correo o teléfono contra las oportunidades ya existentes.
export function findDuplicateOpportunity(opportunities, { email, phone }) {
  const emailNorm = String(email || "").trim().toLowerCase();
  const phoneDigits = String(phone || "").replace(/\D/g, "");
  return opportunities.find((o) => {
    const oEmail = String(o.email || "").trim().toLowerCase();
    const oPhone = String(o.phone || "").replace(/\D/g, "");
    return (emailNorm && oEmail === emailNorm) || (phoneDigits && oPhone && oPhone === phoneDigits);
  });
}

// No permite agendar una fecha/hora ya pasada.
export function isFutureDateTime(dateStr, timeStr) {
  if (!dateStr || !timeStr) return false;
  const dt = new Date(`${dateStr}T${timeStr}`);
  return dt.getTime() > Date.now();
}

// Genera un folio de seguimiento tipo "SF-4K9X2B" para documentos de delivery.
// No usa datos sensibles ni secuenciales — solo sirve como referencia rápida
// para que el cliente o el equipo puedan mencionarlo en llamadas/correos.
export function generateTrackingNumber(prefix = "SF") {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin caracteres confusos (0/O, 1/I)
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${prefix}-${code}`;
}
