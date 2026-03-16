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

// Extended profile for the full BRIDGE experience
export interface BridgeProfile {
  partnershipName: string;
  dreamSummary: string;
  partnerProfile: PartnerProfile;
  sessionPlan: SessionPlan;
  firstThreeSessions: PartnershipSession[];
  motivationalMessage: string;
  partnershipScore: PartnershipScore;
  // New fields for BRIDGE Reborn
  partnerName: string;
  partnerTagline: string;
  partnerTraits: string[];
  projectName: string;
  successVision: string;
  tenSessions: PartnershipSession[];
  partnerStyle: 'Mentor' | 'Hype' | 'Strategist' | 'Creator';
}

// Workspace types
export interface WorkspaceNote {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface WorkspaceMilestone {
  id: string;
  text: string;
  completed: boolean;
  sessionNumber: number;
}

export interface WorkspaceIdea {
  id: string;
  text: string;
  color: string;
  createdAt: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ProjectData {
  id: string;
  profile: BridgeProfile;
  currentSession: number;
  completedSessions: number[];
  sessionSummaries: Record<number, string>;
  notes: WorkspaceNote[];
  milestones: WorkspaceMilestone[];
  ideas: WorkspaceIdea[];
  chatHistory: ChatMessage[];
  createdAt: number;
  updatedAt: number;
  healthScore: 'Growing' | 'Thriving' | 'Needs Attention';
  assessmentData: {
    dream: string;
    whyItMatters: string;
    strengths: string[];
    schedule: string;
    buildStyle: string;
    feedbackStyle: string;
    commitment: string;
    weeklyHours: string;
  };
}

export const demoProfile: BridgeProfile = {
  partnershipName: "The Visionary & The Architect",
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
      focus: "Define the core user experience — what does 'simple' actually look like for an 85-year-old? Map the 3 essential features.",
      deliverable: "A clickable prototype of the main screen with 3 large, labeled buttons",
    },
    {
      session: 2,
      title: "The Connection",
      focus: "Build the video call feature — one tap to call family. No menus, no settings, no confusion.",
      deliverable: "Working one-tap video call with automatic family member recognition",
    },
    {
      session: 3,
      title: "The Daily Smile",
      focus: "Build the daily photo sharing feature — family sends photos, they appear like a digital picture frame.",
      deliverable: "Photo feed that auto-displays new family photos with large text captions",
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
  // New BRIDGE Reborn fields
  partnerName: "Atlas",
  partnerTagline: "The Visionary & The Architect",
  partnerTraits: ["Analytical", "Patient", "Creative", "Precise"],
  projectName: "Project Lighthouse",
  successVision: "A world where every grandparent can see their grandchild's face with a single touch, where technology disappears and only connection remains. 50,000 families reunited across distances, with a 4.9-star rating and tears-of-joy reviews.",
  tenSessions: [
    { session: 1, title: "Foundation", focus: "Define scope, set goals, establish communication patterns", deliverable: "Project charter and clickable prototype" },
    { session: 2, title: "Architecture", focus: "Map the structure of what we're building", deliverable: "Technical architecture diagram and data model" },
    { session: 3, title: "First Build", focus: "Create the first tangible piece", deliverable: "Working core feature prototype" },
    { session: 4, title: "Core Features", focus: "Build the primary user experience", deliverable: "3 core features functional" },
    { session: 5, title: "Integration", focus: "Connect all the pieces together", deliverable: "End-to-end user flow working" },
    { session: 6, title: "User Experience", focus: "Polish the interface and interactions", deliverable: "Refined UI with smooth transitions" },
    { session: 7, title: "Testing", focus: "Test with real scenarios and edge cases", deliverable: "Bug-free core experience" },
    { session: 8, title: "Expansion", focus: "Add secondary features and enhancements", deliverable: "Complete feature set" },
    { session: 9, title: "Polish", focus: "Refine, optimize, and perfect every detail", deliverable: "Production-ready application" },
    { session: 10, title: "Launch", focus: "Ship it to the world", deliverable: "Live product with launch strategy" },
  ],
  partnerStyle: 'Mentor',
};
