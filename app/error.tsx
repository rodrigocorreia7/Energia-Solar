'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home, MessageSquare } from 'lucide-react';
import { GUANAMBI_SOLAR_CONFIG } from '../lib/solar/tariffs';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log do erro para monitoramento
    console.error('App Router Boundary Caught Error:', error);
  }, [error]);

  const whatsappSupportUrl = `https://wa.me/${GUANAMBI_SOLAR_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
    'Olá! Tive uma inconsistência técnica ao navegar no site da Perutche Solar e gostaria de avisar a equipe.'
  )}`;

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-white text-[#111827] px-4 py-16 relative selection:bg-[#E51E25] selection:text-white">
      <div className="max-w-md w-full text-center relative z-10">
        {/* Ícone Two-tone de Alerta */}
        <div className="size-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <AlertTriangle className="size-10" strokeWidth={1.75} />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800 uppercase tracking-wider mb-4">
          Inconsistência Temporária
        </span>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111827] text-balance">
          Algo não carregou como esperado
        </h1>

        <p className="mt-3 text-sm text-gray-600 leading-relaxed text-pretty">
          Houve uma interrupção passageira na conexão. Não se preocupe: você pode recarregar este módulo com um clique.
        </p>

        {/* Ações */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            id="btn-error-retry"
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#E51E25] hover:bg-[#c9181e] text-white text-sm font-bold shadow-md shadow-[#E51E25]/20 transition-all active:scale-95 cursor-pointer"
          >
            <RefreshCw className="size-4" strokeWidth={1.75} />
            <span>Tentar Novamente</span>
          </button>

          <Link
            id="btn-error-home"
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-bold transition-all active:scale-95"
          >
            <Home className="size-4" strokeWidth={1.75} />
            <span>Página Inicial</span>
          </Link>
        </div>

        {/* Link WhatsApp */}
        <div className="mt-8 pt-5 border-t border-gray-100">
          <a
            id="link-error-whatsapp"
            href={whatsappSupportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <MessageSquare className="size-3.5" strokeWidth={1.75} />
            <span>Falar com o suporte no WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
