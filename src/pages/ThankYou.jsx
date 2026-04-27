import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ThankYou() {
  const { t } = useTranslation();
  const { state } = useLocation();
  const path = state?.path ?? 'consult';

  return (
    <main className="flex-1">
      <div className="flex justify-center py-6">
        <Link
          to="/get-started"
          className="bg-red-600 hover:bg-red-700 text-white font-black text-xl px-12 py-4 rounded-full transition-colors shadow-lg"
        >
          {t('common.bookNow').toUpperCase()}
        </Link>
      </div>

      <section className="mx-4 mb-8">
        <div className="max-w-lg mx-auto border-2 border-gray-900 rounded-2xl p-10 bg-white text-center">
          {/* Golden "Thank you!" matching PDF — using styled text since we don't have the asset yet */}
          <h1
            className="text-5xl sm:text-6xl font-black mb-6"
            style={{ background: 'linear-gradient(135deg, #b8860b, #ffd700, #b8860b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
          >
            Thank you!
          </h1>
          <p className="text-gray-700 text-lg">
            {path === 'webinar' ? t('thankYou.webinarMsg') : t('thankYou.consultMsg')}
          </p>
          <Link
            to="/"
            className="inline-block mt-8 text-red-700 font-semibold hover:underline"
          >
            ← {t('thankYou.returnHome')}
          </Link>
        </div>
      </section>
    </main>
  );
}
