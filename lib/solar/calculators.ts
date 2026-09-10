import {
  TARIFA_COELBA,
  IRRADIACAO_GUANAMBI,
  TAXA_MINIMA,
  PERDA_SISTEMA,
  GUANAMBI_SOLAR_CONFIG,
  SolarAssumptions,
  DEFAULT_SOLAR_ASSUMPTIONS,
  TABELA_RESIDENCIAL_EQUIPAMENTOS,
  EquipamentoResidencialInfo,
} from './tariffs';
import {
  CalculatorData,
  SolarResult,
  SolarCalculationInput,
  SolarCalculationResult,
  SolarKit,
  ProjectShowcase,
  FAQItem,
} from './types';
import { KITS_RESIDENCIAIS, KITS_RESIDENCIAIS_LIST } from './kits';

// Reexporta os kits e premissas para conveniência e retrocompatibilidade
export {
  KITS_RESIDENCIAIS,
  KITS_RESIDENCIAIS_LIST,
  DEFAULT_SOLAR_ASSUMPTIONS,
  TABELA_RESIDENCIAL_EQUIPAMENTOS,
};
export type { SolarAssumptions, EquipamentoResidencialInfo };

/**
 * 1. Calcula o consumo mensal estimado em kWh a partir do valor da fatura de energia da Coelba.
 * Fórmula: kWh = contaValor / tariff
 *
 * @param contaValor - Valor em R$ da conta de luz
 * @param assumptions - Premissas técnicas solares (padrão Guanambi)
 * @returns Consumo equivalente em kWh arredondado com 2 casas decimais
 */
export function calcularConsumoKwh(
  contaValor: number,
  assumptions: SolarAssumptions = DEFAULT_SOLAR_ASSUMPTIONS
): number {
  if (!contaValor || contaValor <= 0) return 0;
  const kwh = contaValor / assumptions.tariff;
  return Number(kwh.toFixed(2));
}

/**
 * 2. Calcula a potência de pico (kWp) necessária para suprir o consumo mensal informado.
 * Fórmula: kWh / (30 * IRRADIACAO * performanceRatio)
 *
 * @param kwhMes - Consumo mensal em kWh
 * @param assumptions - Premissas técnicas solares (padrão Guanambi)
 * @returns Potência do gerador solar em kWp
 */
export function calcularKwpNecessario(
  kwhMes: number,
  assumptions: SolarAssumptions = DEFAULT_SOLAR_ASSUMPTIONS
): number {
  if (!kwhMes || kwhMes <= 0) return 0;
  // Se systemLoss > 0.5 (ex: 0.78), trata como performance ratio. Se < 0.5 (ex: 0.22), calcula 1 - perdas.
  const pr = assumptions.systemLoss > 0.5 ? assumptions.systemLoss : (1 - assumptions.systemLoss);
  const divisor = 30 * assumptions.irradiation * pr;
  const kwp = kwhMes / divisor;
  return Number(kwp.toFixed(2));
}

/**
 * 3. Calcula a economia mensal, anual, projeção de 25 anos e payback estimado.
 *
 * @param contaAtual - Valor em R$ da fatura de energia antes da instalação solar
 * @param assumptions - Premissas técnicas solares (padrão Guanambi)
 * @returns Objeto com economia mensal, anual, em 25 anos e tempo de retorno (payback)
 */
