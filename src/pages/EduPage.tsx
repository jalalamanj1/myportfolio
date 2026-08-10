import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, GraduationCap } from 'lucide-react';

export const EduPage: React.FC = () => {
  return (
    <div className="relative z-10 w-full min-h-screen pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-button text-xs font-medium uppercase tracking-wider text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D7C4A3]" />
            <span>Back</span>
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="glass-panel p-10 text-center rounded-[32px] border border-white/15 max-w-2xl mx-auto">
            <GraduationCap className="w-10 h-10 text-[#D7C4A3] mx-auto mb-4" />
            <h1 className="font-serif text-5xl sm:text-6xl font-light text-white tracking-tight mb-4">
              Edu
            </h1>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D7C4A3] to-transparent mx-auto mb-6" />
            <p className="text-xs text-neutral-300 font-light leading-relaxed max-w-md mx-auto">
              Educational resources and learning materials coming soon.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
