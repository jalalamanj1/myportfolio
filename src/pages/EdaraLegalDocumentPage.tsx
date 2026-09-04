import React from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Scale } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';
import { LegalDocId } from '../data/legalDocuments';
import { edaraLegalDocuments } from '../data/edaraLegalDocuments';

const DOC_ROUTE_MAP: Record<string, LegalDocId> = {
  privacy_policy: 'privacy',
  terms_of_service: 'terms',
  eula: 'eula',
};

export const EdaraLegalDocumentPage: React.FC = () => {
  const { docId } = useParams<{ docId: string }>();
  const navigate = useNavigate();
  const { lang } = useLang();

  const doc = docId ? edaraLegalDocuments[DOC_ROUTE_MAP[docId]] : undefined;

  if (!doc) {
    return <Navigate to="/edara" replace />;
  }

  const sections = lang === 'ar' ? doc.ar : doc.en;
  const title = lang === 'ar' ? doc.titleAr : doc.titleEn;

  return (
    <div className="relative z-10 w-full min-h-screen pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/edara')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line text-ink text-xs font-medium uppercase tracking-wider hover:border-accent transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-accent" />
            <span>{t('legal.back', lang)}</span>
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="card p-6 sm:p-10 rounded-[32px] border border-line">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-6 h-6 text-accent shrink-0" />
              <h1 className="font-serif text-3xl sm:text-4xl font-light text-ink tracking-tight">
                {title}
              </h1>
            </div>

            {/* Meta block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 p-4 rounded-2xl bg-accent-soft border border-line mb-8">
              {doc.meta.map((row, idx) => (
                <div key={idx} className="text-xs">
                  <span className="text-ink-muted font-light">
                    {lang === 'ar' ? row.labelAr : row.labelEn}:{' '}
                  </span>
                  <span className="text-ink font-medium">
                    {lang === 'ar' ? row.valueAr : row.valueEn}
                  </span>
                </div>
              ))}
            </div>

            {/* Sections */}
            <div className="space-y-6">
              {sections.map((section, idx) => (
                <div key={idx}>
                  <h2 className="text-sm font-semibold text-accent mb-2">
                    {section.heading}
                  </h2>
                  <p className="text-xs text-ink font-light leading-relaxed mb-2">
                    {section.body}
                  </p>
                  {section.bullets && (
                    <ul className="space-y-1 mb-2 ps-5 list-disc">
                      {section.bullets.map((bullet, bidx) => (
                        <li key={bidx} className="text-xs text-ink font-light leading-relaxed">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.after && (
                    <p className="text-xs text-ink font-light leading-relaxed">
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