export function calcularEconomia(
  contaAtual: number,
  assumptions: SolarAssumptions = DEFAULT_SOLAR_ASSUMPTIONS
): {
  economiaMensal: number;
  economiaAnual: number;
  economia25Anos: number;
  paybackMeses: number;
  paybackAnos: number;
} {
  // Economia mensal líquida descontando a taxa mínima obrigatória da concessionária
  const economiaMensal = Math.max(0, contaAtual - assumptions.minimumCharge);
  const economiaAnual = economiaMensal * 12;

  // Projeção em 25 anos considerando degradação anual dos painéis e inflação energética média
  const taxaInflacao = 0.065;
  const degradacaoAnual = assumptions.degradation || 0.005; // 0.5%/ano
  let acumulado25Anos = 0;
  for (let ano = 1; ano <= 25; ano++) {
    const fatorGeracao = Math.pow(1 - degradacaoAnual, ano - 1);
    const fatorInflacao = Math.pow(1 + taxaInflacao, ano - 1);
    acumulado25Anos += economiaAnual * fatorGeracao * fatorInflacao;
  }

  // Estimativa de payback em Guanambi:
  // Custo médio de mercado instalado = ~R$ 3,10 por Watt-pico
  const kwhMes = calcularConsumoKwh(contaAtual, assumptions);
  const kwp = calcularKwpNecessario(kwhMes, assumptions);
  const investimentoEstimado = kwp * 1000 * 3.10;

  const paybackMeses = economiaMensal > 0
    ? Math.max(12, Math.round(investimentoEstimado / economiaMensal))
    : 0;
  const paybackAnos = Number((paybackMeses / 12).toFixed(1));

  return {
    economiaMensal: Number(economiaMensal.toFixed(2)),
    economiaAnual: Number(economiaAnual.toFixed(2)),
    economia25Anos: Math.round(acumulado25Anos),
    paybackMeses,
    paybackAnos,
  };
}

/**
 * 4. Calcula o consumo residencial total baseado nos equipamentos selecionados.
 * Referências de consumo médio mensal por equipamento (Base Residencial Guanambi):
 *   - Ar 12.000 BTU Inverter: 1,0 kW x 8h = 240 kWh/mês cada (35% da conta média)
 *   - Chuveiro Elétrico: 5,5 kW x 1h = 165 kWh/mês cada (24% da conta média)
 *   - Geladeira Duplex: 0,15 kW x 24h = 108 kWh/mês cada (15% da conta média)
 *   - Bomba de Piscina 1 cv: 0,75 kW x 4h = 90 kWh/mês (13% da conta média)
 *   - Máquina + Iluminação (Outros): 0,5 kW x 3h = 45 kWh/mês (7% da conta média)
 *
 * @param data - Dados de equipamentos da calculadora
 * @param assumptions - Premissas técnicas solares (padrão Guanambi)
 * @returns Consumo total em kWh, detalhamento por equipamento e conta estimada em R$
 */
export function calcularPorEquipamentos(
  data: CalculatorData & { outros?: boolean },
  assumptions: SolarAssumptions = DEFAULT_SOLAR_ASSUMPTIONS
): {
  consumoTotal: number;
  consumoKwhTotal: number;
  contaEstimada: number;
  detalhamento: {
    arCondicionadoKWh: number;
    piscinaKWh: number;
    chuveiroKWh: number;
    geladeiraExtraKWh: number;
    outrosKWh: number;
    consumoBaseResidencialKWh: number;
  };
} {
  const qtdAr = Number(data.arCondicionado) || 0;
  const qtdChuveiro = Number(data.chuveiro) || 0;
  const temPiscina = Boolean(data.piscina);
  const qtdGeladeiraExtra = Number(data.geladeiraExtra) || 0;
  const temOutros = Boolean((data as any).outros);
  const qtdPessoas = Math.max(1, Number(data.pessoas) || 1);

  // Consumos específicos
  const arCondicionadoKWh = qtdAr * 240;
  const piscinaKWh = temPiscina ? 90 : 0;
  const chuveiroKWh = qtdChuveiro * 165;
  const geladeiraExtraKWh = qtdGeladeiraExtra * 108;
  const outrosKWh = temOutros ? 45 : 0;

  // Consumo base essencial de iluminação LED, TV, geladeira principal e tomadas (40 kWh por morador)
  const consumoBaseResidencialKWh = qtdPessoas * 40;

  const consumoTotal = Math.round(
    arCondicionadoKWh +
    piscinaKWh +
    chuveiroKWh +
    geladeiraExtraKWh +
    outrosKWh +
    consumoBaseResidencialKWh
  );

  // Conta estimada aplicando a tarifa Coelba + taxa mínima/iluminação pública
  const contaEstimada = Number((consumoTotal * assumptions.tariff + assumptions.minimumCharge).toFixed(2));

  return {
    consumoTotal,
    consumoKwhTotal: consumoTotal,
    contaEstimada,
    detalhamento: {
      arCondicionadoKWh,
      piscinaKWh,
      chuveiroKWh,
      geladeiraExtraKWh,
      outrosKWh,
      consumoBaseResidencialKWh,
    },
  };
}

