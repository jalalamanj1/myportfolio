import React, { memo } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { HERO_DATA } from '../data/portfolioData';

export const HeroSection: React.FC = memo(() => {
  const scrollToAbout = () => {
    const aboutElem = document.getElementById('about');
    if (aboutElem) {
      aboutElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 z-10 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
        {/* Main Title - Cormorant Garamond */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-[0.95] drop-shadow-2xl"
        >
          {HERO_DATA.name}
        </motion.h1>

        {/* Title / Role */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-xl sm:text-2xl md:text-3xl text-[#D7C4A3] font-light mt-4 tracking-wide"
        >
          {HERO_DATA.title}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans mt-5 text-sm sm:text-base md:text-lg text-neutral-300 font-light max-w-2xl leading-relaxed tracking-wide px-4"
        >
          {HERO_DATA.description}
        </motion.p>

        {/* Hero Glass Action Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap gap-4 justify-center items-center"
        >
          <button
            onClick={() => {
              const productsElem = document.getElementById('products');
              if (productsElem) productsElem.scrollIntoView({ behavior: 'smooth' });
            }}
            className="glass-button-primary px-8 py-3.5 rounded-full text-sm font-medium tracking-wider uppercase cursor-pointer"
          >
            Explore Portfolio
          </button>
          <button
            onClick={() => {
              const contactElem = document.getElementById('contact');
              if (contactElem) contactElem.scrollIntoView({ behavior: 'smooth' });
            }}
            className="glass-button px-8 py-3.5 rounded-full text-sm font-medium tracking-wider uppercase cursor-pointer"
          >
            Contact
          </button>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-8 sm:bottom-12 flex flex-col items-center gap-3 cursor-pointer group"
        onClick={scrollToAbout}
      >
        <span className="text-[11px] font-light tracking-[0.3em] text-neutral-400 group-hover:text-[#D7C4A3] transition-colors uppercase">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 bg-white/10 backdrop-blur-md group-hover:border-[#D7C4A3]/60 group-hover:bg-[#D7C4A3]/20 transition-all"
        >
          <ChevronDown className="w-5 h-5 text-neutral-300 group-hover:text-[#D7C4A3]" />
        </motion.div>
      </motion.div>
    </section>
  );
});
