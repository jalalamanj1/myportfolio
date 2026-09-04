import React, { useCallback, useEffect, useState, lazy, Suspense } from 'react';
import { HeroSection } from '../components/HeroSection';
import { MyWorkSection } from '../components/MyWorkSection';
import { ServicesSection } from '../components/ServicesSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { getAllProducts, fetchProducts } from '../data/productStore';
import { Product } from '../types';
import { CONTACT_DATA } from '../data/portfolioData';
import { Seo, itemListJsonLd, SITE_NAME, SITE_URL, SOCIAL_IMAGE } from '../components/Seo';

// Project detail modal only loads when a project is actually opened.
const ProjectModal = lazy(() =>
  import('../components/ProjectModal').then((m) => ({ default: m.ProjectModal }))
);

export const HomePage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(() => getAllProducts());

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Practical digital solutions, desktop applications, and AI-powered tools.',
  };

  const businessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Jalal Amanj Digital Solutions',
    url: SITE_URL,
    email: CONTACT_DATA.email,
    image: SOCIAL_IMAGE,
    logo: `${SITE_URL}/logo.webp`,
    description:
      'Practical digital solutions, desktop applications, and AI-powered tools by Jalal Amanj.',
    areaServed: 'Worldwide',
    sameAs: [CONTACT_DATA.instagram, CONTACT_DATA.linkedin, CONTACT_DATA.github],
  };

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jalal Amanj',
    url: SITE_URL,
    jobTitle: 'Digital Solutions & Software Engineer',
    email: `mailto:${CONTACT_DATA.email}`,
    sameAs: [CONTACT_DATA.instagram, CONTACT_DATA.linkedin, CONTACT_DATA.github],
  };

  const productsJsonLd = itemListJsonLd(products.map((p) => p.title));

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
      <Seo
        title="Jalal Amanj — Digital Solutions, Apps & AI Tools"
        description="Practical digital solutions, desktop applications, and AI-powered tools by Jalal Amanj."
        path="/"
        jsonLd={[websiteJsonLd, businessJsonLd, personJsonLd, productsJsonLd]}
      />
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
