import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, FileText, ScrollText, ShieldCheck, Sparkles } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';

const LEGAL_LINKS = [
  { path: '/murshid/privacy_policy', key: 'murshid.privacy', icon: ShieldCheck },
  { path: '/murshid/terms_of_use', key: 'murshid.terms', icon: FileText },
  { path: '/murshid/eula', key: 'murshid.eula', icon: ScrollText },
];

export const MurshidPage: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useLang();

  return (
    <div className="relative z-10 w-full min-h-screen pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-button text-xs font-medium uppercase tracking-wider text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D7C4A3]" />
            <span>{t('apps.back', lang)}</span>
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="glass-panel p-10 text-center rounded-[32px] border border-white/15 max-w-2xl mx-auto">
            <Sparkles className="w-10 h-10 text-[#D7C4A3] mx-auto mb-4" />
            <h1 className="font-serif text-5xl sm:text-6xl font-light text-white tracking-tight mb-4">
              {t('murshid.title', lang)}
            </h1>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D7C4A3] to-transparent mx-auto mb-6" />
            <p className="text-xs text-neutral-300 font-light leading-relaxed max-w-md mx-auto">
              {t('pages.comingSoon', lang)}
            </p>
          </div>
        </motion.div>

        {/* Legal Documents */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="max-w-2xl mx-auto mt-10"
        >
          <div className="glass-panel p-6 sm:p-8 rounded-[32px] border border-white/15">
            <h2 className="text-center font-serif text-2xl sm:text-3xl font-light text-white mb-2">
              {t('murshid.legal', lang)}
            </h2>
            <p className="text-center text-xs text-neutral-400 font-light mb-6">
              {t('murshid.legal.desc', lang)}
            </p>
            <div className="space-y-3">
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
        </motion.div>
      </div>
    </div>
  );
};
