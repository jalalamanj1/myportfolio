import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ProductCarousel } from '../components/ProductCarousel';
import { ServicesPreviewSection } from '../components/ServicesPreviewSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { ProjectModal } from '../components/ProjectModal';
import { getAllProducts } from '../data/productStore';
import { Product } from '../types';

export const HomePage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const products = getAllProducts();

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
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      {/* Section 4: Services Preview */}
      <ServicesPreviewSection />

      {/* Section 5: Contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Project Detail Glass Modal */}
      <ProjectModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
