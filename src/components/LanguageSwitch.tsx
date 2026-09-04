import React, { memo } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';

export const LanguageSwitch: React.FC = memo(function LanguageSwitch() {
  const { lang, setLang } = useLang();

  return (
    <button
      onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
      aria-label={t('lang.switch', lang)}
      className="fixed top-4 end-4 z-[60] px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase border border-line bg-paper backdrop-blur-md text-ink hover:border-accent transition-all cursor-pointer"
    >
      {lang === 'ar' ? 'EN' : 'AR'}
    </button>
  );
});
