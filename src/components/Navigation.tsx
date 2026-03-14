'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/stories', label: 'Stories' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`sticky top-0 z-50 bg-cream/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? 'shadow-md shadow-black/[0.04]' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-serif font-bold tracking-tight bg-gradient-to-r from-bridge-gold to-bridge-gold-dark bg-clip-text text-transparent group-hover:from-bridge-gold-dark group-hover:to-bridge-gold transition-all duration-300">
              BRIDGE
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 relative ${
                    isActive
                      ? 'text-bridge-gold'
                      : 'text-secondary hover:text-bridge-gold'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-bridge-gold rounded-full" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/assess"
              className="inline-flex items-center px-5 py-2 text-sm font-semibold text-white bg-bridge-gold hover:bg-bridge-gold-dark rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Start Building
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-xl text-secondary hover:text-bridge-gold hover:bg-gold-soft transition-colors duration-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-cream/95 backdrop-blur-md">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-bridge-gold bg-gold-soft'
                      : 'text-secondary hover:text-bridge-gold hover:bg-gold-soft'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/assess"
              className="block mx-4 mt-3 text-center px-5 py-3 text-sm font-semibold text-white bg-bridge-gold hover:bg-bridge-gold-dark rounded-full transition-all duration-200"
            >
              Start Building
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
