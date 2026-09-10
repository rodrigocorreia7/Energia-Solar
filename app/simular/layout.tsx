import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Simulador de Energia Solar | Perutche Solar',
  description: 'Calcule sua economia em Guanambi',
  keywords: [
    'Simulador Solar Guanambi',
    'Calculadora Solar Guanambi',
    'Economia Coelba Guanambi',
    'Perutche Solar Simulador',
  ],
  openGraph: {
    title: 'Simulador de Energia Solar | Perutche Solar',
    description: 'Calcule sua economia em Guanambi',
    type: 'website',
  },
};

export default function SimularLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
