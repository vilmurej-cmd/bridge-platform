'use client';

import { Check } from 'lucide-react';

interface StrengthCardProps {
  emoji: string;
  name: string;
  description: string;
  selected: boolean;
  onToggle: () => void;
}

export default function StrengthCard({
  emoji,
  name,
  description,
  selected,
  onToggle,
}: StrengthCardProps) {
  return (
    <button
      type="button"
      role="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={`relative w-full text-left rounded-2xl p-5 border-2 transition-all duration-200 cursor-pointer group ${
        selected
          ? 'border-bridge-gold bg-gold-soft shadow-[0_0_0_3px_rgba(245,158,11,0.15)] scale-[1.02]'
          : 'border-border bg-white hover:shadow-md hover:border-border-gold'
      }`}
    >
      {/* Checkbox indicator */}
      <div
        className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
          selected
            ? 'bg-bridge-gold text-white'
            : 'bg-transparent border-2 border-border group-hover:border-muted'
        }`}
      >
        {selected && <Check size={14} strokeWidth={3} />}
      </div>

      {/* Content */}
      <div className="pr-8">
        <span className="text-2xl" role="img" aria-hidden="true">
          {emoji}
        </span>
        <h3 className="font-semibold text-primary mt-2 text-sm">{name}</h3>
        <p className="text-muted text-xs mt-1 leading-relaxed">{description}</p>
      </div>
    </button>
  );
}
