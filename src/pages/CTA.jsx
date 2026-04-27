import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { nextWebinar } from '../config/webinars';

export default function CTA() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const choose = (path) => navigate('/contact', { state: { path } });

  return (
    <main className="flex-1">
      <div className="flex justify-center py-6">
        <button
          onClick={() => choose('consult')}
          className="bg-red-600 hover:bg-red-700 text-white font-black text-xl px-12 py-4 rounded-full transition-colors shadow-lg"
        >
          {t('common.bookNow').toUpperCase()}
        </button>
      </div>

      <section className="mx-4 mb-8">
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Webinar card */}
          <button
            onClick={() => choose('webinar')}
            className="border-2 border-gray-900 rounded-2xl p-6 text-center hover:border-red-600 hover:shadow-lg transition-all cursor-pointer bg-white"
          >
            {/* Icon placeholder — swap with client webinar icon */}
            <div className="text-5xl mb-4">🖥️</div>
            <h2 className="text-xl font-black text-gray-900 mb-3">
              {t('cta.webinarTitle')}
            </h2>
            <p className="text-gray-700 mb-4">{t('cta.webinarDesc')}</p>
            <p className="font-bold text-gray-900">
              {t('cta.webinarNext')}<br />
              <span className="text-lg">{nextWebinar.date}</span>
            </p>
          </button>

          {/* Consultation card */}
          <button
            onClick={() => choose('consult')}
            className="border-2 border-gray-900 rounded-2xl p-6 text-center hover:border-red-600 hover:shadow-lg transition-all cursor-pointer bg-white"
          >
            {/* Icon placeholder */}
            <div className="text-5xl mb-4">🤝</div>
            <h2 className="text-xl font-black text-gray-900 mb-3">
              {t('cta.consultTitle')}
            </h2>
            <p className="text-gray-700">{t('cta.consultUsual')}</p>
            <p className="font-bold text-gray-900 text-lg">{t('cta.consultNow')}</p>
          </button>
        </div>
      </section>
    </main>
  );
}
