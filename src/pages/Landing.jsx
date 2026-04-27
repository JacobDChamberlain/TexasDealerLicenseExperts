import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Landing() {
  const { t } = useTranslation();

  return (
    <main className="flex-1">
      {/* Hero — red border frame matching PDF design */}
      <section className="border-4 border-red-600 mx-4 my-6 rounded-sm">
        <div className="p-8 text-center">
          {/* Hero image placeholder — swap with client asset */}
          <div className="w-full max-w-xs mx-auto mb-6 rounded-lg overflow-hidden bg-gray-100 h-48 flex items-center justify-center text-gray-400 text-sm">
            [ Hero image — replace with client photo ]
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2 leading-tight">
            {t('landing.title')}
          </h1>
          <div className="w-24 h-1 bg-gray-900 mx-auto mb-8" />

          <div className="space-y-4 mb-8">
            <p className="text-lg sm:text-xl font-bold text-gray-900">
              {t('landing.point1')}
            </p>
            <p className="text-lg sm:text-xl font-bold text-gray-900">
              {t('landing.point2')}
            </p>
          </div>

          <p className="font-bold text-gray-900 mb-2">{t('landing.haveQuestions')}</p>
          {/* Red down arrow matching PDF */}
          <div className="text-red-600 text-4xl mb-4">⬇</div>
        </div>
      </section>

      {/* BOOK NOW CTA button — red pill matching PDF */}
      <div className="flex justify-center pb-8">
        <Link
          to="/get-started"
          className="bg-red-600 hover:bg-red-700 text-white font-black text-xl px-12 py-4 rounded-full transition-colors shadow-lg"
        >
          {t('common.bookNow').toUpperCase()}
        </Link>
      </div>
    </main>
  );
}
