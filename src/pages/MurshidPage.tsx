import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, FileText, ScrollText, ShieldCheck, Sparkles } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';
import murshidImg from '../assets/images/murshid.png';

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

  const headingClass = 'font-serif text-2xl font-light text-[#D7C4A3] mt-8 mb-4 text-start';
  const paragraphClass = 'text-sm text-neutral-300 font-light leading-relaxed text-start';

  return (
    <div className="relative z-10 w-full min-h-screen pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-button text-xs font-medium uppercase tracking-wider text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D7C4A3]" />
            <span>{t('common.back', lang)}</span>
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="glass-panel p-10 text-center rounded-[32px] border border-white/15 max-w-2xl mx-auto">
            <div className="relative w-40 h-40 mx-auto mb-6 rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img src={murshidImg} alt={t('murshid.title', lang)} className="w-full h-full object-cover" />
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl font-light text-white tracking-tight mb-4">
              {t('murshid.title', lang)}
            </h1>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D7C4A3] to-transparent mx-auto mb-6" />
            <p className="text-xs text-[#D7C4A3] font-light tracking-widest uppercase mb-8">
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
                    className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D7C4A3]/50 transition-all text-start cursor-pointer group"
                  >
                    <span className="flex items-center gap-3 text-sm font-light text-white group-hover:text-[#D7C4A3] transition-colors">
                      <Icon className="w-5 h-5 text-[#D7C4A3] shrink-0" />
                      {t(key, lang)}
                    </span>
                    <ArrowRight className={`w-4 h-4 text-neutral-400 group-hover:text-[#D7C4A3] transition-all ${lang === 'ar' ? 'rotate-180' : ''}`} />
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
