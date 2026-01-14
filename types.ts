
export type Category = 'Health' | 'Focus' | 'Growth' | 'Personal';

export interface Habit {
  id: string;
  name: string;
  category: Category;
  targetPerWeek: number;
  dailyGoal: boolean; // If true, tracks daily completion
  createdAt: number;
}

export interface Completion {
  habitId: string;
  date: string; // ISO string YYYY-MM-DD
}

export interface WeeklyOutcome {
  id: string;
  weekStarting: string;
  goal: string;
  isCompleted: boolean;
}

export interface HabitStats {
  score: number;
  streak: number;
  completionRate: number;
  aiInsight: string;
}
