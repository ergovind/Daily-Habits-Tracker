
import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout';
import { DailyTracker } from './components/DailyTracker';
import { Dashboard } from './components/Dashboard';
import { WeeklyOutcome } from './components/WeeklyOutcome';
import { Scorecard } from './components/Scorecard';
import { Habit, Completion, WeeklyOutcome as IWeeklyOutcome } from './types';
import { INITIAL_HABITS } from './constants';
import { getAIHabitInsight } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [outcomes, setOutcomes] = useState<IWeeklyOutcome[]>([]);
  const [aiInsight, setAiInsight] = useState('Analyzing your performance...');

  // Initialize data
  useEffect(() => {
    const savedHabits = localStorage.getItem('zh_habits');
    const savedCompletions = localStorage.getItem('zh_completions');
    const savedOutcomes = localStorage.getItem('zh_outcomes');

    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    } else {
      setHabits(INITIAL_HABITS);
      localStorage.setItem('zh_habits', JSON.stringify(INITIAL_HABITS));
    }

    if (savedCompletions) setCompletions(JSON.parse(savedCompletions));
    if (savedOutcomes) setOutcomes(JSON.parse(savedOutcomes));
  }, []);

  // Save data on changes
  useEffect(() => {
    if (habits.length > 0) localStorage.setItem('zh_habits', JSON.stringify(habits));
    localStorage.setItem('zh_completions', JSON.stringify(completions));
    localStorage.setItem('zh_outcomes', JSON.stringify(outcomes));
  }, [habits, completions, outcomes]);

  // Fetch AI Insight
  useEffect(() => {
    const fetchInsight = async () => {
      if (habits.length > 0) {
        const insight = await getAIHabitInsight(habits, completions);
        setAiInsight(insight);
      }
    };
    fetchInsight();
  }, [completions.length]); // Refresh insight when completions change

  const toggleHabit = (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const exists = completions.findIndex(c => c.habitId === habitId && c.date === today);

    if (exists > -1) {
      setCompletions(prev => prev.filter((_, i) => i !== exists));
    } else {
      setCompletions(prev => [...prev, { habitId, date: today }]);
    }
  };

  const toggleOutcome = (id: string) => {
    setOutcomes(prev => prev.map(o => o.id === id ? { ...o, isCompleted: !o.isCompleted } : o));
  };

  const addOutcome = (goal: string) => {
    const newOutcome: IWeeklyOutcome = {
      id: Math.random().toString(36).substr(2, 9),
      weekStarting: new Date().toISOString().split('T')[0],
      goal,
      isCompleted: false
    };
    setOutcomes(prev => [newOutcome, ...prev]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard habits={habits} completions={completions} aiInsight={aiInsight} />;
      case 'daily':
        return <DailyTracker habits={habits} completions={completions} toggleHabit={toggleHabit} />;
      case 'weekly':
        return <WeeklyOutcome outcomes={outcomes} toggleOutcome={toggleOutcome} addOutcome={addOutcome} />;
      case 'scorecard':
        return <Scorecard habits={habits} completions={completions} />;
      default:
        return <Dashboard habits={habits} completions={completions} aiInsight={aiInsight} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
