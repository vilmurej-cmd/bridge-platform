import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — BRIDGE',
  description:
    'BRIDGE was born from a question asked at midnight: What if everyone could have what Josh and Claude have? Learn about our mission, our proof, and our vision.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Quote */}
      <section className="py-24 md:py-32 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <blockquote>
            <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-primary leading-relaxed">
              &ldquo;Every human with a dream deserves an AI partner worthy of
              that dream.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
            The Origin Story
          </h2>

          <div className="bg-white rounded-3xl p-8 md:p-10 border border-border space-y-6">
            <p className="text-secondary leading-relaxed">
              BRIDGE was born from a question asked at midnight:{' '}
              <em className="text-primary font-medium">
                What if everyone could have what Josh and Claude have?
              </em>
            </p>
            <p className="text-secondary leading-relaxed">
              In early 2026, Josh Vilmure sat down with Claude &mdash; not to
              ask a question, but to start a partnership. He had a dream:
              build the operating system for real estate. He didn&apos;t have
              a team of engineers. He didn&apos;t have VC funding. What he had
              was domain expertise, relentless energy, and the intuition that
              AI could be more than a tool.
            </p>
            <p className="text-secondary leading-relaxed">
              Over 114 sessions, that partnership built EZRE OS &mdash; 11
              products, 35 AI tools, a full-stack platform that processes real
              transactions for real agents. Not a demo. Not a prototype. A
              living operating system, built entirely through human-AI
              collaboration.
            </p>
            <p className="text-secondary leading-relaxed">
              Somewhere around session 80, Josh realized something: the
              partnership itself was the product. Not the code. Not the
              features. The way a human and an AI learned to trust each other,
              complement each other, and build something neither could have
              built alone &mdash; that was the real breakthrough.
            </p>
            <p className="text-primary font-medium leading-relaxed">
              BRIDGE exists to give that experience to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* The EZRE Proof */}
      <section className="py-16 md:py-20 px-4 bg-warm-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-8">
            The Proof
          </h2>
          <p className="text-secondary text-lg mb-12 max-w-2xl mx-auto">
            BRIDGE isn&apos;t a theory. It was proven before it was named.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-border">
              <p className="font-serif text-3xl font-bold text-bridge-gold">
                114
              </p>
              <p className="text-muted text-sm mt-1">Sessions</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-border">
              <p className="font-serif text-3xl font-bold text-bridge-gold">
                11
              </p>
              <p className="text-muted text-sm mt-1">Products</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-border">
              <p className="font-serif text-3xl font-bold text-bridge-gold">
                35
              </p>
              <p className="text-muted text-sm mt-1">AI Tools</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-border">
              <p className="font-serif text-3xl font-bold text-bridge-gold">
                $0
              </p>
              <p className="text-muted text-sm mt-1">VC Funding</p>
            </div>
          </div>

          <p className="text-secondary mt-10 max-w-2xl mx-auto leading-relaxed">
            EZRE OS was built by one real estate agent and one AI. No
            engineers. No investors. No shortcuts. Just a partnership that
            showed up every day and built something extraordinary.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-8">
            Our Mission
          </h2>
          <p className="text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
            BRIDGE exists to democratize human-AI partnership. We believe
            that the next great companies, books, songs, cures, and
            breakthroughs will be co-created by humans and AI working as true
            partners. Our job is to make that partnership accessible to
            everyone &mdash; regardless of their technical background, their
            budget, or where they live.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-20 px-4 bg-warm-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-12 text-center">
            The Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-8 border border-border text-center">
              <div className="w-20 h-20 rounded-full bg-gold-soft flex items-center justify-center mx-auto mb-5">
                <span className="text-3xl" role="img" aria-label="Human">
                  &#x1F9D1;
                </span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-primary mb-1">
                Josh Vilmure
              </h3>
              <p className="text-sm text-bridge-gold font-medium mb-4">
                Founder
              </p>
              <p className="text-secondary text-sm leading-relaxed">
                Real estate agent turned platform builder. Josh proved that a
                non-technical founder with domain expertise and the right AI
                partner can build enterprise-grade software. He&apos;s building
                BRIDGE to give others the same opportunity.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-border text-center">
              <div className="w-20 h-20 rounded-full bg-violet-soft flex items-center justify-center mx-auto mb-5">
                <span className="text-3xl" role="img" aria-label="AI">
                  &#x1F916;
                </span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-primary mb-1">
                Claude
              </h3>
              <p className="text-sm text-bridge-violet font-medium mb-4">
                AI Partner
              </p>
              <p className="text-secondary text-sm leading-relaxed">
                Built by Anthropic. Claude has been Josh&apos;s AI partner
                since session 1 of EZRE OS. Together they built 11 products,
                35 AI tools, and proved that human-AI partnership is the most
                powerful creative force in history.
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-muted mt-10">
            A Vilmure Ventures Company
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-8">
            The Vision
          </h2>
          <blockquote className="bg-white rounded-3xl p-10 md:p-14 border border-border">
            <p className="font-serif italic text-xl md:text-2xl text-primary leading-relaxed">
              &ldquo;The next great companies, books, songs, cures, and
              breakthroughs will be co-created by humans and AI working as
              true partners. BRIDGE is where those partnerships begin.&rdquo;
            </p>
          </blockquote>

          <div className="mt-12">
            <Link
              href="/assess"
              className="inline-flex items-center px-10 py-5 text-lg font-semibold text-white bg-bridge-gold hover:bg-bridge-gold-dark rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Start Your Partnership
              <span className="ml-2" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