/**
 * 4.1 Calcula o consumo e dimensionamento solar dinâmico integrando o valor base do slider
 * com os equipamentos e pessoas selecionados.
 * Garante que qualquer alteração em ar-condicionado, chuveiros, pessoas ou piscina
 * altere imediatamente e proporcionalmente a economia mensal, economia de 25 anos,
 * potência em kWp e quantidade de placas solares.
 */
export function calcularConsumoEDimensionamento(
  data: {
    valorConta?: number;
    conta?: number;
    pessoas?: number;
    arCondicionado?: number;
    chuveiro?: number;
    piscina?: boolean;
    geladeiraExtra?: boolean | number;
    outros?: boolean;
  },
  assumptions: SolarAssumptions = DEFAULT_SOLAR_ASSUMPTIONS
) {
  const valorContaBase = Math.max(50, Number(data.valorConta ?? data.conta) || 450);
  const qtdPessoas = Math.max(1, Number(data.pessoas) || 3);
  const qtdAr = Math.max(0, Number(data.arCondicionado) ?? 1);
  const qtdChuveiro = Math.max(0, Number(data.chuveiro) ?? 1);
  const temPiscina = Boolean(data.piscina);
  const temGeladeiraExtra = Boolean(data.geladeiraExtra);
  const temOutros = data.outros !== false;

  // Base padrão inicial do formulário (1 ar, 1 chuveiro, 3 pessoas, sem piscina, sem geladeira extra, com outros)
  const deltaKwh =
    (qtdAr - 1) * 240 +
    (qtdChuveiro - 1) * 165 +
    (qtdPessoas - 3) * 40 +
    (temPiscina ? 90 : 0) +
    (temGeladeiraExtra ? 108 : 0) +
    (temOutros ? 0 : -45);

  const kwhBaseSlider = Math.round(valorContaBase / assumptions.tariff);
  const consumoKwh = Math.max(50, kwhBaseSlider + deltaKwh);

  // Conta estimada da Coelba sem energia solar
  const contaEstimadaCoelba = Number((consumoKwh * assumptions.tariff).toFixed(2));

  // Com Perutche Solar: cliente paga apenas a taxa mínima de disponibilidade Coelba
  const contaComPerutche = assumptions.minimumCharge; // R$ 78,40

  // Economia mensal líquida
  const economiaMensal = Number(Math.max(0, contaEstimadaCoelba - contaComPerutche).toFixed(2));
  const economiaAnual = Number((economiaMensal * 12).toFixed(2));

  // Projeção em 25 anos (com inflação energética e degradação de painel)
  const taxaInflacao = 0.065;
  const degradacaoAnual = assumptions.degradation || 0.005;
  let acumulado25Anos = 0;
  for (let ano = 1; ano <= 25; ano++) {
    const fatorGeracao = Math.pow(1 - degradacaoAnual, ano - 1);
    const fatorInflacao = Math.pow(1 + taxaInflacao, ano - 1);
    acumulado25Anos += economiaAnual * fatorGeracao * fatorInflacao;
  }
  const economia25Anos = Math.round(acumulado25Anos);

  // Potência necessária (kWp) e quantidade de placas Tier 1 de 585W
  const kwpNecessario = calcularKwpNecessario(consumoKwh, assumptions);
  const paineis = Math.max(4, Math.ceil((kwpNecessario * 1000) / 585));

  // Payback estimado
  const investimentoEstimado = kwpNecessario * 1000 * 3.10;
  const paybackMeses = economiaMensal > 0
    ? Math.max(12, Math.round(investimentoEstimado / economiaMensal))
    : 48;
  const paybackAnos = Number((paybackMeses / 12).toFixed(1));

  // Impacto ambiental
  const co2Toneladas = Number(((consumoKwh * 12 * 0.084 * 25) / 1000).toFixed(1)) || 8.2;
  const arvoresEquivalentes = Math.round(co2Toneladas * 7.1);

  // Parcela de financiamento estimada (em até 84x)
  const parcelaFinanciamento = Number(((investimentoEstimado / 84) * 1.15).toFixed(2));

  return {
    consumoKwh,
    contaEstimadaCoelba,
    contaComPerutche,
    economiaMensal,
    economiaAnual,
    economia25Anos,
    kwpNecessario,
    paineis,
    paybackMeses,
    paybackAnos,
    co2Toneladas,
    arvoresEquivalentes,
    parcelaFinanciamento,
  };
}

