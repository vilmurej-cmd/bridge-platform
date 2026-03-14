'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import StrengthCard from '@/components/StrengthCard';
import StyleSelector from '@/components/StyleSelector';
import PartnershipProfile from '@/components/PartnershipProfile';
import type { BridgeProfile } from '@/lib/demo-profile';
import { saveProfile } from '@/lib/storage';

const PLACEHOLDERS = [
  'An app that helps elderly people stay connected with their families...',
  'A platform that teaches kids to code through music...',
  'A business that makes sustainable fashion affordable...',
  'A tool that helps small farmers access fair markets...',
  'A book about my grandmother\'s journey from Vietnam...',
];

const STRENGTHS = [
  { emoji: '\uD83C\uDFAF', name: 'Vision & Strategy', description: 'You see the big picture and know where to go.' },
  { emoji: '\uD83D\uDDE3\uFE0F', name: 'Communication', description: 'You explain ideas clearly and connect with people.' },
  { emoji: '\uD83D\uDD2C', name: 'Domain Expertise', description: 'You have deep knowledge in your field.' },
  { emoji: '\uD83C\uDFA8', name: 'Design Sense', description: 'You have an eye for what looks and feels right.' },
  { emoji: '\uD83D\uDCBB', name: 'Technical Skills', description: 'You can code, build, or work with technology.' },
  { emoji: '\uD83D\uDCCA', name: 'Data & Analysis', description: 'You think in numbers, patterns, and evidence.' },
  { emoji: '\uD83E\uDD1D', name: 'Relationships', description: 'You build trust and bring people together.' },
  { emoji: '\u26A1', name: 'Execution', description: 'You get things done. Period.' },
];

const SCHEDULE_OPTIONS = [
  { emoji: '\uD83C\uDF19', label: 'Night Owl', description: 'You do your best work when the world is quiet.' },
  { emoji: '\u2600\uFE0F', label: 'Early Bird', description: 'You tackle the hardest problems before noon.' },
  { emoji: '\uD83C\uDF24\uFE0F', label: 'Flexible', description: 'You work when inspiration strikes, any time of day.' },
];

const BUILD_OPTIONS = [
  { emoji: '\uD83C\uDFC3', label: 'Sprint Builder', description: 'Intense bursts of effort followed by rest. Move fast, ship fast.' },
  { emoji: '\uD83D\uDC22', label: 'Steady Builder', description: 'Consistent daily progress. Slow and steady wins the race.' },
  { emoji: '\uD83C\uDF0A', label: 'Flow Builder', description: 'You follow energy and inspiration. Some days are marathons, some are rest.' },
];

const FEEDBACK_OPTIONS = [
  { emoji: '\uD83D\uDD25', label: 'Direct', description: 'Tell me what\'s wrong, no sugarcoating. I can handle it.' },
  { emoji: '\uD83E\uDD17', label: 'Supportive', description: 'Celebrate the wins, then gently guide improvements.' },
  { emoji: '\uD83D\uDCCA', label: 'Analytical', description: 'Show me the data. Pros, cons, tradeoffs — let me decide.' },
];

const COMMITMENT_OPTIONS = [
  { emoji: '\uD83D\uDCA1', label: 'Exploring', description: 'I\'m curious. I want to see what\'s possible.' },
  { emoji: '\uD83C\uDF31', label: 'Planting', description: 'I\'m serious about starting. Ready to invest time.' },
  { emoji: '\uD83D\uDD25', label: 'Burning', description: 'This dream keeps me up at night. I need to build it.' },
  { emoji: '\uD83D\uDE80', label: 'All In', description: 'This is my life\'s work. I\'m ready to go all in.' },
];

const HOURS_OPTIONS = [
  { emoji: '\uD83D\uDD70\uFE0F', label: '1-2 hours/week', description: 'A toe in the water. Perfect for exploring.' },
  { emoji: '\u23F0', label: '3-5 hours/week', description: 'Meaningful progress. Great for side projects.' },
  { emoji: '\uD83D\uDCCB', label: '5-10 hours/week', description: 'Serious building time. Real momentum.' },
  { emoji: '\uD83D\uDCAA', label: '10-20 hours/week', description: 'Major commitment. Things move fast here.' },
  { emoji: '\uD83D\uDE80', label: '20+ hours/week', description: 'Full-time builder mode. Buckle up.' },
];

