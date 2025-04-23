// gemini-chat.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig,
});

// Initialize and export the chat session
const chatSession = model.startChat({
  history: [],
});

module.exports = chatSession;