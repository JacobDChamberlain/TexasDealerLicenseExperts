import { useTranslation } from 'react-i18next';
import AnimateIn from '../components/ui/AnimateIn';

export default function Landing() {
  const { t } = useTranslation();

  return (
    <div className="border-8 border-accent mx-4 my-6 rounded-sm">
      <div className="p-6 sm:p-10 max-w-2xl mx-auto text-center">

        <AnimateIn direction="fade">
          <div className="w-full max-w-xs mx-auto mb-8 rounded-lg overflow-hidden bg-gray-100 h-48 flex items-center justify-center text-gray-400 text-sm">
            [ Hero image — replace with client photo ]
          </div>
        </AnimateIn>

        <AnimateIn direction="fade" delay={100}>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
            {t('landing.headline')}
          </h1>
          <p className="text-xl font-light text-gray-700 mb-8">
            {t('landing.subheadline')}
          </p>
        </AnimateIn>

        <AnimateIn direction="left" delay={150}>
          <div className="text-left space-y-4 mb-8">
            {['body1', 'body2', 'body3', 'body4'].map((key) => (
              <p key={key} className="text-gray-800 leading-relaxed font-light">
                {t(`landing.${key}`)}
              </p>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn direction="right" delay={200}>
          <p className="text-xl font-extrabold text-gray-900 mb-10">{t('landing.tagline')}</p>
        </AnimateIn>

        <AnimateIn direction="fade" delay={250}>
          <p className="font-bold text-gray-900 mb-2">{t('landing.haveQuestions')}</p>
          <div className="text-accent text-4xl">⬇</div>
        </AnimateIn>

      </div>
    </div>
  );
}
