
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Habit, Completion } from '../types';

interface DashboardProps {
  habits: Habit[];
  completions: Completion[];
  aiInsight: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ habits, completions, aiInsight }) => {
  const chartData = useMemo(() => {
    // Last 7 days
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
    });

    return days.map(day => ({
      name: new Date(day).toLocaleDateString('en-US', { weekday: 'short' }),
      count: completions.filter(c => c.date === day).length,
      fullDate: day
    }));
  }, [completions]);

  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    completions.forEach(c => {
      const habit = habits.find(h => h.id === c.habitId);
      if (habit) {
        counts[habit.category] = (counts[habit.category] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [habits, completions]);

  const stats = useMemo(() => {
    const totalPossible = habits.length * 7;
    const completed = completions.filter(c => {
      const d = new Date(c.date);
      const now = new Date();
      return (now.getTime() - d.getTime()) / (1000 * 3600 * 24) < 7;
    }).length;
    return {
      weeklyRate: Math.round((completed / totalPossible) * 100) || 0,
      activeHabits: habits.length,
      todayWins: completions.filter(c => c.date === new Date().toISOString().split('T')[0]).length
    };
  }, [habits, completions]);

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
          <p className="text-slate-500">Welcome back, Alex. Here is your weekly snapshot.</p>
        </div>
        <div className="flex gap-2">
          <div className="px-4 py-2 bg-white rounded-xl border border-slate-100 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-slate-700">In Flow State</span>
          </div>
        </div>
      </header>

      {/* AI Insight Bar */}
      <div className="bg-indigo-600 rounded-3xl p-6 text-white flex items-center gap-6 overflow-hidden relative group">
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-white/10 -skew-x-12 translate-x-10 group-hover:translate-x-5 transition-transform duration-700"></div>
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
          <i className="fas fa-sparkles text-xl"></i>
        </div>
        <div className="flex-1 z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-1">AI Strategic Insight</p>
          <p className="text-lg font-medium italic">"{aiInsight}"</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
          <span className="text-slate-400 text-sm font-medium">Daily Wins</span>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-4xl font-bold text-slate-900">{stats.todayWins}</span>
            <span className="text-slate-400 text-lg font-medium mb-1">/ {stats.activeHabits}</span>
          </div>
          <div className="mt-4 w-full bg-slate-50 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-600 h-full transition-all duration-1000" 
              style={{ width: `${(stats.todayWins / stats.activeHabits) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
          <span className="text-slate-400 text-sm font-medium">Weekly Velocity</span>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-4xl font-bold text-slate-900">{stats.weeklyRate}%</span>
            <span className={`text-emerald-500 text-sm font-bold mb-1 flex items-center`}>
              <i className="fas fa-arrow-up mr-1"></i> 12%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-4 italic">Consistency is the game.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
          <span className="text-slate-400 text-sm font-medium">Current Streak</span>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-4xl font-bold text-orange-500">14</span>
            <span className="text-slate-400 text-lg font-medium mb-1">Days</span>
          </div>
          <p className="text-xs text-slate-400 mt-4">Personal Best: 28 Days</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Activity Volume</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={32}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 6 ? '#4f46e5' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Focus Allocation</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'][index % 4]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
