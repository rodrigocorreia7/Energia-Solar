'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Building2,
  Factory,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { GUANAMBI_SOLAR_CONFIG } from '../../lib/solar/tariffs';

export interface SegmentosSolucoesProps {
  onNavigate?: (path: string) => void;
}

export const SegmentosSolucoes: React.FC<SegmentosSolucoesProps> = ({ onNavigate }) => {
  const whatsappUrl = `https://wa.me/${GUANAMBI_SOLAR_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
    'Olá, Perutche Solar! Vi as soluções no site e gostaria de um estudo para meu projeto.'
  )}`;

  const handleSimularClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const calc = document.getElementById('calculadora');
    if (calc) {
      calc.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate('/simular');
    }
  };

  return (
    <section id="segmentos" className="py-20 md:py-28 bg-[#F9FAFB] border-t border-b border-gray-200 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#E51E25]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-[#E51E25] uppercase tracking-wider mb-4 shadow-xs"
          >
            <img src="/Imagens/icone.png" alt="Ícone Perutche" className="w-4 h-4 object-contain" />
            <span>Soluções Personalizadas Para Cada Necessidade</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] tracking-tight leading-tight"
          >
            Da sua residência às maiores indústrias da Bahia
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#4B5563] leading-relaxed text-pretty"
          >
            Engenharia própria, atendimento regional em Guanambi e tecnologia de ponta dimensionada exatamente para o seu consumo.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
          {/* Card 1: Residencial */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white border border-gray-200 rounded-3xl p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-gray-300 transition-all group"
          >
            <div>
              <div className="h-44 -mx-7 -mt-7 mb-6 overflow-hidden rounded-t-3xl relative">
                <img
                  src="/Imagens/residencia.jpg"
                  alt="Energia Solar Residencial em Guanambi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-900 border border-white/60 shadow-xs flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-[#E51E25]" />
                  <span>Residencial</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Projetos Solares Residenciais
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
                Conforto para sua família usar ar-condicionado o dia todo sem susto na conta de luz da Coelba.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-gray-700 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Financiamento em até <strong>84x</strong> com parcelas menores que a economia.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Instalação rápida em 48h sem vazamentos ou danos no telhado.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Monitoramento em tempo real da geração pelo aplicativo no celular.</span>
                </li>
              </ul>
            </div>

            <Button
              id="segmento-btn-residencial"
              variant="outline"
              size="md"
              onClick={handleSimularClick}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full text-xs font-bold border-gray-300 hover:border-[#E51E25] hover:text-[#E51E25]"
            >
              Simular para Minha Casa
            </Button>
          </motion.div>

          {/* Card 2: Comercial */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border border-gray-200 rounded-3xl p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-gray-300 transition-all group"
          >
            <div>
              <div className="h-44 -mx-7 -mt-7 mb-6 overflow-hidden rounded-t-3xl relative">
                <img
                  src="/Imagens/industria.jpg"
                  alt="Energia Solar Comercial em Guanambi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-900 border border-white/60 shadow-xs flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Comercial</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Projetos Solares Comerciais
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
                Mais competitividade e previsibilidade financeira para comércios, clínicas, escritórios e supermercados.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-gray-700 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Redução imediata de até <strong>95%</strong> dos custos operacionais com energia.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Proteção total contra a inflação energética e bandeiras tarifárias.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Projetos com carência bancária que se pagam com a própria economia gerada.</span>
                </li>
              </ul>
            </div>

            <a
              id="segmento-btn-comercial"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:border-[#E51E25] hover:text-[#E51E25] transition-colors"
            >
              <span>Consultoria Comercial no WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Card 3: Industrial (O Rei das Cerâmicas) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white border-2 border-[#E51E25] rounded-3xl p-7 flex flex-col justify-between shadow-lg shadow-red-500/10 hover:shadow-2xl transition-all relative group"
          >
            <div className="absolute -top-3.5 right-6 bg-[#E51E25] text-white px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
              <span>👑</span>
              <span>O Rei das Cerâmicas</span>
            </div>

            <div>
              <div className="h-44 -mx-7 -mt-7 mb-6 overflow-hidden rounded-t-3xl relative bg-slate-900">
                <img
                  src="/Imagens/ceramica.jpg"
                  alt="Energia Solar Industrial em Guanambi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute top-3 left-3 bg-[#E51E25] text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5" />
                  <span>Industrial Pesado</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Usinas Industriais & Cerâmicas
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
                <strong>Somos líderes porque entendemos a força da sua indústria!</strong> Projetamos usinas de alta voltagem para operações 24h.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-gray-700 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E51E25] shrink-0 mt-0.5" />
                  <span><strong>72+ cerâmicas atendidas</strong> gerando sua própria energia em toda a Bahia.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E51E25] shrink-0 mt-0.5" />
                  <span>Dimensionamento elétrico para marombas de 20cv, fornos e compressores.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E51E25] shrink-0 mt-0.5" />
                  <span>Equipe própria de limpeza rotativa e manutenção preventiva de usinas de solo.</span>
                </li>
              </ul>
            </div>

            <a
              id="segmento-btn-industrial"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#E51E25] text-white hover:bg-[#C9161C] text-xs font-bold shadow-md shadow-red-500/20 transition-all hover:scale-[1.02]"
            >
              <span>Falar com Especialista Industrial</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default SegmentosSolucoes;
