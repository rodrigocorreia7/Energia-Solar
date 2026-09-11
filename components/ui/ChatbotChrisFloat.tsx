'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  MessageCircle, 
  Calculator, 
  ArrowRight,
  User
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'chris' | 'user';
  text: string;
  time: string;
  action?: {
    type: 'calculator' | 'whatsapp';
    label: string;
    url?: string;
  };
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'msg-init',
  sender: 'chris',
  text: 'Olá! Sou o Chris, consultor virtual de inteligência artificial da Perutche Solar. ☀️\n\nPosso tirar todas as suas dúvidas sobre economia de até 95% na fatura da Coelba, usinas para cerâmicas e indústrias, homologação ou financiamento sem entrada. Como posso te ajudar hoje?',
  time: 'Agora'
};

const SUGGESTED_QUESTIONS = [
  'Como zerar até 95% da conta Coelba?',
  'Atendem indústrias e cerâmicas?',
  'Qual o prazo de instalação e ligação?',
  'Como funciona o financiamento em até 120x?',
  'Quero falar com um engenheiro humano'
];

export const ChatbotChrisFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTeaser, setShowTeaser] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowTeaser(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages]);

  const getTimeString = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  const generateChrisResponse = (question: string): { text: string; action?: ChatMessage['action'] } => {
    const q = question.toLowerCase();

    if (q.includes('95%') || q.includes('zerar') || q.includes('economia') || q.includes('conta')) {
      return {
        text: 'A economia chega a até 95% porque seu sistema solar gera toda a energia que seu imóvel consome durante o dia e injeta o excedente na rede da Coelba.\n\nVocê deixa de pagar pelo consumo e só arca com a taxa de disponibilidade básica da rede e a iluminação pública (CIP). Em Guanambi e região temos a maior irradiação solar do país (5,72 kWh/m²/dia), garantindo retorno veloz do seu investimento!',
        action: {
          type: 'calculator',
          label: 'Simular Minha Economia Agora'
        }
      };
    }

    if (q.includes('cerâmica') || q.includes('industria') || q.includes('fábrica') || q.includes('b2b') || q.includes('pesada')) {
      return {
        text: 'Sim! Essa é a nossa grande especialidade técnica. A Perutche Solar já projetou e homologou mais de 72 usinas de alta potência em indústrias e cerâmicas vermelhas pesadas da Bahia.\n\nTrabalhamos com usinas de solo e grandes telhados industriais, com subestações, proteção de rede e relatórios de engenharia completos para reduzir custos operacionais milionários.',
        action: {
          type: 'whatsapp',
          label: 'Falar com Engenheiro B2B',
          url: 'https://wa.me/5577991778723?text=Ol%C3%A1%2C%20gostaria%20de%20um%20estudo%20solar%20para%20minha%20ind%C3%BAstria%2Fcer%C3%A2mica.'
        }
      };
    }

    if (q.includes('prazo') || q.includes('tempo') || q.includes('homologação') || q.includes('ligação') || q.includes('coelba')) {
      return {
        text: 'Cuidamos de 100% do processo burocrático e técnico com a Coelba / Neoenergia! 📋\n\n• Parecer de Acesso e Projeto: de 15 a 30 dias.\n• Instalação física: de 1 a 3 dias úteis.\n• Vistoria e troca do medidor bidirecional pela Coelba: até 15 dias.\n\nNo total, seu sistema estará gerando economia real em média entre 30 e 45 dias.',
      };
    }

    if (q.includes('financiamento') || q.includes('120x') || q.includes('parcela') || q.includes('banco') || q.includes('entrada')) {
      return {
        text: 'Temos linhas de crédito especiais para energia solar com os principais bancos parceiros (BV, Santander, Banco do Nordeste, Sicredi, Sicoob e BB).\n\n• Financiamento em até 120 meses;\n• Sem necessidade de entrada;\n• Carência de até 90 a 120 dias para começar a pagar (você já paga a primeira parcela com o dinheiro que economizou da Coelba!).',
        action: {
          type: 'calculator',
          label: 'Calcular Parcelas e Investimento'
        }
      };
    }

    if (q.includes('humano') || q.includes('whatsapp') || q.includes('telefone') || q.includes('falar') || q.includes('atendente') || q.includes('contato')) {
      return {
        text: 'Com certeza! Você pode falar diretamente agora mesmo com os nossos engenheiros e consultores técnicos em Guanambi pelo WhatsApp oficial.',
        action: {
          type: 'whatsapp',
          label: 'Abrir WhatsApp com Engenheiro',
          url: 'https://wa.me/5577991778723?text=Ol%C3%A1!%20Estava%20conversando%20com%20o%20Chris%20e%20gostaria%20de%20um%20or%C3%A7amento%20solar%20personalizado.'
        }
      };
    }

    if (q.includes('preço') || q.includes('custo') || q.includes('valor') || q.includes('quanto custa')) {
      return {
        text: 'O valor exato depende do consumo médio da sua fatura mensal da Coelba em kWh ou em Reais.\n\nPara residências, as parcelas do financiamento costumam ser menores do que você já paga todo mês na fatura da Coelba. Quer calcular o valor para sua casa?',
        action: {
          type: 'calculator',
          label: 'Calcular Valor da Minha Usina'
        }
      };
    }

    if (q.includes('garantia') || q.includes('painel') || q.includes('inversor') || q.includes('marca')) {
      return {
        text: 'Trabalhamos apenas com componentes Padrão Ouro de primeira linha (Tier 1):\n\n• Módulos Solares: 25 a 30 anos de garantia linear de geração.\n• Inversores (WEG, Growatt, Solis, Deye): 10 anos de garantia com assistência rápida.\n• Estruturas de fixação em alumínio anodizado inoxidável anti-corrosão.',
      };
    }

    return {
      text: 'Excelente pergunta! A Perutche Solar entrega soluções completas "chave na mão": dimensionamento, projeto de engenharia com ART, equipamentos Tier 1, instalação com equipe própria e homologação integral junto à Coelba.\n\nVocê gostaria de simular a quantidade de placas para sua casa/empresa ou prefere que um de nossos especialistas monte um estudo técnico gratuito?',
      action: {
        type: 'calculator',
        label: 'Fazer Simulação Online'
      }
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      time: getTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const responseData = generateChrisResponse(text);
      const chrisMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'chris',
        text: responseData.text,
        time: getTimeString(),
        action: responseData.action
      };
      setMessages(prev => [...prev, chrisMsg]);
      setIsTyping(false);
    }, 650);
  };

  const handleActionClick = (action: ChatMessage['action']) => {
    if (!action) return;
    if (action.type === 'calculator') {
      const calcElement = document.getElementById('calculadora');
      if (calcElement) {
        calcElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/#calculadora';
      }
    } else if (action.type === 'whatsapp' && action.url) {
      window.open(action.url, '_blank');
    }
  };

  const handleQuickScrollToCalculator = () => {
    const calcElement = document.getElementById('calculadora');
    if (calcElement) {
      calcElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#calculadora';
    }
  };

  return (
    <div className="fixed bottom-[84px] sm:bottom-[88px] right-4 sm:right-6 z-50 select-none">
      
      {/* 1. Modal da Janela do Chatbot (Aparece acima do botão quando aberto) */}
      <AnimatePresence>
        {isOpen && (
          <div className="relative">
            {/* Chris 3D Pop-up Avatar emergindo por trás da borda superior */}
            <motion.div
              initial={{ y: 45, opacity: 0, scale: 0.85 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 35, opacity: 0, scale: 0.85 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              className="absolute -top-[102px] sm:-top-[118px] left-1/2 -translate-x-1/2 pointer-events-none z-0 flex justify-center w-36 sm:w-44"
            >
              <div className="relative">
                <img
                  src="/Imagens/chatbot-avatar.png"
                  alt="Chris - Consultor IA Perutche Solar"
                  className="w-32 sm:w-40 h-auto drop-shadow-[0_16px_32px_rgba(0,0,0,0.65)] object-contain"
                />
                {/* Glow sutil atrás da cabeça */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-blue-500/20 rounded-full blur-2xl pointer-events-none -z-10" />
              </div>
            </motion.div>

            {/* Janela Principal do Chat (z-10 para sobrepor e recortar o peito do Chris naturalmente) */}
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative z-10 w-[350px] sm:w-[390px] max-w-[calc(100vw-24px)] h-[510px] sm:h-[550px] max-h-[calc(100dvh-165px)] rounded-2xl sm:rounded-3xl bg-[#0B132B] border border-blue-500/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden mb-3.5 backdrop-blur-xl"
            >
              {/* Header do Chat */}
              <div className="bg-[#0D1838] border-b border-white/10 px-4 py-3 sm:py-3.5 flex items-center justify-between relative z-20">
                <div className="flex items-center gap-3">
                  {/* Ícone com indicador online */}
                  <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 text-white shadow-inner">
                    <Bot className="w-5 h-5" />
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#0D1838]" />
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 leading-none">
                      <span className="font-extrabold text-white text-base tracking-tight">Chris</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-blue-600/90 text-blue-100 tracking-wider">
                        IA
                      </span>
                    </div>
                    <p className="text-[11px] text-cyan-300 font-medium mt-1">
                      Consultor Virtual Perutche Solar
                    </p>
                  </div>
                </div>

                {/* Botão Fechar Modal */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Fechar janela do Chris"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Faixa Promocional de Ação Rápida */}
              <div className="bg-[#121F45] border-b border-white/5 px-3.5 py-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-200 font-semibold truncate">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">Zere até 95% da conta Coelba</span>
                </div>
                <button
                  type="button"
                  onClick={handleQuickScrollToCalculator}
                  className="shrink-0 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm hover:scale-105 active:scale-95 transition-transform"
                >
                  Simular
                </button>
              </div>

              {/* Feed de Mensagens */}
              <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 bg-[#090F24]/95 text-slate-200 scrollbar-thin scrollbar-thumb-slate-700">
                {messages.map(msg => {
                  const isChris = msg.sender === 'chris';

                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 items-end ${isChris ? 'justify-start' : 'justify-end'}`}
                    >
                      {/* Mini Avatar do Chris na mensagem */}
                      {isChris && (
                        <div className="shrink-0 w-7 h-7 rounded-full bg-blue-600/80 border border-blue-400/40 flex items-center justify-center text-white text-xs mb-1">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div className={`max-w-[82%] sm:max-w-[80%] flex flex-col ${isChris ? 'items-start' : 'items-end'}`}>
                        <div
                          className={`p-3 sm:p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-sm whitespace-pre-line ${
                            isChris
                              ? 'bg-[#152347] text-slate-100 rounded-2xl rounded-bl-xs border border-blue-500/20'
                              : 'bg-gradient-to-r from-[#E51E25] to-[#B91C1C] text-white rounded-2xl rounded-br-xs font-medium'
                          }`}
                        >
                          {msg.text}

                          {/* Botão de Ação Opcional embutido na resposta */}
                          {msg.action && (
                            <button
                              type="button"
                              onClick={() => handleActionClick(msg.action)}
                              className="mt-3 w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-md active:scale-95 transition-all"
                            >
                              {msg.action.type === 'calculator' && <Calculator className="w-3.5 h-3.5" />}
                              {msg.action.type === 'whatsapp' && <MessageCircle className="w-3.5 h-3.5" />}
                              <span>{msg.action.label}</span>
                              <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                            </button>
                          )}
                        </div>

                        <span className="text-[10px] text-slate-400 px-1 mt-1">
                          {msg.time}
                        </span>
                      </div>

                      {/* Mini Ícone Usuário */}
                      {!isChris && (
                        <div className="shrink-0 w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 text-[10px] mb-1">
                          <User className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Indicador de Digitação do Chris */}
                {isTyping && (
                  <div className="flex gap-2.5 items-end justify-start">
                    <div className="shrink-0 w-7 h-7 rounded-full bg-blue-600/80 border border-blue-400/40 flex items-center justify-center text-white text-xs mb-1">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-[#152347] border border-blue-500/20 px-4 py-3 rounded-2xl rounded-bl-xs flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      <span className="text-[11px] text-slate-400 ml-1.5">Chris está digitando...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chips de Perguntas Rápidas (Carrossel Horizontal) */}
              <div className="bg-[#0B132B] border-t border-white/5 py-2 px-3 overflow-x-auto no-scrollbar flex items-center gap-2">
                {SUGGESTED_QUESTIONS.map((question, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(question)}
                    className="shrink-0 text-[11px] font-medium bg-[#14224A] hover:bg-[#1C2F66] text-slate-200 hover:text-white px-3 py-1.5 rounded-full border border-blue-500/20 hover:border-blue-400/50 transition-all text-left whitespace-nowrap active:scale-95"
                  >
                    {question}
                  </button>
                ))}
              </div>

              {/* Campo de Envio de Mensagem */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="bg-[#0D1838] border-t border-white/10 p-2.5 sm:p-3 flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Pergunte sobre economia, prazos, usinas..."
                  className="flex-1 bg-[#070D1F] border border-slate-700/80 focus:border-blue-400 text-white placeholder-slate-400 text-xs sm:text-[13px] rounded-xl px-3.5 py-2.5 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  aria-label="Enviar mensagem para o Chris"
                  className="shrink-0 p-2.5 rounded-xl bg-[#E51E25] hover:bg-[#CC1920] disabled:bg-slate-700 disabled:opacity-40 text-white transition-all active:scale-95 focus:outline-none"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Balão Teaser de Apresentação (Apenas quando fechado) */}
      {!isOpen && showTeaser && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="absolute bottom-full mb-3 right-0 w-64 sm:w-72 bg-[#0B132B] border border-blue-500/30 text-white p-3 rounded-2xl shadow-xl z-50 flex items-start gap-2.5"
        >
          <div className="shrink-0 w-8 h-8 rounded-full overflow-hidden border border-amber-400/60 bg-blue-900">
            <img
              src="/Imagens/chatbot-avatar.png"
              alt="Chris"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-100 leading-tight">
              Olá! Sou o Chris ☀️
            </p>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
              Quer saber quanto sua casa ou empresa pode economizar na Coelba?
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="mt-1.5 text-[11px] font-bold text-amber-300 hover:text-amber-200 underline"
            >
              Falar com o Chris agora →
            </button>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowTeaser(false);
            }}
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Fechar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}

      {/* 3. Botão Flutuante Disparador (Acima do botão do WhatsApp) */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Fechar Chris' : 'Conversar com Chris (IA Perutche Solar)'}
          className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm text-white shadow-xl transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 ${
            isOpen
              ? 'bg-[#0B132B] border border-blue-400/40 hover:bg-[#101B3D] focus:ring-blue-500/30'
              : 'bg-gradient-to-r from-[#0B132B] via-[#101D42] to-[#0B132B] border border-blue-400/50 hover:border-amber-400/70 hover:shadow-blue-500/20 focus:ring-blue-500/30'
          }`}
        >
          {isOpen ? (
            <>
              <div className="w-6 h-6 rounded-full bg-blue-900/80 flex items-center justify-center text-slate-200">
                <X className="w-4 h-4" />
              </div>
              <span className="tracking-wide">Fechar Chris</span>
            </>
          ) : (
            <>
              {/* Mini avatar com indicador online */}
              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-amber-400/60 bg-[#090D1C] shrink-0">
                <img
                  src="/Imagens/chatbot-avatar.png"
                  alt="Chris IA"
                  className="w-full h-full object-cover object-top scale-110"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-[#0B132B]" />
              </div>

              <span className="tracking-tight">
                Pergunte ao <strong className="font-extrabold text-amber-300">Chris</strong>
              </span>

              <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-blue-600 text-blue-100 tracking-wider uppercase">
                IA
              </span>
            </>
          )}

          {/* Pulse suave quando fechado */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border-2 border-[#0B132B]" />
            </span>
          )}
        </button>
      </div>

    </div>
  );
};

export default ChatbotChrisFloat;
