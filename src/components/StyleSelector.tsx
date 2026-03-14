'use client';

interface StyleOption {
  emoji: string;
  label: string;
  description: string;
}

interface StyleSelectorProps {
  options: StyleOption[];
  selected: string;
  onSelect: (label: string) => void;
  question: string;
}

export default function StyleSelector({
  options,
  selected,
  onSelect,
  question,
}: StyleSelectorProps) {
  return (
    <fieldset className="space-y-4">
      <legend className="font-serif text-lg md:text-xl font-semibold text-primary mb-4">
        {question}
      </legend>

      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selected === option.label;
          return (
            <button
              key={option.label}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(option.label)}
              className={`w-full flex items-start gap-4 text-left rounded-2xl p-5 border-2 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-l-4 border-l-bridge-gold border-t-bridge-gold/30 border-r-bridge-gold/30 border-b-bridge-gold/30 bg-gold-soft'
                  : 'border-border bg-white hover:border-border-gold hover:shadow-sm'
              }`}
            >
              {/* Radio indicator */}
              <div
                className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                  isSelected
                    ? 'border-bridge-gold'
                    : 'border-muted'
                }`}
              >
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-bridge-gold" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg" role="img" aria-hidden="true">
                    {option.emoji}
                  </span>
                  <span className="font-semibold text-primary text-sm">
                    {option.label}
                  </span>
                </div>
                <p className="text-muted text-xs mt-1 leading-relaxed">
                  {option.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
