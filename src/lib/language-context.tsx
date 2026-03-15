'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getCachedTranslation, setCachedTranslation } from './translation-cache';

// Static translations
import en from '@/translations/en.json';
import es from '@/translations/es.json';
import zhCN from '@/translations/zh-CN.json';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  rtl?: boolean;
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Espanol' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '\u7b80\u4f53\u4e2d\u6587' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '\u7e41\u9ad4\u4e2d\u6587' },
  { code: 'hi', name: 'Hindi', nativeName: '\u0939\u093f\u0928\u094d\u0926\u0940' },
  { code: 'ar', name: 'Arabic', nativeName: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629', rtl: true },
  { code: 'bn', name: 'Bengali', nativeName: '\u09ac\u09be\u0982\u09b2\u09be' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Portugu\u00eas' },
  { code: 'ru', name: 'Russian', nativeName: '\u0420\u0443\u0441\u0441\u043a\u0438\u0439' },
  { code: 'ja', name: 'Japanese', nativeName: '\u65e5\u672c\u8a9e' },
  { code: 'ko', name: 'Korean', nativeName: '\ud55c\uad6d\uc5b4' },
  { code: 'fr', name: 'French', nativeName: 'Fran\u00e7ais' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'tr', name: 'Turkish', nativeName: 'T\u00fcrk\u00e7e' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Ti\u1ebfng Vi\u1ec7t' },
  { code: 'th', name: 'Thai', nativeName: '\u0e44\u0e17\u0e22' },
  { code: 'uk', name: 'Ukrainian', nativeName: '\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430' },
  { code: 'cs', name: 'Czech', nativeName: '\u010ce\u0161tina' },
  { code: 'ro', name: 'Romanian', nativeName: 'Rom\u00e2n\u0103' },
  { code: 'el', name: 'Greek', nativeName: '\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
  { code: 'sk', name: 'Slovak', nativeName: 'Sloven\u010dina' },
  { code: 'bg', name: 'Bulgarian', nativeName: '\u0411\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski' },
  { code: 'sr', name: 'Serbian', nativeName: '\u0421\u0440\u043f\u0441\u043a\u0438' },
  { code: 'sl', name: 'Slovenian', nativeName: 'Sloven\u0161\u010dina' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvi\u0173' },
  { code: 'lv', name: 'Latvian', nativeName: 'Latvie\u0161u' },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'tl', name: 'Filipino', nativeName: 'Tagalog' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
  { code: 'fa', name: 'Persian', nativeName: '\u0641\u0627\u0631\u0633\u06cc', rtl: true },
  { code: 'he', name: 'Hebrew', nativeName: '\u05e2\u05d1\u05e8\u05d9\u05ea', rtl: true },
  { code: 'ur', name: 'Urdu', nativeName: '\u0627\u0631\u062f\u0648', rtl: true },
  { code: 'ta', name: 'Tamil', nativeName: '\u0ba4\u0bae\u0bbf\u0bb4\u0bcd' },
  { code: 'te', name: 'Telugu', nativeName: '\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41' },
  { code: 'ml', name: 'Malayalam', nativeName: '\u0d2e\u0d32\u0d2f\u0d3e\u0d33\u0d02' },
  { code: 'kn', name: 'Kannada', nativeName: '\u0c95\u0ca8\u0ccd\u0ca8\u0ca1' },
  { code: 'mr', name: 'Marathi', nativeName: '\u092e\u0930\u093e\u0920\u0940' },
  { code: 'gu', name: 'Gujarati', nativeName: '\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0' },
  { code: 'pa', name: 'Punjabi', nativeName: '\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40' },
  { code: 'ne', name: 'Nepali', nativeName: '\u0928\u0947\u092a\u093e\u0932\u0940' },
  { code: 'si', name: 'Sinhala', nativeName: '\u0dc3\u0dd2\u0d82\u0dc4\u0dbd' },
  { code: 'my', name: 'Burmese', nativeName: '\u1019\u103c\u1014\u103a\u1019\u102c' },
  { code: 'km', name: 'Khmer', nativeName: '\u1781\u17d2\u1798\u17c2\u179a' },
  { code: 'lo', name: 'Lao', nativeName: '\u0ea5\u0eb2\u0ea7' },
  { code: 'ka', name: 'Georgian', nativeName: '\u10e5\u10d0\u10e0\u10d7\u10e3\u10da\u10d8' },
  { code: 'hy', name: 'Armenian', nativeName: '\u0540\u0561\u0575\u0565\u0580\u0565\u0576' },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Az\u0259rbaycanca' },
  { code: 'kk', name: 'Kazakh', nativeName: '\u049a\u0430\u0437\u0430\u049b\u0448\u0430' },
  { code: 'uz', name: 'Uzbek', nativeName: 'O\u02bbzbekcha' },
  { code: 'mn', name: 'Mongolian', nativeName: '\u041c\u043e\u043d\u0433\u043e\u043b' },
  { code: 'am', name: 'Amharic', nativeName: '\u12a0\u121b\u122d\u129b' },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yor\u00f9b\u00e1' },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans' },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip' },
  { code: 'mk', name: 'Macedonian', nativeName: '\u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0441\u043a\u0438' },
  { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski' },
  { code: 'is', name: 'Icelandic', nativeName: '\u00cdslenska' },
  { code: 'mt', name: 'Maltese', nativeName: 'Malti' },
  { code: 'cy', name: 'Welsh', nativeName: 'Cymraeg' },
  { code: 'ga', name: 'Irish', nativeName: 'Gaeilge' },
  { code: 'eu', name: 'Basque', nativeName: 'Euskara' },
  { code: 'ca', name: 'Catalan', nativeName: 'Catal\u00e0' },
  { code: 'gl', name: 'Galician', nativeName: 'Galego' },
];

const POPULAR_CODES = ['en', 'es', 'zh-CN', 'fr', 'de', 'ja', 'ko', 'pt', 'ar', 'hi', 'ru', 'it'];

type TranslationDict = Record<string, Record<string, string>>;

const staticTranslations: Record<string, TranslationDict> = {
  en: en as unknown as TranslationDict,
  es: es as unknown as TranslationDict,
  'zh-CN': zhCN as unknown as TranslationDict,
};

interface LanguageContextValue {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translateAsync: (text: string) => Promise<string>;
  isRTL: boolean;
  recentLanguages: Language[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  const parts = path.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === 'string' ? current : undefined;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES[0]);
  const [recentLanguages, setRecentLanguages] = useState<Language[]>([]);

  // Load saved language on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bridge_lingua_lang');
      if (saved) {
        const lang = LANGUAGES.find((l) => l.code === saved);
        if (lang) setCurrentLanguage(lang);
      }
      const recentRaw = localStorage.getItem('bridge_lingua_recent');
      if (recentRaw) {
        const codes: string[] = JSON.parse(recentRaw);
        setRecentLanguages(codes.map((c) => LANGUAGES.find((l) => l.code === c)).filter(Boolean) as Language[]);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Update document direction for RTL languages
  useEffect(() => {
    document.documentElement.dir = currentLanguage.rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage.code;
  }, [currentLanguage]);

  const setLanguage = useCallback((lang: Language) => {
    setCurrentLanguage(lang);
    try {
      localStorage.setItem('bridge_lingua_lang', lang.code);
      // Update recent languages
      setRecentLanguages((prev) => {
        const filtered = prev.filter((l) => l.code !== lang.code);
        const updated = [lang, ...filtered].slice(0, 5);
        localStorage.setItem('bridge_lingua_recent', JSON.stringify(updated.map((l) => l.code)));
        return updated;
      });
    } catch {
      // Ignore
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      const dict = staticTranslations[currentLanguage.code];
      if (dict) {
        const val = getNestedValue(dict as unknown as Record<string, unknown>, key);
        if (val) return val;
      }
      // Fallback to English
      const enVal = getNestedValue(en as unknown as Record<string, unknown>, key);
      return enVal || key;
    },
    [currentLanguage.code]
  );

  const translateAsync = useCallback(
    async (text: string): Promise<string> => {
      if (currentLanguage.code === 'en') return text;

      // Check cache
      const cached = getCachedTranslation(text, currentLanguage.code);
      if (cached) return cached;

      try {
        const res = await fetch('/api/translate-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, targetLanguage: currentLanguage.code }),
        });

        if (!res.ok) return text;

        const data = await res.json();
        const translated = data.translated || text;
        setCachedTranslation(text, currentLanguage.code, translated);
        return translated;
      } catch {
        return text;
      }
    },
    [currentLanguage.code]
  );

  const isRTL = currentLanguage.rtl === true;

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, setLanguage, t, translateAsync, isRTL, recentLanguages }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}

export { POPULAR_CODES };
