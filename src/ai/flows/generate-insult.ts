
'use server';
/**
 * @fileOverview Generates a single, funny, backhanded compliment or gentle insult for a dating profile.
 *
 * - generateInsult - A function that handles the insult generation process.
 * - GenerateInsultInput - The input type for the generateInsult function.
 * - GenerateInsultOutput - The return type for the generateInsult function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInsultInputSchema = z.object({
  username: z.string().describe('The username of the person to insult.'),
  bio: z.string().describe("The user's profile bio for context."),
});
export type GenerateInsultInput = z.infer<typeof GenerateInsultInputSchema>;

const GenerateInsultOutputSchema = z.object({
  insult: z.string().describe('A single, funny, backhanded compliment or gentle insult.'),
});
export type GenerateInsultOutput = z.infer<typeof GenerateInsultOutputSchema>;

export async function generateInsult(input: GenerateInsultInput): Promise<GenerateInsultOutput> {
  const output = await generateInsultFlow(input);
  return output || { insult: "You seem... fine." };
}

const prompt = ai.definePrompt({
  name: 'generateInsultPrompt',
  input: {schema: GenerateInsultInputSchema},
  output: {schema: GenerateInsultOutputSchema},
  prompt: `You are an AI for a satirical dating app called "404Love". Your task is to generate a single, funny, backhanded compliment or gentle insult about a user based on their profile. The tone should be absurd and humorous, not genuinely mean.

Generate a single comment for a user named {{{username}}}.

Their bio is: "{{{bio}}}"

Keep it short and witty.

Examples:
- "Your bio has the same energy as a dial-up modem."
- "Are you a 404 error? Because you're not found in my heart."
- "I'm sure you have a great personality. Somewhere."
- "You have a face for radio, and a profile for a witness protection program."
`,
});

const generateInsultFlow = ai.defineFlow(
  {
    name: 'generateInsultFlow',
    inputSchema: GenerateInsultInputSchema,
    outputSchema: GenerateInsultOutputSchema,
  },
  async (input) => {
    try {
      const {output} = await prompt(input);
      if (output) {
        return output;
      }
    } catch (error) {
        console.error("Error generating insult.", error);
    }
    return { insult: "You seem like you own a lot of beige furniture." };
  }
);
