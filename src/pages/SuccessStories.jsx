import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SuccessStories() {
  const { t } = useTranslation();

  return (
    <main className="flex-1">
      <section className="border-4 border-red-600 mx-4 my-6 rounded-sm">
        <div className="p-8">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 text-center mb-2">
            {t('successStories.title')}
          </h1>
          <div className="w-24 h-1 bg-gray-900 mx-auto mb-8" />

          {/* Content placeholder — client will provide testimonials/stories */}
          <div className="min-h-64 flex items-center justify-center text-gray-400 text-sm border border-dashed border-gray-200 rounded-lg">
            [ Success stories content — to be provided by client ]
          </div>

          <div className="mt-12 text-center">
            <p className="font-bold text-gray-900 mb-2">{t('successStories.cta')}</p>
            <div className="text-red-600 text-4xl">⬇</div>
          </div>
        </div>
      </section>

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
