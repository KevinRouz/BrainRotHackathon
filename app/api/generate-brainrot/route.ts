// app/api/generate-brainrot/route.ts
import { NextResponse } from 'next/server';
import pdf from 'pdf-parse';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const pdfFile = formData.get('file') as File;
    
    if (!pdfFile) {
      return NextResponse.json(
        { error: 'No PDF file provided' },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await pdfFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    try {
      // Parse PDF
      const data = await pdf(buffer);
      const fullText = data.text;

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a humorous assistant that rewrites content in an entertaining and slightly chaotic way, while maintaining the core information. Make it fun and engaging, using casual language and occasional internet slang."
          },
          {
            role: "user",
            content: `Please rewrite the following text in a fun, engaging 'brainrot' style while keeping the main points: ${fullText}`
          }
        ],
        model: "gpt-3.5-turbo",
      });

      return NextResponse.json({ brainrotText: completion.choices[0].message.content });
      
    } catch (pdfError) {
      console.error('PDF Processing Error:', pdfError);
      return NextResponse.json(
        { error: 'Failed to process PDF file' },
        { status: 500 }
      );
    }
    
  } catch (error: unknown) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process PDF' },
      { status: 500 }
    );
  }
}
