'use server';
/**
 * @fileoverview This file initializes and configures the Genkit AI toolkit.
 * It sets up the plugins for Google AI (for Gemini models) and Vertex AI,
 * and defines a default model for the application.
 */

import { genkit } from 'genkit';
import { googleAI, vertexAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    googleAI(), // For connecting to Google AI Studio models
    vertexAI(), // For connecting to Google Cloud Vertex AI models
  ],
  model: 'vertexai/gemini-2.5-flash', // Default to using the Vertex AI model
});
