import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-warm-white">
      {/* Gold accent line */}
      <div className="h-1 bg-gradient-to-r from-bridge-gold/20 via-bridge-gold to-bridge-gold/20" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quote */}
        <blockquote className="text-center mb-12">
          <p className="font-serif italic text-lg md:text-xl text-secondary leading-relaxed max-w-3xl mx-auto">
            &ldquo;The quality of what an AI builds is directly proportional to
            the quality of the human relationship behind it.&rdquo;
          </p>
        </blockquote>

        {/* Brand */}
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-secondary tracking-wide">
            <span className="font-serif font-bold text-primary">BRIDGE</span>
            {' '}&mdash; A Vilmure Ventures Company
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center justify-center gap-8">
          <Link
            href="/about"
            className="text-sm text-muted hover:text-bridge-gold transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-muted hover:text-bridge-gold transition-colors duration-200"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-sm text-muted hover:text-bridge-gold transition-colors duration-200"
          >
            Terms
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} BRIDGE. Built with warmth, powered by partnership.
          </p>
        </div>
      </div>
    </footer>
  );
}
