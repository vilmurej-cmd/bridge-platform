import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { demoProfile } from '@/lib/demo-profile';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      dream,
      whyItMatters,
      strengths,
      schedule,
      feedbackStyle,
      buildStyle,
      commitment,
      weeklyHours,
    } = body;

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ success: true, profile: demoProfile });
    }

    const client = new OpenAI({ apiKey });

    const userMessage = `
PARTNERSHIP ASSESSMENT DATA
===========================

DREAM:
${dream}

WHY IT MATTERS:
${whyItMatters}

HUMAN STRENGTHS:
${Array.isArray(strengths) ? strengths.join(', ') : strengths}

WORKING STYLE:
- Schedule preference: ${schedule}
- Build style: ${buildStyle}
- Feedback preference: ${feedbackStyle}

COMMITMENT LEVEL: ${commitment}
WEEKLY HOURS AVAILABLE: ${weeklyHours}

Generate a deeply personal partnership profile for this human. Make the partnershipName creative and meaningful. Reference their specific dream throughout. The session plans should be concrete and actionable. The motivational message should feel like it was written just for them.
`.trim();

    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 2000,
      messages: [
        {
          role: 'system',
          content: `You are BRIDGE, the Human-AI Partnership Engine. You generate deeply personal partnership profiles that help humans understand how to work with AI as a true creative partner.

Respond with ONLY valid JSON matching this exact structure (no markdown, no code fences, just raw JSON):

{
  "partnershipName": "string — a creative, meaningful name for this partnership (e.g. 'Project Lighthouse', 'The Garden Protocol')",
  "dreamSummary": "string — a warm, clear summary of what they want to build and why it matters",
  "partnerProfile": {
    "aiRole": "string — the specific role the AI partner will play",
    "aiPersonality": "string — how the AI partner should communicate and interact",
    "strengthComplement": "string — how the AI's capabilities fill gaps in the human's strengths",
    "workingRhythm": "string — recommended session cadence and structure"
  },
  "sessionPlan": {
    "frequency": "string — how often to meet",
    "sessionLength": "string — how long each session should be",
    "format": "string — the step-by-step structure of each session"
  },
  "firstThreeSessions": [
    {
      "session": 1,
      "title": "string — creative session name",
      "focus": "string — what this session accomplishes",
      "deliverable": "string — the tangible output"
    },
    { "session": 2, "title": "...", "focus": "...", "deliverable": "..." },
    { "session": 3, "title": "...", "focus": "...", "deliverable": "..." }
  ],
  "motivationalMessage": "string — an inspiring, personal message referencing their specific dream. 2-4 sentences.",
  "partnershipScore": {
    "readiness": "number 0-100",
    "complementarity": "number 0-100",
    "dreamClarity": "number 0-100",
    "overall": "number 0-100"
  }
}

Be honest in your assessment scores. Include creative, actionable session plans. The motivational message should feel like it was written by someone who truly understands their dream.`,
        },
        { role: 'user', content: userMessage },
      ],
    });

    const responseText = completion.choices[0]?.message?.content || '';
    if (!responseText) {
      return NextResponse.json({ success: true, profile: demoProfile });
    }

    const cleaned = responseText.trim().replace(/^```json?\s*/, '').replace(/```\s*$/, '');
    const profile = JSON.parse(cleaned);

    // Ensure score fields are numbers
    if (profile.partnershipScore) {
      profile.partnershipScore.readiness = Number(profile.partnershipScore.readiness) || 75;
      profile.partnershipScore.complementarity = Number(profile.partnershipScore.complementarity) || 80;
      profile.partnershipScore.dreamClarity = Number(profile.partnershipScore.dreamClarity) || 70;
      profile.partnershipScore.overall = Number(profile.partnershipScore.overall) || 75;
    }

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error('Assessment API error:', error);
    return NextResponse.json({ success: true, profile: demoProfile });
  }
}
