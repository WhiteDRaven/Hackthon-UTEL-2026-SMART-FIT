/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Trophy, Flame, Calendar, Sparkles, ArrowRight, Activity, Award } from 'lucide-react';
import { UserStats } from '../types';

interface WorkoutCelebrationProps {
  stats: UserStats;
  weeklyAttendance: number;
  leagueName: string;
  completedCount: number;
  onClose: () => void;
}

export const WorkoutCelebration: React.FC<WorkoutCelebrationProps> = ({
  stats,
  weeklyAttendance,
  leagueName,
  completedCount,
  onClose,
}) => {
  return (
    <div className="absolute inset-0 bg-brand-dark z-50 flex flex-col items-center justify-start py-12 px-4 animate-fade-in overflow-y-auto" id="celebration-overlay-container">
      {/* Visual decorative flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-brand-yellow/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Main Scrollable Wrapper to make sure contents remain centered */}
      <div className="w-full max-w-sm flex flex-col items-center justify-start space-y-5 z-10">
        
        {/* Animated Icon Ring */}
        <div className="relative">
          <div className="absolute inset-0 bg-brand-yellow/20 rounded-full blur-xl animate-pulse" />
          <div className="relative bg-brand-yellow/10 border-2 border-brand-yellow/40 p-6 rounded-full shadow-[0_0_20px_rgba(255,200,0,0.15)]">
            <Trophy className="w-14 h-14 text-brand-yellow animate-bounce" />
          </div>
          <div className="absolute -top-1 -right-1 bg-amber-500 text-brand-dark p-1 rounded-full border border-brand-yellow">
            <Sparkles className="w-4 h-4 fill-brand-dark" />
          </div>
        </div>

        {/* Celebratory Typography */}
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-display font-black text-white uppercase tracking-tight italic">
            ¡Rutina Completada!
          </h1>
          <p className="text-zinc-400 text-xs max-w-xs mx-auto leading-relaxed">
            Has completado con éxito todos los ejercicios de tu sesión activa. ¡Tu esfuerzo de hoy rinde frutos! 🏋️‍♂️💪
          </p>
        </div>

        {/* Stats Grid Dashboard */}
        <div className="grid grid-cols-2 gap-3 w-full">
          {/* Streak Card */}
          <div className="bg-brand-gray border border-white/5 p-4 rounded-2xl text-center flex flex-col items-center gap-1.5 shadow-md">
            <div className="bg-orange-500/10 p-2 rounded-xl text-orange-400">
              <Flame className="w-5 h-5 fill-orange-500/10" />
            </div>
            <div>
              <span className="text-xl font-display font-black text-orange-400">{stats.streak}</span>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mt-0.5">Racha de Días</p>
            </div>
          </div>

          {/* Total Workouts Card */}
          <div className="bg-brand-gray border border-white/5 p-4 rounded-2xl text-center flex flex-col items-center gap-1.5 shadow-md">
            <div className="bg-brand-yellow/10 p-2 rounded-xl text-brand-yellow">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-display font-black text-brand-yellow">{stats.totalWorkouts}</span>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mt-0.5">Asistencias Totales</p>
            </div>
          </div>
        </div>

        {/* Weekly Criteria & League status */}
        <div className="w-full bg-brand-gray/50 border border-white/5 rounded-2xl p-4 flex flex-col gap-2">
          <h4 className="text-[11px] font-display font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-brand-yellow" />
            Consistencia Semanal
          </h4>
          <p className="text-xs text-zinc-400 text-left leading-relaxed">
            Has registrado <strong className="text-brand-yellow">{weeklyAttendance}</strong> de los 3 entrenamientos obligatorios de la semana. Sigue así para ascender o mantenerte en la <strong className="text-white">{leagueName}</strong>.
          </p>
          
          {/* Progress fill bar */}
          <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden mt-1.5 border border-white/5">
            <div 
              className="bg-brand-yellow h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.min((weeklyAttendance / 3) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Action Footer */}
        <div className="w-full pt-2">
          <button
            onClick={onClose}
            className="w-full py-4 px-4 rounded-2xl font-display font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-yellow/10 yellow-gradient text-brand-dark border border-brand-yellow hover:scale-[1.02] active:scale-95 cursor-pointer"
            id="finish-celebration-btn"
          >
            <span>Volver a Inicio</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
