import { useTranslation } from 'react-i18next';
import AnimateIn from '../components/ui/AnimateIn';

export default function SuccessStories() {
  const { t } = useTranslation();
  const stories = t('successStories.stories', { returnObjects: true });

  return (
    <div className="border-8 border-accent mx-4 my-6 rounded-sm">
      <div className="p-6 sm:p-10">
        <AnimateIn direction="fade">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-2">
            {t('successStories.title')}
          </h1>
          <div className="w-24 h-1 bg-gray-900 mx-auto mb-10" />
        </AnimateIn>

        <div className="max-w-6xl mx-auto space-y-8">
          {stories.map(({ name, booked, obtained, licenseType, quote }, i) => (
            <AnimateIn key={name} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 100}>
              <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
                <p className="font-extrabold text-gray-900 text-lg mb-1">{name}</p>
                <p className="text-sm text-gray-500 mb-1">{t('successStories.booked')}: {booked}</p>
                <p className="text-sm text-green-700 font-semibold mb-4">
                  ✅ {t('successStories.obtained')} {licenseType} — {obtained}
                </p>
                <blockquote className="text-gray-700 leading-relaxed border-l-4 border-accent pl-4 italic text-base">
                  "{quote}"
                </blockquote>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn direction="fade" delay={200}>
          <div className="mt-12 text-center">
            <p className="font-bold text-gray-900 mb-2">{t('successStories.cta')}</p>
            <div className="text-accent text-4xl">⬇</div>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
