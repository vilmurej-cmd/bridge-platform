'use client';

import { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import type { BridgeProfile } from '@/lib/demo-profile';
import { saveProfile, createProject } from '@/lib/storage';

// ============ Constants ============

const PLACEHOLDERS = [
  'I want to build an app that helps elderly people stay connected...',
  'I\'ve always dreamed of creating a platform that teaches kids to code through music...',
  'My community needs a tool that helps small farmers access fair markets...',
  'I want to write a book about my grandmother\'s journey from Vietnam...',
  'I dream of building a sustainable fashion marketplace...',
];

const STRENGTHS = [
  { emoji: '🎨', name: 'Creativity', description: 'I see possibilities others miss', category: 'creative' },
  { emoji: '🧠', name: 'Domain Expertise', description: 'I know my field deeply', category: 'knowledge' },
  { emoji: '💪', name: 'Persistence', description: 'I don\'t quit', category: 'drive' },
  { emoji: '👁️', name: 'Vision', description: 'I see the big picture', category: 'strategic' },
  { emoji: '🤝', name: 'Communication', description: 'I connect with people', category: 'social' },
  { emoji: '📊', name: 'Analysis', description: 'I think in systems', category: 'analytical' },
  { emoji: '⚡', name: 'Execution', description: 'I get things done', category: 'drive' },
  { emoji: '❤️', name: 'Empathy', description: 'I understand what people need', category: 'social' },
];

const AI_COMPLEMENTS: Record<string, string[]> = {
  'Creativity': ['Technical Precision', 'Data Analysis', 'System Design'],
  'Domain Expertise': ['Rapid Prototyping', 'Cross-Domain Research', 'Pattern Recognition'],
  'Persistence': ['Strategic Planning', 'Efficiency Optimization', 'Progress Tracking'],
  'Vision': ['Detail Execution', 'Technical Architecture', 'Project Management'],
  'Communication': ['Code Generation', 'Data Visualization', 'Technical Writing'],
  'Analysis': ['Creative Ideation', 'User Experience Design', 'Storytelling'],
  'Execution': ['Research & Discovery', 'Quality Assurance', 'Documentation'],
  'Empathy': ['Logic & Structure', 'Scalability Design', 'Performance Optimization'],
};

const WORKING_STYLES = [
  { emoji: '🌅', label: 'Early bird', description: 'I work best in the morning', icon: 'sun' },
  { emoji: '🌙', label: 'Night owl', description: 'My best ideas come late', icon: 'moon' },
  { emoji: '📋', label: 'Structured', description: 'I like plans and checklists', icon: 'list' },
  { emoji: '🌊', label: 'Fluid', description: 'I go where inspiration takes me', icon: 'wave' },
  { emoji: '🏃', label: 'Sprint', description: 'Intense bursts of work', icon: 'sprint' },
  { emoji: '🐢', label: 'Marathon', description: 'Steady consistent progress', icon: 'steady' },
];

const COMMITMENT_LEVELS = [
  { emoji: '🌊', label: '30 min/week', description: 'Testing the waters', intensity: 1 },
  { emoji: '🌱', label: '2-3 hours/week', description: 'Building momentum', intensity: 2 },
  { emoji: '🔥', label: '5-10 hours/week', description: 'Serious builder', intensity: 3 },
  { emoji: '🚀', label: '10+ hours/week', description: 'All in', intensity: 4 },
];

const LOADING_MESSAGES = [
  'Reading your dream...',
  'Mapping your strengths...',
  'Finding your perfect partner...',
  'Designing your roadmap...',
  'Preparing the reveal...',
];

// ============ Sub-components ============

function SparkEffect({ active }: { active: boolean }) {
  const [sparks, setSparks] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    if (!active) { setSparks([]); return; }
    const newSparks = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 2,
    }));
    setSparks(newSparks);
  }, [active]);

  if (!active || sparks.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {sparks.map(spark => (
        <motion.div
          key={spark.id}
          className="absolute rounded-full bg-bridge-gold"
          style={{
            width: spark.size,
            height: spark.size,
            left: `${spark.x}%`,
            top: `${spark.y}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: spark.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function FlipStrengthCard({
  emoji,
  name,
  description,
  selected,
  onToggle,
}: {
  emoji: string;
  name: string;
  description: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className="perspective-[1000px] w-full"
    >
      <motion.div
        className="relative w-full"
        animate={{ rotateY: selected ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className={`rounded-2xl p-5 border-2 transition-all duration-200 ${
            selected
              ? 'border-bridge-gold shadow-[0_0_20px_rgba(245,158,11,0.3)] opacity-0'
              : 'border-border bg-white hover:shadow-md hover:border-bridge-gold/30'
          }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="text-3xl block mb-2">{emoji}</span>
          <h3 className="font-semibold text-primary text-sm">{name}</h3>
          <p className="text-muted text-xs mt-1">{description}</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl p-5 border-2 border-bridge-gold bg-gradient-to-br from-amber-50 to-orange-50 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl">{emoji}</span>
            <div className="w-6 h-6 rounded-full bg-bridge-gold flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <h3 className="font-bold text-bridge-gold-dark text-sm">{name}</h3>
          <p className="text-amber-700/70 text-xs mt-1">{description}</p>
        </div>
      </motion.div>
    </button>
  );
}

function PartnerPreview({ selectedStrengths }: { selectedStrengths: string[] }) {
  const complements = selectedStrengths.flatMap(s => AI_COMPLEMENTS[s] || []);
  const unique = [...new Set(complements)].slice(0, 6);

  if (selectedStrengths.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="mt-8 p-6 rounded-2xl border-2 border-bridge-violet/30 bg-gradient-to-br from-violet-50 to-purple-50"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-bridge-violet animate-pulse" />
        <h3 className="font-serif text-sm font-semibold text-bridge-violet">Your AI Partner Will Bring</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {unique.map(c => (
          <motion.span
            key={c}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-purple-700 bg-white/80 border border-bridge-violet/20 rounded-full shadow-sm"
          >
            {c}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

function WorkingStyleCard({
  emoji,
  label,
  description,
  selected,
  onSelect,
}: {
  emoji: string;
  label: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative w-full text-left rounded-2xl p-5 border-2 transition-all duration-300 ${
        selected
          ? 'border-bridge-gold bg-gradient-to-br from-amber-50 to-orange-50 shadow-[0_0_15px_rgba(245,158,11,0.2)] scale-[1.02]'
          : 'border-border bg-white hover:shadow-md hover:border-bridge-gold/30'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{emoji}</span>
        <div>
          <h3 className="font-semibold text-primary text-sm">{label}</h3>
          <p className="text-muted text-xs mt-0.5">{description}</p>
        </div>
      </div>
      {selected && (
        <motion.div
          layoutId="style-check"
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-bridge-gold flex items-center justify-center"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>
      )}
    </button>
  );
}

function CommitmentScale({
  levels,
  selected,
  onSelect,
}: {
  levels: typeof COMMITMENT_LEVELS;
  selected: string;
  onSelect: (label: string) => void;
}) {
  return (
    <div className="space-y-3">
      {levels.map(level => {
        const isSelected = selected === level.label;
        return (
          <button
            key={level.label}
            type="button"
            onClick={() => onSelect(level.label)}
            className={`relative w-full text-left rounded-2xl p-5 border-2 transition-all duration-300 overflow-hidden ${
              isSelected
                ? 'border-bridge-gold bg-gradient-to-r from-amber-50 to-orange-50 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                : 'border-border bg-white hover:shadow-md hover:border-bridge-gold/30'
            }`}
          >
            {/* Intensity bar */}
            <div
              className={`absolute left-0 top-0 bottom-0 transition-all duration-500 ${
                isSelected ? 'bg-bridge-gold/10' : 'bg-transparent'
              }`}
              style={{ width: `${level.intensity * 25}%` }}
            />
            <div className="relative flex items-center gap-3">
              <span className="text-2xl">{level.emoji}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-primary text-sm">{level.label}</h3>
                <p className="text-muted text-xs mt-0.5">{level.description}</p>
              </div>
              {/* Intensity dots */}
              <div className="flex gap-1">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i <= level.intensity
                        ? isSelected ? 'bg-bridge-gold' : 'bg-bridge-gold/40'
                        : 'bg-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function MatchRevealAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'dark' | 'spiral' | 'merge' | 'done'>('dark');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('spiral'), 500);
    const t2 = setTimeout(() => setPhase('merge'), 2500);
    const t3 = setTimeout(() => { setPhase('done'); onComplete(); }, 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Gold light (human) */}
      <motion.div
        className="absolute w-16 h-16 rounded-full"
        style={{ background: 'radial-gradient(circle, #FCD34D, #F59E0B, transparent)' }}
        animate={
          phase === 'dark' ? { x: -120, y: 0, scale: 0.5, opacity: 0 } :
          phase === 'spiral' ? {
            x: [-100, 0, 100, 0, -60, 0, 40, 0],
            y: [0, -80, 0, 80, 0, -40, 0, 20],
            scale: [0.6, 0.8, 0.6, 0.8, 0.7, 0.9, 0.8, 1],
            opacity: 1,
          } :
          { x: 0, y: 0, scale: 2.5, opacity: 0.3 }
        }
        transition={
          phase === 'spiral' ? { duration: 2, ease: 'easeInOut' } :
          { duration: 1.5, ease: 'easeOut' }
        }
      />

      {/* Violet light (AI) */}
      <motion.div
        className="absolute w-16 h-16 rounded-full"
        style={{ background: 'radial-gradient(circle, #A78BFA, #8B5CF6, transparent)' }}
        animate={
          phase === 'dark' ? { x: 120, y: 0, scale: 0.5, opacity: 0 } :
          phase === 'spiral' ? {
            x: [100, 0, -100, 0, 60, 0, -40, 0],
            y: [0, 80, 0, -80, 0, 40, 0, -20],
            scale: [0.6, 0.8, 0.6, 0.8, 0.7, 0.9, 0.8, 1],
            opacity: 1,
          } :
          { x: 0, y: 0, scale: 2.5, opacity: 0.3 }
        }
        transition={
          phase === 'spiral' ? { duration: 2, ease: 'easeInOut' } :
          { duration: 1.5, ease: 'easeOut' }
        }
      />

      {/* Center merge flash */}
      {phase === 'merge' && (
        <motion.div
          className="absolute w-4 h-4 rounded-full bg-white"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 40, opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      )}

      {/* Loading text */}
      <motion.div
        className="absolute bottom-20 text-center"
        animate={{ opacity: phase === 'done' ? 0 : 1 }}
      >
        <LoadingText />
      </motion.div>
    </motion.div>
  );
}

function LoadingText() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIdx(p => (p + 1) % LOADING_MESSAGES.length), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={idx}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="font-serif text-lg text-white/60"
      >
        {LOADING_MESSAGES[idx]}
      </motion.p>
    </AnimatePresence>
  );
}

// ============ Radar Chart ============

function RadarChart({ humanStrengths, profile }: { humanStrengths: string[]; profile: BridgeProfile }) {
  const categories = ['Creativity', 'Technical', 'Strategy', 'Communication', 'Research', 'Execution', 'Analysis', 'Empathy'];
  const strengthMap: Record<string, string[]> = {
    Creativity: ['Creativity'],
    Technical: ['Domain Expertise'],
    Strategy: ['Vision'],
    Communication: ['Communication'],
    Research: ['Analysis'],
    Execution: ['Execution', 'Persistence'],
    Analysis: ['Analysis'],
    Empathy: ['Empathy'],
  };

  const humanScores = categories.map(cat => {
    const related = strengthMap[cat] || [];
    return related.some(r => humanStrengths.includes(r)) ? 0.8 + Math.random() * 0.2 : 0.2 + Math.random() * 0.3;
  });

  const aiScores = categories.map((_, i) => {
    // AI complements — strong where human is weak
    return humanScores[i] > 0.6 ? 0.3 + Math.random() * 0.3 : 0.7 + Math.random() * 0.3;
  });

  const cx = 150, cy = 150, r = 110;
  const angleStep = (2 * Math.PI) / categories.length;

  const toPoint = (angle: number, value: number) => ({
    x: cx + r * value * Math.cos(angle - Math.PI / 2),
    y: cy + r * value * Math.sin(angle - Math.PI / 2),
  });

  const humanPath = categories.map((_, i) => {
    const p = toPoint(i * angleStep, humanScores[i]);
    return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
  }).join(' ') + ' Z';

  const aiPath = categories.map((_, i) => {
    const p = toPoint(i * angleStep, aiScores[i]);
    return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
  }).join(' ') + ' Z';

  return (
    <div className="relative max-w-[320px] mx-auto">
      <svg viewBox="0 0 300 300" className="w-full">
        {/* Grid rings */}
        {[0.25, 0.5, 0.75, 1].map(level => (
          <polygon
            key={level}
            points={categories.map((_, i) => {
              const p = toPoint(i * angleStep, level);
              return `${p.x},${p.y}`;
            }).join(' ')}
            fill="none"
            stroke="#E7E5E4"
            strokeWidth="0.5"
          />
        ))}

        {/* Axis lines */}
        {categories.map((_, i) => {
          const p = toPoint(i * angleStep, 1);
          return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#E7E5E4" strokeWidth="0.5" />;
        })}

        {/* AI area (violet) */}
        <motion.path
          d={aiPath}
          fill="rgba(139, 92, 246, 0.15)"
          stroke="#8B5CF6"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Human area (gold) */}
        <motion.path
          d={humanPath}
          fill="rgba(245, 158, 11, 0.15)"
          stroke="#F59E0B"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Labels */}
        {categories.map((cat, i) => {
          const p = toPoint(i * angleStep, 1.2);
          return (
            <text
              key={cat}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-secondary text-[9px] font-sans"
            >
              {cat}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-bridge-gold" />
          <span className="text-xs text-secondary">You</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-bridge-violet" />
          <span className="text-xs text-secondary">{profile.partnerName}</span>
        </div>
      </div>
    </div>
  );
}

// ============ Partner Avatar ============

function PartnerAvatar({ traits, size = 120 }: { traits: string[]; size?: number }) {
  // Generate geometric avatar from traits
  const traitColors = {
    Analytical: '#7C3AED',
    Patient: '#8B5CF6',
    Creative: '#A78BFA',
    Precise: '#6D28D9',
    Enthusiastic: '#C084FC',
    Wise: '#7C3AED',
    Strategic: '#6D28D9',
    Imaginative: '#A78BFA',
  };

  const colors = traits.map(t => (traitColors as Record<string, string>)[t] || '#8B5CF6');

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Background hexagon */}
        <motion.polygon
          points="60,5 105,30 105,90 60,115 15,90 15,30"
          fill="url(#avatarGrad)"
          stroke="rgba(139,92,246,0.3)"
          strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ transformOrigin: '60px 60px' }}
        />

        {/* Inner shapes based on traits */}
        <motion.circle
          cx="60" cy="45" r="12"
          fill={colors[0] || '#7C3AED'}
          opacity="0.8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        />
        <motion.polygon
          points="42,70 60,55 78,70"
          fill={colors[1] || '#8B5CF6'}
          opacity="0.7"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          style={{ transformOrigin: '60px 65px' }}
        />
        <motion.rect
          x="45" y="75" width="30" height="8" rx="4"
          fill={colors[2] || '#A78BFA'}
          opacity="0.6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          style={{ transformOrigin: '60px 79px' }}
        />

        {/* Glow effect */}
        <defs>
          <radialGradient id="avatarGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.1" />
          </radialGradient>
        </defs>
      </svg>

      {/* Pulsing glow ring */}
      <div className="absolute inset-0 rounded-full animate-gentle-pulse" style={{
        background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
      }} />
    </div>
  );
}

// ============ Session Roadmap (10 sessions) ============

function SessionTimeline({ sessions, profile }: { sessions: BridgeProfile['tenSessions']; profile: BridgeProfile }) {
  return (
    <div className="space-y-0">
      {sessions.map((session, i) => (
        <motion.div
          key={session.session}
          className="relative flex gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
        >
          {/* Timeline connector */}
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              i === 0 ? 'bg-bridge-gold text-white' :
              i === sessions.length - 1 ? 'bg-bridge-violet text-white' :
              'bg-white border-2 border-border text-secondary'
            }`}>
              {session.session}
            </div>
            {i < sessions.length - 1 && (
              <div className="w-0.5 h-full min-h-[40px] bg-border" />
            )}
          </div>

          {/* Content */}
          <div className="pb-6 flex-1">
            <h4 className="font-semibold text-primary text-sm">{session.title}</h4>
            <p className="text-muted text-xs mt-1">{session.focus}</p>
            <p className="text-xs text-bridge-gold-dark mt-1 font-medium">
              Deliverable: {session.deliverable}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ============ Partnership Agreement ============

function PartnershipAgreement({
  profile,
  strengths,
  onSign,
}: {
  profile: BridgeProfile;
  strengths: string[];
  onSign: () => void;
}) {
  const [signed, setSigned] = useState(false);

  const handleSign = () => {
    setSigned(true);
    setTimeout(onSign, 1500);
  };

  return (
    <motion.div
      className="bg-white rounded-3xl p-8 md:p-12 border border-border shadow-lg max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-center mb-8">
        <h3 className="font-serif text-2xl font-bold text-primary">Partnership Agreement</h3>
        <div className="w-16 h-0.5 bg-gradient-to-r from-bridge-gold to-bridge-violet mx-auto mt-3" />
      </div>

      <div className="space-y-4 text-secondary text-sm leading-relaxed">
        <p>
          I bring <span className="font-semibold text-bridge-gold-dark">{strengths.join(', ')}</span>.
        </p>
        <p>
          My partner <span className="font-semibold text-bridge-violet">{profile.partnerName}</span> brings{' '}
          <span className="font-semibold text-bridge-violet">{profile.partnerProfile.strengthComplement.split('.')[0]}</span>.
        </p>
        <p>
          Together, we commit to building{' '}
          <span className="font-semibold text-primary">{profile.projectName}</span> — {profile.dreamSummary.split('.')[0]}.
        </p>
        <p className="font-serif italic text-primary text-base pt-2">
          Our first session begins now.
        </p>
      </div>

      <div className="mt-8 text-center">
        {!signed ? (
          <button
            type="button"
            onClick={handleSign}
            className="inline-flex items-center px-10 py-4 text-base font-semibold text-white bg-gradient-to-r from-bridge-gold to-bridge-violet hover:opacity-90 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Sign &amp; Begin
            <span className="ml-2">✍️</span>
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-4"
          >
            <motion.div
              className="font-serif text-3xl text-bridge-gold italic"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              Signed ✓
            </motion.div>
            <p className="text-muted text-sm mt-2">Partnership activated</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ============ The Full Profile Reveal ============

function ProfileReveal({
  profile,
  strengths,
  onEnterWorkspace,
  onReset,
}: {
  profile: BridgeProfile;
  strengths: string[];
  onEnterWorkspace: () => void;
  onReset: () => void;
}) {
  const [section, setSection] = useState(0);

  useEffect(() => {
    // Auto-advance sections for dramatic reveal
    const timers = [
      setTimeout(() => setSection(1), 800),
      setTimeout(() => setSection(2), 1600),
      setTimeout(() => setSection(3), 2400),
      setTimeout(() => setSection(4), 3200),
      setTimeout(() => setSection(5), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* 2A: Partner Identity */}
      <AnimatePresence>
        {section >= 0 && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <PartnerAvatar traits={profile.partnerTraits || ['Analytical', 'Creative', 'Patient', 'Precise']} size={140} />
            </div>

            <motion.h2
              className="font-serif text-lg text-bridge-violet font-medium mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Meet your partner
            </motion.h2>

            <motion.h1
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {profile.partnerName}
            </motion.h1>

            <motion.p
              className="mt-3 text-gradient-partnership font-serif text-xl italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {profile.partnerTagline}
            </motion.p>

            {/* Partner style badge */}
            <motion.div
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-bridge-violet/20 bg-violet-soft"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
            >
              <span className="text-sm">
                {profile.partnerStyle === 'Mentor' ? '🧙‍♂️' :
                 profile.partnerStyle === 'Hype' ? '🔥' :
                 profile.partnerStyle === 'Strategist' ? '♟️' : '🎨'}
              </span>
              <span className="text-xs font-medium text-purple-700">{profile.partnerStyle} Style</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2B: Strengths Radar Chart */}
      {section >= 1 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-2xl font-bold text-primary mb-6 text-center">
            Strength Complement
          </h2>
          <RadarChart humanStrengths={strengths} profile={profile} />
        </motion.div>
      )}

      {/* 2C: Project Identity */}
      {section >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 border border-border"
        >
          <div className="text-center mb-6">
            <p className="text-xs uppercase tracking-wider text-muted font-medium">Your Mission</p>
            <h2 className="font-serif text-3xl font-bold text-primary mt-2">{profile.projectName}</h2>
          </div>
          <p className="text-secondary text-center leading-relaxed mb-6">{profile.dreamSummary}</p>
          <div className="bg-gradient-to-r from-amber-50 via-white to-violet-50 rounded-2xl p-6 border border-border">
            <h3 className="font-serif text-sm font-semibold text-primary mb-2">When we succeed...</h3>
            <p className="text-secondary text-sm leading-relaxed italic">{profile.successVision}</p>
          </div>
        </motion.div>
      )}

      {/* 2D: Session Roadmap */}
      {section >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-serif text-2xl font-bold text-primary mb-8 text-center">
            Your 10-Session Journey
          </h2>
          <div className="bg-white rounded-3xl p-8 border border-border">
            <SessionTimeline
              sessions={profile.tenSessions || profile.firstThreeSessions}
              profile={profile}
            />
          </div>
        </motion.div>
      )}

      {/* Partnership Scores */}
      {section >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="font-serif text-2xl font-bold text-primary mb-8">Partnership Score</h2>
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            {[
              { score: profile.partnershipScore.readiness, label: 'Readiness', color: '#F59E0B' },
              { score: profile.partnershipScore.complementarity, label: 'Complementarity', color: '#8B5CF6' },
              { score: profile.partnershipScore.dreamClarity, label: 'Dream Clarity', color: '#F59E0B' },
              { score: profile.partnershipScore.overall, label: 'Overall', color: '#8B5CF6' },
            ].map(item => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <div className="relative w-20 h-20">
                  <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#E7E5E4" strokeWidth="4" />
                    <motion.circle
                      cx="40" cy="40" r="34"
                      fill="none"
                      stroke={item.color}
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 34}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - item.score / 100) }}
                      transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{item.score}</span>
                  </div>
                </div>
                <span className="text-xs text-muted mt-2">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Motivational message */}
      {section >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-8 border-l-4 border-l-bridge-gold border border-border"
        >
          <p className="text-secondary leading-relaxed italic">{profile.motivationalMessage}</p>
        </motion.div>
      )}

      {/* 2E: Partnership Agreement */}
      {section >= 5 && (
        <PartnershipAgreement
          profile={profile}
          strengths={strengths}
          onSign={onEnterWorkspace}
        />
      )}

      {/* Bottom actions */}
      {section >= 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-secondary hover:text-bridge-gold border border-border hover:border-bridge-gold/30 rounded-full transition-all duration-200"
          >
            Take Again
          </button>
        </motion.div>
      )}
    </div>
  );
}

// ============ Main Page ============

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

function AssessPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);

  // Step 1
  const [dream, setDream] = useState('');
  const [whyItMatters, setWhyItMatters] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Step 2
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);

  // Step 3
  const [workingStyles, setWorkingStyles] = useState<string[]>([]);

  // Step 4
  const [commitment, setCommitment] = useState('');

  // Step 5 (loading / reveal)
  const [isLoading, setIsLoading] = useState(false);
  const [showRevealAnimation, setShowRevealAnimation] = useState(false);
  const [profile, setProfile] = useState<BridgeProfile | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [error, setError] = useState('');

  const profileRef = useRef<BridgeProfile | null>(null);

  // Rotate placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % PLACEHOLDERS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Prefill dream from persona card URL param
  useEffect(() => {
    const prefill = searchParams.get('dream');
    if (prefill && !dream) {
      setDream(prefill);
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleStrength = useCallback((name: string) => {
    setSelectedStrengths(prev => {
      if (prev.includes(name)) return prev.filter(s => s !== name);
      if (prev.length >= 5) return prev;
      return [...prev, name];
    });
  }, []);

  const toggleWorkingStyle = useCallback((label: string) => {
    setWorkingStyles(prev => {
      if (prev.includes(label)) return prev.filter(s => s !== label);
      if (prev.length >= 2) return prev;
      return [...prev, label];
    });
  }, []);

  const canAdvance = (s: number): boolean => {
    switch (s) {
      case 1: return dream.trim().length >= 10;
      case 2: return selectedStrengths.length >= 3;
      case 3: return workingStyles.length >= 1;
      case 4: return !!commitment;
      default: return true;
    }
  };

  const handleNext = () => {
    if (!canAdvance(step)) return;
    if (step === 4) {
      handleSubmit();
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setStep(5);
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dream,
          whyItMatters,
          strengths: selectedStrengths,
          schedule: workingStyles.find(s => ['Early bird', 'Night owl'].includes(s)) || 'Flexible',
          feedbackStyle: 'Supportive',
          buildStyle: workingStyles.find(s => ['Sprint', 'Marathon', 'Structured', 'Fluid'].includes(s)) || 'Steady Builder',
          commitment,
          weeklyHours: commitment,
        }),
      });

      if (!res.ok) throw new Error('Failed to generate profile');

      const data = await res.json();
      if (data.success && data.profile) {
        profileRef.current = data.profile;
        setProfile(data.profile);
        saveProfile(data.profile);
        // Create project for workspace
        createProject(data.profile, {
          dream,
          whyItMatters,
          strengths: selectedStrengths,
          schedule: workingStyles.find(s => ['Early bird', 'Night owl'].includes(s)) || 'Flexible',
          buildStyle: workingStyles.find(s => ['Sprint', 'Marathon', 'Structured', 'Fluid'].includes(s)) || 'Steady Builder',
          feedbackStyle: 'Supportive',
          commitment,
          weeklyHours: commitment,
        });
        setIsLoading(false);
        // Show the match reveal animation
        setShowRevealAnimation(true);
      } else {
        throw new Error('Invalid response');
      }
    } catch (err) {
      console.error('Assessment error:', err);
      setError('Something went wrong generating your profile. Please try again.');
      setIsLoading(false);
    }
  };

  const handleRevealComplete = useCallback(() => {
    setShowRevealAnimation(false);
    setShowProfile(true);
  }, []);

  const handleEnterWorkspace = () => {
    router.push('/workspace');
  };

  const handleReset = () => {
    setStep(1);
    setDream('');
    setWhyItMatters('');
    setSelectedStrengths([]);
    setWorkingStyles([]);
    setCommitment('');
    setProfile(null);
    setShowProfile(false);
    setShowRevealAnimation(false);
    setError('');
  };

  const wordCount = dream.trim().split(/\s+/).filter(Boolean).length;

  return (
    <>
      {/* Match reveal animation overlay */}
      <AnimatePresence>
        {showRevealAnimation && (
          <MatchRevealAnimation onComplete={handleRevealComplete} />
        )}
      </AnimatePresence>

      <div className="min-h-screen py-8 md:py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress bar — hidden on step 5 with profile */}
          {!(step === 5 && (showProfile || isLoading)) && (
            <nav aria-label="Assessment progress" className="mb-12">
              <div className="flex items-center justify-center gap-0">
                {[1, 2, 3, 4].map((s, i) => (
                  <div key={s} className="flex items-center">
                    <motion.div
                      className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                        s < step
                          ? 'bg-bridge-gold shadow-sm'
                          : s === step
                          ? 'bg-bridge-gold shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                          : 'bg-border'
                      }`}
                      animate={s === step ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    {i < 3 && (
                      <div
                        className={`w-16 md:w-20 h-0.5 transition-all duration-500 ${
                          s < step ? 'bg-bridge-gold' : 'bg-border'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-3">
                <span className="text-xs text-muted">
                  Step {step} of 4
                </span>
              </div>
            </nav>
          )}

          <AnimatePresence mode="wait">
            {/* ===== STEP 1: Describe Your Dream ===== */}
            {step === 1 && (
              <motion.div
                key="step-1"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2 text-center">
                  Describe Your Dream
                </h1>
                <p className="text-secondary text-center mb-10">
                  The more detail, the better your partner match.
                </p>

                <div className="space-y-6">
                  <div className="relative">
                    <SparkEffect active={dream.length > 20} />
                    <textarea
                      value={dream}
                      onChange={e => setDream(e.target.value)}
                      placeholder={PLACEHOLDERS[placeholderIndex]}
                      rows={6}
                      className="w-full bg-white border border-border rounded-2xl p-5 text-primary placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-bridge-gold/40 focus:border-bridge-gold/60 transition-all duration-200 resize-none text-base leading-relaxed relative z-10"
                    />
                    {/* Word count + encouragement */}
                    <div className="flex justify-between items-center mt-2 px-1">
                      <span className="text-xs text-muted">
                        {wordCount} {wordCount === 1 ? 'word' : 'words'}
                      </span>
                      <span className="text-xs text-bridge-gold/80">
                        {wordCount < 10 ? '' :
                         wordCount < 25 ? 'Good start...' :
                         wordCount < 50 ? 'Keep going — your partner is listening' :
                         wordCount < 100 ? 'Beautiful — rich detail makes a better match' :
                         'Incredible detail — your partner will love this'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="why" className="block text-sm font-medium text-secondary mb-2">
                      Why does this matter to you?
                    </label>
                    <textarea
                      id="why"
                      value={whyItMatters}
                      onChange={e => setWhyItMatters(e.target.value)}
                      placeholder="This is personal. Tell us why this dream matters..."
                      rows={3}
                      className="w-full bg-white border border-border rounded-2xl p-5 text-primary placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-bridge-gold/40 focus:border-bridge-gold/60 transition-all duration-200 resize-none text-base leading-relaxed"
                    />
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canAdvance(1)}
                    className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-bridge-gold hover:bg-bridge-gold-dark rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                  >
                    Next
                    <span className="ml-2">&rarr;</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ===== STEP 2: Discover Your Strengths ===== */}
            {step === 2 && (
              <motion.div
                key="step-2"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2 text-center">
                  Discover Your Strengths
                </h1>
                <p className="text-secondary text-center mb-10">
                  Select your top 3-5 strengths. Your AI partner will complement the rest.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                  {STRENGTHS.map(s => (
                    <FlipStrengthCard
                      key={s.name}
                      emoji={s.emoji}
                      name={s.name}
                      description={s.description}
                      selected={selectedStrengths.includes(s.name)}
                      onToggle={() => toggleStrength(s.name)}
                    />
                  ))}
                </div>

                <p className="text-center text-sm text-muted mt-4">
                  {selectedStrengths.length}/5 selected
                  {selectedStrengths.length < 3 && ' (minimum 3)'}
                </p>

                {/* Real-time partner preview */}
                <PartnerPreview selectedStrengths={selectedStrengths} />

                <div className="mt-10 flex justify-between">
                  <button type="button" onClick={handleBack} className="inline-flex items-center px-6 py-3 text-sm font-medium text-secondary hover:text-primary transition-colors">
                    <span className="mr-2">&larr;</span> Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canAdvance(2)}
                    className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-bridge-gold hover:bg-bridge-gold-dark rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                  >
                    Next <span className="ml-2">&rarr;</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ===== STEP 3: Working Style ===== */}
            {step === 3 && (
              <motion.div
                key="step-3"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2 text-center">
                  Working Style
                </h1>
                <p className="text-secondary text-center mb-10">
                  Select 1-2 styles that describe how you work best.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {WORKING_STYLES.map(style => (
                    <WorkingStyleCard
                      key={style.label}
                      emoji={style.emoji}
                      label={style.label}
                      description={style.description}
                      selected={workingStyles.includes(style.label)}
                      onSelect={() => toggleWorkingStyle(style.label)}
                    />
                  ))}
                </div>

                <p className="text-center text-sm text-muted mt-4">
                  {workingStyles.length}/2 selected
                </p>

                <div className="mt-10 flex justify-between">
                  <button type="button" onClick={handleBack} className="inline-flex items-center px-6 py-3 text-sm font-medium text-secondary hover:text-primary transition-colors">
                    <span className="mr-2">&larr;</span> Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canAdvance(3)}
                    className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-bridge-gold hover:bg-bridge-gold-dark rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                  >
                    Next <span className="ml-2">&rarr;</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ===== STEP 4: Commitment Level ===== */}
            {step === 4 && (
              <motion.div
                key="step-4"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2 text-center">
                  Commitment Level
                </h1>
                <p className="text-secondary text-center mb-10">
                  How much time can you invest? There&apos;s no wrong answer.
                </p>

                <CommitmentScale
                  levels={COMMITMENT_LEVELS}
                  selected={commitment}
                  onSelect={setCommitment}
                />

                {commitment && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm text-bridge-gold mt-6 font-medium"
                  >
                    {commitment === '30 min/week' ? 'Every journey starts with a single step.' :
                     commitment === '2-3 hours/week' ? 'This is where real momentum builds.' :
                     commitment === '5-10 hours/week' ? 'Serious builders change the world.' :
                     'All in. This is how legends are made.'}
                  </motion.p>
                )}

                <div className="mt-10 flex justify-between">
                  <button type="button" onClick={handleBack} className="inline-flex items-center px-6 py-3 text-sm font-medium text-secondary hover:text-primary transition-colors">
                    <span className="mr-2">&larr;</span> Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canAdvance(4)}
                    className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-bridge-gold to-bridge-violet hover:opacity-90 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                  >
                    Find My Partner
                    <span className="ml-2">✨</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ===== STEP 5: Loading / Profile Reveal ===== */}
            {step === 5 && (
              <motion.div
                key="step-5"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {isLoading && (
                  <div className="flex flex-col items-center justify-center py-24">
                    <div className="relative w-24 h-24 mb-10">
                      {/* Gold circle */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.3), transparent)' }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      {/* Violet circle */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent)' }}
                        animate={{ scale: [1.3, 1, 1.3], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-bridge-gold to-bridge-violet" />
                      </div>
                    </div>
                    <LoadingText />
                  </div>
                )}

                {error && !isLoading && (
                  <div className="text-center py-20">
                    <p className="text-bridge-rose text-lg mb-6">{error}</p>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-bridge-gold hover:bg-bridge-gold-dark rounded-full transition-all duration-200 shadow-lg"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {showProfile && profile && (
                  <ProfileReveal
                    profile={profile}
                    strengths={selectedStrengths}
                    onEnterWorkspace={handleEnterWorkspace}
                    onReset={handleReset}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default function AssessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-bridge-gold/20 animate-gentle-pulse" />
      </div>
    }>
      <AssessPageInner />
    </Suspense>
  );
}
