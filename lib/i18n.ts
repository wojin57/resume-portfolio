'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

export type Lang = 'ko' | 'en';

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ko',
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko');

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null;
    if (stored === 'ko' || stored === 'en') setLang(stored);
  }, []);

  const toggle = () => {
    setLang((prev) => {
      const next: Lang = prev === 'ko' ? 'en' : 'ko';
      localStorage.setItem('lang', next);
      return next;
    });
  };

  return React.createElement(
    LanguageContext.Provider,
    { value: { lang, toggle } },
    children
  );
}

export function useLanguage(): LanguageContextType {
  return useContext(LanguageContext);
}
