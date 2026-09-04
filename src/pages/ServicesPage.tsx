import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, GraduationCap, Smartphone } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';
import { Seo, breadcrumbJsonLd } from '../components/Seo';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useLang();

  const crumbs = [
    { label: t('breadcrumb.home', lang), to: '/' },
    { label: t('services.page.title', lang) },
  ];

  const cards = [
    {
      title: t('prompts.title', lang),
      description: t('services.prompts.desc', lang),
      icon: Sparkles,
      path: '/services/Prompts',
    },
    {
      title: t('edu.title', lang),
      description: t('services.edu.desc', lang),
      icon: GraduationCap,
      path: '/services/Edu',
    },
    {
      title: t('apps.title', lang),
      description: t('services.apps.desc', lang),
      icon: Smartphone,
      path: '/services/Apps',
    },
  ];

  return (
    <div className="relative z-10 w-full min-h-screen pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <Seo
        title="Services — Jalal Amanj"
        description="Discover Jalal Amanj's online services: ready-to-use AI prompts, education resources, and software apps."
        path="/services"
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
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light text-ink tracking-tight leading-[0.95]">
            {t('services.page.title', lang)}
          </h1>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {cards.map((card, i) => (
            <motion.button
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => navigate(card.path)}
              className="card p-8 rounded-[28px] border border-line hover:border-accent flex flex-col items-center text-center gap-4 group transition-all duration-300 hover:shadow-2xl cursor-pointer"
            >
              <div className="p-4 rounded-2xl bg-accent-soft border border-line text-accent group-hover:bg-accent group-hover:text-white group-hover:scale-110 transition-all">
                <card.icon className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-light text-ink group-hover:text-accent transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-ink font-light leading-relaxed">
                {card.description}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
