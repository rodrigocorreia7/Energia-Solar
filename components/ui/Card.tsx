import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  hover?: boolean;
  hoverEffect?: boolean; // Retrocompatibilidade
  variant?: 'default' | 'elevated' | 'glass' | 'highlight';
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  hoverEffect = false,
  variant = 'default',
  glow = false,
  ...props
}) => {
  const isHoverEnabled = hover || hoverEffect;

  // Background e borda clara
  const baseBorder = 'border border-gray-200 rounded-2xl';

  // Variantes opcionais adicionais
  const variantStyles = {
    default: `bg-white ${baseBorder} shadow-xs`,
    elevated: 'bg-white border border-gray-200 shadow-md',
    glass: 'bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm',
    highlight: 'bg-white border-2 border-[#E51E25] shadow-md shadow-red-500/5',
  };

  // Efeito de elevação suave no hover
  const hoverStyles = isHoverEnabled
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#E51E25]/50 group'
    : 'transition-all duration-200';

  // Brilho opcional de destaque
  const glowStyles = glow ? 'ring-1 ring-[#E51E25]/30 shadow-md shadow-[#E51E25]/10' : '';

  return (
    <div
      className={`relative overflow-hidden p-6 ${variantStyles[variant]} ${hoverStyles} ${glowStyles} ${className}`}
      {...props}
    >
      {/* Detalhe de reflexo de luz sutil no topo */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {children}
    </div>
  );
};
