import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SecondaryNav() {
  const { t } = useTranslation();

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors ${isActive ? 'text-gray-900 underline' : 'text-gray-600 hover:text-gray-900'}`;

  return (
    <nav className="bg-gray-50 border-b border-gray-200 fixed top-14 left-0 right-0 z-40">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-around h-10">
        <NavLink to="/" end className={linkClass}>{t('nav.home')}</NavLink>
        <NavLink to="/faq" className={linkClass}>{t('nav.faq')}</NavLink>
        <NavLink to="/success-stories" className={linkClass}>{t('nav.successStories')}</NavLink>
        <NavLink to="/about" className={linkClass}>{t('nav.about')}</NavLink>
      </div>
    </nav>
  );
}
