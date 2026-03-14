import type { PartnershipSession } from '@/lib/demo-profile';

interface SessionRoadmapProps {
  sessions: PartnershipSession[];
}

export default function SessionRoadmap({ sessions }: SessionRoadmapProps) {
  return (
    <div className="relative pl-8">
      {/* Dashed gold connecting line */}
      <div
        className="absolute left-[13px] top-4 bottom-4 w-0.5 border-l-2 border-dashed border-bridge-gold/40"
        aria-hidden="true"
      />

      <div className="space-y-8">
        {sessions.map((session) => (
          <div key={session.session} className="relative">
            {/* Session number node */}
            <div className="absolute -left-8 top-0 w-7 h-7 rounded-full bg-bridge-gold text-white font-serif font-bold text-xs flex items-center justify-center shadow-sm z-10">
              {session.session}
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl p-6 border border-border">
              <h4 className="font-serif text-lg font-semibold text-primary mb-2">
                {session.title}
              </h4>
              <p className="text-secondary text-sm leading-relaxed mb-3">
                {session.focus}
              </p>
              <span className="inline-block px-3 py-1 text-xs font-medium text-bridge-teal bg-teal-50 rounded-full">
                {session.deliverable}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