/**
 * 5. Formata mensagem pronta para envio pelo WhatsApp com resumo do dimensionamento.
 *
 * @param data - Informações preenchidas pelo usuário
 * @param resultado - Resultados calculados do sistema solar
 * @returns Mensagem de texto formatada com quebras de linha e dados técnicos
 */
export function gerarMensagemWhatsApp(data: CalculatorData, resultado: SolarResult): string {
  const valorConta = data.conta ? `R$ ${data.conta.toFixed(2).replace('.', ',')}` : 'Não informado';
  const economiaMensal = resultado.economiaMensal ? `R$ ${resultado.economiaMensal.toFixed(2).replace('.', ',')}` : 'Até 95%';
  const economia25Anos = resultado.economia25Anos ? `R$ ${resultado.economia25Anos.toLocaleString('pt-BR')}` : 'Calculando...';
  const paineis = resultado.paineisSugeridos || Math.max(4, Math.ceil((resultado.kwpNecessario * 1000) / 585));
  const cidade = data.cidade || 'Guanambi - BA';

  const equipamentosTexto = [
    data.pessoas ? `👥 ${data.pessoas} pessoa(s) no imóvel` : null,
    data.arCondicionado ? `❄️ ${data.arCondicionado} Ar-condicionado(s)` : null,
    data.chuveiro ? `🚿 ${data.chuveiro} Chuveiro(s) elétrico(s)` : null,
    data.piscina ? `🏊 Com piscina` : null,
    data.geladeiraExtra ? `🧊 ${data.geladeiraExtra} Geladeira/Freezer extra` : null,
  ].filter(Boolean).join('\n');

  return `☀️ *SIMULAÇÃO DE ENERGIA SOLAR - PERUTCHE SOLAR*
📍 *Localidade:* ${cidade}
${data.nome ? `👤 *Cliente:* ${data.nome}\n` : ''}
💰 *Valor Atual da Conta:* ${valorConta}/mês
${equipamentosTexto ? `\n🏠 *Perfil de Consumo:*\n${equipamentosTexto}\n` : ''}
⚡ *DIMENSIONAMENTO RECOMENDADO:*
• *Potência do Sistema:* ${resultado.kwpNecessario} kWp
• *Módulos Fotovoltaicos:* ${paineis} placas Tier 1 (585W)
• *Economia Estimada:* ~${economiaMensal}/mês
• *Economia Acumulada (25 anos):* ${economia25Anos}
• *Tempo de Retorno (Payback):* ~${resultado.payback} anos (${resultado.paybackMeses || Math.round(resultado.payback * 12)} meses)

Gostaria de solicitar uma visita técnica e proposta formal com financiamento da Perutche Solar!`;
}

