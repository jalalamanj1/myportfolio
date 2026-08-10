import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';

export const Footer: React.FC = memo(function Footer() {
  const { lang } = useLang();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 w-full pb-12 px-4 text-center">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-6 glass-panel text-xs text-neutral-300 font-light">
        <div>
          <span className="font-serif text-sm font-medium text-white tracking-widest uppercase mr-2">
            {t('site.name', lang)}
          </span>
          <span>{t('footer.rights', lang)}</span>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/thebossadmin"
            className="text-[10px] uppercase tracking-widest text-neutral-500 hover:text-[#D7C4A3] transition-colors"
          >
            {t('footer.admin', lang)}
          </Link>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2 rounded-full glass-button group hover:border-[#D7C4A3]/50 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 text-white group-hover:text-[#D7C4A3] transition-colors" />
          </button>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={scrollToTop}
          className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full glass-button text-xs uppercase tracking-widest text-neutral-300 hover:text-[#D7C4A3] hover:border-[#D7C4A3]/60 transition-all cursor-pointer"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          {t('footer.top', lang)}
        </button>
      </div>
    </footer>
  );
});
