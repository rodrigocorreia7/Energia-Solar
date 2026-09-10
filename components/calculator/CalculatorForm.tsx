'use client';

import React, { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Loader2,
  AlertCircle,
  Info,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Table,
  Users,
  Snowflake,
  Waves,
  ShowerHead,
  Refrigerator,
  Lightbulb,
} from 'lucide-react';

const renderEquipIcon = (id: string, className = 'w-4 h-4') => {
  switch (id) {
    case 'ar':
      return <Snowflake className={`${className} text-cyan-600 shrink-0`} />;
    case 'chuveiro':
      return <ShowerHead className={`${className} text-red-600 shrink-0`} />;
    case 'geladeira':
      return <Refrigerator className={`${className} text-amber-600 shrink-0`} />;
    case 'piscina':
      return <Waves className={`${className} text-blue-600 shrink-0`} />;
    case 'outros':
      return <Lightbulb className={`${className} text-purple-600 shrink-0`} />;
    default:
      return <Zap className={`${className} text-amber-500 shrink-0`} />;
  }
};
import {
  TARIFA_COELBA,
  TAXA_MINIMA,
  IRRADIACAO_GUANAMBI,
  GUANAMBI_SOLAR_CONFIG,
  SolarAssumptions,
  DEFAULT_SOLAR_ASSUMPTIONS,
  TABELA_RESIDENCIAL_EQUIPAMENTOS,
  EquipamentoResidencialInfo,
} from '../../lib/solar/tariffs';
import {
  calcularConsumoKwh,
  calcularKwpNecessario,
  calcularEconomia,
  calcularPorEquipamentos,
  calcularConsumoEDimensionamento,
} from '../../lib/solar/calculators';
import { Button } from '../ui/Button';

// Esquema de validação com Zod
const calculatorSchema = z.object({
  valorConta: z.number().min(150, 'Valor mínimo é R$ 150').max(10000, 'Valor máximo é R$ 10.000'),
  pessoas: z.number().min(2, 'Mínimo de 2 pessoas').max(10),
  arCondicionado: z.number().min(0).max(10),
  piscina: z.boolean(),
  chuveiro: z.number().min(0).max(10),
  geladeiraExtra: z.boolean(),
  outros: z.boolean(),
});

export type CalculatorFormData = z.infer<typeof calculatorSchema>;

export interface CalculatorFormProps {
  onFinish?: (data: CalculatorFormData) => void;
  onValuesChange?: (data: CalculatorFormData) => void;
  customAssumptions?: Partial<SolarAssumptions>;
}

