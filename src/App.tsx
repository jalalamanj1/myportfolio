import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Background } from './components/Background';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AdminDashboard } from './admin/AdminDashboard';
import { useSiteProtection } from './hooks/useSiteProtection';

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
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:categoryId" element={<ServicesPage />} />
          <Route path="/thebossadmin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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
          <AnimatedRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}
