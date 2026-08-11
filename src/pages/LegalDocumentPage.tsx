import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Scale } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';
import { legalDocuments, LegalDocId } from '../data/legalDocuments';

const DOC_ROUTE_MAP: Record<string, LegalDocId> = {
  privacy_policy: 'privacy',
  terms_of_use: 'terms',
  eula: 'eula',
};

export const LegalDocumentPage: React.FC = () => {
  const { docId } = useParams<{ docId: string }>();
  const navigate = useNavigate();
  const { lang } = useLang();

  const doc = docId ? legalDocuments[DOC_ROUTE_MAP[docId]] : undefined;

  if (!doc) {
    return (
      <div className="relative z-10 w-full min-h-screen pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => navigate('/murshid')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-button text-xs font-medium uppercase tracking-wider text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#D7C4A3]" />
              <span>{t('legal.back', lang)}</span>
            </button>
          </div>
          <div className="glass-panel p-10 text-center rounded-[32px] border border-white/15">
            <p className="text-xs text-neutral-300 font-light">{t('pages.comingSoon', lang)}</p>
          </div>
        </div>
      </div>
    );
  }

  const sections = lang === 'ar' ? doc.ar : doc.en;
  const title = lang === 'ar' ? doc.titleAr : doc.titleEn;

  return (
    <div className="relative z-10 w-full min-h-screen pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/murshid')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-button text-xs font-medium uppercase tracking-wider text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D7C4A3]" />
            <span>{t('legal.back', lang)}</span>
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass-panel p-6 sm:p-10 rounded-[32px] border border-white/15">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-6 h-6 text-[#D7C4A3] shrink-0" />
              <h1 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight">
                {title}
              </h1>
            </div>

            {/* Meta block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 p-4 rounded-2xl bg-white/5 border border-white/10 mb-8">
              {doc.meta.map((row, idx) => (
                <div key={idx} className="text-xs">
                  <span className="text-neutral-400 font-light">
                    {lang === 'ar' ? row.labelAr : row.labelEn}:{' '}
                  </span>
                  <span className="text-white font-medium">
                    {lang === 'ar' ? row.valueAr : row.valueEn}
                  </span>
                </div>
              ))}
            </div>

            {/* Sections */}
            <div className="space-y-6">
              {sections.map((section, idx) => (
                <div key={idx}>
                  <h2 className="text-sm font-semibold text-[#D7C4A3] mb-2">
                    {section.heading}
                  </h2>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed mb-2">
                    {section.body}
                  </p>
                  {section.bullets && (
                    <ul className="space-y-1 mb-2 ps-5 list-disc">
                      {section.bullets.map((bullet, bidx) => (
                        <li key={bidx} className="text-xs text-neutral-300 font-light leading-relaxed">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.after && (
                    <p className="text-xs text-neutral-300 font-light leading-relaxed">
                      {section.after}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
