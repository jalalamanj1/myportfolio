import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useSiteProtection } from './hooks/useSiteProtection';
import { useLang } from './contexts/LanguageContext';
import { t } from './i18n';

// Route-level code splitting: heavy pages load only when navigated to.
const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage }))
);
const PromptsPage = lazy(() =>
  import('./pages/PromptsPage').then((m) => ({ default: m.PromptsPage }))
);
const PromptCategoryPage = lazy(() =>
  import('./pages/PromptCategoryPage').then((m) => ({ default: m.PromptCategoryPage }))
);
const AdminDashboard = lazy(() =>
  import('./admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard }))
);
const EduPage = lazy(() =>
  import('./pages/EduPage').then((m) => ({ default: m.EduPage }))
);
const AppsPage = lazy(() =>
  import('./pages/AppsPage').then((m) => ({ default: m.AppsPage }))
);
const MurshidPage = lazy(() =>
  import('./pages/MurshidPage').then((m) => ({ default: m.MurshidPage }))
);
const EdaraPage = lazy(() =>
  import('./pages/EdaraPage').then((m) => ({ default: m.EdaraPage }))
);
const LegalDocumentPage = lazy(() =>
  import('./pages/LegalDocumentPage').then((m) => ({ default: m.LegalDocumentPage }))
);
const EdaraLegalDocumentPage = lazy(() =>
  import('./pages/EdaraLegalDocumentPage').then((m) => ({ default: m.EdaraLegalDocumentPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

const RouteFallback: React.FC = () => {
  const { lang } = useLang();
  return (
    <div className="w-full min-h-[50vh] flex items-center justify-center" aria-busy="true">
      <span className="text-xs tracking-[0.3em] uppercase text-ink-muted font-light animate-pulse">
        {t('loading', lang)}
      </span>
    </div>
  );
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/Prompts" element={<PromptsPage />} />
            <Route path="/services/Prompts/:categoryId" element={<PromptCategoryPage />} />
            <Route path="/services/Edu" element={<EduPage />} />
            <Route path="/services/Apps" element={<AppsPage />} />
            <Route path="/murshid" element={<MurshidPage />} />
            <Route path="/murshid/terms_of_use" element={<Navigate to="/murshid/terms_of_service" replace />} />
            <Route path="/murshid/:docId" element={<LegalDocumentPage />} />
            <Route path="/edara" element={<EdaraPage />} />
            <Route path="/edara/:docId" element={<EdaraLegalDocumentPage />} />
            <Route path="/services/:categoryId" element={<ServicesPage />} />
            <Route path="/thebossadmin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  useSiteProtection();
  return (
    <BrowserRouter>
      <div className="relative min-h-screen w-full bg-ivory text-ink font-sans overflow-x-hidden selection:bg-accent/15 selection:text-ink">
        {/* Clean top navigation */}
        <Navbar />

        {/* Animated Application Routes */}
        <main className="relative z-10 w-full min-h-screen">
          <ErrorBoundary>
            <AnimatedRoutes />
          </ErrorBoundary>
        </main>
      </div>
    </BrowserRouter>
  );
}
