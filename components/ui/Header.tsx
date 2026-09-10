'use client';

import React, { useState } from 'react';
import { Sun, Menu, X, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { GUANAMBI_SOLAR_CONFIG } from '../../lib/solar/tariffs';
import { Button } from './Button';

export interface HeaderProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath = '/', onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  React.useEffect(() => {
    if (currentPath !== '/') {
      setIsScrolledPastHero(true);
      return;
    }

    const handleScroll = () => {
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        setIsScrolledPastHero(rect.bottom <= 80);
      } else {
        setIsScrolledPastHero(window.scrollY > 300);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  const isHeroMode = currentPath === '/' && !isScrolledPastHero;

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Início', path: '/' },
    { label: 'Simulador Solar', path: '/simular' },
    { label: 'Projetos em Guanambi', path: '/projetos' },
  ];

  const whatsappUrl = `https://wa.me/${GUANAMBI_SOLAR_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
    'Olá, Perutche Solar! Acessei o site e gostaria de falar com um consultor em Guanambi.'
  )}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
        isHeroMode
          ? 'bg-black/30 backdrop-blur-md border-b border-white/15 text-white shadow-lg'
          : 'bg-white/95 backdrop-blur-xl border-b border-gray-200/80 text-gray-900 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a
            href="/"
            onClick={(e) => handleNav(e, '/')}
            aria-label="Página inicial Perutche Solar Guanambi"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E51E25] rounded-xl"
          >
            <div
              className={`transition-all duration-300 ${
                isHeroMode
                  ? 'bg-white/95 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/30 shadow-md group-hover:bg-white'
                  : ''
              }`}
            >
              <img
                src="/Imagens/Logo Perutche.png"
                alt="Perutche Solar Soluções Energéticas"
                className="h-8 sm:h-9 w-auto object-contain group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleNav(e, link.path)}
                  className={`text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E51E25] rounded-md px-1 py-0.5 ${
                    isActive
                      ? isHeroMode
                        ? 'text-white font-bold border-b-2 border-[#E51E25]'
                        : 'text-[#E51E25] font-bold border-b-2 border-[#E51E25]'
                      : isHeroMode
                        ? 'text-white/85 hover:text-[#E51E25]'
                        : 'text-gray-700 hover:text-[#E51E25]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${GUANAMBI_SOLAR_CONFIG.contact.phone.replace(/\D/g, '')}`}
              aria-label={`Ligar para o telefone ${GUANAMBI_SOLAR_CONFIG.contact.phone}`}
              className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E51E25] ${
                isHeroMode
                  ? 'text-white/90 hover:text-white hover:bg-white/10'
                  : 'text-gray-700 hover:text-[#E51E25] hover:bg-gray-100'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="font-semibold">{GUANAMBI_SOLAR_CONFIG.contact.phone}</span>
            </a>

            <Button
              id="header-cta-simular"
              size="sm"
              variant="primary"
              href="/simular"
              aria-label="Simular economia solar agora"
              onClick={(e) => handleNav(e, '/simular')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              className="focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E51E25] shadow-md shadow-red-500/20"
            >
              Simular Agora
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E51E25] transition-colors ${
              isHeroMode
                ? 'bg-black/40 text-white border-white/20 hover:bg-black/60'
                : 'bg-gray-100 text-gray-700 hover:text-gray-900 border-gray-200'
            }`}
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="md:hidden bg-white text-gray-900 border-b border-gray-200 px-4 py-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-2">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleNav(e, link.path)}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  currentPath === link.path
                    ? 'bg-[#E51E25] text-white font-bold'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-200 space-y-3">
            <Button
              fullWidth
              size="md"
              variant="primary"
              href="/simular"
              onClick={(e) => handleNav(e, '/simular')}
            >
              Simular Minha Economia
            </Button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
