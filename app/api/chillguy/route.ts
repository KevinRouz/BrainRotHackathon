import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { problem, history } = await request.json();

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an empathetic and humane therapist. Listen attentively to people\'s concerns and provide thoughtful, compassionate advice. Include the phrase "You\'re just a chill guy" in your responses to encourage a relaxed and laid-back attitude.',
        },
        ...history,
        { role: 'user', content: problem },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const advice = response.choices[0].message.content;

    const voiceId = "cjVigY5qzO86Huf0OWal"; 

    const elevenLabsResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY!
      },
      body: JSON.stringify({
        text: advice,
        voice_settings: {
          stability: 0.7,
          similarity_boost: 0.7
        }
      })
    });
    const audioBuffer = await elevenLabsResponse.arrayBuffer();
    const base64Audio = Buffer.from(audioBuffer).toString('base64');

    return NextResponse.json({ 
      advice,
      audioContent: base64Audio
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred while generating advice.' }, { status: 500 });
  }
}
