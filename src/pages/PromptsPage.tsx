import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Laptop, Code, Palette, Sparkles, Monitor, Smartphone, Globe,
  Layout, Database, Server, Cpu, Wrench, Zap, Layers, HelpCircle,
  Pentagon, Image, Share2, FileText, Box, Component, Camera,
  Maximize2, Brush, MessageSquare, BookOpen, FileCode, Search,
  Calendar, ArrowLeft, Copy, Check, FolderOpen
} from 'lucide-react';
import { fetchPromptCategories } from '../data/promptStore';
import { PromptCategory } from '../types';

const getIcon = (iconName: string, className: string = "w-6 h-6") => {
  switch (iconName) {
    case 'Laptop': return <Laptop className={className} />;
    case 'Code': return <Code className={className} />;
    case 'Palette': return <Palette className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Monitor': return <Monitor className={className} />;
    case 'Smartphone': return <Smartphone className={className} />;
    case 'Globe': return <Globe className={className} />;
    case 'Layout': return <Layout className={className} />;
    case 'Database': return <Database className={className} />;
    case 'Server': return <Server className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'Wrench': return <Wrench className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Layers': return <Layers className={className} />;
    case 'HelpCircle': return <HelpCircle className={className} />;
    case 'Pentagon': return <Pentagon className={className} />;
    case 'Image': return <Image className={className} />;
    case 'Share2': return <Share2 className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'Box': return <Box className={className} />;
    case 'Component': return <Component className={className} />;
    case 'Camera': return <Camera className={className} />;
    case 'Maximize2': return <Maximize2 className={className} />;
    case 'Brush': return <Brush className={className} />;
    case 'MessageSquare': return <MessageSquare className={className} />;
    case 'BookOpen': return <BookOpen className={className} />;
    case 'FileCode': return <FileCode className={className} />;
    case 'Search': return <Search className={className} />;
    case 'Calendar': return <Calendar className={className} />;
    default: return <Sparkles className={className} />;
  }
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
};

export const PromptsPage: React.FC = () => {
  const [categories, setCategories] = useState<PromptCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchPromptCategories().then((data) => {
      if (!mounted) return;
      setCategories(data);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const activeCat = activeCategory
    ? categories.find((c) => c.id === activeCategory)
    : null;

  const handleCopy = (id: string, text: string) => {
    copyToClipboard(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 2000);
    });
  };

  return (
    <div className="relative z-10 w-full min-h-screen pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
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
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light text-white tracking-tight leading-[0.95]">
            Prompts
          </h1>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D7C4A3] to-transparent mx-auto mt-8" />
          <p className="text-xs text-neutral-300 font-light mt-6 max-w-lg mx-auto leading-relaxed">
            {activeCat
              ? `${activeCat.title} — pick a card and copy its prompt.`
              : 'Pick a category, then copy the prompt you need.'}
          </p>
        </motion.div>

        {loading ? (
          <div className="glass-panel p-10 text-center rounded-[32px] border border-white/15 my-8 max-w-2xl mx-auto">
            <Sparkles className="w-8 h-8 text-[#D7C4A3] mx-auto mb-4 animate-pulse" />
            <h3 className="font-serif text-2xl font-light text-white mb-2">Loading Prompts...</h3>
          </div>
        ) : activeCat === null ? (
          categories.length === 0 ? (
            <div className="glass-panel p-10 text-center rounded-[32px] border border-white/15 my-8 max-w-2xl mx-auto">
              <Sparkles className="w-8 h-8 text-[#D7C4A3] mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-light text-white mb-2">No Prompt Categories Yet</h3>
              <p className="text-xs text-neutral-300 font-light leading-relaxed max-w-md mx-auto">
                Prompt categories will appear here once added through the admin dashboard.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className="glass-card p-8 rounded-[28px] border border-white/15 hover:border-[#D7C4A3]/50 flex flex-col items-center text-center gap-4 group transition-all duration-300 hover:shadow-2xl cursor-pointer"
                >
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-[#D7C4A3] group-hover:bg-[#D7C4A3]/20 group-hover:scale-110 transition-all">
                    {getIcon(cat.iconName, "w-7 h-7")}
                  </div>
                  <h3 className="font-serif text-2xl font-light text-white group-hover:text-[#D7C4A3] transition-colors">
                    {cat.title}
                  </h3>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 uppercase tracking-widest">
                    {cat.prompts.length} prompt{cat.prompts.length === 1 ? '' : 's'}
                  </span>
                </motion.button>
              ))}
            </div>
          )
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: 'ease-in-out' }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-white/10 border border-white/20 text-[#D7C4A3]">
                    {getIcon(activeCat.iconName, "w-6 h-6")}
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">
                    {activeCat.title}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="text-xs text-neutral-400 hover:text-[#D7C4A3] transition-colors cursor-pointer uppercase font-mono tracking-wider"
                >
                  Close ✕
                </button>
              </div>

              {activeCat.prompts.length === 0 ? (
                <div className="glass-panel p-10 text-center rounded-[32px] border border-white/15 my-8 max-w-2xl mx-auto">
                  <FolderOpen className="w-8 h-8 text-[#D7C4A3] mx-auto mb-4" />
                  <h3 className="font-serif text-2xl font-light text-white mb-2">No Prompts Here Yet</h3>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed max-w-md mx-auto">
                    Prompts for this category will appear once added through the admin dashboard.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeCat.prompts.map((prompt) => (
                    <motion.div
                      key={prompt.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="glass-card rounded-[28px] border border-white/15 hover:border-[#D7C4A3]/50 overflow-hidden group transition-all duration-300 hover:shadow-2xl"
                    >
                      <div className="aspect-[3/4] overflow-hidden bg-neutral-900/40">
                        <img
                          src={prompt.image}
                          alt={prompt.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-serif text-xl font-light text-white mb-3 truncate">
                          {prompt.title}
                        </h3>
                        <button
                          onClick={() => handleCopy(prompt.id, prompt.promptText)}
                          className={`w-full py-3 px-4 rounded-xl text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                            copiedId === prompt.id
                              ? 'bg-[#D7C4A3] text-black font-semibold'
                              : 'glass-button-primary group-hover:translate-y-0'
                          }`}
                        >
                          {copiedId === prompt.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Prompt</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
