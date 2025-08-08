
'use server';

/**
 * @fileOverview Generates a deliberately glitched and nonsensical AI avatar for a user profile.
 *
 * - generateGlitchedAvatar - A function that handles the AI avatar generation process.
 * - GlitchedAvatarInput - The input type for the generateGlitchedAvatar function.
 * - GlitchedAvatarOutput - The return type for the generateGlitchedAvatar function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GlitchedAvatarInputSchema = z.object({
  description: z
    .string()
    .describe('A description of the desired avatar, to add some variety.'),
});
export type GlitchedAvatarInput = z.infer<typeof GlitchedAvatarInputSchema>;

const GlitchedAvatarOutputSchema = z.object({
  avatarDataUri: z
    .string()
    .describe(
      "The generated glitched avatar as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GlitchedAvatarOutput = z.infer<typeof GlitchedAvatarOutputSchema>;

export async function generateGlitchedAvatar(
  input: GlitchedAvatarInput
): Promise<GlitchedAvatarOutput> {
  return generateGlitchedAvatarFlow(input);
}

const generateGlitchedAvatarFlow = ai.defineFlow(
  {
    name: 'generateGlitchedAvatarFlow',
    inputSchema: GlitchedAvatarInputSchema,
    outputSchema: GlitchedAvatarOutputSchema,
  },
  async input => {
    try {
      const {media} = await ai.generate({
        // IMPORTANT: ONLY the googleai/gemini-2.0-flash-preview-image-generation model is able to generate images. You MUST use exactly this model to generate images.
        model: 'googleai/gemini-2.0-flash-preview-image-generation',

        // simple prompt
        prompt: `Generate a deliberately glitched and nonsensical AI avatar for a user profile, with the following description: ${input.description}. The avatar should be visually chaotic and humorous, reflecting the absurd nature of online dating. Focus on creating a broken or distorted image.`,

        config: {
          responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE, IMAGE only won't work
        },
      });
      if (media?.url) {
        return {avatarDataUri: media.url};
      }
    } catch (error) {
      console.error("Error generating glitched avatar, returning default.", error);
    }
    // Return a default placeholder if generation fails
    return { avatarDataUri: 'https://placehold.co/128x128.png' };
  }
);
