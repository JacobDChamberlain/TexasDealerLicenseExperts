import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { nextWebinar } from '../config/webinars';

export default function CTA() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const choose = (path) => navigate(`/contact?path=${path}`);

  return (
    <div className="mx-4 my-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Consultation card */}
        <button
          onClick={() => choose('consult')}
          className="border-2 border-gray-900 rounded-2xl p-6 text-center hover:border-accent hover:shadow-lg active:border-accent active:bg-accent/10 active:scale-95 transition-all cursor-pointer bg-white"
        >
          <div className="text-5xl mb-4">🤝</div>
          <h2 className="text-xl font-black text-gray-900 mb-2">{t('cta.consultTitle')}</h2>
          <p className="text-gray-600 text-sm">{t('cta.consultUsual')}</p>
          <p className="font-bold text-gray-900">{t('cta.consultNow')}</p>
        </button>

        {/* Webinar card */}
        <button
          onClick={() => choose('webinar')}
          className="border-2 border-gray-900 rounded-2xl p-6 text-center hover:border-accent hover:shadow-lg active:border-accent active:bg-accent/10 active:scale-95 transition-all cursor-pointer bg-white"
        >
          <div className="text-5xl mb-4">🖥️</div>
          <h2 className="text-xl font-black text-gray-900 mb-2">{t('cta.webinarTitle')}</h2>
          <p className="text-gray-600 mb-4 text-sm">{t('cta.webinarDesc')}</p>
          <p className="font-bold text-gray-900 text-sm">
            {t('cta.webinarNext')}<br />
            <span className="text-base">{nextWebinar.date}</span>
          </p>
        </button>
      </div>
    </div>
  );
}
