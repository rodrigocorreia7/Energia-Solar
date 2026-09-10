/**
 * Parâmetros de Tarifa e Irradiação Solar para Guanambi - Bahia (Neoenergia Coelba)
 * Referências oficiais: ANEEL, CRESESB / NASA SSE e histórico climático regional.
 */

// Constantes oficiais solicitadas
export const TARIFA_COELBA = 0.92; // Tarifa média de energia elétrica com tributos em R$/kWh (Neoenergia Coelba)
export const IRRADIACAO_GUANAMBI = 5.72; // Irradiação solar média diária em Guanambi - BA (kWh/m²/dia - HSP)
export const TAXA_MINIMA = 78.40; // Custo mínimo de disponibilidade da rede + CIP estimada em R$
export const PERDA_SISTEMA = 0.22; // Perdas globais do sistema fotovoltaico (22% - poeira, temperatura, cabos, inversor)
export const DIAS_SOL_ANO = 280; // Média de dias de sol pleno por ano no Sudoeste Baiano

/**
 * Premissas técnicas parametrizáveis (não hardcoded como verdade absoluta)
 */
export interface SolarAssumptions {
  city: string;
  irradiation: number;          // 5.72 kWh/m²/dia
  tariff: number;               // 0.92 R$/kWh Coelba (atualizar periodicamente)
  minimumCharge: number;        // R$ 78.40
  systemLoss: number;           // 0.78 performance ratio (ou 0.22 de perdas térmicas/sujeira)
  degradation: number;          // 0.005 (0.5%/ano)
  tariffDate: string;           // "2026-09"
}

export const DEFAULT_SOLAR_ASSUMPTIONS: SolarAssumptions = {
  city: 'Guanambi',
  irradiation: 5.72,
  tariff: 0.92,
  minimumCharge: 78.40,
  systemLoss: 0.78,
  degradation: 0.005,
  tariffDate: '2026-09',
};

/**
 * Base de Cálculo Residencial com Potências Médias e Gatilhos de Vantagem
 */
export interface EquipamentoResidencialInfo {
  id: 'ar' | 'chuveiro' | 'geladeira' | 'piscina' | 'outros';
  nome: string;
  potenciaMediaKw: number;
  usoDiaHoras: number;
  consumoMesKwh: number;
  percentualConta: number;
  gatilhoVantagem: string;
  icone: string;
}

export const TABELA_RESIDENCIAL_EQUIPAMENTOS: EquipamentoResidencialInfo[] = [
  {
    id: 'ar',
    nome: 'Ar 12.000 BTU Inverter',
    potenciaMediaKw: 1.0,
    usoDiaHoras: 8,
    consumoMesKwh: 240,
    percentualConta: 35,
    gatilhoVantagem: 'Deixa ligado a noite toda sem culpa',
    icone: '❄️',
  },
  {
    id: 'chuveiro',
    nome: 'Chuveiro Elétrico',
    potenciaMediaKw: 5.5,
    usoDiaHoras: 1,
    consumoMesKwh: 165,
    percentualConta: 24,
    gatilhoVantagem: 'Zera isso com solar + boiler',
    icone: '🚿',
  },
  {
    id: 'geladeira',
    nome: 'Geladeira Duplex',
    potenciaMediaKw: 0.15,
    usoDiaHoras: 24,
    consumoMesKwh: 108,
    percentualConta: 15,
    gatilhoVantagem: 'Consome até desligada. Solar paga 24h',
    icone: '🧊',
  },
  {
    id: 'piscina',
    nome: 'Bomba de Piscina 1 cv',
    potenciaMediaKw: 0.75,
    usoDiaHoras: 4,
    consumoMesKwh: 90,
    percentualConta: 13,
    gatilhoVantagem: 'Piscina vira custo zero',
    icone: '🏊',
  },
  {
    id: 'outros',
    nome: 'Máquina + Iluminação (Outros)',
    potenciaMediaKw: 0.5,
    usoDiaHoras: 3,
    consumoMesKwh: 45,
    percentualConta: 7,
    gatilhoVantagem: 'O resto da casa entra de brinde',
    icone: '💡',
  },
];

/**
 * Configuração consolidada de parâmetros solares para Guanambi - BA
 */
export const GUANAMBI_SOLAR_CONFIG = {
  city: 'Guanambi',
  state: 'BA',
  region: 'Sudoeste Baiano / Sertão Produtivo',
  
  // Horas de Sol Pleno (HSP) média em Guanambi (kWh/m²/dia)
  averageDailyHSP: IRRADIACAO_GUANAMBI,
  
  // Fator de performance padrão de sistemas fotovoltaicos (PR = 1 - PERDA_SISTEMA = 0.78)
  performanceRatio: 1 - PERDA_SISTEMA,

  // Tarifa média com tributos Neoenergia Coelba (Residencial B1)
  averageTariffPerKWh: TARIFA_COELBA,

  // Taxa de iluminação pública estimada média em Guanambi (CIP)
  publicLightingAverage: 28.00,

  // Taxa mínima padrão de conexão
  minimumMonthlyFee: TAXA_MINIMA,

  // Custo de disponibilidade mínimo por tipo de ligação (Resolução Normativa ANEEL)
  availabilityCostKWh: {
    monofasico: 30, // 30 kWh (~R$ 27,60 + CIP)
    bifasico: 50,   // 50 kWh (~R$ 46,00 + CIP)
    trifasico: 100, // 100 kWh (~R$ 92,00 + CIP)
  },

  // Potência padrão dos módulos fotovoltaicos utilizados (Tier 1 Bifacial N-Type)
  standardPanelWattage: 585, // 585 Wp

  // Custo médio por Wp instalado em Guanambi e região (em R$)
  costPerWpRange: {
    min: 2.80,
    max: 3.45,
  },

  // Inflação energética média anual estimada no Brasil para projeção de 25 anos
  annualEnergyInflation: 0.07, // 7% a.a.

  // Fator de emissão de carbono evitado (kg CO2 por kWh gerado no SIN)
  co2FactorKgPerKWh: 0.084,

  // Equivalente de árvores por tonelada de CO2 evitada por ano
  treesPerTonCO2: 7.1,

  // Dias de sol por ano
  sunnyDaysPerYear: DIAS_SOL_ANO,

  // Dados de contato e atendimento Perutche Solar em Guanambi
  contact: {
    whatsapp: '5577991778723',
    whatsappSecondary: '5577991279257',
    whatsappDisplay: '(77) 99177-8723',
    whatsappSecondaryDisplay: '(77) 99127-9257',
    phone: '(77) 99177-8723',
    phoneSecondary: '(77) 99127-9257',
    email: 'contato@perutchesolar.com.br',
    website: 'https://www.perutchesolar.com.br',
    instagram: 'https://instagram.com/perutche.solar',
    instagramHandle: '@perutche.solar',
    address: 'Rua Prof. Nilza Cardoso, 510, Bairro Paraíso - Guanambi, BA',
    openingHours: 'Segunda a Sexta: 07:30 às 18:00 | Sábado: 08:00 às 12:00',
  }
};
