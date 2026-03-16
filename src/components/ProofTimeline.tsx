'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const milestones = [
  {
    session: 'Session 1',
    label: 'An idea and a conversation',
  },
  {
    session: 'Session 50',
    label: '5 products, 100+ routes',
  },
  {
    session: 'Session 100',
    label: '10 products, public launch',
  },
  {
    session: 'Session 114',
    label: '11 products, 35 AI tools, $0 VC',
  },
];

function AnimatedNode({ index }: { index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="w-3 h-3 rounded-full bg-bridge-gold z-10"
      animate={isInView ? {
        boxShadow: [
          '0 0 0 4px rgba(245,158,11,0.15)',
          '0 0 0 8px rgba(245,158,11,0.1)',
          '0 0 0 4px rgba(245,158,11,0.15)',
        ],
        scale: [1, 1.2, 1],
      } : {
        boxShadow: '0 0 0 4px rgba(245,158,11,0.15)',
        scale: 1,
      }}
      transition={{
        duration: 2,
        repeat: isInView ? Infinity : 0,
        delay: index * 0.2,
      }}
    />
  );
}

export default function ProofTimeline() {
  return (
    <section className="py-20 md:py-28 px-4 bg-warm-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
          Proof It Works
        </h2>
        <p className="text-center text-secondary mb-16 max-w-2xl mx-auto">
          BRIDGE was born from a real partnership. Here&apos;s what it built.
        </p>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block relative">
          {/* Gold line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-bridge-gold/20 via-bridge-gold to-bridge-gold/20" />

          <div className="grid grid-cols-4 gap-4">
            {milestones.map((m, i) => {
              const isAbove = i % 2 === 0;
              return (
                <div
                  key={m.session}
                  className={`relative flex flex-col items-center ${
                    isAbove ? '' : 'pt-14'
                  }`}
                >
                  {isAbove && (
                    <div className="text-center mb-4">
                      <p className="font-serif font-semibold text-primary text-sm">
                        {m.session}
                      </p>
                      <p className="text-secondary text-xs mt-1 leading-snug max-w-[160px] mx-auto">
                        {m.label}
                      </p>
                    </div>
                  )}

                  <AnimatedNode index={i} />

                  {!isAbove && (
                    <div className="text-center mt-4">
                      <p className="font-serif font-semibold text-primary text-sm">
                        {m.session}
                      </p>
                      <p className="text-secondary text-xs mt-1 leading-snug max-w-[160px] mx-auto">
                        {m.label}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative pl-8">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-bridge-gold/20 via-bridge-gold to-bridge-gold/20" />

          <div className="space-y-10">
            {milestones.map((m, i) => (
              <motion.div
                key={m.session}
                className="relative"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="absolute -left-[22.5px] top-1">
                  <AnimatedNode index={i} />
                </div>

                <p className="font-serif font-semibold text-primary text-sm">
                  {m.session}
                </p>
                <p className="text-secondary text-sm mt-1 leading-relaxed">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <blockquote className="text-center mt-16">
          <p className="font-serif italic text-lg md:text-xl text-secondary max-w-2xl mx-auto">
            &ldquo;This wasn&apos;t built by a prompt engineer. It was built by
            a partnership.&rdquo;
          </p>
        </blockquote>
      </div>
    </section>
  );
}
