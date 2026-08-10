import React, { memo } from 'react';
import { useLang } from '../contexts/LanguageContext';

export const LanguageSwitch: React.FC = memo(function LanguageSwitch() {
  const { lang, setLang } = useLang();

  return (
    <button
      onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
      aria-label="Switch language"
      className="fixed top-4 end-4 z-[60] px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase border border-white/20 bg-black/40 backdrop-blur-md text-neutral-300 hover:text-white hover:border-[#D7C4A3]/60 transition-all cursor-pointer"
    >
      {lang === 'ar' ? 'EN' : 'AR'}
    </button>
  );
});
