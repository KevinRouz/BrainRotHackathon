import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `You are a master of rizz and modern internet slang. Transform the input: ${prompt} into a super rizzy message the user can send. You are to 'rizzify' whatever message the user inputs. Try to match the general length of the prompt in your response.`
        }
      ],
      temperature: 1.3, // Even higher temperature for more creative rizz
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
