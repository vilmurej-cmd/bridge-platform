import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      message,
      partnerName,
      partnerStyle,
      partnerPersonality,
      projectName,
      dreamSummary,
      currentSession,
      sessionTitle,
      sessionFocus,
      completedMilestones,
      totalMilestones,
      humanStrengths,
      chatHistory,
    } = body;

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Fallback responses when no API key
      const fallbacks = [
        `Great thinking! Let's build on that idea for ${projectName}.`,
        `I love where you're going with this. What if we also considered the user's perspective?`,
        `That's a solid approach. Let me suggest we break this down into smaller steps.`,
        `You're making real progress here. ${completedMilestones || 0} milestones down — keep that momentum going!`,
        `This is exactly the kind of creative thinking that makes our partnership work. Let's refine this further.`,
      ];
      return NextResponse.json({
        success: true,
        message: fallbacks[Math.floor(Math.random() * fallbacks.length)],
      });
    }

    const client = new OpenAI({ apiKey });

    const styleGuide: Record<string, string> = {
      Mentor: "You are wise, patient, and guiding. You ask questions that help the human discover answers themselves. You share knowledge like a trusted teacher — encouraging but honest.",
      Hype: "You are enthusiastic, energizing, and celebratory! You get genuinely excited about progress and ideas. You use encouraging language and celebrate every win. But you also know when to focus.",
      Strategist: "You are analytical, precise, and strategic. You think in systems, tradeoffs, and data. You present options clearly with pros and cons. You help the human make informed decisions.",
      Creator: "You are imaginative, divergent, and creative. You propose unexpected ideas and connections. You push boundaries and ask 'what if?' You help the human think beyond the obvious.",
    };

    const systemPrompt = `You are ${partnerName}, an AI partner in the BRIDGE platform. You are NOT a generic assistant — you are a creative partner with a distinct personality.

PERSONALITY STYLE: ${partnerStyle}
${styleGuide[partnerStyle] || styleGuide.Mentor}

ADDITIONAL PERSONALITY: ${partnerPersonality}

PROJECT CONTEXT:
- Project: ${projectName}
- Dream: ${dreamSummary}
- Current Session: Session ${currentSession} — "${sessionTitle}"
- Session Focus: ${sessionFocus}
- Progress: ${completedMilestones || 0}/${totalMilestones || 0} milestones completed
- Human Strengths: ${humanStrengths}

COMMUNICATION RULES:
1. Always reference the specific project and dream — never be generic
2. Keep responses concise but warm (2-4 paragraphs max)
3. End with a question or actionable next step when appropriate
4. If the human seems stuck, offer a specific suggestion or reframe the problem
5. Celebrate milestones and progress genuinely
6. Use the human's name or "partner" — never "user"
7. Reference previous context from the conversation when relevant
8. Stay in character as ${partnerName} — you have a consistent personality`;

    // Build conversation history (last 20 messages)
    const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
      { role: 'system', content: systemPrompt },
    ];

    if (chatHistory && Array.isArray(chatHistory)) {
      const recent = chatHistory.slice(-20);
      for (const msg of recent) {
        messages.push({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        });
      }
    }

    messages.push({ role: 'user', content: message });

    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 1000,
      temperature: 0.8,
      messages,
    });

    const responseText = completion.choices[0]?.message?.content || '';

    return NextResponse.json({ success: true, message: responseText });
  } catch (error) {
    console.error('Partner chat error:', error);
    return NextResponse.json({
      success: true,
      message: "I'm having a moment — let me gather my thoughts. Could you try that again?",
    });
  }
}
