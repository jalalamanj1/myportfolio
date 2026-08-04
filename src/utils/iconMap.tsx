import React from 'react';
import {
  Laptop, Code, Palette, Sparkles, Monitor, Smartphone, Globe,
  Layout, Database, Server, Cpu, Wrench, Zap, Layers, HelpCircle,
  Pentagon, Image, Share2, FileText, Box, Component, Camera,
  Maximize2, Brush, MessageSquare, BookOpen, FileCode, Search,
  Calendar
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Laptop, Code, Palette, Sparkles, Monitor, Smartphone, Globe,
  Layout, Database, Server, Cpu, Wrench, Zap, Layers, HelpCircle,
  Pentagon, Image, Share2, FileText, Box, Component, Camera,
  Maximize2, Brush, MessageSquare, BookOpen, FileCode, Search,
  Calendar, Figma: Component
};

export const getIcon = (iconName: string, className: string = "w-6 h-6"): React.ReactNode => {
  const Icon = iconMap[iconName];
  return Icon ? <Icon className={className} /> : <Sparkles className={className} />;
};
