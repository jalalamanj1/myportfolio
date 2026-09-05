import React, { memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';

const LOGO_URL = `${import.meta.env.BASE_URL}logo.webp`;

type NavItem = { key: string; href: string; route?: string };

const NAV_ITEMS: readonly NavItem[] = [
  { key: 'home', href: '#hero' },
  { key: 'work', href: '#work' },
  { key: 'services', href: '#services', route: '/services' },
  { key: 'contact', href: '#contact' },
];

export const Navbar: React.FC = memo(function Navbar() {
  const navigate = useNavigate();
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (href: string) => {
    setMenuOpen(false);
    if (window.location.pathname === '/') {
      const el = document.querySelector(href);
      if (el) {
        (el as HTMLElement).scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate('/');
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  const handleNav = (item: NavItem) => {
    setMenuOpen(false);
    if (item.route) {
      if (window.location.pathname === item.route) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(item.route);
      }
      return;
    }
    goTo(item.href);
  };

  const toggleLang = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen ? 'bg-ivory/90 backdrop-blur-md border-b border-line' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        {/* Logo / monogram */}
        <button
          onClick={() => goTo('#hero')}
          className="flex items-center gap-3 cursor-pointer group"
          aria-label={t('site.name', lang)}
        >
          <img
            src={LOGO_URL}
            alt={t('site.name', lang)}
            className="w-9 h-9 rounded-full object-cover border border-line"
            aria-hidden="true"
          />
          <span className="hidden sm:inline font-serif text-[15px] font-medium tracking-[0.14em] text-ink group-hover:text-accent transition-colors uppercase">
            {t('site.name', lang)}
          </span>
        </button>

        {/* Center links (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNav(item)}
              className="text-[13px] font-medium text-ink-soft hover:text-ink transition-colors cursor-pointer"
            >
              {t(`nav.${item.key}`, lang)}
            </button>
          ))}
        </div>

        {/* Right: language + CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            aria-label={t('lang.switch', lang)}
            className="hidden sm:inline text-[12px] font-semibold tracking-widest uppercase text-ink-soft hover:text-accent transition-colors cursor-pointer px-2 py-1"
          >
            {lang === 'ar' ? 'EN' : 'AR'}
          </button>

          <button onClick={() => goTo('#contact')} className="btn-primary !py-2.5 !px-5 hidden sm:inline-flex">
            {t('nav.cta', lang)}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden inline-flex flex-col justify-center items-center gap-[5px] w-9 h-9 cursor-pointer"
            aria-label="menu"
          >
            <span className={`block w-5 h-[2px] bg-ink transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-[2px] bg-ink transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[2px] bg-ink transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-line bg-ivory/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNav(item)}
                className="text-start py-3 text-[15px] font-medium text-ink hover:text-accent transition-colors cursor-pointer border-b border-line/60 last:border-0"
              >
                {t(`nav.${item.key}`, lang)}
              </button>
            ))}
            <button
              onClick={toggleLang}
              className="text-start py-3 text-[13px] font-semibold tracking-widest uppercase text-ink cursor-pointer"
            >
              {lang === 'ar' ? 'EN' : 'AR'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
});
