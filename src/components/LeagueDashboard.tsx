/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Zap, 
  Flame, 
  Sparkles, 
  Plus, 
  Check, 
  Info, 
  RefreshCw, 
  Users, 
  TrendingUp, 
  Crown,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { LEAGUES, League } from '../data/leagues';

interface LeagueDashboardProps {
  leagueIndex: number;
  weeklyAttendance: number;
  weeksTracked: number;
  onAddAttendance: () => void;
  onEndWeek: () => void;
  onResetLeagues: () => void;
  isTodayRegistered: boolean;
  onRegisterToday: () => void;
}

export const LeagueDashboard: React.FC<LeagueDashboardProps> = ({
  leagueIndex,
  weeklyAttendance,
  weeksTracked,
  onAddAttendance,
  onEndWeek,
  onResetLeagues,
  isTodayRegistered,
  onRegisterToday,
}) => {
  const currentLeague = LEAGUES[leagueIndex] || LEAGUES[0];
  const isLastLeague = leagueIndex === LEAGUES.length - 1;
  const isFirstLeague = leagueIndex === 0;

  // Next league info
  const nextLeague = isLastLeague ? null : LEAGUES[leagueIndex + 1];

  // Mock tournament competitors
  const competitorsData = [
    { name: 'Alejandro M. 🇨🇱', sessions: 4, avatarBg: 'bg-indigo-500/10 text-indigo-400', isUser: false },
    { name: 'Sofía G. 🇲🇽', sessions: 3, avatarBg: 'bg-emerald-500/10 text-emerald-400', isUser: false },
    { name: 'Valentina R. 🇨🇴', sessions: 2, avatarBg: 'bg-rose-500/10 text-rose-400', isUser: false },
    { name: 'Carlos P. 🇦🇷', sessions: 1, avatarBg: 'bg-amber-500/10 text-amber-400', isUser: false },
    { name: 'Tú (Atleta) 👤', sessions: weeklyAttendance, avatarBg: 'bg-brand-yellow/20 text-brand-yellow', isUser: true }
  ];

  // Sort competitors by sessions desc. If equal, put user first
  const sortedCompetitors = [...competitorsData].sort((a, b) => {
    if (b.sessions !== a.sessions) {
      return b.sessions - a.sessions;
    }
    return a.isUser ? -1 : 1;
  });

  return (
    <div className="flex flex-col gap-4 py-2 animate-fadeIn" id="league-dashboard-panel">
      
      {/* 1. HERO HEADER WITH CURRENT LEAGUE */}
      <div className={`glass rounded-3xl p-5 border ${currentLeague.borderColor} shadow-2xl relative overflow-hidden transition-all duration-500 ${currentLeague.glowColor}`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex gap-4 items-center relative z-10">
          <div className={`w-16 h-16 rounded-2xl ${currentLeague.badgeBg} border ${currentLeague.borderColor} flex items-center justify-center text-4xl shadow-inner shrink-0 animate-pulse`}>
            {currentLeague.emoji}
          </div>
          <div>
            <span className="text-[10px] text-brand-yellow bg-brand-yellow/10 border border-brand-yellow/20 px-2 py-0.5 rounded-md font-black uppercase tracking-widest">
              Tu Categoría Actual
            </span>
            <h3 className={`text-xl font-display font-black text-white mt-1 flex items-center gap-1.5`}>
              {currentLeague.name}
              {leagueIndex >= 4 && <Crown className="w-4 h-4 text-brand-yellow animate-bounce" />}
            </h3>
            <p className="text-[11px] text-neutral-400 leading-normal mt-0.5 font-medium">
              Semana {weeksTracked} de consistencia serverless
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3.5 border-t border-white/5 relative z-10">
          <p className="text-xs text-neutral-300 leading-relaxed font-medium italic">
            "{currentLeague.description}"
          </p>
        </div>
      </div>

      {/* 2. WEEKLY ADHERENCE REQUIREMENT */}
      <div className="glass rounded-3xl p-5 shadow-2xl" id="weekly-requirement-card">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-yellow" />
            <h4 className="text-xs font-display font-black text-white uppercase tracking-wider">
              Meta Semanal para Ascender
            </h4>
          </div>
          <span className="text-[10px] text-neutral-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full font-bold">
            Mínimo: 3 días/semana
          </span>
        </div>

        <p className="text-xs text-neutral-400 leading-relaxed mb-4">
          Para ascender a la siguiente liga al final de la semana, debes asistir al menos <strong className="text-white">3 veces</strong>. Si entrenas menos de 3 veces, te quedarás en tu división actual o descenderás.
        </p>

        {/* 3 Steps indicator */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[1, 2, 3].map((step) => {
            const isCompleted = weeklyAttendance >= step;
            return (
              <div 
                key={step}
                className={`py-3 px-2 rounded-2xl border text-center flex flex-col items-center justify-center transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-brand-yellow/10 border-brand-yellow/40 text-brand-yellow' 
                    : 'bg-brand-dark/40 border-white/5 text-neutral-600'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black mb-1 transition-all ${
                  isCompleted ? 'bg-brand-yellow text-brand-dark' : 'bg-white/5 text-neutral-500 border border-white/5'
                }`}>
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step}
                </div>
                <span className="text-[9px] font-display font-bold uppercase tracking-wider">
                  {step === 1 ? '1ra Sesión' : step === 2 ? '2da Sesión' : '¡Ascenso!'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Bar & Summary */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-neutral-400 font-medium">Progreso semanal</span>
            <span className="font-bold text-white">{weeklyAttendance} de 3 entrenamientos</span>
          </div>
          <div className="w-full bg-brand-gray-light h-2 rounded-full overflow-hidden">
            <div 
              className="bg-brand-yellow h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${Math.min((weeklyAttendance / 3) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Status Notification Box */}
        <div className="mt-4">
          {weeklyAttendance >= 3 ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-2xl text-xs text-emerald-400 font-bold flex items-start gap-2">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400 animate-bounce" />
              <div>
                <p className="font-extrabold uppercase tracking-wide">¡Calificado para Ascenso!</p>
                <p className="text-[10px] text-emerald-500/80 font-medium mt-0.5">
                  Excelente esfuerzo. Al finalizar esta semana, subirás automáticamente a la {nextLeague ? nextLeague.name : 'máxima categoría'}.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-2xl text-xs text-amber-400 font-bold flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <div>
                <p className="font-extrabold uppercase tracking-wide">Permanencia Temporal</p>
                <p className="text-[10px] text-amber-500/80 font-medium mt-0.5">
                  Necesitas entrenar <strong className="text-white">{3 - weeklyAttendance} veces más</strong> para asegurar tu ascenso semanal. ¡Vamos por ello!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. LEAGUE LADDER / POSITION BOARD */}
      <div className="glass rounded-3xl p-5 shadow-2xl" id="league-ladder-card">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-brand-yellow" />
          <h4 className="text-xs font-display font-black text-white uppercase tracking-wider">
            Clasificación del Torneo
          </h4>
        </div>
        <p className="text-[11px] text-neutral-400 leading-relaxed mb-4">
          Compite de forma amistosa con otros miembros que se encuentran en la misma división. ¡Sube puestos entrenando!
        </p>

        <div className="space-y-2">
          {sortedCompetitors.map((competitor, idx) => {
            const isMe = competitor.isUser;
            return (
              <div 
                key={competitor.name}
                className={`flex justify-between items-center p-2.5 rounded-2xl border transition-all ${
                  isMe 
                    ? 'bg-brand-yellow/15 border-brand-yellow/40 shadow-md scale-[1.02]' 
                    : 'bg-brand-dark/30 border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`text-xs font-mono font-bold w-4 text-center ${
                    idx === 0 ? 'text-brand-yellow' : idx === 1 ? 'text-neutral-300' : 'text-neutral-500'
                  }`}>
                    {idx + 1}
                  </span>
                  <div className={`w-7 h-7 rounded-lg ${competitor.avatarBg} flex items-center justify-center text-xs font-black`}>
                    {competitor.name.slice(0, 2)}
                  </div>
                  <span className={`text-xs font-medium ${isMe ? 'text-brand-yellow font-extrabold' : 'text-white'}`}>
                    {competitor.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-white">{competitor.sessions} d</span>
                  <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    competitor.sessions >= 3 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-zinc-800 text-zinc-400 border border-white/5'
                  }`}>
                    {competitor.sessions >= 3 ? 'Asciendo' : 'Mantengo'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. SEAMLESS INTERACTIVE SIMULATOR (CRITICAL FOR DEMO/TESTING) */}
      <div className="bg-brand-gray border border-white/5 rounded-3xl p-5 shadow-inner" id="league-simulator-card">
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="bg-brand-yellow/10 text-brand-yellow text-[9px] font-black uppercase px-2 py-0.5 rounded-md border border-brand-yellow/20">
            Simulador de Pruebas
          </span>
          <h4 className="text-xs font-display font-bold text-white">¿Cómo funciona el avance?</h4>
        </div>

        <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
          Como el avance se calcula <strong>semanalmente</strong>, puedes usar estos controles serverless para simular tus entrenamientos de la semana o simular el "fin de semana" para comprobar cómo cambias de liga inmediatamente.
        </p>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={onAddAttendance}
            disabled={weeklyAttendance >= 7}
            className="flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-gray-200 py-3 px-3 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
          >
            <Plus className="w-3.5 h-3.5 text-brand-yellow" />
            +1 Sesión Semanal
          </button>

          <button
            onClick={onEndWeek}
            className="flex items-center justify-center gap-1.5 yellow-gradient hover:scale-[1.02] active:scale-95 text-brand-dark py-3 px-3 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg"
          >
            <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />
            Fin de Semana
          </button>
        </div>

        <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
          <button
            onClick={onResetLeagues}
            className="text-[9px] text-red-400 hover:text-red-300 transition-all font-mono uppercase tracking-wider cursor-pointer"
          >
            Reiniciar Ligas
          </button>
          <span className="text-[9px] text-neutral-500 font-mono">Enfoque 100% Serverless</span>
        </div>
      </div>

      {/* 5. GENERAL TIPS & EDUCATION */}
      <div className="bg-brand-gray/30 border border-white/5 rounded-3xl p-4 flex gap-3">
        <div className="bg-brand-yellow/10 p-2 rounded-xl shrink-0 h-fit">
          <TrendingUp className="w-4 h-4 text-brand-yellow" />
        </div>
        <div>
          <h5 className="text-xs font-bold text-white">Consejo del Entrenador para la {currentLeague.name}</h5>
          <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
            {currentLeague.tips}
          </p>
        </div>
      </div>

    </div>
  );
};
