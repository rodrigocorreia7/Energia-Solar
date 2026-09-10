'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Minus,
  HelpCircle,
  MessageCircle,
  ArrowRight,
  Home,
  CloudRain,
  Sparkles,
  TrendingUp,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import { GUANAMBI_SOLAR_CONFIG } from '../../lib/solar/tariffs';

export interface FAQProps {
  onNavigate?: (path: string) => void;
}

interface FAQItem {
  id: number;
  pergunta: string;
  resposta: string;
  icon: React.ElementType;
}

export const FAQ: React.FC<FAQProps> = ({ onNavigate }) => {
  // Apenas 1 item aberto por vez (começa com o primeiro aberto)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const faqItems: FAQItem[] = [
    {
      id: 1,
      pergunta: 'Meu telhado de cerâmica aguenta?',
      resposta:
        'Sim! Usamos estrutura de alumínio anodizado que não compromete a telha. Fixação certificada contra vendavais e sem furos que possam causar infiltração.',
      icon: Home,
    },
    {
      id: 2,
      pergunta: 'E quando chove ou fica nublado?',
      resposta:
        'Guanambi tem 280 dias de sol por ano! Nos dias nublados, você usa o crédito acumulado na distribuidora. O sistema é dimensionado com margem de segurança.',
      icon: CloudRain,
    },
    {
      id: 3,
      pergunta: 'Precisa limpar os painéis?',
      resposta:
        'A chuva faz a limpeza básica. Incluímos 1 revisão anual gratuita. Para referência, fazemos manutenção pesada em 72 cerâmicas com lavagem rotativa - na sua casa é muito mais simples.',
      icon: Sparkles,
    },
    {
      id: 4,
      pergunta: 'O que acontece se eu me mudar?',
      resposta:
        'O sistema valoriza seu imóvel em ~4%. Você pode transferir o sistema para a nova casa ou vender junto com o imóvel, aumentando o valor de venda.',
      icon: TrendingUp,
    },
    {
      id: 5,
      pergunta: 'Como funciona o financiamento?',
      resposta:
        'Financiamos em até 84x (7 anos). A parcela fica menor que a economia da conta de luz, então você já sai economizando desde o primeiro mês. Aprovação rápida.',
      icon: CreditCard,
    },
    {
      id: 6,
      pergunta: 'Qual a garantia?',
      resposta:
        '25 anos nos painéis (eficiência mínima 80%), 10 anos no inversor e suporte técnico local na Rua Nilza Cardoso 510, Guanambi.',
      icon: ShieldCheck,
    },
  ];

  const whatsappDoubtUrl = `https://wa.me/${GUANAMBI_SOLAR_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
    'Olá! Estava olhando o FAQ da Perutche Solar e gostaria de tirar uma dúvida sobre energia solar para minha residência.'
  )}`;

  return (
    <section
      id="faq"
      className="py-20 md:py-32 bg-[#F9FAFB] border-t border-gray-200 relative overflow-hidden"
    >
      {/* Brilhos sutis de ambientação no fundo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#E51E25]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Headline Central */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF3C7] border border-amber-300 text-xs font-bold text-[#F59E0B] uppercase tracking-wider mb-4 shadow-sm"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Perguntas Frequentes</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] tracking-tight leading-tight"
          >
            Dúvidas frequentes
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#4B5563] font-normal leading-relaxed"
          >
            Tire suas dúvidas sobre energia solar residencial
          </motion.p>
        </div>

        {/* 2. Lista de Itens Expandíveis (Accordion com cards claros) */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className={`rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? 'bg-white border-2 border-[#E51E25] shadow-lg shadow-red-500/5'
                    : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E51E25] focus-visible:ring-offset-2 group rounded-2xl cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-btn-${item.id}`}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className={`size-11 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 ${
                      isOpen
                        ? 'bg-red-500/10 border-red-500/20 text-[#E51E25]'
                        : 'bg-gray-100/80 border-gray-200 text-gray-600 group-hover:text-[#E51E25] group-hover:bg-red-50/50'
                    }`}>
                      <item.icon className="size-5" strokeWidth={1.75} />
                    </div>
                    <h3
                      className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${
                        isOpen ? 'text-gray-900' : 'text-gray-800 group-hover:text-gray-950'
                      }`}
                    >
                      {item.pergunta}
                    </h3>
                  </div>

                  {/* Ícone + ou - para indicar o estado */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen
                        ? 'bg-[#E51E25] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-900'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-5 h-5 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                {/* Resposta expandível com animação suave */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${item.id}`}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 sm:pl-20 pr-6 text-sm sm:text-base text-gray-600 leading-relaxed font-normal border-t border-gray-100">
                        <p>{item.resposta}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bloco de Ajuda Personalizada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-sm"
        >
          <div>
            <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider block mb-1">
              Atendimento Técnico Guanambi
            </span>
            <h4 className="font-extrabold text-gray-900 text-lg sm:text-xl">
              Ainda tem alguma dúvida sobre seu telhado?
            </h4>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-1 max-w-lg">
              Fale direto com nossa equipe de engenharia local. Fazemos uma avaliação preliminar gratuita pelo WhatsApp.
            </p>
          </div>

          <a
            href={whatsappDoubtUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-bold transition-all shadow-md shadow-green-500/20 hover:scale-[1.02] shrink-0"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Tirar Dúvida no WhatsApp</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default FAQ;
