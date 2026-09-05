import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Compass } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';
import { Seo } from '../components/Seo';

export const NotFoundPage: React.FC = () => {
  const { lang } = useLang();

  return (
    <div className="relative z-10 w-full min-h-screen pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <Seo
        title={`404 — ${t('notFound.title', lang)} | Jalal Amanj`}
        description="The page you are looking for could not be found on Jalal Amanj's portfolio."
        path="/404"
        noindex
      />
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="card p-12 text-center rounded-[32px] border border-line flex flex-col items-center"
        >
          <p className="font-serif text-7xl sm:text-8xl font-light text-accent tracking-tight">404</p>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent my-6" />
          <span className="w-12 h-12 rounded-full bg-accent-soft text-accent flex items-center justify-center mb-5">
            <Compass className="w-6 h-6" />
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-ink">{t('notFound.title', lang)}</h1>
          <p className="mt-3 text-sm text-ink-muted font-light max-w-md leading-relaxed">
            {t('notFound.desc', lang)}
          </p>
          <Link
            to="/"
            className="mt-8 btn-primary"
          >
            {t('notFound.home', lang)}
          </Link>
        </motion.div>
      </div>
    </div>
  );
};