/**
 * Motor completo de dimensionamento fotovoltaico para Guanambi e região
 * Utilizado pelos formulários interativos e gráficos de projeção
 */
export function calculateSolarSystem(input: SolarCalculationInput): SolarCalculationResult {
  const {
    monthlyBillValue,
    monthlyConsumptionKWh: directKWh,
    connectionType = 'bifasico',
  } = input;

  const tariff = TARIFA_COELBA;
  const cip = GUANAMBI_SOLAR_CONFIG.publicLightingAverage;
  const hsp = IRRADIACAO_GUANAMBI;
  const pr = 1 - PERDA_SISTEMA; // 0.78
  const panelWattage = GUANAMBI_SOLAR_CONFIG.standardPanelWattage;

  // Custo de disponibilidade em kWh
  const availabilityKWh = GUANAMBI_SOLAR_CONFIG.availabilityCostKWh[connectionType] || 50;

  // Consumo estimado em kWh
  let monthlyConsumptionKWh = directKWh || 0;
  if (!monthlyConsumptionKWh || monthlyConsumptionKWh <= 0) {
    const energyOnlyValue = Math.max(0, monthlyBillValue - cip);
    monthlyConsumptionKWh = Math.round(energyOnlyValue / tariff);
  }

  // Garantir consumo mínimo coerente
  monthlyConsumptionKWh = Math.max(monthlyConsumptionKWh, availabilityKWh + 30);

  // Potência de pico necessária (kWp) = kWh / (30.4 * HSP * PR)
  const systemSizeKWp = Number((monthlyConsumptionKWh / (30.4 * hsp * pr)).toFixed(2));

  // Número de placas (arredondado para cima)
  const totalWattsNeeded = systemSizeKWp * 1000;
  const panelCount = Math.max(2, Math.ceil(totalWattsNeeded / panelWattage));
  const actualSystemSizeKWp = Number(((panelCount * panelWattage) / 1000).toFixed(2));

  // Inversor recomendado
  const inverterPowerKW = Number(Math.max(1.5, Math.ceil(actualSystemSizeKWp * 0.85 * 2) / 2).toFixed(1));

  // Geração mensal esperada em Guanambi
  const monthlyGenerationKWh = Math.round(actualSystemSizeKWp * hsp * 30.4 * pr);

  // Nova conta de luz: Custo de disponibilidade + Taxa de Iluminação Pública
  const newMonthlyCost = Math.round((availabilityKWh * tariff) + cip);

  // Economia mensal e anual
  const currentMonthlyCost = Math.round(monthlyConsumptionKWh * tariff + cip);
  const monthlySavings = Math.max(0, currentMonthlyCost - newMonthlyCost);
  const annualSavings = monthlySavings * 12;

  // Investimento estimado com base no valor por Wp em Guanambi
  const estimatedInvestmentMin = Math.round(actualSystemSizeKWp * 1000 * GUANAMBI_SOLAR_CONFIG.costPerWpRange.min);
  const estimatedInvestmentMax = Math.round(actualSystemSizeKWp * 1000 * GUANAMBI_SOLAR_CONFIG.costPerWpRange.max);
  const averageInvestment = (estimatedInvestmentMin + estimatedInvestmentMax) / 2;

  // Payback
  const paybackMonths = monthlySavings > 0 ? Math.round(averageInvestment / monthlySavings) : 0;
  const paybackYears = Number((paybackMonths / 12).toFixed(1));

  // Projeção em 25 anos com inflação anual da energia (7%)
  const inflation = GUANAMBI_SOLAR_CONFIG.annualEnergyInflation;
  let accumulatedSavings = 0;
  const yearlyCashflow: SolarCalculationResult['yearlyCashflow'] = [];

  for (let year = 1; year <= 25; year++) {
    const yearInflationFactor = Math.pow(1 + inflation, year - 1);
    const yearWithoutSolar = Math.round(annualSavings * yearInflationFactor + (newMonthlyCost * 12 * yearInflationFactor));
    const yearWithSolar = Math.round(newMonthlyCost * 12 * yearInflationFactor);
    const currentYearSavings = yearWithoutSolar - yearWithSolar;
    accumulatedSavings += currentYearSavings;

    if (year <= 10 || year % 5 === 0) {
      yearlyCashflow.push({
        year,
        withoutSolar: Math.round(yearWithoutSolar),
        withSolar: Math.round(yearWithSolar),
        accumulatedSavings: Math.round(accumulatedSavings),
      });
    }
  }

  // Sustentabilidade
  const annualGenerationKWh = monthlyGenerationKWh * 12;
  const co2AvoidedTonsPerYear = Number(((annualGenerationKWh * GUANAMBI_SOLAR_CONFIG.co2FactorKgPerKWh) / 1000).toFixed(2));
  const treesPlantedEquivalent = Math.round(co2AvoidedTonsPerYear * GUANAMBI_SOLAR_CONFIG.treesPerTonCO2);

  return {
    monthlyConsumptionKWh,
    currentMonthlyCost,
    systemSizeKWp: actualSystemSizeKWp,
    panelCount,
    panelWattage,
    inverterPowerKW,
    monthlyGenerationKWh,
    newMonthlyCost,
    monthlySavings,
    annualSavings,
    savingsIn25Years: accumulatedSavings,
    estimatedInvestmentMin,
    estimatedInvestmentMax,
    paybackMonths,
    paybackYears,
    co2AvoidedTonsPerYear,
    treesPlantedEquivalent,
    yearlyCashflow,
  };
}

