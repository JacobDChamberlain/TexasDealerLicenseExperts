import { useEffect, useRef, useState } from 'react';

const hidden = {
  fade:  { opacity: 0, transform: 'none' },
  left:  { opacity: 0, transform: 'translateX(-60px)' },
  right: { opacity: 0, transform: 'translateX(60px)' },
};

const visible = { opacity: 1, transform: 'translateX(0)' };

export default function AnimateIn({ children, direction = 'fade', delay = 0, className = '' }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShow(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 1s ease-out, transform 1s ease-out`,
        transitionDelay: `${delay}ms`,
        ...(show ? visible : hidden[direction]),
      }}
    >
      {children}
    </div>
  );
}
