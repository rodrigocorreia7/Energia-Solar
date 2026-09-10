import React from 'react';
import type { Metadata } from 'next';
import { Header } from '../../components/ui/Header';
import { Footer } from '../../components/ui/Footer';

// Definição de Metadados SEO para a seção de marketing e landing page
export const metadata: Metadata = {
  title: 'Energia Solar Residencial em Guanambi | Perutche Solar',
  description: 'Zere sua conta de luz. 72+ cerâmicas atendidas. Financiamento em 84x.',
  keywords: [
    'Energia Solar Guanambi',
    'Energia Solar Residencial',
    'Perutche Solar',
    'Financiamento 84x',
    'Reduzir conta Coelba',
    'Placas Solares Guanambi BA',
  ],
  openGraph: {
    title: 'Energia Solar Residencial em Guanambi | Perutche Solar',
    description: 'Zere sua conta de luz. 72+ cerâmicas atendidas. Financiamento em 84x.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Perutche Solar',
  },
};

export interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-dvh flex flex-col bg-white text-gray-900 font-sans">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
