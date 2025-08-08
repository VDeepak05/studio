// meme-bio.ts
'use server';
/**
 * @fileOverview Generates a humorous profile bio using a collection of ridiculous punchlines and memes.
 *
 * - generateMemeBio - A function that generates the meme bio.
 * - MemeBioInput - The input type for the generateMemeBio function.
 * - MemeBioOutput - The return type for the generateMemeBio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MemeBioInputSchema = z.object({
  additionalInfo: z.string().optional().describe('Any additional information to incorporate into the bio, if desired.'),
});
export type MemeBioInput = z.infer<typeof MemeBioInputSchema>;

const MemeBioOutputSchema = z.object({
  bio: z.string().describe('The generated humorous profile bio.'),
});
export type MemeBioOutput = z.infer<typeof MemeBioOutputSchema>;

export async function generateMemeBio(input: MemeBioInput): Promise<MemeBioOutput> {
  return generateMemeBioFlow(input);
}

const memeBioPrompt = ai.definePrompt({
  name: 'memeBioPrompt',
  input: {schema: MemeBioInputSchema},
  output: {schema: MemeBioOutputSchema},
  prompt: `You are a creative assistant tasked with generating a humorous dating profile bio.

  Use a combination of the following punchlines and memes to create a bio that is both funny and self-deprecating.
  Feel free to add emojis or other creative elements to enhance the humor.

  Punchlines:
  - I’m your ex. Surprise.
  - Emotionally available between 2 and 3 AM only.
  - Professional ghoster since 2019.
  - I rate my matches using the Fibonacci sequence.
  - My therapist told me to try this.
  - Still not over my last situationship with Siri.
  - Do you believe pigeons are government spies?
  - Which potato shape best represents your emotional availability?
  - Do you bark back at dogs?
  - Are you more left-swiped in life or in apps?

  {{#if additionalInfo}}
  Incorporate this additional info: {{{additionalInfo}}}
  {{/if}}
  `,
});

const generateMemeBioFlow = ai.defineFlow(
  {
    name: 'generateMemeBioFlow',
    inputSchema: MemeBioInputSchema,
    outputSchema: MemeBioOutputSchema,
  },
  async input => {
    const {output} = await memeBioPrompt(input);
    return output!;
  }
);
