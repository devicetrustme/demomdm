// Datos de ejemplo — en la versión conectada a Supabase, esto se reemplaza
// por las tablas reales (regions, managers, vendors, technicians, opportunities, etc.)

// ========== REGIONES ==========
// 9 regiones celulares de México — catálogo oficial (192 ciudades, 32 estados),
// tomado de "Regiones_Celulares_Mexico_Ciudades.xlsx". R9 (Metropolitana:
// CDMX + Edomex + Hidalgo + Morelos) es también, en el modelo comercial de
// este proyecto, la región de "cuentas especiales" con su propia estructura
// de 3 subdirectores por canal — coincide con que ahí vive la sede central.
export const REGIONS = [
  { id: "R1", name: "Región 1 - Baja California", hq: "Tijuana, B.C.", isSpecial: false },
  { id: "R2", name: "Región 2 - Noroeste", hq: "Hermosillo, Son.", isSpecial: false },
  { id: "R3", name: "Región 3 - Norte", hq: "Chihuahua, Chih.", isSpecial: false },
  { id: "R4", name: "Región 4 - Noreste", hq: "Monterrey, N.L.", isSpecial: false },
  { id: "R5", name: "Región 5 - Occidente", hq: "Guadalajara / Zapopan, Jal.", isSpecial: false },
  { id: "R6", name: "Región 6 - Centro / Bajío", hq: "Querétaro, Qro.", isSpecial: false },
  { id: "R7", name: "Región 7 - Golfo y Sur", hq: "Puebla, Pue.", isSpecial: false },
  { id: "R8", name: "Región 8 - Sureste", hq: "Mérida, Yuc.", isSpecial: false },
  { id: "R9", name: "Región 9 - Metropolitana", hq: "Ciudad de México (CDMX)", isSpecial: true },
];

export const STATE_REGION_MAP = {
  "aguascalientes": "R6",
  "baja california": "R1",
  "baja california sur": "R1",
  "campeche": "R8",
  "coahuila": "R4",
  "colima": "R5",
  "chiapas": "R8",
  "chihuahua": "R3",
  "ciudad de méxico": "R9",
  "durango": "R3",
  "guanajuato": "R6",
  "guerrero": "R7",
  "hidalgo": "R9",
  "jalisco": "R5",
  "estado de méxico": "R9",
  "michoacán": "R5",
  "morelos": "R9",
  "nayarit": "R5",
  "nuevo león": "R4",
  "oaxaca": "R7",
  "puebla": "R7",
  "querétaro": "R6",
  "quintana roo": "R8",
  "san luis potosí": "R6",
  "sinaloa": "R2",
  "sonora": "R2",
  "tabasco": "R8",
  "tamaulipas": "R4",
  "tlaxcala": "R7",
  "veracruz": "R7",
  "yucatán": "R8",
  "zacatecas": "R6",
};

export const STATES = Object.keys(STATE_REGION_MAP)
  .sort()
  .map((s) => s.replace(/\b\w/g, (c) => c.toUpperCase()));

