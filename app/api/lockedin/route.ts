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
        { role: "user", content: `You are a LinkedIn post generator that creates exaggerated posts in the style of overly enthusiastic and self centered LinkedIn users.
                 Generate a satirical LinkedIn post about "${topic}". Post type: ${postType}. Experience level: ${experience}. Field: ${field}.
                 ${isB2B ? 'After the first sentence where you introduce the topic, say "heres what it taught me about B2B sales."' : ''} Include one or two hashtags at the end of the post.
                 Start off the post with something similar to "thrilled/excited to announce/share" and make the content of the post absolutely satirical and completely self centered.
                 The post is not meant to be taken seriously, it's meant to poke fun of the LinkedIn user posts, so make it obvious. Don't even fully address the topic subject,
                 just go off on a tangent. Throw in some slight begging for recruiters to hire them, somewhere in the post, if it makes sense in the context of the post.
                 Also throw in a satirical sentence or two in parenthesis (like this lol), that makes them look like a fool.` }
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

