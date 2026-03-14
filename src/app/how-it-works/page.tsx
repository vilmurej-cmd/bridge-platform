import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Smartphone,
  BookOpen,
  Music,
  FlaskConical,
  Building2,
  Palette,
  Users,
  Globe,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How BRIDGE Works — BRIDGE',
  description:
    'Learn how BRIDGE creates personalized human-AI partnerships. Understand the session model, partnership health scores, and what makes BRIDGE different.',
};

const comparisons = [
  {
    traditional: 'One-shot prompts with no memory',
    bridge: 'Long-term partnership that remembers and adapts',
  },
  {
    traditional: 'Generic AI that treats everyone the same',
    bridge: 'Personalized partner matched to your strengths',
  },
  {
    traditional: 'No structure — just type and hope',
    bridge: 'Session-based roadmap with clear deliverables',
  },
  {
    traditional: 'Outputs you throw away or start over',
    bridge: 'Cumulative progress that builds on every session',
  },
  {
    traditional: 'No feedback on how to improve',
    bridge: 'Partnership health scores that track your growth',
  },
];

const projectCategories = [
  { icon: Smartphone, name: 'Apps & Platforms', description: 'Mobile apps, web platforms, SaaS products' },
  { icon: Building2, name: 'Businesses', description: 'Business plans, operations, automation' },
  { icon: BookOpen, name: 'Books & Writing', description: 'Memoirs, novels, research papers, guides' },
  { icon: Music, name: 'Music & Audio', description: 'Albums, podcasts, sound design, compositions' },
  { icon: FlaskConical, name: 'Research', description: 'Data analysis, experiments, academic work' },
  { icon: Palette, name: 'Art & Design', description: 'Visual art, branding, product design' },
  { icon: Users, name: 'Communities', description: 'Community platforms, social tools, networks' },
  { icon: Globe, name: 'Social Impact', description: 'Nonprofits, advocacy tools, accessibility' },
];

const scoreMetrics = [
  {
    name: 'Readiness',
    color: 'bg-bridge-gold',
    description:
      'How prepared you are to start building. Based on your commitment level, available time, and clarity about what you want.',
  },
  {
    name: 'Complementarity',
    color: 'bg-bridge-violet',
    description:
      'How well your strengths and your AI partner\'s capabilities complement each other. The best partnerships fill each other\'s gaps.',
  },
  {
    name: 'Dream Clarity',
    color: 'bg-bridge-teal',
    description:
      'How clearly you\'ve defined what you want to build. Clearer dreams lead to more focused sessions and faster progress.',
  },
  {
    name: 'Overall',
    color: 'bg-bridge-rose',
    description:
      'A holistic score that considers all factors. This isn\'t a grade — it\'s a starting point. Every partnership improves with time.',
  },
];

