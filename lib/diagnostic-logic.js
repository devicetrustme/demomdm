// Lógica del diagnóstico, centralizada para que la landing pública y el
// portal del vendedor usen exactamente las mismas preguntas y el mismo
// cálculo de riesgo — así se evita que un cambio en un lado rompa al otro.

export const QUESTIONS = [
  {
    id: "uso_general",
    q: "¿Usan celulares de la empresa para hablar con clientes, WhatsApp, correo o aplicaciones de trabajo?",
    opts: ["Sí, todo el tiempo", "No, casi no los usamos así", "Solo algunos empleados"],
    scores: false,
  },
  {
    id: "bloqueo",
    q: "Si se pierde un celular, ¿pueden bloquearlo en minutos?",
    opts: ["Sí, lo podemos bloquear de inmediato", "No, no tenemos forma de hacerlo", "No estoy seguro"],
    scores: true,
  },
  {
    id: "retiro_acceso",
    q: "Si alguien deja la empresa, ¿pueden retirar su acceso a la información del celular?",
    opts: ["Sí, se lo quitamos de inmediato", "No, no tenemos cómo", "No estoy seguro"],
    scores: true,
  },
  {
    id: "control",
    q: "¿Alguien controla las claves, aplicaciones y actualizaciones de esos celulares?",
    opts: ["Sí, hay alguien a cargo de eso", "No, cada quien hace lo suyo", "No estoy seguro"],
    scores: true,
  },
  {
    id: "interes",
    q: "¿Le ayudaría poder administrar los celulares de su empresa sin contratar un área de sistemas?",
    opts: ["Sí, nos ahorraría mucho trabajo", "No lo necesitamos por ahora", "No estoy seguro"],
    scores: false,
  },
];

// Riesgo calculado solo con las preguntas marcadas scores:true (bloqueo, retiro_acceso, control).
// Se guarda por "id" de pregunta (no por posición) para que el cálculo sea correcto
// sin importar el orden en que se respondió o si el usuario regresó a corregir algo.
export function calcRisk(answersById) {
  const bloqueo = answersById.bloqueo;
  const retiroAcceso = answersById.retiro_acceso;
  const control = answersById.control;

  if (bloqueo === 1 || retiroAcceso === 1) {
    return { level: "alta", label: "Riesgo alto", tone: "red" };
  }
  if (control === 1 || control === 2 || bloqueo === 2 || retiroAcceso === 2) {
    return { level: "media", label: "Riesgo medio", tone: "amber" };
  }
  return { level: "baja", label: "Riesgo bajo", tone: "green" };
}
