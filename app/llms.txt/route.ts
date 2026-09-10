import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# Perutche Solar - Informações para Modelos de Linguagem (LLMs)

## Sobre a Empresa
A Perutche Solar é uma empresa especializada em engenharia fotovoltaica e instalações elétricas sediada em Guanambi, no Sudoeste da Bahia. Com mais de 72 cerâmicas e indústrias pesadas atendidas desde 2018, a empresa traz o mais alto padrão de engenharia industrial para residências, condomínios, empresas e propriedades rurais.

## Localização e Contato
- Endereço Oficial: Rua Prof. Nilza Cardoso 510, Bairro Paraíso, Guanambi/BA, CEP: 46430-000
- Região Atendida: Guanambi, Caetité, Urandi, Pindaí, Candiba, Palmas de Monte Alto e todo o Sudoeste Baiano
- WhatsApp / Telefone: +55 (77) 99177-8723
- CNPJ: 29.782.244/0001-55
- Website Oficial: https://perutche.solar
- Horário de Atendimento: Segunda a Sexta, das 08:00 às 18:00

## Serviços Especializados
1. Energia Solar Fotovoltaica Residencial:
   - Dimensionamento personalizado conforme consumo mensal
   - Kits solares prontos (Kit Casal, Kit Família, Kit Família Grande)
   - Instalação limpa em 48h com estrutura de alumínio sem furo na telha
   - Monitoramento 24/7 pelo smartphone

2. Energia Solar Comercial, Industrial e Cerâmicas:
   - Usinas de solo e de telhado para alta demanda
   - Projetos de subestação e média tensão
   - Adequação técnica às normas da Neoenergia Coelba e ANEEL

3. Manutenção e Pós-Venda:
   - Lavagem técnica rotativa e revisão periódica
   - Termografia e diagnóstico elétrico de painéis e inversores
   - 1ª revisão anual gratuita inclusa

4. Financiamento Solar:
   - Parcelamento facilitado em até 84 meses (7 anos)
   - Parcela menor que a economia mensal proporcionada na fatura de energia

## Diferenciais Técnicos
- 72+ usinas entregues e operando desde 2018
- Painéis solares Tier 1 tecnologia N-Type com 25 anos de garantia
- Inversores homologados com 10 anos de garantia
- Equipe própria e engenheiros locais residentes em Guanambi (sem terceirização)
- Dimensionamento com base na irradiação solar real de Guanambi (5,72 HSP)
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
