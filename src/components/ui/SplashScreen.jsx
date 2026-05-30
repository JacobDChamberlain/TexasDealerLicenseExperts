import { useEffect, useState } from 'react';

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('hold'); // hold → peel → fade → done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('peel'), 700);   // start peel after 700ms
    const t2 = setTimeout(() => setPhase('fade'), 1500);  // 550ms peel + 250ms pause
    const t3 = setTimeout(onDone, 2650);                  // unmount after fade
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  const peeling = phase === 'peel' || phase === 'fade';

  const textStyle = peeling
    ? { animation: 'peel-out 0.55s cubic-bezier(0.4, 0, 1, 1) forwards' }
    : { animation: 'zoom-in 0.45s cubic-bezier(0.2, 0, 0.3, 1.4) forwards' };

  return (
    <div
      style={{
        opacity: phase === 'fade' ? 0 : 1,
        transition: phase === 'fade' ? 'opacity 1.15s ease-out' : 'none',
        pointerEvents: 'none',
      }}
      className="fixed inset-0 z-[100] bg-accent flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-2">
        <span
          style={textStyle}
          className="text-gray-900 font-black text-2xl tracking-wide"
        >
          Dealer License Pros
        </span>
        <img src="/assets/Car.png" alt="" style={{ ...textStyle, width: '4rem', height: '4rem', objectFit: 'contain' }} />
      </div>
    </div>
  );
}
