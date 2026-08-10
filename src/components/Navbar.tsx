import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Cpu } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';

export const Navbar: React.FC = memo(function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  const scrollToSection = useCallback((sectionId: string) => {
    setMobileMenuOpen(false);
    if (!isHomePage) {
      navigate('/', { replace: false });
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const elem = document.getElementById(sectionId);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isHomePage, navigate]);

  const navLinks = useMemo(() => [
    { label: t('nav.home', lang), action: () => scrollToSection('hero'), isRoute: false, path: '/' },
    { label: t('nav.products', lang), action: () => scrollToSection('products'), isRoute: false, path: '#products' },
    { label: t('nav.services', lang), action: () => navigate('/services'), isRoute: true, path: '/services' },
    { label: t('nav.contact', lang), action: () => scrollToSection('contact'), isRoute: false, path: '#contact' },
  ], [scrollToSection, navigate, lang]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={() => {
            if (isHomePage) window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:border-[#D7C4A3]/60 transition-colors">
            <Cpu className="w-4 h-4 text-[#D7C4A3]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-widest text-white font-medium group-hover:text-[#D7C4A3] transition-colors">
              JALAL AMANJ
            </span>
            <span className="text-[9px] tracking-wider uppercase text-neutral-400 font-sans">
              {t('nav.brand.subtitle', lang)}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = link.isRoute 
              ? location.pathname.startsWith(link.path)
              : isHomePage && location.hash === link.path;

            return (
              <button
                key={link.label}
                onClick={link.action}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive || (link.path === '/services' && location.pathname.startsWith('/services'))
                    ? 'bg-[#D7C4A3] text-black shadow-md font-semibold'
                    : 'text-neutral-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* CTA + Lang Switch */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase border border-white/20 text-neutral-300 hover:text-white hover:border-[#D7C4A3]/60 transition-all cursor-pointer"
          >
            {lang === 'ar' ? 'EN' : 'AR'}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="glass-button-primary px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase flex items-center gap-1.5 cursor-pointer"
          >
            <span>{t('nav.initiate', lang)}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile: Lang + Menu */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-white/20 text-neutral-300 cursor-pointer"
          >
            {lang === 'ar' ? 'EN' : 'AR'}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-xl glass-button text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-white/15 bg-black/90 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    link.action();
                  }}
                  className="text-left text-sm font-medium text-neutral-200 hover:text-[#D7C4A3] py-2 border-b border-white/5 transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('contact');
                }}
                className="w-full mt-3 glass-button-primary py-3 rounded-xl text-xs font-medium uppercase tracking-wider text-center"
              >
                {t('nav.initiate', lang)}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});
