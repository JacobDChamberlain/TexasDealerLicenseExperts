import { useTranslation } from 'react-i18next';
import AnimateIn from '../components/ui/AnimateIn';

export default function Landing() {
  const { t } = useTranslation();
  const checklist = t('landing.checklist', { returnObjects: true });

  return (
    <div className="border-8 border-accent mx-4 my-6 rounded-sm">
      <div className="p-6 sm:p-10 max-w-6xl mx-auto text-center">

        <AnimateIn direction="fade" delay={100}>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
            {t('landing.headline')}
          </h1>
          <p className="text-xl font-light text-gray-900 mb-8">
            {t('landing.subheadline')}
          </p>
        </AnimateIn>

        <AnimateIn direction="left" delay={150}>
          <div className="text-left space-y-4 mb-6">
            {['body1', 'body2', 'body3', 'body4'].map((key) => (
              <p key={key} className="text-gray-900 leading-relaxed">
                {t(`landing.${key}`)}
              </p>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn direction="left" delay={175}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 text-left mb-8 inline-grid">
            {checklist.map((item) => (
              <div key={item} className="flex items-start gap-2 text-gray-900">
                <span className="text-green-600 font-bold mt-0.5">✔</span>
                <span>{item}</span>
              </div>
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
