import React, { memo } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '../types';
import { useLang } from '../contexts/LanguageContext';
import { t, localizeProduct } from '../i18n';
import { assetUrl } from '../utils/asset';

interface MyWorkSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const MyWorkSection: React.FC<MyWorkSectionProps> = memo(function MyWorkSection({
  products,
  onSelectProduct,
}) {
  const { lang } = useLang();

  return (
    <section id="work" className="w-full py-24 sm:py-28 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-w-2xl"
        >
          <p className="eyebrow mb-4">{t('work.eyebrow', lang)}</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-ink tracking-tight">
            {t('work.title', lang)}
          </h2>
          <p className="mt-3 text-ink-muted text-base leading-relaxed">{t('work.subtitle', lang)}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => {
            const localized = localizeProduct(product, lang);
            return (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="card card-hover flex flex-col"
              >
                <button
                  onClick={() => onSelectProduct(product)}
                  className="w-full text-start cursor-pointer group block"
                  aria-label={localized.title}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-paper">
                    <img
                      src={assetUrl(localized.image)}
                      alt={localized.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-xl font-normal text-ink tracking-tight group-hover:text-accent transition-colors">
                      {localized.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-muted leading-relaxed line-clamp-2">
                      {localized.shortDescription}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-accent">
                      {t('products.view', lang)}
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
});
