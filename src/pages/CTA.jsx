import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CTA() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="mx-4 my-6">
      <div className="max-w-lg mx-auto">
        {/* Consultation card — the only option */}
        <button
          onClick={() => navigate('/contact')}
          className="w-full border-2 border-gray-900 rounded-2xl p-8 text-center hover:border-accent hover:shadow-lg active:border-accent active:bg-accent/10 active:scale-95 transition-all cursor-pointer bg-white"
        >
          <div className="text-5xl mb-4">🤝</div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">{t('cta.consultTitle')}</h2>
          <p className="inline-block bg-accent text-gray-900 font-black text-lg px-5 py-1.5 rounded-full mb-3">
            {t('cta.consultFree')}
          </p>
          <p className="text-gray-600 text-sm">{t('cta.consultDesc')}</p>
        </button>
      </div>
    </div>
  );
}
