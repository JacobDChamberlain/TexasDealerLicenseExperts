import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function FloatingBookNow({ docked = false }) {
  const { t } = useTranslation();

  return (
    <Link
      to="/get-started"
      style={docked ? {} : {
        position: 'fixed',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 30,
      }}
      className="bg-accent hover:brightness-95 active:brightness-90 text-gray-900 font-black text-lg px-10 py-3.5 rounded-full shadow-xl whitespace-nowrap"
    >
      {t('common.bookNow').toUpperCase()}
    </Link>
  );
}
