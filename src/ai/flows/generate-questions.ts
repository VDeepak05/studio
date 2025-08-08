
'use server';
/**
 * @fileOverview Generates 5 unique and funny questions for a dating app questionnaire.
 *
 * - generateQuestions - A function that handles the question generation process.
 * - GenerateQuestionsInput - The input type for the generateQuestions function.
 * - GenerateQuestionsOutput - The return type for the generateQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuestionsInputSchema = z.object({});
export type GenerateQuestionsInput = z.infer<typeof GenerateQuestionsInputSchema>;

const QuestionSchema = z.object({
  key: z.string().describe('A short, unique, camelCase key for the question. e.g. "zodiacSign"'),
  text: z.string().describe('The question text.'),
  options: z.array(z.string()).describe('An array of 3-4 humorous or absurd multiple-choice options.'),
});

const GenerateQuestionsOutputSchema = z.object({
  questions: z.array(QuestionSchema).length(4).describe('An array of 4 multiple-choice questions.'),
});
export type GenerateQuestionsOutput = z.infer<typeof GenerateQuestionsOutputSchema>;

export async function generateQuestions(input: GenerateQuestionsInput): Promise<GenerateQuestionsOutput> {
  const {output} = await generateQuestionsFlow(input);

  if (!output?.questions) {
    // Handle the case where the AI doesn't return questions, maybe return a default set or throw an error
    return {
      questions: [
        { key: 'default', text: 'Our AI is having an existential crisis. What is your favorite color?', options: ['Red', 'Blue', 'Green', 'The void'] },
        { key: 'additionalInfo', text: 'Anything else our AI should misinterpret about you?', options: [] }
      ]
    };
  }

  // Add a final, open-ended question
  output.questions.push({
    key: 'additionalInfo',
    text: 'Anything else our AI should misinterpret about you?',
    options: [], // This will be rendered as a textarea
  });

  return output;
}

const prompt = ai.definePrompt({
  name: 'generateQuestionsPrompt',
  input: {schema: GenerateQuestionsInputSchema},
  output: {schema: GenerateQuestionsOutputSchema},
  prompt: `You are an AI for a satirical dating app called "404Love". Your task is to generate 5 unique and funny multiple-choice questions for the user's profile questionnaire. The questions should be absurd, humorous, and poke fun at modern dating culture.

Generate 4 multiple-choice questions. Each question must have 3-4 witty or ridiculous options.
Ensure the questions are unique each time you are called. Do not repeat questions.

Example Question:
- Key: "idealFirstDate"
- Text: "What's your ideal first date?"
- Options: ["Awkwardly staring at our phones", "Splitting a single fry", "A tour of my favorite gas stations", "Crying in a corner"]
`,
});

const generateQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuestionsFlow',
    inputSchema: GenerateQuestionsInputSchema,
    outputSchema: GenerateQuestionsOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
