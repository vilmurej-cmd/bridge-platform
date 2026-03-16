import type { BridgeProfile, ProjectData, ChatMessage, WorkspaceNote, WorkspaceMilestone, WorkspaceIdea } from "./demo-profile";

const PROFILE_KEY = "bridge-profile";
const PROJECT_KEY = "bridge-project";
const PARTNERSHIPS_COUNT_KEY = "bridge-partnerships-count";

// ============ Profile Storage ============

export function saveProfile(profile: BridgeProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error("Failed to save profile:", error);
  }
}

export function getProfile(): BridgeProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to read profile:", error);
    return null;
  }
}

export function clearProfile(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(PROFILE_KEY);
  } catch (error) {
    console.error("Failed to clear profile:", error);
  }
}

// ============ Project Storage ============

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function createProject(profile: BridgeProfile, assessmentData: ProjectData['assessmentData']): ProjectData {
  const project: ProjectData = {
    id: generateId(),
    profile,
    currentSession: 1,
    completedSessions: [],
    sessionSummaries: {},
    notes: [],
    milestones: generateMilestones(profile),
    ideas: [],
    chatHistory: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    healthScore: 'Growing',
    assessmentData,
  };
  saveProject(project);
  incrementPartnershipsCount();
  return project;
}

function generateMilestones(profile: BridgeProfile): WorkspaceMilestone[] {
  const sessions = profile.tenSessions || profile.firstThreeSessions;
  return sessions.slice(0, 3).map((s, i) => ({
    id: generateId(),
    text: s.deliverable,
    completed: false,
    sessionNumber: s.session || i + 1,
  }));
}

export function saveProject(project: ProjectData): void {
  if (typeof window === "undefined") return;
  try {
    project.updatedAt = Date.now();
    localStorage.setItem(PROJECT_KEY, JSON.stringify(project));
  } catch (error) {
    console.error("Failed to save project:", error);
  }
}

export function getProject(): ProjectData | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(PROJECT_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to read project:", error);
    return null;
  }
}

export function clearProject(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(PROJECT_KEY);
  } catch (error) {
    console.error("Failed to clear project:", error);
  }
}

// ============ Chat History ============

export function addChatMessage(projectId: string, message: ChatMessage): void {
  const project = getProject();
  if (!project || project.id !== projectId) return;
  project.chatHistory.push(message);
  // Keep last 100 messages
  if (project.chatHistory.length > 100) {
    project.chatHistory = project.chatHistory.slice(-100);
  }
  saveProject(project);
}

// ============ Notes ============

export function addNote(projectId: string, note: WorkspaceNote): void {
  const project = getProject();
  if (!project || project.id !== projectId) return;
  project.notes.push(note);
  saveProject(project);
}

export function updateNote(projectId: string, noteId: string, updates: Partial<WorkspaceNote>): void {
  const project = getProject();
  if (!project || project.id !== projectId) return;
  const idx = project.notes.findIndex(n => n.id === noteId);
  if (idx >= 0) {
    project.notes[idx] = { ...project.notes[idx], ...updates, updatedAt: Date.now() };
    saveProject(project);
  }
}

export function deleteNote(projectId: string, noteId: string): void {
  const project = getProject();
  if (!project || project.id !== projectId) return;
  project.notes = project.notes.filter(n => n.id !== noteId);
  saveProject(project);
}

// ============ Milestones ============

export function toggleMilestone(projectId: string, milestoneId: string): void {
  const project = getProject();
  if (!project || project.id !== projectId) return;
  const idx = project.milestones.findIndex(m => m.id === milestoneId);
  if (idx >= 0) {
    project.milestones[idx].completed = !project.milestones[idx].completed;
    saveProject(project);
  }
}

export function addMilestone(projectId: string, milestone: WorkspaceMilestone): void {
  const project = getProject();
  if (!project || project.id !== projectId) return;
  project.milestones.push(milestone);
  saveProject(project);
}

// ============ Ideas ============

export function addIdea(projectId: string, idea: WorkspaceIdea): void {
  const project = getProject();
  if (!project || project.id !== projectId) return;
  project.ideas.push(idea);
  saveProject(project);
}

export function deleteIdea(projectId: string, ideaId: string): void {
  const project = getProject();
  if (!project || project.id !== projectId) return;
  project.ideas = project.ideas.filter(i => i.id !== ideaId);
  saveProject(project);
}

// ============ Session Management ============

export function completeSession(projectId: string, sessionNumber: number, summary: string): void {
  const project = getProject();
  if (!project || project.id !== projectId) return;
  if (!project.completedSessions.includes(sessionNumber)) {
    project.completedSessions.push(sessionNumber);
  }
  project.sessionSummaries[sessionNumber] = summary;
  project.currentSession = sessionNumber + 1;
  // Update health based on activity
  if (project.completedSessions.length >= 5) {
    project.healthScore = 'Thriving';
  } else if (project.completedSessions.length >= 2) {
    project.healthScore = 'Growing';
  }
  saveProject(project);
}

export function advanceSession(projectId: string): void {
  const project = getProject();
  if (!project || project.id !== projectId) return;
  project.currentSession = Math.min(project.currentSession + 1, 10);
  saveProject(project);
}

// ============ Partnerships Counter ============

export function getPartnershipsCount(): number {
  if (typeof window === "undefined") return 247;
  try {
    const count = localStorage.getItem(PARTNERSHIPS_COUNT_KEY);
    return count ? parseInt(count, 10) : 247; // Start with demo number
  } catch {
    return 247;
  }
}

export function incrementPartnershipsCount(): void {
  if (typeof window === "undefined") return;
  try {
    const current = getPartnershipsCount();
    localStorage.setItem(PARTNERSHIPS_COUNT_KEY, String(current + 1));
  } catch (error) {
    console.error("Failed to increment count:", error);
  }
}