// Vitrine de Projetos Reais Executados em Guanambi e Região
export const PROJETOS_EXECUTADOS: ProjectShowcase[] = [
  {
    id: 'proj-ceramica-1',
    title: 'Cerâmica Industrial Vermelha',
    clientType: 'Industrial',
    location: 'Polo Cerâmico Regional - Guanambi / Caetité, BA',
    powerKWp: 95.5,
    panels: 160,
    annualSavings: 'R$ 118.000 / ano',
    description: 'Usinas de solo e cobertura dimensionadas para alimentar motores trifásicos pesados de 20cv, fornos e exaustores 24 horas. Uma das 72 cerâmicas mantidas pela Perutche na Bahia.',
    completionDate: 'Desde 2018',
    image: '/Imagens/night_house_no_sign.webp',
    badge: '👑 O Rei das Cerâmicas',
  },
  {
    id: 'proj-1',
    title: 'Residência Família Magalhães',
    clientType: 'Residencial',
    location: 'Bairro Santo Antônio - Guanambi, BA',
    powerKWp: 7.02,
    panels: 12,
    annualSavings: 'R$ 8.640 / ano',
    description: 'Sistema instalado sobre laje inclinada com microinversores. Cliente zerou a preocupação com o calor de Guanambi e o uso contínuo de 3 ares-condicionados.',
    completionDate: 'Outubro de 2024',
    image: '/Imagens/tropical_house_pickup.jpg',
    badge: '95% Economia',
  },
  {
    id: 'proj-2',
    title: 'Auto Peças e Mecânica Guanambi',
    clientType: 'Comercial',
    location: 'Av. Barão do Rio Branco - Guanambi, BA',
    powerKWp: 18.72,
    panels: 32,
    annualSavings: 'R$ 22.400 / ano',
    description: 'Instalação em telhado metálico trapezoidal. Alimentação completa de compressores, elevadores automotivos e escritório administrativo.',
    completionDate: 'Janeiro de 2025',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80',
    badge: 'Comercial',
  },
  {
    id: 'proj-4',
    title: 'Residência de Alto Padrão',
    clientType: 'Residencial',
    location: 'Bairro Paraíso - Guanambi, BA',
    powerKWp: 11.70,
    panels: 20,
    annualSavings: 'R$ 14.400 / ano',
    description: 'Estrutura de alumínio sem furos em telhado colonial. Geração diurna que zera o consumo noturno de piscina climatizada e 4 suítes com ar-condicionado.',
    completionDate: 'Fevereiro de 2025',
    image: '/Imagens/802032170_948638254961575_630070986708783277_n.webp',
    badge: 'Residencial Alto Padrão',
  },
  {
    id: 'proj-3',
    title: 'Fazenda Boa Esperança - Irrigação e Sede',
    clientType: 'Rural',
    location: 'Zona Rural (Ceraíma) - Guanambi, BA',
    powerKWp: 28.08,
    panels: 48,
    annualSavings: 'R$ 34.800 / ano',
    description: 'Sistema de solo com estrutura galvanizada a fogo. Acionamento de bomba trifásica de poço artesiano e energia para casas de colonos.',
    completionDate: 'Março de 2025',
    image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1200&q=80',
    badge: 'Agro Solar',
  },
];

