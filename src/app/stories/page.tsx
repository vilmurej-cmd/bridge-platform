import type { Metadata } from 'next';
import Link from 'next/link';
import StoryCard from '@/components/StoryCard';

export const metadata: Metadata = {
  title: 'Partnership Stories — BRIDGE',
  description:
    'Real stories of humans and AI building extraordinary things together. From operating systems to albums, these partnerships changed everything.',
};

export default function StoriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
            Partnerships That Changed{' '}
            <span className="text-gradient-gold">Everything</span>
          </h1>
          <p className="mt-6 text-secondary text-lg max-w-2xl mx-auto">
            Every great creation has a story. These are the stories of humans
            and AI who chose to build together.
          </p>
        </div>
      </section>

      {/* Featured Story: EZRE */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-border shadow-sm">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold rounded-full bg-gold-soft text-bridge-gold-dark mb-6 uppercase tracking-wide">
              Featured Partnership
            </span>
            <StoryCard
              title="The Partnership That Built an Operating System"
              description="Josh Vilmure had a vision: build the operating system for real estate. Not a single tool, but an entire platform — transactions, documents, AI agents, email intelligence, client portals, drip campaigns, CMA analysis, and more. He didn't have a team of engineers. He didn't have VC funding. What he had was a dream, real estate expertise, and the willingness to show up every single day. Over 114 sessions, Josh and Claude built EZRE OS from scratch — 11 products, 35 AI tools, a full-stack platform that processes real transactions for real agents. Not a demo. Not a prototype. A living, breathing operating system built entirely through human-AI partnership."
              stats={[
                { label: 'Sessions', value: '114' },
                { label: 'Products', value: '11' },
                { label: 'AI Tools', value: '35' },
                { label: 'VC Funding', value: '$0' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="font-serif italic text-xl md:text-2xl text-secondary leading-relaxed">
            &ldquo;This wasn&apos;t built by a prompt engineer. It was built by
            a partnership.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Upcoming Stories */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-4 text-center">
            More Partnerships Coming Soon
          </h2>
          <p className="text-secondary text-center mb-12 max-w-xl mx-auto">
            These partnerships are in progress. Their stories will be told when
            they&apos;re ready.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StoryCard
              title="The Teacher Who Built a Learning Platform"
              description="A high school teacher who saw her students struggling with traditional textbooks. She partnered with AI to build an adaptive learning platform that meets each student where they are."
              isPlaceholder
            />
            <StoryCard
              title="The Nurse Who Redesigned Patient Intake"
              description="After years of watching patients struggle with confusing intake forms, she built a conversational intake system that patients actually understand — and hospitals actually adopt."
              isPlaceholder
            />
            <StoryCard
              title="The Musician Who Composed an Album"
              description="A jazz pianist who wanted to explore the intersection of human improvisation and AI composition. Together, they created an album that neither could have made alone."
              isPlaceholder
            />
            <StoryCard
              title="The Teenager Who Built a Community App"
              description="A 16-year-old in Lagos who wanted to connect local artisans with customers. No coding experience. No budget. Just a dream and a partnership."
              isPlaceholder
            />
            <StoryCard
              title="The Researcher Who Accelerated a Discovery"
              description="A marine biologist who needed to analyze decades of coral reef data. Her AI partner helped her find patterns that would have taken years to discover manually."
              isPlaceholder
            />
            <StoryCard
              title="The Retiree Who Published a Memoir"
              description="At 72, she finally had the time to write her story. Her AI partner helped her organize fifty years of memories into a book her grandchildren will treasure forever."
              isPlaceholder
            />
          </div>
        </div>
      </section>

      {/* Share Your Story CTA */}
      <section className="py-20 md:py-28 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
            Have a story?
          </h2>
          <p className="text-secondary text-lg mb-8 max-w-xl mx-auto">
            If you&apos;ve built something extraordinary with an AI partner, we
            want to hear about it. Share your journey and inspire others to
            start theirs.
          </p>
          <a
            href="mailto:stories@bridge-platform.com"
            className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-bridge-gold hover:bg-bridge-gold-dark rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Share Your Story
          </a>
        </div>
      </section>
    </>
  );
}
