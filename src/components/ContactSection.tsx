import React, { useState, memo } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle, Mail, Instagram } from 'lucide-react';
import { CONTACT_DATA } from '../data/portfolioData';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';

export const ContactSection: React.FC = memo(function ContactSection() {
  const { lang } = useLang();
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
    <section id="contact" className="w-full py-24 sm:py-28 px-6 sm:px-8">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <p className="eyebrow mb-4">{t('contact.eyebrow', lang)}</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-ink tracking-tight">
            {t('contact.lead', lang)}
          </h2>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-10 text-center flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-full bg-accent-soft text-accent flex items-center justify-center mb-5">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-normal text-ink">{t('contact.received.title', lang)}</h3>
            <p className="mt-3 text-sm text-ink-muted max-w-sm leading-relaxed">
              {t('contact.received.desc', lang)}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 btn-secondary"
            >
              {t('contact.received.again', lang)}
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label htmlFor="contact-name" className="text-[13px] font-medium text-ink">
                  {t('contact.name', lang)} <span className="text-accent">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="contact-email" className="text-[13px] font-medium text-ink">
                  {t('contact.email', lang)} <span className="text-accent">*</span>
                </label>
                <input
                  id="contact-email"
                  type="text"
                  required
                  dir="auto"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="contact-message" className="text-[13px] font-medium text-ink">
                {t('contact.message', lang)} <span className="text-accent">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="input-field resize-none"
              />
            </div>

            <button
              id="send-inquiry-btn"
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full !py-4 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>{t('contact.sending', lang)}</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{t('contact.send', lang)}</span>
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-10 pt-8 border-t border-line flex items-center justify-center gap-3">
          <a
            href={`mailto:${CONTACT_DATA.email}`}
            aria-label={t('contact.email', lang)}
            className="w-11 h-11 rounded-full border border-line text-ink-soft hover:text-accent hover:border-accent flex items-center justify-center transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href={CONTACT_DATA.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('contact.instagram', lang)}
            className="w-11 h-11 rounded-full border border-line text-ink-soft hover:text-accent hover:border-accent flex items-center justify-center transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
});
