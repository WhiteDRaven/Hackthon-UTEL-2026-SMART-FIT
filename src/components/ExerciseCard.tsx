/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Play, CheckCircle2, Circle, Eye } from 'lucide-react';
import { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  isCompleted: boolean;
  isEnabled: boolean;
  isCustomizeMode: boolean;
  onToggleEnable: () => void;
  onClick: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  isCompleted,
  isEnabled,
  isCustomizeMode,
  onToggleEnable,
  onClick
}) => {
  // Translate muscle groups to standard beautiful Spanish
  const getSpanishBodyPart = (bodyParts: string[]) => {
    const part = bodyParts[0]?.toLowerCase() || '';
    if (part === 'chest') return 'Pecho';
    if (part === 'back') return 'Espalda';
    if (part.includes('leg') || part === 'quads' || part === 'glutes') return 'Pierna';
    if (part === 'shoulders') return 'Hombros';
    if (part.includes('arm')) return 'Brazos';
    if (part === 'waist' || part === 'abs') return 'Abdomen';
    return part.charAt(0).toUpperCase() + part.slice(1);
  };

  // Translate equipment to standard beautiful Spanish
  const getSpanishEquipment = (equipment: string[]) => {
    const equip = equipment[0]?.toLowerCase() || '';
    if (equip === 'dumbbell') return 'Mancuernas';
    if (equip === 'barbell') return 'Barra';
    if (equip === 'body weight' || equip === 'bodyweight') return 'Peso Corporal';
    if (equip === 'cable') return 'Polea/Cable';
    if (equip === 'band') return 'Bandas';
    return equip.charAt(0).toUpperCase() + equip.slice(1);
  };

  const getMuscleBadgeColor = (part: string) => {
    const partLower = part.toLowerCase();
    if (partLower === 'pecho') return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
    if (partLower === 'espalda') return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    if (partLower === 'pierna') return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    if (partLower === 'hombros') return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    if (partLower === 'brazos') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (partLower === 'abdomen') return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
    return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  const getSpanishMuscle = (muscle: string) => {
    const m = muscle.toLowerCase();
    if (m === 'pectorals' || m === 'chest') return 'pectorales';
    if (m === 'lats' || m === 'back') return 'dorsales';
    if (m === 'quads') return 'cuádriceps';
    if (m === 'glutes') return 'glúteos';
    if (m === 'hamstrings') return 'isquiotibiales';
    if (m === 'calves') return 'pantorrillas';
    if (m === 'deltoids' || m === 'shoulders') return 'deltoides';
    if (m === 'biceps') return 'bíceps';
    if (m === 'triceps') return 'tríceps';
    if (m === 'abs' || m === 'core' || m === 'waist') return 'abdomen';
    return m;
  };

  const capitalize = (str: string) => {
    return str.replace(/\b\w/g, c => c.toUpperCase());
  };

  const bodyPartEs = getSpanishBodyPart(exercise.bodyParts);
  const equipmentEs = getSpanishEquipment(exercise.equipment);
  const targetMusclesEs = exercise.targetMuscles.map(getSpanishMuscle).map(capitalize).join(', ');

  return (
    <div 
      onClick={() => {
        if (!isCustomizeMode) {
          onClick();
        }
      }}
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        isCustomizeMode 
          ? 'bg-brand-gray/50 border-white/5 opacity-80 p-4' 
          : isCompleted 
            ? 'bg-brand-gray/80 border-brand-yellow/30 shadow-lg shadow-brand-yellow/5 p-4 cursor-pointer' 
            : 'bg-brand-gray hover:bg-brand-gray-light border-white/5 cursor-pointer hover:border-brand-yellow/40 hover:-translate-y-0.5 hover:shadow-xl p-4'
      } flex gap-4 items-center`}
      id={`exercise-card-${exercise.id}`}
    >
      {/* Background active glow for completed exercises */}
      {isCompleted && !isCustomizeMode && (
        <div className="absolute right-0 top-0 w-32 h-32 bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />
      )}

      {/* Left section: Clean Indicator */}
      <div className="shrink-0 flex items-center justify-center">
        {isCustomizeMode ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleEnable();
            }}
            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
              isEnabled 
                ? 'bg-brand-yellow border-brand-yellow text-brand-dark' 
                : 'border-white/20 hover:border-brand-yellow/50'
            }`}
            aria-label="Activar o desactivar ejercicio"
          >
            {isEnabled && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
          </button>
        ) : (
          <div className="relative">
            {isCompleted ? (
              <div className="bg-brand-yellow/10 p-2 rounded-xl border border-brand-yellow/20 text-brand-yellow">
                <CheckCircle2 className="w-5 h-5 fill-brand-yellow/10" />
              </div>
            ) : (
              <div className="bg-white/5 p-2 rounded-xl border border-white/5 text-gray-400 group-hover:text-white transition-all">
                <Play className="w-5 h-5 fill-gray-400/15" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Center: Title & badges & active muscle highlighted description */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap gap-1.5 items-center mb-1.5">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getMuscleBadgeColor(bodyPartEs)}`}>
            {bodyPartEs}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border bg-zinc-800 text-zinc-300 border-zinc-700">
            {equipmentEs}
          </span>
        </div>
        
        <h3 className="text-sm font-display font-black text-white tracking-wide truncate leading-tight mb-1">
          {capitalize(exercise.name)}
        </h3>
        
        <p className="text-xs text-zinc-300 leading-normal font-medium flex items-center gap-1">
          <span className="text-brand-yellow font-bold text-[9px] uppercase tracking-wider">Activa:</span> 
          <span className="text-zinc-400">{targetMusclesEs}</span>
        </p>
      </div>

      {/* Right: Premium Main Action Button "Ver Guía" / "Entrenar" */}
      {!isCustomizeMode && (
        <div className="shrink-0 pl-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-display font-black uppercase tracking-wider transition-all border ${
              isCompleted
                ? 'bg-zinc-800/60 border-zinc-700/50 text-zinc-400 hover:text-white hover:bg-zinc-800'
                : 'yellow-gradient text-brand-dark border-brand-yellow hover:scale-105 active:scale-95 shadow-md shadow-[#FFC800]/5'
            } cursor-pointer`}
          >
            {isCompleted ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Ver</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-brand-dark" />
                <span>Iniciar</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
