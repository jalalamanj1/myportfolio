import React, { useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, ShieldCheck, Download } from 'lucide-react';
import { Product } from '../types';
import { useLang } from '../contexts/LanguageContext';
import { t, localizeProduct } from '../i18n';
import { assetUrl } from '../utils/asset';

interface ProjectModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = memo(function ProjectModal({ product, onClose }) {
  const { lang } = useLang();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (product) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const localized = localizeProduct(product, lang);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Transparent click-catcher — blurs the page behind when the modal is
            open (no dim, no darkening) so the page stays at full brightness */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 backdrop-blur-md"
        />

        {/* Modal Glass Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl bg-paper border border-line rounded-[20px] p-5 sm:p-7 max-h-[90vh] overflow-y-auto my-auto shadow-[0_24px_60px_rgba(32,36,31,0.18)]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label={t('modal.close', lang)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-accent text-white border border-accent hover:bg-accent-dark transition-colors duration-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-stretch">
            {/* Modal Image */}
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-line bg-paper lg:self-center">
              <img
                src={assetUrl(localized.image)}
                alt={localized.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover max-h-[340px] lg:max-h-[420px]"
              />
            </div>

            {/* Modal Content */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-accent-soft border border-accent/20 text-xs font-medium text-accent">
                    {localized.category}
                  </span>
                  <span className="text-xs text-ink-muted flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-accent" />
                    {localized.year}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-ink tracking-wide">
                  {localized.title}
                </h2>
              </div>

              {/* Full Description */}
              <p className="text-sm text-ink-soft leading-relaxed">
                {localized.fullDescription}
              </p>

              {/* Technical Specifications */}
              <div className="p-3.5 rounded-2xl bg-ivory border border-line space-y-2">
                <h4 className="text-[11px] font-semibold text-accent uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t('modal.tags', lang)}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                  {localized.specs.map((spec, idx) => (
                    <div key={idx} className="text-xs">
                      <span className="text-ink-muted">{spec.label}: </span>
                      <span className="text-ink font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-1">
                <a
                  href={assetUrl(localized.downloadUrl || localized.image)}
                  download={localized.downloadUrl ? undefined : `${localized.id}-specs.jpg`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full !py-3 !rounded-xl"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('modal.download', lang)}</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});
