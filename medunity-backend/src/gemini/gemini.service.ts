// src/gemini/gemini.service.ts

import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class GeminiService {
  private ai: GoogleGenAI;
  // This is the core knowledge base for the AI
  private readonly medUnityContext = `
    MedUnity is a web application that connects doctors and patients through a unified digital platform.
    The system includes three roles: Admin, Doctor, and Patient.
    - **Admin (principal doctor):** Manages the whole platform. Can add, edit, or remove doctors, define medical activities, assign reports to specific doctors and edit them, and publish or update news for the medical team.
    - **Doctor:** Has a personal space where they can view reports assigned to them and download them.
    - **Patient:** Has their own dashboard where they can securely access their medical reports and download them in PDF format when they’re ready.
    The Home page presents an overview, displays the list of available activities and recent news, and provides login/registration access for doctors and patients.
  `;

  constructor() {
    // Initialize GoogleGenAI. It will automatically use the GEMINI_API_KEY from your .env file
    this.ai = new GoogleGenAI({});
  }

  async getMedUnityAnswer(question: string): Promise<string> {
    const prompt = `Based *only* on the context provided below, answer the user's question.
    If the question is about medical conditions, billing, or general anatomy-pathology (like the FAQ examples), you **must** state that your purpose is only to answer questions about the MedUnity platform and its functionality, and that you cannot provide medical or billing advice.

    --- CONTEXT ---
    ${this.medUnityContext}
    --- USER QUESTION ---
    ${question}`;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      // The model is instructed to act as a system, so its response is the direct answer.
      
      // 💡 FIX: Check if response.text is defined before returning it
      if (response.text) {
        return response.text;
      } else {
        // Handle the case where the API response is successful but text is missing (e.g., blocked content)
        console.warn('Gemini API returned an empty text response.');
        return "Sorry, the AI ​​was unable to generate an answer to this question. Please rephrase.";
      }

    } catch (error) {
      console.error('Gemini API Error:', error);
      return "Sorry, an error occured when trying to retrieve the response. Please try again later.";
    }
  }
}
