/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface League {
  name: string;
  badgeColor: string;
  badgeBg: string;
  borderColor: string;
  glowColor: string;
  emoji: string;
  description: string;
  tips: string;
}

export const LEAGUES: League[] = [
  {
    name: "Liga de Bronce",
    badgeColor: "text-amber-500",
    badgeBg: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    glowColor: "shadow-amber-500/5",
    emoji: "🥉",
    description: "Fase de Iniciación. Desarrolla la técnica básica y acostumbra tu cuerpo al hábito del gimnasio.",
    tips: "Enfócate en realizar la técnica correcta de cada ejercicio. No te preocupes por el peso pesado todavía."
  },
  {
    name: "Liga de Plata",
    badgeColor: "text-slate-300",
    badgeBg: "bg-slate-400/10",
    borderColor: "border-slate-400/20",
    glowColor: "shadow-slate-400/5",
    emoji: "🥈",
    description: "Fase de Adaptación. Estás logrando consistencia en tus visitas semanales y se nota.",
    tips: "Sigue la Conexión Mente-Músculo. Siente la activación muscular en cada repetición."
  },
  {
    name: "Liga de Oro",
    badgeColor: "text-yellow-400",
    badgeBg: "bg-yellow-400/10",
    borderColor: "border-yellow-400/20",
    glowColor: "shadow-yellow-400/5",
    emoji: "🥇",
    description: "Fase de Hábito. El ejercicio ya es parte de tu rutina diaria y tu fuerza está aumentando.",
    tips: "Mantén una hidratación constante y asegura de 7 a 8 horas de sueño para una recuperación óptima."
  },
  {
    name: "Liga Platino",
    badgeColor: "text-cyan-400",
    badgeBg: "bg-cyan-400/10",
    borderColor: "border-cyan-400/20",
    glowColor: "shadow-cyan-400/5",
    emoji: "💎",
    description: "Fase de Rendimiento. Tu fuerza y acondicionamiento son excepcionales.",
    tips: "Asegura consumir suficiente proteína diaria para apoyar la reconstrucción muscular."
  },
  {
    name: "Liga Esmeralda",
    badgeColor: "text-emerald-400",
    badgeBg: "bg-emerald-400/10",
    borderColor: "border-emerald-400/20",
    glowColor: "shadow-emerald-400/5",
    emoji: "💚",
    description: "Fase Elite. Estás en el 5% superior de adherencia y consistencia física.",
    tips: "Varía la intensidad con técnicas como drop sets o pausas de contracción estática."
  },
  {
    name: "Liga Diamante",
    badgeColor: "text-indigo-400",
    badgeBg: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    glowColor: "shadow-indigo-500/5",
    emoji: "👑💎",
    description: "¡El Olimpo del Acero! Tu constancia es inquebrantable y eres fuente de inspiración absoluta.",
    tips: "¡Has dominado el hábito! Mantente libre de lesiones escuchando siempre a tu cuerpo."
  }
];
