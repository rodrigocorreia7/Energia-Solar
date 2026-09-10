import { useState, useEffect } from 'react';

/**
 * Hook de monitoramento do progresso de rolagem da página.
 * Otimizado para não causar reflow síncrono (layout thrashing) durante o scroll.
 */
export function useScrollProgress(): number {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    let animationFrameId: number | null = null;
    let isTicking = false;
    let cachedScrollableDistance = 1;

    // Mede a altura do documento apenas quando necessário (resize / carga), não a cada pixel de scroll
    const updateDimensions = () => {
      if (typeof window === 'undefined') return;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight || windowHeight;
      cachedScrollableDistance = Math.max(1, docHeight - windowHeight);
    };

    updateDimensions();

    const calculateProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const rawProgress = scrollY / cachedScrollableDistance;
      const clampedProgress = Math.min(1, Math.max(0, rawProgress));
      
      setScrollProgress((prev) => {
        // Evita re-renders se a variação for imperceptível (< 0.2%)
        if (Math.abs(prev - clampedProgress) < 0.002 && clampedProgress !== 1 && clampedProgress !== 0) {
          return prev;
        }
        return clampedProgress;
      });

      isTicking = false;
    };

    const handleScroll = () => {
      if (!isTicking) {
        animationFrameId = window.requestAnimationFrame(calculateProgress);
        isTicking = true;
      }
    };

    const handleResize = () => {
      updateDimensions();
      handleScroll();
    };

    // Listeners passivos para não bloquear a thread de renderização
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    calculateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return scrollProgress;
}

export default useScrollProgress;
