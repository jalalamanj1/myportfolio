import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, Sparkles, MessageSquare } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceRequestModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceRequestModal: React.FC<ServiceRequestModalProps> = memo(function ServiceRequestModal({ service, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl glass-card border border-white/20 p-6 sm:p-8 rounded-[32px] text-white overflow-hidden shadow-2xl my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 p-2.5 rounded-full glass-button text-neutral-300 hover:text-white cursor-pointer z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#D7C4A3]/20 border border-[#D7C4A3]/60 flex items-center justify-center text-[#D7C4A3]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl font-light text-white">Service Request Received</h3>
              <p className="text-xs text-neutral-300 max-w-md font-light leading-relaxed">
                Thank you for requesting <span className="text-[#D7C4A3] font-medium">{service.title}</span>. Jalal Amanj will review your requirements and respond via email within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-4 glass-button-primary px-8 py-3 rounded-full text-xs font-medium uppercase tracking-wider"
              >
                Close Window
              </button>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="mb-6">
                <span className="text-[11px] font-mono uppercase text-[#D7C4A3] tracking-widest flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Request Service
                </span>
                <h2 className="font-serif text-3xl font-light text-white">{service.title}</h2>
                <p className="text-xs text-neutral-300 font-light mt-1.5 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-light mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="glass-input px-4 py-3 text-xs text-white placeholder-neutral-500 w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-light mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="glass-input px-4 py-3 text-xs text-white placeholder-neutral-500 w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-light mb-1.5">
                    Project Details & Scope *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder={`Describe your goals for ${service.title}...`}
                    className="glass-input px-4 py-3 text-xs text-white placeholder-neutral-500 w-full resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="glass-button px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="glass-button-primary px-7 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Request</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
});
