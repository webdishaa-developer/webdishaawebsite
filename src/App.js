// App.jsx — FIXED
//
// IMPORTANT: useReveal uses useLocation() from React Router.
// useLocation() only works INSIDE <BrowserRouter>.
// So the Layout component (which calls useReveal) must be
// a CHILD of <BrowserRouter>, not the parent.
// This file shows the correct structure.

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import useReveal         from './hooks/useReveal';      // ← updated hook
import useScrollProgress from './hooks/useScrollProgress';

import Navbar         from './components/Navbar';
import Footer         from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Loader         from './components/Loader';

import HomePage    from './pages/HomePage';
import AboutPage   from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import Chatbot from './components/Chatbot';

/* ── Scroll to top on every route change ── */
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

/* ── Main layout — must be INSIDE BrowserRouter ── */
function Layout() {
  const { progRef, navSolid } = useScrollProgress();

  // ✅ Now works correctly — re-fires on every route change
  useReveal();

  return (
    <div>
      <Loader />
      <div className="stars" />
      <div className="ambient" />
      <div className="progress-bar" ref={progRef} />
      <WhatsAppButton />
      <Chatbot />
      <Navbar solid={navSolid} />

      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/about"    element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/gallery"  element={<GalleryPage />} />
        <Route path="/contact"  element={<ContactPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollReset />
      <Layout />   {/* Layout is inside BrowserRouter ✅ */}
    </BrowserRouter>
  );
}