import { Pencil, Sparkles, Users, Layers } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: Pencil,
    title: 'Describe Your Dream',
    description:
      'Tell us about the thing you want to build \u2014 in your own words, at your own pace. No jargon required. We just need the spark.',
  },
  {
    number: 2,
    icon: Sparkles,
    title: 'Discover Your Strengths',
    description:
      'A gentle assessment reveals what you bring to the table \u2014 creativity, domain expertise, persistence, vision. Every strength matters.',
  },
  {
    number: 3,
    icon: Users,
    title: 'Meet Your Partner',
    description:
      'BRIDGE designs an AI partner whose strengths complement yours. Not a generic chatbot \u2014 a collaborator crafted for your unique dream.',
    accent: true,
  },
  {
    number: 4,
    icon: Layers,
    title: 'Build Together',
    description:
      'Follow a personalized session roadmap. Each session has a clear goal and a real deliverable. Watch your dream take shape, session by session.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
          How It Works
        </h2>
        <p className="text-center text-secondary mb-16 max-w-2xl mx-auto">
          Four steps from dream to reality. No coding experience required.
        </p>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-bridge-gold/10 via-bridge-gold/40 to-bridge-gold/10 -translate-x-1/2" />

          <div className="space-y-12 lg:space-y-20">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-16 items-center ${
                    isEven ? '' : 'lg:direction-rtl'
                  }`}
                >
                  {/* Number node on the line (desktop) */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-bridge-gold text-white font-serif font-bold text-sm items-center justify-center shadow-md">
                    {step.number}
                  </div>

                  {/* Card */}
                  <div
                    className={`${
                      isEven
                        ? 'lg:col-start-1 lg:text-right lg:pr-12'
                        : 'lg:col-start-2 lg:text-left lg:pl-12'
                    }`}
                  >
                    <div
                      className={`bg-white rounded-2xl p-8 border border-border shadow-sm ${
                        step.accent
                          ? 'ring-1 ring-bridge-gold/20'
                          : ''
                      }`}
                    >
                      <div
                        className={`flex items-center gap-4 mb-4 ${
                          isEven ? 'lg:flex-row-reverse' : ''
                        }`}
                      >
                        {/* Mobile step number */}
                        <div className="lg:hidden w-8 h-8 rounded-full bg-bridge-gold text-white font-serif font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {step.number}
                        </div>
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            step.accent
                              ? 'bg-gradient-to-br from-gold-soft to-violet-soft'
                              : 'bg-gold-soft'
                          }`}
                        >
                          <Icon
                            size={24}
                            className={
                              step.accent
                                ? 'text-bridge-violet'
                                : 'text-bridge-gold'
                            }
                          />
                        </div>
                        <h3 className="font-serif text-xl font-semibold text-primary">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-secondary text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty column for zigzag */}
                  <div
                    className={`hidden lg:block ${
                      isEven ? 'lg:col-start-2' : 'lg:col-start-1'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
