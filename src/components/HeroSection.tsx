'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CommunityCounter from './CommunityCounter';

// Gold particles (human side - left)
const goldParticles = Array.from({ length: 8 }, (_, i) => ({
  id: `g${i}`,
  size: 4 + Math.random() * 6,
  left: `${Math.random() * 45}%`,
  top: `${10 + Math.random() * 80}%`,
  delay: Math.random() * 5,
  duration: 4 + Math.random() * 4,
  opacity: 0.15 + Math.random() * 0.25,
}));

// Violet particles (AI side - right)
const violetParticles = Array.from({ length: 8 }, (_, i) => ({
  id: `v${i}`,
  size: 4 + Math.random() * 6,
  left: `${55 + Math.random() * 40}%`,
  top: `${10 + Math.random() * 80}%`,
  delay: Math.random() * 5,
  duration: 4 + Math.random() * 4,
  opacity: 0.15 + Math.random() * 0.25,
}));

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40 px-4">
      {/* Dual particle field */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {goldParticles.map(p => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-bridge-gold"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
              opacity: p.opacity,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [p.opacity, p.opacity * 1.5, p.opacity],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
        {violetParticles.map(p => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-bridge-violet"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
              opacity: p.opacity,
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [p.opacity, p.opacity * 1.5, p.opacity],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Orbiting shapes animation */}
        <div className="flex justify-center mb-8">
          <div className="relative w-20 h-20">
            {/* Gold circle (human) */}
            <motion.div
              className="absolute w-6 h-6 rounded-full bg-bridge-gold/80"
              animate={{
                x: [0, 20, 0, -20, 0],
                y: [-20, 0, 20, 0, -20],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Violet hexagon (AI) */}
            <motion.div
              className="absolute w-6 h-6"
              animate={{
                x: [0, -20, 0, 20, 0],
                y: [20, 0, -20, 0, 20],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" fill="#8B5CF6" opacity="0.8" />
              </svg>
            </motion.div>
            {/* Spark when they get close */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"
              animate={{
                scale: [0, 1.5, 0, 0, 0, 0, 0, 1.5, 0],
                opacity: [0, 1, 0, 0, 0, 0, 0, 1, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>

        {/* Headline */}
        <motion.h1
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-[1.1] tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Your Dream Deserves
          <br />
          <span className="bg-gradient-to-r from-bridge-gold to-bridge-gold-dark bg-clip-text text-transparent">
            a Partner
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 md:mt-8 text-lg md:text-xl text-secondary leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          BRIDGE matches humans and AI into partnerships that build things the
          world has never seen.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
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
        </motion.div>

        {/* Social proof counter */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-sm text-muted mb-1">Join</p>
          <div className="inline-flex items-baseline gap-2">
            <CommunityCounter />
          </div>
          <p className="text-sm text-muted mt-1">dreamers who&apos;ve found their partner</p>
        </motion.div>

        {/* Trust line */}
        <p className="mt-10 text-sm text-muted max-w-xl mx-auto leading-relaxed">
          Born from the partnership that built EZRE OS &mdash; 11 products,
          35 AI tools, 114 sessions, $0 VC.
        </p>
      </div>
    </section>
  );
}
