// Datos de ejemplo — en la versión conectada a Supabase, esto se reemplaza
// por las tablas reales (regions, managers, vendors, technicians, opportunities, etc.)

// ========== REGIONES ==========
// 9 regiones celulares de México. R9 se modela como un pool especial
// (cuentas nacionales / dinámica distinta), separado del split geográfico R1-R8.
export const REGIONS = [
  { id: "R1", name: "Región 1 — Noroeste" },
  { id: "R2", name: "Región 2 — Noreste" },
  { id: "R3", name: "Región 3 — Centro" },
  { id: "R4", name: "Región 4 — Oriente" },
  { id: "R5", name: "Región 5 — Occidente" },
  { id: "R6", name: "Región 6 — Bajío" },
  { id: "R7", name: "Región 7 — Pacífico Centro" },
  { id: "R8", name: "Región 8 — Sureste" },
  { id: "R9", name: "Región 9 — Cuentas especiales", isSpecial: true },
];

// ⚠️ Placeholder — pendiente de reemplazar con el catálogo oficial estado→región
// (Telcel / HONOR). La lógica de asignación automática ya queda lista para
// recibir ese catálogo real sin tocar el resto del sistema.
export const STATE_REGION_MAP = {
  "baja california": "R1", "baja california sur": "R1", "sonora": "R1", "sinaloa": "R1",
  "chihuahua": "R2", "coahuila": "R2", "nuevo león": "R2", "tamaulipas": "R2", "durango": "R2",
  "ciudad de méxico": "R3", "estado de méxico": "R3", "hidalgo": "R3", "morelos": "R3", "tlaxcala": "R3",
  "puebla": "R4", "veracruz": "R4", "oaxaca": "R4",
  "jalisco": "R5", "nayarit": "R5", "colima": "R5", "aguascalientes": "R5",
  "guanajuato": "R6", "querétaro": "R6", "san luis potosí": "R6", "zacatecas": "R6",
  "michoacán": "R7", "guerrero": "R7",
  "yucatán": "R8", "campeche": "R8", "quintana roo": "R8", "tabasco": "R8", "chiapas": "R8",
};

export const STATES = Object.keys(STATE_REGION_MAP)
  .sort()
  .map((s) => s.replace(/\b\w/g, (c) => c.toUpperCase()));

export function guessRegionFromState(state) {
  const key = (state || "").trim().toLowerCase();
  return STATE_REGION_MAP[key] || null;
}

// Se conserva el mapeo por ciudad (ya existente) como respaldo si solo se tiene ciudad.
export const CITY_REGION_MAP = {
  "ciudad de méxico": "R3", "cdmx": "R3", "naucalpan": "R3", "toluca": "R3",
  "pachuca": "R3", "querétaro": "R6", "monterrey": "R2", "guadalajara": "R5",
  "puebla": "R4", "mérida": "R8", "tijuana": "R1", "león": "R6",
};

export function guessRegion(city) {
  const key = (city || "").trim().toLowerCase();
  return CITY_REGION_MAP[key] || null;
}

// ========== GERENTES ==========
// R1-R8: 2 gerentes por región (PyME + Corporativo) = 16 en total.
// R9: pool de gerentes de cuentas especiales (8-12 en la operación real; aquí 5 para la demo).
export const MANAGERS = [
  ...["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8"].flatMap((region) => [
    { id: `mgr-${region}-pyme`, name: `Gerente PyME ${region}`, region, segment: "pyme" },
    { id: `mgr-${region}-corp`, name: `Gerente Corporativo ${region}`, region, segment: "corporativo" },
  ]),
  ...Array.from({ length: 5 }).map((_, i) => ({
    id: `mgr-R9-${i + 1}`, name: `Gerente Cuentas Especiales R9 #${i + 1}`, region: "R9", segment: "general",
  })),
];

export function managersForRegion(region) {
  return MANAGERS.filter((m) => m.region === region);
}

// ========== VENDEDORES ==========
export const VENDORS = [
  { id: "v1", name: "Alberto Ramírez", region: "R3", managerId: "mgr-R3-pyme", avatar: "AR" },
  { id: "v2", name: "Laura Sánchez", region: "R6", managerId: "mgr-R6-pyme", avatar: "LS" },
  { id: "v3", name: "Jorge Mendoza", region: "R5", managerId: "mgr-R5-corp", avatar: "JM" },
  { id: "v4", name: "Diana Torres", region: "R8", managerId: "mgr-R8-pyme", avatar: "DT" },
];

export function vendorsForManager(managerId) {
  return VENDORS.filter((v) => v.managerId === managerId);
}

