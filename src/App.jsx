import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './pages/Landing';
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
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/get-started" element={<CTA />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={<Book />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
