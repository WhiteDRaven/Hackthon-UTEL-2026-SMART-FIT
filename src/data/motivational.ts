/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MotivationalSuggestion {
  category: string;
  phrase: string;
  tip: string;
}

export const MOTIVATIONAL_PHRASES: Record<string, string[]> = {
  chest: [
    "¡Excelente día para ganar fuerza en pectorales! Concéntrate en el empuje.",
    "¡Presiona con todo! Cincela ese pecho de acero con cada repetición.",
    "Enfoque en la contracción al subir. ¡Siente el pectoral trabajar!"
  ],
  back: [
    "¡Construye una espalda fuerte e imponente hoy! Mantén los hombros atrás.",
    "Tira con los codos para activar los dorsales al máximo grado posible.",
    "La consistencia de hoy esculpe una postura de hierro y un core estable."
  ],
  legs: [
    "¡Día de pierna! La verdadera base y motor de toda tu fuerza corporal.",
    "La fuerza mental se pone a prueba en las sentadillas. ¡Controla el descenso!",
    "Empuja el suelo con los talones. ¡Tus cuádriceps y glúteos te lo agradecerán!"
  ],
  shoulders: [
    "¡Hombros de acero! Define una estructura fuerte y previene lesiones.",
    "Controla el descenso (fase excéntrica) para máxima tensión deltoide.",
    "Eleva tus límites con un empuje controlado y hombros firmes."
  ],
  arms: [
    "¡Excelente día para dar volumen y fuerza máxima a tus brazos!",
    "Aprieta el bíceps o tríceps en el punto de máxima contracción.",
    "Brazos fuertes, mente enfocada. ¡Termina cada serie con control absoluto!"
  ],
  waist: [
    "¡Fortalece tu core hoy! Estabilidad, postura y potencia absoluta.",
    "Controla la respiración en cada contracción y mantén el abdomen activo.",
    "Un núcleo fuerte y estable protege todo tu cuerpo en cada levantamiento."
  ],
  general: [
    "¡Tu esfuerzo y sudor de hoy es la victoria del mañana!",
    "Cada repetición perfecta te acerca un paso más a tu mejor versión.",
    "La disciplina siempre supera a la motivación efímera. ¡Estás aquí, dale duro!"
  ]
};

export const getMotivationalPhrase = (bodyParts: string[], exerciseName: string): string => {
  const part = bodyParts[0]?.toLowerCase() || '';
  let category = 'general';
  
  if (part === 'chest') category = 'chest';
  else if (part === 'back') category = 'back';
  else if (part.includes('leg') || part === 'quads' || part === 'glutes') category = 'legs';
  else if (part === 'shoulders') category = 'shoulders';
  else if (part.includes('arm')) category = 'arms';
  else if (part === 'waist') category = 'waist';

  const phrases = MOTIVATIONAL_PHRASES[category] || MOTIVATIONAL_PHRASES['general'];
  // Deterministic selector based on name length to keep it stable per exercise
  const index = exerciseName.length % phrases.length;
  return phrases[index];
};
