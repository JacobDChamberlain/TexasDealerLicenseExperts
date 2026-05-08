import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AnimateIn from '../ui/AnimateIn';

export default function Footer() {
  const { t } = useTranslation();
  // previously had pb-28 to clear the floating Book Now button
  return (
    <footer className="bg-gray-900 text-gray-400">
      <AnimateIn direction="fade">
        <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <Link to="/" className="font-bold text-white hover:text-gray-300 transition-colors">Dealer License Pros</Link>
          <nav className="flex flex-wrap justify-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link>
            <Link to="/faq" className="hover:text-white transition-colors">{t('nav.faq')}</Link>
            <Link to="/success-stories" className="hover:text-white transition-colors">{t('nav.successStories')}</Link>
          </nav>
          <p>© {new Date().getFullYear()} Dealer License Pros</p>
        </div>
      </AnimateIn>
    </footer>
  );
}
