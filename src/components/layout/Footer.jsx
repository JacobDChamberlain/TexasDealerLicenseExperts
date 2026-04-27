import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p className="font-bold text-white">TX Dealer License Experts</p>
        <nav className="flex gap-6">
          <Link to="/faq" className="hover:text-white transition-colors">{t('nav.faq')}</Link>
          <Link to="/success-stories" className="hover:text-white transition-colors">{t('nav.successStories')}</Link>
          <Link to="/get-started" className="hover:text-white transition-colors">{t('common.bookNow')}</Link>
        </nav>
        <p>© {new Date().getFullYear()} TX Dealer License Experts</p>
      </div>
    </footer>
  );
}
