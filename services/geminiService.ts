import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AiAnalysisResult, StrengthLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    strength: {
      type: Type.STRING,
      enum: [StrengthLevel.WEAK, StrengthLevel.MEDIUM, StrengthLevel.STRONG],
      description: "The overall strength rating of the password.",
    },
    explanation: {
      type: Type.STRING,
      description: "A detailed explanation of why the password received this rating. Be specific about patterns, entropy, or common pitfalls.",
    },
    suggestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of actionable suggestions to improve the password.",
    },
  },
  required: ["strength", "explanation", "suggestions"],
};

export const analyzePasswordWithGemini = async (password: string): Promise<AiAnalysisResult> => {
  try {
    const prompt = `
      Act as a cybersecurity expert. Analyze the strength of the following password string.
      
      Strictly evaluate based on these rules:
      1. Length >= 8 characters
      2. Contains uppercase letters
      3. Contains lowercase letters
      4. Contains numbers
      5. Contains special symbols (@#$%^&*()_+-=!?)

      In addition to the strict rules, analyze for:
      - Common dictionary words
      - Predictable patterns (e.g., "123", "abc", keyboard walks)
      - Personal information formats (dates, years)
      
      Password to analyze: "${password}"
      
      Provide a constructive, professional, yet easy-to-understand analysis.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.3, // Keep it analytical and consistent
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    const result = JSON.parse(text) as AiAnalysisResult;
    return result;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze password with AI. Please try again.");
  }
};
