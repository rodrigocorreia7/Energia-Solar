'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export interface WhatsAppFloatProps {
  customMessage?: string;
  phoneNumber?: string;
}

export const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({
  customMessage = 'Olá! Gostaria de solicitar um orçamento de energia solar para Guanambi e região.',
  phoneNumber = '5577991778723',
}) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(customMessage)}`;

  return (
    <aside
      aria-label="Atendimento via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 pointer-events-auto select-none animate-weightless will-change-transform"
    >
      {/* Tooltip "Chamar no Zap" */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative hidden sm:flex items-center gap-2 bg-white/90 backdrop-blur-md text-gray-800 text-xs md:text-sm font-semibold py-2 px-3.5 rounded-full border border-gray-200 shadow-antigravity hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span>Chamar no Zap</span>
      </a>

      {/* Botão flutuante fixo com animação de pulse suave */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chamar no Zap (WhatsApp Perutche Solar)"
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-600/30 hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
      >
        {/* Efeito pulse suave */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none duration-1000" />
        <span className="absolute -inset-2 rounded-full bg-emerald-500/25 animate-pulse pointer-events-none" />

        {/* Badge notificadora sutil */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4 z-20">
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#E51E25] text-[10px] text-white font-bold items-center justify-center shadow">
            1
          </span>
        </span>

        {/* Ícone do WhatsApp */}
        <MessageCircle className="w-7 h-7 relative z-10" />

        {/* Tooltip Mobile flutuante em hover */}
        <span className="sm:hidden absolute bottom-full mb-2 right-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-lg border border-gray-200 shadow-lg whitespace-nowrap">
          Chamar no Zap
        </span>
      </a>
    </aside>
  );
};
