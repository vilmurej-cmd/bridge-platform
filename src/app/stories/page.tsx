import type { Metadata } from 'next';
import Link from 'next/link';
import StoryCard from '@/components/StoryCard';
import CommunityCounter from '@/components/CommunityCounter';

export const metadata: Metadata = {
  title: 'Partnership Stories — BRIDGE',
  description:
    'Real stories of humans and AI building extraordinary things together. From operating systems to albums, these partnerships changed everything.',
};

const futureStories = [
  {
    title: 'Maria, the Teacher in São Paulo',
    dream: 'Build a literacy app for underserved communities',
    built: 'LeituraViva — an adaptive reading platform that personalizes lessons based on each student\'s pace and interests',
    impact: '50,000 students across 200 schools now have access to personalized literacy tools',
    sessions: 42,
    emoji: '📚',
    color: 'from-amber-50 to-orange-50',
    borderColor: 'border-bridge-gold/30',
  },
  {
    title: 'Dr. Chen, the Researcher',
    dream: 'Match cancer patients with clinical trials faster',
    built: 'TrialBridge — a matching platform that cross-references patient profiles with 10,000+ active trials',
    impact: 'Reduced average trial matching time from 6 weeks to 48 hours for 3 hospitals',
    sessions: 28,
    emoji: '🔬',
    color: 'from-teal-50 to-emerald-50',
    borderColor: 'border-bridge-teal/30',
  },
  {
    title: 'Amara, Age 17, Nairobi',
    dream: 'Monitor water quality in her village',
    built: 'AquaSense — a sensor network with a mobile dashboard that alerts the community about contamination',
    impact: 'Prevented 3 waterborne illness outbreaks in the first year',
    sessions: 35,
    emoji: '💧',
    color: 'from-blue-50 to-cyan-50',
    borderColor: 'border-bridge-blue/30',
  },
  {
    title: 'James, the Jazz Pianist',
    dream: 'Explore the intersection of human improv and AI composition',
    built: 'Duet — an album of 12 tracks where human and AI traded musical phrases',
    impact: 'Featured on 3 music blogs, 15,000 streams in the first month',
    sessions: 24,
    emoji: '🎹',
    color: 'from-violet-50 to-purple-50',
    borderColor: 'border-bridge-violet/30',
  },
  {
    title: 'Rosa, the Retiree',
    dream: 'Write a memoir for her grandchildren',
    built: 'Fifty years of memories organized into a 280-page book with photos',
    impact: 'Published on Amazon, 200+ copies sold, featured in local newspaper',
    sessions: 18,
    emoji: '📖',
    color: 'from-rose-50 to-pink-50',
    borderColor: 'border-bridge-rose/30',
  },
  {
    title: 'Kofi, the Small Farmer',
    dream: 'Connect local farmers to fair-price markets',
    built: 'FairHarvest — a marketplace app connecting 500 farmers directly to buyers',
    impact: 'Average farmer income increased 34% by cutting out middlemen',
    sessions: 31,
    emoji: '🌾',
    color: 'from-green-50 to-emerald-50',
    borderColor: 'border-bridge-teal/30',
  },
];

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
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-border shadow-sm overflow-hidden relative">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold rounded-full bg-gold-soft text-bridge-gold-dark mb-6 uppercase tracking-wide">
              Featured Partnership
            </span>

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-4">
              The Partnership That Built an Operating System
            </h2>

            <p className="text-secondary leading-relaxed mb-8">
              Josh Vilmure had a vision: build the operating system for real estate. Not a single tool, but an entire platform — transactions, documents, AI agents, email intelligence, client portals, drip campaigns, CMA analysis, and more. He didn&apos;t have a team of engineers. He didn&apos;t have VC funding. What he had was a dream, real estate expertise, and the willingness to show up every single day.
            </p>

            {/* EZRE Timeline */}
            <div className="relative mb-8">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-bridge-gold via-bridge-gold to-bridge-gold/20" />
              <div className="space-y-6 pl-12">
                {[
                  { session: 'Session 1', label: 'An idea and a conversation', detail: 'First assessment, first partnership, first line of code' },
                  { session: 'Session 25', label: 'Transaction management system live', detail: '3 products, real agents using it daily' },
                  { session: 'Session 50', label: '5 products, 100+ routes', detail: 'AI agents, document intelligence, drip campaigns' },
                  { session: 'Session 75', label: 'Full-stack platform serving clients', detail: '8 products, CMA analysis, email intelligence' },
                  { session: 'Session 100', label: '10 products, public launch', detail: 'Complete operating system, zero external funding' },
                  { session: 'Session 114', label: '11 products, 35 AI tools, $0 VC', detail: 'A living, breathing operating system built entirely through partnership' },
                ].map((m, i) => (
                  <div key={m.session} className="relative">
                    <div className={`absolute -left-[34px] top-1.5 w-3 h-3 rounded-full ${
                      i === 5 ? 'bg-bridge-gold ring-4 ring-bridge-gold/20' : 'bg-bridge-gold/60'
                    }`} />
                    <div>
                      <p className="font-serif font-semibold text-primary text-sm">{m.session}</p>
                      <p className="text-secondary text-sm">{m.label}</p>
                      <p className="text-muted text-xs mt-0.5">{m.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 py-6 border-t border-border">
              {[
                { label: 'Sessions', value: '114' },
                { label: 'Products', value: '11' },
                { label: 'AI Tools', value: '35' },
                { label: 'VC Funding', value: '$0' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-bridge-gold">{stat.value}</p>
                  <p className="text-xs text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <blockquote className="text-center mt-6 pt-6 border-t border-border">
              <p className="font-serif italic text-lg text-secondary">
                &ldquo;This wasn&apos;t built by a prompt engineer. It was built by a partnership.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Imagined Future Stories */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-4 text-center">
            What BRIDGE Partnerships Will Build
          </h2>
          <p className="text-secondary text-center mb-12 max-w-xl mx-auto">
            These stories represent what&apos;s possible when anyone with a dream gets an AI partner who truly understands them.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureStories.map(story => (
              <div
                key={story.title}
                className={`bg-gradient-to-br ${story.color} rounded-2xl p-6 border ${story.borderColor} hover:shadow-md transition-all duration-300 group`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{story.emoji}</span>
                  <div>
                    <h3 className="font-serif text-base font-bold text-primary">{story.title}</h3>
                    <p className="text-xs text-muted">{story.sessions} sessions</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-muted uppercase tracking-wide">The Dream</p>
                    <p className="text-sm text-secondary mt-0.5">{story.dream}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted uppercase tracking-wide">What They Built</p>
                    <p className="text-sm text-secondary mt-0.5">{story.built}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted uppercase tracking-wide">The Impact</p>
                    <p className="text-sm text-bridge-gold-dark font-medium mt-0.5">{story.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Counter + CTA */}
      <section className="py-20 md:py-28 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto text-center">
          <CommunityCounter />

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4 mt-8">
            Ready to start yours?
          </h2>
          <p className="text-secondary text-lg mb-8 max-w-xl mx-auto">
            Your partnership story starts with a 3-minute assessment. No account needed. Completely free.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/assess"
              className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-bridge-gold hover:bg-bridge-gold-dark rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Find Your Partner
              <span className="ml-2">&rarr;</span>
            </Link>
            <a
              href="mailto:stories@bridge-platform.com"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-secondary hover:text-bridge-gold border border-border hover:border-bridge-gold/30 rounded-full transition-all duration-200"
            >
              Share Your Story
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
