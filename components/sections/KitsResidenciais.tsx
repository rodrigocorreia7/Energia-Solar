'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

export interface KitsResidenciaisProps {
  onNavigate?: (path: string) => void;
}

// Variantes para stagger com Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export const KitsResidenciais: React.FC<KitsResidenciaisProps> = ({ onNavigate }) => {
  const handleSimularKit = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, targetVal?: number) => {
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

  const kits = [
    {
      id: 'kit-casal',
      title: 'Kit Casal',
      badge: 'Ideal para',
      badgeType: 'neutral',
      isMaisVendido: false,
      image: '/Imagens/tropical_house_pickup.jpg',
      imageAlt: 'Kit Casal Energia Solar Guanambi',
      paineis: '6 painéis solares',
      specs: [
        '6 painéis solares 585W',
        'Conta até R$ 250/mês',
        '2-3 pessoas na casa',
      ],
      economia: 'Economia: R$ 170/mês',
      parcela: '~R$ 180/mês (84x)',
      valorEstimadoConta: 250,
    },
    {
      id: 'kit-familia',
      title: 'Kit Família',
      badge: 'MAIS VENDIDO',
      badgeType: 'destaque',
      isMaisVendido: true,
      image: '/Imagens/802032170_948638254961575_630070986708783277_n.webp',
      imageAlt: 'Kit Família Energia Solar Guanambi',
      paineis: '10 painéis solares',
      specs: [
        '10 painéis solares 585W',
        'Conta até R$ 450/mês',
        '2 ar-condicionado + piscina',
        '4-5 pessoas na casa',
      ],
      economia: 'Economia: R$ 370/mês',
      parcela: '~R$ 290/mês (84x)',
      valorEstimadoConta: 450,
    },
    {
      id: 'kit-familia-grande',
      title: 'Kit Família Grande + Ar',
      badge: 'Conforto total',
      badgeType: 'neutral',
      isMaisVendido: false,
      image: '/Imagens/802173303_1085283137381375_6898581122454641314_n.webp',
      imageAlt: 'Kit Família Grande Energia Solar Guanambi',
      paineis: '16 painéis solares',
      specs: [
        '16 painéis solares 585W',
        'Conta até R$ 750/mês',
        '3+ ar-condicionado + área gourmet',
        '6+ pessoas na casa',
      ],
      economia: 'Economia: R$ 670/mês',
      parcela: '~R$ 480/mês (84x)',
      valorEstimadoConta: 750,
    },
  ];

  return (
    <section
      id="kits"
      className="py-20 md:py-32 bg-[#F9FAFB] border-t border-gray-200 relative overflow-hidden text-[#111827]"
    >
      {/* Brilhos de fundo decorativos */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#E51E25]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Headline Central */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF3C7] border border-amber-300 text-xs font-bold text-[#F59E0B] uppercase tracking-wider mb-4 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Dimensionamento Residencial Guanambi</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] tracking-tight leading-tight text-balance"
          >
            Qual kit combina com sua casa?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#4B5563] font-normal leading-relaxed text-pretty"
          >
            3 opções prontas, parcelamento em até <span className="tabular-nums">84x</span>
          </motion.p>
        </div>

        {/* 2. Grid de 3 Cards com Animações e Destaque no do Meio (1 coluna mobile, 2 tablet, 3 desktop) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch [perspective:1000px]"
        >
          {kits.map((kit) => {
            const isMaisVendido = kit.isMaisVendido;

            return (
              <motion.div
                key={kit.id}
                variants={cardVariants}
                whileHover={{
                  y: isMaisVendido ? -12 : -8,
                  rotateX: 2,
                  transition: { type: 'spring', stiffness: 320, damping: 22 },
                }}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 group will-change-transform ${
                  isMaisVendido
                    ? 'bg-white border-2 border-[#E51E25] shadow-antigravity shadow-antigravity-hover md:-translate-y-2'
                    : 'bg-white border border-gray-200 shadow-antigravity shadow-antigravity-hover'
                }`}
              >
                {/* Badge Superior */}
                {isMaisVendido ? (
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#E51E25] text-white text-[11px] font-black uppercase tracking-wider shadow-lg shadow-red-500/30 flex items-center gap-1.5 whitespace-nowrap z-20 will-change-transform"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>MAIS VENDIDO</span>
                  </motion.div>
                ) : (
                  <div className="inline-flex self-start px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-4">
                    {kit.badge}
                  </div>
                )}

                <div>
                  {/* Topo: Título e Detalhe */}
                  <div className={`mb-4 ${isMaisVendido ? 'mt-2' : ''}`}>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-snug">
                      {kit.title}
                    </h3>
                    <span className="text-xs font-semibold text-[#F59E0B]">
                      {kit.paineis}
                    </span>
                  </div>

                  {/* Foto Real do Kit */}
                  <div className="w-full h-44 rounded-2xl overflow-hidden mb-6 relative bg-slate-100 border border-gray-200">
                    <img
                      src={kit.image}
                      alt={kit.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-400" />
                      <span>{kit.paineis}</span>
                    </div>
                  </div>

                  {/* Specs com Ícones */}
                  <div className="space-y-2.5 pb-6 border-b border-gray-200">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                      Especificações:
                    </span>
                    {kit.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2.5 text-sm text-gray-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-emerald-600" />
                        </div>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Economia e Parcela */}
                  <div className="py-5 space-y-3">
                    <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-800">
                        Economia média:
                      </span>
                      <strong className="text-base font-black text-emerald-700 font-mono tabular-nums">
                        {kit.economia.replace('Economia: ', '')}
                      </strong>
                    </div>

                    <div className="flex items-baseline justify-between px-1">
                      <span className="text-xs text-gray-500 font-medium">
                        Parcelamento:
                      </span>
                      <span className="text-sm font-bold text-gray-900 font-mono tabular-nums">
                        {kit.parcela}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botão de Ação */}
                <div className="pt-2">
                  <Button
                    id={`btn-simular-${kit.id}`}
                    size="md"
                    variant={isMaisVendido ? 'primary' : 'outline'}
                    onClick={(e) => handleSimularKit(e, kit.valorEstimadoConta)}
                    aria-label={`Simular ${kit.title} para consumo até R$ ${kit.valorEstimadoConta} por mês`}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className={`w-full font-bold focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      isMaisVendido
                        ? 'shadow-md shadow-[#E51E25]/25 focus-visible:ring-[#E51E25]'
                        : 'border-gray-300 text-gray-800 hover:bg-gray-50 hover:border-gray-400 focus-visible:ring-gray-400'
                    }`}
                  >
                    Simular este kit
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 3. Nota Abaixo dos Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 sm:mt-14 text-center"
        >
          <p className="text-xs sm:text-sm text-gray-500 italic">
            * Estimativa inicial - o projeto definitivo depende da análise técnica e orientação do telhado em Guanambi.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default KitsResidenciais;
