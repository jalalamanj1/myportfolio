import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { getIcon } from '../utils/iconMap';
import { fetchPromptCategories } from '../data/promptStore';
import { PromptCategory } from '../types';
import { useLang } from '../contexts/LanguageContext';
import { t, localizePromptCategory } from '../i18n';

export const PromptsPage: React.FC = () => {
  const { lang } = useLang();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<PromptCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchPromptCategories().then((data) => {
      if (!mounted) return;
      setCategories(data);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const promptLabel = (n: number) => n === 1 ? t('prompts.prompt', lang) : t('prompts.prompts', lang);

  return (
    <div className="relative z-10 w-full min-h-screen pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-button text-xs font-medium uppercase tracking-wider text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D7C4A3]" />
            <span>{t('prompts.back', lang)}</span>
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light text-white tracking-tight leading-[0.95]">
            {t('prompts.title', lang)}
          </h1>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D7C4A3] to-transparent mx-auto mt-8" />
          <p className="text-xs text-neutral-300 font-light mt-6 max-w-lg mx-auto leading-relaxed">
            {t('prompts.pick', lang)}
          </p>
        </motion.div>

        {loading ? (
          <div className="glass-panel p-10 text-center rounded-[32px] border border-white/15 my-8 max-w-2xl mx-auto">
            <Sparkles className="w-8 h-8 text-[#D7C4A3] mx-auto mb-4 animate-pulse" />
            <h3 className="font-serif text-2xl font-light text-white mb-2">{t('prompts.loading', lang)}</h3>
          </div>
        ) : categories.length === 0 ? (
          <div className="glass-panel p-10 text-center rounded-[32px] border border-white/15 my-8 max-w-2xl mx-auto">
            <Sparkles className="w-8 h-8 text-[#D7C4A3] mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-light text-white mb-2">{t('prompts.empty.title', lang)}</h3>
            <p className="text-xs text-neutral-300 font-light leading-relaxed max-w-md mx-auto">
              {t('prompts.empty.desc', lang)}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onClick={() => navigate(`/services/Prompts/${cat.id}`)}
                className="glass-card p-8 rounded-[28px] border border-white/15 hover:border-[#D7C4A3]/50 flex flex-col items-center text-center gap-4 group transition-all duration-300 hover:shadow-2xl cursor-pointer"
              >
                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-[#D7C4A3] group-hover:bg-[#D7C4A3]/20 group-hover:scale-110 transition-all">
                  {getIcon(cat.iconName, "w-7 h-7")}
                </div>
                <h3 className="font-serif text-2xl font-light text-white group-hover:text-[#D7C4A3] transition-colors">
                  {localizePromptCategory(cat, lang).title}
                </h3>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 uppercase tracking-widest">
                  {cat.prompts.length} {promptLabel(cat.prompts.length)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-neutral-500 group-hover:text-[#D7C4A3] transition-colors">
                  {t('prompts.open', lang)}
                  <ArrowRight className={`w-3.5 h-3.5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
