import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, FileText, ScrollText, ShieldCheck, Sparkles } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';
import { Seo, breadcrumbJsonLd, SITE_NAME, SITE_URL } from '../components/Seo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import murshidImg from '../assets/images/murshid.webp';

const LEGAL_LINKS = [
  { path: '/murshid/privacy_policy', key: 'murshid.privacy', icon: ShieldCheck },
  { path: '/murshid/terms_of_service', key: 'murshid.terms', icon: FileText },
  { path: '/murshid/eula', key: 'murshid.eula', icon: ScrollText },
];

const BACKUP_SECTIONS = ['backup.1', 'backup.2', 'backup.3', 'backup.4'] as const;
const WHY_SECTIONS = ['why.1', 'why.2', 'why.3'] as const;

export const MurshidPage: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useLang();

  const crumbs = [
    { label: t('breadcrumb.home', lang), to: '/' },
    { label: t('murshid.title', lang) },
  ];

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Murshid',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Windows, macOS',
    description:
      'Murshid is a desktop application for secure document and personal data management, operating mainly offline with optional Google Drive backup.',
    url: `${SITE_URL}/murshid`,
    author: { '@type': 'Person', name: SITE_NAME },
  };

  const headingClass = 'font-serif text-2xl font-light text-ink mt-8 mb-4 text-start';
  const paragraphClass = 'text-sm text-ink font-light leading-relaxed text-start';

  return (
    <div className="relative z-10 w-full min-h-screen pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <Seo
        title="Murshid — Secure Document Management App | Jalal Amanj"
        description="Murshid is a desktop application for secure document and personal data management, operating mainly offline with optional Google Drive backup."
        path="/murshid"
        jsonLd={[breadcrumbJsonLd(crumbs), softwareJsonLd]}
      />
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-3">
          <Breadcrumbs items={crumbs} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="card p-10 text-center rounded-[32px] border border-line max-w-2xl mx-auto">
            <div className="relative w-40 h-40 mx-auto mb-6 rounded-3xl overflow-hidden border border-line shadow-2xl">
              <img src={murshidImg} alt={t('murshid.title', lang)} className="w-full h-full object-cover" />
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl font-light text-ink tracking-tight mb-4">
              {t('murshid.title', lang)}
            </h1>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6" />
            <p className="text-xs text-accent font-light tracking-widest uppercase mb-8">
              {t('murshid.tagline', lang)}
            </p>

            <div className="space-y-4 murshid-copy">
              <p className={paragraphClass}>{t('murshid.about.1', lang)}</p>
              <p className={paragraphClass}>{t('murshid.about.2', lang)}</p>

              <h2 className={headingClass}>{t('murshid.onlineBackup', lang)}</h2>
              {BACKUP_SECTIONS.map((key) => (
                <p key={key} className={paragraphClass}>{t(`murshid.${key}`, lang)}</p>
              ))}

              <h2 className={headingClass}>{t('murshid.why.title', lang)}</h2>
              {WHY_SECTIONS.map((key) => (
                <p key={key} className={paragraphClass}>{t(`murshid.${key}`, lang)}</p>
              ))}

              <h2 className={headingClass}>{t('murshid.privacy.title', lang)}</h2>
              <p className={paragraphClass}>{t('murshid.privacy.1', lang)}</p>
              <p className={paragraphClass}>{t('murshid.privacy.2', lang)}</p>

              <div className="space-y-3 pt-4">
                {LEGAL_LINKS.map(({ path, key, icon: Icon }) => (
                  <button
                    key={path}
                    onClick={() => navigate(path)}
                    className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl bg-accent-soft border border-line hover:border-accent transition-all text-start cursor-pointer group"
                  >
                    <span className="flex items-center gap-3 text-sm font-light text-ink group-hover:text-accent transition-colors">
                      <Icon className="w-5 h-5 text-accent shrink-0" />
                      {t(key, lang)}
                    </span>
                    <ArrowRight className={`w-4 h-4 text-ink group-hover:text-accent transition-all ${lang === 'ar' ? 'rotate-180' : ''}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
