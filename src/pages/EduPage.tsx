import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { GraduationCap, ArrowUpRight, Bot } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';
import { Seo, breadcrumbJsonLd } from '../components/Seo';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const EduPage: React.FC = () => {
  const { lang } = useLang();
  const navigate = useNavigate();

  const crumbs = [
    { label: t('breadcrumb.home', lang), to: '/' },
    { label: t('services.page.title', lang), to: '/services' },
    { label: t('edu.title', lang) },
  ];

  const cards = [
    {
      title: t('edu.aiTools.title', lang),
      description: t('edu.aiTools.cardDesc', lang),
      icon: Bot,
      to: '/services/Edu/ai-tools',
    },
  ];

  return (
    <div className="relative z-10 w-full min-h-screen pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <Seo
        title="Education Services — Jalal Amanj"
        description="A curated directory of AI websites, tools, and agents for teachers, students, and creators."
        path="/services/Edu"
        jsonLd={[breadcrumbJsonLd(crumbs)]}
      />
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Breadcrumbs items={crumbs} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="font-serif text-5xl sm:text-7xl font-light text-ink tracking-tight leading-[0.95]">
            {t('edu.title', lang)}
          </h1>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => navigate(card.to)}
                className="card p-8 rounded-[28px] border border-line hover:border-accent flex flex-col items-center text-center gap-4 group relative transition-all duration-300 hover:shadow-2xl cursor-pointer"
              >
                <div className="p-4 rounded-2xl bg-accent-soft border border-line text-accent group-hover:bg-accent group-hover:text-white group-hover:scale-110 transition-all">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-light text-ink group-hover:text-accent transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-ink font-light leading-relaxed">
                  {card.description}
                </p>
                <ArrowUpRight className="absolute top-5 right-5 w-4 h-4 text-ink-muted group-hover:text-accent transition-colors" />
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};