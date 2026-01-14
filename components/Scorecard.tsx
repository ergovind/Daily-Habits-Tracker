
import React from 'react';
import { Habit, Completion } from '../types';

interface ScorecardProps {
  habits: Habit[];
  completions: Completion[];
}

export const Scorecard: React.FC<ScorecardProps> = ({ habits, completions }) => {
  // Calculate discipline score based on last 14 days
  const calculateScore = () => {
    const now = new Date();
    const days = 14;
    let totalPossible = habits.length * days;
    let completed = 0;

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      completed += completions.filter(c => c.date === dateStr).length;
    }

    return Math.round((completed / totalPossible) * 100) || 0;
  };

  const score = calculateScore();

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <header className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">Discipline Scorecard</h2>
        <p className="text-slate-500 mt-2">Your 14-day rolling performance metric.</p>
      </header>

      <div className="relative flex items-center justify-center py-10">
        {/* Progress Circle Visual */}
        <div className="w-64 h-64 rounded-full border-[16px] border-slate-100 flex flex-col items-center justify-center relative">
          <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="112"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="16"
              strokeDasharray={2 * Math.PI * 112}
              strokeDashoffset={2 * Math.PI * 112 * (1 - score / 100)}
              className="text-indigo-600 transition-all duration-1000 ease-out"
            />
          </svg>
          <span className="text-6xl font-black text-slate-900">{score}</span>
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Consistency</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Performance Grade</h3>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold ${
              score >= 90 ? 'bg-emerald-100 text-emerald-600' :
              score >= 70 ? 'bg-blue-100 text-blue-600' :
              score >= 50 ? 'bg-orange-100 text-orange-600' :
              'bg-rose-100 text-rose-600'
            }`}>
              {score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : 'D'}
            </div>
            <div>
              <p className="font-bold text-xl text-slate-900">
                {score >= 90 ? 'Elite Discipline' : score >= 70 ? 'Strong Foundation' : 'Work in Progress'}
              </p>
              <p className="text-slate-500 text-sm">Better than {score}% of past versions of you.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Protocol Health</h3>
          <div className="space-y-4">
            {habits.map(habit => {
              const habitCompletions = completions.filter(c => c.habitId === habit.id).length;
              return (
                <div key={habit.id} className="space-y-1">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-700">{habit.name}</span>
                    <span className="text-slate-400">{habitCompletions} Check-ins</span>
                  </div>
                  <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-400 h-full" style={{ width: `${Math.min((habitCompletions / 14) * 100, 100)}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex items-start gap-4">
        <i className="fas fa-info-circle text-amber-500 mt-1"></i>
        <div className="text-sm text-amber-800 leading-relaxed">
          <p className="font-bold mb-1">Preventing Burnout</p>
          <p>Don't aim for 100% every single day. Professional consistency is about showing up even when you're at 60% of your energy. A score of 80+ is sustainable and elite.</p>
        </div>
      </div>
    </div>
  );
};