const LOADING_MESSAGES = [
  'Analyzing your dream...',
  'Mapping your strengths...',
  'Designing your partnership...',
  'Almost ready...',
];

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export default function AssessPage() {
  const [step, setStep] = useState(1);

  // Step 1
  const [dream, setDream] = useState('');
  const [whyItMatters, setWhyItMatters] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Step 2
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);

  // Step 3
  const [schedule, setSchedule] = useState('');
  const [buildStyle, setBuildStyle] = useState('');
  const [feedbackStyle, setFeedbackStyle] = useState('');

  // Step 4
  const [commitment, setCommitment] = useState('');
  const [weeklyHours, setWeeklyHours] = useState('');

  // Step 5
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [profile, setProfile] = useState<BridgeProfile | null>(null);
  const [error, setError] = useState('');

  // Rotate placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Rotate loading messages
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isLoading]);

  const toggleStrength = useCallback((name: string) => {
    setSelectedStrengths((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  }, []);

  const canAdvance = (s: number): boolean => {
    switch (s) {
      case 1:
        return dream.trim().length >= 10;
      case 2:
        return selectedStrengths.length >= 1;
      case 3:
        return !!schedule && !!buildStyle && !!feedbackStyle;
      case 4:
        return !!commitment && !!weeklyHours;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!canAdvance(step)) return;
    if (step === 4) {
      handleSubmit();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setStep(5);
    setIsLoading(true);
    setError('');
    setLoadingMessageIndex(0);

    try {
      const res = await fetch('/api/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dream,
          whyItMatters,
          strengths: selectedStrengths,
          schedule,
          feedbackStyle,
          buildStyle,
          commitment,
          weeklyHours,
        }),
      });

      if (!res.ok) throw new Error('Failed to generate profile');

      const data = await res.json();
      if (data.success && data.profile) {
        setProfile(data.profile);
        saveProfile(data.profile);
      } else {
        throw new Error('Invalid response');
      }
    } catch (err) {
      console.error('Assessment error:', err);
      setError('Something went wrong generating your profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setDream('');
    setWhyItMatters('');
    setSelectedStrengths([]);
    setSchedule('');
    setBuildStyle('');
    setFeedbackStyle('');
    setCommitment('');
    setWeeklyHours('');
    setProfile(null);
    setError('');
  };

  return (
    <div className="min-h-screen py-8 md:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar — hidden on step 5 with profile */}
        {!(step === 5 && profile) && (
          <nav aria-label="Assessment progress" className="mb-12">
            <div className="flex items-center justify-center gap-0">
              {[1, 2, 3, 4, 5].map((s, i) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      s <= step
                        ? 'bg-bridge-gold shadow-sm'
                        : 'bg-border'
                    }`}
                    aria-label={`Step ${s}${s === step ? ' (current)' : s < step ? ' (completed)' : ''}`}
                  />
                  {i < 4 && (
                    <div
                      className={`w-12 md:w-16 h-0.5 transition-all duration-300 ${
                        s < step ? 'bg-bridge-gold' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Your Dream */}
          {step === 1 && (
            <motion.div
              key="step-1"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3 text-center">
                What do you want to build?
              </h1>
              <p className="text-secondary text-center mb-10">
                There are no wrong answers.
              </p>

              <div className="space-y-6">
                <div>
                  <label htmlFor="dream" className="sr-only">
                    Describe your dream
                  </label>
                  <textarea
                    id="dream"
                    value={dream}
                    onChange={(e) => setDream(e.target.value)}
                    placeholder={PLACEHOLDERS[placeholderIndex]}
                    rows={5}
                    className="w-full bg-white border border-border rounded-2xl p-5 text-primary placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-bridge-gold/40 focus:border-bridge-gold/60 transition-all duration-200 resize-none text-base leading-relaxed"
                  />
                </div>

                <div>
                  <label
                    htmlFor="why"
                    className="block text-sm font-medium text-secondary mb-2"
                  >
                    Why does this matter to you?
                  </label>
                  <textarea
                    id="why"
                    value={whyItMatters}
                    onChange={(e) => setWhyItMatters(e.target.value)}
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
                  <span className="ml-2" aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Your Strengths */}
          {step === 2 && (
            <motion.div
              key="step-2"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3 text-center">
                What do you bring to the table?
              </h1>
              <p className="text-secondary text-center mb-10">
                Select everything that feels true.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {STRENGTHS.map((s) => (
                  <StrengthCard
                    key={s.name}
                    emoji={s.emoji}
                    name={s.name}
                    description={s.description}
                    selected={selectedStrengths.includes(s.name)}
                    onToggle={() => toggleStrength(s.name)}
                  />
                ))}
              </div>

              <p className="text-center text-sm text-muted mt-6">
                {selectedStrengths.length} of 8 selected
              </p>

              <div className="mt-10 flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center px-6 py-3 text-sm font-medium text-secondary hover:text-primary transition-colors duration-200"
                >
                  <span className="mr-2" aria-hidden="true">&larr;</span>
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canAdvance(2)}
                  className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-bridge-gold hover:bg-bridge-gold-dark rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                >
                  Next
                  <span className="ml-2" aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Your Working Style */}
          {step === 3 && (
            <motion.div
              key="step-3"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3 text-center">
                Your Working Style
              </h1>
              <p className="text-secondary text-center mb-10">
                Help us understand how you work best.
              </p>

              <div className="space-y-10">
                <StyleSelector
                  question="When are you at your best?"
                  options={SCHEDULE_OPTIONS}
                  selected={schedule}
                  onSelect={setSchedule}
                />
                <StyleSelector
                  question="How do you build?"
                  options={BUILD_OPTIONS}
                  selected={buildStyle}
                  onSelect={setBuildStyle}
                />
                <StyleSelector
                  question="How do you want feedback?"
                  options={FEEDBACK_OPTIONS}
                  selected={feedbackStyle}
                  onSelect={setFeedbackStyle}
                />
              </div>

              <div className="mt-10 flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center px-6 py-3 text-sm font-medium text-secondary hover:text-primary transition-colors duration-200"
                >
                  <span className="mr-2" aria-hidden="true">&larr;</span>
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canAdvance(3)}
                  className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-bridge-gold hover:bg-bridge-gold-dark rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                >
                  Next
                  <span className="ml-2" aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Your Commitment */}
          {step === 4 && (
            <motion.div
              key="step-4"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3 text-center">
                How serious is this dream?
              </h1>
              <p className="text-secondary text-center mb-10">
                There&apos;s no wrong answer. We just want to match the plan to your energy.
              </p>

              <div className="space-y-10">
                <StyleSelector
                  question="Your commitment level"
                  options={COMMITMENT_OPTIONS}
                  selected={commitment}
                  onSelect={setCommitment}
                />
                <StyleSelector
                  question="How much time can you invest?"
                  options={HOURS_OPTIONS}
                  selected={weeklyHours}
                  onSelect={setWeeklyHours}
                />
              </div>

              <div className="mt-10 flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center px-6 py-3 text-sm font-medium text-secondary hover:text-primary transition-colors duration-200"
                >
                  <span className="mr-2" aria-hidden="true">&larr;</span>
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canAdvance(4)}
                  className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-bridge-gold hover:bg-bridge-gold-dark rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                >
                  Generate My Profile
                  <span className="ml-2" aria-hidden="true">&#10024;</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Loading or Profile */}
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
                  {/* Breathing gold circle */}
                  <div className="w-24 h-24 rounded-full bg-bridge-gold/20 animate-gentle-pulse flex items-center justify-center mb-10">
                    <div className="w-14 h-14 rounded-full bg-bridge-gold/40 animate-warm-glow flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-bridge-gold" />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={loadingMessageIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="font-serif text-xl text-secondary"
                    >
                      {LOADING_MESSAGES[loadingMessageIndex]}
                    </motion.p>
                  </AnimatePresence>
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

              {profile && !isLoading && (
                <div>
                  <PartnershipProfile
                    profile={profile}
                    strengths={selectedStrengths}
                  />

                  <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/getting-started"
                      className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-bridge-gold hover:bg-bridge-gold-dark rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      Start Building Now
                      <span className="ml-2" aria-hidden="true">&rarr;</span>
                    </Link>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center px-6 py-3 text-sm font-medium text-secondary hover:text-bridge-gold border border-border hover:border-bridge-gold/30 rounded-full transition-all duration-200"
                    >
                      Take Again
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
