import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Zap,
  PhoneCall,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';
import { GUANAMBI_SOLAR_CONFIG } from '../../lib/solar/tariffs';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  options?: string[];
  cta?: {
    label: string;
    action: 'simular' | 'whatsapp';
  };
}

export interface ChatbotChrisProps {
  onNavigate?: (path: string) => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: 'Olá! 👋 Eu sou o **Chris**, assistente de Inteligência Artificial da **Perutche Solar**! ☀️\n\nFui treinado com as normas da Neoenergia Coelba, a radiação de Guanambi e o histórico de 72 usinas industriais na Bahia.\n\nComo posso te ajudar a zerar sua conta de luz hoje?',
    time: 'Agora',
    options: [
      'Quanto custa para minha casa?',
      'Funciona em dias de chuva ou à noite?',
      'Como funciona o parcelamento em 84x?',
      'Por que a Perutche atende 72 cerâmicas?',
    ],
  },
];

const MOCK_KNOWLEDGE_BASE: Record<string, { answer: string; cta?: { label: string; action: 'simular' | 'whatsapp' } }> = {
  'quanto custa para minha casa?': {
    answer:
      'O investimento depende da sua média mensal em reais na Coelba. Nossos kits residenciais começam a partir de parcelas que costumam ficar **menores que o valor que você já paga na conta de luz**! 📉\n\nCom o nosso simulador, você descobre a potência ideal e o retorno financeiro em menos de 2 minutos!',
    cta: { label: 'Abrir Simulador Solar', action: 'simular' },
  },
  'funciona em dias de chuva ou à noite?': {
    answer:
      'Com certeza! 🌧️ Mesmo em dias nublados ou com chuva, as placas captam a **radiação difusa** e continuam gerando energia.\n\nE à noite, você utiliza a energia normal da rede da Coelba, mas abatendo os **créditos solares** que seu telhado acumulou durante o dia ensolarado de Guanambi!',
  },
  'como funciona o parcelamento em 84x?': {
    answer:
      'Trabalhamos com linhas de crédito solar parceiras (como BV, Santander, Banco do Brasil e Sicredi) que financiam **até 100% do projeto em até 84 vezes, sem entrada** e com carência de até 120 dias para começar a pagar!\n\nNa prática, você troca o boleto da Coelba pela parcela da usina — e depois de quitada, a energia é 100% grátis por mais de 25 anos.',
    cta: { label: 'Falar com Especialista no WhatsApp', action: 'whatsapp' },
  },
  'por que a perutche atende 72 cerâmicas?': {
    answer:
      'Porque a indústria de cerâmica pesada no Sudoeste Baiano é o ambiente mais severo que existe: poeira constante de argila, fornos de altíssima temperatura e motores pesados de 20cv ligados sem parar. 🏭\n\nSe a engenharia da Perutche Solar aguenta esse teste extremo com folga, no telhado da sua residência ela é executada com precisão cirúrgica e zero infiltrações!',
  },
};

