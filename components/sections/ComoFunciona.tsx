'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { LaserFlow } from '../ui/LaserFlow';
import { CircularText } from '../ui/CircularText';

export interface ComoFuncionaProps {
  onNavigate?: (path: string) => void;
}

export const ComoFunciona: React.FC<ComoFuncionaProps> = ({ onNavigate }) => {
  const handleScrollToCalculator = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const calc = document.getElementById('calculadora');
    if (calc) {
      calc.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate('/simular');
    } else {
      window.location.href = '/simular';
    }
  };

  const steps = [
    {
      number: '01',
      title: 'Sol bate nos painéis',
      text: 'Painéis Tier 1 captam a luz do sol de Guanambi mesmo em dias parcialmente nublados. São 280 dias de sol pleno por ano na região.',
      icon: Sun,
      tagColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
      badgeText: 'Captação Fotovoltaica',
      video: '/Videos/Etapa-1.mp4',
      poster: '/Imagens/802032170_948638254961575_630070986708783277_n.webp',
      caption: 'Módulos de 585W gerando energia a todo vapor',
    },
    {
      number: '02',
      title: 'Inversor transforma',
      text: 'O inversor inteligente converte a corrente contínua em alternada com mais de 98% de eficiência, alimentando ar-condicionado, geladeira e motores.',
      icon: Zap,
      tagColor: 'text-amber-300 border-amber-400/30 bg-amber-500/10',
      badgeText: 'Conversão Inteligente',
      video: '/Videos/etapa2.mp4',
      poster: '/Imagens/tropical_house_pickup.jpg',
      caption: 'Distribuição direta e silenciosa para todo o imóvel',
    },
    {
      number: '03',
      title: 'Crédito cai na Coelba',
      text: 'A energia excedente é injetada na rede da Coelba virando créditos com validade de até 60 meses. De noite você usa o que gerou de dia gastando R$ 0.',
      icon: CheckCircle2,
      tagColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      badgeText: 'Compensação de Créditos',
      video: '/Videos/etapa3.mp4',
      poster: '/Imagens/802173303_1085283137381375_6898581122454641314_n.webp',
      caption: 'Casa 100% iluminada e climatizada com custo zero',
    },
  ];

  return (
    <section
      id="como-funciona"
      className="pt-10 pb-20 md:pt-14 md:pb-28 bg-[#0A0D17] text-white relative overflow-hidden border-t border-slate-800/80"
    >
      {/* Luzes e partículas atmosféricas de fundo */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-red-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[96vw] xl:max-w-7xl 2xl:max-w-[1540px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 relative z-10">
        
        {/* Efeito Circular PERUTCHE-SOLAR- posicionado diretamente em cima da ponta do raio */}
        <div className="flex justify-center items-center relative z-30 -mb-[116px] sm:-mb-[126px] md:-mb-[136px] pointer-events-auto">
          {/* Halo solar suave no centro do círculo */}
          <div className="absolute w-48 sm:w-64 h-48 sm:h-64 bg-amber-400/20 blur-3xl rounded-full pointer-events-none" />
          <CircularText
            text="PERUTCHE-SOLAR-"
            onHover="slowDown"
            spinDuration={11}
            radius={100}
            className="text-white drop-shadow-[0_0_25px_rgba(251,191,36,0.65)]"
          />
        </div>

        {/* 1. Feixe Solar Volumétrico WebGL (LaserFlow) incidindo perfeitamente alinhado na borda superior do card */}
        <div className="relative w-full max-w-5xl mx-auto h-[260px] sm:h-[320px] md:h-[380px] pointer-events-none -mb-[6px] sm:-mb-[6px] md:-mb-[7px] z-20 overflow-visible">
          <LaserFlow
            color="#FBBF24"
            verticalBeamOffset={-0.48}
            verticalSizing={2.8}
            horizontalSizing={1.1}
            fogIntensity={0.65}
            wispIntensity={6.0}
            mouseTiltStrength={0.015}
            flowSpeed={0.35}
          />
          {/* Halo de dispersão no topo onde o feixe encontra o círculo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-amber-400/25 blur-2xl rounded-full pointer-events-none" />
          {/* Glow horizontal alinhado exatamente onde o feixe toca a borda do quadrado */}
          <div className="absolute bottom-[6px] md:bottom-[7px] left-1/2 -translate-x-1/2 w-[480px] sm:w-[720px] md:w-[960px] h-[18px] bg-gradient-to-r from-transparent via-amber-300 to-transparent blur-lg rounded-full pointer-events-none" />
        </div>

        {/* 2. O Quadrado / Card Principal com Borda Dourada / Âmbar Extra-Largo */}
        <div className="relative rounded-[28px] sm:rounded-[36px] md:rounded-[48px] border-2 border-amber-400/85 bg-[#0B0F19]/95 shadow-[0_0_80px_rgba(245,158,11,0.2)] p-6 sm:p-10 md:p-14 lg:p-18 xl:p-20 overflow-hidden z-10 backdrop-blur-xl">
          
          {/* Grid sutil de pontinhos no fundo do card (igual à referência) */}
          <div className="absolute inset-0 bg-[radial-gradient(#F59E0B_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

          {/* Linha de luz brilhante na borda superior (ponto de impacto do laser) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 sm:w-3/4 h-[4px] bg-gradient-to-r from-transparent via-amber-200 to-transparent shadow-[0_0_30px_#F59E0B,0_0_60px_#F59E0B] pointer-events-none z-20" />
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-10 bg-amber-400/35 blur-xl rounded-full pointer-events-none z-20" />

          {/* Título Principal dentro do Card */}
          <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-20 relative z-10 pt-2 sm:pt-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight uppercase"
            >
              Como funciona sua <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(245,158,11,0.5)]">energia solar</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-4 text-lg sm:text-2xl md:text-3xl text-slate-300 font-medium leading-relaxed"
            >
              Em 3 passos simples, sua conta some
            </motion.p>
          </div>

          {/* 3. Timeline com os 3 Passos */}
          <div className="relative z-10">
            {/* Linha conectando os passos */}
            <div className="hidden md:block absolute left-1/2 top-8 bottom-8 -translate-x-1/2 w-0.5 bg-gradient-to-b from-amber-400 via-amber-500 to-emerald-400 shadow-[0_0_12px_rgba(245,158,11,0.5)] pointer-events-none" />
            <div className="md:hidden absolute left-7 top-6 bottom-6 w-0.5 bg-gradient-to-b from-amber-400 via-amber-500 to-emerald-400 shadow-[0_0_12px_rgba(245,158,11,0.5)] pointer-events-none" />

            <div className="space-y-16 md:space-y-24 lg:space-y-28">
              {steps.map((step, index) => {
                const isEven = index % 2 === 1;
                const StepIcon = step.icon;

                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
                    className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-20 ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Conteúdo do Passo */}
                    <div
                      className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                        isEven ? 'md:text-left md:pl-12 lg:pl-16' : 'md:text-right md:pr-12 lg:pr-16'
                      }`}
                    >
                      <div
                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-4 border ${step.tagColor}`}
                      >
                        <span>{step.badgeText}</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center gap-3 md:inline">
                        <span>{step.title}</span>
                      </h3>

                      <p className="mt-4 text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-xl md:inline-block">
                        {step.text}
                      </p>
                    </div>

                    {/* Marcador Central da Timeline */}
                    <div className="absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 flex items-center justify-center z-20">
                      <motion.div
                        animate={{
                          scale: [1, 1.07, 1],
                          boxShadow: [
                            '0 0 15px rgba(229, 30, 37, 0.4)',
                            '0 0 25px rgba(245, 158, 11, 0.6)',
                            '0 0 15px rgba(229, 30, 37, 0.4)',
                          ],
                        }}
                        transition={{
                          duration: 3 + index,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-[#E51E25] to-[#B91C1C] text-white border-2 border-amber-400/80 shadow-xl flex flex-col items-center justify-center relative group"
                      >
                        <StepIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-white drop-shadow" />
                        <span className="text-[10px] sm:text-xs lg:text-sm font-black text-amber-200 font-mono mt-0.5">
                          {step.number}
                        </span>
                      </motion.div>
                    </div>

                    {/* Bloco Visual do Vídeo (Super Limpo, sem redundâncias) */}
                    <div
                      className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                        isEven ? 'md:pr-12 lg:pr-16' : 'md:pl-12 lg:pl-16'
                      }`}
                    >
                      <div className="relative rounded-2xl sm:rounded-3xl bg-[#0F1423]/90 border border-slate-700/80 p-4 sm:p-6 overflow-hidden group hover:border-amber-400/60 hover:shadow-[0_0_35px_rgba(245,158,11,0.2)] transition-all shadow-xl backdrop-blur-md">
                        {/* Área do Vídeo Real Autoplay Muted Loop */}
                        <div className="w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden relative bg-black/90 border border-slate-700/60 shadow-inner group">
                          <video
                            src={step.video}
                            poster={step.poster}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-3 left-4 right-4 text-xs sm:text-sm text-slate-200 font-medium drop-shadow-md">
                            {step.caption}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Banner de Ação Inferior */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mt-16 md:mt-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0F1423] via-[#141A2D] to-[#0B0F19] border border-amber-400/30 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center md:text-left relative z-10">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider mb-2">
                <Sun className="w-4 h-4 text-[#F59E0B]" />
                <span>Aproveite o Sol do Sertão Produtivo</span>
              </div>
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
                Quer ver quantos painéis sua casa precisa em Guanambi?
              </h4>
              <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl font-medium">
                Nossa calculadora usa os 5,72 kWh/m²/dia de irradiação da cidade para dimensionar o kit ideal.
              </p>
            </div>

            <div className="shrink-0 w-full sm:w-auto relative z-10">
              <Button
                id="como-funciona-btn-simular"
                size="lg"
                variant="primary"
                aria-label="Simular meu sistema solar na calculadora interativa"
                onClick={handleScrollToCalculator}
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="w-full sm:w-auto shadow-lg shadow-[#E51E25]/40 font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E51E25] bg-[#E51E25] hover:bg-[#CC1920] text-white"
              >
                Simular Meu Sistema Solar
              </Button>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Transição suave em gradiente na base para a Calculadora (#F9FAFB) */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-b from-transparent via-[#F9FAFB]/50 to-[#F9FAFB] pointer-events-none z-0" />
    </section>
  );
};

export default ComoFunciona;
