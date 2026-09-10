'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Sun, Moon, Zap, ChevronDown, Award } from 'lucide-react';
import { Button } from '../ui/Button';

export interface HeroScrolltellingProps {
  onNavigate?: (path: string) => void;
}

export const HeroScrolltelling: React.FC<HeroScrolltellingProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentStage, setCurrentStage] = useState<number>(0);
  const durationRef = useRef<number>(7.66);
  const pendingTimeRef = useRef<number | null>(null);
  const lastSeekTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const performSeek = (time: number) => {
    const video = videoRef.current;
    if (!video) return;

    const duration = durationRef.current || 7.66;
    const target = Math.max(0, Math.min(duration, time));
    pendingTimeRef.current = target;

    if (rafIdRef.current !== null) return;

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      const v = videoRef.current;
      if (!v) return;
      const next = pendingTimeRef.current;
      if (next === null) return;

      const now = performance.now();
      // Não bloqueia se o navegador demorar mais de 80ms no seek
      if (v.readyState >= 1 && (!v.seeking || now - lastSeekTimeRef.current > 80)) {
        if (Math.abs(v.currentTime - next) >= 0.02) {
          try {
            lastSeekTimeRef.current = now;
            v.currentTime = next;
          } catch {
            // ignore
          }
        }
      }
    });
  };

  const updateProgress = (progress: number) => {
    const p = Math.max(0, Math.min(1, progress));

    // 6 Estágios:
    let stage = 0;
    if (p < 0.14) {
      stage = 0;
    } else if (p < 0.28) {
      stage = 1;
    } else if (p < 0.44) {
      stage = 2;
    } else if (p < 0.58) {
      stage = 3;
    } else if (p < 0.72) {
      stage = 4;
    } else {
      stage = 5;
    }
    setCurrentStage(stage);

    // O vídeo avança de 0s a 7.66s entre 0% e 75% do scroll.
    // Dos 75% aos 100%, fica estático na noite total com lua cheia.
    const duration = durationRef.current || 7.66;
    const videoProgress = Math.min(1, p / 0.75);
    const targetTime = videoProgress * duration;
    performSeek(targetTime);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => {
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        durationRef.current = video.duration;
      }
      updateProgress(scrollYProgress.get());
    };

    const onSeeked = () => {
      const v = videoRef.current;
      if (!v) return;
      if (pendingTimeRef.current !== null && Math.abs(v.currentTime - pendingTimeRef.current) > 0.03) {
        try {
          lastSeekTimeRef.current = performance.now();
          v.currentTime = pendingTimeRef.current;
        } catch {
          // ignore
        }
      }
    };

    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('canplay', onMeta);
    video.addEventListener('seeked', onSeeked);

    if (video.readyState >= 1 && video.duration) {
      durationRef.current = video.duration;
    }

    // Inicializa o primeiro frame
    video.currentTime = 0.01;

    // 1. Escuta Framer Motion useScroll
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      updateProgress(progress);
    });

    // 2. Escuta scroll nativo da janela como fallback imediato
    const handleNativeScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      if (totalScroll <= 0) return;
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScroll));
      updateProgress(progress);
    };

    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    handleNativeScroll();

    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleNativeScroll);
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('canplay', onMeta);
      video.removeEventListener('seeked', onSeeked);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [scrollYProgress]);

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

  const handleStageClick = (targetProgress: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const totalScroll = rect.height - window.innerHeight;
    const targetScrollY = containerTop + targetProgress * totalScroll;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  // 6 Etapas com a Copy Oficial e Ganchos Horários de Guanambi
  const stages = [
    {
      id: 'manha',
      badge: '6H DA MANHÃ EM GUANAMBI',
      badgeClass: 'bg-[#F59E0B]/20 border-[#F59E0B]/50 text-[#F59E0B] shadow-amber-500/20',
      dotClass: 'bg-[#F59E0B]',
      headline: 'O sol nasce forte.',
      subcopy: 'Todos os dias. Sem falhar. Grátis.',
      shortLabel: '01. 6H MANHÃ',
      targetProgress: 0.05,
    },
    {
      id: 'dia',
      badge: '☀️ 12H • O SOL TRABALHA POR VOCÊ',
      badgeClass: 'bg-white/15 border-white/25 text-white shadow-black/30',
      dotClass: 'bg-amber-400',
      headline: 'De dia, ele trabalha por você.',
      subcopy: 'Cada raio vira crédito na sua conta Coelba.',
      shortLabel: '02. DIA',
      targetProgress: 0.20,
    },
    {
      id: 'usina',
      badge: '⚡ 17H • PÔR-DO-SOL E GERAÇÃO',
      badgeClass: 'bg-orange-500/20 border-orange-400/40 text-orange-200 shadow-orange-500/20',
      dotClass: 'bg-orange-400',
      headline: 'Seu telhado virou usina.',
      subcopy: 'Enquanto você trabalha, sua casa gera.',
      shortLabel: '03. USINA',
      targetProgress: 0.36,
    },
    {
      id: 'economia',
      badge: '💡 19H • LUZES ACENDENDO',
      badgeClass: 'bg-indigo-500/20 border-indigo-400/40 text-indigo-200 shadow-indigo-500/20',
      dotClass: 'bg-indigo-400',
      headline: 'O sol se vai. Sua economia fica.',
      subcopy: 'Créditos acumulados para usar quando quiser.',
      shortLabel: '04. ECONOMIA',
      targetProgress: 0.50,
    },
    {
      id: 'noite',
      badge: '🌙 21H • CONFORTO TOTAL DA FAMÍLIA',
      badgeClass: 'bg-sky-500/20 border-sky-400/40 text-sky-200 shadow-sky-500/20',
      dotClass: 'bg-sky-400',
      headline: 'De noite, você usufrui.',
      subcopy: 'Ar ligado. Casa acesa. Família tranquila.',
      shortLabel: '05. NOITE',
      targetProgress: 0.65,
    },
    {
      id: 'travada',
      badge: '🔒 TARIFA MÍNIMA • ENGENHARIA PERUTCHE',
      badgeClass: 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300 shadow-emerald-500/20',
      dotClass: 'bg-emerald-400',
      headline: 'Conta travada em R$ 78,40',
      subcopy: 'O resto é lucro. Por 25 anos.',
      shortLabel: '06. R$ 78,40',
      showCta: true,
      targetProgress: 0.85,
    },
  ];

  const activeStageData = stages[currentStage];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[580vh] bg-[#0A0D14]"
      id="hero"
    >
      {/* Container Sticky (Prende na tela durante o scroll) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center select-none">
        
        {/* Camada 1: Vídeo de Fundo com Scroll Scrubbing */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
          <video
            ref={videoRef}
            src="/Videos/video-hero-final.mp4"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            aria-hidden="true"
          />

          {/* Gradients para contraste perfeito da tipografia (Topo e Base) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black/80 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_30%,_rgba(0,0,0,0.5)_100%] pointer-events-none" />
        </div>

        {/* Camada 2: Conteúdo Superior (Headline e Sub-copy centralizados conforme exemplo-hero1 e exemplo-hero2) */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 text-center flex flex-col items-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStageData.id}
              initial={{ opacity: 0, y: 22, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -18, filter: 'blur(4px)' }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="flex flex-col items-center max-w-4xl"
            >
              {/* Badge de Contexto */}
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md border text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-4 sm:mb-5 shadow-lg ${activeStageData.badgeClass}`}>
                <span className={`w-2 h-2 rounded-full animate-pulse ${activeStageData.dotClass}`} />
                <span>{activeStageData.badge}</span>
              </div>

              {/* Headline Principal */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-[1.08] text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                {activeStageData.id === 'travada' ? (
                  <>
                    Conta travada em{' '}
                    <span className="text-emerald-400 drop-shadow-[0_0_25px_rgba(52,211,153,0.8)]">
                      R$ 78,40
                    </span>
                  </>
                ) : (
                  activeStageData.headline
                )}
              </h1>

              {/* Sub-copy de Apoio */}
              <p className="mt-4 sm:mt-5 text-base sm:text-xl md:text-2xl text-slate-100 font-medium max-w-2xl text-pretty leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                {activeStageData.subcopy}
              </p>

              {/* CTA Vermelho Pulsante (Aparece no estágio final 88% - 100%) */}
              {activeStageData.showCta && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
                >
                  <Button
                    id="hero-scroll-btn-simular"
                    size="lg"
                    variant="primary"
                    onClick={handleSimularClick}
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                    aria-label="Simular Minha Economia na Calculadora Solar"
                    className="w-full sm:w-auto text-base sm:text-lg font-black px-8 py-4.5 rounded-2xl bg-[#E51E25] hover:bg-[#c9181e] text-white shadow-[0_0_35px_rgba(229,30,37,0.65)] hover:shadow-[0_0_50px_rgba(229,30,37,0.85)] animate-pulse hover:animate-none transition-all cursor-pointer"
                  >
                    Simular Minha Economia
                  </Button>

                  <a
                    href="https://wa.me/5577991778723?text=Olá,%20Perutche%20Solar!%20Vi%20o%20site%20e%20gostaria%20de%20um%20orçamento%20para%20minha%20casa."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2"
                  >
                    <span>Falar no WhatsApp</span>
                  </a>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Camada 3: Rodapé Sticky (Barra de progresso dos 6 estágios e indicador de rolagem) */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-6 sm:pb-8 flex flex-col items-center gap-4">
          
          {/* Indicadores dos 6 Estágios */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 bg-black/60 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/15 overflow-x-auto max-w-full">
            {stages.map((stg, index) => {
              const isActive = currentStage === index;
              return (
                <button
                  type="button"
                  key={stg.id}
                  onClick={() => handleStageClick(stg.targetProgress ?? (index * 0.16))}
                  className={`flex items-center gap-1 sm:gap-1.5 transition-all duration-300 shrink-0 cursor-pointer hover:opacity-100 ${
                    isActive ? 'text-white' : 'text-white/40'
                  }`}
                >
                  <div
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                      isActive ? 'bg-[#E51E25] scale-125 shadow-[0_0_8px_#E51E25]' : 'bg-white/30'
                    }`}
                  />
                  <span className="hidden md:inline text-[10px] lg:text-[11px] font-bold tracking-wider">
                    {stg.shortLabel}
                  </span>
                  {index < stages.length - 1 && (
                    <span className="text-white/20 text-xs px-0.5 sm:px-1">›</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Indicador de Rolagem */}
          {currentStage < 5 ? (
            <div className="flex items-center gap-1.5 text-xs text-slate-300/80 font-medium tracking-wide animate-bounce">
              <span>Role para continuar a história</span>
              <ChevronDown className="w-4 h-4 text-slate-300" />
            </div>
          ) : (
            <div className="text-xs text-amber-300 font-semibold tracking-wider uppercase">
              ↓ Role abaixo para ver as soluções completas e calcular sua conta
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default HeroScrolltelling;
