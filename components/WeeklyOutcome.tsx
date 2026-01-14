
import React from 'react';
import { WeeklyOutcome as IWeeklyOutcome } from '../types';

interface WeeklyOutcomeProps {
  outcomes: IWeeklyOutcome[];
  toggleOutcome: (id: string) => void;
  addOutcome: (goal: string) => void;
}

export const WeeklyOutcome: React.FC<WeeklyOutcomeProps> = ({ outcomes, toggleOutcome, addOutcome }) => {
  const [newGoal, setNewGoal] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.trim()) return;
    addOutcome(newGoal);
    setNewGoal('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">Weekly Outcomes</h2>
        <p className="text-slate-500 mt-2">Zoom out. What major results will define success this week?</p>
      </header>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Enter a major weekly target..."
          className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
        >
          Define
        </button>
      </form>

      <div className="space-y-3">
        {outcomes.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <i className="fas fa-mountain text-slate-300 text-4xl mb-4"></i>
            <p className="text-slate-400 font-medium">No major outcomes defined for this week.</p>
          </div>
        ) : (
          outcomes.map((outcome) => (
            <div
              key={outcome.id}
              onClick={() => toggleOutcome(outcome.id)}
              className={`p-6 rounded-2xl border flex items-center gap-4 cursor-pointer transition-all group ${
                outcome.isCompleted 
                  ? 'bg-emerald-50 border-emerald-100 opacity-75' 
                  : 'bg-white border-slate-100 hover:border-indigo-100'
              }`}
            >
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                outcome.isCompleted 
                  ? 'bg-emerald-500 border-emerald-500 text-white' 
                  : 'border-slate-200 text-transparent group-hover:border-indigo-300'
              }`}>
                <i className="fas fa-check text-sm"></i>
              </div>
              
              <span className={`text-lg flex-1 ${
                outcome.isCompleted ? 'line-through text-emerald-900' : 'text-slate-700'
              }`}>
                {outcome.goal}
              </span>

              <div className="text-xs font-bold text-slate-300 uppercase tracking-widest hidden sm:block">
                Weekly Milestone
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-3xl overflow-hidden relative">
        <div className="absolute right-0 top-0 opacity-10">
          <i className="fas fa-quote-right text-8xl transform translate-x-4 -translate-y-4"></i>
        </div>
        <h4 className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Strategy Note</h4>
        <p className="text-lg leading-relaxed font-light">
          "Focus on the few high-leverage outcomes that move the needle. Avoid the trap of being busy vs being productive."
        </p>
      </div>
    </div>
  );
};
