'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  ArrowLeft,
  Calendar,
  TrendingUp,
  Leaf,
  Download,
  FileText,
  Sparkles,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { CalculatorForm, CalculatorFormData } from '../../components/calculator/CalculatorForm';
import { Button } from '../../components/ui/Button';
import { TARIFA_COELBA, TAXA_MINIMA, GUANAMBI_SOLAR_CONFIG } from '../../lib/solar/tariffs';
import {
  calcularConsumoKwh,
  calcularKwpNecessario,
  calcularEconomia,
  gerarMensagemWhatsApp,
  calcularConsumoEDimensionamento,
} from '../../lib/solar/calculators';

export interface SimularPageProps {
  onNavigate?: (path: string) => void;
}

export default function SimularPage({ onNavigate }: SimularPageProps) {
  // Dados do formulário e cálculo
  const [formData, setFormData] = useState<CalculatorFormData>({
    valorConta: 496,
    pessoas: 3,
    arCondicionado: 1,
    piscina: false,
    chuveiro: 1,
    geladeiraExtra: false,
  });

  // Estado condicional para exibição dos resultados após cálculo
  const [hasCalculated, setHasCalculated] = useState<boolean>(true);
  const [showPdfFeedback, setShowPdfFeedback] = useState<boolean>(false);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFormFinish = (data: CalculatorFormData) => {
    setFormData(data);
    setHasCalculated(true);
  };

  // Cálculos matemáticos dinâmicos reagindo a qualquer alteração de ar, chuveiro, etc.
  const {
    valorConta,
    consumoKwh,
    kwp,
    paineis,
    economiaMensal,
    economia25Anos,
    paybackMeses,
    co2Toneladas,
    chartData,
    whatsappUrl,
  } = useMemo(() => {
    const dim = calcularConsumoEDimensionamento({
      valorConta: formData.valorConta,
      pessoas: formData.pessoas,
      arCondicionado: formData.arCondicionado,
      chuveiro: formData.chuveiro,
      piscina: formData.piscina,
      geladeiraExtra: formData.geladeiraExtra,
      outros: (formData as any).outros,
    });

    const valorConta = dim.contaEstimadaCoelba;
    const consumoKwh = dim.consumoKwh;
    const kwp = dim.kwpNecessario;
    const paineis = dim.paineis;
    const economiaMensal = dim.economiaMensal;
    const economia25Anos = dim.economia25Anos;
    const paybackMeses = dim.paybackMeses;
    const co2Toneladas = dim.co2Toneladas;

    // Dados para o gráfico Recharts (Antes vs Depois)
    const chartData = [
      {
        name: 'Antes (Coelba)',
        valor: valorConta,
        fill: '#E51E25',
      },
      {
        name: 'Depois (Perutche)',
        valor: TAXA_MINIMA,
        fill: '#10B981',
      },
    ];

    // Mensagem para o WhatsApp utilizando gerarMensagemWhatsApp
    const msg = gerarMensagemWhatsApp(
      {
        conta: valorConta,
        pessoas: formData.pessoas,
        arCondicionado: formData.arCondicionado,
        chuveiro: formData.chuveiro,
        piscina: formData.piscina,
        geladeiraExtra: formData.geladeiraExtra ? 1 : 0,
        cidade: 'Guanambi - BA',
      },
      {
        economiaMensal,
        economia25Anos,
        payback: 4,
        paybackMeses,
        kwpNecessario: kwp,
        paineisSugeridos: paineis,
      }
    );

    const whatsappUrl = `https://wa.me/${GUANAMBI_SOLAR_CONFIG.contact.whatsapp}?text=${encodeURIComponent(msg)}`;

    return {
      valorConta,
      consumoKwh,
      kwp,
      paineis,
      economiaMensal,
      economia25Anos,
      paybackMeses,
      co2Toneladas,
      chartData,
      whatsappUrl,
    };
  }, [formData]);

  const handleDownloadPdf = () => {
    setShowPdfFeedback(true);
    setTimeout(() => {
      // Dispara a impressão nativa caso o usuário queira salvar em PDF
      if (typeof window !== 'undefined') {
        window.print();
      }
      setShowPdfFeedback(false);
    }, 800);
  };

  return (
    <div className="min-h-dvh flex flex-col bg-white text-gray-900 selection:bg-[#E51E25] selection:text-white">
      
      {/* 1. Header Simples */}
      <header className="w-full border-b border-gray-200 bg-white/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => handleNav(e, '/')}
            className="flex items-center gap-2.5 group"
          >
            <img
              src="/Imagens/Logo Perutche.png"
              alt="Perutche Solar Soluções Energéticas"
              className="h-8 sm:h-10 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </a>

          <a
            href="/"
            onClick={(e) => handleNav(e, '/')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 hover:text-gray-900 transition-all px-3.5 py-1.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 text-gray-500" />
            <span>Voltar para home</span>
          </a>
        </div>
      </header>

      {/* 2. Container Centralizado (max-w-5xl) */}
      <main id="main-content" className="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Header da Página */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF3C7] border border-amber-300 text-xs font-bold text-[#F59E0B] uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Simulação Online e Gratuita</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight text-balance">
              Quanto você poderia economizar com energia solar?
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-normal text-pretty">
              Descubra em 2 minutos o potencial da sua casa com a tarifa Coelba e o sol de Guanambi.
            </p>
          </div>

          {/* 3. CalculatorForm */}
          <div className="relative max-w-4xl mx-auto">
            <CalculatorForm onFinish={handleFormFinish} onValuesChange={setFormData} />
          </div>

          {/* 4. Após cálculo: Painel Limpo de Resultados */}
          <AnimatePresence>
            {hasCalculated && (
              <motion.div
                id="resultado-simulacao"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="space-y-8 pt-6"
              >
                <div className="border-t border-gray-200 pt-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                      Estimativa Consolidada para Guanambi
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                      Resultados da Sua Simulação
                    </h2>
                  </div>
                  <div className="text-xs text-gray-600 bg-gray-50 border border-gray-200 px-3.5 py-1.5 rounded-full font-mono">
                    Tarifa Coelba R$ 0,92/kWh • 5,72 HSP
                  </div>
                </div>

                {/* Grid dos Cards de Resultados */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Card 1 - Economia com Gráfico Recharts Antes vs Depois */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="md:col-span-2 bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Economia Estimada
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
                          Sua economia mensal:{' '}
                          <span className="text-emerald-600 font-mono">
                            R$ {economiaMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                          Sua fatura estimada de R$ {valorConta.toFixed(2)} cai para a taxa mínima de R$ {TAXA_MINIMA.toFixed(2)}.
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shrink-0 self-start sm:self-center">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Até 95% de redução</span>
                      </div>
                    </div>

                    {/* Gráfico Recharts Antes vs Depois */}
                    <div className="w-full h-56 pt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={chartData}
                          margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                        >
                          <XAxis
                            dataKey="name"
                            stroke="#6B7280"
                            fontSize={12}
                            tickLine={false}
                          />
                          <YAxis
                            stroke="#6B7280"
                            fontSize={12}
                            tickFormatter={(val) => `R$ ${val}`}
                            tickLine={false}
                          />
                          <Tooltip
                            formatter={(value: any) => [
                              `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                              'Fatura Mensal',
                            ]}
                            contentStyle={{
                              backgroundColor: '#ffffff',
                              borderColor: '#E5E7EB',
                              borderRadius: '12px',
                              color: '#111827',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            }}
                          />
                          <Bar dataKey="valor" radius={[8, 8, 0, 0]} barSize={64}>
                            {chartData.map((entry, index) => (
                              <Cell key={`bar-cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="flex items-center justify-center gap-6 mt-4 text-xs font-medium text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm bg-[#E51E25]" />
                        <span>Fatura Atual Coelba</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm bg-[#10B981]" />
                        <span>Com Perutche Solar</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 2 - 25 anos */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4">
                        <Calendar className="w-6 h-6" />
                      </div>

                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Horizonte de Garantia
                      </span>

                      <h3 className="text-xl sm:text-2xl font-black text-gray-900 mt-1.5">
                        Economia em 25 anos:{' '}
                        <span className="text-[#F59E0B] font-mono block sm:inline">
                          R$ {economia25Anos.toLocaleString('pt-BR')}
                        </span>
                      </h3>

                      <p className="mt-2.5 text-xs sm:text-sm text-gray-600 leading-relaxed">
                        Projeção considerando a vida útil dos painéis Tier 1 e proteção contra reajustes tarifários anuais da Coelba.
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-gray-100 text-[11px] text-gray-500 font-mono">
                      Patrimônio protegido no longo prazo
                    </div>
                  </motion.div>

                  {/* Card 3 - Payback & Dimensionamento */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4">
                        <TrendingUp className="w-6 h-6" />
                      </div>

                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Retorno do Investimento
                      </span>

                      <h3 className="text-xl sm:text-2xl font-black text-gray-900 mt-1.5">
                        Payback:{' '}
                        <span className="text-blue-600 font-mono block sm:inline">
                          ~{paybackMeses} meses
                        </span>
                      </h3>

                      <div className="mt-3 p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-blue-900 space-y-1">
                        <div className="flex justify-between">
                          <span>Sistema recomendado:</span>
                          <strong>{kwp} kWp</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Módulos de 585W:</span>
                          <strong>{paineis} placas</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Consumo suprido:</span>
                          <strong>{consumoKwh} kWh/mês</strong>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-mono">
                      Após o payback: +20 anos de lucro líquido
                    </div>
                  </motion.div>

                  {/* Card 4 - CO₂ */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="md:col-span-2 bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                        <Leaf className="w-6 h-6" />
                      </div>

                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Impacto Sustentável
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5">
                          CO₂ evitado:{' '}
                          <span className="text-emerald-600 font-mono">
                            {co2Toneladas} toneladas
                          </span>
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                          Energia 100% limpa gerada direto no seu telhado, equivalente ao plantio de centenas de árvores no sertão baiano.
                        </p>
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 shrink-0">
                      Selo Verde Guanambi
                    </div>
                  </motion.div>

                </div>

                {/* 5. CTA Final & 6. Botão Secundário */}
                <div className="rounded-3xl bg-[#F9FAFB] border border-gray-200 p-7 sm:p-10 shadow-sm space-y-6 text-center">
                  <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                      Gostou da simulação?
                    </h3>
                    <p className="text-sm text-gray-600">
                      Envie agora para um de nossos engenheiros em Guanambi e receba a proposta detalhada com visita técnica gratuita.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                    {/* Botão Grande Vermelho */}
                    <Button
                      size="lg"
                      variant="primary"
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whatsappIcon={true}
                      className="w-full sm:w-auto text-base font-bold px-8 shadow-lg shadow-[#E51E25]/20"
                    >
                      Receber estudo completo no WhatsApp
                    </Button>

                    {/* Botão Secundário: Salvar resultado em PDF */}
                    <Button
                      id="btn-simular-download-pdf"
                      size="lg"
                      variant="outline"
                      type="button"
                      onClick={handleDownloadPdf}
                      isLoading={showPdfFeedback}
                      leftIcon={<Download className="w-4 h-4" />}
                      className="w-full sm:w-auto text-sm"
                    >
                      {showPdfFeedback ? 'Gerando documento...' : 'Salvar resultado em PDF'}
                    </Button>
                  </div>

                  {/* Feedback do PDF */}
                  {showPdfFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-emerald-600 font-medium"
                    >
                      Preparando documento para impressão / salvar em PDF...
                    </motion.div>
                  )}
                </div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* Rodapé Informativo com Disclaimer Obrigatório */}
          <div className="pt-8 border-t border-gray-200 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Perutche Solar. Guanambi - BA.</p>
            <p className="font-medium text-gray-600">
              Estimativa baseada nas condições informadas. O dimensionamento final depende de análise técnica.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
