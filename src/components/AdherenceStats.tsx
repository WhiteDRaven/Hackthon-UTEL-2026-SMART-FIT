/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Flame, Dumbbell, Award, TrendingUp } from 'lucide-react';
import { UserStats } from '../types';

interface AdherenceStatsProps {
  stats: UserStats;
  completedCount: number;
  totalCount: number;
}

export const AdherenceStats: React.FC<AdherenceStatsProps> = ({
  stats,
  completedCount,
  totalCount
}) => {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Determine user badge/tier based on total workouts
  const getBadgeInfo = (workouts: number) => {
    if (workouts === 0) return { title: 'Inicio de Racha', desc: '¡Comienza tu racha hoy!', color: 'text-gray-400' };
    if (workouts < 3) return { title: 'Bronce Constante', desc: 'Adaptando el hábito', color: 'text-amber-500' };
    if (workouts < 8) return { title: 'Atleta de Hierro', desc: '¡Estás en la zona!', color: 'text-yellow-400 font-bold' };
    return { title: 'Leyenda de Acero', desc: 'Adherencia inquebrantable', color: 'text-red-500 font-extrabold animate-pulse' };
  };

  const badge = getBadgeInfo(stats.totalWorkouts);

  // Dynamic feedback quote based on completion
  const getMotivationalQuote = (pct: number) => {
    if (pct === 0) return 'El primer paso es el más importante. ¡Comienza hoy sin prisa y con buena técnica!';
    if (pct < 50) return '¡Gran comienzo! Recuerda mantener el control en cada repetición para una contracción muscular perfecta.';
    if (pct < 100) return '¡Falta poco para completar tu rutina con técnica impecable!';
    return '¡Espectacular! Rutina completada al 100% con técnica excelente. ¡Tu cuerpo te lo agradecerá!';
  };

  return (
    <div className="glass rounded-3xl p-5 shadow-2xl relative overflow-hidden" id="adherence-stats-panel">
      {/* Absolute decorative glow background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-12 gap-4 relative z-10">
        {/* Progress Circle & Completion */}
        <div className="col-span-5 flex flex-col items-center justify-center border-r border-white/5 pr-2">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Background Circle */}
            <svg className="absolute w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="38"
                className="stroke-brand-gray-light fill-none"
                strokeWidth="7"
              />
              <circle
                cx="48"
                cy="48"
                r="38"
                className="stroke-brand-yellow fill-none transition-all duration-700 ease-out"
                strokeWidth="7"
                strokeDasharray={2 * Math.PI * 38}
                strokeDashoffset={2 * Math.PI * 38 * (1 - percentage / 100)}
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center z-10">
              <span className="text-2xl font-display font-black text-white tracking-tight">{percentage}%</span>
              <p className="text-[10px] text-brand-yellow font-display font-bold uppercase tracking-wider">Progreso</p>
            </div>
          </div>
          <p className="text-xs text-neutral-400 mt-2.5 font-medium">
            {completedCount} de {totalCount} listos
          </p>
        </div>

        {/* Core Adherence Metrics */}
        <div className="col-span-7 flex flex-col justify-between pl-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold font-display">Nivel de Adherencia</p>
              <h4 className={`text-sm ${badge.color} font-display mt-0.5 font-bold`}>{badge.title}</h4>
            </div>
            <div className="bg-[#FFC800]/10 border border-[#FFC800]/20 p-1.5 rounded-xl">
              <Award className="w-4 h-4 text-brand-yellow" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            {/* Streak card */}
            <div className="bg-[#1e1e1e] border border-white/5 rounded-xl p-2 flex items-center gap-2">
              <div className="bg-brand-yellow/10 p-1.5 rounded-lg">
                <Flame className="w-4 h-4 text-brand-yellow fill-brand-yellow/30" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] text-neutral-500 font-display font-bold leading-tight">Racha</p>
                <p className="text-xs font-black text-white leading-tight font-display truncate">
                  {stats.streak} {stats.streak === 1 ? 'Día' : 'Días'}
                </p>
              </div>
            </div>

            {/* Total sessions card */}
            <div className="bg-[#1e1e1e] border border-white/5 rounded-xl p-2 flex items-center gap-2">
              <div className="bg-emerald-500/10 p-1.5 rounded-lg">
                <Dumbbell className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] text-neutral-500 font-display font-bold leading-tight">Sesiones</p>
                <p className="text-xs font-black text-white leading-tight font-display truncate">
                  {stats.totalWorkouts} total
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational message banner */}
      <div className="mt-4 pt-3 border-t border-white/5 flex gap-2.5 items-start relative z-10">
        <div className="bg-brand-yellow/10 p-1.5 rounded-lg mt-0.5 shrink-0">
          <TrendingUp className="w-4 h-4 text-brand-yellow" />
        </div>
        <div>
          <p className="text-xs text-neutral-300 font-medium leading-relaxed italic">
            {getMotivationalQuote(percentage)}
          </p>
        </div>
      </div>
    </div>
  );
};
