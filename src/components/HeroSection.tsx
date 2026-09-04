import React, { memo } from 'react';
import { motion } from 'motion/react';
import { HERO_DATA } from '../data/portfolioData';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';

export const HeroSection: React.FC = memo(() => {
  const { lang } = useLang();

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="w-full min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light text-ink tracking-tight leading-[1.05] sm:leading-[1.05]">
          {HERO_DATA.name}
        </h1>

        <p
          className="mt-6 font-sans text-base sm:text-lg text-ink-soft max-w-xl mx-auto leading-relaxed"
          dir="auto"
        >
          {t('hero.statement', lang)}
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center items-center">
          <button onClick={scrollToWork} className="btn-primary">
            {t('hero.explore', lang)}
          </button>
          <button onClick={scrollToContact} className="btn-secondary">
            {t('hero.contact', lang)}
          </button>
        </div>
      </motion.div>
    </section>
  );
});
