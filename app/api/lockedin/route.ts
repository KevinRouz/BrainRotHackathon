import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  const { postType, experience, field, isB2B, topic } = await request.json();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a LinkedIn post generator that creates exaggerated, humorous posts in the style of overly enthusiastic LinkedIn users. Include hashtags at the end of the post. YOU MUST BASICALLY BE IDENTICAL TO THOSE r/linkedinlunatic posts where the people are a mix of rampant virtue signaling, cringeworthy titles, and stories that could come from r/thathappened. Heavily exxagerate and virtue signal to the point that it makes the reader want to roll their eyes and cringe" },
        { role: "user", content: `Generate an exaggerated LinkedIn post about "${topic}". Post type: ${postType}. Experience level: ${experience}. Field: ${field}. ${isB2B ? 'Add some relation to B2B sales.' : ''}` }
      ],
      temperature: 0.8,
      max_tokens: 300,
    });

    const generatedPost = response.choices[0].message.content;

    return NextResponse.json({ post: generatedPost });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred while generating the post.' }, { status: 500 });
  }
}

