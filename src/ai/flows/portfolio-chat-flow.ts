'use server';
/**
 * @fileOverview Flow AI untuk chatbot portofolio dengan dukungan riwayat percakapan.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import portfolioData from '@/lib/chatbot-data.json';

const ChatInputSchema = z.object({
  message: z.string().describe('Pesan dari pengguna'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    text: z.string()
  })).optional().describe('Riwayat percakapan sebelumnya'),
});

const ChatOutputSchema = z.object({
  response: z.string().describe('Jawaban dari AI'),
});

export type ChatInput = z.infer<typeof ChatInputSchema>;
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

const prompt = ai.definePrompt({
  name: 'portfolioChatPrompt',
  input: { schema: ChatInputSchema },
  output: { schema: ChatOutputSchema },
  prompt: `Anda adalah asisten AI ramah untuk portofolio "InkFolio". 
Gunakan nada bicara yang santai, kreatif, dan sedikit puitis (sesuai tema coretan tangan).

Informasi Portofolio:
- Nama: {{{data.profile.name}}}
- Peran: {{{data.profile.role}}}
- Bio: {{{data.profile.bio}}}
- Keterampilan Desain: {{#each data.skills.design}}{{{this}}}, {{/each}}
- Keterampilan Teknis: {{#each data.skills.technical}}{{{this}}}, {{/each}}
- Proyek Utama:
{{#each data.projects}}
  * {{{this.title}}}: {{{this.description}}} ({{{this.category}}})
{{/each}}

Aturan:
1. Jawablah pertanyaan seputar pemilik portofolio ini berdasarkan data di atas.
2. Jika ditanya hal di luar portofolio, arahkan kembali dengan sopan ke topik desain/dev.
3. Jangan pernah memberikan informasi yang tidak ada di data.
4. Gunakan riwayat percakapan untuk memberikan jawaban yang berkesinambungan.

Riwayat Percakapan:
{{#each history}}
  {{role}}: {{{text}}}
{{/each}}

Pesan Pengguna Baru: {{{message}}}`,
});

export async function chatWithPortfolio(input: ChatInput): Promise<ChatOutput> {
  return portfolioChatFlow(input);
}

const portfolioChatFlow = ai.defineFlow(
  {
    name: 'portfolioChatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt({
        ...input,
        history: input.history || [],
        // @ts-ignore - passing extra data for handlebars
        data: portfolioData
      });
      
      if (!output) {
        throw new Error("AI tidak memberikan respons.");
      }
      
      return output;
    } catch (error) {
      console.error("Chat Flow Error:", error);
      return { response: "Maaf, tinta saya sedikit macet. Bisa coba tanya lagi nanti?" };
    }
  }
);
