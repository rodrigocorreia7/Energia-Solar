'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';

export interface HeroScrolltellingProps {
  onNavigate?: (path: string) => void;
}

const VIDEO_SCROLL_END_PROGRESS = 0.90;

export const HeroScrolltelling: React.FC<HeroScrolltellingProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentStage, setCurrentStage] = useState<number>(0);
  const currentStageRef = useRef<number>(0);
  const durationRef = useRef<number>(13.35);
  const isSeekingRef = useRef<boolean>(false);
  const targetTimeRef = useRef<number>(0);
  const seekRafRef = useRef<number | null>(null);
  const seekTimeoutRef = useRef<number | null>(null);

  // O progresso bruto recebe a rolagem; o valor com mola guia texto e vídeo juntos.
  const rawProgressValue = useMotionValue(0);

  // Progresso amortecido com mola física para máxima suavidade (elimina qualquer travamento de scroll)
  const smoothProgressValue = useSpring(rawProgressValue, {
    damping: 26,
    stiffness: 85,
    mass: 0.35,
    restDelta: 0.0005,
  });

  // Os pontos acompanham as mudanças de luz do arquivo de vídeo: dia, tarde e noite.
  const stage0Opacity = useTransform(smoothProgressValue, [0, 0.23, 0.33], [1, 1, 0]);
  const stage0Y = useTransform(smoothProgressValue, [0, 0.23, 0.33], [0, 0, -22]);
  const stage0Scale = useTransform(smoothProgressValue, [0, 0.23, 0.33], [1, 1, 0.97]);
  const stage0Blur = useTransform(smoothProgressValue, [0, 0.23, 0.33], ['blur(0px)', 'blur(0px)', 'blur(3px)']);

  // Estágio 1: "SEU TELHADO VIRA USINA"
  const stage1Opacity = useTransform(smoothProgressValue, [0.23, 0.31, 0.48, 0.58], [0, 1, 1, 0]);
  const stage1Y = useTransform(smoothProgressValue, [0.23, 0.31, 0.48, 0.58], [22, 0, 0, -22]);
  const stage1Scale = useTransform(smoothProgressValue, [0.23, 0.31, 0.48, 0.58], [0.97, 1, 1, 0.97]);
  const stage1Blur = useTransform(smoothProgressValue, [0.23, 0.31, 0.48, 0.58], ['blur(3px)', 'blur(0px)', 'blur(0px)', 'blur(3px)']);

  // Estágio 2: "DE NOITE VOCÊ USUFRUI"
  const stage2Opacity = useTransform(smoothProgressValue, [0.50, 0.58, 1], [0, 1, 1]);
  const stage2Y = useTransform(smoothProgressValue, [0.50, 0.58, 1], [22, 0, 0]);
  const stage2Scale = useTransform(smoothProgressValue, [0.50, 0.58, 1], [0.97, 1, 1]);
  const stage2Blur = useTransform(smoothProgressValue, [0.50, 0.58, 1], ['blur(3px)', 'blur(0px)', 'blur(0px)']);

  const stageMotionStyles = [
    { opacity: stage0Opacity, y: stage0Y, scale: stage0Scale, filter: stage0Blur },
    { opacity: stage1Opacity, y: stage1Y, scale: stage1Scale, filter: stage1Blur },
    { opacity: stage2Opacity, y: stage2Y, scale: stage2Scale, filter: stage2Blur },
  ];

  // Agendador de busca no vídeo desacoplado e não-bloqueante
  const scheduleSeek = useCallback(() => {
    if (seekRafRef.current !== null) return;

    seekRafRef.current = requestAnimationFrame(() => {
      seekRafRef.current = null;
      const v = videoRef.current;
      if (!v || v.readyState < 1) return;

      if (isSeekingRef.current || v.seeking) return;

      const duration = durationRef.current || 13.35;
      const target = Math.max(0, Math.min(duration, targetTimeRef.current));
      const diff = Math.abs(v.currentTime - target);

      // Com keyframes densos a cada 3 frames, busca de forma instantânea
      if (diff >= 0.03) {
        try {
          isSeekingRef.current = true;

          if (seekTimeoutRef.current) clearTimeout(seekTimeoutRef.current);
          seekTimeoutRef.current = window.setTimeout(() => {
            isSeekingRef.current = false;
            const curV = videoRef.current;
            if (curV && Math.abs(curV.currentTime - targetTimeRef.current) >= 0.04) {
              scheduleSeek();
            }
          }, 75);

          if ('fastSeek' in v && typeof (v as any).fastSeek === 'function') {
            (v as any).fastSeek(target);
          } else {
            v.currentTime = target;
          }
        } catch {
          isSeekingRef.current = false;
        }
      }
    });
  }, []);

  useMotionValueEvent(smoothProgressValue, 'change', (videoProgress) => {
    const duration = durationRef.current || 13.35;
    targetTimeRef.current = videoProgress * duration;
    scheduleSeek();

    let stage = 0;
    if (videoProgress >= 0.54) {
      stage = 2;
    } else if (videoProgress >= 0.30) {
      stage = 1;
    }

    if (stage !== currentStageRef.current) {
      currentStageRef.current = stage;
      setCurrentStage(stage);
    }
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => {
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        durationRef.current = video.duration;
      }
      scheduleSeek();
    };

    const primePlayback = () => {
      video.muted = true;
      const playback = video.play();
      if (playback) {
        playback
          .then(() => {
            video.pause();
            scheduleSeek();
          })
          .catch(() => {
            // Alguns navegadores bloqueiam play programático; o scrub continua funcionando.
          });
      }
    };

    const onCanPlay = () => {
      onMeta();
      primePlayback();
    };

    const onSeeked = () => {
      isSeekingRef.current = false;
      if (seekTimeoutRef.current) {
        clearTimeout(seekTimeoutRef.current);
        seekTimeoutRef.current = null;
      }
      const v = videoRef.current;
      if (!v) return;

      // Se durante o seek anterior o usuário rolou para outro ponto, agenda o próximo frame suavemente
      if (Math.abs(v.currentTime - targetTimeRef.current) >= 0.05) {
        scheduleSeek();
      }
    };

    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('seeked', onSeeked);

    if (video.readyState >= 1 && video.duration) {
      durationRef.current = video.duration;
    }

    if (video.readyState >= 3) {
      primePlayback();
    }

    try {
      video.currentTime = 0.01;
    } catch {
      // ignore
    }

    // Monitoramento de scroll leve e ultra-otimizado (Zero Forced Reflows no scroll)
    let isTicking = false;
    let cachedTop = 0;
    let cachedScrollDistance = 1;

    const measureContainer = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      cachedTop = window.scrollY + rect.top;
      cachedScrollDistance = Math.max(1, rect.height - window.innerHeight);
    };

    measureContainer();

    const handleScroll = () => {
      if (isTicking) return;
      isTicking = true;

      requestAnimationFrame(() => {
        isTicking = false;
        const currentScroll = window.scrollY - cachedTop;
        const progress = Math.max(0, Math.min(1, currentScroll / cachedScrollDistance));
        const videoProgress = Math.min(1, progress / VIDEO_SCROLL_END_PROGRESS);
        rawProgressValue.set(videoProgress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', measureContainer, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', measureContainer);
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('seeked', onSeeked);
      if (seekRafRef.current !== null) {
        cancelAnimationFrame(seekRafRef.current);
      }
      if (seekTimeoutRef.current) {
        clearTimeout(seekTimeoutRef.current);
      }
    };
  }, [scheduleSeek]);

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

  // 3 Etapas Oficiais Solicitadas
  const stages = [
    {
      id: 'dia',
      headline: 'DE DIA O SOL TRABALHA PARA VOCÊ.',
      subcopy: 'Todos os dias. Sem falhar. Grátis.',
      shortLabel: '01. DE DIA',
      targetProgress: 0.08,
    },
    {
      id: 'tarde',
      headline: 'SEU TELHADO VIRA USINA',
      subcopy: 'Cada raio vira crédito em sua conta Coelba.',
      shortLabel: '02. TARDE',
      targetProgress: 0.34,
    },
    {
      id: 'noite',
      headline: 'DE NOITE VOCÊ USUFRUI',
      subcopy: 'Ar Ligado, Casa acesa. Família Tranquila.',
      shortLabel: '03. DE NOITE',
      showCta: true,
      targetProgress: 0.64,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360vh] bg-[#0A0D14]"
      id="hero"
    >
      {/* Container Sticky (Prende na tela durante o scroll) */}
      <div className="sticky top-0 h-[100dvh] min-h-[100dvh] w-full overflow-hidden flex flex-col justify-between items-center select-none">
        
        {/* Camada 1: Vídeo de Fundo com Scroll Scrubbing (object-contain no celular para mostrar a casa toda, caminhonete e sala igual no PC) */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#0A0D14] flex items-center justify-center">
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            poster="/Videos/hero-poster.jpg"
            className="w-full h-full object-contain md:object-cover"
            aria-hidden="true"
          >
            <source src="/Videos/videofinal21_web.mp4" type="video/mp4" />
            <source src="/Videos/videofinal21.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Camada 2: Conteúdo Superior (Headline e Sub-copy centralizados com espaço seguro do Header fixo) */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-28 md:pt-32 text-center flex flex-col items-center">

          <div className="relative w-full max-w-4xl min-h-[130px] sm:min-h-[200px] md:min-h-[380px]">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.id}
                style={stageMotionStyles[index]}
                aria-hidden={currentStage !== index}
                className={`absolute inset-x-0 top-0 flex flex-col items-center ${currentStage === index ? 'pointer-events-auto' : 'pointer-events-none'}`}
              >
                {/* Headline Principal */}
                <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tight uppercase leading-[1.15] text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                  {stage.headline}
                </h1>

                {/* Sub-copy de Apoio */}
                <p className="mt-2 sm:mt-4 text-xs sm:text-base md:text-2xl text-slate-100 font-medium max-w-2xl text-pretty leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  {stage.subcopy}
                </p>

                {/* CTA Vermelho Pulsante (Aparece no estágio final da noite lado a lado igual ao PC) */}
                {stage.showCta && (
                  <motion.div
                    className="mt-3 sm:mt-8 flex flex-row items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto"
                  >
                    <Button
                      id="hero-scroll-btn-simular"
                      size="sm"
                      variant="primary"
                      onClick={handleSimularClick}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      aria-label="Simular Minha Economia na Calculadora Solar"
                      className="text-xs sm:text-lg font-black px-4 sm:px-8 py-2.5 sm:py-4.5 rounded-xl sm:rounded-2xl bg-[#E51E25] hover:bg-[#c9181e] text-white shadow-[0_0_35px_rgba(229,30,37,0.65)] hover:shadow-[0_0_50px_rgba(229,30,37,0.85)] animate-pulse hover:animate-none transition-all cursor-pointer whitespace-nowrap"
                    >
                      Simular Economia
                    </Button>

                    <a
                      href="https://wa.me/5577991778723?text=Olá,%20Perutche%20Solar!%20Vi%20o%20site%20e%20gostaria%20de%20um%20orçamento%20para%20minha%20casa."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 sm:px-6 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 font-bold text-xs sm:text-base transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      <span>Falar no WhatsApp</span>
                    </a>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

        </div>

        {/* Camada 3: Rodapé Sticky (Barra de progresso dos 3 estágios e indicador de rolagem) */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-3 sm:px-6 pb-4 sm:pb-8 flex flex-col items-center gap-2 sm:gap-4">
          
          {/* Indicadores dos 3 Estágios */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 bg-black/60 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/15 overflow-x-auto max-w-full">
            {stages.map((stg, index) => {
              const isActive = currentStage === index;
              return (
                <button
                  type="button"
                  key={stg.id}
                  onClick={() => handleStageClick(stg.targetProgress ?? (index * 0.4))}
                  className={`flex items-center gap-1 sm:gap-1.5 transition-all duration-300 shrink-0 cursor-pointer hover:opacity-100 ${
                    isActive ? 'text-white' : 'text-white/40'
                  }`}
                >
                  <div
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                      isActive ? 'bg-[#E51E25] scale-125 shadow-[0_0_8px_#E51E25]' : 'bg-white/30'
                    }`}
                  />
                  <span className="text-[10px] sm:text-xs font-bold tracking-wider whitespace-nowrap">
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
          {currentStage < 2 ? (
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-300/80 font-medium tracking-wide animate-bounce">
              <span>Role para continuar a história</span>
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300" />
            </div>
          ) : (
            <div className="text-[11px] sm:text-xs text-amber-300 font-semibold tracking-wider uppercase">
              ↓ Role abaixo para calcular sua conta e ver os kits
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default HeroScrolltelling;
