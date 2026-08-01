import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Code, Palette, Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';

export const ServicesPreviewSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="services-preview" className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel p-8 sm:p-12 md:p-16 text-white text-center relative overflow-hidden border border-white/20 shadow-2xl"
      >
        {/* Subtle Decorative Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#D7C4A3]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          {/* Title */}
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-wide text-white mb-6">
            Services
          </h2>

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D7C4A3] to-transparent mb-8" />

          {/* Short Description */}
          <p className="text-neutral-200 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-10">
            I provide professional technical, creative, and consulting services tailored for enterprises, startups, and innovative creators. From native high-performance desktop applications and cloud architectures to bespoke brand visual identities and technical advisory, every solution is built with uncompromised craftsmanship.
          </p>

          {/* Quick Pillar Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-10 text-left">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-white/10 text-[#D7C4A3]">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Technology</h3>
                <p className="text-[11px] text-neutral-300 font-light mt-0.5">Desktop Apps, APIs, Database & Local AI</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-white/10 text-[#D7C4A3]">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Creative</h3>
                <p className="text-[11px] text-neutral-300 font-light mt-0.5">Brand Identity, 3D Mockups & UI Graphics</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-white/10 text-[#D7C4A3]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Advisory</h3>
                <p className="text-[11px] text-neutral-300 font-light mt-0.5">Consulting, Workshops & Architecture</p>
              </div>
            </div>
          </div>

          {/* Large Action Button */}
          <button
            onClick={() => navigate('/services')}
            className="glass-button-primary px-10 py-4 rounded-full text-sm font-semibold tracking-wider uppercase flex items-center gap-3 group cursor-pointer shadow-xl hover:scale-105 transition-all duration-300"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};
