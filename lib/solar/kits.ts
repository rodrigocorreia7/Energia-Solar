import { KitResidencial, SolarKit } from './types';

/**
 * Array de kits residenciais padrão conforme especificação de dimensionamento para Guanambi
 */
export const KITS_RESIDENCIAIS_LIST: KitResidencial[] = [
  {
    id: 'kit-casal',
    nome: 'Kit Casal',
    paineis: 6,
    faixaConta: 'Até R$ 250',
    economia: 215,
    parcela: 179,
    potenciaKWp: 3.51,
    popular: false,
  },
  {
    id: 'kit-familia',
    nome: 'Kit Família',
    paineis: 10,
    faixaConta: 'Até R$ 450',
    economia: 410,
    parcela: 289,
    potenciaKWp: 5.85,
    popular: true, // Destaque: MAIS VENDIDO
  },
  {
    id: 'kit-familia-grande',
    nome: 'Kit Família Grande',
    paineis: 16,
    faixaConta: 'Até R$ 750',
    economia: 690,
    parcela: 469,
    potenciaKWp: 9.36,
    popular: false,
  },
];

// Alias para exportação padrão solicitada
export const kitsResidenciais = KITS_RESIDENCIAIS_LIST;

/**
 * Kits com detalhes completos de equipamentos e componentes para vitrine institucional
 */
export const KITS_RESIDENCIAIS: SolarKit[] = [
  {
    id: 'kit-casal',
    name: 'Kit Casal',
    tagline: 'Ideal para casais e residências compactas com conta até R$ 250',
    monthlyAverageKWh: 320,
    typicalBillRange: 'Até R$ 250 / mês',
    panelCount: 6,
    inverterKW: 3.0,
    estimatedSavingsMonthly: 215,
    popular: false,
    features: [
      '6 Painéis Monocristalinos N-Type Tier 1 (585W)',
      '1 Inversor String monofásico/bifásico 3kW com Wi-Fi',
      'Monitoramento 24h via aplicativo no smartphone',
      'Estrutura em alumínio reforçada contra vendavais',
      'Homologação completa junto à Neoenergia Coelba',
    ],
    recommendedFor: 'Residências de até 2 pessoas com 1 ar-condicionado moderado e geladeira',
  },
  {
    id: 'kit-familia',
    name: 'Kit Família',
    tagline: 'O MAIS VENDIDO em Guanambi! Conforto para a família sem susto na conta',
    monthlyAverageKWh: 560,
    typicalBillRange: 'Até R$ 450 / mês',
    panelCount: 10,
    inverterKW: 5.0,
    estimatedSavingsMonthly: 410,
    popular: true, // Destaque MAIS VENDIDO
    features: [
      '10 Painéis Monocristalinos Bifaciais 585W Tier 1',
      '1 Inversor Inteligente 5kW com módulo Wi-Fi integrado',
      'String box com DPS CC/CA tipo II e disjuntores',
      'Aplicativo completo de telemetria solar em tempo real',
      'Instalação com engenheiro eletricista responsável (ART)',
      'Garantia de 25 anos na geração dos módulos',
    ],
    recommendedFor: 'Casas com 3 a 4 pessoas, 2 ares-condicionados, freezer e eletrodomésticos',
  },
  {
    id: 'kit-familia-grande',
    name: 'Kit Família Grande',
    tagline: 'Para residências amplas, climatização contínua e alto consumo',
    monthlyAverageKWh: 980,
    typicalBillRange: 'Até R$ 750 / mês',
    panelCount: 16,
    inverterKW: 8.0,
    estimatedSavingsMonthly: 690,
    popular: false,
    features: [
      '16 Painéis Alta Potência Bifaciais N-Type 585W',
      '1 Inversor Trifásico ou Bifásico de 8kW de última geração',
      'Monitoramento individualizado por string de placas',
      'Estrutura de fixação premium para qualquer tipo de telha',
      'Homologação ágil e troca rápida do medidor Coelba',
      'Primeira revisão preventiva gratuita inclusa',
    ],
    recommendedFor: 'Casas com 3+ aparelhos de ar-condicionado, piscina, área gourmet e freezers',
  },
];
