import React, { useCallback, useEffect, useRef, useState, memo } from 'react';
import { ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useLang } from '../contexts/LanguageContext';
import { t, localizeProduct } from '../i18n';
import { assetUrl } from '../utils/asset';

interface ProductCarouselProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

interface ProductCardProps {
  product: Product;
  isCenter: boolean;
  isRight: boolean;
  isLeft: boolean;
  translateX: string;
  scale: number;
  opacity: number;
  zIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectProduct: (product: Product) => void;
}

const ProductCard = memo(function ProductCard({
  product,
  isCenter,
  isRight,
  isLeft,
  translateX,
  scale,
  opacity,
  zIndex,
  onPrev,
  onNext,
  onSelectProduct,
}: ProductCardProps) {
  const { lang } = useLang();
  const localized = localizeProduct(product, lang);
  return (
    <div
      onClick={() => {
        if (isLeft) onPrev();
        else if (isRight) onNext();
      }}
      style={{
        transform: `translateX(${translateX}) scale(${scale})`,
        opacity: opacity,
        zIndex: zIndex,
        transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms ease',
        willChange: 'transform',
      }}
      className={`absolute w-[310px] sm:w-[330px] h-[490px] sm:h-[510px] rounded-[28px] glass-card p-5 flex flex-col justify-between overflow-hidden cursor-pointer select-none ${
        isCenter
          ? 'border border-[#D7C4A3]/50 shadow-[0_25px_60px_rgba(0,0,0,0.5)] ring-1 ring-[#D7C4A3]/20'
          : 'hover:opacity-60'
      }`}
    >
      {/* Card Image Container */}
      <div className="relative w-full h-[270px] sm:h-[290px] rounded-2xl overflow-hidden group">
        <img
          src={assetUrl(localized.image)}
          alt={localized.title}
          referrerPolicy="no-referrer"
          loading={isCenter ? 'eager' : 'lazy'}
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Dark gradient overlay on image bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/40 border border-white/20 text-[10px] uppercase tracking-widest text-[#D7C4A3] font-medium">
          {localized.category}
        </div>

        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 border border-white/15 text-[10px] font-mono text-neutral-300">
          {localized.year}
        </div>
      </div>

      {/* Content Block */}
      <div className="flex-1 flex flex-col justify-between pt-4 px-1">
        <div>
          <h3 className="font-serif text-2xl font-normal text-white tracking-wide truncate">
            {localized.title}
          </h3>
          <p className="text-xs text-neutral-300 font-light mt-1.5 line-clamp-2 leading-relaxed">
            {localized.shortDescription}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectProduct(product);
          }}
          className="w-full mt-3 py-2.5 px-4 rounded-xl glass-button text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 group cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-[#D7C4A3] group-hover:scale-110 transition-transform" />
          <span>{t('products.view', lang)}</span>
        </button>
      </div>
    </div>
  );
});

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, onSelectProduct }) => {
  const { lang } = useLang();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const total = products.length;

  const touchStartX = useRef<number | null>(null);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const selectSlide = useCallback((idx: number) => {
    setCurrentIndex(idx);
  }, []);

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch swipe handling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;

      if (diff > 50) {
        handleNext();
      } else if (diff < -50) {
        handlePrev();
      }
      touchStartX.current = null;
    },
    [handleNext, handlePrev]
  );

  if (total === 0) {
    return (
      <section id="products" className="relative z-10 w-full py-24 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-wide text-white">
            {t('products.featured', lang)}
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D7C4A3] to-transparent mt-4" />
          <div className="mt-12 flex flex-col items-center gap-3 text-neutral-400">
            <Sparkles className="w-6 h-6 text-[#D7C4A3]" />
            <p className="text-xs font-light">{t('products.empty', lang)}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="relative z-10 w-full py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-wide text-white">
            {t('products.featured', lang)}
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D7C4A3] to-transparent mt-4" />
        </div>

        {/* Carousel Container */}
        <div
          className="relative w-full max-w-5xl h-[560px] sm:h-[600px] flex items-center justify-center touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            aria-label="Previous Product"
            className="absolute left-2 sm:left-6 md:left-12 z-40 p-3.5 sm:p-4 rounded-full glass-button group hover:scale-110 cursor-pointer shadow-2xl"
          >
            <ChevronLeft className="w-5 h-5 text-white group-hover:text-[#D7C4A3] transition-colors" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Product"
            className="absolute right-2 sm:right-6 md:right-12 z-40 p-3.5 sm:p-4 rounded-full glass-button group hover:scale-110 cursor-pointer shadow-2xl"
          >
            <ChevronRight className="w-5 h-5 text-white group-hover:text-[#D7C4A3] transition-colors" />
          </button>

          {/* Cards Stack */}
          <div className="relative w-full h-full flex items-center justify-center">
            {products.map((product, index) => {
              // Calculate relative offset from current center
              let offset = (index - currentIndex + total) % total;
              if (offset > total / 2) {
                offset -= total;
              }

              const isCenter = offset === 0;
              const isRight = offset === 1 || (total === 2 && offset === 1);
              const isLeft = offset === -1 || (total === 2 && offset === -1);
              const isVisible = isCenter || isRight || isLeft;

              if (!isVisible) return null;

              // Positioning and scale adjustments
              let translateX = '0%';
              let scale = 1;
              let opacity = 1;
              let zIndex = 10;

              if (isCenter) {
                translateX = '0%';
                scale = 1;
                opacity = 1;
                zIndex = 30;
              } else if (isRight) {
                translateX = '70%';
                scale = 0.84;
                opacity = 0.42;
                zIndex = 20;
              } else if (isLeft) {
                translateX = '-70%';
                scale = 0.84;
                opacity = 0.42;
                zIndex = 20;
              }

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  isCenter={isCenter}
                  isRight={isRight}
                  isLeft={isLeft}
                  translateX={translateX}
                  scale={scale}
                  opacity={opacity}
                  zIndex={zIndex}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  onSelectProduct={onSelectProduct}
                />
              );
            })}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2.5 mt-8">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => selectSlide(idx)}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 bg-[#D7C4A3] shadow-[0_0_12px_rgba(215,196,163,0.6)]'
                  : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
