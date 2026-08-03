import React, { useState, memo } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle, Instagram, Mail } from 'lucide-react';
import { CONTACT_DATA } from '../data/portfolioData';

export const ContactSection: React.FC = memo(function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel p-6 sm:p-10 md:p-14 text-white overflow-hidden relative"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-wide text-white">
            {CONTACT_DATA.title}
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D7C4A3] to-transparent mt-4" />
        </div>

        {/* Form or Success Message */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-2xl bg-white/5 border border-[#D7C4A3]/40 text-center flex flex-col items-center space-y-4 my-8"
          >
            <div className="w-14 h-14 rounded-full bg-[#D7C4A3]/20 border border-[#D7C4A3] flex items-center justify-center text-[#D7C4A3]">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl text-white font-light">Dialogue Received</h3>
            <p className="text-xs text-neutral-300 max-w-sm font-light leading-relaxed">
              Thank you for reaching out. Jalal Amanj will review your technical inquiry and respond within 24 business hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-6 py-2 rounded-full glass-button text-xs font-medium uppercase tracking-wider cursor-pointer"
            >
              Send Another Inquiry
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="contact-name" className="text-xs font-light text-neutral-300 tracking-wider uppercase">
                  Your Name <span className="text-[#D7C4A3]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Lord Sterling"
                  className="glass-input px-4 py-3.5 text-sm font-light text-white placeholder-neutral-500"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="contact-email" className="text-xs font-light text-neutral-300 tracking-wider uppercase">
                  Email Address <span className="text-[#D7C4A3]">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. sterling@atelier.com"
                  className="glass-input px-4 py-3.5 text-sm font-light text-white placeholder-neutral-500"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="contact-message" className="text-xs font-light text-neutral-300 tracking-wider uppercase">
                Project Vision / Inquiry <span className="text-[#D7C4A3]">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your desktop app engineering requirements, tech stack specs, or service inquiry..."
                className="glass-input px-4 py-3.5 text-sm font-light text-white placeholder-neutral-500 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              id="send-inquiry-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full glass-button-primary py-4 rounded-xl text-xs font-medium tracking-[0.2em] uppercase flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Transmitting...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#D7C4A3]" />
                  <span>Send</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Contact Info & Social Connections */}
        <div className="mt-12 pt-8 border-t border-white/15 flex flex-col items-center space-y-6">
          <p className="text-[11px] font-light uppercase tracking-widest text-neutral-300">
            OR USE
          </p>

          <div className="grid grid-cols-2 gap-3 w-full max-w-3xl">
            <a
              href="mailto:inquieryjalalamanj@proton.me"
              aria-label="Email"
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D7C4A3]/60 hover:bg-[#D7C4A3]/10 flex items-center justify-center transition-all text-neutral-200 hover:text-white group"
            >
              <Mail className="w-5 h-5 text-[#D7C4A3]" />
            </a>

            <a
              href="https://instagram.com/jalalamanj1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D7C4A3]/60 hover:bg-[#D7C4A3]/10 flex items-center justify-center transition-all text-neutral-200 hover:text-white group"
            >
              <Instagram className="w-5 h-5 text-[#D7C4A3]" />
            </a>
          </div>
        </div>

      </motion.div>
    </section>
  );
});
