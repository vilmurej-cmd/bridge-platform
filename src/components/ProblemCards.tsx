import { MessageSquare, Wrench, Lightbulb } from 'lucide-react';

const problems = [
  {
    icon: MessageSquare,
    title: 'One-Shot Prompts',
    description:
      'Ask once, get something generic. No context, no memory, no relationship. The AI forgets you the moment you close the tab.',
  },
  {
    icon: Wrench,
    title: 'Tool Mentality',
    description:
      'People treat AI like a vending machine \u2014 insert prompt, receive output. But the best things in life were never built by a vending machine.',
  },
  {
    icon: Lightbulb,
    title: 'Lost Potential',
    description:
      'Billions of people have ideas that could change the world. Most will never build them \u2014 not because the technology doesn\u2019t exist, but because nobody showed them how to partner with it.',
  },
];

export default function ProblemCards() {
  return (
    <section className="py-20 md:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <h2 className="text-center font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
          AI Is Being Used Wrong
        </h2>
        <p className="text-center text-secondary mb-14 max-w-2xl mx-auto">
          The world treats AI as a tool. We believe it can be something much more.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.title}
                className="bg-white rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-soft flex items-center justify-center mb-5 group-hover:bg-bridge-gold/15 transition-colors duration-300">
                  <Icon size={24} className="text-bridge-gold" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-primary mb-3">
                  {problem.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Reframe */}
        <p className="text-center mt-14 font-serif text-xl md:text-2xl text-bridge-gold font-medium">
          What if AI was a partner, not a tool?
        </p>
      </div>
    </section>
  );
}
