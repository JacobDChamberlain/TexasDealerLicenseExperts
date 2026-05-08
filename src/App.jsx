import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import SecondaryNav from './components/layout/SecondaryNav';
import FloatingBookNow from './components/layout/FloatingBookNow';
import Footer from './components/layout/Footer';
import Landing from './pages/Landing';
import About from './pages/About';
import FAQ from './pages/FAQ';
import SuccessStories from './pages/SuccessStories';
import CTA from './pages/CTA';
import Contact from './pages/Contact';
import Book from './pages/Book';
import ThankYou from './pages/ThankYou';
import SplashScreen from './components/ui/SplashScreen';

function AppShell() {
  const { pathname } = useLocation();
  const hideBookNow = ['/contact', '/book'].includes(pathname);
  const [docked, setDocked] = useState(false);
  const anchorRef = useRef(null);
  const inFlowButtonRef = useRef(null);

  useEffect(() => {
    if (hideBookNow) return;
    const checkDock = () => {
      if (!inFlowButtonRef.current) return;
      const btnRect = inFlowButtonRef.current.getBoundingClientRect();
      // dock when the in-flow button's top reaches where the fixed button's top would be
      const fixedButtonTop = window.innerHeight - 80 - btnRect.height;
      setDocked(btnRect.top <= fixedButtonTop);
    };
    window.addEventListener('scroll', checkDock, { passive: true });
    checkDock();
    return () => window.removeEventListener('scroll', checkDock);
  }, [hideBookNow, pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <SecondaryNav />
      {/* pt-24 = 56px banner + 40px secondary nav */}
      <main className="flex-1 pt-24">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/get-started" element={<CTA />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={<Book />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </main>

      {!hideBookNow && (
        <div ref={anchorRef} className="relative flex justify-center py-[45px] -mt-7">
          {/* always in-flow to reserve space; invisible until docked */}
          <div ref={inFlowButtonRef} style={{ opacity: docked ? 1 : 0, pointerEvents: docked ? 'auto' : 'none' }}>
            <FloatingBookNow docked />
          </div>
          {/* fixed overlay shown until docked */}
          {!docked && <FloatingBookNow />}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <BrowserRouter>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      <AppShell />
    </BrowserRouter>
  );
}
