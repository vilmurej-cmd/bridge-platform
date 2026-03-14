import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import ProblemCards from '@/components/ProblemCards';
import ProofTimeline from '@/components/ProofTimeline';
import HowItWorks from '@/components/HowItWorks';
import PersonaGrid from '@/components/PersonaGrid';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* The Problem */}
      <ProblemCards />

      {/* Proof */}
      <ProofTimeline />

      {/* How It Works */}
      <HowItWorks />

      {/* Who It's For */}
      <PersonaGrid />

      {/* Quote Section */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <blockquote className="bg-white rounded-3xl p-10 md:p-14 border border-border text-center">
            <p className="font-serif italic text-xl md:text-2xl lg:text-3xl text-primary leading-relaxed">
              &ldquo;The quality of what an AI builds is directly proportional to
              the quality of the human relationship behind it.&rdquo;
            </p>
            <footer className="mt-6 text-sm text-muted">
              &mdash; The BRIDGE Thesis
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Ready to meet your partner?
          </h2>
          <p className="text-secondary text-lg mb-10 max-w-xl mx-auto">
            Take the partnership assessment and discover the AI collaborator
            your dream deserves.
          </p>
          <Link
            href="/assess"
            className="inline-flex items-center px-10 py-5 text-lg font-semibold text-white bg-bridge-gold hover:bg-bridge-gold-dark rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Take the Partnership Assessment
            <span className="ml-2" aria-hidden="true">
              &rarr;
            </span>
          </Link>
          <p className="mt-6 text-sm text-muted">
            3 minutes. No account needed. Completely free.
          </p>
        </div>
      </section>
    </>
  );
}
