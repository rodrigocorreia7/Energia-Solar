'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  CheckCircle2,
  Factory,
  Home,
  Play,
  Trophy,
  MapPin,
  Zap,
  Shield,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '../ui/Button';

export interface ProvaSocialProps {
  onNavigate?: (path: string) => void;
}

export const ProvaSocial: React.FC<ProvaSocialProps> = ({ onNavigate }) => {
  const cerâmicaItems = [
    'Motores de 20cv (3.900 kWh/mês)',
    'Poeira contínua de argila',
    'Usinas de solo de alta voltagem',
    'Manutenção pesada com lavagem rotativa',
    'Exaustores 24h (5.400 kWh/mês)',
  ];

  const residenciaItems = [
    'Instalação limpa em 48h',
    'Estrutura de alumínio sem furo na telha',
    'Fixação certificada contra vendavais',
    'Monitoramento pelo app no celular',
    'Revisão anual inclusa',
  ];

  const clientesCeramicas = [
    'CERÂMICA SÃO JOSÉ',
    'CERÂMICA SANTA RITA',
    'CERÂMICA GUANAMBI',
    'CERÂMICA BELA VISTA',
    'CERÂMICA UNIÃO',
    'CERÂMICA PARAÍSO',
    'CERÂMICA NOSSA SENHORA',
    'CERÂMICA BOM JESUS',
    'CERÂMICA MONTE ALTO',
    'CERÂMICA IRMÃOS PIRES',
  ];

  return (
    <section
      id="prova-social"
      className="bg-white border-t border-gray-200 relative overflow-hidden text-[#111827]"
    >
      {/* Faixa Rotativa de Cerâmicas Clientes no Topo (Full Width) */}
      <div className="w-full bg-[#0B0F19] border-b border-slate-800/90 py-2.5 sm:py-3 relative overflow-hidden shadow-sm z-20">
        {/* Efeito de fade nas extremidades */}
        <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#0B0F19] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#0B0F19] to-transparent z-10 pointer-events-none" />

        {/* Ticker contínuo infinito (Marquee) com velocidade otimizada */}
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 16,
            ease: 'linear',
            repeat: Infinity,
          }}
          className="flex items-center whitespace-nowrap will-change-transform"
        >
          {[...clientesCeramicas, ...clientesCeramicas].map((cliente, idx) => (
            <div key={idx} className="inline-flex items-center">
              <span className="text-xs sm:text-[13px] font-black tracking-wider uppercase text-slate-100 font-sans">
                {cliente}
              </span>
              <span className="mx-3.5 sm:mx-5 w-1.5 h-1.5 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B] shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Efeitos de luz de fundo */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#E51E25]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-14 sm:pt-18 md:pt-20 pb-20 md:pb-32">
        
        {/* 1. Headline de Autoridade */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF3C7] border border-amber-300 text-xs font-bold text-[#F59E0B] uppercase tracking-wider mb-5 shadow-sm">
            <Shield className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Engenharia Industrial Aplicada à Sua Família</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight md:leading-[1.18] text-balance">
            “Se a nossa engenharia suporta{' '}
            <span className="text-[#E51E25] tabular-nums">
              72 indústrias e cerâmicas pesadas
            </span>{' '}
            da Bahia, o telhado da sua casa está em mãos cirúrgicas.”
          </h2>

          <p className="mt-5 text-sm sm:text-base text-[#4B5563] max-w-2xl mx-auto font-normal text-pretty">
            Não improvisamos. Trazemos o rigor técnico das maiores fábricas de cerâmica vermelha do Sudoeste Baiano diretamente para a sua residência.
          </p>
        </motion.div>

        {/* 2. Comparativo Visual (3 Colunas: Fundadores, Cerâmica B2B, Residência B2C) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-14">
          
          {/* Coluna 1 - Os Fundadores (Presença Real em Cada Usina) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between relative min-h-[460px] sm:min-h-[500px]"
          >
            <div className="relative flex-1 w-full overflow-hidden">
              <img
                src="/Imagens/casal-donos.jpg"
                alt="Fundadores da Perutche Solar entregando usina"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />

              {/* Tag dos Fundadores */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0B0F19]/85 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-wider shadow">
                Diretoria & Fundadores
              </div>

              {/* Overlay na base */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

              {/* Frase solicitada pelo usuário */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
                <p className="text-sm sm:text-base font-black leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                  Presença e compromisso real em cada usina entregue.
                </p>
                <span className="text-[11px] text-amber-300 font-bold block mt-1.5 drop-shadow">
                  Perutche Solar • Guanambi & Região
                </span>
              </div>
            </div>
          </motion.div>

          {/* Coluna 2 - Na Cerâmica (B2B) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="bg-[#F9FAFB] border border-gray-200 rounded-3xl p-7 sm:p-9 flex flex-col justify-between shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600">
                  <Factory className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                    Ambiente Severo • B2B
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                    Nas 72 cerâmicas que atendemos:
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
                Operações 24 horas por dia em ambiente de pó abrasivo, alta temperatura e picos gigantescos de demanda elétrica:
              </p>

              {/* Lista com ícones */}
              <ul className="space-y-4">
                {cerâmicaItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <div className="size-5 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="size-3.5 text-[#F59E0B]" strokeWidth={2} />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500 font-mono">
              <span>Nível de exigência técnica:</span>
              <span className="text-amber-700 font-bold uppercase">Industrial Máximo</span>
            </div>
          </motion.div>

          {/* Coluna 3 - Na Sua Residência (B2C) - Destaque com Vermelho Suave */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="bg-white border-2 border-[#E51E25] rounded-3xl p-7 sm:p-9 flex flex-col justify-between shadow-lg shadow-[#E51E25]/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-2xl bg-[#E51E25] text-white text-[10px] font-black uppercase tracking-wider shadow">
              Padrão Ouro Perutche
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-[#E51E25]">
                  <Home className="w-6 h-6 text-[#E51E25]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#E51E25] uppercase tracking-wider block">
                    Conforto & Segurança • B2C
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                    Na sua casa:
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
                Toda essa tecnologia refinada para garantir zero vazamento, zero dor de cabeça e economia imediata na conta:
              </p>

              {/* Lista com ícones verdes */}
              <ul className="space-y-4">
                {residenciaItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-800">
                    <div className="size-5 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="size-3.5 text-emerald-600" strokeWidth={2} />
                    </div>
                    <span className="font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500 font-mono">
              <span>Garantia de vedação e fixação:</span>
              <span className="text-emerald-700 font-bold uppercase">100% Blindada</span>
            </div>
          </motion.div>

        </div>

        {/* 4. Badge de Destaque Centralizado */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center mb-14"
        >
          <div className="w-full max-w-2xl bg-[#F9FAFB] border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-around gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#F59E0B] shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-gray-900 block">
                  72+ Usinas Entregues
                </span>
                <span className="text-[11px] text-gray-500">
                  Desde 2018 na Bahia
                </span>
              </div>
            </div>

            <div className="h-8 w-px bg-gray-200 hidden sm:block" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#E51E25] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-gray-900 block">
                  Guanambi & Sudoeste BA
                </span>
                <span className="text-[11px] text-gray-500">
                  Presença técnica local
                </span>
              </div>
            </div>

            <div className="h-8 w-px bg-gray-200 hidden sm:block" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-gray-900 block">
                  Mesma Equipe da Indústria
                </span>
                <span className="text-[11px] text-gray-500">
                  Engenheiros próprios
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProvaSocial;
