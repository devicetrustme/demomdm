# Control de cambios

Historial de cambios del proyecto demo. Formato: fecha, qué se agregó/corrigió.
Cuando el proyecto viva en GitHub, esto se complementa con el historial real de
`git commit` (detalle línea por línea) — este archivo queda como el resumen
en español, fácil de leer, de qué cambió y por qué.

---

## 2026-08-17

**Agregado**
- **Menu de salida para Vendedor, Gerente y Subdirector**: al cerrar
  sesion (boton "Salir"), estos 3 roles ya no regresan a la landing
  publica del cliente — van a una nueva pantalla `/acceso-interno` con
  los accesos directos a los 5 roles internos, para cambiar de cuenta
  rapido. Cliente, tecnico y configurador siguen yendo a la landing
  normal.
- **Pop-up de mensajes nuevos al iniciar sesion** (portal del vendedor):
  si hay mensajes sin leer justo despues de entrar, aparece un aviso con
  la vista previa de hasta 3 mensajes y un boton "Ver mensajes" — se
  muestra una sola vez por sesion, no se repite al navegar dentro del
  portal.
- **Distintivo numerico** sobre el icono de "Mensajes" en el menu
  principal, con la cantidad de mensajes sin leer.
- Los mensajes ahora distinguen leido/no leido (`read: true/false`) — se
  marcan como leidos al abrirlos desde la bandeja, con un punto azul y
  fondo distinto mientras estan pendientes.
- De paso, se corrigieron 2 mensajes de ejemplo que todavia mencionaban
  ciudades del sureste para la region R9 (ya corregida a CDMX/Edomex la
  sesion pasada).

---

## 2026-08-16 (noche) — correccion de regiones con catalogo oficial

**Corregido — la dispersion geografica estaba mal, ahora usa datos reales**

Alberto compartio el archivo oficial `Regiones_Celulares_Mexico_Ciudades.xlsx`
(192 ciudades, 32 estados, 9 regiones con sede). El mapeo anterior era una
tabla inventada para la demo — quedo reemplazada por completo:

