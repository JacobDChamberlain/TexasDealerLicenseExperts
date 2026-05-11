import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Book() {
  const { t } = useTranslation();
  const { state } = useLocation();
  const contact = state?.contact ?? {};

  return (
    <div className="mx-4 my-6">
      <div className="max-w-lg mx-auto border-2 border-gray-900 rounded-2xl p-6 bg-white text-center">
        <div className="text-6xl mb-4">💳</div>
        <h1 className="text-2xl font-black text-gray-900 mb-1">{t('book.title')}</h1>
        <p className="text-gray-600 mb-6">{t('book.subtitle')}</p>

        {/* Stripe Payment Element mounts here in Step 5 */}
        <div className="border border-dashed border-gray-300 rounded-lg p-8 text-gray-400 text-sm">
          [ Stripe Payment Element — TODO after Stripe account setup ]
        </div>

        {contact.name && (
          <p className="mt-4 text-xs text-gray-500">
            Booking for: {contact.name} ({contact.email})
          </p>
        )}
      </div>
    </div>
  );
}
