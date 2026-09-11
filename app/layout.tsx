import React from 'react';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { WhatsAppFloat } from '../components/ui/WhatsAppFloat';
import { ChatbotChrisFloat } from '../components/ui/ChatbotChrisFloat';
import { localBusinessStructuredData } from '../lib/seo/structuredData';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Perutche Solar - Energia Solar em Guanambi, BA',
  description:
    'Zere sua conta de luz com energia solar. 72+ cerâmicas atendidas desde 2018. Financiamento em 84x. Rua Nilza Cardoso 510, Guanambi.',
  keywords: ['energia solar guanambi', 'placa solar bahia', 'energia solar residencial'],
  authors: [{ name: 'Perutche Solar' }],
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Perutche Solar - Energia Solar em Guanambi',
    description: 'Zere sua conta de luz com energia solar',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Perutche Solar',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="shortcut icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessStructuredData),
          }}
        />
      </head>
      <body className="bg-white text-gray-900 font-sans antialiased min-h-dvh flex flex-col selection:bg-[#E51E25] selection:text-white">
        {/* Link de salto acessível para navegação via teclado / leitores de tela */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-2.5 focus:bg-[#E51E25] focus:text-white focus:font-bold focus:rounded-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Pular para o conteúdo principal
        </a>

        {children}
        {/* Chatbot Chris (IA) e WhatsApp flutuantes em todas as páginas */}
        <ChatbotChrisFloat />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
