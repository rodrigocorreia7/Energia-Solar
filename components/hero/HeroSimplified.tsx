'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, MessageCircle, Sun, Home, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { GUANAMBI_SOLAR_CONFIG } from '../../lib/solar/tariffs';

export interface HeroSimplifiedProps {
  onNavigate?: (path: string) => void;
}

export const HeroSimplified: React.FC<HeroSimplifiedProps> = ({ onNavigate }) => {
  const [isNight, setIsNight] = useState(false);
  const handleSimularClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const calcSection = document.getElementById('calculadora');
    if (calcSection) {
      calcSection.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate('/simular');
    } else {
      window.location.href = '/simular';
    }
  };

  const handleConhecerClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const sobreSection = document.getElementById('como-funciona') || document.getElementById('projetos');
    if (sobreSection) {
      sobreSection.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate('/projetos');
    } else {
      window.location.href = '/projetos';
    }
  };

  const whatsappUrl = `https://wa.me/${GUANAMBI_SOLAR_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
    'Olá, Perutche Solar! Vi o anúncio no site e quero saber mais sobre financiamento solar em Guanambi.'
  )}`;

  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden pt-16 pb-16 px-4 sm:px-6 lg:px-8 text-center"
      style={{
        // Gradiente suave de #FFFFFF (topo) para #E0F2FE (azul céu muito claro)
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F0F9FF 55%, #E0F2FE 100%)',
      }}
    >
      {/* Luz solar sutil amarelada no topo */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-gradient-to-b from-[#FEF3C7] via-[#FDE68A]/30 to-transparent blur-[90px] pointer-events-none rounded-full"
      />
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Conteúdo Centralizado */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center w-full my-auto">
        
        {/* Badge "O Rei das Cerâmicas": Fundo vermelho com coroa e texto branco */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#E51E25] text-white shadow-lg shadow-[#E51E25]/25 mb-6"
        >
          <span className="text-base">👑</span>
          <span className="text-xs sm:text-sm font-black tracking-wide uppercase">
            O Rei das Cerâmicas
          </span>
          <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/70" />
          <span className="text-xs font-semibold text-amber-200">
            Líder em Projetos Solares na Bahia
          </span>
          <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/70" />
          <span className="text-xs font-medium text-white/90 flex items-center gap-1">
            <Sun className="w-3.5 h-3.5 text-amber-300" />
            Guanambi e Região
          </span>
        </motion.div>

        {/* Headline grande */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#111827] tracking-tight leading-[1.12] max-w-4xl text-balance"
        >
          Redução de até <span className="text-[#E51E25] tabular-nums">95%</span> na sua conta de energia
        </motion.h1>

        {/* Subheadline com menção aos 3 segmentos do folder */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-5 text-base sm:text-xl md:text-2xl text-[#4B5563] max-w-3xl font-medium leading-relaxed text-center text-pretty"
        >
          Soluções personalizadas em energia solar para sua <strong>residência</strong>, <strong>empresa</strong> ou <strong>indústria</strong>. Financiamento em até <span className="tabular-nums">84x</span> com parcelas menores que a sua economia.
        </motion.p>

        {/* 3 Segmentos em destaque do folder */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2.5"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-800 shadow-xs">
            🏠 <span>Residenciais</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-800 shadow-xs">
            🏢 <span>Comerciais</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-[#E51E25] shadow-xs">
            🏭 <span>Industriais (Cerâmicas)</span>
          </span>
        </motion.div>

        {/* Showcase Visual Interativo Dia / Noite com Imagens Reais */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="mt-8 sm:mt-10 w-full max-w-4xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden relative group"
        >
          {/* Container da Imagem com transição suave Dia vs Noite */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
            <img
              src={isNight ? '/Imagens/802173303_1085283137381375_6898581122454641314_n.webp' : '/Imagens/802032170_948638254961575_630070986708783277_n.webp'}
              alt={isNight ? 'Casa com energia solar à noite em Guanambi' : 'Casa com energia solar durante o dia em Guanambi'}
              className="w-full h-full object-cover transition-all duration-700 ease-in-out filter brightness-[0.98]"
            />

            {/* Gradiente de sobreposição para texto legível */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Badge Flutuante no Topo com Controle Dia / Noite */}
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20">
              <button
                type="button"
                onClick={() => setIsNight(!isNight)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 text-xs font-bold transition-all shadow-lg active:scale-95 cursor-pointer"
                aria-label="Alternar visualização entre dia e noite"
              >
                {isNight ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span>Ver de Dia (Geração Plena)</span>
                  </>
                ) : (
                  <>
                    <span className="text-amber-300">🌙</span>
                    <span>Ver à Noite (Consumo Zero)</span>
                  </>
                )}
              </button>
            </div>

            {/* Informações no rodapé da imagem */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 text-left">
              <div className="text-white">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  {isNight ? 'De noite você aproveita o crédito solar' : 'De dia o sol de Guanambi trabalha por você'}
                </div>
                <p className="text-sm sm:text-base font-semibold text-slate-100 max-w-lg">
                  {isNight
                    ? 'Ares-condicionados ligados e casa toda acesa pagando apenas a taxa básica.'
                    : 'Geração fotovoltaica de alto rendimento acumulando créditos na Coelba.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-500/90 backdrop-blur-md text-white px-3 py-1.5 rounded-xl shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" /> 25 Anos Garantia
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-amber-500/90 backdrop-blur-md text-white px-3 py-1.5 rounded-xl shadow-sm">
                  <Zap className="w-3.5 h-3.5" /> Até 95% Economia
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTAs: Fade in com delay de 600ms */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto"
        >
          {/* Botão principal (vermelho): Simular minha economia */}
          <Button
            id="hero-cta-simular"
            size="lg"
            variant="primary"
            onClick={handleSimularClick}
            aria-label="Simular minha economia de energia solar"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            className="w-full sm:w-auto text-base sm:text-lg font-bold shadow-lg shadow-[#E51E25]/30 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E51E25]"
          >
            Simular minha economia
          </Button>

          {/* Botão secundário: Fundo branco com borda vermelha */}
          <Button
            id="hero-cta-conhecer"
            size="lg"
            variant="secondary"
            onClick={handleConhecerClick}
            aria-label="Conhecer a história e engenharia da Perutche Solar"
            className="w-full sm:w-auto text-base sm:text-lg font-bold"
          >
            Conhecer a Perutche
          </Button>

          {/* WhatsApp com ícone */}
          <a
            id="hero-cta-whatsapp"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com consultor solar no WhatsApp"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base sm:text-lg font-bold rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Falar no WhatsApp</span>
          </a>
        </motion.div>

        {/* Indicador de rolagem suave com dado do hook useScrollProgress */}
        <div className="mt-8 text-xs text-gray-500 flex items-center justify-center gap-1.5 font-medium">
          <span>Role para baixo ou simule online</span>
          <span className="text-gray-400">•</span>
          <span>Estudo 100% gratuito e sem compromisso</span>
        </div>

      </div>
    </motion.section>
  );
};

export default HeroSimplified;
