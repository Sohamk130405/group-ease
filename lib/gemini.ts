"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load your API key from environment variable
const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY!;

if (!API_KEY) {
  throw new Error(
    "Google Generative AI API key is not set in environment variables."
  );
}

// Initialize the generative AI model
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

/**
 * Removes markdown syntax from a string
 * @param text - The input text with possible markdown
 * @returns Plain text without markdown
 */
function stripMarkdown(text: string): string {
  return text
    .replace(/[`*_~#>+\-=|[\](){}]/g, "") // remove basic markdown syntax
    .replace(/\n{2,}/g, "\n") // reduce multiple newlines
    .trim();
}

/**
 * Sends a user query to the Gemini model and returns a plain text response
 * @param userQuery - The input query from user
 * @returns Cleaned response string
 */
export async function getGeminiResponse(userQuery: string): Promise<string> {
  try {
    const result = await model.generateContent(userQuery);
    const response = await result.response.text();
    return stripMarkdown(response);
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, something went wrong while processing your request.";
  }
}