// ========== TÉCNICOS ==========
export const TECHNICIANS = [
  { id: "t1", name: "Iván Cortés", regionsCovered: ["R3", "R6"], avatar: "IC" },
  { id: "t2", name: "Renata Solís", regionsCovered: ["R5", "R8"], avatar: "RS" },
];

export function technicianForRegion(region) {
  return TECHNICIANS.find((t) => t.regionsCovered.includes(region)) || TECHNICIANS[0];
}

// ========== ESTATUS DE PIPELINE (vendedor) ==========
export const STATUS_OPTIONS = [
  { value: "asignada", label: "Asignada", tone: "slate" },
  { value: "en_proceso", label: "En proceso", tone: "blue" },
  { value: "en_llamada", label: "En llamada", tone: "blue" },
  { value: "en_evaluacion", label: "En evaluación", tone: "amber" },
  { value: "delivery", label: "Delivery", tone: "amber" },
  { value: "concluida", label: "Concluida", tone: "green" },
];

export function statusMeta(value) {
  return STATUS_OPTIONS.find((s) => s.value === value) || STATUS_OPTIONS[0];
}

// ========== ESTATUS DE ENTREGA TÉCNICA (independiente del pipeline de venta) ==========
export const DELIVERY_STATUS = {
  none: { label: "Sin iniciar", tone: "slate" },
  en_proceso: { label: "En proceso técnico", tone: "amber" },
  completado: { label: "Delivery completado", tone: "green" },
};

// ========== OPORTUNIDADES SEMILLA ==========
export const INITIAL_OPPORTUNITIES = [
  { id: "o1", client: "Grupo BIMBO", city: "Naucalpan", state: "Estado de México", region: "R3", segment: "corporativo", managerId: "mgr-R3-corp", vendorId: "v1", technicianId: null, status: "en_proceso", deliveryStatus: "none", createdAt: "2026-07-28", risk: "media" },
  { id: "o2", client: "Ópticas Devlin", city: "Toluca", state: "Estado de México", region: "R3", segment: "pyme", managerId: "mgr-R3-pyme", vendorId: "v1", technicianId: "t1", status: "delivery", deliveryStatus: "en_proceso", createdAt: "2026-07-24", risk: "alta" },
  { id: "o3", client: "Gobierno de Hidalgo", city: "Pachuca", state: "Hidalgo", region: "R3", segment: "corporativo", managerId: "mgr-R3-pyme", vendorId: "v1", technicianId: "t1", status: "concluida", deliveryStatus: "completado", createdAt: "2026-07-16", risk: "baja" },
  { id: "o4", client: "Grupo Desc", city: "CDMX", state: "Ciudad de México", region: "R3", segment: "pyme", managerId: "mgr-R3-pyme", vendorId: "v1", technicianId: null, status: "asignada", deliveryStatus: "none", createdAt: "2026-08-04", risk: "media" },
  { id: "o5", client: "Farmacias del Centro", city: "Querétaro", state: "Querétaro", region: "R6", segment: "pyme", managerId: "mgr-R6-pyme", vendorId: "v2", technicianId: null, status: "en_llamada", deliveryStatus: "none", createdAt: "2026-07-30", risk: "media" },
  { id: "o6", client: "Constructora Reyes", city: "Querétaro", state: "Querétaro", region: "R6", segment: "corporativo", managerId: "mgr-R6-pyme", vendorId: "v2", technicianId: null, status: "en_proceso", deliveryStatus: "none", createdAt: "2026-07-20", risk: "alta" },
  { id: "o7", client: "Transportes Águila", city: "Guadalajara", state: "Jalisco", region: "R5", segment: "corporativo", managerId: "mgr-R5-corp", vendorId: "v3", technicianId: null, status: "asignada", deliveryStatus: "none", createdAt: "2026-08-01", risk: "baja" },
  { id: "o8", client: "Grupo Médico Vida", city: "Mérida", state: "Yucatán", region: "R8", segment: "pyme", managerId: "mgr-R8-pyme", vendorId: "v4", technicianId: "t2", status: "delivery", deliveryStatus: "en_proceso", createdAt: "2026-07-22", risk: "media" },
];

export const INITIAL_MESSAGES = [
  { id: "m1", from: "Gerente PyME R3", to: "v1", text: "Recuerden dar seguimiento a las oportunidades con más de 5 días sin movimiento.", createdAt: "2026-08-03" },
];

export const INITIAL_DIAGNOSTICS = [
  { id: "d1", client: "Grupo BIMBO", region: "R3", risk: "media", createdAt: "2026-07-28" },
  { id: "d2", client: "Ópticas Devlin", region: "R3", risk: "alta", createdAt: "2026-07-24" },
  { id: "d3", client: "Farmacias del Centro", region: "R6", risk: "media", createdAt: "2026-07-30" },
];

