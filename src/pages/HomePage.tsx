import React, { useCallback, useEffect, useState, lazy, Suspense } from 'react';
import { HeroSection } from '../components/HeroSection';
import { MyWorkSection } from '../components/MyWorkSection';
import { ServicesSection } from '../components/ServicesSection';
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
    <main className="flex flex-col w-full min-h-screen">
      {/* Hero */}
      <HeroSection />

      {/* My Work — centerpiece product grid */}
      <MyWorkSection products={products} onSelectProduct={handleSelectProduct} />

      {/* Services */}
      <ServicesSection />

      {/* Contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Project Detail Modal */}
      <Suspense fallback={null}>
        <ProjectModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      </Suspense>
    </main>
  );
};