export const CITY_REGION_MAP = {
  "tijuana": "R1",
  "mexicali": "R1",
  "ensenada": "R1",
  "tecate": "R1",
  "playas de rosarito": "R1",
  "san quintín": "R1",
  "san felipe": "R1",
  "la paz": "R1",
  "cabo san lucas (los cabos)": "R1",
  "cabo san lucas": "R1",
  "san josé del cabo (los cabos)": "R1",
  "san josé del cabo": "R1",
  "ciudad constitución": "R1",
  "loreto": "R1",
  "san luis río colorado": "R1",
  "hermosillo": "R2",
  "ciudad obregón (cajeme)": "R2",
  "ciudad obregón": "R2",
  "heroica nogales": "R2",
  "heroica guaymas": "R2",
  "navojoa": "R2",
  "heroica caborca": "R2",
  "agua prieta": "R2",
  "puerto peñasco": "R2",
  "heroica ciudad de cananea": "R2",
  "empalme": "R2",
  "culiacán rosales": "R2",
  "mazatlán": "R2",
  "los mochis (ahome)": "R2",
  "los mochis": "R2",
  "guasave": "R2",
  "guamúchil (salvador alvarado)": "R2",
  "guamúchil": "R2",
  "navolato": "R2",
  "ciudad juárez": "R3",
  "chihuahua": "R3",
  "cuauhtémoc": "R3",
  "delicias": "R3",
  "hidalgo del parral": "R3",
  "nuevo casas grandes": "R3",
  "camargo": "R3",
  "ojinaga": "R3",
  "victoria de durango": "R3",
  "gómez palacio": "R3",
  "ciudad lerdo": "R3",
  "santiago papasquiaro": "R3",
  "torreón": "R3",
  "matamoros (coahuila)": "R3",
  "matamoros": "R3",
  "san pedro de las colonias": "R3",
  "francisco i. madero (chávez)": "R3",
  "francisco i. madero": "R3",
  "viesca": "R3",
  "monterrey": "R4",
  "san pedro garza garcía": "R4",
  "apodaca": "R4",
  "guadalupe": "R4",
  "san nicolás de los garza": "R4",
  "santa catarina": "R4",
  "general escobedo": "R4",
  "juárez (nuevo león)": "R4",
  "juárez": "R4",
  "garcía": "R4",
  "saltillo": "R4",
  "ramos arizpe": "R4",
  "monclova": "R4",
  "piedras negras": "R4",
  "ciudad acuña": "R4",
  "sabinas": "R4",
  "reynosa": "R4",
  "heroica matamoros (tamaulipas)": "R4",
  "heroica matamoros": "R4",
  "nuevo laredo": "R4",
  "tampico": "R4",
  "ciudad madero": "R4",
  "altamira": "R4",
  "ciudad victoria": "R4",
  "ciudad mante": "R4",
  "guadalajara": "R5",
  "zapopan": "R5",
  "san pedro tlaquepaque": "R5",
  "tonalá": "R5",
  "tlajomulco de zúñiga": "R5",
  "el salto": "R5",
  "puerto vallarta": "R5",
  "ciudad guzmán (zapotlán el grande)": "R5",
  "ciudad guzmán": "R5",
  "ocotlán": "R5",
  "tepatitlán de morelos": "R5",
  "arandas": "R5",
  "tequila": "R5",
  "colima": "R5",
  "villa de álvarez": "R5",
  "manzanillo": "R5",
  "tecomán": "R5",
  "morelia": "R5",
  "uruapan del progreso": "R5",
  "zamora de hidalgo": "R5",
  "heroica lázaro cárdenas": "R5",
  "la piedad de cabadas": "R5",
  "tepic": "R5",
  "bahía de banderas (nuevo nayarit / punta de mita)": "R5",
  "bahía de banderas": "R5",
  "santiago de querétaro": "R6",
  "san juan del río": "R6",
  "corregidora": "R6",
  "el marqués": "R6",
  "león de los aldama": "R6",
  "irapuato": "R6",
  "celaya": "R6",
  "guanajuato": "R6",
  "salamanca": "R6",
  "san miguel de allende": "R6",
  "silao de la victoria": "R6",
  "aguascalientes": "R6",
  "jesús maría": "R6",
  "san luis potosí": "R6",
  "soledad de graciano sánchez": "R6",
  "ciudad valles": "R6",
  "matehuala": "R6",
  "rioverde": "R6",
  "zacatecas": "R6",
  "guadalupe (zacatecas)": "R6",
  "fresnillo": "R6",
  "lagos de moreno": "R6",
  "heroica puebla de zaragoza": "R7",
  "san andrés cholula": "R7",
  "san pedro cholula": "R7",
  "tehuacán": "R7",
  "san martín texmelucan": "R7",
  "atlixco": "R7",
  "teziutlán": "R7",
  "huauchinango": "R7",
  "veracruz": "R7",
  "boca del río": "R7",
  "xalapa-enríquez": "R7",
  "coatzacoalcos": "R7",
  "minatitlán": "R7",
  "poza rica de hidalgo": "R7",
  "córdoba": "R7",
  "orizaba": "R7",
  "tuxpan de rodríguez cano": "R7",
  "oaxaca de juárez": "R7",
  "salina cruz": "R7",
  "juchitán de zaragoza": "R7",
  "san juan bautista tuxtepec": "R7",
  "puerto escondido": "R7",
  "santa cruz huatulco (bahías de huatulco)": "R7",
  "santa cruz huatulco": "R7",
  "acapulco de juárez": "R7",
  "chilpancingo de los bravo": "R7",
  "zihuatanejo / ixtapa": "R7",
  "iguala de la independencia": "R7",
  "tlaxcala de xicohténcatl": "R7",
  "apizaco": "R7",
  "mérida": "R8",
  "kanasín": "R8",
  "valladolid": "R8",
  "progreso de castro": "R8",
  "tizimín": "R8",
  "cancún (benito juárez)": "R8",
  "cancún": "R8",
  "playa del carmen (solidaridad)": "R8",
  "playa del carmen": "R8",
  "chetumal (othón p. blanco)": "R8",
  "chetumal": "R8",
  "san miguel de cozumel": "R8",
  "tulum": "R8",
  "san francisco de campeche": "R8",
  "ciudad del carmen": "R8",
  "champotón": "R8",
  "villahermosa": "R8",
  "heroica cárdenas": "R8",
  "comalcalco": "R8",
  "paraíso (puerto dos bocas)": "R8",
  "paraíso": "R8",
  "tuxtla gutiérrez": "R8",
  "tapachula de córdova y ordóñez": "R8",
  "san cristóbal de las casas": "R8",
  "comitán de domínguez": "R8",
  "palenque": "R8",
  "ciudad de méxico - cuauhtémoc (paseo de la reforma / centro)": "R9",
  "ciudad de méxico - cuauhtémoc": "R9",
  "ciudad de méxico - miguel hidalgo (polanco / lomas / plaza carso)": "R9",
  "ciudad de méxico - miguel hidalgo": "R9",
  "ciudad de méxico - álvaro obregón (santa fe / san ángel)": "R9",
  "ciudad de méxico - álvaro obregón": "R9",
  "ciudad de méxico - benito juárez (insurgentes sur / del valle)": "R9",
  "ciudad de méxico - benito juárez": "R9",
  "ciudad de méxico - cuajimalpa de morelos (santa fe poniente)": "R9",
  "ciudad de méxico - cuajimalpa de morelos": "R9",
  "ciudad de méxico - coyoacán": "R9",
  "ciudad de méxico - tlalpan": "R9",
  "ciudad de méxico - gustavo a. madero (lindavista / indios verdes)": "R9",
  "ciudad de méxico - gustavo a. madero": "R9",
  "ciudad de méxico - iztapalapa": "R9",
  "ciudad de méxico - azcapotzalco (vallejo)": "R9",
  "ciudad de méxico - azcapotzalco": "R9",
  "toluca de lerdo": "R9",
  "metepec": "R9",
  "naucalpan de juárez (satélite / alce blanco)": "R9",
  "naucalpan de juárez": "R9",
  "tlalnepantla de baz (san jerónimo / barrientos)": "R9",
  "tlalnepantla de baz": "R9",
  "ecatepec de morelos": "R9",
  "nezahualcóyotl": "R9",
  "huixquilucan (interlomas / bosque real)": "R9",
  "huixquilucan": "R9",
  "cuautitlán izcalli": "R9",
  "tultitlán": "R9",
  "texcoco": "R9",
  "cuernavaca": "R9",
  "jiutepec (civac)": "R9",
  "jiutepec": "R9",
  "cuautla": "R9",
  "pachuca de soto": "R9",
  "mineral de la reforma": "R9",
  "tulancingo de bravo": "R9",
  "tula de allende": "R9",
};

export function guessRegionFromState(state) {
  const key = (state || "").trim().toLowerCase();
  return STATE_REGION_MAP[key] || null;
}

