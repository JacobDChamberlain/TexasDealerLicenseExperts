import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';
  const toggle = () => i18n.changeLanguage(isSpanish ? 'en' : 'es');

  return (
    <header className="bg-white border-b border-gray-300 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-3">
          {/* Swap for real logo asset when provided */}
          <div className="text-accent text-2xl leading-none">🚗</div>
          <span className="font-black text-gray-900 text-base sm:text-lg leading-tight tracking-tight">
            Dealer License Pros
          </span>
        </Link>

        <button
          onClick={toggle}
          aria-label="Toggle language"
          className="border-2 border-gray-900 rounded-lg px-2.5 py-1 text-xs font-bold tracking-wide hover:bg-gray-50 transition-colors"
        >
          {isSpanish ? 'English' : 'Español'}
        </button>
      </div>
    </header>
  );
}
