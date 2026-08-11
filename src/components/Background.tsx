import React, { memo } from 'react';
import { HERO_DATA } from '../data/portfolioData';

export const Background: React.FC = memo(function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Fixed Full Screen Background Image (portrait variant for phones) */}
      <picture>
        <source media="(max-width: 767px)" srcSet={HERO_DATA.bgImageMobile} />
        <img
          src={HERO_DATA.bgImage}
          alt="Background Architectural Interior"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover fixed inset-0 scale-105 filter brightness-95"
        />
      </picture>

      {/* 35% Dark Translucent Overlay + Subtle Radial Vignette for Readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.75) 100%)'
        }}
      />

      {/* Subtle Golden ambient accent light spots (radial gradients instead of
          filter blur — much cheaper for the compositor on mobile GPUs) */}
      <div
        className="absolute -top-32 left-1/4 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(215, 196, 163, 0.16) 0%, rgba(215, 196, 163, 0) 70%)'
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(215, 196, 163, 0.12) 0%, rgba(215, 196, 163, 0) 70%)'
        }}
      />
    </div>
  );
});
