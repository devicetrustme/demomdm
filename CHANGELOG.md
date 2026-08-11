# Control de cambios

Historial de cambios del proyecto demo. Formato: fecha, qué se agregó/corrigió.
Cuando el proyecto viva en GitHub, esto se complementa con el historial real de
`git commit` (detalle línea por línea) — este archivo queda como el resumen
en español, fácil de leer, de qué cambió y por qué.

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
