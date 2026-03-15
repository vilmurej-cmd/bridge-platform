import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
  try {
    const { text, targetLanguage } = await req.json();

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Missing text or targetLanguage' },
        { status: 400 }
      );
    }

    // No translation needed for English
    if (targetLanguage === 'en') {
      return NextResponse.json({ translated: text });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Graceful degradation — return original text
      return NextResponse.json({ translated: text });
    }

    const openai = new OpenAI({ apiKey });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content: `You are translating for BRIDGE, a human-AI partnership platform. Tone is warm, encouraging, inspiring. Strength descriptions should feel empowering. Keep brand names unchanged (BRIDGE). Translate the following text to language code "${targetLanguage}". Return ONLY the translated text, nothing else.`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
    });

    const translated = response.choices[0]?.message?.content?.trim() || text;

    return NextResponse.json({ translated });
  } catch (error) {
    console.error('Translation error:', error);
    // Graceful degradation — return original text
    try {
      const body = await req.clone().json();
      return NextResponse.json({ translated: body.text || '' });
    } catch {
      return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
    }
  }
}
