'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Banknote, Flag, Coins, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export interface DorSolucaoProps {
  onNavigate?: (path: string) => void;
}

// Variantes para animação em stagger com Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

const inversionVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.25,
      ease: 'easeOut',
    },
  },
};

export const DorSolucao: React.FC<DorSolucaoProps> = ({ onNavigate }) => {
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

  const cardsData = [
    {
      id: 'conta-alta',
      icon: Banknote,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50 border-amber-200/60',
      tag: 'Custo Crescente',
      tagColor: 'bg-amber-100/80 text-amber-800 border-amber-200',
      title: 'Conta que não para de subir',
      text: 'Você paga todo mês e não vê retorno. Em 25 anos, são R$ 187.000 pra Coelba.',
    },
    {
      id: 'bandeira-vermelha',
      icon: Flag,
      iconColor: 'text-red-600',
      iconBg: 'bg-red-50 border-red-200/60',
      tag: 'Bandeira Tarifária',
      tagColor: 'bg-red-100/80 text-red-800 border-red-200',
      title: 'Taxas extras surpresa',
      text: 'Bandeira vermelha, impostos, taxas. Tudo embutido na sua fatura.',
    },
    {
      id: 'sem-retorno',
      icon: Coins,
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-50 border-rose-200/60',
      tag: 'Desperdício',
      tagColor: 'bg-rose-100/80 text-rose-800 border-rose-200',
      title: 'Dinheiro jogado fora',
      text: 'Em 25 anos, você poderia ter R$ 78,40 por mês com energia solar.',
    },
  ];

  return (
    <section
      id="dor-solucao"
      className="py-20 md:py-28 bg-white border-t border-b border-gray-200 relative overflow-hidden"
    >
      {/* Detalhe de fundo suave */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-50/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Headline Central */}
        <div className="text-center max-w-4xl mx-auto mb-14 md:mb-18">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-[#E51E25] uppercase tracking-wider mb-4 shadow-xs"
          >
            <span>Realidade Tarifária em Guanambi</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-black text-[#111827] tracking-tight leading-[1.18] text-balance"
          >
            Cerâmica gasta <span className="tabular-nums">R$ 15 mil</span> de energia por mês.{' '}
            <span className="block mt-1 sm:inline text-[#E51E25]">
              A sua quanto gasta?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#4B5563] max-w-2xl mx-auto font-normal leading-relaxed text-pretty"
          >
            A energia mais cara da Bahia pesa no orçamento de casas e empresas. O dinheiro que você envia à concessionária nunca mais volta.
          </motion.p>
        </div>

        {/* 2. Grid de 3 Cards com Animação Stagger (1 coluna mobile, 2 tablet, 3 desktop) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch [perspective:1000px]"
        >
          {cardsData.map((card) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
                className="bg-white rounded-2xl p-7 sm:p-8 border-l-4 border-l-[#E51E25] border-y border-r border-gray-200 shadow-antigravity shadow-antigravity-hover flex flex-col justify-between relative group will-change-transform"
              >
                <div>
                  {/* Topo do Card: Ícone e Badge */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div
                      className={`size-14 rounded-2xl border flex items-center justify-center shadow-xs ${card.iconBg}`}
                    >
                      <IconComponent className={`size-7 ${card.iconColor}`} strokeWidth={1.75} />
                    </div>

                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${card.tagColor}`}
                    >
                      {card.tag}
                    </span>
                  </div>

                  {/* Título do Card */}
                  <h3 className="text-xl sm:text-2xl font-black text-[#111827] tracking-tight leading-snug">
                    {card.title}
                  </h3>

                  {/* Texto do Card */}
                  <p className="mt-3.5 text-sm sm:text-base text-[#4B5563] leading-relaxed font-normal">
                    {card.text}
                  </p>
                </div>

                {/* Linha decorativa na base do card */}
                <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-gray-500">
                  <IconComponent className={`w-4 h-4 ${card.iconColor}`} />
                  <span>Impacto direto na sua fatura Coelba</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 3. Seção de Inversão (Abaixo dos Cards) */}
        <motion.div
          variants={inversionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="mt-10 sm:mt-14 rounded-2xl sm:rounded-3xl p-7 sm:p-10 border border-red-200/90 bg-gradient-to-r from-red-50/90 via-rose-50/80 to-amber-50/50 backdrop-blur-sm shadow-antigravity shadow-antigravity-hover text-center relative overflow-hidden"
        >
          {/* Brilho decorativo sutil */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-red-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-red-200 text-xs font-bold text-[#E51E25] uppercase tracking-wider mb-4 shadow-xs animate-weightless will-change-transform">
              <Sparkles className="w-3.5 h-3.5 text-[#E51E25]" />
              <span>A Inversão Inteligente</span>
            </div>

            {/* Texto grande com destaque visual nos números */}
            <p className="text-2xl sm:text-4xl md:text-5xl font-black text-[#111827] tracking-tight leading-tight text-balance">
              Ou você pode pagar{' '}
              <span className="text-[#E51E25] inline-block px-1 tabular-nums">
                R$ 78,40
              </span>{' '}
              por mês com a Perutche.
            </p>

            <p className="mt-4 text-sm sm:text-base text-[#4B5563] max-w-xl font-normal text-pretty">
              Troque uma despesa eterna da Coelba por um investimento financiado em até <span className="tabular-nums">84x</span> com parcelas que cabem na economia gerada pelo sol de Guanambi.
            </p>

            {/* Botão de ação rápida para simulação */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <Button
                id="dor-solucao-cta-simular"
                size="lg"
                variant="primary"
                onClick={handleScrollToCalculator}
                aria-label="Simular Minha Economia Agora no Simulador"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="w-full sm:w-auto shadow-md shadow-red-600/20 font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E51E25]"
              >
                Simular Minha Economia Agora
              </Button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default DorSolucao;