// Perguntas Frequentes sobre Energia Solar em Guanambi
export const FAQS_SOLAR: FAQItem[] = [
  {
    question: 'Por que Guanambi é uma das melhores cidades do Brasil para energia solar?',
    answer: 'Guanambi e o sudoeste baiano possuem níveis excepcionais de irradiação solar (superiores a 5.7 kWh/m²/dia), muito acima da média nacional. Isso significa que o seu sistema gera mais energia por metro quadrado de placa, fazendo seu investimento se pagar mais rápido (em cerca de 2 a 3 anos).',
    category: 'economia',
  },
  {
    question: 'Quanto eu posso realmente economizar na minha conta de luz?',
    answer: 'A economia pode chegar a até 95% do valor da sua fatura atual. Pela regulamentação da ANEEL e da Coelba, você continuará pagando apenas o custo de disponibilidade mínimo da concessionária (30kWh monofásico, 50kWh bifásico ou 100kWh trifásico) mais a taxa municipal de iluminação pública (CIP).',
    category: 'economia',
  },
  {
    question: 'Como funciona a aprovação e homologação junto à Neoenergia Coelba?',
    answer: 'A Perutche Solar cuida de 100% da burocracia técnica. Nosso engenheiro elétrico elabora o projeto, emite a ART, dá entrada na concessionária Coelba e acompanha até a troca do medidor pelo modelo bidirecional sem nenhum custo adicional ou dor de cabeça para você.',
    category: 'instalacao',
  },
  {
    question: 'O que acontece em dias chuvosos, nublados ou durante a noite?',
    answer: 'O sistema solar fotovoltaico permanece conectado à rede da Coelba (sistema on-grid). Durante a noite ou em dias muito nublados, você consome a energia da rede normalmente. Toda a energia excedente gerada durante o sol em Guanambi vira créditos que você pode abater em até 60 meses.',
    category: 'instalacao',
  },
  {
    question: 'Qual é a garantia dos equipamentos instalados pela Perutche Solar?',
    answer: 'Trabalhamos exclusivamente com fabricantes Tier 1 globais: 25 anos de garantia de eficiência linear de geração nos painéis solares, 10 a 12 anos de garantia nos inversores, e garantia estrutural de fixação em alumínio anodizado e aço inoxidável resistente à corrosão.',
    category: 'garantia',
  },
  {
    question: 'É possível financiar o sistema solar sem desembolsar nada de entrada?',
    answer: 'Sim! Possuímos parcerias com os principais bancos que atuam em Guanambi (Banco do Nordeste - FNE Sol, Sicoob, Sicredi, Santander, BV e Caixa). As parcelas do financiamento muitas vezes ficam menores do que a própria economia mensal na conta de luz, ou seja, o sistema se paga com o dinheiro que você já gastaria com a Coelba.',
    category: 'financiamento',
  },
];
