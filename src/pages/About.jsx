import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="border-4 border-accent mx-4 my-6 rounded-sm">
      <div className="p-6 sm:p-10 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 text-center mb-2">
          {t('about.title')}
        </h1>
        <div className="w-24 h-1 bg-gray-900 mx-auto mb-10" />

        {/* Photo placeholder */}
        <div className="w-36 h-36 rounded-full bg-gray-100 mx-auto mb-8 flex items-center justify-center text-gray-400 text-sm text-center">
          [ Photo ]
        </div>

        <div className="space-y-4 text-gray-800 leading-relaxed">
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>
          <p>{t('about.p3')}</p>
        </div>
      </div>
    </div>
  );
}
