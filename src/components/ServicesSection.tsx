import React, { memo } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Copy, PenLine, Pointer, ArrowUpRight } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';

const SERVICES: { key: string; icon: React.ComponentType<{ className?: string }>; path?: string }[] = [
  {
    key: 'prompts',
    icon: Copy,
    path: '/services/Prompts',
  },
  {
    key: 'generation',
    icon: PenLine,
  },
  {
    key: 'wheel',
    icon: Pointer,
  },
];

export const ServicesSection: React.FC = memo(function ServicesSection() {
  const { lang } = useLang();
  const navigate = useNavigate();

  const handlePrimary = (service: (typeof SERVICES)[number]) => {
    if (service.path) {
      navigate(service.path);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="w-full py-24 sm:py-28 px-6 sm:px-8 bg-paper border-y border-line">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-w-2xl"
        >
          <p className="eyebrow mb-4">{t('services.eyebrow', lang)}</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-ink tracking-tight">
            {t('services.sectionTitle', lang)}
          </h2>
          <p className="mt-3 text-ink-muted text-base leading-relaxed">{t('services.sectionSubtitle', lang)}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="card p-8 flex flex-col"
              >
                <div className="w-11 h-11 rounded-full bg-accent-soft text-accent flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-normal text-ink tracking-tight">
                  {t(`svc.${service.key}.title`, lang)}
                </h3>
                <p className="mt-3 text-sm text-ink-muted leading-relaxed flex-1">
                  {t(`svc.${service.key}.desc`, lang)}
                </p>
                <button
                  onClick={() => handlePrimary(service)}
                  className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-accent cursor-pointer"
                >
                  {t(`svc.${service.key}.cta`, lang)}
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
