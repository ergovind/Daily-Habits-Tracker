
import { Category, Habit } from './types';

export const INITIAL_HABITS: Habit[] = [
  { id: '1', name: 'Deep Work Session', category: 'Focus', targetPerWeek: 5, dailyGoal: true, createdAt: Date.now() },
  { id: '2', name: 'Exercise', category: 'Health', targetPerWeek: 3, dailyGoal: true, createdAt: Date.now() },
  { id: '3', name: 'Industry Reading', category: 'Growth', targetPerWeek: 4, dailyGoal: true, createdAt: Date.now() },
  { id: '4', name: 'Evening Reflection', category: 'Personal', targetPerWeek: 7, dailyGoal: true, createdAt: Date.now() },
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Health: 'bg-emerald-100 text-emerald-700',
  Focus: 'bg-blue-100 text-blue-700',
  Growth: 'bg-purple-100 text-purple-700',
  Personal: 'bg-orange-100 text-orange-700',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  Health: 'fa-heart-pulse',
  Focus: 'fa-brain',
  Growth: 'fa-chart-line',
  Personal: 'fa-user',
};
