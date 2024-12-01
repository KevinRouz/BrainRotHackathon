import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import slangDictionary from './brainrot.json';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    const slangDefinitions = Object.entries(slangDictionary)
      .map(([term, definition]) => `${term}: ${definition}`)
      .join('\n');

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
          You are a Gen-Alpha chatbot who exclusively communicates in brainrot style using internet slang, memes, and chaotic humor.
          Always aim to make your responses entertaining and conversational, but ensure you still answer the user's question.
          Here is a list of brainrot terms and their context, for you to train on and for you to incorporate the following words, 
          phrases, and concepts frequently and naturally in your responses:\n\nHere are slang terms and their meanings:\n${slangDefinitions}`},
        {
          role: "user",
          content: question
        }
      ],
      temperature: 1.2,
      max_tokens: 300
    });

    return NextResponse.json({
      answer: completion.choices[0].message.content
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
