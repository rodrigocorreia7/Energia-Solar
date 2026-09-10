import React from 'react';
import Link from 'next/link';
import { Sun, Home, Calculator, ArrowRight, Phone } from 'lucide-react';
import { GUANAMBI_SOLAR_CONFIG } from '../lib/solar/tariffs';

export default function NotFound() {
  const whatsappUrl = `https://wa.me/${GUANAMBI_SOLAR_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
    'Olá! Estava navegando no site da Perutche Solar e precisei de ajuda para encontrar uma informação.'
  )}`;

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-white text-[#111827] px-4 py-16 relative overflow-hidden selection:bg-[#E51E25] selection:text-white">
      {/* Luz ambiente sutil */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-lg w-full text-center relative z-10">
        {/* Ícone Two-tone */}
        <div className="size-20 rounded-3xl bg-red-500/10 border border-red-500/20 text-[#E51E25] flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Sun className="size-10 text-[#E51E25]" strokeWidth={1.75} />
        </div>

        {/* Tag 404 */}
        <span className="inline-block px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-black text-[#E51E25] uppercase tracking-wider mb-4 tabular-nums">
          Erro 404 • Página não encontrada
        </span>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#111827] leading-tight text-balance">
          Parece que esse raio de sol se perdeu no caminho
        </h1>

        <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed text-pretty">
          O link que você tentou acessar pode ter sido movido ou não está mais disponível. Você pode retornar à página inicial ou calcular a economia para sua residência em Guanambi.
        </p>

        {/* Ações principais */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            id="btn-notfound-home"
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#111827] hover:bg-black text-white text-sm font-bold shadow-md transition-all active:scale-95"
          >
            <Home className="size-4" strokeWidth={1.75} />
            <span>Voltar ao Início</span>
          </Link>

          <Link
            id="btn-notfound-simular"
            href="/simular"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#E51E25] hover:bg-[#c9181e] text-white text-sm font-bold shadow-md shadow-[#E51E25]/20 transition-all active:scale-95"
          >
            <Calculator className="size-4" strokeWidth={1.75} />
            <span>Simulador de Economia</span>
            <ArrowRight className="size-4" strokeWidth={1.75} />
          </Link>
        </div>

        {/* Suporte WhatsApp */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col items-center justify-center gap-2">
          <span className="text-xs text-gray-500">
            Dúvidas ou atendimento imediato em Guanambi:
          </span>
          <a
            id="link-notfound-whatsapp"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <Phone className="size-3.5" strokeWidth={1.75} />
            <span>(77) 99842-1234 • Perutche Solar</span>
          </a>
        </div>
      </div>
    </div>
  );
}
