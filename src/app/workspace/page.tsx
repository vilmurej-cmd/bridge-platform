'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  FileText, CheckSquare, Lightbulb, Send, Plus, Trash2, X,
  ChevronRight, MessageSquare, Sparkles, ArrowRight, Clock,
} from 'lucide-react';
import type { ProjectData, ChatMessage, WorkspaceNote, WorkspaceMilestone, WorkspaceIdea } from '@/lib/demo-profile';
import {
  getProject, saveProject, addChatMessage, addNote, updateNote, deleteNote,
  toggleMilestone, addMilestone, addIdea, deleteIdea, completeSession,
} from '@/lib/storage';

// ============ Partner Avatar (inline for workspace) ============

function SmallAvatar({ size = 36 }: { size?: number }) {
  return (
    <div className="flex-shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <polygon points="60,5 105,30 105,90 60,115 15,90 15,30" fill="url(#avGrad)" stroke="rgba(139,92,246,0.3)" strokeWidth="2" />
        <circle cx="60" cy="45" r="12" fill="#7C3AED" opacity="0.8" />
        <polygon points="42,70 60,55 78,70" fill="#8B5CF6" opacity="0.7" />
        <rect x="45" y="75" width="30" height="8" rx="4" fill="#A78BFA" opacity="0.6" />
        <defs>
          <radialGradient id="avGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.1" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

// ============ Confetti Effect ============

function ConfettiEffect({ active }: { active: boolean }) {
  if (!active) return null;
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: 50 + (Math.random() - 0.5) * 60,
    color: ['#F59E0B', '#8B5CF6', '#FCD34D', '#A78BFA', '#FB7185'][i % 5],
    delay: Math.random() * 0.3,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map(p => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{ left: `${p.x}%`, top: '40%', backgroundColor: p.color }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{ y: 400, opacity: 0, rotate: p.rotation + 360, x: (Math.random() - 0.5) * 200 }}
          transition={{ duration: 1.5, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

// ============ Session Tracker Bar ============

function SessionTracker({
  project,
  onSessionClick,
}: {
  project: ProjectData;
  onSessionClick: (num: number) => void;
}) {
  const sessions = project.profile.tenSessions || project.profile.firstThreeSessions;
  const totalSessions = sessions.length;

  return (
    <div className="bg-white border-b border-border px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
          {sessions.map((s, i) => {
            const isCompleted = project.completedSessions.includes(s.session);
            const isCurrent = project.currentSession === s.session;
            return (
              <div key={s.session} className="flex items-center flex-shrink-0">
                <button
                  type="button"
                  onClick={() => onSessionClick(s.session)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-r from-bridge-gold to-bridge-violet text-white shadow-md'
                      : isCompleted
                      ? 'bg-bridge-gold/10 text-bridge-gold-dark'
                      : 'bg-gray-50 text-muted hover:bg-gray-100'
                  }`}
                  title={`Session ${s.session}: ${s.title}`}
                >
                  {isCompleted && <span>✓</span>}
                  <span className="hidden sm:inline">{s.title}</span>
                  <span className="sm:hidden">{s.session}</span>
                </button>
                {i < totalSessions - 1 && (
                  <div className={`w-4 h-0.5 flex-shrink-0 ${
                    isCompleted ? 'bg-bridge-gold' : 'bg-border'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-bridge-gold to-bridge-violet rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(project.completedSessions.length / totalSessions) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}

// ============ Notes Tab ============

function NotesPanel({ project, onUpdate }: { project: ProjectData; onUpdate: (p: ProjectData) => void }) {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editTitle, setEditTitle] = useState('');

  const handleCreate = () => {
    const note: WorkspaceNote = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      title: 'Untitled Note',
      content: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    addNote(project.id, note);
    const updated = { ...project, notes: [...project.notes, note] };
    onUpdate(updated);
    setActiveNote(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleSave = () => {
    if (!activeNote) return;
    updateNote(project.id, activeNote, { title: editTitle, content: editContent });
    const updated = {
      ...project,
      notes: project.notes.map(n =>
        n.id === activeNote ? { ...n, title: editTitle, content: editContent, updatedAt: Date.now() } : n
      ),
    };
    onUpdate(updated);
  };

  const handleDelete = (id: string) => {
    deleteNote(project.id, id);
    const updated = { ...project, notes: project.notes.filter(n => n.id !== id) };
    onUpdate(updated);
    if (activeNote === id) setActiveNote(null);
  };

  if (activeNote) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-2 p-3 border-b border-border">
          <button type="button" onClick={() => { handleSave(); setActiveNote(null); }} className="text-xs text-muted hover:text-primary">
            &larr; Back
          </button>
          <input
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onBlur={handleSave}
            className="flex-1 text-sm font-semibold text-primary bg-transparent border-none outline-none"
          />
        </div>
        <textarea
          value={editContent}
          onChange={e => setEditContent(e.target.value)}
          onBlur={handleSave}
          placeholder="Start writing..."
          className="flex-1 p-4 text-sm text-primary bg-transparent resize-none outline-none leading-relaxed"
        />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <button
        type="button"
        onClick={handleCreate}
        className="w-full flex items-center gap-2 p-3 rounded-xl border-2 border-dashed border-border hover:border-bridge-gold/40 text-muted hover:text-bridge-gold transition-all text-sm"
      >
        <Plus size={16} /> New Note
      </button>
      {project.notes.map(note => (
        <div
          key={note.id}
          className="flex items-center gap-3 p-3 rounded-xl bg-white border border-border hover:shadow-sm transition-all cursor-pointer group"
          onClick={() => { setActiveNote(note.id); setEditTitle(note.title); setEditContent(note.content); }}
        >
          <FileText size={16} className="text-bridge-gold flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-primary truncate">{note.title}</p>
            <p className="text-xs text-muted truncate">{note.content || 'Empty note'}</p>
          </div>
          <button
            type="button"
            onClick={e => { e.stopPropagation(); handleDelete(note.id); }}
            className="opacity-0 group-hover:opacity-100 text-muted hover:text-bridge-rose transition-all"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      {project.notes.length === 0 && (
        <p className="text-center text-sm text-muted py-8">No notes yet. Create one to start documenting your journey.</p>
      )}
    </div>
  );
}

// ============ Milestones Tab ============

function MilestonesPanel({ project, onUpdate }: { project: ProjectData; onUpdate: (p: ProjectData) => void }) {
  const [newMilestone, setNewMilestone] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleToggle = (id: string) => {
    const milestone = project.milestones.find(m => m.id === id);
    if (milestone && !milestone.completed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
    toggleMilestone(project.id, id);
    const updated = {
      ...project,
      milestones: project.milestones.map(m => m.id === id ? { ...m, completed: !m.completed } : m),
    };
    onUpdate(updated);
  };

  const handleAdd = () => {
    if (!newMilestone.trim()) return;
    const milestone: WorkspaceMilestone = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      text: newMilestone,
      completed: false,
      sessionNumber: project.currentSession,
    };
    addMilestone(project.id, milestone);
    const updated = { ...project, milestones: [...project.milestones, milestone] };
    onUpdate(updated);
    setNewMilestone('');
  };

  const completed = project.milestones.filter(m => m.completed).length;
  const total = project.milestones.length;

  return (
    <>
      <ConfettiEffect active={showConfetti} />
      <div className="p-4 space-y-3">
        {/* Progress */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-bridge-gold rounded-full"
              animate={{ width: total > 0 ? `${(completed / total) * 100}%` : '0%' }}
            />
          </div>
          <span className="text-xs text-muted font-medium">{completed}/{total}</span>
        </div>

        {/* Add milestone */}
        <div className="flex gap-2">
          <input
            value={newMilestone}
            onChange={e => setNewMilestone(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Add a milestone..."
            className="flex-1 text-sm px-3 py-2 rounded-xl border border-border bg-white outline-none focus:ring-2 focus:ring-bridge-gold/30"
          />
          <button type="button" onClick={handleAdd} className="px-3 py-2 bg-bridge-gold text-white rounded-xl text-sm hover:bg-bridge-gold-dark transition-colors">
            <Plus size={16} />
          </button>
        </div>

        {/* Milestones list */}
        {project.milestones.map(m => (
          <motion.div
            key={m.id}
            layout
            className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
              m.completed ? 'bg-bridge-gold/5 border-bridge-gold/20' : 'bg-white border-border'
            }`}
          >
            <button
              type="button"
              onClick={() => handleToggle(m.id)}
              className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-all ${
                m.completed ? 'bg-bridge-gold border-bridge-gold text-white' : 'border-border hover:border-bridge-gold/50'
              }`}
            >
              {m.completed && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              )}
            </button>
            <span className={`text-sm flex-1 ${m.completed ? 'text-muted line-through' : 'text-primary'}`}>
              {m.text}
            </span>
            <span className="text-xs text-muted">S{m.sessionNumber}</span>
          </motion.div>
        ))}

        {project.milestones.length === 0 && (
          <p className="text-center text-sm text-muted py-8">No milestones yet. Add your first deliverable.</p>
        )}
      </div>
    </>
  );
}

// ============ Ideas Tab ============

function IdeasPanel({ project, onUpdate }: { project: ProjectData; onUpdate: (p: ProjectData) => void }) {
  const [newIdea, setNewIdea] = useState('');
  const colors = ['#FEF3C7', '#EDE9FE', '#FCE7F3', '#DBEAFE', '#D1FAE5', '#FEE2E2'];

  const handleAdd = () => {
    if (!newIdea.trim()) return;
    const idea: WorkspaceIdea = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      text: newIdea,
      color: colors[Math.floor(Math.random() * colors.length)],
      createdAt: Date.now(),
    };
    addIdea(project.id, idea);
    const updated = { ...project, ideas: [...project.ideas, idea] };
    onUpdate(updated);
    setNewIdea('');
  };

  const handleDelete = (id: string) => {
    deleteIdea(project.id, id);
    const updated = { ...project, ideas: project.ideas.filter(i => i.id !== id) };
    onUpdate(updated);
  };

  return (
    <div className="p-4 space-y-3">
      <div className="flex gap-2">
        <input
          value={newIdea}
          onChange={e => setNewIdea(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="Quick idea..."
          className="flex-1 text-sm px-3 py-2 rounded-xl border border-border bg-white outline-none focus:ring-2 focus:ring-bridge-violet/30"
        />
        <button type="button" onClick={handleAdd} className="px-3 py-2 bg-bridge-violet text-white rounded-xl text-sm hover:opacity-90 transition-colors">
          <Lightbulb size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {project.ideas.map(idea => (
          <motion.div
            key={idea.id}
            layout
            className="relative p-3 rounded-xl text-xs text-primary shadow-sm group"
            style={{ backgroundColor: idea.color }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {idea.text}
            <button
              type="button"
              onClick={() => handleDelete(idea.id)}
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-muted hover:text-bridge-rose transition-all"
            >
              <X size={12} />
            </button>
          </motion.div>
        ))}
      </div>

      {project.ideas.length === 0 && (
        <p className="text-center text-sm text-muted py-8">Brainstorm board — pin quick ideas here.</p>
      )}
    </div>
  );
}

// ============ Chat Panel ============

function ChatPanel({ project, onUpdate }: { project: ProjectData; onUpdate: (p: ProjectData) => void }) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [project.chatHistory.length]);

  // Send initial greeting if chat is empty
  useEffect(() => {
    if (project.chatHistory.length === 0) {
      const sessions = project.profile.tenSessions || project.profile.firstThreeSessions;
      const currentSessionData = sessions.find(s => s.session === project.currentSession);
      const greeting: ChatMessage = {
        id: Date.now().toString(36),
        role: 'assistant',
        content: `Welcome to Session ${project.currentSession}: ${currentSessionData?.title || 'Getting Started'}! 🎉\n\nI'm ${project.profile.partnerName}, and I'm thrilled to be your partner on ${project.profile.projectName}. ${currentSessionData ? `Today we're focused on: ${currentSessionData.focus}` : "Let's build something amazing together."}\n\nWhere would you like to start?`,
        timestamp: Date.now(),
      };
      const updated = { ...project, chatHistory: [greeting] };
      saveProject(updated);
      onUpdate(updated);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(36) + 'u',
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    const updatedWithUser = {
      ...project,
      chatHistory: [...project.chatHistory, userMsg],
    };
    addChatMessage(project.id, userMsg);
    onUpdate(updatedWithUser);
    setInput('');
    setIsTyping(true);

    try {
      const sessions = project.profile.tenSessions || project.profile.firstThreeSessions;
      const currentSessionData = sessions.find(s => s.session === project.currentSession);
      const completedMilestones = project.milestones.filter(m => m.completed).length;

      const res = await fetch('/api/partner/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input.trim(),
          partnerName: project.profile.partnerName,
          partnerStyle: project.profile.partnerStyle,
          partnerPersonality: project.profile.partnerProfile.aiPersonality,
          projectName: project.profile.projectName,
          dreamSummary: project.profile.dreamSummary,
          currentSession: project.currentSession,
          sessionTitle: currentSessionData?.title || 'Session',
          sessionFocus: currentSessionData?.focus || '',
          completedMilestones,
          totalMilestones: project.milestones.length,
          humanStrengths: project.assessmentData.strengths.join(', '),
          chatHistory: project.chatHistory.slice(-18).map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: Date.now().toString(36) + 'a',
        role: 'assistant',
        content: data.message || "Let me think about that...",
        timestamp: Date.now(),
      };

      addChatMessage(project.id, assistantMsg);
      const updatedWithAssistant = {
        ...project,
        chatHistory: [...updatedWithUser.chatHistory, assistantMsg],
      };
      onUpdate(updatedWithAssistant);
    } catch {
      const errorMsg: ChatMessage = {
        id: Date.now().toString(36) + 'e',
        role: 'assistant',
        content: "I had a brief connection issue. Could you say that again?",
        timestamp: Date.now(),
      };
      addChatMessage(project.id, errorMsg);
      const updatedWithError = {
        ...project,
        chatHistory: [...updatedWithUser.chatHistory, errorMsg],
      };
      onUpdate(updatedWithError);
    } finally {
      setIsTyping(false);
    }
  };

  const quickActions = [
    { label: 'What should I work on?', icon: ArrowRight },
    { label: 'Review my progress', icon: CheckSquare },
    { label: "I'm stuck", icon: Sparkles },
    { label: "Let's brainstorm", icon: Lightbulb },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center gap-3 p-4 border-b border-border bg-gradient-to-r from-violet-50 to-purple-50">
        <SmallAvatar size={36} />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-primary">{project.profile.partnerName}</h3>
          <p className="text-xs text-bridge-violet">
            {project.profile.partnerStyle} Partner
            {project.healthScore === 'Thriving' ? ' · 🌟 Thriving' :
             project.healthScore === 'Growing' ? ' · 🌱 Growing' : ''}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {project.chatHistory.map(msg => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {msg.role === 'assistant' && <SmallAvatar size={28} />}
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-bridge-gold text-white rounded-br-md'
                : 'bg-white border border-border text-primary rounded-bl-md'
            }`}>
              {msg.content.split('\n').map((line, i) => (
                <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
              ))}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <SmallAvatar size={28} />
            <div className="bg-white border border-border rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <motion.div className="w-2 h-2 bg-bridge-violet rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
                <motion.div className="w-2 h-2 bg-bridge-violet rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                <motion.div className="w-2 h-2 bg-bridge-violet rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEnd} />
      </div>

      {/* Quick actions */}
      <div className="flex gap-2 px-4 py-2 overflow-x-auto scrollbar-hide">
        {quickActions.map(action => (
          <button
            key={action.label}
            type="button"
            onClick={() => { setInput(action.label); }}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-bridge-violet bg-violet-50 border border-bridge-violet/20 rounded-full hover:bg-violet-100 transition-colors"
          >
            <action.icon size={12} />
            {action.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border bg-white">
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder={`Message ${project.profile.partnerName}...`}
            rows={1}
            className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-border bg-gray-50 outline-none focus:ring-2 focus:ring-bridge-violet/30 resize-none max-h-32"
            style={{ minHeight: '40px' }}
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className="p-2.5 bg-bridge-violet text-white rounded-xl hover:opacity-90 transition-all disabled:opacity-40"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ Daily Check-In Modal ============

function DailyCheckIn({ partnerName, onClose }: { partnerName: string; onClose: () => void }) {
  const messages = [
    `Hey! ${partnerName} here. Ready to make some magic today? Your dream is closer than you think.`,
    `Good to see you! Let's pick up where we left off and keep building momentum.`,
    `Welcome back, partner! Every session brings us one step closer to launch day.`,
    `${partnerName} checking in — your consistency is what separates dreamers from builders. Let's go!`,
  ];
  const msg = messages[Math.floor(Math.random() * messages.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 max-w-sm bg-white rounded-2xl shadow-xl border border-bridge-violet/20 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-violet-50 to-purple-50 px-5 py-3 flex items-center gap-3">
        <SmallAvatar size={28} />
        <span className="text-sm font-semibold text-primary">{partnerName}</span>
        <button type="button" onClick={onClose} className="ml-auto text-muted hover:text-primary">
          <X size={16} />
        </button>
      </div>
      <div className="px-5 py-4">
        <p className="text-sm text-secondary leading-relaxed">{msg}</p>
      </div>
    </motion.div>
  );
}

// ============ Session Summary Modal ============

function SessionSummaryModal({
  sessionNumber,
  project,
  onContinue,
  onBreak,
}: {
  sessionNumber: number;
  project: ProjectData;
  onContinue: () => void;
  onBreak: () => void;
}) {
  const sessions = project.profile.tenSessions || project.profile.firstThreeSessions;
  const nextSession = sessions.find(s => s.session === sessionNumber + 1);
  const completedMilestones = project.milestones.filter(m => m.sessionNumber === sessionNumber && m.completed);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        <div className="text-center mb-6">
          <span className="text-4xl">🎉</span>
          <h2 className="font-serif text-2xl font-bold text-primary mt-3">Session {sessionNumber} Complete!</h2>
        </div>

        {completedMilestones.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-secondary mb-2">Completed:</h3>
            <ul className="space-y-1">
              {completedMilestones.map(m => (
                <li key={m.id} className="text-sm text-bridge-gold-dark flex items-center gap-2">
                  <span>✓</span> {m.text}
                </li>
              ))}
            </ul>
          </div>
        )}

        {nextSession && (
          <div className="bg-violet-50 rounded-xl p-4 mb-6">
            <p className="text-xs text-muted uppercase tracking-wide font-medium">Up Next</p>
            <p className="text-sm font-semibold text-primary mt-1">Session {nextSession.session}: {nextSession.title}</p>
            <p className="text-xs text-secondary mt-1">{nextSession.focus}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onContinue}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-bridge-gold to-bridge-violet text-white rounded-xl font-medium text-sm hover:opacity-90 transition-all"
          >
            Continue to Session {sessionNumber + 1}
          </button>
          <button
            type="button"
            onClick={onBreak}
            className="px-4 py-3 border border-border rounded-xl text-sm text-secondary hover:bg-gray-50 transition-all"
          >
            Take a Break
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============ Main Workspace Page ============

type Tab = 'notes' | 'milestones' | 'ideas';

export default function WorkspacePage() {
  const router = useRouter();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('milestones');
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showSessionSummary, setShowSessionSummary] = useState<number | null>(null);
  const [mobileView, setMobileView] = useState<'workspace' | 'chat'>('workspace');

  useEffect(() => {
    const p = getProject();
    if (!p) {
      router.push('/assess');
      return;
    }
    setProject(p);

    // Daily check-in — show once per day
    const lastCheckIn = localStorage.getItem('bridge-last-checkin');
    const today = new Date().toDateString();
    if (lastCheckIn !== today) {
      setTimeout(() => setShowCheckIn(true), 1500);
      localStorage.setItem('bridge-last-checkin', today);
    }
  }, [router]);

  const handleProjectUpdate = useCallback((updated: ProjectData) => {
    setProject(updated);
    saveProject(updated);
  }, []);

  const handleEndSession = () => {
    if (!project) return;
    const sessionNum = project.currentSession;
    const summary = `Completed session ${sessionNum} milestones`;
    completeSession(project.id, sessionNum, summary);
    setShowSessionSummary(sessionNum);
    const updated = getProject();
    if (updated) setProject(updated);
  };

  const handleContinueSession = () => {
    setShowSessionSummary(null);
    const updated = getProject();
    if (updated) setProject(updated);
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-bridge-violet/20 animate-pulse mx-auto mb-4" />
          <p className="text-secondary">Loading workspace...</p>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: typeof FileText }[] = [
    { key: 'notes', label: 'Notes', icon: FileText },
    { key: 'milestones', label: 'Milestones', icon: CheckSquare },
    { key: 'ideas', label: 'Ideas', icon: Lightbulb },
  ];

  return (
    <>
      {/* Daily Check-In */}
      <AnimatePresence>
        {showCheckIn && (
          <DailyCheckIn
            partnerName={project.profile.partnerName}
            onClose={() => setShowCheckIn(false)}
          />
        )}
      </AnimatePresence>

      {/* Session Summary Modal */}
      {showSessionSummary !== null && (
        <SessionSummaryModal
          sessionNumber={showSessionSummary}
          project={project}
          onContinue={handleContinueSession}
          onBreak={() => { setShowSessionSummary(null); router.push('/'); }}
        />
      )}

      <div className="h-screen flex flex-col bg-cream">
        {/* Session Tracker */}
        <SessionTracker
          project={project}
          onSessionClick={(num) => {
            if (project.completedSessions.includes(num)) {
              // Show summary for completed sessions
            }
          }}
        />

        {/* Mobile toggle */}
        <div className="md:hidden flex border-b border-border bg-white">
          <button
            type="button"
            onClick={() => setMobileView('workspace')}
            className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
              mobileView === 'workspace' ? 'text-bridge-gold border-b-2 border-bridge-gold' : 'text-muted'
            }`}
          >
            Workspace
          </button>
          <button
            type="button"
            onClick={() => setMobileView('chat')}
            className={`flex-1 py-3 text-sm font-medium text-center transition-colors flex items-center justify-center gap-2 ${
              mobileView === 'chat' ? 'text-bridge-violet border-b-2 border-bridge-violet' : 'text-muted'
            }`}
          >
            <MessageSquare size={14} />
            Chat with {project.profile.partnerName}
          </button>
        </div>

        {/* Main workspace layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left panel: Project workspace (60%) */}
          <div className={`${mobileView === 'workspace' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-3/5 border-r border-border bg-cream`}>
            {/* Project header */}
            <div className="px-4 py-3 border-b border-border bg-white flex items-center justify-between">
              <div>
                <h1 className="text-sm font-bold text-primary">{project.profile.projectName}</h1>
                <p className="text-xs text-muted">
                  Session {project.currentSession} · {
                    (project.profile.tenSessions || project.profile.firstThreeSessions)
                      .find(s => s.session === project.currentSession)?.title || 'In Progress'
                  }
                </p>
              </div>
              <button
                type="button"
                onClick={handleEndSession}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-bridge-gold/10 text-bridge-gold-dark rounded-full hover:bg-bridge-gold/20 transition-colors"
              >
                <Clock size={12} />
                End Session
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border bg-white">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'text-bridge-gold border-b-2 border-bridge-gold'
                      : 'text-muted hover:text-primary'
                  }`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'notes' && <NotesPanel project={project} onUpdate={handleProjectUpdate} />}
              {activeTab === 'milestones' && <MilestonesPanel project={project} onUpdate={handleProjectUpdate} />}
              {activeTab === 'ideas' && <IdeasPanel project={project} onUpdate={handleProjectUpdate} />}
            </div>
          </div>

          {/* Right panel: AI Partner Chat (40%) */}
          <div className={`${mobileView === 'chat' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-2/5 bg-white`}>
            <ChatPanel project={project} onUpdate={handleProjectUpdate} />
          </div>
        </div>
      </div>
    </>
  );
}
