import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projetos Realizados | Perutche Solar Guanambi',
  description: 'Conheça usinas e sistemas solares instalados e homologados pela Perutche Solar em Guanambi e sudoeste baiano. Engenharia de alta performance.',
  keywords: [
    'Projetos Solares Guanambi',
    'Instalações Fotovoltaicas Bahia',
    'Usinas Solares Guanambi',
    'Perutche Solar Projetos',
  ],
  openGraph: {
    title: 'Projetos Realizados | Perutche Solar Guanambi',
    description: 'Conheça usinas e sistemas solares instalados e homologados pela Perutche Solar em Guanambi e sudoeste baiano.',
    type: 'website',
  },
};

export default function ProjetosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