export const ChatbotChris: React.FC<ChatbotChrisProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const whatsappUrl =
    'https://wa.me/' +
    GUANAMBI_SOLAR_CONFIG.contact.whatsapp +
    '?text=' +
    encodeURIComponent('Olá! Estive conversando com o Chris no site da Perutche Solar e gostaria de atendimento humano para um orçamento.');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let matched = Object.entries(MOCK_KNOWLEDGE_BASE).find(([k]) => lower.includes(k));

      let botReply = '';
      let cta = matched?.[1].cta;

      if (matched) {
        botReply = matched[1].answer;
      } else if (lower.includes('olá') || lower.includes('oi') || lower.includes('bom dia') || lower.includes('boa tarde')) {
        botReply = 'Olá! Que prazer falar com você! ☀️ Em que posso te ajudar hoje sobre energia solar, economia ou kits residenciais?';
      } else if (lower.includes('preço') || lower.includes('valor') || lower.includes('custa')) {
        botReply = 'O valor varia de acordo com o consumo da sua residência ou empresa. Mas você pode simular agora mesmo em nossa calculadora e ver a estimativa exata!';
        cta = { label: 'Ir para a Calculadora', action: 'simular' };
      } else {
        botReply =
          'Excelente pergunta! Como seu caso pode envolver particularidades do seu padrão elétrico ou do seu telhado em Guanambi, que tal falar diretamente com um dos nossos engenheiros no WhatsApp? Eles podem analisar sua conta de energia agora mesmo!';
        cta = { label: 'Chamar no WhatsApp', action: 'whatsapp' };
      }

      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cta,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 850);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <section
      id="chris-ai"
      className="py-20 md:py-28 bg-[#07090E] text-white relative overflow-hidden border-t border-slate-800"
    >
      {/* Luzes de fundo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#E51E25]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Headline da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-20 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Inteligência Artificial 24 Horas</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Tire todas as suas dúvidas com o{' '}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]">
              Chris
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Nosso especialista virtual responde instantaneamente sobre preços, créditos na Coelba, tecnologia industrial e financiamento.
          </p>
        </div>

        {/* Card Principal da Caixa de Atendimento com o Avatar 3D subindo no Topo */}
        <div className="relative max-w-3xl mx-auto pt-16 sm:pt-20">
          
          {/* AVATAR 3D DO CHRIS SUBINDO EM POP-UP DA CAIXA DE ATENDIMENTO */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute -top-16 sm:-top-24 md:-top-28 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center"
          >
            {/* Halo de luz dourada pulsante atrás do Chris */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-60 h-48 sm:h-60 bg-gradient-to-t from-amber-500/30 to-amber-300/20 blur-3xl rounded-full" />

            {/* Imagem do Chris em animação flutuante sutil */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-36 sm:w-44 md:w-52 drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] filter"
            >
              <img
                src="/Imagens/chatbot-avatar.png"
                alt="Chris - Assistente IA Perutche Solar"
                className="w-full h-auto object-contain select-none pointer-events-auto"
                loading="eager"
              />
            </motion.div>

            {/* Badge de status Online conectado ao avatar */}
            <div className="-mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111622]/95 border border-emerald-500/50 text-[11px] font-bold text-emerald-400 shadow-lg backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Chris Online</span>
            </div>
          </motion.div>

          {/* O Card do Chat (Caixa de Atendimento) */}
          <div className="relative rounded-3xl bg-[#0D111A] border-2 border-amber-400/40 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden z-20 flex flex-col h-[580px] sm:h-[620px]">
            
            {/* Header do Chat */}
            <div className="p-4 sm:p-5 bg-[#111827]/90 border-b border-slate-800 flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 p-0.5 shadow-md flex items-center justify-center">
                  <div className="w-full h-full bg-[#0D111A] rounded-[14px] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-white">Chris</h3>
                    <span className="px-1.5 py-0.5 text-[9px] font-black uppercase bg-[#E51E25] text-white rounded tracking-wide">
                      IA Perutche
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Especialista em Energia Solar • Guanambi & Região
                  </p>
                </div>
              </div>

              <button
                onClick={handleResetChat}
                title="Reiniciar conversa"
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/60 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Feed de Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-sans scroll-smooth">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={'flex gap-3 ' + (msg.sender === 'user' ? 'justify-end' : 'justify-start')}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-amber-400" />
                    </div>
                  )}

                  <div className={'max-w-[85%] sm:max-w-[78%] flex flex-col ' + (msg.sender === 'user' ? 'items-end' : 'items-start')}>
                    <div
                      className={
                        'p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ' +
                        (msg.sender === 'user'
                          ? 'bg-[#E51E25] text-white rounded-tr-xs shadow-md shadow-red-950/40 font-medium'
                          : 'bg-[#151C2C] text-slate-200 border border-slate-800 rounded-tl-xs shadow-sm')
                      }
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>

                      {/* Botão de ação anexado à resposta se houver */}
                      {msg.cta && (
                        <div className="mt-3 pt-2.5 border-t border-slate-700/60">
                          {msg.cta.action === 'simular' ? (
                            <button
                              onClick={() => onNavigate?.('#calculadora')}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors shadow"
                            >
                              <Zap className="w-3.5 h-3.5" />
                              <span>{msg.cta.label}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs transition-colors shadow"
                            >
                              <PhoneCall className="w-3.5 h-3.5" />
                              <span>{msg.cta.label}</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.time}</span>

                    {/* Chips de sugestões iniciais */}
                    {msg.options && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(opt)}
                            className="px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-amber-400 hover:text-slate-950 border border-slate-700/80 text-xs text-slate-300 transition-all font-medium text-left"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-[#E51E25]/20 border border-[#E51E25]/40 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4 text-[#E51E25]" />
                    </div>
                  )}
                </div>
              ))}

              {/* Indicador de Digitação */}
              {isTyping && (
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="p-3 rounded-2xl bg-[#151C2C] border border-slate-800 flex items-center gap-1.5">
                    <span className="text-xs text-slate-400 mr-1">Chris pensando</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Barra de Entrada de Texto */}
            <div className="p-3 sm:p-4 bg-[#111827] border-t border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Pergunte qualquer coisa ao Chris..."
                  className="flex-1 bg-[#090D15] border border-slate-700/90 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
                >
                  <span className="hidden sm:inline">Enviar</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="mt-2 text-center">
                <span className="text-[10px] text-slate-500">
                  ⚡ IA treinada para o clima de Guanambi • Respostas imediatas
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ChatbotChris;
