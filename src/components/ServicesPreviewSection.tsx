import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';

export const ServicesPreviewSection: React.FC = memo(function ServicesPreviewSection() {
  const navigate = useNavigate();
  const { lang } = useLang();

  return (
    <section id="services-preview" className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel p-8 sm:p-12 md:p-16 text-white text-center relative overflow-hidden border border-white/20 shadow-2xl"
      >
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#D7C4A3]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-wide text-white mb-8">
            {t('services.title', lang)}
          </h2>

          <button
            onClick={() => navigate('/services')}
            className="glass-button-primary px-10 py-4 rounded-full text-sm font-semibold tracking-wider uppercase flex items-center gap-3 group cursor-pointer shadow-xl hover:scale-105 transition-all duration-300"
          >
            <span>{t('services.explore', lang)}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </section>
  );
});
