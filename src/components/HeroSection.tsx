import Link from 'next/link';

const particles = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  size: 4 + Math.random() * 8,
  left: `${5 + Math.random() * 90}%`,
  top: `${10 + Math.random() * 80}%`,
  delay: `${Math.random() * 5}s`,
  duration: `${4 + Math.random() * 4}s`,
  opacity: 0.15 + Math.random() * 0.25,
}));

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40 px-4">
      {/* Floating gold particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-bridge-gold animate-float"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
              opacity: p.opacity,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-[1.1] tracking-tight">
          Your Dream Deserves
          <br />
          <span className="bg-gradient-to-r from-bridge-gold to-bridge-gold-dark bg-clip-text text-transparent">
            a Partner
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 md:mt-8 text-lg md:text-xl text-secondary leading-relaxed max-w-2xl mx-auto">
          BRIDGE matches humans and AI into partnerships that build things the
          world has never seen.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/assess"
            className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-bridge-gold hover:bg-bridge-gold-dark rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Find Your Partner
            <span className="ml-2" aria-hidden="true">&rarr;</span>
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center px-6 py-4 text-base font-medium text-secondary hover:text-bridge-gold transition-colors duration-200"
          >
            See How It Works
          </a>
        </div>

        {/* Trust line */}
        <p className="mt-16 text-sm text-muted max-w-xl mx-auto leading-relaxed">
          Born from the partnership that built EZRE OS &mdash; 11 products,
          35 AI tools, 114 sessions, $0 VC.
        </p>
      </div>
    </section>
  );
}
