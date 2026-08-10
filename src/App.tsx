import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Background } from './components/Background';
import { HomePage } from './pages/HomePage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useSiteProtection } from './hooks/useSiteProtection';

// Route-level code splitting: heavy pages load only when navigated to.
const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage }))
);
const PromptsPage = lazy(() =>
  import('./pages/PromptsPage').then((m) => ({ default: m.PromptsPage }))
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

const RouteFallback: React.FC = () => (
  <div className="w-full min-h-[50vh] flex items-center justify-center" aria-busy="true">
    <span className="text-xs tracking-[0.3em] uppercase text-neutral-400 font-light animate-pulse">
      Loading…
    </span>
  </div>
);

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
            <Route path="/services/Edu" element={<EduPage />} />
            <Route path="/services/Apps" element={<AppsPage />} />
            <Route path="/services/:categoryId" element={<ServicesPage />} />
            <Route path="/thebossadmin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
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
      <div className="relative min-h-screen w-full bg-black text-white font-sans overflow-x-hidden selection:bg-[#D7C4A3]/30 selection:text-white">
        {/* Fixed Full Screen Ambient Dark Background */}
        <Background />

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
