// Guía rápida para el vendedor: qué decir según la respuesta del cliente en
// cada pregunta del diagnóstico, enfocado en cómo ScaleFusion resuelve ese
// punto específico. Se muestra como pop-up justo después de que el vendedor
// selecciona la respuesta, antes de avanzar a la siguiente pregunta.
//
// Estructura: SCALEFUSION_TIPS[questionId][optionIndex] = "texto del tip"

export const SCALEFUSION_TIPS = {
  uso_general: [
    "Entre más usan el celular para trabajo, más vale la pena mostrar que ScaleFusion protege sin frenar la productividad del día a día.",
    "Aunque hoy lo usan poco, un solo equipo perdido puede exponer datos. Con ScaleFusion se puede empezar solo con lo esencial y crecer después.",
    "Perfecto para proponer un piloto: empezar con ScaleFusion en ese grupo pequeño y expandir cuando vean resultados.",
  ],
  bloqueo: [
    "Ya tienen una base. Pregunta si ese bloqueo también borra la información — ScaleFusion sí hace bloqueo Y borrado remoto desde la misma consola.",
    "Este es tu mejor argumento: con ScaleFusion, el bloqueo y borrado remoto se activan en segundos, sin depender de que alguien de IT esté disponible.",
    "Buen momento para explicar que en ScaleFusion el bloqueo remoto es inmediato y no depende de que alguien se acuerde de hacerlo a tiempo.",
  ],
  retiro_acceso: [
    "Ya lo hacen — menciona que ScaleFusion lo deja centralizado en un solo panel, sin tener que ir equipo por equipo.",
    "Otro argumento fuerte: con ScaleFusion se desvincula el acceso de un ex-empleado al instante, desde un solo lugar, sin visitar el equipo físicamente.",
    "Aprovecha para explicar que ScaleFusion hace esto con un clic, sin depender de que alguien se acuerde de avisar a sistemas.",
  ],
  control: [
    "Ya tienen a alguien a cargo — ScaleFusion le facilita el trabajo centralizando todo (claves, apps, actualizaciones) en un solo panel.",
    "Aquí es donde ScaleFusion brilla: automatiza el control de apps y actualizaciones, para que nadie tenga que hacerlo manualmente equipo por equipo.",
    "Buen momento para explicar que con ScaleFusion no hace falta una persona dedicada — la plataforma controla esto de forma automática.",
  ],
  interes: [
    "Semáforo verde para cerrar: pregunta si le gustaría ver una demo rápida de ScaleFusion configurada como la necesitan.",
    "Pregunta qué los detiene — casi siempre es no saber que ScaleFusion no requiere contratar un área de sistemas.",
    "Aclara la duda ahí mismo: ScaleFusion se administra desde un panel simple, pensado para empresas sin equipo técnico dedicado.",
  ],
};
