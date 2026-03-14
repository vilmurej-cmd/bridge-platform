interface StoryCardProps {
  title: string;
  description: string;
  badge?: string;
  isPlaceholder?: boolean;
  stats?: { label: string; value: string }[];
}

export default function StoryCard({
  title,
  description,
  badge,
  isPlaceholder = false,
  stats,
}: StoryCardProps) {
  return (
    <div
      className={`rounded-2xl p-6 border transition-all duration-300 ${
        isPlaceholder
          ? 'bg-warm-white border-dashed border-border opacity-70'
          : 'bg-white border-border hover:shadow-md'
      }`}
    >
      {/* Badge */}
      {badge && (
        <span
          className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 ${
            isPlaceholder
              ? 'bg-border text-muted'
              : 'bg-gold-soft text-bridge-gold-dark'
          }`}
        >
          {badge}
        </span>
      )}
      {isPlaceholder && !badge && (
        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 bg-border text-muted">
          Coming Soon
        </span>
      )}

      {/* Title */}
      <h3
        className={`font-serif text-lg font-semibold mb-2 ${
          isPlaceholder ? 'text-muted' : 'text-primary'
        }`}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={`text-sm leading-relaxed ${
          isPlaceholder ? 'text-muted' : 'text-secondary'
        }`}
      >
        {description}
      </p>

      {/* Stats row */}
      {stats && stats.length > 0 && !isPlaceholder && (
        <div className="mt-5 pt-4 border-t border-border flex items-center gap-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-lg font-serif font-bold text-primary">
                {stat.value}
              </p>
              <p className="text-xs text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
