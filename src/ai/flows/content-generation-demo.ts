'use server';

/**
 * @fileOverview Demonstrates AI-powered content generation tools for guest users.
 *
 * - generateContent - A function to generate content based on a given type and prompt.
 * - ContentGenerationInput - The input type for the generateContent function.
 * - ContentGenerationOutput - The return type for the generateContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContentGenerationInputSchema = z.object({
  type: z.enum(['content', 'avatar', 'playlist']).describe('The type of content to generate.'),
  prompt: z.string().describe('The prompt to guide content generation.'),
});
export type ContentGenerationInput = z.infer<typeof ContentGenerationInputSchema>;

const ContentGenerationOutputSchema = z.object({
  result: z.string().describe('The generated content or a data URI for images/avatars.'),
});
export type ContentGenerationOutput = z.infer<typeof ContentGenerationOutputSchema>;

export async function generateContent(input: ContentGenerationInput): Promise<ContentGenerationOutput> {
  return contentGenerationFlow(input);
}

const contentGenerationPrompt = ai.definePrompt({
  name: 'contentGenerationPrompt',
  input: {schema: ContentGenerationInputSchema},
  output: {schema: ContentGenerationOutputSchema},
  prompt: `You are an AI content generator. Generate content based on the given type and prompt.

Type: {{{type}}}
Prompt: {{{prompt}}}

Output a text response if the type is \"content\" or \"playlist\". If the type is \"avatar\", generate a URL for an image.`, 
});

const contentGenerationFlow = ai.defineFlow(
  {
    name: 'contentGenerationFlow',
    inputSchema: ContentGenerationInputSchema,
    outputSchema: ContentGenerationOutputSchema,
  },
  async input => {
    if (input.type === 'avatar') {
      const { media } = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: input.prompt,
      });

      return { result: media.url };
    } else {
      const {output} = await contentGenerationPrompt(input);
      return output!;
    }
  }
);