// El mapeo por ciudad es más preciso que el de estado (resuelve las
// excepciones de estados divididos: La Laguna en Coahuila, Altos Norte en
// Jalisco, San Luis Río Colorado en Sonora) — se usa primero cuando hay
// ciudad disponible.
export function guessRegion(city) {
  const key = (city || "").trim().toLowerCase();
  return CITY_REGION_MAP[key] || null;
}
// ========== DIRECTORES ==========
// Dos masters fijos: uno ve el consolidado de R1-R8 (DEUR), el otro únicamente R9.
export const DIRECTORS = [
  { id: "dir-r1-r8", name: "Director DEUR (R1–R8)", regionScope: "r1_r8", regions: ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8"] },
  { id: "dir-r9", name: "Director R9", regionScope: "r9", regions: ["R9"] },
];

// ========== SUBDIRECTORES ==========
// Nivel intermedio entre Director y Gerente, organizado por canal.
// DEUR (R1-R8): 1 Director → 2 subdirectores (Corporativo, PyME), cada uno con
// 8 gerencias regionales (una por región).
// R9: 1 Director → 3 subdirectores por canal (Corporativo 3 gerencias,
// Empresarial 4 gerencias, SMB 3 gerencias) = 10 gerencias en total.
export const SUBDIRECTORS = [
  { id: "subdir-deur-corp", name: "Subdirector Corporativo (DEUR)", directorId: "dir-r1-r8", channel: "corporativo", regions: ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8"] },
  { id: "subdir-deur-pyme", name: "Subdirector PyME (DEUR)", directorId: "dir-r1-r8", channel: "pyme", regions: ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8"] },
  { id: "subdir-r9-corp", name: "Subdirector Corporativo R9", directorId: "dir-r9", channel: "corporativo", regions: ["R9"] },
  { id: "subdir-r9-empresarial", name: "Subdirector Empresarial R9", directorId: "dir-r9", channel: "empresarial", regions: ["R9"] },
  { id: "subdir-r9-smb", name: "Subdirector SMB R9", directorId: "dir-r9", channel: "smb", regions: ["R9"] },
];

export function subDirectorsForDirector(directorId) {
  return SUBDIRECTORS.filter((s) => s.directorId === directorId);
}

export const CHANNEL_LABEL = { pyme: "PyME", corporativo: "Corporativo", empresarial: "Empresarial", smb: "SMB" };

// ========== GERENTES ==========
// R1-R8: 8 regiones x 2 canales (PyME + Corporativo) = 16, colgando de los
// 2 subdirectores de DEUR.
// R9: 10 gerencias colgando de los 3 subdirectores por canal (3+4+3).
export const MANAGERS = [
  ...["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8"].flatMap((region) => [
    { id: `mgr-${region}-pyme`, name: `Gerente PyME ${region}`, region, segment: "pyme", subDirectorId: "subdir-deur-pyme" },
    { id: `mgr-${region}-corp`, name: `Gerente Corporativo ${region}`, region, segment: "corporativo", subDirectorId: "subdir-deur-corp" },
  ]),
  ...Array.from({ length: 3 }).map((_, i) => ({
    id: `mgr-r9-corp-${i + 1}`, name: `Gerente Corporativo R9 #${i + 1}`, region: "R9", segment: "corporativo", subDirectorId: "subdir-r9-corp",
  })),
  ...Array.from({ length: 4 }).map((_, i) => ({
    id: `mgr-r9-emp-${i + 1}`, name: `Gerente Empresarial R9 #${i + 1}`, region: "R9", segment: "empresarial", subDirectorId: "subdir-r9-empresarial",
  })),
  ...Array.from({ length: 3 }).map((_, i) => ({
    id: `mgr-r9-smb-${i + 1}`, name: `Gerente SMB R9 #${i + 1}`, region: "R9", segment: "smb", subDirectorId: "subdir-r9-smb",
  })),
];

export function managersForRegion(region) {
  return MANAGERS.filter((m) => m.region === region);
}

export function managersForSubDirector(subDirectorId) {
  return MANAGERS.filter((m) => m.subDirectorId === subDirectorId);
}

// ========== VENDEDORES ==========
// Cobertura casi completa de las 26 gerencias (16 en DEUR + 10 en R9) —
// se dejan 3 gerencias sin vendedor a propósito, para que el dashboard
// del gerente/subdirector muestre también el caso realista de "sin equipo".
export const VENDORS = [
  // R1 — Baja California
  { id: "v-r1-pyme", name: "Mariana Cobos", region: "R1", managerId: "mgr-R1-pyme", avatar: "MC" },
  { id: "v-r1-corp", name: "Sergio Nava", region: "R1", managerId: "mgr-R1-corp", avatar: "SN" },
  // R2 — Noroeste (Sonora y Sinaloa)
  { id: "v-r2-pyme", name: "Paola Duarte", region: "R2", managerId: "mgr-R2-pyme", avatar: "PD" },
  { id: "v-r2-corp", name: "Iván Salgado", region: "R2", managerId: "mgr-R2-corp", avatar: "IS" },
  // R3 — Norte (Chihuahua, Durango, La Laguna)
  { id: "v1", name: "Alberto Ramírez", region: "R3", managerId: "mgr-R3-pyme", avatar: "AR" },
  { id: "v-r3-corp", name: "Renata Ibarra", region: "R3", managerId: "mgr-R3-corp", avatar: "RI" },
  // R4 — Noreste (Nuevo León, Tamaulipas, Coahuila)
  { id: "v-r4-pyme", name: "Luis Handal", region: "R4", managerId: "mgr-R4-pyme", avatar: "LH" },
  { id: "v-r4-corp", name: "Ximena Rangel", region: "R4", managerId: "mgr-R4-corp", avatar: "XR" },
  // R5 — Occidente (Jalisco, Colima, Michoacán, Nayarit)
  { id: "v-r5-pyme", name: "Daniela Cess", region: "R5", managerId: "mgr-R5-pyme", avatar: "DC" },
  { id: "v3", name: "Jorge Mendoza", region: "R5", managerId: "mgr-R5-corp", avatar: "JM" },
  // R6 — Centro / Bajío
  { id: "v2", name: "Laura Sánchez", region: "R6", managerId: "mgr-R6-pyme", avatar: "LS" },
  { id: "v-r6-corp", name: "Emilio Durán", region: "R6", managerId: "mgr-R6-corp", avatar: "ED" },
  // R7 — Golfo y Sur (Puebla, Veracruz, Oaxaca, Guerrero, Tlaxcala)
  { id: "v-r7-pyme", name: "Andrea Solís", region: "R7", managerId: "mgr-R7-pyme", avatar: "AS" },
  // mgr-R7-corp queda sin vendedor a propósito
  // R8 — Sureste (Yucatán, Quintana Roo, Campeche, Tabasco, Chiapas)
  { id: "v4", name: "Diana Torres", region: "R8", managerId: "mgr-R8-pyme", avatar: "DT" },
  { id: "v-r8-corp", name: "Héctor Lara", region: "R8", managerId: "mgr-R8-corp", avatar: "HL" },
  // R9 — Metropolitana (CDMX, Edomex, Hidalgo, Morelos) — también sede de Cuentas Especiales
  { id: "v5", name: "Karla Jiménez", region: "R9", managerId: "mgr-r9-corp-1", avatar: "KJ" },
  { id: "v-r9-corp-2", name: "Tomás Reyes", region: "R9", managerId: "mgr-r9-corp-2", avatar: "TR" },
  // mgr-r9-corp-3 queda sin vendedor a propósito
  { id: "v6", name: "Raúl Peña", region: "R9", managerId: "mgr-r9-emp-1", avatar: "RP" },
  { id: "v-r9-emp-2", name: "Fernanda Caballero", region: "R9", managerId: "mgr-r9-emp-2", avatar: "FC" },
  { id: "v-r9-emp-3", name: "Braulio Cetz", region: "R9", managerId: "mgr-r9-emp-3", avatar: "BC" },
  // mgr-r9-emp-4 queda sin vendedor a propósito
  { id: "v-r9-smb-1", name: "Joaquín Uc", region: "R9", managerId: "mgr-r9-smb-1", avatar: "JU" },
  { id: "v-r9-smb-2", name: "Lorena Balam", region: "R9", managerId: "mgr-r9-smb-2", avatar: "LB" },
  { id: "v-r9-smb-3", name: "Adrián Chi", region: "R9", managerId: "mgr-r9-smb-3", avatar: "AC" },
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
  { id: "o1", client: "Grupo BIMBO", company: "Grupo BIMBO", email: "compras@bimbo.com.mx", phone: "5512345601", city: "Chihuahua", state: "Chihuahua", region: "R3", segment: "corporativo", managerId: "mgr-R3-corp", vendorId: "v1", technicianId: null, status: "en_proceso", deliveryStatus: "none", createdAt: "2026-07-28", risk: "media" },
  { id: "o2", client: "Ópticas Devlin", company: "Ópticas Devlin", email: "gerencia@opticasdevlin.mx", phone: "5512345602", city: "Ciudad Juárez", state: "Chihuahua", region: "R3", segment: "pyme", managerId: "mgr-R3-pyme", vendorId: "v1", technicianId: "t1", status: "delivery", deliveryStatus: "en_proceso", createdAt: "2026-07-24", risk: "alta" },
  { id: "o3", client: "Gobierno de Hidalgo", company: "Gobierno de Hidalgo", email: "sistemas@hidalgo.gob.mx", phone: "7712345603", city: "Torreón", state: "Coahuila", region: "R3", segment: "corporativo", managerId: "mgr-R3-pyme", vendorId: "v1", technicianId: "t1", status: "concluida", deliveryStatus: "completado", createdAt: "2026-07-16", risk: "baja" },
  { id: "o4", client: "Grupo Desc", company: "Grupo Desc", email: "it@grupodesc.mx", phone: "5512345604", city: "Durango", state: "Durango", region: "R3", segment: "pyme", managerId: "mgr-R3-pyme", vendorId: "v1", technicianId: null, status: "asignada", deliveryStatus: "none", createdAt: "2026-08-04", risk: "media" },
  { id: "o5", client: "Farmacias del Centro", company: "Farmacias del Centro", email: "operaciones@farmaciascentro.mx", phone: "4421345605", city: "Querétaro", state: "Querétaro", region: "R6", segment: "pyme", managerId: "mgr-R6-pyme", vendorId: "v2", technicianId: null, status: "en_llamada", deliveryStatus: "none", createdAt: "2026-07-30", risk: "media" },
  { id: "o6", client: "Constructora Reyes", company: "Constructora Reyes", email: "admin@constructorareyes.mx", phone: "4421345606", city: "Querétaro", state: "Querétaro", region: "R6", segment: "corporativo", managerId: "mgr-R6-pyme", vendorId: "v2", technicianId: null, status: "en_proceso", deliveryStatus: "none", createdAt: "2026-07-20", risk: "alta" },
  { id: "o7", client: "Transportes Águila", company: "Transportes Águila", email: "flotilla@transportesaguila.mx", phone: "3312345607", city: "Guadalajara", state: "Jalisco", region: "R5", segment: "corporativo", managerId: "mgr-R5-corp", vendorId: "v3", technicianId: null, status: "asignada", deliveryStatus: "none", createdAt: "2026-08-01", risk: "baja" },
  { id: "o8", client: "Grupo Médico Vida", company: "Grupo Médico Vida", email: "ti@grupomedicovida.mx", phone: "9912345608", city: "Mérida", state: "Yucatán", region: "R8", segment: "pyme", managerId: "mgr-R8-pyme", vendorId: "v4", technicianId: "t2", status: "delivery", deliveryStatus: "en_proceso", createdAt: "2026-07-22", risk: "media" },
  { id: "o9", client: "Grupo Interlomas Corporativo", company: "Grupo Interlomas Corporativo", email: "sistemas@interlomascorp.mx", phone: "9981345609", city: "Ciudad de México", state: "Ciudad de México", region: "R9", segment: "corporativo", managerId: "mgr-r9-corp-1", vendorId: "v5", technicianId: null, status: "en_proceso", deliveryStatus: "none", createdAt: "2026-08-05", risk: "alta", licenseId: "l99", deviceCountEstimate: 220 },
  { id: "o10", client: "Consultoría Reforma", company: "Consultoría Reforma", email: "admin@consultoriareforma.mx", phone: "9981345610", city: "Naucalpan", state: "Estado de México", region: "R9", segment: "empresarial", managerId: "mgr-r9-emp-1", vendorId: "v6", technicianId: null, status: "asignada", deliveryStatus: "none", createdAt: "2026-08-09", risk: "media", licenseId: "l79", deviceCountEstimate: 60 },
  { id: "o11", client: "Cafes La Sultana", company: "Cafes La Sultana", email: "contacto@cafeslasultana.mx", phone: "5560806024", city: "Tijuana", state: "Baja California", region: "R1", segment: null, managerId: null, vendorId: "v-r1-pyme", technicianId: null, status: "delivery", deliveryStatus: "completado", createdAt: "2026-08-08", risk: "alta", licenseId: "l99", deviceCountEstimate: 25 },
  { id: "o12", client: "Farmacias Rioverde", company: "Farmacias Rioverde", email: "contacto@farmaciasrioverd.mx", phone: "5535808537", city: "Tijuana", state: "Baja California", region: "R1", segment: null, managerId: null, vendorId: "v-r1-pyme", technicianId: null, status: "asignada", deliveryStatus: "none", createdAt: "2026-08-10", risk: "media", licenseId: "l39", deviceCountEstimate: 120 },
  { id: "o13", client: "Consultoria Vertice", company: "Consultoria Vertice", email: "contacto@consultoriaverti.mx", phone: "5523556182", city: "Tijuana", state: "Baja California", region: "R1", segment: null, managerId: null, vendorId: "v-r1-corp", technicianId: null, status: "asignada", deliveryStatus: "none", createdAt: "2026-07-03", risk: "alta" },
  { id: "o14", client: "Tecnologia Agroindustrial", company: "Tecnologia Agroindustrial", email: "contacto@tecnologiaagroin.mx", phone: "5538119557", city: "Hermosillo", state: "Sonora", region: "R2", segment: null, managerId: null, vendorId: "v-r2-pyme", technicianId: null, status: "en_proceso", deliveryStatus: "none", createdAt: "2026-07-06", risk: "baja", licenseId: "l39", deviceCountEstimate: 60 },
  { id: "o15", client: "Joyeria Del Prado", company: "Joyeria Del Prado", email: "contacto@joyeriadelprado.mx", phone: "5591756179", city: "Hermosillo", state: "Sonora", region: "R2", segment: null, managerId: null, vendorId: "v-r2-pyme", technicianId: null, status: "en_evaluacion", deliveryStatus: "none", createdAt: "2026-08-11", risk: "baja" },
  { id: "o16", client: "Grupo Hotelero Costamar", company: "Grupo Hotelero Costamar", email: "contacto@grupohotelerocos.mx", phone: "5572043515", city: "Hermosillo", state: "Sonora", region: "R2", segment: null, managerId: null, vendorId: "v-r2-pyme", technicianId: null, status: "en_evaluacion", deliveryStatus: "none", createdAt: "2026-08-04", risk: "baja" },
  { id: "o17", client: "Quimica Industrial del Bajio", company: "Quimica Industrial del Bajio", email: "contacto@quimicaindustria.mx", phone: "5553524491", city: "Hermosillo", state: "Sonora", region: "R2", segment: null, managerId: null, vendorId: "v-r2-corp", technicianId: null, status: "en_proceso", deliveryStatus: "none", createdAt: "2026-08-09", risk: "baja" },
  { id: "o18", client: "Grupo Inmobiliario Aurora", company: "Grupo Inmobiliario Aurora", email: "contacto@grupoinmobiliari.mx", phone: "5545935572", city: "Hermosillo", state: "Sonora", region: "R2", segment: null, managerId: null, vendorId: "v-r2-corp", technicianId: null, status: "delivery", deliveryStatus: "en_proceso", createdAt: "2026-06-26", risk: "alta", licenseId: "l39", deviceCountEstimate: 80 },
  { id: "o19", client: "Logistica Peninsular", company: "Logistica Peninsular", email: "contacto@logisticapeninsu.mx", phone: "5597971488", city: "Hermosillo", state: "Sonora", region: "R2", segment: null, managerId: null, vendorId: "v-r2-corp", technicianId: null, status: "asignada", deliveryStatus: "none", createdAt: "2026-08-06", risk: "baja" },
  { id: "o20", client: "Despacho Contable Lugo", company: "Despacho Contable Lugo", email: "contacto@despachocontable.mx", phone: "5543101783", city: "Delicias", state: "Chihuahua", region: "R3", segment: null, managerId: null, vendorId: "v1", technicianId: null, status: "en_proceso", deliveryStatus: "none", createdAt: "2026-07-05", risk: "baja", licenseId: "l39", deviceCountEstimate: 40 },
  { id: "o21", client: "Restaurantes El Fogon", company: "Restaurantes El Fogon", email: "contacto@restauranteselfo.mx", phone: "5558586340", city: "Gómez Palacio", state: "Durango", region: "R3", segment: null, managerId: null, vendorId: "v1", technicianId: null, status: "delivery", deliveryStatus: "completado", createdAt: "2026-08-07", risk: "baja", licenseId: "l99", deviceCountEstimate: 80 },
  { id: "o22", client: "Ganadera San Marcos", company: "Ganadera San Marcos", email: "contacto@ganaderasanmarco.mx", phone: "5516323852", city: "Chihuahua", state: "Chihuahua", region: "R3", segment: null, managerId: null, vendorId: "v1", technicianId: null, status: "en_proceso", deliveryStatus: "none", createdAt: "2026-08-08", risk: "alta" },
  { id: "o23", client: "Transportes Bimex", company: "Transportes Bimex", email: "contacto@transportesbimex.mx", phone: "5561642594", city: "Ciudad Juárez", state: "Chihuahua", region: "R3", segment: null, managerId: null, vendorId: "v-r3-corp", technicianId: null, status: "asignada", deliveryStatus: "none", createdAt: "2026-08-07", risk: "alta", licenseId: "l99", deviceCountEstimate: 25 },
  { id: "o24", client: "Talleres Mecanicos Ruiz", company: "Talleres Mecanicos Ruiz", email: "contacto@talleresmecanico.mx", phone: "5511540956", city: "Monterrey", state: "Nuevo León", region: "R4", segment: null, managerId: null, vendorId: "v-r4-pyme", technicianId: null, status: "en_evaluacion", deliveryStatus: "none", createdAt: "2026-08-05", risk: "media", licenseId: "l99", deviceCountEstimate: 200 },
  { id: "o25", client: "Distribuidora Cinco Estrellas", company: "Distribuidora Cinco Estrellas", email: "contacto@distribuidoracin.mx", phone: "5596028436", city: "Monterrey", state: "Nuevo León", region: "R4", segment: null, managerId: null, vendorId: "v-r4-pyme", technicianId: null, status: "en_evaluacion", deliveryStatus: "none", createdAt: "2026-08-09", risk: "alta", licenseId: "l39", deviceCountEstimate: 200 },
  { id: "o26", client: "Fundidora del Centro", company: "Fundidora del Centro", email: "contacto@fundidoradelcent.mx", phone: "5545351479", city: "Monterrey", state: "Nuevo León", region: "R4", segment: null, managerId: null, vendorId: "v-r4-pyme", technicianId: null, status: "en_proceso", deliveryStatus: "none", createdAt: "2026-07-06", risk: "media", licenseId: "l79", deviceCountEstimate: 25 },
  { id: "o27", client: "Cerveceria Artesanal Cumbre", company: "Cerveceria Artesanal Cumbre", email: "contacto@cerveceriaartesa.mx", phone: "5536697396", city: "Monterrey", state: "Nuevo León", region: "R4", segment: null, managerId: null, vendorId: "v-r4-corp", technicianId: null, status: "en_llamada", deliveryStatus: "none", createdAt: "2026-08-05", risk: "alta", licenseId: "l99", deviceCountEstimate: 120 },
  { id: "o28", client: "Zapateria Cifuentes", company: "Zapateria Cifuentes", email: "contacto@zapateriacifuent.mx", phone: "5590388981", city: "Monterrey", state: "Nuevo León", region: "R4", segment: null, managerId: null, vendorId: "v-r4-corp", technicianId: null, status: "asignada", deliveryStatus: "none", createdAt: "2026-08-13", risk: "alta", licenseId: "l99", deviceCountEstimate: 25 },
  { id: "o29", client: "Panaderia La Espiga", company: "Panaderia La Espiga", email: "contacto@panaderialaespig.mx", phone: "5517774584", city: "Guadalajara", state: "Jalisco", region: "R5", segment: null, managerId: null, vendorId: "v-r5-pyme", technicianId: null, status: "en_llamada", deliveryStatus: "none", createdAt: "2026-07-27", risk: "alta", licenseId: "l39", deviceCountEstimate: 40 },
  { id: "o30", client: "Papeleria Central", company: "Papeleria Central", email: "contacto@papeleriacentral.mx", phone: "5519289546", city: "Guadalajara", state: "Jalisco", region: "R5", segment: null, managerId: null, vendorId: "v-r5-pyme", technicianId: null, status: "en_proceso", deliveryStatus: "none", createdAt: "2026-06-03", risk: "baja", licenseId: "l79", deviceCountEstimate: 200 },
  { id: "o31", client: "Seguros Confia", company: "Seguros Confia", email: "contacto@segurosconfia.mx", phone: "5591415657", city: "Guadalajara", state: "Jalisco", region: "R5", segment: null, managerId: null, vendorId: "v3", technicianId: null, status: "asignada", deliveryStatus: "none", createdAt: "2026-08-03", risk: "media", licenseId: "l39", deviceCountEstimate: 120 },
  { id: "o32", client: "Impresos Rapidos", company: "Impresos Rapidos", email: "contacto@impresosrapidos.mx", phone: "5551837852", city: "Guadalajara", state: "Jalisco", region: "R5", segment: null, managerId: null, vendorId: "v3", technicianId: null, status: "en_llamada", deliveryStatus: "none", createdAt: "2026-08-13", risk: "alta" },
  { id: "o33", client: "Servicios Portuarios del Golfo", company: "Servicios Portuarios del Golfo", email: "contacto@serviciosportuar.mx", phone: "5526240908", city: "Querétaro", state: "Querétaro", region: "R6", segment: null, managerId: null, vendorId: "v2", technicianId: null, status: "concluida", deliveryStatus: "completado", createdAt: "2026-07-15", risk: "baja", licenseId: "l99", deviceCountEstimate: 80 },
  { id: "o34", client: "Comercializadora Bravo", company: "Comercializadora Bravo", email: "contacto@comercializadora.mx", phone: "5540885476", city: "Querétaro", state: "Querétaro", region: "R6", segment: null, managerId: null, vendorId: "v2", technicianId: null, status: "en_proceso", deliveryStatus: "none", createdAt: "2026-07-01", risk: "alta", licenseId: "l99", deviceCountEstimate: 120 },
  { id: "o35", client: "Editorial Nueva Era", company: "Editorial Nueva Era", email: "contacto@editorialnuevaer.mx", phone: "5540728046", city: "Querétaro", state: "Querétaro", region: "R6", segment: null, managerId: null, vendorId: "v2", technicianId: null, status: "en_evaluacion", deliveryStatus: "none", createdAt: "2026-06-23", risk: "alta" },
  { id: "o36", client: "Clinica Dental Sonrisas", company: "Clinica Dental Sonrisas", email: "contacto@clinicadentalson.mx", phone: "5547376585", city: "Querétaro", state: "Querétaro", region: "R6", segment: null, managerId: null, vendorId: "v-r6-corp", technicianId: null, status: "concluida", deliveryStatus: "completado", createdAt: "2026-06-17", risk: "media" },
  { id: "o37", client: "Vidrios y Aluminios Marin", company: "Vidrios y Aluminios Marin", email: "contacto@vidriosyaluminio.mx", phone: "5542614537", city: "Puebla", state: "Puebla", region: "R7", segment: null, managerId: null, vendorId: "v-r7-pyme", technicianId: null, status: "en_proceso", deliveryStatus: "none", createdAt: "2026-08-10", risk: "alta", licenseId: "l99", deviceCountEstimate: 80 },
  { id: "o38", client: "Bienes Raices Alameda", company: "Bienes Raices Alameda", email: "contacto@bienesraicesalam.mx", phone: "5566851760", city: "Puebla", state: "Puebla", region: "R7", segment: null, managerId: null, vendorId: "v-r7-pyme", technicianId: null, status: "delivery", deliveryStatus: "completado", createdAt: "2026-06-04", risk: "alta", licenseId: "l79", deviceCountEstimate: 60 },
  { id: "o39", client: "Constructora Vega y Asociados", company: "Constructora Vega y Asociados", email: "contacto@constructoravega.mx", phone: "5518135295", city: "Puebla", state: "Puebla", region: "R7", segment: null, managerId: null, vendorId: "v-r7-pyme", technicianId: null, status: "en_llamada", deliveryStatus: "none", createdAt: "2026-06-22", risk: "baja" },
  { id: "o40", client: "Grupo Ferretero del Norte", company: "Grupo Ferretero del Norte", email: "contacto@grupoferreterode.mx", phone: "5528814949", city: "Mérida", state: "Yucatán", region: "R8", segment: null, managerId: null, vendorId: "v4", technicianId: null, status: "delivery", deliveryStatus: "en_proceso", createdAt: "2026-06-07", risk: "alta", licenseId: "l99", deviceCountEstimate: 80 },
  { id: "o41", client: "Maderas y Triplay Ochoa", company: "Maderas y Triplay Ochoa", email: "contacto@maderasytriplayo.mx", phone: "5569476001", city: "Mérida", state: "Yucatán", region: "R8", segment: null, managerId: null, vendorId: "v4", technicianId: null, status: "en_llamada", deliveryStatus: "none", createdAt: "2026-07-08", risk: "media" },
  { id: "o42", client: "Optica Vision Total", company: "Optica Vision Total", email: "contacto@opticavisiontota.mx", phone: "5522517517", city: "Mérida", state: "Yucatán", region: "R8", segment: null, managerId: null, vendorId: "v4", technicianId: null, status: "delivery", deliveryStatus: "en_proceso", createdAt: "2026-08-09", risk: "alta" },
  { id: "o43", client: "Refaccionaria El Aguila", company: "Refaccionaria El Aguila", email: "contacto@refaccionariaela.mx", phone: "5532097220", city: "Mérida", state: "Yucatán", region: "R8", segment: null, managerId: null, vendorId: "v-r8-corp", technicianId: null, status: "asignada", deliveryStatus: "none", createdAt: "2026-07-07", risk: "media", licenseId: "l79", deviceCountEstimate: 25 },
  { id: "o44", client: "Hospital Santa Fe", company: "Hospital Santa Fe", email: "contacto@hospitalsantafe.mx", phone: "5566775103", city: "Mérida", state: "Yucatán", region: "R8", segment: null, managerId: null, vendorId: "v-r8-corp", technicianId: null, status: "en_proceso", deliveryStatus: "none", createdAt: "2026-07-26", risk: "media", licenseId: "l79", deviceCountEstimate: 60 },
  { id: "o45", client: "Autotransportes Rincon", company: "Autotransportes Rincon", email: "contacto@autotransportesr.mx", phone: "5582772208", city: "Toluca", state: "Estado de México", region: "R9", segment: null, managerId: null, vendorId: "v5", technicianId: null, status: "asignada", deliveryStatus: "none", createdAt: "2026-06-02", risk: "media", licenseId: "l99", deviceCountEstimate: 150 },
  { id: "o46", client: "Muebles Cordero", company: "Muebles Cordero", email: "contacto@mueblescordero.mx", phone: "5577491435", city: "Cuernavaca", state: "Morelos", region: "R9", segment: null, managerId: null, vendorId: "v5", technicianId: null, status: "asignada", deliveryStatus: "none", createdAt: "2026-06-02", risk: "media", licenseId: "l99", deviceCountEstimate: 80 },
  { id: "o47", client: "Aceros del Pacifico", company: "Aceros del Pacifico", email: "contacto@acerosdelpacific.mx", phone: "5534941004", city: "Pachuca", state: "Hidalgo", region: "R9", segment: null, managerId: null, vendorId: "v5", technicianId: null, status: "concluida", deliveryStatus: "completado", createdAt: "2026-06-02", risk: "baja", licenseId: "l99", deviceCountEstimate: 25 },
  { id: "o48", client: "Agroindustrias El Fresno", company: "Agroindustrias El Fresno", email: "contacto@agroindustriasel.mx", phone: "5586460539", city: "Ecatepec", state: "Estado de México", region: "R9", segment: null, managerId: null, vendorId: "v-r9-corp-2", technicianId: null, status: "en_evaluacion", deliveryStatus: "none", createdAt: "2026-06-13", risk: "baja" },
  { id: "o49", client: "Textiles Alba", company: "Textiles Alba", email: "contacto@textilesalba.mx", phone: "5588339168", city: "Tlalnepantla", state: "Estado de México", region: "R9", segment: null, managerId: null, vendorId: "v6", technicianId: null, status: "en_evaluacion", deliveryStatus: "none", createdAt: "2026-08-02", risk: "alta", licenseId: "l79", deviceCountEstimate: 150 },
  { id: "o50", client: "Colegio Montessori del Valle", company: "Colegio Montessori del Valle", email: "contacto@colegiomontessor.mx", phone: "5545650176", city: "Huixquilucan", state: "Estado de México", region: "R9", segment: null, managerId: null, vendorId: "v6", technicianId: null, status: "en_evaluacion", deliveryStatus: "none", createdAt: "2026-07-07", risk: "media", licenseId: "l39", deviceCountEstimate: 40 },
  { id: "o51", client: "Cafes La Sultana", company: "Cafes La Sultana", email: "contacto@cafeslasultana.mx", phone: "5519736572", city: "Ciudad de México", state: "Ciudad de México", region: "R9", segment: null, managerId: null, vendorId: "v-r9-emp-2", technicianId: null, status: "asignada", deliveryStatus: "none", createdAt: "2026-07-15", risk: "baja", licenseId: "l39", deviceCountEstimate: 200 },
  { id: "o52", client: "Farmacias Rioverde", company: "Farmacias Rioverde", email: "contacto@farmaciasrioverd.mx", phone: "5582160068", city: "Naucalpan", state: "Estado de México", region: "R9", segment: null, managerId: null, vendorId: "v-r9-emp-2", technicianId: null, status: "asignada", deliveryStatus: "none", createdAt: "2026-08-02", risk: "baja" },
  { id: "o53", client: "Consultoria Vertice", company: "Consultoria Vertice", email: "contacto@consultoriaverti.mx", phone: "5542787299", city: "Toluca", state: "Estado de México", region: "R9", segment: null, managerId: null, vendorId: "v-r9-emp-2", technicianId: null, status: "en_proceso", deliveryStatus: "none", createdAt: "2026-06-12", risk: "media" },
  { id: "o54", client: "Tecnologia Agroindustrial", company: "Tecnologia Agroindustrial", email: "contacto@tecnologiaagroin.mx", phone: "5597775215", city: "Cuernavaca", state: "Morelos", region: "R9", segment: null, managerId: null, vendorId: "v-r9-emp-3", technicianId: null, status: "en_proceso", deliveryStatus: "none", createdAt: "2026-08-12", risk: "media", licenseId: "l39", deviceCountEstimate: 120 },
  { id: "o55", client: "Joyeria Del Prado", company: "Joyeria Del Prado", email: "contacto@joyeriadelprado.mx", phone: "5528024248", city: "Pachuca", state: "Hidalgo", region: "R9", segment: null, managerId: null, vendorId: "v-r9-emp-3", technicianId: null, status: "en_llamada", deliveryStatus: "none", createdAt: "2026-08-05", risk: "baja" },
  { id: "o56", client: "Grupo Hotelero Costamar", company: "Grupo Hotelero Costamar", email: "contacto@grupohotelerocos.mx", phone: "5546553958", city: "Ecatepec", state: "Estado de México", region: "R9", segment: null, managerId: null, vendorId: "v-r9-smb-1", technicianId: null, status: "asignada", deliveryStatus: "none", createdAt: "2026-08-09", risk: "alta" },
  { id: "o57", client: "Quimica Industrial del Bajio", company: "Quimica Industrial del Bajio", email: "contacto@quimicaindustria.mx", phone: "5595125977", city: "Tlalnepantla", state: "Estado de México", region: "R9", segment: null, managerId: null, vendorId: "v-r9-smb-1", technicianId: null, status: "en_proceso", deliveryStatus: "none", createdAt: "2026-08-06", risk: "alta" },
  { id: "o58", client: "Grupo Inmobiliario Aurora", company: "Grupo Inmobiliario Aurora", email: "contacto@grupoinmobiliari.mx", phone: "5547135391", city: "Huixquilucan", state: "Estado de México", region: "R9", segment: null, managerId: null, vendorId: "v-r9-smb-2", technicianId: null, status: "en_llamada", deliveryStatus: "none", createdAt: "2026-06-03", risk: "media", licenseId: "l79", deviceCountEstimate: 200 },
  { id: "o59", client: "Logistica Peninsular", company: "Logistica Peninsular", email: "contacto@logisticapeninsu.mx", phone: "5569302158", city: "Ciudad de México", state: "Ciudad de México", region: "R9", segment: null, managerId: null, vendorId: "v-r9-smb-2", technicianId: null, status: "asignada", deliveryStatus: "none", createdAt: "2026-06-21", risk: "media", licenseId: "l39", deviceCountEstimate: 40 },
  { id: "o60", client: "Despacho Contable Lugo", company: "Despacho Contable Lugo", email: "contacto@despachocontable.mx", phone: "5583227889", city: "Naucalpan", state: "Estado de México", region: "R9", segment: null, managerId: null, vendorId: "v-r9-smb-3", technicianId: null, status: "en_evaluacion", deliveryStatus: "none", createdAt: "2026-06-23", risk: "alta" },
  { id: "o61", client: "Restaurantes El Fogon", company: "Restaurantes El Fogon", email: "contacto@restauranteselfo.mx", phone: "5567684996", city: "Toluca", state: "Estado de México", region: "R9", segment: null, managerId: null, vendorId: "v-r9-smb-3", technicianId: null, status: "asignada", deliveryStatus: "none", createdAt: "2026-08-09", risk: "media" },
  { id: "o62", client: "Ganadera San Marcos", company: "Ganadera San Marcos", email: "contacto@ganaderasanmarco.mx", phone: "5558024342", city: "Cuernavaca", state: "Morelos", region: "R9", segment: null, managerId: null, vendorId: "v-r9-smb-3", technicianId: null, status: "asignada", deliveryStatus: "none", createdAt: "2026-07-26", risk: "media" },
];

export const INITIAL_MESSAGES = [
  { id: "m1", from: "Gerente PyME R3", to: "v1", text: "Recuerden dar seguimiento a las oportunidades con más de 5 días sin movimiento.", createdAt: "2026-08-03", read: true },
  { id: "m2", from: "Gerente Corporativo R1", to: "v-r1-corp", text: "Tienes una cita agendada esta semana, revisa el calendario.", createdAt: "2026-08-11", read: true },
  { id: "m3", from: "Subdirector Corporativo R9", to: "v5", text: "Buen avance este mes — sigamos así con Naucalpan e Interlomas.", createdAt: "2026-08-12", read: false },
  { id: "m4", from: "Gerente PyME R6", to: "v2", text: "¿Cómo va la propuesta para Distribuidora Cinco Estrellas?", createdAt: "2026-08-13", read: false },
  { id: "m5", from: "Gerente Empresarial R9", to: "v6", text: "El cliente de Toluca pidió mover la demo al viernes.", createdAt: "2026-08-14", read: false },
];

export const INITIAL_DIAGNOSTICS = [
  { id: "d1", client: "Grupo BIMBO", region: "R3", risk: "media", createdAt: "2026-07-28" },
  { id: "d2", client: "Ópticas Devlin", region: "R3", risk: "alta", createdAt: "2026-07-24" },
  { id: "d3", client: "Farmacias del Centro", region: "R6", risk: "media", createdAt: "2026-07-30" },
  { id: "d4", client: "Grupo Ferretero del Norte", region: "R1", risk: "alta", createdAt: "2026-08-08" },
  { id: "d5", client: "Textiles Alba", region: "R2", risk: "media", createdAt: "2026-08-10" },
  { id: "d6", client: "Hospital Santa Fe", region: "R4", risk: "alta", createdAt: "2026-08-11" },
  { id: "d7", client: "Agroindustrias El Fresno", region: "R5", risk: "baja", createdAt: "2026-08-12" },
  { id: "d8", client: "Zapatería Cifuentes", region: "R7", risk: "media", createdAt: "2026-08-13" },
  { id: "d9", client: "Cafés La Sultana", region: "R1", risk: "alta", createdAt: "2026-08-08" },
  { id: "d10", client: "Grupo Hotelero Costamar", region: "R9", risk: "media", createdAt: "2026-08-13" },
  { id: "d11", client: "Distribuidora Cinco Estrellas", region: "R9", risk: "baja", createdAt: "2026-08-14" },
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

export const TIMEZONES = [
  { value: "America/Mexico_City", label: "Ciudad de México (Central)" },
  { value: "America/Tijuana", label: "Tijuana (Pacífico)" },
  { value: "America/Hermosillo", label: "Hermosillo (Montaña, sin horario de verano)" },
  { value: "America/Chihuahua", label: "Chihuahua (Montaña)" },
  { value: "America/Cancun", label: "Cancún (Este)" },
];

export const DEMO_MODALITIES = [
  { value: "videollamada", label: "Videollamada" },
  { value: "llamada", label: "Llamada telefónica" },
  { value: "presencial", label: "Reunión presencial" },
];

export const CONTACT_PREFERENCES = [
  { value: "correo", label: "Correo electrónico" },
  { value: "telefono", label: "Llamada telefónica" },
  { value: "whatsapp", label: "WhatsApp" },
];

// Catálogo de licencias — precio por dispositivo al mes. Un solo lugar para
// editar precios; ningún componente debe tener el número escrito directamente.
export const LICENSE_CATALOG = [
  { id: "l39", label: "Básica", price: 39, description: "Bloqueo, borrado remoto y control de apps esenciales." },
  { id: "l79", label: "Estándar", price: 79, description: "Incluye políticas avanzadas, VPN y reportes." },
  { id: "l99", label: "Premium", price: 99, description: "Todo lo anterior + soporte prioritario y Zero-Touch/ABM." },
];

export function licenseById(id) {
  return LICENSE_CATALOG.find((l) => l.id === id) || null;
}

// Precios en MXN, sin IVA incluido — se muestra explícito en la interfaz.
export const LICENSE_CURRENCY = "MXN";
export const LICENSE_INCLUDES_TAX = false;
