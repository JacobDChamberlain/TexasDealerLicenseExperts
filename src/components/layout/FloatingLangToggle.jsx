import { useTranslation } from 'react-i18next';

export default function FloatingLangToggle() {
  const { i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';
  const toggle = () => i18n.changeLanguage(isSpanish ? 'en' : 'es');

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="fixed right-4 bg-white border-2 border-gray-900 rounded-lg px-3 py-1.5 text-xs font-black tracking-wide shadow-md hover:bg-gray-50 transition-colors"
      style={{ top: '48px', zIndex: 60 }}
    >
      {isSpanish ? 'English' : 'Español'}
    </button>
  );
}
