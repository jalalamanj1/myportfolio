import React, { useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, ShieldCheck, Download } from 'lucide-react';
import { Product } from '../types';

interface ProjectModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = memo(function ProjectModal({ product, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (product) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Glass Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl glass-panel p-5 sm:p-7 text-white max-h-[90vh] overflow-y-auto my-auto shadow-2xl border border-white/20"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Project Modal"
            className="absolute top-4 right-4 p-2.5 rounded-full glass-button group hover:rotate-90 transition-transform duration-300 cursor-pointer"
          >
            <X className="w-4 h-4 text-white group-hover:text-[#D7C4A3]" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-stretch">
            {/* Modal Image */}
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-white/20 bg-neutral-900/40 lg:self-center">
              <img
                src={product.image}
                alt={product.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover max-h-[340px] lg:max-h-[420px]"
              />
            </div>

            {/* Modal Content */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-[#D7C4A3]/20 border border-[#D7C4A3]/40 text-xs font-mono text-[#D7C4A3]">
                    {product.category}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#D7C4A3]" />
                    {product.year}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white tracking-wide">
                  {product.title}
                </h2>
              </div>

              {/* Full Description */}
              <p className="text-sm text-neutral-200 leading-relaxed font-light">
                {product.fullDescription}
              </p>

              {/* Technical Specifications */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="text-[11px] font-semibold text-[#D7C4A3] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Tags
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                  {product.specs.map((spec, idx) => (
                    <div key={idx} className="text-xs">
                      <span className="text-neutral-400 font-light">{spec.label}: </span>
                      <span className="text-white font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-1">
                <a
                  href={product.downloadUrl || product.image}
                  download={product.downloadUrl ? undefined : `${product.id}-specs.jpg`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full glass-button-primary py-2.5 rounded-xl text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <Download className="w-4 h-4" />
                  <span>download</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});
