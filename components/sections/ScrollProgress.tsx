'use client';

import React from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export interface ScrollProgressProps {
  className?: string;
}

/**
 * Componente de barra de progresso de rolagem no topo da página.
 * - Barra fina fixa no topo (top-0, left-0)
 * - Background vermelho Perutche Solar (#E51E25)
 * - Largura dinâmica animada de 0% a 100%
 * - Position fixed com z-index 50
 */
export const ScrollProgress: React.FC<ScrollProgressProps> = ({ className = '' }) => {
  const progress = useScrollProgress();

  return (
    <div
      aria-hidden="true"
      className={`fixed top-0 left-0 right-0 h-1 w-full bg-transparent z-50 pointer-events-none ${className}`}
    >
      <div
        className="h-full w-full bg-[#E51E25] shadow-[0_0_10px_rgba(229,30,37,0.75)] will-change-transform"
        style={{
          transform: `scaleX(${progress})`,
          transformOrigin: 'left',
        }}
      />
    </div>
  );
};

export default ScrollProgress;
