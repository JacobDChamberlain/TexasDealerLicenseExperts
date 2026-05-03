import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <SecondaryNav />
        <FloatingBookNow />

        {/* pt-24 = 56px banner + 40px secondary nav; pb-24 = space above floating Book Now */}
        <main className="flex-1 pt-24 pb-24">
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

        <Footer />
      </div>
    </BrowserRouter>
  );
}
