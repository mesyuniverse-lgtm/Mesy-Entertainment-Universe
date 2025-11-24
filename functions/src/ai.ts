/**
 * @fileoverview This file imports and re-exports all Genkit flows
 * so they can be easily deployed as Firebase Functions.
 */
import { onFlow } from 'genkit/firebase';
import {
  contentGenerationFlow,
  moderateContentFlow,
} from '../../src/ai/flows';

// Export each flow as a Firebase Function
export const contentgenerationflow = onFlow(contentGenerationFlow);
export const moderatecontentflow = onFlow(moderateContentFlow);
