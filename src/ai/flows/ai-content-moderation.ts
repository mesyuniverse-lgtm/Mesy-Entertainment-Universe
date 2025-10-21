'use server';
/**
 * @fileOverview An AI content moderation agent.
 *
 * - moderateContent - A function that moderates user-generated content.
 * - ModerateContentInput - The input type for the moderateContent function.
 * - ModerateContentOutput - The return type for the moderateContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateContentInputSchema = z.object({
  text: z
    .string()
    .describe('The user-generated text content to be moderated.'),
});
export type ModerateContentInput = z.infer<typeof ModerateContentInputSchema>;

const ModerateContentOutputSchema = z.object({
  isCompliant: z.boolean().describe('Whether the content complies with community standards.'),
  reason: z.string().describe('The reason for the compliance determination.'),
});
export type ModerateContentOutput = z.infer<typeof ModerateContentOutputSchema>;

export async function moderateContent(input: ModerateContentInput): Promise<ModerateContentOutput> {
  return moderateContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moderateContentPrompt',
  input: {schema: ModerateContentInputSchema},
  output: {schema: ModerateContentOutputSchema},
  prompt: `You are an AI content moderation expert.

You will determine whether the provided user-generated text content complies with community standards.

Community standards prohibit hate speech, harassment, sexually explicit content, dangerous content, and content that violates civic integrity.

Content: {{{text}}}

Based on the above, determine whether the content is compliant with community standards and provide a detailed reason for your determination.

Ensure that the outputted JSON can be parsed by Javascript's JSON.parse function.
`,
});

const moderateContentFlow = ai.defineFlow(
  {
    name: 'moderateContentFlow',
    inputSchema: ModerateContentInputSchema,
    outputSchema: ModerateContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
