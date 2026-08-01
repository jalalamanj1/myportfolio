import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ABOUT_DATA } from '../data/portfolioData';
import { 
  Award, Briefcase, GraduationCap, Globe, Code2, 
  CheckCircle2, Cpu, Terminal, Sparkles, BookOpen 
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'experience' | 'education' | 'credentials'>('overview');

  return (
    <section id="about" className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel p-6 sm:p-10 md:p-14 text-white overflow-hidden relative"
      >
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-wide text-white">
            {ABOUT_DATA.title}
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D7C4A3] to-transparent mt-4" />
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-4 border-b border-white/15">
          {[
            { id: 'overview', label: 'About & Bio' },
            { id: 'skills', label: 'Skills & Tech' },
            { id: 'experience', label: 'Experience' },
            { id: 'education', label: 'Education' },
            { id: 'credentials', label: 'Certifications & Languages' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#D7C4A3] text-black shadow-lg font-semibold'
                    : 'bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/15'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="min-h-[380px]">
          {/* TAB 1: OVERVIEW & BIO - IMAGE + TEXT */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
            >
              {/* Profile Image */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative group max-w-sm w-full">
                  <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-[#D7C4A3]/40 via-white/20 to-[#D7C4A3]/20 blur-xl opacity-60 group-hover:opacity-100 transition duration-700 pointer-events-none" />
                  
                  <div className="relative rounded-[28px] overflow-hidden border border-white/25 shadow-2xl bg-neutral-900/40">
                    <img
                      src={ABOUT_DATA.profileImage}
                      alt="Jalal Amanj Profile Portrait"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-cover aspect-square transition duration-700 group-hover:scale-105"
                    />
                    
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-between">
                      <p className="text-xs font-semibold text-white">Jalal Amanj</p>
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#D7C4A3] animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio & Key Metrics */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#D7C4A3] leading-snug">
                  "{ABOUT_DATA.subtitle}"
                </h3>

                {ABOUT_DATA.bio.map((paragraph, index) => (
                  <p key={index} className="text-neutral-200 text-sm sm:text-base leading-relaxed font-light">
                    {paragraph}
                  </p>
                ))}

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-white/15">
                  {ABOUT_DATA.stats.map((stat, i) => (
                    <div key={i} className="text-center sm:text-left">
                      <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#D7C4A3]">{stat.value}</p>
                      <p className="text-xs text-neutral-300 font-light mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: SKILLS & TECHNOLOGIES */}
          {activeTab === 'skills' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Core Skill Categories */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D7C4A3] mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span>Core Engineering Disciplines</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {ABOUT_DATA.skills.map((cat, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D7C4A3]/40 transition-all">
                      <h4 className="text-sm font-semibold text-white mb-3 pb-2 border-b border-white/10">
                        {cat.title}
                      </h4>
                      <ul className="space-y-2">
                        {cat.skills.map((skill, sIdx) => (
                          <li key={sIdx} className="text-xs text-neutral-300 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D7C4A3]" />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Cloud */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D7C4A3] mb-4 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  <span>Technologies & Stack</span>
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {ABOUT_DATA.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/15 text-xs text-neutral-200 font-mono hover:border-[#D7C4A3]/50 hover:bg-[#D7C4A3]/10 hover:text-white transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: EXPERIENCE */}
          {activeTab === 'experience' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D7C4A3] mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>Professional Experience</span>
              </h3>
              <div className="space-y-4">
                {ABOUT_DATA.experiences.map((exp, expIdx) => (
                  <div key={expIdx} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D7C4A3]/30 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h4 className="text-base font-medium text-white">{exp.role}</h4>
                      <span className="text-xs px-3 py-1 rounded-full bg-[#D7C4A3]/20 border border-[#D7C4A3]/40 text-[#D7C4A3] font-mono">
                        {exp.year}
                      </span>
                    </div>
                    <p className="text-xs text-[#D7C4A3] font-light mb-2">{exp.company}</p>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: EDUCATION */}
          {activeTab === 'education' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D7C4A3] mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>Academic & Formal Education</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ABOUT_DATA.education.map((edu, eduIdx) => (
                  <div key={eduIdx} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D7C4A3]/30 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono text-[#D7C4A3] px-2.5 py-0.5 rounded-full bg-[#D7C4A3]/10 border border-[#D7C4A3]/30">
                          {edu.year}
                        </span>
                      </div>
                      <h4 className="text-base font-semibold text-white mb-1">{edu.degree}</h4>
                      <p className="text-xs text-[#D7C4A3] mb-3">{edu.institution}</p>
                      <p className="text-xs text-neutral-300 font-light leading-relaxed">{edu.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 5: CERTIFICATIONS & LANGUAGES */}
          {activeTab === 'credentials' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Certifications */}
              <div className="lg:col-span-8 space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D7C4A3] mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Industry Certifications</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ABOUT_DATA.certifications.map((cert, cIdx) => (
                    <div key={cIdx} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D7C4A3]/30 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-[#D7C4A3]">{cert.year}</span>
                        {cert.credentialId && (
                          <span className="text-[10px] font-mono text-neutral-400">{cert.credentialId}</span>
                        )}
                      </div>
                      <h4 className="text-xs font-semibold text-white mb-1">{cert.name}</h4>
                      <p className="text-[11px] text-neutral-300 font-light">{cert.issuer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="lg:col-span-4 space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D7C4A3] mb-4 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Languages</span>
                </h3>
                <div className="space-y-3">
                  {ABOUT_DATA.languages.map((lang, lIdx) => (
                    <div key={lIdx} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{lang.language}</span>
                      <span className="text-xs text-[#D7C4A3] font-light">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
