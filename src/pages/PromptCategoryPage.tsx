import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowLeft, Copy, Check, FolderOpen, Info, X } from 'lucide-react';
import { getIcon } from '../utils/iconMap';
import { fetchPromptCategories } from '../data/promptStore';
import { PromptCategory, PromptItem } from '../types';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
};

export const PromptCategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { lang } = useLang();
  const [categories, setCategories] = useState<PromptCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [infoPrompt, setInfoPrompt] = useState<PromptItem | null>(null);

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

  useEffect(() => {
    if (!infoPrompt) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setInfoPrompt(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [infoPrompt]);

  const activeCat = categories.find((c) => c.id === categoryId) ?? null;

  const handleCopy = (id: string, text: string) => {
    copyToClipboard(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 2000);
    });
  };

  const promptLabel = (n: number) => n === 1 ? t('prompts.prompt', lang) : t('prompts.prompts', lang);

  return (
    <div className="relative z-10 w-full min-h-screen pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate('/services/Prompts')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-button text-xs font-medium uppercase tracking-wider text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D7C4A3]" />
            <span>{t('prompts.back', lang)}</span>
          </button>
        </div>

        {loading ? (
          <div className="glass-panel p-10 text-center rounded-[32px] border border-white/15 my-8 max-w-2xl mx-auto">
            <Sparkles className="w-8 h-8 text-[#D7C4A3] mx-auto mb-4 animate-pulse" />
            <h3 className="font-serif text-2xl font-light text-white mb-2">{t('prompts.loading', lang)}</h3>
          </div>
        ) : !activeCat ? (
          <div className="glass-panel p-10 text-center rounded-[32px] border border-white/15 my-8 max-w-2xl mx-auto">
            <Sparkles className="w-8 h-8 text-[#D7C4A3] mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-light text-white mb-2">{t('prompts.empty.title', lang)}</h3>
            <p className="text-xs text-neutral-300 font-light leading-relaxed max-w-md mx-auto">
              {t('prompts.empty.desc', lang)}
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div className="text-center max-w-4xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-white/10 border border-white/20 text-[#D7C4A3]">
                  {getIcon(activeCat.iconName, "w-6 h-6")}
                </div>
                <h1 className="font-serif text-4xl sm:text-5xl font-light text-white">
                  {activeCat.title}
                </h1>
              </div>
              <p className="text-xs text-neutral-300 font-light max-w-lg mx-auto leading-relaxed">
                {activeCat.prompts.length} {promptLabel(activeCat.prompts.length)} — {t('prompts.active.pick', lang)}
              </p>
            </div>

            {activeCat.prompts.length === 0 ? (
              <div className="glass-panel p-10 text-center rounded-[32px] border border-white/15 my-8 max-w-2xl mx-auto">
                <FolderOpen className="w-8 h-8 text-[#D7C4A3] mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-light text-white mb-2">{t('prompts.category.empty.title', lang)}</h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed max-w-md mx-auto">
                  {t('prompts.category.empty.desc', lang)}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeCat.prompts.map((prompt) => (
                  <motion.div
                    key={prompt.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="glass-card rounded-[28px] border border-white/15 hover:border-[#D7C4A3]/50 overflow-hidden group transition-all duration-300 hover:shadow-2xl"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900/40">
                      <img
                        src={prompt.image}
                        alt={prompt.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      {prompt.howToUse && prompt.howToUse.length > 0 && (
                        <button
                          onClick={() => setInfoPrompt(prompt)}
                          aria-label={`${t('prompts.howto', lang)}: ${prompt.title}`}
                          title={t('prompts.howto', lang)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/25 text-white/90 hover:text-white hover:bg-black/70 hover:border-[#D7C4A3]/70 transition-all cursor-pointer"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-xl font-light text-white mb-3 truncate">
                        {prompt.title}
                      </h3>
                      <button
                        onClick={() => handleCopy(prompt.id, prompt.promptText)}
                        className={`w-full py-3 px-4 rounded-xl text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                          copiedId === prompt.id
                            ? 'bg-[#D7C4A3] text-black font-semibold'
                            : 'glass-button-primary group-hover:translate-y-0'
                        }`}
                      >
                        {copiedId === prompt.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{t('prompts.copied', lang)}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>{t('prompts.copy', lang)}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {infoPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setInfoPrompt(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card border border-white/20 rounded-[32px] max-w-lg w-full overflow-hidden shadow-2xl"
            >
              <div className="flex items-start justify-between p-6 pb-4 gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2.5 rounded-2xl bg-white/10 border border-white/15 text-[#D7C4A3] flex-shrink-0">
                    <Info className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-2xl font-light text-white">{t('prompts.howto.title', lang)}</h3>
                    <p className="text-xs text-neutral-400 font-light mt-0.5 truncate">
                      {infoPrompt.title}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setInfoPrompt(null)}
                  aria-label={t('prompts.howto.close', lang)}
                  className="p-2 rounded-full glass-button cursor-pointer flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="px-6 pb-6 space-y-3">
                {infoPrompt.howToUse
                  ?.slice()
                  .sort((a, b) => a.order - b.order)
                  .map((step, i) => (
                    <div key={step.id} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-[#D7C4A3]/20 border border-[#D7C4A3]/40 text-[#D7C4A3] text-[11px] flex items-center justify-center font-mono">
                        {i + 1}
                      </span>
                      <p className="text-sm text-neutral-200 font-light leading-relaxed">{step.text}</p>
                    </div>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
