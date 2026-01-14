
import { GoogleGenAI } from "@google/genai";
import { Habit, Completion } from "../types";

export const getAIHabitInsight = async (habits: Habit[], completions: Completion[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const recentCompletions = completions.slice(-20);
  const habitNames = habits.map(h => h.name).join(", ");
  
  const prompt = `
    Context: A professional is tracking their habits.
    Habits: ${habitNames}
    Recent activity data points: ${JSON.stringify(recentCompletions)}
    
    Task: Provide a single sentence of encouragement or a high-level strategic tip (max 25 words) to help them maintain discipline without burnout. Be professional and supportive.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text || "Keep building consistency. You're doing great!";
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "Discipline is the bridge between goals and accomplishment.";
  }
};
