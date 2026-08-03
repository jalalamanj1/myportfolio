import React, { useCallback, Suspense, lazy, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Laptop, Code, Palette, Sparkles, Monitor, Smartphone, Globe, 
  Layout, Database, Server, Cpu, Wrench, Zap, Layers, HelpCircle, 
  Pentagon, Image, Share2, FileText, Box, Component, Camera, 
  Maximize2, Brush, MessageSquare, BookOpen, FileCode, Search, 
  Calendar, ArrowLeft, Send
} from 'lucide-react';
import { fetchServices } from '../data/serviceStore';
import { ServiceCategory, ServiceItem } from '../types';

// Request modal only loads when a service is actually requested.
const ServiceRequestModal = lazy(() =>
  import('../components/ServiceRequestModal').then((m) => ({ default: m.ServiceRequestModal }))
);

// Helper to resolve icon by string name
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
    case 'Figma': return <Component className={className} />;
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

export const ServicesPage: React.FC = () => {
  // activeCategory can be null (hidden by default) or any category id added via the admin dashboard
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [prevCategory, setPrevCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<ServiceCategory[]>(() => []);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    fetchServices().then((data) => {
      if (!cancelled) setCategories(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleCategorySelect = (catId: string) => {
    if (activeCategory === catId) {
      setActiveCategory(null);
      return;
    }
    setPrevCategory(activeCategory);
    setActiveCategory(catId);
  };

  const handleCloseModal = useCallback(() => {
    setSelectedService(null);
  }, []);

  const displayedCategories = activeCategory !== null
    ? categories.filter(cat => cat.id === activeCategory)
    : [];

  return (
    <div className="relative z-10 w-full min-h-screen pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-button text-xs font-medium uppercase tracking-wider text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D7C4A3]" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Page Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light text-white tracking-tight leading-[0.95]">
            Services
          </h1>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D7C4A3] to-transparent mx-auto mt-8" />
        </motion.div>

        <div className="flex justify-center mb-12">
          <button
            onClick={() => navigate('/services/Prompts')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-button-primary text-xs font-medium uppercase tracking-wider hover:scale-105 transition-transform cursor-pointer shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            Prompt Library
          </button>
        </div>

        {/* Category Filter Pills Bar */}
        <div id="services-list-section" className="flex flex-wrap items-center justify-center gap-3 mb-12 scroll-mt-24">
          {categories.length === 0 ? (
            <p className="text-xs text-neutral-400 font-light">
              No services have been added yet. Check back soon.
            </p>
          ) : (
            categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#D7C4A3] text-black shadow-lg font-semibold'
                  : 'glass-button text-neutral-300 hover:text-white'
              }`}
            >
              {cat.title} ({cat.services.length})
            </button>
          ))
          )}
        </div>

        {/* Placeholder when no category is selected */}
        {activeCategory === null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-10 text-center rounded-[32px] border border-white/15 my-8 max-w-2xl mx-auto"
          >
            <Sparkles className="w-8 h-8 text-[#D7C4A3] mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-light text-white mb-2">Select a Service Category</h3>
            <p className="text-xs text-neutral-300 font-light leading-relaxed max-w-md mx-auto">
              Click any of the category buttons above to reveal detailed services, deliverables, and request forms.
            </p>
          </motion.div>
        )}

        {/* Category Content Container - Only This Changes */}
        <AnimatePresence mode="wait">
          {activeCategory !== null && displayedCategories.map((cat) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'ease-in-out' }}
              className="overflow-hidden"
            >
              {/* Category Header - Always Visible (No Animation) */}
              <div 
                key={cat.id} 
                id={`category-${cat.id}`} 
                className="scroll-mt-32 mb-8"
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-white/10 border border-white/20 text-[#D7C4A3]">
                      {getIcon(cat.iconName, "w-6 h-6")}
                    </div>
                    <div>
                      <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">
                        {cat.title}
                      </h2>
                      <p className="text-xs text-neutral-300 font-light mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveCategory(null)}
                    className="text-xs text-neutral-400 hover:text-[#D7C4A3] transition-colors cursor-pointer uppercase font-mono tracking-wider"
                  >
                    Close Services ✕
                  </button>
                </div>
              </div>

              {/* Service Cards Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.services.map((service) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="glass-card p-6 rounded-[28px] border border-white/15 hover:border-[#D7C4A3]/50 flex flex-col justify-between group transition-all duration-300 hover:shadow-2xl"
                    >
                      <div>
                        {/* Top Bar */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-[#D7C4A3] group-hover:bg-[#D7C4A3]/20 group-hover:scale-110 transition-all">
                            {getIcon(service.iconName, "w-5 h-5")}
                          </div>
                          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 uppercase tracking-widest">
                            {service.category}
                          </span>
                        </div>

                        {/* Service Name */}
                        <h3 className="font-serif text-2xl font-normal text-white mb-2 group-hover:text-[#D7C4A3] transition-colors">
                          {service.title}
                        </h3>

                        {/* Short Description */}
                        <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                          {service.description}
                        </p>

                        {/* Deliverables list if available */}
                        {service.deliverables && (
                          <div className="mb-6 pt-3 border-t border-white/10">
                            <span className="text-[10px] font-semibold text-[#D7C4A3] uppercase tracking-wider block mb-2">
                              Key Deliverables:
                            </span>
                            <ul className="space-y-1.5">
                              {service.deliverables.map((deliv, dIdx) => (
                                <li key={dIdx} className="text-[11px] text-neutral-300 flex items-center gap-2 font-light">
                                  <span className="w-1 h-1 rounded-full bg-[#D7C4A3]" />
                                  {deliv}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Service Action Button */}
                      {service.actionType === 'request' || !service.actionType ? (
                        <button
                          onClick={() => setSelectedService(service)}
                          className="w-full mt-2 py-3 px-4 rounded-xl glass-button-primary text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 group cursor-pointer shadow-lg"
                        >
                          <span>{service.actionLabel || 'Request Service'}</span>
                          <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      ) : (
                        <a
                          href={service.actionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={service.actionType === 'download' ? true : undefined}
                          className="w-full mt-2 py-3 px-4 rounded-xl glass-button-primary text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 group cursor-pointer shadow-lg"
                        >
                          <span>
                            {service.actionLabel ||
                              (service.actionType === 'download' ? 'Download' : 'Visit')}
                          </span>
                          <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Service Request Modal */}
      <Suspense fallback={null}>
        <ServiceRequestModal
          service={selectedService}
          onClose={handleCloseModal}
        />
      </Suspense>
    </div>
  );
};
