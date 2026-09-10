'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'outline-white' | 'amber' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  href?: string;
  target?: string;
  rel?: string;
  whatsappIcon?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  target,
  rel,
  whatsappIcon = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled = false,
  isLoading = false,
  type = 'button',
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white transition-all';

  // Tamanhos: sm, md, lg
  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3.5 py-1.5 text-sm gap-1.5 min-h-[36px]',
    md: 'px-5 py-2.5 text-base gap-2 min-h-[44px]',
    lg: 'px-7 py-3.5 text-lg font-bold gap-2.5 min-h-[52px] shadow-md',
  };

  // Variantes: primary (vermelho), secondary (branco com borda vermelha), outline, amber, ghost
  const variantStyles: Record<ButtonVariant, string> = {
    // Primary: Vermelho Perutche Solar (#E51E25), texto branco
    primary:
      'bg-[#E51E25] hover:bg-[#C3141B] text-white border border-[#E51E25] shadow-md shadow-[#E51E25]/25 hover:shadow-lg hover:shadow-[#E51E25]/40 focus:ring-[#E51E25]',
    // Secondary: Fundo branco, borda vermelha, texto vermelho
    secondary:
      'bg-white hover:bg-red-50 text-[#E51E25] border-2 border-[#E51E25] shadow-sm hover:shadow-md focus:ring-[#E51E25]',
    // Outline: Fundo branco/transparente com borda cinza sutil, hover vermelho
    outline:
      'bg-white hover:bg-red-50/50 text-gray-800 border border-gray-300 hover:border-[#E51E25] hover:text-[#E51E25] shadow-sm focus:ring-[#E51E25]',
    // Outline White: Para fundos escuros ou vermelhos com alto contraste
    'outline-white':
      'bg-white/10 hover:bg-white text-white hover:text-[#E51E25] border-2 border-white shadow-md focus:ring-white backdrop-blur-sm',
    // Amber solar
    amber:
      'bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold border border-[#F59E0B] shadow-[#F59E0B]/20 hover:shadow-md hover:shadow-[#F59E0B]/30 focus:ring-[#F59E0B]',
    // Ghost
    ghost:
      'bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900 border border-transparent focus:ring-gray-400',
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`.trim();

  const spinnerIcon = (
    <Loader2
      className={`${
        size === 'sm' ? 'size-3.5' : size === 'lg' ? 'size-5' : 'size-4'
      } animate-spin shrink-0`}
      strokeWidth={2.2}
    />
  );

  // Ícone WhatsApp quando ativado
  const renderedWhatsAppIcon = whatsappIcon ? (
    <MessageCircle className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-5 h-5' : 'w-4.5 h-4.5'} text-emerald-400 shrink-0`} />
  ) : null;

  // Animação hover com Framer Motion
  const hoverAnimation = !isDisabled
    ? {
        whileHover: { scale: 1.02, y: -1 },
        whileTap: { scale: 0.98, y: 0 },
        transition: { type: 'spring' as const, stiffness: 450, damping: 28 },
      }
    : {};

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={combinedClasses}
        onClick={onClick}
        {...hoverAnimation}
        {...(props as any)}
      >
        {isLoading ? (
          spinnerIcon
        ) : (
          <>
            {renderedWhatsAppIcon}
            {!renderedWhatsAppIcon && leftIcon && <span className="shrink-0">{leftIcon}</span>}
          </>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={isDisabled}
      className={combinedClasses}
      onClick={onClick}
      {...hoverAnimation}
      {...(props as any)}
    >
      {isLoading ? (
        spinnerIcon
      ) : (
        <>
          {renderedWhatsAppIcon}
          {!renderedWhatsAppIcon && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        </>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </motion.button>
  );
};
