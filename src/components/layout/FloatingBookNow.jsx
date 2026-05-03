import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function FloatingBookNow() {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
      <Link
        to="/get-started"
        className="bg-accent hover:brightness-95 active:brightness-90 text-gray-900 font-black text-lg px-10 py-3.5 rounded-full shadow-xl transition-all whitespace-nowrap"
      >
        {t('common.bookNow').toUpperCase()}
      </Link>
    </div>
  );
}
