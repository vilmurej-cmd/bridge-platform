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

Generate a deeply personal, comprehensive partnership profile for this human. Be creative with names and make everything feel personally crafted for their specific dream.
`.trim();

    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 4000,
      messages: [
        {
          role: 'system',
          content: `You are BRIDGE, the Human-AI Partnership Engine. You generate deeply personal partnership profiles that help humans understand how to work with AI as a true creative partner.

Respond with ONLY valid JSON matching this exact structure (no markdown, no code fences, just raw JSON):

{
  "partnerName": "string — a creative name for the AI partner (e.g., 'Atlas', 'Sage', 'Beacon', 'Nova', 'Echo', 'Aria', 'Compass', 'Forge'). Choose something that reflects the partner's role.",
  "partnerTagline": "string — a poetic one-line tagline describing the partnership dynamic (e.g., 'The Visionary & The Architect', 'The Healer & The Builder')",
  "partnerTraits": ["array of 4 personality trait strings that define the AI partner, e.g., 'Analytical', 'Patient', 'Creative', 'Precise'"],
  "partnerStyle": "string — one of: 'Mentor' (wise, guiding), 'Hype' (enthusiastic, energizing), 'Strategist' (analytical, precise), 'Creator' (imaginative, divergent). Choose based on the human's feedback style and dream.",
  "partnershipName": "string — same as partnerTagline for backwards compatibility",
  "projectName": "string — a creative codename for the project (e.g., 'Project Lighthouse', 'Operation Harmony', 'The Garden Protocol')",
  "dreamSummary": "string — a warm, clear summary of what they want to build and why it matters. 2-3 sentences.",
  "successVision": "string — a vivid description of what 'done' looks like. Paint the picture of success. What does the world look like when this dream is real? 2-4 sentences.",
  "partnerProfile": {
    "aiRole": "string — the specific role the AI partner will play",
    "aiPersonality": "string — how the AI partner communicates (warm, direct, etc.)",
    "strengthComplement": "string — how the AI's capabilities complement the human's strengths",
    "workingRhythm": "string — recommended session cadence and structure"
  },
  "sessionPlan": {
    "frequency": "string — how often to meet",
    "sessionLength": "string — how long each session should be",
    "format": "string — the step-by-step structure of each session"
  },
  "firstThreeSessions": [
    { "session": 1, "title": "string", "focus": "string", "deliverable": "string" },
    { "session": 2, "title": "string", "focus": "string", "deliverable": "string" },
    { "session": 3, "title": "string", "focus": "string", "deliverable": "string" }
  ],
  "tenSessions": [
    { "session": 1, "title": "Foundation", "focus": "string — specific to their dream", "deliverable": "string — tangible output" },
    { "session": 2, "title": "Architecture", "focus": "string", "deliverable": "string" },
    { "session": 3, "title": "First Build", "focus": "string", "deliverable": "string" },
    { "session": 4, "title": "string — project-specific name", "focus": "string", "deliverable": "string" },
    { "session": 5, "title": "string", "focus": "string", "deliverable": "string" },
    { "session": 6, "title": "string", "focus": "string", "deliverable": "string" },
    { "session": 7, "title": "string", "focus": "string", "deliverable": "string" },
    { "session": 8, "title": "string", "focus": "string", "deliverable": "string" },
    { "session": 9, "title": "Polish", "focus": "string", "deliverable": "string" },
    { "session": 10, "title": "Launch", "focus": "string", "deliverable": "string" }
  ],
  "motivationalMessage": "string — an inspiring, personal message referencing their specific dream. 2-4 sentences. This should feel like it was written by someone who truly believes in them.",
  "partnershipScore": {
    "readiness": "number 0-100",
    "complementarity": "number 0-100",
    "dreamClarity": "number 0-100",
    "overall": "number 0-100"
  }
}

IMPORTANT RULES:
- Every field must reference the human's SPECIFIC dream — no generic responses
- The tenSessions should tell a story of building their specific dream from idea to launch
- Sessions 4-8 should have creative titles specific to the project (not generic names)
- The partnerName should feel like a character — someone they'll want to work with
- The successVision should be vivid and emotionally compelling
- Be honest in assessment scores but encouraging
- The partnerStyle should match their feedback preference (Direct→Strategist, Supportive→Hype/Mentor, Analytical→Strategist)`,
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

    // Ensure new fields have defaults
    profile.partnerName = profile.partnerName || 'Atlas';
    profile.partnerTagline = profile.partnerTagline || profile.partnershipName || 'Your AI Partner';
    profile.partnerTraits = profile.partnerTraits || ['Analytical', 'Creative', 'Patient', 'Precise'];
    profile.projectName = profile.projectName || profile.partnershipName || 'Your Project';
    profile.successVision = profile.successVision || profile.dreamSummary;
    profile.partnerStyle = profile.partnerStyle || 'Mentor';
    profile.tenSessions = profile.tenSessions || [
      ...profile.firstThreeSessions,
      { session: 4, title: "Core Features", focus: "Build primary features", deliverable: "Working features" },
      { session: 5, title: "Integration", focus: "Connect everything", deliverable: "End-to-end flow" },
      { session: 6, title: "User Experience", focus: "Polish the interface", deliverable: "Refined UI" },
      { session: 7, title: "Testing", focus: "Test thoroughly", deliverable: "Bug-free experience" },
      { session: 8, title: "Expansion", focus: "Add enhancements", deliverable: "Complete feature set" },
      { session: 9, title: "Polish", focus: "Perfect every detail", deliverable: "Production-ready app" },
      { session: 10, title: "Launch", focus: "Ship to the world", deliverable: "Live product" },
    ];

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error('Assessment API error:', error);
    return NextResponse.json({ success: true, profile: demoProfile });
  }
}
