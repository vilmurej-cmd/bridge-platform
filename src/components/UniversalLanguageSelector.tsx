'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Globe, Search, X, Check } from 'lucide-react';
import { useLanguage, LANGUAGES, POPULAR_CODES, type Language } from '@/lib/language-context';

export default function UniversalLanguageSelector() {
  const { currentLanguage, setLanguage, recentLanguages, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Focus search input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 100);
    } else {
      setSearch('');
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [open]);

  const popularLanguages = useMemo(
    () => LANGUAGES.filter((l) => POPULAR_CODES.includes(l.code)),
    []
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return LANGUAGES;
    const q = search.toLowerCase();
    return LANGUAGES.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q)
    );
  }, [search]);

  const selectLanguage = (lang: Language) => {
    setLanguage(lang);
    setOpen(false);
  };

  const renderLangButton = (lang: Language) => {
    const isActive = lang.code === currentLanguage.code;
    return (
      <button
        key={lang.code}
        onClick={() => selectLanguage(lang)}
        className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
          isActive
            ? 'bg-bridge-gold/10 text-bridge-gold-dark font-medium'
            : 'text-secondary hover:bg-gold-soft hover:text-primary'
        }`}
      >
        <span className="flex items-center gap-3">
          <span className="text-muted text-xs w-8 font-mono">{lang.code}</span>
          <span>{lang.name}</span>
          <span className="text-muted text-xs">({lang.nativeName})</span>
        </span>
        {isActive && <Check size={16} className="text-bridge-gold flex-shrink-0" />}
      </button>
    );
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-sm text-secondary hover:text-bridge-gold hover:bg-gold-soft transition-all duration-200"
        aria-label="Change language"
        title={currentLanguage.name}
      >
        <Globe size={16} />
        <span className="hidden sm:inline text-xs font-medium uppercase tracking-wider">
          {currentLanguage.code}
        </span>
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden border border-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Globe size={20} className="text-bridge-gold" />
                <h2 className="font-serif font-semibold text-primary text-lg">Language</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-gold-soft transition-colors duration-200"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Search */}
            <div className="px-5 py-3 border-b border-border">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t('language.searchLanguages')}
                  className="w-full pl-9 pr-4 py-2.5 bg-cream rounded-xl text-sm text-primary placeholder:text-muted border border-border focus:border-bridge-gold focus:outline-none transition-colors duration-200"
                />
              </div>
            </div>

            {/* Language list */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
              {!search.trim() && (
                <>
                  {/* Recently used */}
                  {recentLanguages.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-muted uppercase tracking-wider px-3 mb-2">
                        {t('language.recentlyUsed')}
                      </p>
                      <div className="space-y-0.5">
                        {recentLanguages.map(renderLangButton)}
                      </div>
                    </div>
                  )}

                  {/* Popular */}
                  <div>
                    <p className="text-xs font-semibold text-muted uppercase tracking-wider px-3 mb-2">
                      {t('language.popular')}
                    </p>
                    <div className="space-y-0.5">
                      {popularLanguages.map(renderLangButton)}
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="border-t border-border" />

                  {/* All */}
                  <div>
                    <p className="text-xs font-semibold text-muted uppercase tracking-wider px-3 mb-2">
                      {t('language.allLanguages')}
                    </p>
                    <div className="space-y-0.5">
                      {LANGUAGES.map(renderLangButton)}
                    </div>
                  </div>
                </>
              )}

              {search.trim() && (
                <div className="space-y-0.5">
                  {filtered.length > 0 ? (
                    filtered.map(renderLangButton)
                  ) : (
                    <p className="text-sm text-muted text-center py-8">
                      No languages found for &ldquo;{search}&rdquo;
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-border bg-cream/50">
              <p className="text-xs text-muted text-center">
                Powered by LINGUA &mdash; 75+ languages
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
