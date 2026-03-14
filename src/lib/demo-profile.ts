export interface PartnershipSession {
  session: number;
  title: string;
  focus: string;
  deliverable: string;
}

export interface PartnershipScore {
  readiness: number;
  complementarity: number;
  dreamClarity: number;
  overall: number;
}

export interface PartnerProfile {
  aiRole: string;
  aiPersonality: string;
  strengthComplement: string;
  workingRhythm: string;
}

export interface SessionPlan {
  frequency: string;
  sessionLength: string;
  format: string;
}

export interface BridgeProfile {
  partnershipName: string;
  dreamSummary: string;
  partnerProfile: PartnerProfile;
  sessionPlan: SessionPlan;
  firstThreeSessions: PartnershipSession[];
  motivationalMessage: string;
  partnershipScore: PartnershipScore;
}

export const demoProfile: BridgeProfile = {
  partnershipName: "Project Lighthouse",
  dreamSummary:
    "A platform that bridges the technology gap between elderly people and their families, turning video calls, photo sharing, and daily check-ins into something so simple that even a 90-year-old can do it with a smile.",
  partnerProfile: {
    aiRole: "Technical Architect & UX Simplicity Engine",
    aiPersonality:
      "Warm, encouraging, and practical. Celebrates every milestone but isn't afraid to say 'let's simplify that further.' Thinks in terms of 'what would make a grandmother smile?'",
    strengthComplement:
      "Full-stack development, accessibility engineering, user research synthesis, and rapid prototyping. While you bring the vision and the human understanding of elderly users, your AI partner handles the technical complexity so you never have to choose between 'possible' and 'simple.'",
    workingRhythm:
      "Steady 90-minute sessions, 3 times per week. Start each session reviewing what was built. End each session with a clear plan for next time.",
  },
  sessionPlan: {
    frequency: "3 sessions per week",
    sessionLength: "90 minutes",
    format:
      "1. Review & celebrate (10 min) → 2. Build the next feature (60 min) → 3. Test with empathy (10 min) → 4. Plan tomorrow (10 min)",
  },
  firstThreeSessions: [
    {
      session: 1,
      title: "The Foundation",
      focus:
        "Define the core user experience — what does 'simple' actually look like for an 85-year-old? Map the 3 essential features.",
      deliverable:
        "A clickable prototype of the main screen with 3 large, labeled buttons",
    },
    {
      session: 2,
      title: "The Connection",
      focus:
        "Build the video call feature — one tap to call family. No menus, no settings, no confusion.",
      deliverable:
        "Working one-tap video call with automatic family member recognition",
    },
    {
      session: 3,
      title: "The Daily Smile",
      focus:
        "Build the daily photo sharing feature — family sends photos, they appear like a digital picture frame.",
      deliverable:
        "Photo feed that auto-displays new family photos with large text captions",
    },
  ],
  motivationalMessage:
    "You're not just building an app — you're building a bridge between generations. The fact that you see this gap, that you care about the grandmother who struggles with her iPad, that you believe technology should adapt to people and not the other way around — that's exactly the kind of vision that changes the world. Your AI partner is ready to handle every line of code so you can focus on what matters: making someone's grandmother smile.",
  partnershipScore: {
    readiness: 85,
    complementarity: 92,
    dreamClarity: 78,
    overall: 85,
  },
};
