export type ConnectionType = 'monofasico' | 'bifasico' | 'trifasico';

export type PropertyType = 'residencial' | 'comercial' | 'rural' | 'industrial';

/**
 * Interface principal para dados de entrada da calculadora residencial
 */
export interface CalculatorData {
  conta: number; // Valor médio da conta de luz em R$
  pessoas: number; // Quantidade de residentes no imóvel
  arCondicionado: number; // Quantidade de aparelhos de ar-condicionado (ou boolean se tem/não tem)
  piscina: boolean; // Possui bomba/aquecimento de piscina
  chuveiro: number; // Quantidade de chuveiros elétricos
  geladeiraExtra?: number; // Quantidade de geladeiras ou freezers extras (108 kWh/mês cada)
  tipoLigacao?: ConnectionType; // Monofásico, bifásico ou trifásico
  cidade?: string; // Padrão: Guanambi - BA
  nome?: string; // Nome opcional do lead
  telefone?: string; // WhatsApp do lead
}

/**
 * Interface principal para resultado consolidado de dimensionamento solar
 */
export interface SolarResult {
  economiaMensal: number; // Economia estimada em R$/mês
  economiaAnual?: number; // Economia anual em R$/ano
  economia25Anos: number; // Economia acumulada projetada em 25 anos com inflação energética
  payback: number; // Tempo de retorno do investimento (em anos)
  paybackMeses?: number; // Tempo de retorno do investimento (em meses)
  kwpNecessario: number; // Potência de pico necessária em kWp
  paineisSugeridos?: number; // Quantidade de módulos fotovoltaicos
  geracaoMensalKWh?: number; // Geração mensal estimada em kWh
  investimentoEstimado?: {
    min: number;
    max: number;
  };
}

/**
 * Interface para kits solares residenciais pré-dimensionados
 */
export interface KitResidencial {
  id?: string;
  nome: string; // Ex: 'Essencial Guanambi', 'Família Conforto'
  paineis: number; // Quantidade de módulos (ex: 6, 10, 16)
  faixaConta: string; // Faixa de fatura atendida (ex: 'R$ 300 a R$ 500')
  economia: number; // Economia média mensal em R$
  parcela: number; // Valor estimado da parcela de financiamento solar em R$
  potenciaKWp?: number;
  popular?: boolean;
}

export interface SolarCalculationInput {
  monthlyBillValue: number; // in BRL (R$)
  monthlyConsumptionKWh?: number; // optional direct kWh input
  connectionType: ConnectionType;
  propertyType: PropertyType;
  roofOrientation?: 'norte' | 'leste_oeste' | 'sul';
}

export interface SolarCalculationResult {
  monthlyConsumptionKWh: number;
  currentMonthlyCost: number;
  systemSizeKWp: number;
  panelCount: number;
  panelWattage: number;
  inverterPowerKW: number;
  monthlyGenerationKWh: number;
  newMonthlyCost: number; // minimum fee (taxa de disponibilidade) + iluminação pública
  monthlySavings: number;
  annualSavings: number;
  savingsIn25Years: number;
  estimatedInvestmentMin: number;
  estimatedInvestmentMax: number;
  paybackMonths: number;
  paybackYears: number;
  co2AvoidedTonsPerYear: number;
  treesPlantedEquivalent: number;
  yearlyCashflow: {
    year: number;
    withoutSolar: number;
    withSolar: number;
    accumulatedSavings: number;
  }[];
}

export interface SolarKit {
  id: string;
  name: string;
  tagline: string;
  monthlyAverageKWh: number;
  typicalBillRange: string;
  panelCount: number;
  inverterKW: number;
  estimatedSavingsMonthly: number;
  features: string[];
  popular?: boolean;
  recommendedFor: string;
}

export interface ProjectShowcase {
  id: string;
  title: string;
  clientType: 'Residencial' | 'Comercial' | 'Rural' | 'Industrial';
  location: string;
  powerKWp: number;
  panels: number;
  annualSavings: string;
  description: string;
  completionDate: string;
  image: string;
  badge?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'economia' | 'instalacao' | 'garantia' | 'financiamento';
}

export type { SolarAssumptions, EquipamentoResidencialInfo } from './tariffs';
export { DEFAULT_SOLAR_ASSUMPTIONS, TABELA_RESIDENCIAL_EQUIPAMENTOS } from './tariffs';