// Variantes de transição tipo Typeform
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 40 : -40,
    opacity: 0,
  }),
};

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  onFinish,
  onValuesChange,
  customAssumptions,
}) => {
  // Tela atual (1: Valor da conta, 2: Pessoas, 3: Equipamentos, 4: Resultado)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [showTechnicalTable, setShowTechnicalTable] = useState<boolean>(false);

  // Premissas técnicas parametrizáveis (não hardcoded como verdade absoluta)
  const assumptions: SolarAssumptions = useMemo(() => ({
    ...DEFAULT_SOLAR_ASSUMPTIONS,
    ...customAssumptions,
  }), [customAssumptions]);

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      valorConta: 450,
      pessoas: 3,
      arCondicionado: 1,
      piscina: false,
      chuveiro: 1,
      geladeiraExtra: false,
      outros: true,
    },
  });

  const formValues = watch();

  React.useEffect(() => {
    if (onValuesChange) {
      onValuesChange(formValues);
    }
  }, [formValues.valorConta, formValues.pessoas, formValues.arCondicionado, formValues.chuveiro, formValues.piscina, formValues.geladeiraExtra, formValues.outros, onValuesChange]);

  // Cálculo em tempo real:
  // - Na Etapa 1: baseado no slider (valor / tarifa)
  // - Nas Etapas 2 e 3: soma dos equipamentos residenciais declarados + consumo por habitante
  const realTimeCalc = useMemo(() => {
    const valorConta = formValues.valorConta || 450;
    const qtdPessoas = formValues.pessoas || 3;
    const qtdAr = formValues.arCondicionado ?? 1;
    const temPiscina = Boolean(formValues.piscina);
    const qtdChuveiro = formValues.chuveiro ?? 1;
    const temGeladeiraExtra = Boolean(formValues.geladeiraExtra);
    const temOutros = formValues.outros !== false;

    // Dimensionamento dinâmico: qualquer alteração de ar, chuveiro, piscina, etc. altera a economia imediatamente!
    const dim = calcularConsumoEDimensionamento(
      {
        valorConta,
        pessoas: qtdPessoas,
        arCondicionado: qtdAr,
        chuveiro: qtdChuveiro,
        piscina: temPiscina,
        geladeiraExtra: temGeladeiraExtra,
        outros: temOutros,
      },
      assumptions
    );

    const consumoKwh = currentStep === 1
      ? calcularConsumoKwh(valorConta, assumptions)
      : dim.consumoKwh;

    const contaEstimadaCoelba = currentStep === 1
      ? valorConta
      : dim.contaEstimadaCoelba;

    // Com Perutche: paga apenas a taxa mínima de disponibilidade Coelba
    const contaComPerutche = assumptions.minimumCharge; // R$ 78,40
    const economiaMensal = currentStep === 1
      ? Math.max(0, valorConta - contaComPerutche)
      : dim.economiaMensal;

    // Dados técnicos solares adicionais para a tela final
    const kwpNecessario = dim.kwpNecessario;
    const placasEstimadas = dim.paineis;
    const economiaGeral = calcularEconomia(contaEstimadaCoelba, assumptions);
    const parcelaFinanciamento = dim.parcelaFinanciamento;

    // Gatilhos de vantagem ativos baseados nas seleções do usuário
    const gatilhosAtivos: { id: string; nome: string; gatilho: string }[] = [];
    if (qtdAr > 0) {
      gatilhosAtivos.push({
        id: 'ar',
        nome: `${qtdAr}x Ar 12k BTU`,
        gatilho: '“Deixa ligado a noite toda sem culpa”',
      });
    }
    if (qtdChuveiro > 0) {
      gatilhosAtivos.push({
        id: 'chuveiro',
        nome: `${qtdChuveiro}x Chuveiro elétrico`,
        gatilho: '“Zera isso com solar + boiler”',
      });
    }
    if (temGeladeiraExtra) {
      gatilhosAtivos.push({
        id: 'geladeira',
        nome: 'Geladeira duplex extra',
        gatilho: '“Consome até desligada. Solar paga 24h”',
      });
    }
    if (temPiscina) {
      gatilhosAtivos.push({
        id: 'piscina',
        nome: 'Bomba de Piscina',
        gatilho: '“Filtra todo dia gastando R$ 0”',
      });
    }
    if (temOutros) {
      gatilhosAtivos.push({
        id: 'outros',
        nome: 'Iluminação & TV',
        gatilho: '“Entra de brinde no projeto”',
      });
    }

    return {
      consumoKwh,
      contaEstimadaCoelba,
      contaComPerutche,
      economiaMensal,
      kwpNecessario,
      placasEstimadas,
      parcelaFinanciamento,
      economiaGeral,
      gatilhosAtivos,
      tarifa: assumptions.tariff,
    };
  }, [
    formValues.valorConta,
    formValues.pessoas,
    formValues.arCondicionado,
    formValues.chuveiro,
    formValues.piscina,
    formValues.geladeiraExtra,
    formValues.outros,
    currentStep,
    assumptions,
  ]);

  const goToNext = () => {
    setDirection(1);
    setCurrentStep((prev) => Math.min(4, prev + 1));
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const onSubmit = (data: CalculatorFormData) => {
    // Se o usuário ainda não estiver na Etapa 3, não envia o formulário prematuramente
    if (currentStep < 3) {
      setDirection(1);
      setCurrentStep((prev) => Math.min(3, prev + 1));
      return;
    }

    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setDirection(1);
      setCurrentStep(4);
      if (onFinish) {
        onFinish({
          ...data,
          valorConta: realTimeCalc.contaEstimadaCoelba,
        });
      }
    }, 450);
  };

  // WhatsApp link com simulação personalizada
  const whatsappUrl = `https://wa.me/${GUANAMBI_SOLAR_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
    `Olá, Perutche Solar! Fiz a simulação na calculadora para Guanambi:\n` +
    `• Consumo estimado: ${realTimeCalc.consumoKwh} kWh/mês\n` +
    `• Conta Coelba atual: R$ ${realTimeCalc.contaEstimadaCoelba.toFixed(2)}\n` +
    `• Conta com Perutche: R$ ${realTimeCalc.contaComPerutche.toFixed(2)} (taxa mínima)\n` +
    `• Economia mensal: R$ ${realTimeCalc.economiaMensal.toFixed(2)}/mês\n` +
    `• Sistema estimado: ${realTimeCalc.kwpNecessario} kWp (${realTimeCalc.placasEstimadas} placas de 585W)\n` +
    `Gostaria de agendar a análise técnica gratuita no meu telhado!`
  )}`;

  return (
    <div className="w-full max-w-5xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-xl p-5 sm:p-8 lg:p-10 relative overflow-hidden">
      {/* Barra de progresso estilo Typeform no topo */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-100">
        <motion.div
          className="h-full bg-gradient-to-r from-[#E51E25] via-red-500 to-[#F59E0B]"
          initial={{ width: '33%' }}
          animate={{
            width: currentStep === 1 ? '33%' : currentStep === 2 ? '66%' : '100%',
          }}
          transition={{ duration: 0.3 }}
        />
      </div>



      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* ÁREA PRINCIPAL DO FORMULÁRIO PROGRESSIVO ESTILO TYPEFORM (7 colunas) */}
        <div className="lg:col-span-7 flex flex-col justify-between min-h-[480px]">
          
          {/* Indicador de etapa */}
          {currentStep <= 3 && (
            <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
              <span className="font-bold text-[#E51E25] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E51E25]" />
                Etapa {currentStep} de 3
              </span>
              <span className="text-gray-500 font-medium">
                {currentStep === 1 && 'Quanto você paga hoje?'}
                {currentStep === 2 && 'Quantas pessoas moram na casa?'}
                {currentStep === 3 && 'O que existe na sua casa?'}
              </span>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (currentStep < 3) {
                  goToNext();
                }
              }
            }}
            className="flex-1 flex flex-col justify-between"
          >
            <AnimatePresence custom={direction} mode="wait">
              
              {/* =========================================================
                  ETAPA 1: QUANTO VOCÊ PAGA HOJE? (Slider R$ 150 - R$ 1.500)
                  ========================================================= */}
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl sm:text-4xl font-black text-[#111827] tracking-tight leading-tight">
                      Quanto você paga hoje?
                    </h2>
                    <p className="mt-2 text-sm text-[#4B5563] font-medium">
                      Informe o valor aproximado da sua fatura mensal com a Neoenergia Coelba.
                    </p>
                  </div>

                  {/* Valor em destaque & Input numérico alternativo */}
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                        Valor selecionado
                      </span>
                      <div className="text-3xl sm:text-4xl font-black text-[#E51E25] tracking-tight font-mono">
                        R$ {formValues.valorConta.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <div className="flex items-center gap-2">
                        <label htmlFor="input-valor-conta" className="text-xs text-gray-600 font-semibold cursor-pointer">
                          Digitar: R$
                        </label>
                        <Controller
                          name="valorConta"
                          control={control}
                          render={({ field }) => (
                            <input
                              id="input-valor-conta"
                              aria-label="Digitar valor em reais da conta mensal"
                              aria-invalid={Boolean(errors.valorConta)}
                              type="number"
                              min={150}
                              max={10000}
                              step={10}
                              value={field.value}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                field.onChange(val);
                              }}
                              className="w-28 bg-white border border-gray-300 rounded-xl px-3 py-2 text-gray-900 font-bold text-base text-right focus:outline-none focus:border-[#E51E25] focus-visible:ring-2 focus-visible:ring-[#E51E25]"
                            />
                          )}
                        />
                      </div>
                      {errors.valorConta && (
                        <p role="alert" className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {errors.valorConta.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Slider: R$ 150 – R$ 1.500 */}
                  <div className="space-y-3 pt-2">
                    <Controller
                      name="valorConta"
                      control={control}
                      render={({ field }) => (
                        <input
                          id="slider-valor-conta"
                          aria-label="Controle deslizante do valor da conta"
                          type="range"
                          min={150}
                          max={1500}
                          step={10}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(Number(e.target.value));
                          }}
                          className="w-full h-3.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E51E25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E51E25]"
                        />
                      )}
                    />
                    <div className="flex justify-between text-xs text-gray-500 font-semibold font-mono">
                      <span>R$ 150</span>
                      <span className="text-[#E51E25] font-bold">
                        Consumo estimado: ~{Math.round(formValues.valorConta / assumptions.tariff)} kWh
                      </span>
                      <span>R$ 1.500</span>
                    </div>
                  </div>

                  {/* Botões rápidos de sugestão */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs text-gray-500 mr-1 font-medium">Valores comuns:</span>
                    {[250, 450, 650, 850, 1200].map((val) => (
                      <button
                        key={val}
                        type="button"
                        aria-label={`Selecionar valor rápido de R$ ${val}`}
                        onClick={() => {
                          setValue('valorConta', val, { shouldValidate: true });
                        }}
                        className={`text-xs px-3.5 py-1.5 rounded-lg border font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E51E25] ${
                          formValues.valorConta === val
                            ? 'bg-[#E51E25] text-white border-[#E51E25] font-bold shadow-md shadow-red-500/20'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-[#E51E25]'
                        }`}
                      >
                        R$ {val}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* =========================================================
                  ETAPA 2: QUANTAS PESSOAS MORAM NA CASA? (2 a 6+)
                  ========================================================= */}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="space-y-6"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E51E25] uppercase tracking-wider bg-red-50 border border-red-100 px-2.5 py-1 rounded-md">
                        <Users className="w-3.5 h-3.5" /> Moradores
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-black text-[#111827] tracking-tight leading-tight">
                      Quantas pessoas moram na casa?
                    </h2>
                    <p className="mt-2 text-sm text-[#4B5563] font-medium">
                      O número de moradores define a base de consumo essencial (iluminação, TV, tomadas e rotina).
                    </p>
                  </div>

                  {/* Botões visuais minimalistas e modernos: [2] [3] [4] [5] [6+] */}
                  <div className="grid grid-cols-5 gap-2 sm:gap-3.5 pt-2">
                    {[
                      { count: 2, label: '2', subtitle: 'pessoas' },
                      { count: 3, label: '3', subtitle: 'pessoas' },
                      { count: 4, label: '4', subtitle: 'pessoas' },
                      { count: 5, label: '5', subtitle: 'pessoas' },
                      { count: 6, label: '6+', subtitle: 'ou mais' },
                    ].map((option) => {
                      const isSelected = formValues.pessoas === option.count;
                      return (
                        <button
                          key={option.count}
                          type="button"
                          aria-label={`${option.count === 6 ? '6 ou mais' : option.count} pessoas na residência`}
                          aria-pressed={isSelected}
                          onClick={() => {
                            setValue('pessoas', option.count);
                          }}
                          className={`flex flex-col items-center justify-center py-4 px-2 sm:py-5 sm:px-3 rounded-2xl border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E51E25] ${
                            isSelected
                              ? 'bg-[#E51E25] border-[#E51E25] text-white shadow-lg shadow-red-500/25 scale-[1.03]'
                              : 'bg-white border-gray-200 text-gray-800 hover:border-gray-400 hover:bg-gray-50/80 shadow-xs'
                          }`}
                        >
                          <span className="text-2xl sm:text-3xl font-black tracking-tight">{option.label}</span>
                          <span className={`text-[11px] sm:text-xs font-semibold mt-1 tracking-tight ${isSelected ? 'text-white/95' : 'text-gray-500'}`}>
                            {option.subtitle}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-center gap-2.5">
                    <Info className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>
                      Em média, cada morador em Guanambi demanda <strong>~40 kWh/mês</strong> em iluminação, eletrônicos e suporte diário.
                    </span>
                  </div>
                </motion.div>
              )}

              {/* =========================================================
                  ETAPA 3: O QUE EXISTE NA SUA CASA? (Cards Visuais)
                  ========================================================= */}
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="space-y-4"
                >
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight leading-tight">
                      O que existe na sua casa?
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-[#4B5563] font-medium">
                      Cards baseados no consumo real dos maiores vilões da conta de luz na Bahia.
                    </p>
                  </div>

                  <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                    
                    {/* 1. Card Ar-condicionado (0 / 1 / 2 / 3+) */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-3.5 sm:p-4 shadow-sm hover:border-gray-300 transition-all">
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 shrink-0">
                            <Snowflake className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-[#111827]">Ar-condicionado 12.000 BTU Inverter</h4>
                              <span className="text-[10px] font-bold bg-cyan-50 text-cyan-800 px-1.5 py-0.5 rounded border border-cyan-200">
                                35% da conta
                              </span>
                            </div>
                            <p className="text-[11px] text-[#4B5563]">1,0 kW • 8h/dia = 240 kWh/mês cada</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-cyan-50/60 border border-cyan-100 text-[11px] font-semibold text-cyan-900 mb-3 italic">
                        “Deixa ligado a noite toda sem culpa”
                      </div>

                      {/* Seleção rápida (0 / 1 / 2 / 3+) e Stepper */}
                      <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
                        <span className="text-xs text-gray-600 font-medium">Quantidade:</span>
                        <div className="flex items-center gap-1.5" role="group" aria-label="Quantidade de aparelhos de ar-condicionado">
                          {[0, 1, 2, 3].map((num) => (
                            <button
                              key={num}
                              type="button"
                              aria-label={`${num === 3 ? '3 ou mais' : num} aparelhos de ar-condicionado`}
                              aria-pressed={formValues.arCondicionado === num}
                              onClick={() => {
                                setValue('arCondicionado', num);
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E51E25] ${
                                formValues.arCondicionado === num
                                  ? 'bg-[#E51E25] text-white shadow'
                                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {num === 3 ? '3+' : num}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 2. Card Piscina / Bomba */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-3.5 sm:p-4 shadow-sm hover:border-gray-300 transition-all">
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
                            <Waves className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-[#111827]">Bomba de Piscina 1 cv</h4>
                              <span className="text-[10px] font-bold bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded border border-blue-200">
                                13% da conta
                              </span>
                            </div>
                            <p className="text-[11px] text-[#4B5563]">0,75 kW • 4h/dia = 90 kWh/mês</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-blue-50/60 border border-blue-100 text-[11px] font-semibold text-blue-900 mb-3 italic">
                        “Piscina vira custo zero”
                      </div>

                      {/* Toggle [Não/Sim] */}
                      <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
                        <span className="text-xs text-gray-600 font-medium">Possui piscina?</span>
                        <div className="flex items-center gap-1.5 bg-gray-200 p-1 rounded-lg" role="group" aria-label="Possui piscina com bomba?">
                          <button
                            type="button"
                            aria-label="Não possui piscina com bomba"
                            aria-pressed={!formValues.piscina}
                            onClick={() => {
                              setValue('piscina', false);
                            }}
                            className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E51E25] ${
                              !formValues.piscina ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            Não
                          </button>
                          <button
                            type="button"
                            aria-label="Possui piscina com bomba"
                            aria-pressed={Boolean(formValues.piscina)}
                            onClick={() => {
                              setValue('piscina', true);
                            }}
                            className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E51E25] ${
                              formValues.piscina ? 'bg-[#E51E25] text-white shadow' : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            Sim
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 3. Card Chuveiro Elétrico */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-3.5 sm:p-4 shadow-sm hover:border-gray-300 transition-all">
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#E51E25] shrink-0">
                            <ShowerHead className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-[#111827]">Chuveiro Elétrico</h4>
                              <span className="text-[10px] font-bold bg-red-50 text-red-800 px-1.5 py-0.5 rounded border border-red-200">
                                24% da conta
                              </span>
                            </div>
                            <p className="text-[11px] text-[#4B5563]">5,5 kW • 1h/dia = 165 kWh/mês cada</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-red-50/60 border border-red-100 text-[11px] font-semibold text-red-900 mb-3 italic">
                        “Zera isso com solar + boiler”
                      </div>

                      {/* Seleção rápida (0 / 1 / 2 / 3+) */}
                      <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
                        <span className="text-xs text-gray-600 font-medium">Quantidade:</span>
                        <div className="flex items-center gap-1.5" role="group" aria-label="Quantidade de chuveiros elétricos">
                          {[0, 1, 2, 3].map((num) => (
                            <button
                              key={num}
                              type="button"
                              aria-label={`${num === 3 ? '3 ou mais' : num} chuveiros elétricos`}
                              aria-pressed={formValues.chuveiro === num}
                              onClick={() => {
                                setValue('chuveiro', num);
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E51E25] ${
                                formValues.chuveiro === num
                                  ? 'bg-[#E51E25] text-white shadow'
                                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {num === 3 ? '3+' : num}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 4. Card Geladeira Duplex / Freezer Extra */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-3.5 sm:p-4 shadow-sm hover:border-gray-300 transition-all">
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                            <Refrigerator className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-[#111827]">Geladeira Duplex / Freezer Extra</h4>
                              <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200">
                                15% da conta
                              </span>
                            </div>
                            <p className="text-[11px] text-[#4B5563]">0,15 kW • 24h = 108 kWh/mês cada</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-amber-50/60 border border-amber-100 text-[11px] font-semibold text-amber-900 mb-3 italic">
                        “Consome até desligada. Solar paga 24h”
                      </div>

                      {/* Toggle [Não/Sim] */}
                      <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
                        <span className="text-xs text-gray-600 font-medium">Tem geladeira/freezer extra?</span>
                        <div className="flex items-center gap-1.5 bg-gray-200 p-1 rounded-lg" role="group" aria-label="Possui geladeira ou freezer extra?">
                          <button
                            type="button"
                            aria-label="Não possui geladeira ou freezer extra"
                            aria-pressed={!formValues.geladeiraExtra}
                            onClick={() => {
                              setValue('geladeiraExtra', false);
                            }}
                            className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E51E25] ${
                              !formValues.geladeiraExtra ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            Não
                          </button>
                          <button
                            type="button"
                            aria-label="Possui geladeira ou freezer extra"
                            aria-pressed={Boolean(formValues.geladeiraExtra)}
                            onClick={() => {
                              setValue('geladeiraExtra', true);
                            }}
                            className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E51E25] ${
                              formValues.geladeiraExtra ? 'bg-[#E51E25] text-white shadow' : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            Sim
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 5. Card Outros (Máquina de lavar + Iluminação geral) */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-3.5 sm:p-4 shadow-sm hover:border-gray-300 transition-all">
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
                            <Lightbulb className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-[#111827]">Outros (Máquina + Iluminação)</h4>
                              <span className="text-[10px] font-bold bg-purple-50 text-purple-800 px-1.5 py-0.5 rounded border border-purple-200">
                                7% da conta
                              </span>
                            </div>
                            <p className="text-[11px] text-[#4B5563]">0,5 kW • 3h/dia = 45 kWh/mês</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-purple-50/60 border border-purple-100 text-[11px] font-semibold text-purple-900 mb-3 italic">
                        “O resto da casa entra de brinde”
                      </div>

                      {/* Toggle [Não/Sim] */}
                      <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
                        <span className="text-xs text-gray-600 font-medium">Incluir no cálculo?</span>
                        <div className="flex items-center gap-1.5 bg-gray-200 p-1 rounded-lg" role="group" aria-label="Incluir outros equipamentos na estimativa?">
                          <button
                            type="button"
                            aria-label="Não incluir outros aparelhos"
                            aria-pressed={!formValues.outros}
                            onClick={() => {
                              setValue('outros', false);
                            }}
                            className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E51E25] ${
                              !formValues.outros ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            Não
                          </button>
                          <button
                            type="button"
                            aria-label="Incluir outros aparelhos"
                            aria-pressed={Boolean(formValues.outros)}
                            onClick={() => {
                              setValue('outros', true);
                            }}
                            className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E51E25] ${
                              formValues.outros ? 'bg-[#E51E25] text-white shadow' : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            Sim
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* =========================================================
                  ETAPA 4: RESULTADO CONSOLIDADO
                  ========================================================= */}
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="space-y-6"
                >
                  <div className="text-center sm:text-left">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Simulação Concluída para Guanambi
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-[#111827]">
                      Seu Projeto Fotovoltaico Recomendado
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <span className="text-[11px] text-gray-500 font-medium block">Potência Ideal</span>
                      <span className="text-xl font-bold text-[#111827] font-mono">{realTimeCalc.kwpNecessario} kWp</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <span className="text-[11px] text-gray-500 font-medium block">Placas 585W</span>
                      <span className="text-xl font-bold text-[#F59E0B] font-mono">{realTimeCalc.placasEstimadas} placas</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 col-span-2 sm:col-span-1">
                      <span className="text-[11px] text-gray-500 font-medium block">Parcela estimada</span>
                      <span className="text-xl font-bold text-emerald-700 font-mono">R$ {realTimeCalc.parcelaFinanciamento.toFixed(0)}/mês</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                    <p>
                      <strong>Vantagem comprovada:</strong> A parcela do financiamento (R$ {realTimeCalc.parcelaFinanciamento.toFixed(0)}) é 
                      <span className="text-emerald-700 font-bold"> menor</span> que o que você já paga todo mês para a Coelba (R$ {realTimeCalc.contaEstimadaCoelba.toFixed(0)}). 
                      Você troca o boleto eterno por um patrimônio com 25 anos de garantia!
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <Button
                      id="calc-btn-whatsapp-result"
                      size="lg"
                      variant="primary"
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whatsappIcon={true}
                      aria-label="Enviar proposta personalizada no WhatsApp para atendimento técnico da Perutche"
                      className="w-full sm:w-auto text-base font-bold shadow-lg shadow-red-500/20 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E51E25]"
                    >
                      Enviar Proposta no WhatsApp
                    </Button>

                    <Button
                      id="calc-btn-recalcular"
                      size="lg"
                      variant="outline"
                      aria-label="Recalcular simulação do início"
                      onClick={() => {
                        setCurrentStep(1);
                        setDirection(-1);
                      }}
                      leftIcon={<RotateCcw className="w-4 h-4" />}
                      className="w-full sm:w-auto text-xs focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400"
                    >
                      Recalcular
                    </Button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* BOTÕES DE NAVEGAÇÃO ENTRE ETAPAS (Etapas 1, 2, 3) */}
            {currentStep <= 3 && (
              <div className="pt-6 mt-6 border-t border-gray-200 flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <Button
                    id="calc-btn-voltar"
                    size="md"
                    variant="outline"
                    type="button"
                    onClick={goToPrev}
                    disabled={isCalculating}
                    aria-label="Voltar para a etapa anterior"
                    leftIcon={<ArrowLeft className="w-4 h-4" />}
                    className="focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400"
                  >
                    Voltar
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <Button
                    key="calc-btn-proximo"
                    id="calc-btn-proximo"
                    size="md"
                    variant="primary"
                    type="button"
                    onClick={goToNext}
                    disabled={isCalculating}
                    aria-label="Avançar para a próxima etapa"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E51E25]"
                  >
                    Próximo
                  </Button>
                ) : (
                  <Button
                    key="calc-btn-calcular-submit"
                    id="calc-btn-calcular-submit"
                    size="md"
                    variant="primary"
                    type="submit"
                    disabled={isCalculating}
                    aria-label="Calcular estimativa de economia solar"
                    rightIcon={isCalculating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    className="bg-[#E51E25] hover:bg-[#c9181e] font-bold shadow-lg shadow-[#E51E25]/30 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E51E25]"
                  >
                    {isCalculating ? 'Calculando...' : 'Ver dimensionamento'}
                  </Button>
                )}
              </div>
            )}
          </form>
        </div>

        {/* =========================================================
            BARRA LATERAL / STICKY ATUALIZANDO EM TEMPO REAL
            ========================================================= */}
        <div className="lg:col-span-5 w-full lg:sticky lg:top-24 space-y-4">
          <div className="rounded-2xl sm:rounded-3xl bg-[#F9FAFB] border-2 border-red-200 p-5 sm:p-6 shadow-lg relative overflow-hidden">
            {/* Brilho sutil */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E51E25]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F59E0B]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
                  Simulação em Tempo Real
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {assumptions.city} • Coelba
                </span>
              </div>

              {/* Informações centrais solicitadas pelo usuário */}
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between items-center text-gray-700">
                  <span>Consumo estimado:</span>
                  <strong className="text-[#111827] font-mono text-base font-bold">
                    {realTimeCalc.consumoKwh} kWh/mês
                  </strong>
                </div>

                <div className="flex justify-between items-center text-gray-700">
                  <span>Conta estimada Coelba:</span>
                  <span className="text-gray-900 font-mono font-bold">
                    ~R$ {realTimeCalc.contaEstimadaCoelba.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex justify-between items-center text-gray-700">
                  <span>Conta com Perutche:</span>
                  <span className="text-emerald-700 font-mono font-extrabold text-base">
                    R$ {realTimeCalc.contaComPerutche.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Card Destaque: Economia Mensal */}
              <div className="p-4 rounded-2xl bg-white border border-emerald-300 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-gray-500 uppercase font-bold tracking-wider block">
                    Economia mensal:
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">
                    R$ {realTimeCalc.economiaMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>

              {/* Gatilhos de Vantagem Ativos */}
              {realTimeCalc.gatilhosAtivos.length > 0 && (
                <div className="pt-2 border-t border-gray-200 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider block">
                    Vantagens dos seus equipamentos:
                  </span>
                  <div className="space-y-1">
                    {realTimeCalc.gatilhosAtivos.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-700">
                        {renderEquipIcon(item.id, 'w-3.5 h-3.5')}
                        <span className="font-semibold text-gray-900">{item.nome}:</span>
                        <span className="text-[#E51E25] font-medium text-[11px] italic">{item.gatilho}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Botão para abrir Base de Cálculo Técnica */}
              <div className="pt-2 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowTechnicalTable(!showTechnicalTable)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-gray-600 hover:text-[#E51E25] transition-colors py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E51E25] rounded"
                  aria-expanded={showTechnicalTable}
                  aria-controls="tabela-base-calculo"
                >
                  <span className="flex items-center gap-1.5">
                    <Table className="w-3.5 h-3.5 text-[#E51E25]" />
                    Base de Cálculo Residencial (Tabela Técnica)
                  </span>
                  {showTechnicalTable ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Disclaimer Obrigatório */}
              <div className="pt-2 border-t border-gray-200 flex items-start gap-2 text-[11px] text-gray-500 leading-snug">
                <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Disclaimer:</strong> “Estimativa baseada nas condições informadas. O dimensionamento final depende de análise técnica.”
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* =========================================================
          SEÇÃO EXPANSÍVEL: BASE DE CÁLCULO (TABELA RESIDENCIAL)
          ========================================================= */}
      <AnimatePresence>
        {showTechnicalTable && (
          <motion.div
            id="tabela-base-calculo"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 pt-8 border-t border-gray-200 overflow-hidden"
          >
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#E51E25]" />
                    4.2 Base de Cálculo — Tabela Residencial Guanambi
                  </h3>
                  <p className="text-xs text-gray-500">
                    Parâmetros oficiais adotados pela engenharia da Perutche Solar.
                  </p>
                </div>
                <div className="text-xs font-mono text-gray-600 bg-gray-100 px-3 py-1 rounded-lg border border-gray-200">
                  HSP: {assumptions.irradiation} kWh/m²/dia • Tarifa: R$ {assumptions.tariff}/kWh ({assumptions.tariffDate})
                </div>
              </div>

              {/* Tabela Residencial */}
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
                    <tr>
                      <th className="p-3">Equipamento</th>
                      <th className="p-3">Potência média</th>
                      <th className="p-3">Uso/dia</th>
                      <th className="p-3">Consumo mês</th>
                      <th className="p-3">% conta</th>
                      <th className="p-3">Gatilho de vantagem para IA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {TABELA_RESIDENCIAL_EQUIPAMENTOS.map((equip) => (
                      <tr key={equip.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="p-3 font-semibold text-gray-900 flex items-center gap-2">
                          {renderEquipIcon(equip.id, 'w-4 h-4')}
                          <span>{equip.nome}</span>
                        </td>
                        <td className="p-3 font-mono text-gray-700">{equip.potenciaMediaKw} kW</td>
                        <td className="p-3 font-mono text-gray-700">{equip.usoDiaHoras} h</td>
                        <td className="p-3 font-mono font-bold text-gray-900">{equip.consumoMesKwh} kWh</td>
                        <td className="p-3 font-mono font-bold text-[#E51E25]">{equip.percentualConta}%</td>
                        <td className="p-3 italic text-gray-800 font-medium">“{equip.gatilhoVantagem}”</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Premissas Técnicas Explicitadas */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs space-y-2">
                <span className="font-bold text-gray-800 block">
                  Premissas técnicas adotadas (SolarAssumptions):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-gray-700">
                  <div>
                    <span className="text-gray-500 block text-[10px]">Cidade:</span>
                    <strong>{assumptions.city} (BA)</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Irradiação Solar:</span>
                    <strong>{assumptions.irradiation} kWh/m²/dia</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Tarifa Coelba:</span>
                    <strong>R$ {assumptions.tariff}/kWh ({assumptions.tariffDate})</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Taxa Mínima:</span>
                    <strong>R$ {assumptions.minimumCharge.toFixed(2)}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Rendimento (PR):</span>
                    <strong>{(assumptions.systemLoss * 100).toFixed(0)}% (perda 22%)</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Degradação anual:</span>
                    <strong>{(assumptions.degradation * 100).toFixed(1)}%/ano</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500 block text-[10px]">Nota regulatória:</span>
                    <span className="text-gray-600">Resolução Normativa ANEEL / Lei 14.300</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CalculatorForm;
