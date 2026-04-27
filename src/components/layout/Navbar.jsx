import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isSpanish = i18n.language === 'es';

  const toggleLang = () => i18n.changeLanguage(isSpanish ? 'en' : 'es');

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          {/* Swap placeholder for real logo once provided */}
          <div className="text-red-700 text-2xl font-bold leading-none">🚗</div>
          <span className="font-bold text-gray-900 text-sm sm:text-base leading-tight">
            TX Dealer License<br className="hidden sm:block" /> Experts
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
          <NavLink
            to="/faq"
            className={({ isActive }) =>
              isActive ? 'text-red-700 underline' : 'text-gray-600 hover:text-red-700 transition-colors'
            }
          >
            {t('nav.faq')}
          </NavLink>
          <NavLink
            to="/success-stories"
            className={({ isActive }) =>
              isActive ? 'text-red-700 underline' : 'text-gray-600 hover:text-red-700 transition-colors'
            }
          >
            {t('nav.successStories')}
          </NavLink>

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="border-2 border-gray-900 rounded px-2 py-1 text-xs font-bold tracking-wide hover:bg-gray-100 transition-colors"
            aria-label="Toggle language"
          >
            {isSpanish ? 'HELLO' : 'HOLA'} | {isSpanish ? 'HOLA' : 'HELLO'}
          </button>

          <Link
            to="/get-started"
            className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors font-bold"
          >
            {t('common.bookNow')}
          </Link>
        </nav>

        {/* Mobile row */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLang}
            className="border-2 border-gray-900 rounded px-2 py-1 text-xs font-bold tracking-wide"
            aria-label="Toggle language"
          >
            {isSpanish ? 'EN' : 'ES'}
          </button>
          <button
            className="p-2 text-gray-600 hover:text-red-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3 text-sm font-medium">
          <NavLink to="/faq" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'text-red-700' : 'text-gray-600'}>
            {t('nav.faq')}
          </NavLink>
          <NavLink to="/success-stories" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'text-red-700' : 'text-gray-600'}>
            {t('nav.successStories')}
          </NavLink>
          <Link
            to="/get-started"
            onClick={() => setMenuOpen(false)}
            className="bg-red-700 text-white px-4 py-2 rounded-lg text-center hover:bg-red-800 transition-colors font-bold"
          >
            {t('common.bookNow')}
          </Link>
        </div>
      )}
    </header>
  );
}
