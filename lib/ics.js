// Generador simple de archivos .ics — compatible con Apple Calendar, Google
// Calendar y Microsoft Outlook. No depende de ningún servicio externo: se
// construye el texto del evento en el navegador y se descarga como archivo.
// Cuando exista backend real, esta misma función se puede reutilizar del
// lado del servidor para adjuntar el archivo al correo de confirmación.

function pad(n) {
  return String(n).padStart(2, "0");
}

// Formatea una fecha a UTC en el formato que exige el estándar .ics (iCalendar).
function toIcsDate(date) {
  return (
    date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    "T" +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    "Z"
  );
}

function escapeIcsText(text) {
  return String(text || "")
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

/**
 * Construye el contenido de un archivo .ics para una demostración agendada.
 * @param {object} opts
 * @param {string} opts.uid - identificador único del evento
 * @param {string} opts.title - título de la demostración
 * @param {string} opts.description - descripción (cliente, compañía, modalidad, etc.)
 * @param {Date} opts.start - fecha/hora de inicio (en la zona horaria local del navegador)
 * @param {number} opts.durationMinutes - duración en minutos
 * @param {string} opts.organizerEmail - correo del organizador (vendedor/HONOR)
 * @param {string[]} opts.attendeeEmails - correos de los invitados
 * @param {string} opts.location - modalidad o enlace de reunión
 */
export function buildIcs({
  uid, title, description, start, durationMinutes = 30,
  organizerEmail = "ventas@honor.mx", attendeeEmails = [], location = "",
}) {
  const end = new Date(start.getTime() + durationMinutes * 60000);
  const now = new Date();

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//HONOR Mexico//Diagnostico ScaleFusion//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toIcsDate(now)}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${escapeIcsText(title)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    location ? `LOCATION:${escapeIcsText(location)}` : null,
    `ORGANIZER:mailto:${organizerEmail}`,
    ...attendeeEmails.map((email) => `ATTENDEE;RSVP=TRUE:mailto:${email}`),
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);

  return lines.join("\r\n");
}

/** Dispara la descarga del archivo .ics en el navegador. */
export function downloadIcs(icsContent, filename = "demostracion.ics") {
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
