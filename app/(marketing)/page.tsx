'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  PhoneCall,
  MapPin,
  FileText,
  Wrench,
  Zap,
  Sparkles,
  ShieldCheck,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { ScrollProgress } from '../../components/sections/ScrollProgress';
import { HeroScrolltelling } from '../../components/hero/HeroScrolltelling';
import { SegmentosSolucoes } from '../../components/sections/SegmentosSolucoes';
import { DorSolucao } from '../../components/sections/DorSolucao';
import { ComoFunciona } from '../../components/sections/ComoFunciona';
import { CalculatorForm } from '../../components/calculator/CalculatorForm';
import { KitsResidenciais } from '../../components/sections/KitsResidenciais';
import { ProvaSocial } from '../../components/sections/ProvaSocial';
import { FAQ } from '../../components/sections/FAQ';
import { WhatsAppFloat } from '../../components/ui/WhatsAppFloat';
import { Button } from '../../components/ui/Button';
import LightRays from '../../components/ui/LightRays';
import { GUANAMBI_SOLAR_CONFIG } from '../../lib/solar/tariffs';

export interface MarketingPageProps {
  onNavigate?: (path: string) => void;
}

export default function MarketingPage({ onNavigate }: MarketingPageProps) {

  const whatsappUrl = `https://wa.me/${GUANAMBI_SOLAR_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
    'Olá, Perutche Solar! Estou pronto para zerar minha conta de luz e gostaria de agendar uma visita técnica gratuita em Guanambi.'
  )}`;

  const handleSimularClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('/simular');
    }
  };

  return (
    <main id="main-content" className="flex flex-col w-full relative bg-white text-[#111827] selection:bg-[#E51E25] selection:text-white">
      
      {/* 1. ScrollProgress (barra de scroll no topo fixo) */}
      <ScrollProgress />

      {/* 2. Hero Scrolltelling com scrubbing de video-hero-final.mp4 e 6 etapas psicológicas */}
      <HeroScrolltelling onNavigate={onNavigate} />

      {/* 3. ComoFunciona (3 passos de captação, conversão e compensação com vídeos) */}
      <div id="como-funciona">
        <ComoFunciona onNavigate={onNavigate} />
      </div>

      {/* 5. Calculadora - Seção destacada */}
      <section
        id="calculadora"
        className="py-20 md:py-24 bg-[#F9FAFB] border-t border-gray-200 relative overflow-hidden font-jakarta"
      >
        {/* Efeito sutil de iluminação de fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#E51E25]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Headline da Calculadora */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF3C7] border border-amber-300 text-xs font-bold text-[#F59E0B] uppercase tracking-wider mb-4 shadow-sm">
              <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Simulador Interativo Parametrizado</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] tracking-tight leading-tight">
              Descubra quanto você pode economizar
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#4B5563] font-normal leading-relaxed">
              Descubra em 2 minutos o potencial da sua casa com os parâmetros reais da tarifa Coelba e o sol de Guanambi.
            </p>
          </motion.div>

          {/* Renderização do CalculatorForm com animação suave de entrada */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-10 max-w-4xl mx-auto"
          >
            <CalculatorForm />
          </motion.div>

          {/* Botão Grande: "Simular minha economia agora" */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center pt-2"
          >
            <Button
              id="calculadora-btn-simular-agora"
              size="lg"
              variant="primary"
              href="/simular"
              aria-label="Simular minha economia de energia solar agora"
              onClick={handleSimularClick}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto text-base font-extrabold px-9 py-4 shadow-xl shadow-[#E51E25]/30 hover:scale-[1.02] transition-transform focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E51E25]"
            >
              Simular minha economia agora
            </Button>
          </motion.div>

        </div>
      </section>

      {/* 6. KitsResidenciais (3 kits pré-dimensionados) */}
      <div id="kits">
        <KitsResidenciais onNavigate={onNavigate} />
      </div>

      {/* 6. ProvaSocial (Engenharia Industrial Aplicada à Sua Família) */}
      <div id="prova-social">
        <ProvaSocial onNavigate={onNavigate} />
      </div>

      {/* 7. Soluções Personalizadas Para Cada Necessidade (Residencial, Comercial, Industrial) */}
      <div id="segmentos">
        <SegmentosSolucoes onNavigate={onNavigate} />
      </div>

      {/* 8. FAQ (dúvidas frequentes em accordion) */}
      <div id="faq">
        <FAQ onNavigate={onNavigate} />
      </div>

      {/* 9. Realidade Tarifária em Guanambi (Dor e Virada de Chave antes do Fechamento) */}
      <div id="dor-solucao">
        <DorSolucao onNavigate={onNavigate} />
      </div>

      {/* 10. Seção de Fechamento */}
      <section
        id="fechamento"
        className="py-24 md:py-32 relative overflow-hidden text-center bg-[#0B0F19] border-t border-slate-800"
      >
        {/* Efeito WebGL LightRays de Raios Solares com tom amarelado e foco interativo ao mouse */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#fffeb1"
            raysSpeed={1}
            lightSpread={0.6}
            rayLength={2.3}
            followMouse={true}
            mouseInfluence={0.4}
            noiseAmount={0}
            distortion={0}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1.6}
            saturation={0.9}
          />
        </div>

        {/* Linha de luz brilhante na borda superior e glow solar sutil (igual ao bloco Como Funciona) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 sm:w-3/4 h-[2px] bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_25px_#F59E0B] pointer-events-none z-10" />
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-10 bg-amber-400/25 blur-xl rounded-full pointer-events-none z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Badge: "Instalação e manutenção elétrica" */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-xs font-bold text-red-400 uppercase tracking-wider mb-6 shadow-sm backdrop-blur-md"
          >
            <Wrench className="w-3.5 h-3.5 text-red-400" />
            <span>Instalação e manutenção elétrica</span>
          </motion.div>

          {/* Headline de Fechamento */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight md:leading-[1.15] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
          >
            Pronto para zerar sua conta de luz?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Fale diretamente com os fundadores e engenheiros da Perutche Solar. Fazemos o estudo técnico de viabilidade e projeto personalizado sem nenhum custo para você.
          </motion.p>

          {/* Botões CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              id="fechamento-btn-whatsapp"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chamar no WhatsApp para falar com engenharia da Perutche Solar"
              className="w-full sm:w-auto min-h-[64px] inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4.5 sm:py-5 rounded-2xl bg-[#E51E25] text-white hover:bg-[#C9161C] font-black text-base sm:text-lg shadow-xl shadow-red-500/25 hover:shadow-[0_0_35px_rgba(229,30,37,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-400 cursor-pointer"
            >
              <PhoneCall className="w-5 h-5 text-white" />
              <span>Chamar no WhatsApp</span>
            </a>

            <Button
              id="fechamento-btn-simulacao"
              size="lg"
              variant="outline-white"
              href="/simular"
              aria-label="Fazer simulação online de energia solar"
              onClick={handleSimularClick}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto min-h-[64px] px-8 sm:px-10 py-4.5 sm:py-5 !rounded-2xl font-black text-base sm:text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md cursor-pointer"
            >
              Fazer Simulação Online
            </Button>
          </motion.div>

          {/* Cards Institucionais (Endereço, WhatsApp, CNPJ) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 pt-10 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-5 text-left"
          >
            {/* Endereço */}
            <div className="bg-[#131B2E]/80 backdrop-blur-md border border-slate-700/80 p-5 rounded-2xl flex items-start gap-3.5 shadow-lg shadow-black/20 hover:border-amber-400/40 hover:bg-[#162035] transition-all">
              <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-[#E51E25] shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Sede Técnica
                </span>
                <p className="text-xs sm:text-sm font-semibold text-white mt-0.5 leading-snug">
                  Rua Prof. Nilza Cardoso 510, Bairro Paraíso, Guanambi/BA
                </p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-[#131B2E]/80 backdrop-blur-md border border-slate-700/80 p-5 rounded-2xl flex items-start gap-3.5 shadow-lg shadow-black/20 hover:border-amber-400/40 hover:bg-[#162035] transition-all">
              <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-[#E51E25] shrink-0 mt-0.5">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  WhatsApp Oficial
                </span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-bold text-red-400 hover:text-red-300 mt-0.5 block hover:underline"
                >
                  77 99177-8723
                </a>
              </div>
            </div>

            {/* CNPJ */}
            <div className="bg-[#131B2E]/80 backdrop-blur-md border border-slate-700/80 p-5 rounded-2xl flex items-start gap-3.5 shadow-lg shadow-black/20 hover:border-amber-400/40 hover:bg-[#162035] transition-all">
              <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-[#E51E25] shrink-0 mt-0.5">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Razão Social & CNPJ
                </span>
                <p className="text-xs sm:text-sm font-semibold text-white mt-0.5 font-mono">
                  29.782.244/0001-55
                </p>
              </div>
            </div>
          </motion.div>

          <p className="mt-8 text-xs text-slate-400">
            Atendimento presencial em Guanambi, Caetité, Urandi, Pindaí, Candiba, Palmas de Monte Alto e todo o Sudoeste Baiano.
          </p>

        </div>
      </section>

      {/* 10. WhatsAppFloat (verificado e presente na página) */}
      <WhatsAppFloat />

    </main>
  );
}
