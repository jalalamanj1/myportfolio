import React from 'react';
import { HERO_DATA } from '../data/portfolioData';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Fixed Full Screen Background Image */}
      <img
        src={HERO_DATA.bgImage}
        alt="Background Architectural Interior"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover fixed inset-0 scale-105 filter brightness-95"
      />
      
      {/* 35% Dark Translucent Overlay + Subtle Radial Vignette for Readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-brightness-90" />
      
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.75) 100%)'
        }}
      />

      {/* Subtle Golden ambient accent light spots */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#D7C4A3]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#D7C4A3]/10 rounded-full blur-[140px] pointer-events-none" />
    </div>
  );
};
