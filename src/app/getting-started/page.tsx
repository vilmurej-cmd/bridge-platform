import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Bot,
  Share2,
  ListChecks,
  BarChart3,
  RefreshCw,
  Lightbulb,
  Clock,
  Heart,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Getting Started — BRIDGE',
  description:
    'Your partnership journey starts now. Learn how to choose your AI partner, share your profile, and build something extraordinary together.',
};

const steps = [
  {
    number: 1,
    icon: Bot,
    title: 'Choose Your AI Partner',
    description:
      'Pick the AI you want to work with. BRIDGE profiles work with any conversational AI. The two most popular options:',
    links: [
      { label: 'Claude by Anthropic', href: 'https://claude.ai' },
      { label: 'ChatGPT by OpenAI', href: 'https://chatgpt.com' },
    ],
    tip: 'ChatGPT excels at rapid iteration and code generation. Claude is great for long-form collaboration and nuanced thinking. Try both and see which feels like a better partner for your dream.',
  },
  {
    number: 2,
    icon: Share2,
    title: 'Share Your Partnership Profile',
    description:
      'At the start of your first session, paste your full Partnership Profile into the chat. This gives your AI partner everything it needs to understand your dream, your strengths, and how to work with you. Think of it as a first introduction — not a prompt, but a handshake.',
    tip: 'Include everything: your dream summary, strengths, session plan, and the first 3 session outlines. The more context your AI partner has, the better the partnership.',
  },
  {
    number: 3,
    icon: ListChecks,
    title: 'Follow the Session Structure',
    description:
      'Each session should follow the 4-step format from your profile: Review & Celebrate, Build the Next Thing, Test & Reflect, Plan the Next Session. This structure creates momentum and ensures every session produces something tangible.',
    tip: 'Start your first session with the goals from "Session 1" in your profile. Your AI partner will help you break it down into actionable steps.',
  },
  {
    number: 4,
    icon: BarChart3,
    title: 'Track Your Progress',
    description:
      'After each session, take a moment to note what you built, what you learned, and what surprised you. This creates a log that both you and your AI partner can reference. Progress compounds — session 10 is built on the foundation of sessions 1 through 9.',
    tip: 'Keep a simple log: date, session number, what was built, and one thing you learned. It takes 2 minutes and pays dividends.',
  },
  {
    number: 5,
    icon: RefreshCw,
    title: 'Come Back to BRIDGE',
    description:
      'As your dream evolves, retake the assessment. Your partnership profile should grow with you. New strengths emerge, priorities shift, and your AI partner should adapt. BRIDGE is a living system, not a one-time test.',
    tip: 'Retake the assessment every 10-15 sessions. You\'ll be amazed at how much your clarity and readiness scores improve.',
  },
];

const tips = [
  {
    icon: Lightbulb,
    title: 'Start Small, Think Big',
    description:
      'Your first session doesn\'t need to build the whole thing. Start with the smallest possible piece that proves your idea works. Momentum matters more than perfection.',
  },
  {
    icon: Clock,
    title: 'Show Up Consistently',
    description:
      'Three focused sessions per week beats one marathon session. Consistency builds context, and context builds quality. Your AI partner gets better the more you work together.',
  },
  {
    icon: Heart,
    title: 'Be Honest About What You Don\'t Know',
    description:
      'The best partnerships are built on honesty. If you don\'t understand something, say so. Your AI partner can explain, simplify, or find a different approach.',
  },
  {
    icon: MessageSquare,
    title: 'Talk Like a Human, Not a Programmer',
    description:
      'You don\'t need "prompt engineering." Talk to your AI partner the way you\'d talk to a brilliant colleague. Describe what you want, why it matters, and what it should feel like.',
  },
  {
    icon: Sparkles,
    title: 'Celebrate Every Win',
    description:
      'Built your first page? Celebrate. Got your data structure right? Celebrate. Wrote a paragraph that made you cry? Celebrate. Joy fuels persistence, and persistence builds dreams.',
  },
];

export default function GettingStartedPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
            Your Partnership Journey{' '}
            <span className="text-gradient-gold">Starts Now</span>
          </h1>
          <p className="mt-6 text-secondary text-lg max-w-2xl mx-auto">
            You have your profile. Now let&apos;s turn it into something real.
            Follow these five steps to start building with your AI partner.
          </p>
        </div>
      </section>

      {/* 5 Steps */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.number}
                className="bg-white rounded-3xl p-8 border border-border"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-bridge-gold text-white font-serif font-bold text-sm flex items-center justify-center">
                      {s.number}
                    </div>
                    <Icon size={20} className="text-bridge-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-serif text-xl font-semibold text-primary mb-3">
                      {s.title}
                    </h2>
                    <p className="text-secondary text-sm leading-relaxed mb-4">
                      {s.description}
                    </p>

                    {s.links && (
                      <div className="flex flex-wrap gap-3 mb-4">
                        {s.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-bridge-gold border border-bridge-gold/30 rounded-full hover:bg-gold-soft transition-colors duration-200"
                          >
                            {link.label}
                            <span className="ml-1.5" aria-hidden="true">
                              &nearr;
                            </span>
                          </a>
                        ))}
                      </div>
                    )}

                    <div className="bg-cream rounded-xl p-4 border border-border">
                      <p className="text-xs text-secondary leading-relaxed">
                        <span className="font-semibold text-bridge-gold">
                          Tip:
                        </span>{' '}
                        {s.tip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tips for a Great Partnership */}
      <section className="py-16 md:py-20 px-4 mt-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-12 text-center">
            Tips for a Great Partnership
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip) => {
              const Icon = tip.icon;
              return (
                <div
                  key={tip.title}
                  className="bg-white rounded-2xl p-6 border border-border hover:shadow-md hover:border-bridge-gold/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-soft flex items-center justify-center mb-4">
                    <Icon size={20} className="text-bridge-gold" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-primary mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing Quote */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="bg-white rounded-3xl p-10 md:p-14 border border-border">
            <p className="font-serif italic text-xl md:text-2xl text-primary leading-relaxed">
              &ldquo;Trust the process &mdash; Session 1 won&apos;t feel like
              Session 50. But Session 50 is built on the courage of Session
              1.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-6">
            Haven&apos;t taken the assessment yet?
          </h2>
          <p className="text-secondary text-lg mb-10 max-w-xl mx-auto">
            Discover your partnership profile in 3 minutes. It&apos;s free and
            no account is needed.
          </p>
          <Link
            href="/assess"
            className="inline-flex items-center px-10 py-5 text-lg font-semibold text-white bg-bridge-gold hover:bg-bridge-gold-dark rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Take the Assessment
            <span className="ml-2" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