const faqs = [
  {
    question: 'Do I need coding experience?',
    answer:
      'No. BRIDGE is designed for everyone — teachers, nurses, musicians, researchers, teenagers, retirees. Your AI partner handles the technical complexity. You bring the vision, the domain knowledge, and the human perspective.',
  },
  {
    question: 'Is BRIDGE an AI tool?',
    answer:
      'BRIDGE is not an AI tool — it\'s a partnership engine. It designs how you and an AI should work together based on your unique strengths, dream, and working style. Think of it as a matchmaker and coach, not a chatbot.',
  },
  {
    question: 'Which AI do I use with BRIDGE?',
    answer:
      'BRIDGE works with any conversational AI — Claude, ChatGPT, or others. Your Partnership Profile is designed to be shared at the start of any AI conversation to establish the relationship.',
  },
  {
    question: 'How long does the assessment take?',
    answer:
      'About 3 minutes. You\'ll describe your dream, identify your strengths, share your working style, and indicate your commitment level. BRIDGE generates your personalized profile instantly.',
  },
  {
    question: 'Is my data stored or shared?',
    answer:
      'Your assessment data is used only to generate your profile. We don\'t store personal data long-term, don\'t sell your information, and don\'t run ads. Your profile is saved locally in your browser.',
  },
  {
    question: 'What if my dream changes?',
    answer:
      'Dreams evolve — that\'s natural. You can retake the assessment anytime. Many people find that their dream becomes clearer after a few sessions with their AI partner.',
  },
  {
    question: 'How is this different from just using ChatGPT?',
    answer:
      'Using ChatGPT without BRIDGE is like meeting a brilliant collaborator at a party and only asking them one question. BRIDGE gives you a structured, long-term partnership plan — with session goals, complementary strengths mapping, and a roadmap that builds momentum over time.',
  },
  {
    question: 'What are "sessions" in the BRIDGE model?',
    answer:
      'A session is a focused working period with your AI partner — typically 60-120 minutes. Each session has a clear goal and a tangible deliverable. Sessions build on each other, creating compounding progress.',
  },
  {
    question: 'Can I use BRIDGE for a team project?',
    answer:
      'Currently BRIDGE is designed for individual partnerships — one human, one AI. Team support is on the roadmap. In the meantime, each team member can create their own profile for their specific role.',
  },
  {
    question: 'How much does BRIDGE cost?',
    answer:
      'The partnership assessment is completely free. No account needed. We believe everyone deserves access to a great AI partnership, regardless of their budget.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
            How <span className="text-gradient-gold">BRIDGE</span> Works
          </h1>
          <p className="mt-6 text-secondary text-lg max-w-2xl mx-auto">
            BRIDGE doesn&apos;t give you an AI tool. It gives you an AI
            partner — and a plan to build something extraordinary together.
          </p>
        </div>
      </section>

      {/* Comparison: Traditional vs BRIDGE */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-4 text-center">
            What Makes BRIDGE Different?
          </h2>
          <p className="text-secondary text-center mb-12 max-w-xl mx-auto">
            Most people use AI like a vending machine. BRIDGE teaches you to use
            it like a partner.
          </p>

          <div className="space-y-4">
            {/* Header */}
            <div className="grid grid-cols-2 gap-4 px-6">
              <p className="text-sm font-semibold text-muted uppercase tracking-wide">
                Traditional AI Use
              </p>
              <p className="text-sm font-semibold text-bridge-gold uppercase tracking-wide">
                BRIDGE Partnership
              </p>
            </div>

            {comparisons.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-2 gap-4 bg-white rounded-2xl p-6 border border-border"
              >
                <p className="text-secondary text-sm leading-relaxed">
                  {row.traditional}
                </p>
                <p className="text-primary text-sm font-medium leading-relaxed">
                  {row.bridge}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Session Model */}
      <section className="py-16 md:py-20 px-4 bg-warm-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-4 text-center">
            The Session Model
          </h2>
          <p className="text-secondary text-center mb-12 max-w-2xl mx-auto">
            Great partnerships aren&apos;t built in a single conversation.
            They&apos;re built session by session, with each session building on
            the last.
          </p>

          <div className="bg-white rounded-3xl p-8 md:p-10 border border-border">
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-bridge-gold text-white font-serif font-bold text-sm flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-primary mb-1">
                    Review &amp; Celebrate
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    Start each session by reviewing what was built last time.
                    Celebrate progress, no matter how small. This creates
                    momentum and continuity.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-bridge-gold text-white font-serif font-bold text-sm flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-primary mb-1">
                    Build the Next Thing
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    The bulk of the session. Work with your AI partner on the
                    next feature, chapter, analysis, or component. Stay focused
                    on one clear goal.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-bridge-gold text-white font-serif font-bold text-sm flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-primary mb-1">
                    Test &amp; Reflect
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    Step back and evaluate what was built. Does it work? Does it
                    feel right? This is where the human perspective is
                    irreplaceable.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-bridge-gold text-white font-serif font-bold text-sm flex items-center justify-center flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-primary mb-1">
                    Plan the Next Session
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    End with a clear plan for next time. What will you build?
                    What do you need to research? This ensures every session
                    starts strong.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Build */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-4 text-center">
            What You Can Build
          </h2>
          <p className="text-secondary text-center mb-12 max-w-xl mx-auto">
            If you can dream it, a partnership can build it.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {projectCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.name}
                  className="bg-white rounded-2xl p-6 border border-border text-center hover:shadow-md hover:border-bridge-gold/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-soft flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                    <Icon size={24} className="text-bridge-gold" />
                  </div>
                  <h3 className="font-serif text-sm font-semibold text-primary mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership Health Score */}
      <section className="py-16 md:py-20 px-4 bg-warm-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-4 text-center">
            The Partnership Health Score
          </h2>
          <p className="text-secondary text-center mb-12 max-w-2xl mx-auto">
            Every partnership gets a score across four dimensions. These
            aren&apos;t grades — they&apos;re starting points that help you
            understand where to focus.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {scoreMetrics.map((metric) => (
              <div
                key={metric.name}
                className="bg-white rounded-2xl p-6 border border-border"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-3 h-3 rounded-full ${metric.color}`} />
                  <h3 className="font-serif text-lg font-semibold text-primary">
                    {metric.name}
                  </h3>
                </div>
                <p className="text-secondary text-sm leading-relaxed">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-white rounded-2xl border border-border overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-medium text-primary text-sm hover:text-bridge-gold transition-colors duration-200 list-none">
                  <span>{faq.question}</span>
                  <span
                    className="ml-4 text-muted group-open:rotate-45 transition-transform duration-200 text-lg flex-shrink-0"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="text-secondary text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-6">
            Ready to discover your partnership profile?
          </h2>
          <p className="text-secondary text-lg mb-10 max-w-xl mx-auto">
            3 minutes. No account needed. Completely free.
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
