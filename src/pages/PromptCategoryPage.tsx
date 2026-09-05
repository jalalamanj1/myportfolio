import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Copy, Check, FolderOpen, Info, X, LayoutGrid, LayoutList, ClipboardList } from 'lucide-react';
import { getIcon } from '../utils/iconMap';
import { fetchPromptCategories } from '../data/promptStore';
import { PromptCategory, PromptItem } from '../types';
import { useLang } from '../contexts/LanguageContext';
import { t, localizePromptCategory, localizePromptItem } from '../i18n';
import { assetUrl } from '../utils/asset';
import { Seo, breadcrumbJsonLd, itemListJsonLd } from '../components/Seo';
import { Breadcrumbs } from '../components/Breadcrumbs';
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

interface PromptToken {
  raw: string;
  name: string;
}

const extractPromptTokens = (text: string): PromptToken[] => {
  const seen = new Set<string>();
  const tokens: PromptToken[] = [];
  const re = /\[([^\[\]]+)\]|\(([^()]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const inner = (m[1] ?? m[2]).trim();
    if (
      inner &&
      !/^#[0-9A-Fa-f]+$/.test(inner) &&
      !/[a-z]/.test(inner) &&
      /[A-Z]/.test(inner) &&
      !seen.has(inner)
    ) {
      seen.add(inner);
      tokens.push({ raw: m[0], name: inner });
    }
  }
  return tokens;
};

const chunk = <T,>(arr: T[], size: number): T[][] =>
  arr.reduce((acc: T[][], _, i) => (i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc), []);

export const PromptCategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { lang } = useLang();
  const [categories, setCategories] = useState<PromptCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [infoPrompt, setInfoPrompt] = useState<PromptItem | null>(null);
  const [fillPrompt, setFillPrompt] = useState<PromptItem | null>(null);
  const [fillValues, setFillValues] = useState<Record<string, string>>({});
  const [view, setView] = useState<'list' | 'grid'>('list');

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
    if (!infoPrompt && !fillPrompt) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setInfoPrompt(null);
        setFillPrompt(null);
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [infoPrompt, fillPrompt]);

  const activeCatRaw = categories.find((c) => c.id === categoryId) ?? null;
  const activeCat = activeCatRaw ? localizePromptCategory(activeCatRaw, lang) : null;

  const crumbs = [
    { label: t('breadcrumb.home', lang), to: '/' },
    { label: t('services.page.title', lang), to: '/services' },
    { label: t('prompts.title', lang), to: '/services/Prompts' },
    ...(activeCat ? [{ label: activeCat.title }] : []),
  ];

  const seoTitle = activeCat
    ? `${activeCat.title} — AI Prompts | Jalal Amanj`
    : 'AI Prompts — Jalal Amanj';
  const seoDescription = activeCat
    ? `${activeCat.title} — ${activeCat.prompts.length} ready-to-use AI prompts by Jalal Amanj.`
    : 'Browse ready-to-use AI prompts by category on Jalal Amanj.';

  const seoJsonLd = [
    breadcrumbJsonLd(crumbs),
    ...(activeCat ? [itemListJsonLd(activeCat.prompts.map((p) => p.title))] : []),
  ];

  const handleCopy = (id: string, text: string) => {
    copyToClipboard(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 2000);
    });
  };

  const handleCopyClick = (prompt: PromptItem, fillForm: boolean) => {
    const tokens = extractPromptTokens(prompt.promptText);
    if (fillForm && tokens.length > 0) {
      setFillValues(Object.fromEntries(tokens.map((tk) => [tk.name, ''])));
      setFillPrompt(prompt);
    } else {
      handleCopy(prompt.id, prompt.promptText);
    }
  };

  const handleFillSubmit = () => {
    if (!fillPrompt) return;
    const tokens = extractPromptTokens(fillPrompt.promptText);
    let text = fillPrompt.promptText;
    for (const token of tokens) {
      const value = (fillValues[token.name] ?? '').trim();
      text = text.split(token.raw).join(value === '' ? token.name : value);
    }
    const id = fillPrompt.id;
    setFillPrompt(null);
    handleCopy(id, text);
  };

  const promptLabel = (n: number) => n === 1 ? t('prompts.prompt', lang) : t('prompts.prompts', lang);
  const fillForm = activeCat ? activeCat.hasFillForm !== false : true;

  return (
    <div className="relative z-10 w-full min-h-screen pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <Seo
        title={seoTitle}
        description={seoDescription}
        path={`/services/Prompts/${categoryId ?? ''}`}
        jsonLd={seoJsonLd}
      />
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-3">
          <Breadcrumbs items={crumbs} />
        </div>

        {loading ? (
          <div className="card p-10 text-center rounded-[32px] border border-line my-8 max-w-2xl mx-auto">
            <Sparkles className="w-8 h-8 text-accent mx-auto mb-4 animate-pulse" />
            <h3 className="font-serif text-2xl font-light text-ink mb-2">{t('prompts.loading', lang)}</h3>
          </div>
        ) : !activeCat ? (
          <div className="card p-10 text-center rounded-[32px] border border-line my-8 max-w-2xl mx-auto">
            <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-light text-ink mb-2">{t('prompts.empty.title', lang)}</h3>
            <p className="text-xs text-ink font-light leading-relaxed max-w-md mx-auto">
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
                <div className="p-3 rounded-2xl bg-accent-soft border border-line text-accent">
                  {getIcon(activeCat.iconName, "w-6 h-6")}
                </div>
                <h1 className="font-serif text-4xl sm:text-5xl font-light text-ink">
                  {activeCat.title}
                </h1>
              </div>
              <p className="text-xs text-ink font-light max-w-lg mx-auto leading-relaxed">
                {activeCat.prompts.length} {promptLabel(activeCat.prompts.length)} — {t('prompts.active.pick', lang)}
              </p>
              <div className="mt-6 inline-flex items-center gap-1 rounded-full border border-line bg-paper p-1">
                <button
                  onClick={() => setView('list')}
                  aria-label={t('prompts.view.list', lang)}
                  className={`p-2 rounded-full transition-all cursor-pointer ${
                    view === 'list' ? 'bg-accent text-white shadow' : 'text-ink hover:text-accent'
                  }`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView('grid')}
                  aria-label={t('prompts.view.grid', lang)}
                  className={`p-2 rounded-full transition-all cursor-pointer ${
                    view === 'grid' ? 'bg-accent text-white shadow' : 'text-ink hover:text-accent'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>

            {activeCat.prompts.length === 0 ? (
              <div className="card p-10 text-center rounded-[32px] border border-line my-8 max-w-2xl mx-auto">
                <FolderOpen className="w-8 h-8 text-accent mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-light text-ink mb-2">{t('prompts.category.empty.title', lang)}</h3>
                <p className="text-xs text-ink font-light leading-relaxed max-w-md mx-auto">
                  {t('prompts.category.empty.desc', lang)}
                </p>
              </div>
            ) : view === 'list' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
                {activeCat.prompts.map((raw) => {
                  const prompt = localizePromptItem(raw, lang);
                  return (
                    <motion.div
                      key={prompt.id}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="card rounded-2xl border border-line hover:border-accent overflow-hidden group transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="flex items-center gap-4 p-4">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-accent-soft shrink-0">
                          <img
                            src={assetUrl(prompt.image)}
                            alt={prompt.title}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-lg sm:text-xl font-light text-ink truncate">
                            {prompt.title}
                          </h3>
                          {prompt.howToUse && prompt.howToUse.length > 0 && (
                            <button
                              onClick={() => setInfoPrompt(prompt)}
                              aria-label={`${t('prompts.howto', lang)}: ${prompt.title}`}
                              title={t('prompts.howto', lang)}
                              className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-ink-muted hover:text-accent transition-colors cursor-pointer"
                            >
                              <Info className="w-3.5 h-3.5" />
                              {t('prompts.howto', lang)}
                            </button>
                          )}
                        </div>
                        <button
                          onClick={() => handleCopyClick(prompt, fillForm)}
                          className={`shrink-0 py-2 px-4 rounded-xl text-xs font-medium tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
                            copiedId === prompt.id
                              ? 'bg-accent text-white font-semibold'
                              : 'btn-primary'
                          }`}
                        >
                          {copiedId === prompt.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">{t('prompts.copied', lang)}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">{t('prompts.copy', lang)}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : activeCat.layout === 'pair' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {chunk(activeCat.prompts, 2).map((pair, cardIdx) => (
                  <motion.div
                    key={cardIdx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="card rounded-[28px] border border-line hover:border-accent overflow-hidden group transition-all duration-300 hover:shadow-2xl"
                  >
                    <div className={`grid ${pair.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-1'} divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse`}>
                      {pair.map((raw) => {
                        const prompt = localizePromptItem(raw, lang);
                        return (
                        <div key={prompt.id} className="p-4 sm:p-5 flex flex-col">
                          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-accent-soft mb-4">
                            <img
                              src={assetUrl(prompt.image)}
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
                                className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/25 text-white/90 hover:text-white hover:bg-black/70 hover:border-accent/70 transition-all cursor-pointer"
                              >
                                <Info className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          <h3 className="font-serif text-lg font-light text-ink mb-3 truncate">
                            {prompt.title}
                          </h3>
                          <button
onClick={() => handleCopyClick(prompt, fillForm)}
                            className={`w-full py-2.5 px-4 rounded-xl text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg mt-auto ${
                              copiedId === prompt.id
                                ? 'bg-accent text-white font-semibold'
                                : 'btn-primary'
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
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeCat.prompts.map((raw) => {
                  const prompt = localizePromptItem(raw, lang);
                  return (
                  <motion.div
                    key={prompt.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="card rounded-[28px] border border-line hover:border-accent overflow-hidden group transition-all duration-300 hover:shadow-2xl"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-accent-soft">
                      <img
                        src={assetUrl(prompt.image)}
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
                          className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/25 text-white/90 hover:text-white hover:bg-black/70 hover:border-accent/70 transition-all cursor-pointer"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-xl font-light text-ink mb-3 truncate">
                        {prompt.title}
                      </h3>
                      <button
                        onClick={() => handleCopyClick(prompt, fillForm)}
                        className={`w-full py-3 px-4 rounded-xl text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                          copiedId === prompt.id
                            ? 'bg-accent text-white font-semibold'
                            : 'btn-primary group-hover:translate-y-0'
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
                  );
                })}
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="card border border-line rounded-[32px] max-w-lg w-full overflow-hidden shadow-2xl"
            >
              <div className="flex items-start justify-between p-6 pb-4 gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2.5 rounded-2xl bg-accent-soft border border-line text-accent flex-shrink-0">
                    <Info className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-2xl font-light text-ink">{t('prompts.howto.title', lang)}</h3>
                    <p className="text-xs text-ink-muted font-light mt-0.5 truncate">
                      {infoPrompt.title}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setInfoPrompt(null)}
                  aria-label={t('prompts.howto.close', lang)}
                  className="p-2 rounded-full border border-line hover:border-accent cursor-pointer flex-shrink-0"
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
                      <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-accent-soft border border-accent/40 text-accent text-[11px] flex items-center justify-center font-mono">
                        {i + 1}
                      </span>
                      <p className="text-sm text-ink font-light leading-relaxed">{step.text}</p>
                    </div>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {fillPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setFillPrompt(null)}
            className="fixed inset-0 z-50 flex justify-center p-4 pt-16 sm:pt-20 pb-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="card border border-line rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-start justify-between p-6 pb-4 gap-3 flex-shrink-0">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2.5 rounded-2xl bg-accent-soft border border-line text-accent flex-shrink-0">
                    <ClipboardList className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-2xl font-light text-ink">
                      {t('prompts.fill.title', lang)}
                    </h3>
                    <p className="text-xs text-ink-muted font-light mt-0.5 truncate">
                      {fillPrompt.title}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setFillPrompt(null)}
                  aria-label={t('prompts.fill.close', lang)}
                  className="p-2 rounded-full border border-line hover:border-accent cursor-pointer flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="px-6 sm:px-8 pb-6 flex flex-col min-h-0 flex-1">
                <p className="text-xs text-ink font-light leading-relaxed mb-6 flex-shrink-0">
                  {t('prompts.fill.desc', lang)}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-6 gap-y-5 flex-1 content-start min-h-0 overflow-y-auto">
                  {extractPromptTokens(fillPrompt.promptText).map((token, i) => (
                    <label
                      key={token.name}
                      className="block text-left last:sm:col-span-2"
                    >
                      <span className="block text-[11px] uppercase tracking-widest text-ink font-medium mb-2">
                        {token.name}
                      </span>
                      <input
                        autoFocus={i === 0}
                        type="text"
                        value={fillValues[token.name] ?? ''}
                        onChange={(e) =>
                          setFillValues((prev) => ({ ...prev, [token.name]: e.target.value }))
                        }
                        className="input-field"
                        dir="auto"
                      />
                    </label>
                  ))}
                </div>
                <div className="flex items-center justify-end gap-3 mt-6 pt-1 flex-shrink-0">
                  <button
                    onClick={() => setFillPrompt(null)}
                    className="btn-secondary px-5 py-2.5 rounded-xl text-xs font-medium tracking-wider uppercase cursor-pointer"
                  >
                    {t('prompts.fill.cancel', lang)}
                  </button>
                  <button
                    onClick={handleFillSubmit}
                    className="btn-primary px-5 py-2.5 rounded-xl text-xs font-medium tracking-wider uppercase flex items-center gap-2 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {t('prompts.fill.copy', lang)}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
