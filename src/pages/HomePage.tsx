import React, { useCallback, useEffect, useState, lazy, Suspense } from 'react';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ProductCarousel } from '../components/ProductCarousel';
import { ServicesPreviewSection } from '../components/ServicesPreviewSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { getAllProducts, fetchProducts } from '../data/productStore';
import { Product } from '../types';

// Project detail modal only loads when a project is actually opened.
const ProjectModal = lazy(() =>
  import('../components/ProjectModal').then((m) => ({ default: m.ProjectModal }))
);

export const HomePage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(() => getAllProducts());

  useEffect(() => {
    let cancelled = false;
    fetchProducts().then((data) => {
      if (!cancelled) setProducts(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSelectProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  return (
    <div className="relative z-10 flex flex-col w-full min-h-screen">
      {/* Section 1: Hero */}
      <div id="hero">
        <HeroSection />
      </div>

      {/* Section 2: About & Resume */}
      <AboutSection />

      {/* Section 3: Products Horizontal Carousel */}
      <ProductCarousel
        products={products}
        onSelectProduct={handleSelectProduct}
      />

      {/* Section 4: Services Preview */}
      <ServicesPreviewSection />

      {/* Section 5: Contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Project Detail Glass Modal */}
      <Suspense fallback={null}>
        <ProjectModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      </Suspense>
    </div>
  );
};
