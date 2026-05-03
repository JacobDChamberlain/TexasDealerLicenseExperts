import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ThankYou() {
  const { t } = useTranslation();
  const { state } = useLocation();
  const path = state?.path ?? 'consult';

  return (
    <div className="mx-4 my-6">
      <div className="max-w-lg mx-auto border-2 border-gray-900 rounded-2xl p-10 bg-white text-center">
        <h1
          className="text-5xl sm:text-6xl font-black mb-6"
          style={{
            background: 'linear-gradient(135deg, #b8860b, #ffd700, #b8860b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
          }}
        >
          Thank you!
        </h1>
        <p className="text-gray-700 text-lg">
          {path === 'webinar' ? t('thankYou.webinarMsg') : t('thankYou.consultMsg')}
        </p>
        <Link to="/" className="inline-block mt-8 text-gray-900 underline font-semibold hover:underline">
          ← {t('thankYou.returnHome')}
        </Link>
      </div>
    </div>
  );
}
