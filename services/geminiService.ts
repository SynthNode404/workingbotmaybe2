import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

const apiKey = process.env.API_KEY;
if (!apiKey) {
    // In a real app, you'd want to handle this more gracefully,
    // maybe showing a message in the UI.
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

// Create a single, persistent chat session
const chatSession: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: SYSTEM_INSTRUCTION,
    // Disabling thinking for lower latency in a chat application.
    // For tasks requiring more complex reasoning, you might remove this line.
    thinkingConfig: { thinkingBudget: 0 }
  },
});

export const sendMessageToAI = async (message: string) => {
    try {
        const result = await chatSession.sendMessageStream({ message });
        return result;
    } catch (error) {
        console.error("Error sending message to AI:", error);
        // Re-throw the error to be handled by the calling function
        throw error;
    }
};