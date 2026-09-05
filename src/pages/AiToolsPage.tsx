import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Presentation, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { fetchAiTools, AiTool } from '../data/aiToolsStore';
import { AI_TOOL_META } from '../data/aiToolsMeta';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';
import { assetUrl } from '../utils/asset';
import { Seo, breadcrumbJsonLd } from '../components/Seo';
import { Breadcrumbs } from '../components/Breadcrumbs';

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
}

const ToolLogo: React.FC<{ tool: AiTool }> = ({ tool }) => {
  const [missing, setMissing] = useState(false);
  const base = 'w-full h-full object-contain shrink-0';
  if (missing || !tool.logo) {
    return (
      <span
        className={`${base} flex items-center justify-center bg-accent-soft text-accent text-sm font-semibold rounded-xl border border-line`}
      >
        {initialsOf(tool.name)}
      </span>
    );
  }
  return (
    <img
      src={assetUrl(`logos/${tool.logo}`)}
      alt={`${tool.name} logo`}
      loading="lazy"
      decoding="async"
      onError={() => setMissing(true)}
      className={`${base} rounded-xl border border-line bg-white p-1.5`}
    />
  );
};

interface CarouselProps {
  title: string;
  icon: React.ReactNode;
  tools: AiTool[];
  lang: 'en' | 'ar';
  dir: 'ltr' | 'rtl';
}

const Carousel: React.FC<CarouselProps> = ({ title, icon, tools, lang, dir }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [canBack, setCanBack] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback((el: HTMLDivElement) => {
    const max = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft);
    setCanBack(pos > 4);
    setCanNext(pos < max - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => update(el);
    update(el);
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [update, tools]);

  const scrollBy = (mult: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('a');
    const amount = (card?.offsetWidth ?? 256) + 16;
    el.scrollBy({ left: mult * amount, behavior: 'smooth' });
  };

  const fwd = () => scrollBy(dir === 'rtl' ? -1 : 1);
  const back = () => scrollBy(dir === 'rtl' ? 1 : -1);

  const btn =
    'p-2 rounded-full border border-line bg-paper text-ink transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:text-accent hover:border-accent';

  return (
    <section className="mb-14">
      <div className="flex items-end justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-accent-soft border border-line flex items-center justify-center text-accent shrink-0">
            {icon}
          </span>
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-ink tracking-tight leading-none">
              {title}
            </h2>
            <p className="mt-1 text-xs text-ink font-light uppercase tracking-widest">
              {tools.length}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button aria-label={t('carousel.prev', lang)} className={btn} onClick={back} disabled={!canBack}>
            {dir === 'rtl' ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button aria-label={t('carousel.next', lang)} className={btn} onClick={fwd} disabled={!canNext}>
            {dir === 'rtl' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-2"
      >
        {tools.map((tool, i) => {
          const meta = AI_TOOL_META[tool.url];
          const desc = lang === 'ar' ? meta?.descAr ?? '' : meta?.desc ?? '';
          return (
            <motion.a
              key={tool.url}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: Math.min(i % 10, 6) * 0.03 }}
              className="card rounded-2xl border border-line hover:border-accent group snap-start w-60 sm:w-64 shrink-0 p-5 flex flex-col gap-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <span className="w-12 h-12 shrink-0 block">
                <ToolLogo tool={tool} />
              </span>
              <span className="min-w-0 w-full">
                <span className="block text-sm font-semibold text-ink truncate group-hover:text-accent transition-colors">
                  {tool.name}
                </span>
                <span className="block mt-1.5 text-xs leading-relaxed text-ink/60 font-light line-clamp-3">
                  {desc}
                </span>
              </span>
              <span className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-accent pt-1">
                {t('edu.aiTools.open', lang)}
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
};

export const AiToolsPage: React.FC = () => {
  const { lang, dir } = useLang();
  const [tools, setTools] = useState<AiTool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchAiTools().then((data) => {
      if (!mounted) return;
      setTools(data);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const students = tools.filter((tool) => AI_TOOL_META[tool.url]?.section === 'students');
  const teachers = tools.filter((tool) => AI_TOOL_META[tool.url]?.section !== 'students');

  const crumbs = [
    { label: t('breadcrumb.home', lang), to: '/' },
    { label: t('services.page.title', lang), to: '/services' },
    { label: t('edu.title', lang), to: '/services/Edu' },
    { label: t('edu.aiTools.title', lang) },
  ];

  return (
    <div className="relative z-10 w-full min-h-screen pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <Seo
        title={`${t('edu.aiTools.title', lang)} — Jalal Amanj`}
        description={t('edu.aiTools.desc', lang)}
        path="/services/Edu/ai-tools"
        jsonLd={[breadcrumbJsonLd(crumbs)]}
      />
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Breadcrumbs items={crumbs} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-ink tracking-tight leading-[0.95] max-w-2xl">
            {t('edu.aiTools.title', lang)}
          </h1>
          <p className="mt-4 text-sm text-ink font-light leading-relaxed max-w-2xl">
            {t('edu.aiTools.desc', lang)}
          </p>
          {!loading && (
            <p className="mt-2 text-xs text-ink font-light uppercase tracking-widest" dir={dir}>
              {t('edu.aiTools.count', lang, { n: String(tools.length) })} · {t('edu.aiTools.hint', lang)}
            </p>
          )}
        </motion.div>

        {loading ? (
          <div className="card p-10 text-center rounded-[32px] border border-line my-8 max-w-2xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-ink font-light animate-pulse">
              {t('loading', lang)}
            </p>
          </div>
        ) : (
          <>
            <Carousel
              title={t('edu.aiTools.sectionStudents', lang)}
              icon={<GraduationCap className="w-4 h-4" />}
              tools={students}
              lang={lang}
              dir={dir}
            />
            <Carousel
              title={t('edu.aiTools.sectionTeachers', lang)}
              icon={<Presentation className="w-4 h-4" />}
              tools={teachers}
              lang={lang}
              dir={dir}
            />
          </>
        )}
      </div>
    </div>
  );
};