// ========== CATÁLOGOS DEL CONFIGURADOR (ya existentes) ==========
export const POLICIES = [
  { key: "remote_lock", label: "Bloqueo remoto del equipo", hint: "Si se pierde, se bloquea desde una computadora" },
  { key: "remote_wipe", label: "Borrado remoto de datos corporativos", hint: "Se puede vaciar el equipo a distancia si es necesario" },
  { key: "passcode_required", label: "PIN o contraseña obligatoria", hint: "El equipo pide clave para desbloquearse" },
  { key: "encryption_required", label: "Cifrado del almacenamiento", hint: "Si alguien saca la memoria, no puede leer los datos" },
  { key: "block_unauthorized_apps", label: "Bloquear apps no autorizadas", hint: "Solo se pueden instalar las apps que tú apruebes" },
  { key: "block_camera", label: "Bloquear cámara", hint: "El empleado no puede tomar fotos con ese equipo" },
  { key: "control_bluetooth_usb", label: "Controlar Bluetooth y USB", hint: "Evita copiar archivos de la empresa a otro dispositivo" },
  { key: "require_vpn", label: "Exigir conexión VPN", hint: "La navegación va protegida, aunque use wifi público" },
  { key: "force_os_updates", label: "Forzar actualizaciones del sistema", hint: "El celular se mantiene al día sin que el empleado lo haga" },
  { key: "location_tracking", label: "Ubicación / rastreo del equipo", hint: "Se puede ver dónde está el equipo si se pierde" },
];

// Al elegir un tipo de perfil en el Configurador, se pre-marcan estas políticas
// automáticamente — el vendedor las puede ajustar después, pero ya no arranca
// de cero. Reduce la carga de tener que decidir las 10 una por una.
export const DEFAULT_POLICIES_BY_PROFILE = {
  restringido: [
    "remote_lock", "remote_wipe", "passcode_required", "encryption_required",
    "block_unauthorized_apps", "block_camera", "control_bluetooth_usb",
    "force_os_updates", "location_tracking",
  ],
  flexible: [
    "remote_lock", "remote_wipe", "passcode_required", "encryption_required",
    "require_vpn", "force_os_updates",
  ],
  kiosco: [
    "remote_lock", "remote_wipe", "passcode_required", "encryption_required",
    "block_unauthorized_apps", "control_bluetooth_usb", "location_tracking",
  ],
};

export const APP_CATALOG = [
  "Microsoft Teams", "WhatsApp Business", "Gmail", "Google Drive",
  "Salesforce", "DocuSign", "Microsoft Outlook", "Zoom Workplace",
];

export const PROFILE_TYPES = [
  { key: "restringido", label: "Restringido", desc: "Solo apps autorizadas, control total" },
  { key: "flexible", label: "Flexible", desc: "Uso mixto, menos restricciones" },
  { key: "kiosco", label: "Modo Kiosco", desc: "Una sola app fija en pantalla" },
];

// ========== CHATBOT — BASE DE CONOCIMIENTO ==========
export const CHATBOT_KB = [
  {
    keywords: ["precio", "cuesta", "costo", "cuánto"],
    answer: "El costo depende del número de equipos y el nivel de protección que elijas. Si haces el diagnóstico gratuito, un asesor te comparte una cotización a tu medida.",
  },
  {
    keywords: ["mdm", "qué es", "que es"],
    answer: "MDM es una forma de administrar y proteger los celulares de tu empresa a distancia: bloquear equipos perdidos, controlar apps y proteger la información, sin necesitar un área de sistemas.",
  },
  {
    keywords: ["privacidad", "datos", "información personal"],
    answer: "Solo se administra lo relacionado con el equipo de trabajo (apps, seguridad, ubicación del dispositivo). No se accede a fotos personales ni mensajes privados del empleado.",
  },
  {
    keywords: ["tiempo", "cuánto tarda", "implementación", "instalar"],
    answer: "La configuración inicial toma normalmente entre 1 y 2 semanas dependiendo del número de equipos, y la mayoría de los pasos los hace nuestro equipo técnico, no tu empresa.",
  },
  {
    keywords: ["android", "ios", "iphone", "diferencia"],
    answer: "Funciona igual de bien en Android y en iPhone — el diagnóstico y la solución se adaptan automáticamente a la plataforma que usen en tu empresa.",
  },
];

export const DEFAULT_CHATBOT_REPLY =
  "Buena pregunta. Un asesor te puede ayudar mejor con eso — ¿quieres agendar 15 minutos al terminar tu diagnóstico?";
