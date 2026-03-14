import {
  GraduationCap,
  Heart,
  Music,
  Rocket,
  Microscope,
  Globe,
} from 'lucide-react';

const personas = [
  {
    icon: GraduationCap,
    name: 'The Teacher',
    description:
      'You see a classroom full of students who deserve better tools. An app, a platform, a new way to learn \u2014 and you know exactly what they need.',
    color: 'text-bridge-gold',
    bg: 'bg-gold-soft',
  },
  {
    icon: Heart,
    name: 'The Healer',
    description:
      'You work in healthcare and see the gaps every day. A patient portal, a wellness tracker, a communication tool that actually works for real people.',
    color: 'text-bridge-rose',
    bg: 'bg-pink-50',
  },
  {
    icon: Music,
    name: 'The Creator',
    description:
      'You make things \u2014 music, art, stories, experiences. You have an idea for a platform that would change how people discover and share creative work.',
    color: 'text-bridge-violet',
    bg: 'bg-violet-soft',
  },
  {
    icon: Rocket,
    name: 'The Founder',
    description:
      'You have a startup idea burning a hole in your notebook. You know the market, you know the problem \u2014 you just need a technical partner who gets it.',
    color: 'text-bridge-gold-dark',
    bg: 'bg-amber-50',
  },
  {
    icon: Microscope,
    name: 'The Researcher',
    description:
      'You have data, hypotheses, and breakthroughs waiting to happen. You need a partner who can build the tools to analyze, visualize, and share your work.',
    color: 'text-bridge-teal',
    bg: 'bg-teal-50',
  },
  {
    icon: Globe,
    name: 'The Dreamer',
    description:
      'You\u2019re 16. You\u2019re in Lagos, or Lima, or Louisville. You have an idea that could help your community \u2014 and nobody has told you it\u2019s possible yet.',
    color: 'text-bridge-blue',
    bg: 'bg-blue-50',
  },
];

export default function PersonaGrid() {
  return (
    <section className="py-20 md:py-28 px-4 bg-warm-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
          Who Is BRIDGE For?
        </h2>
        <p className="text-center text-secondary mb-14 max-w-2xl mx-auto">
          Anyone with a dream and the willingness to show up. That&apos;s it.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona) => {
            const Icon = persona.icon;
            return (
              <div
                key={persona.name}
                className="bg-white rounded-2xl p-6 border border-border hover:border-bridge-gold/40 hover:shadow-md transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${persona.bg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}
                >
                  <Icon size={24} className={persona.color} />
                </div>
                <h3 className="font-serif text-lg font-semibold text-primary mb-2">
                  {persona.name}
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  {persona.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
