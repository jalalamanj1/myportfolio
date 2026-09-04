import React, { memo } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';

export const ServicesSection: React.FC = memo(function ServicesSection() {
  const { lang } = useLang();
  const navigate = useNavigate();

  return (
    <section id="services" className="w-full py-24 sm:py-28 px-6 sm:px-8 bg-paper border-y border-line">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">{t('services.eyebrow', lang)}</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-ink tracking-tight">
              {t('services.sectionTitle', lang)}
            </h2>
            <p className="mt-3 text-ink-muted text-base leading-relaxed">{t('services.sectionSubtitle', lang)}</p>
          </div>
          <button
            onClick={() => navigate('/services')}
            className="btn-primary inline-flex items-center gap-2 shrink-0"
          >
            {t('services.discover', lang)}
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
});