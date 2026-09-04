import React, { memo } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';

export const Footer: React.FC = memo(function Footer() {
  const { lang } = useLang();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-line bg-paper px-6 sm:px-8 pb-10 pt-12">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        <button
          onClick={scrollToTop}
          className="flex items-center gap-3 cursor-pointer group"
          aria-label={t('site.name', lang)}
        >
          <img
            src={`${import.meta.env.BASE_URL}logo.webp`}
            alt={t('site.name', lang)}
            className="w-9 h-9 rounded-full object-cover border border-line"
          />
          <span className="font-serif text-[15px] font-medium tracking-[0.14em] text-ink uppercase">
            {t('site.name', lang)}
          </span>
        </button>

        <p className="text-[13px] text-ink-muted">{t('footer.rights', lang)}</p>
      </div>
    </footer>
  );
});
