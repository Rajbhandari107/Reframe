
import { GoogleGenAI, Type } from "@google/genai";
import { ReframeResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeReflection(today: string, tomorrow: string, yesterdayPlan?: string): Promise<ReframeResult> {
  const prompt = `
    Analyze the following daily reflection and tomorrow's plan.
    ${yesterdayPlan ? `Yesterday's Plan: "${yesterdayPlan}"` : ""}
    Today's Reflection: "${today}"
    Tomorrow's Plan: "${tomorrow}"

    Return a JSON response following this structure:
    {
      "organizedToday": {
        "activities": ["List of core things done today"],
        "signals": ["Mentions of sleep, focus, or energy levels"],
        "patterns": ["Any notable recurring behaviors or feelings"]
      },
      "organizedTomorrow": {
        "activities": ["A clear, structured list of tasks or focus areas identified from the tomorrow plan input"]
      },
      ${yesterdayPlan ? `
      "planVsReality": {
        "followedThrough": ["Tasks planned yesterday that were completed today"],
        "missed": ["Tasks planned yesterday that were not mentioned as done today"],
        "unplanned": ["Significant activities done today that were not in yesterday's plan"]
      },` : ""}
      "realityCheck": "One honest, calm sentence comparing today's energy/results with tomorrow's ambition.",
      "smallAdjustment": "Exactly one small, practical adjustment for tomorrow."
    }

    Note: The "planVsReality" comparison must be neutral and non-judgmental. Avoid words like "failed", "lazy", or "poor performance". Use clarity and observation.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          organizedToday: {
            type: Type.OBJECT,
            properties: {
              activities: { type: Type.ARRAY, items: { type: Type.STRING } },
              signals: { type: Type.ARRAY, items: { type: Type.STRING } },
              patterns: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["activities", "signals", "patterns"]
          },
          organizedTomorrow: {
            type: Type.OBJECT,
            properties: {
              activities: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["activities"]
          },
          planVsReality: {
            type: Type.OBJECT,
            properties: {
              followedThrough: { type: Type.ARRAY, items: { type: Type.STRING } },
              missed: { type: Type.ARRAY, items: { type: Type.STRING } },
              unplanned: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          realityCheck: { type: Type.STRING },
          smallAdjustment: { type: Type.STRING }
        },
        required: ["organizedToday", "organizedTomorrow", "realityCheck", "smallAdjustment"]
      }
    }
  });

  return JSON.parse(response.text) as ReframeResult;
}
