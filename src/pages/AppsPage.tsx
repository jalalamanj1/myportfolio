import React from 'react';
import { motion } from 'motion/react';
import { Smartphone } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';
import { Seo, breadcrumbJsonLd } from '../components/Seo';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const AppsPage: React.FC = () => {
  const { lang } = useLang();

  const crumbs = [
    { label: t('breadcrumb.home', lang), to: '/' },
    { label: t('services.page.title', lang), to: '/services' },
    { label: t('apps.title', lang) },
  ];

  return (
    <div className="relative z-10 w-full min-h-screen pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <Seo
        title="Apps & Software — Jalal Amanj"
        description="Desktop applications and software by Jalal Amanj, including Murshid and Edara."
        path="/services/Apps"
        jsonLd={[breadcrumbJsonLd(crumbs)]}
      />
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Breadcrumbs items={crumbs} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="card p-10 text-center rounded-[32px] border border-line max-w-2xl mx-auto">
            <Smartphone className="w-10 h-10 text-accent mx-auto mb-4" />
            <h1 className="font-serif text-5xl sm:text-6xl font-light text-ink tracking-tight mb-4">
              {t('apps.title', lang)}
            </h1>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6" />
            <p className="text-xs text-ink font-light leading-relaxed max-w-md mx-auto">
              {t('apps.desc', lang)}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
