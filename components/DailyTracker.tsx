
import React from 'react';
import { Habit, Completion, Category } from '../types';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../constants';

interface DailyTrackerProps {
  habits: Habit[];
  completions: Completion[];
  toggleHabit: (habitId: string) => void;
}

export const DailyTracker: React.FC<DailyTrackerProps> = ({ habits, completions, toggleHabit }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayCompletions = completions.filter(c => c.date === today).map(c => c.habitId);

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-slate-900">Today's Execution</h2>
        <p className="text-slate-500 mt-1">Focus on what's right in front of you. One win at a time.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {habits.filter(h => h.dailyGoal).map(habit => {
          const isDone = todayCompletions.includes(habit.id);
          return (
            <button
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`p-6 rounded-2xl border text-left transition-all flex items-center gap-4 group ${
                isDone 
                  ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                  : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-md'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                isDone ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400'
              }`}>
                <i className={`fas ${CATEGORY_ICONS[habit.category]} text-lg`}></i>
              </div>
              
              <div className="flex-1">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  isDone ? 'text-indigo-400' : 'text-slate-400'
                }`}>
                  {habit.category}
                </span>
                <h3 className={`text-lg font-semibold ${
                  isDone ? 'text-indigo-900' : 'text-slate-700'
                }`}>
                  {habit.name}
                </h3>
              </div>

              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                isDone 
                  ? 'bg-indigo-600 border-indigo-600 text-white' 
                  : 'border-slate-200 text-transparent group-hover:border-indigo-300'
              }`}>
                <i className="fas fa-check text-sm"></i>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <i className="fas fa-plus text-slate-300 text-xl"></i>
        </div>
        <h4 className="text-slate-400 font-medium">Add a new daily protocol</h4>
        <p className="text-slate-300 text-sm">Coming soon: Custom habit creation</p>
      </div>
    </div>
  );
};
