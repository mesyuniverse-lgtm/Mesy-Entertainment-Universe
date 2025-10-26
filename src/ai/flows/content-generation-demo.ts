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
  type: z.enum([
        'content', 
        'avatar', 
        'playlist',
        'text-to-speech',
        'text-to-image',
        'text-to-video',
        'speech-to-text',
        'speech-to-image',
        'speech-to-video',
        'image-to-image',
        'image-to-video',
        'code-generation'
    ]).describe('The type of content to generate.'),
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

Output a text response if the type is "content", "playlist", "text-to-speech", "text-to-video", "speech-to-text", "speech-to-image", "image-to-video", or "code-generation". If the type is "avatar", "text-to-image", or "image-to-image", generate a URL for an image.`, 
});

const contentGenerationFlow = ai.defineFlow(
  {
    name: 'contentGenerationFlow',
    inputSchema: ContentGenerationInputSchema,
    outputSchema: ContentGenerationOutputSchema,
  },
  async input => {
    if (input.type === 'avatar' || input.type === 'text-to-image' || input.type === 'image-to-image' || input.type === 'speech-to-image') {
      const { media } = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: input.prompt,
      });

      return { result: media.url };
    } else if (input.type === 'text-to-speech' || input.type === 'text-to-video' || input.type === 'image-to-video' || input.type === 'speech-to-text' || input.type === 'speech-to-video' || input.type === 'code-generation') {
        // Placeholder for functionality not yet fully implemented
        const {output} = await contentGenerationPrompt(input);
        return { result: `Placeholder for ${input.type}: ${output!.result}`};
    }
    else {
      const {output} = await contentGenerationPrompt(input);
      return output!;
    }
  }
);
