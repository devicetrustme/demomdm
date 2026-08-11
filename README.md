# Demo local — Diagnóstico, Delivery y Entrega Técnica (HONOR México)

Proyecto Next.js real. Corre en tu computadora, sin necesidad de internet salvo
para instalar las dependencias la primera vez.

## Cómo correrlo

1. Terminal dentro de esta carpeta.
2. npm install
3. npm run dev
4. Abre http://localhost:3000

## Página principal — ya no hay que escribir direcciones

Al entrar, la página principal tiene un menú con botones grandes para ir a
cualquier parte del sistema con un clic: hacer el diagnóstico, entrar como
vendedor, como gerente, como técnico, o abrir el configurador de equipos.

## Portal del vendedor — ahora con menú de 3 accesos

Al entrar como vendedor (/login/vendedor), lo primero que ves son 3 botones grandes:

1. Mis oportunidades — la lista de clientes que ya tiene.
2. Hacer un diagnóstico — para cuando está frente a un cliente nuevo. Al terminar
   las 5 preguntas, pide el nombre y ciudad del cliente y lo guarda directo como
   una oportunidad nueva ya asignada a él.
3. Ver instalaciones — el estatus en tiempo real de lo que el técnico va avanzando.

Abajo quedan accesos chicos a Mensajes y Mi perfil.

## Flujo completo a probar (de punta a punta)

1. Página principal - "Hacer el diagnóstico": completa las 5 preguntas, agenda con
   Nombre/Correo/Teléfono/Ciudad/Estado (el Estado enruta a la región correcta).
   El chatbot (esquina inferior derecha) responde dudas mientras tanto.
2. "Entrar como gerente": elige cualquier perfil (ej. "Gerente PyME R3"). En
   Bandeja de entrada verás la oportunidad si coincide la región. Botón
   "Asignar / Enviar" -> elige vendedor. Revisa también el panel de diagnósticos.
3. "Entrar como vendedor" (Alberto / R3): la oportunidad ya asignada aparece en
   "Mis oportunidades". Ábrela y lanza el Configurador MDM. También puedes probar
   "Hacer un diagnóstico" desde el propio portal, para un cliente nuevo en vivo.
4. Configurador: completa los 6 pasos y "Generar y enviar PDF". Esto envía
   automáticamente la tarea al técnico con un checklist.
5. "Entrar como técnico": verá la tarea, marca el checklist completo y
   "Marcar como Completado".
6. Vuelve al portal del vendedor -> "Ver instalaciones": estatus actualizado
   en tiempo real.
7. Encuesta NPS: se genera automáticamente al completar. Pruébala en
   /nps/<id-de-la-oportunidad> (el id aparece en la URL al abrir la oportunidad).

## Qué es real y qué es simulado

- Diseño, navegación, cálculo de riesgo, enrutamiento por región/estado, asignación
  gerente-vendedor-técnico, checklist técnico y su sincronización entre portales:
  funcionan de verdad dentro del navegador.
- Login, envío de correo/WhatsApp y generación real del PDF: simulados.
- El catálogo estado->región es un placeholder, aislado en lib/mock-data.js
  para reemplazarlo fácil por el catálogo oficial antes de producción.

## Siguiente paso

Usa prompt_claude_code.md para pasar esta misma arquitectura a la versión
conectada a Supabase.