- **`REGIONS`**: nombres oficiales y sede de cada region (ej. "Region 4 -
  Noreste", sede Monterrey, N.L.) en vez de las etiquetas genericas
  anteriores.
- **`STATE_REGION_MAP`**: los 32 estados reales, incluida la region
  mayoritaria para los 3 estados divididos (Coahuila, Jalisco, Sonora).
- **`CITY_REGION_MAP`**: las 192 ciudades del catalogo oficial + alias de
  nombre corto (ej. "Cancun" ademas de "Cancun (Benito Juarez)") — 219
  claves en total. Resuelve las excepciones territoriales que un mapeo por
  estado no puede: La Laguna (Coahuila) es R3 aunque el resto de Coahuila
  es R4; Altos Norte (Jalisco) es R6 aunque el resto de Jalisco es R5; San
  Luis Rio Colorado (Sonora) es R1 aunque el resto de Sonora es R2.
- El enrutamiento automatico ahora prioriza **ciudad sobre estado** cuando
  hay ambas disponibles (antes era al reves), porque la ciudad resuelve
  las excepciones y el estado no.
- **Se corrigieron las ciudades de las oportunidades de ejemplo**, que
  antes no coincidian con su region real: Monterrey estaba marcado como
  R2 (correcto: R4), varias oportunidades de "R9" tenian ciudades del
  sureste como Cancun/Merida/Villahermosa (correcto: R9 es la zona
  metropolitana de CDMX — Sureste es R8), y "R3" tenia ciudades de CDMX
  (correcto: R3 es Chihuahua/Durango/La Laguna). Dos empresas de ejemplo
  se renombraron porque su nombre original hacia referencia a la ciudad
  incorrecta ("Grupo Cancun Resorts" -> "Grupo Interlomas Corporativo").
- Los codigos de region (R1-R9), gerentes, subdirectores y vendedores
  **no cambiaron** — solo se corrigio la geografia (ciudad/estado) que
  describe cada region, para no romper ninguna asignacion ya construida.

---

## 2026-08-16 (tarde) — simplificacion para el publico 35-60

**Cambiado — se redujo la complejidad que se habia ido acumulando**

- **Pagina principal**: vuelve a mostrar solo el diagnostico (hero + un
  boton). Los accesos internos (vendedor, gerente, subdirector, tecnico,
  configurador) quedan detras de un link chico "Acceso interno" arriba a
  la derecha, que despliega un panel compacto solo si se necesita — igual
  que al principio del proyecto, antes de que se fueran acumulando 7
  accesos visibles de entrada.
- **Diagnostico publico**: el formulario despues del resultado bajo de 9
  campos a 5 (Nombre, Compania, Correo, Telefono/WhatsApp en un solo
  campo, Estado) + un consentimiento simple. Puesto, preferencia de
  contacto y el consentimiento detallado ya no se piden aqui — se
  capturan despues, cuando el vendedor ya esta en contacto real.
- **La cita para la demo dejo de ser un paso obligatorio** dentro del
  flujo: ahora aparece como una invitacion opcional de un clic
  ("Elegir fecha y hora") despues de confirmar el diagnostico, con solo
  3 campos (fecha, hora, modalidad) en vez de los 7-8 de antes. Si el
  cliente no quiere agendar en ese momento, no pierde tiempo llenando mas
  campos.

**Eliminado**
- **Dashboard de Direccion** (`/direccion`) y su login (`/login/director`)
  — se quitan de la demo para bajarle un nivel de complejidad. La
  visibilidad por canal que daba el Director ya la cubre el Subdirector
  (`/subdireccion`, ve su canal completo) y la visibilidad por region ya
  la cubre el Gerente — no se pierde informacion, se quita un nivel de
  navegacion que no era indispensable para esta demo.
- El drill-down de vendedor ya no acepta el rol "director" (solo
  "manager" y "subdirector").

---

## 2026-08-16

**Agregado — datos ficticios ampliados en toda la demo**
- **Vendedores**: de 6 a 23, cubriendo casi todas las 26 gerencias (16 de
  DEUR + 10 de R9). Se dejaron 3 gerencias sin vendedor a propósito, para
  que el dashboard del gerente/subdirector también muestre el caso
  realista de "sin equipo todavía".
- **Oportunidades**: de 10 a 62, repartidas por vendedor (1-3 cada uno),
  con nombres de empresa variados, ciudades y estados reales por región,
  estatus mezclados (asignada/en proceso/en llamada/en evaluación/
  delivery/concluida), niveles de riesgo variados, y alrededor del 60%
  con licencia y cantidad de equipos ya definidas — para que los
  dashboards de Dirección y Subdirección muestren pipelines con valor
  real en todas las regiones, no solo en R3/R6/R9 como antes.
- **Diagnósticos**: de 3 a 11, cubriendo las 9 regiones, para que el
  panel de análisis de diagnóstico de cada gerente tenga datos.
- **Mensajes**: de 1 a 5, repartidos entre distintos gerentes/subdirectores
  y vendedores de varias regiones.
- Todas las fechas quedaron dentro del rango real de la demo (junio a
  mediados de agosto de 2026), sin fechas futuras.

---

## 2026-08-15 (noche, corrección)

**Cambiado — jerarquía de escalada de 3 niveles (corrige la versión anterior de 2 niveles)**
- Se agrega un nivel intermedio nuevo: **Subdirector**, entre Director y
  Gerente, organizado por canal.
- **DEUR (R1–R8)**: 1 Director → 2 Subdirectores (Corporativo, PyME), cada
  uno con 8 gerencias regionales (una por región). Los 16 gerentes ya
  existentes ahora cuelgan de su subdirector correspondiente.
- **Región 9**: se reemplaza el pool plano de 5 gerentes por **1 Director →
  3 Subdirectores por canal** (Corporativo con 3 gerencias, Empresarial
  con 4, SMB con 3) = 10 gerencias en total.
- Nuevo rol **Subdirector** con login propio (`/login/subdirector`) y su
  propio dashboard (`/subdireccion`) — ve únicamente las gerencias,
  vendedores y pipeline de su canal, sin acceso a los otros canales ni al
  consolidado completo del Director.
- El Dashboard de Dirección (`/direccion`) ahora incluye una sección
  **"Pipeline por canal"** (agrupado por subdirector) antes de las
  secciones existentes "Pipeline por gerente" y "Pipeline por vendedor" —
  así el Director ve primero el consolidado por canal y puede bajar al
  detalle.
- Se agregaron 2 vendedores y 2 oportunidades de ejemplo en Región 9
  (antes no había ninguno) para poder probar el flujo completo ahí.
- El selector de gerente al iniciar sesión (`/login/gerente`) ahora agrupa
  las 26 opciones por subdirector/canal, para que siga siendo fácil de
  navegar.

**Nota**: esta es una corrección sobre la primera versión de este cambio
(documentada como "pendiente para la versión final" en
`prompt_claude_code_v3_crm.md`) — Alberto aclaró que en R9 es 1 Director
con 3 Subdirectores (no 3 Directores), y en DEUR es 1 Director con 2
Subdirectores (no 2 Directores). El documento de planeación se actualizará
también con esta corrección.

---

## 2026-08-15 (noche)

**Agregado**
- **Dashboard de Dirección** (`/direccion`), nuevo rol con dos perfiles fijos:
  Director R1–R8 (consolida las 8 regiones) y Director R9 (solo su región)
  — mismo patrón que ya usan los gerentes por segmento, un nivel arriba.
  Login propio en `/login/director` con selector entre los dos perfiles.
- KPIs ejecutivos: pipeline abierto en valor mensual, valor ganado
  (oportunidades concluidas), total de gerentes y vendedores en el
  alcance, oportunidades abiertas/concluidas, promedio de días abierta.
- **Pipeline por gerente**: lista expandible — cada gerente muestra su
  valor total de pipeline y, al abrir, el detalle de cada oportunidad de
  sus vendedores con cliente, estatus y valor.
- **Pipeline por vendedor**: lista ordenada por valor de mayor a menor,
  con acceso al detalle de cada vendedor (reutiliza el drill-down que ya
  existía para el gerente, ahora también accesible por Dirección).
- `lib/finance.js`: función compartida `opportunityMonthlyValue()` — usa
  el valor real del Configurador MDM si ya existe, o el estimado
  capturado a mano en la ficha de la oportunidad. La usan de forma
  consistente la lista de oportunidades, el dashboard del gerente, el
  drill-down de vendedor y el nuevo dashboard de Dirección.
- El dashboard del gerente también ganó un KPI de "Pipeline / mes" con el
  mismo cálculo, para que los números cuadren entre ambos niveles.

---

## 2026-08-15 (tarde)

**Agregado**
- Catálogo de licencias (`lib/mock-data.js` → LICENSE_CATALOG): Básica $39,
  Estándar $79, Premium $99 MXN por dispositivo/mes — un solo lugar para
  editar precios, sin números escritos directamente en los componentes.
- **Ficha de oportunidad**: nueva tarjeta "Licencia y valor estimado" —
  elegir licencia + cantidad de equipos estimada, con cálculo automático de
  valor mensual y anual. Se puede definir desde el pipeline, antes de
  llegar al Configurador MDM, para ponderar el tamaño del negocio desde
  etapas tempranas. También visible como resumen en la lista de "Mis
  oportunidades".
- **Configurador MDM — nuevo primer paso ("Licencia")**: ahora la primera
  pregunta del wizard es qué licencia va a adquirir el cliente, junto con
  los datos de la persona que recibirá la consola de administración
  (Nombre, Puesto, Compañía, Correo, Teléfono celular). El wizard pasó de
  6 a 7 pasos.
- El valor mensual/anual calculado y los datos de la persona de la consola
  ahora aparecen en el paso de Confirmación y **al final del documento
  PDF**, antes de la firma de aceptación.
- Si la oportunidad ya tenía una licencia/cantidad de equipos definida
  desde su ficha, el Configurador la precarga automáticamente al abrir.

---

## 2026-08-15

**Cambiado**
- Documento PDF del Configurador MDM: se quitó "HONOR México" del
  encabezado — ahora dice **"ScaleFusion"**, consistente con la marca
  pública del sistema.
- Se agregó un **folio de seguimiento aleatorio** (ej. `SF-4K9X2B`),
  generado una sola vez al crear el documento y guardado junto con la
  configuración — no cambia cada vez que se vuelve a abrir el documento.
  Aparece en la pantalla de éxito del Configurador y en el propio
  documento PDF, justo debajo del encabezado.
- El nombre sugerido del archivo al guardar como PDF (título de la
  pestaña) ahora incluye el folio: "ScaleFusion - [cliente] - [folio]".

---

## 2026-08-14

**Corregido**
- **Bug de pantalla en blanco al salir (logout)**: la causa era una carrera
  entre limpiar la sesión y navegar — `RequireRole` detectaba "sin sesión"
  en la pantalla actual antes de que terminara de cambiar de página. Se
  corrigió el orden en `components/ui.jsx` (botón "Salir" del encabezado) y
  en la pantalla de cierre de venta: ahora navega primero y la sesión se
  limpia un instante después.
- **Bug de pantalla en blanco al generar el PDF**: el botón "Ver/descargar
  documento PDF" abría una pestaña nueva (`window.open`), poco confiable en
  varios navegadores y celulares. Ahora navega en la misma pestaña. Además,
  se agregó un botón permanente **"Ver documento PDF generado"** en la
  ficha de cada oportunidad (no solo justo después de generarlo), y un
  enlace de "Volver a la oportunidad" dentro del documento — así siempre
  hay un camino de regreso confiable.

**Cambiado — marca de la pantalla pública**
- La pantalla inicial (`/`) ya no menciona "HONOR México": ahora dice
  **"ScaleFusion Telcel"** en el encabezado, con **"Powered by Biso
  Consulting"** al pie de página.
- El chatbot flotante cambió de "Asistente HONOR" a "Asistente
  ScaleFusion" para ser consistente.
- El título de la pestaña del navegador también se actualizó a
  "ScaleFusion Telcel — Diagnóstico y Delivery".
- El documento PDF (Configurador MDM) **sí conserva "HONOR México"** en su
  encabezado — es el documento interno que se entrega a modo de reporte
  técnico, distinto de la cara pública del sistema.

---

## 2026-08-13

**Agregado**
- Diagnóstico en vivo del vendedor (`/portal/diagnostico`): ahora también
  pide Compañía, Correo y Teléfono del cliente al guardar la oportunidad
  (antes solo pedía nombre y ciudad), con las mismas validaciones de
  formato ya usadas en el diagnóstico público.
- Al mover una oportunidad a **"En evaluación"**, aparece la opción de
  agendar la llamada de seguimiento (fecha, hora, zona horaria, duración,
  modalidad) — genera el archivo `.ics` descargable igual que en el
  diagnóstico público. Es opcional: se puede "Omitir por ahora" si el
  vendedor prefiere agendarla después.

---

## 2026-08-12

**Agregado**
- Pantalla de bienvenida antes del diagnóstico: "Bienvenido al Diagnóstico
  de Control Remoto ScaleFusion..." con botón "Comenzar diagnóstico".
- Formulario de contacto ampliado: Compañía (obligatorio), Puesto
  (opcional), checkbox "El número de WhatsApp es el mismo que mi
  teléfono", preferencia de contacto, consentimiento de privacidad.
- Validaciones nuevas (`lib/validators.js`): formato de correo, longitud de
  teléfono, anti-duplicados por correo/teléfono (evita registrar el mismo
  prospecto dos veces), no permite agendar fecha/hora pasada.
- Solicitud de demostración separada del formulario de contacto, como su
  propio paso: nombre del asistente, compañía, correo, fecha, hora, zona
  horaria (México, editable), duración, modalidad (videollamada/llamada/
  presencial), comentarios, consentimiento de invitación.
- Generación de archivo `.ics` (invitación de calendario) descargable al
  momento de agendar — compatible con Apple Calendar, Google Calendar y
  Microsoft Outlook, sin depender de ningún servicio externo
  (`lib/ics.js`).
- Compañía visible en la lista de oportunidades del vendedor y en el
  detalle de cada oportunidad.

**Decisiones de producto aplicadas en este bloque** (confirmadas en
conversación con Alberto):
- El pipeline de estatus se mantiene igual (6 valores) — no se migra a un
  enum más grande.
- El flujo de creación de la oportunidad al agendar se mantiene como
  estaba (inmediato) — no se agregó una compuerta de "pendiente de
  confirmación del gerente".

---

## 2026-08-10 (noche)

**Agregado**
- Zero-Touch / Apple Business Manager en el paso "Tipo de uso": por cada
  perfil se pregunta si los equipos deben quedar listos para usarse sin
  configurarlos a mano, y si es así, pide el correo con el que se va a dar
  de alta la cuenta (Zero-Touch para Android, Apple Business Manager para
  iOS). Queda reflejado en el checklist del técnico.
- Firma de aceptación en el paso final del Configurador: nombre de quien
  acepta + checkbox de confirmación, obligatorios para poder generar el
  documento.
- Documento PDF imprimible (`/configurador/documento`): incluye los datos
  del cliente, cada perfil con su plataforma, todas las políticas de
  seguridad aplicadas (con su explicación en lenguaje llano), las apps
  instaladas, los datos de Zero-Touch/ABM si aplica, y la firma de
  aceptación con nombre y fecha. Se genera con la función de imprimir del
  navegador ("Guardar como PDF"), sin depender de librerías externas.

---

## 2026-08-10 (tarde)

**Agregado**
- Configurador MDM simplificado: al elegir el tipo de perfil (Restringido/
  Flexible/Kiosco), las políticas de seguridad típicas quedan pre-marcadas
  automáticamente — el vendedor ya no arranca de cero, solo ajusta.
- Cada política de seguridad ahora tiene una explicación en lenguaje llano
  debajo (ej. "Bloqueo remoto del equipo — Si se pierde, se bloquea desde
  una computadora"), en vez de solo el nombre técnico.
- La opción "Un solo perfil para todos" quedó marcada como "Más común" en
  el paso de segmentación, para orientar la decisión.
- Nombres de los pasos del configurador simplificados ("Cantidad de
  equipos" en vez de "Volumen", "Tipo de uso" en vez de "Perfiles",
  "Seguridad y apps" en vez de "Políticas y apps").

**Corregido**
- Aumentado el tamaño de letra en todo el proyecto (los textos de 10px y
  11px pasaron a 12px/14px, y los de 12px/14px pasaron a 14px/16px) —
  ajuste pensado para el rango de edad real de quienes usan el sistema
  (35-60 años).

---

## 2026-08-10

**Agregado**
- Configurador MDM: cuando la oportunidad completa es "Ambas" plataformas,
  cada segmento (ej. "Ventas") ahora pide explícitamente si sus equipos son
  Android o iOS, para configurar políticas y apps según corresponda.
  El ícono de la plataforma queda visible en los pasos de Perfiles,
  Políticas/Apps y Confirmar, y el checklist que recibe el técnico incluye
  la plataforma de cada perfil.

---

## 2026-08-06 (tarde)

**Agregado**
- Guía rápida tipo pop-up en el diagnóstico del portal del vendedor
  (`/portal/diagnostico`): después de cada respuesta aparece un tip de cómo
  ScaleFusion resuelve ese punto específico, como guion de venta en vivo.
  Contenido centralizado en `lib/scalefusion-tips.js` (15 tips: 5 preguntas
  x 3 respuestas cada una).
- Configurador MDM: campo de texto libre para agregar aplicaciones que no
  están en el catálogo, por cada perfil — quedan como chips removibles,
  separado del catálogo curado.

## 2026-08-06

**Agregado**
- Página principal con menú permanente (sin toggle escondido) para entrar a
  cualquier sección con un clic: diagnóstico, vendedor, gerente, técnico, configurador.
- Portal del vendedor rediseñado: pantalla de entrada con 3 accesos grandes
  ("Mis oportunidades", "Hacer un diagnóstico", "Ver instalaciones").
- Nuevo: diagnóstico dentro del portal del vendedor (`/portal/diagnostico`),
  para cuando el vendedor está en vivo frente al cliente — se auto-asigna
  directo, sin pasar por la bandeja del gerente.
- Lógica de preguntas y cálculo de riesgo centralizada en
  `lib/diagnostic-logic.js`, para que la landing pública y el portal del
  vendedor usen exactamente la misma fuente (evita que un cambio rompa al otro).

**Corregido**
- Verificado de punta a punta (build + servidor local) que `/diagnostico` y
  el resto de rutas cargan sin errores.

---

## 2026-08-05 (tarde)

**Agregado**
- Regiones R1–R9, gerentes por región+segmento (PyME/Corporativo, 16 en
  R1–R8 + pool en R9), técnicos, y su enrutamiento automático por Estado.
- Bandeja de entrada del gerente + botón "Asignar / Enviar" a vendedor.
- Panel de análisis de diagnóstico (gráfica simple por nivel de riesgo).
- Portal del técnico nuevo: checklist de entrega + botón "Completado".
- Sincronización automática: al completar el técnico, el estatus de
  "Delivery" se refleja en el portal del vendedor y dispara la encuesta NPS.
- Encuesta NPS pública (`/nps/[id]`).
- Chatbot con base de conocimiento (preguntas frecuentes) en la landing y el
  diagnóstico público.
- Formulario de agendamiento (15 min) tras el resultado del diagnóstico:
  Nombre, Correo, Teléfono, Ciudad y Estado (obligatorios) + selección de horario.

---

## 2026-08-05 (mañana)

**Agregado**
- Primera versión ejecutable del proyecto en Next.js (antes solo existía
  como artifact de vista previa dentro del chat).
- Separación de arquitectura: `app/(public)/` (landing, diagnóstico) vs.
  `app/(app)/` (portal, dashboard, configurador — todo detrás de sesión demo).
- Login demo por rol (vendedor / gerente / configurador) con sesión
  persistida en el navegador.
- Pipeline del vendedor con estatus editable por oportunidad.
- Flujo de cierre de venta con pantalla de éxito y botón "Salir" explícito.
- Dashboard del gerente con KPIs, gráfica de oportunidades por vendedor y
  drill-down por vendedor con nombres de clientes.
- Configurador MDM completo de 6 pasos (cliente → plataforma → volumen y
  segmentación → perfiles de uso → políticas y apps → checkup final).

---

## 2026-08-04

**Agregado**
- Demo visual interactiva (artifact React) con las 4 pantallas base:
  landing/diagnóstico, portal del vendedor, dashboard del gerente,
  configurador de delivery — diseño blanco y azul, minimalista.
- Documento Word de especificación del proyecto (funcionalidades, modelo de
  datos, stack recomendado, guía de instalación paso a paso).
- Prompt de ejecución para Claude Code (`prompt_claude_code.md`).
