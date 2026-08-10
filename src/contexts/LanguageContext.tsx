import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Lang } from '../i18n';

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'ar',
  setLang: () => {},
  dir: 'rtl',
});

const STORAGE_KEY = 'portfolio_lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'ar' || stored === 'en') return stored;
    } catch {}
    return 'ar';
  });

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
