import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, GraduationCap, Smartphone } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useLang();

  const cards = [
    {
      title: t('prompts.title', lang),
      description: t('services.prompts.desc', lang),
      icon: Sparkles,
      path: '/services/Prompts',
    },
    {
      title: lang === 'ar' ? 'التعليم' : 'Edu',
      description: t('services.edu.desc', lang),
      icon: GraduationCap,
      path: '/services/Edu',
    },
    {
      title: lang === 'ar' ? 'التطبيقات' : 'Apps',
      description: t('services.apps.desc', lang),
      icon: Smartphone,
      path: '/services/Apps',
    },
  ];

  return (
    <div className="relative z-10 w-full min-h-screen pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-button text-xs font-medium uppercase tracking-wider text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D7C4A3]" />
            <span>{t('services.back', lang)}</span>
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light text-white tracking-tight leading-[0.95]">
            {t('services.page.title', lang)}
          </h1>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D7C4A3] to-transparent mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {cards.map((card, i) => (
            <motion.button
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => navigate(card.path)}
              className="glass-card p-8 rounded-[28px] border border-white/15 hover:border-[#D7C4A3]/50 flex flex-col items-center text-center gap-4 group transition-all duration-300 hover:shadow-2xl cursor-pointer"
            >
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-[#D7C4A3] group-hover:bg-[#D7C4A3]/20 group-hover:scale-110 transition-all">
                <card.icon className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-light text-white group-hover:text-[#D7C4A3] transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                {card.description}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
