'use client';

import React from 'react';
import { Sun, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import { GUANAMBI_SOLAR_CONFIG } from '../../lib/solar/tariffs';

export interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0B0F19] text-white text-sm relative overflow-hidden border-t border-slate-800">
      {/* Linha sutil de destaque no topo do rodapé */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#E51E25] to-transparent opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-2xl inline-block shadow-sm">
              <img
                src="/Imagens/Logo Perutche.png"
                alt="Perutche Solar Soluções Energéticas"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white font-bold">O Rei das Cerâmicas</strong> e líder em engenharia solar na Bahia. Projetos de alta performance para residências, comércios e indústrias em Guanambi e todo o Sudoeste Baiano.
            </p>
            <div className="space-y-1.5 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-200">Projetos 100% Homologados Coelba</span>
              </div>
              <div className="text-[11px] text-amber-300/90 pl-6">
                Residencial • Comercial • Industrial
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm tracking-wider uppercase mb-4">
              Navegação
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <a href="/" onClick={(e) => handleNav(e, '/')} className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Início
                </a>
              </li>
              <li>
                <a href="/simular" onClick={(e) => handleNav(e, '/simular')} className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Simulador de Economia
                </a>
              </li>
              <li>
                <a href="/projetos" onClick={(e) => handleNav(e, '/projetos')} className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Projetos Realizados em Guanambi
                </a>
              </li>
              <li>
                <a href="/#segmentos" onClick={(e) => handleNav(e, '/#segmentos')} className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Soluções por Segmento
                </a>
              </li>
              <li>
                <a href="/#kits" onClick={(e) => handleNav(e, '/')} className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Kits Residenciais
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-white text-sm tracking-wider uppercase mb-4">
              Atendimento & Contato
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-snug">{GUANAMBI_SOLAR_CONFIG.contact.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-white font-semibold">{GUANAMBI_SOLAR_CONFIG.contact.whatsappDisplay}</span>
                  <span className="text-slate-400 font-medium text-xs mt-0.5">{GUANAMBI_SOLAR_CONFIG.contact.whatsappSecondaryDisplay}</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-300">{GUANAMBI_SOLAR_CONFIG.contact.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{GUANAMBI_SOLAR_CONFIG.contact.openingHours}</span>
              </li>
            </ul>
          </div>

          {/* Regional coverage */}
          <div>
            <h4 className="font-bold text-white text-sm tracking-wider uppercase mb-4">
              Cidades Atendidas
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-3.5">
              Atendemos todo o Sudoeste Baiano com equipe própria e equipamentos à pronta entrega:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['Guanambi', 'Caetité', 'Urandi', 'Pindaí', 'Candiba', 'Palmas de Monte Alto', 'Riacho de Santana', 'Iuiu', 'Matina'].map((city) => (
                <span
                  key={city}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700/80 text-[11px] font-medium text-slate-200 hover:border-amber-400/40 hover:text-white transition-colors"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-14 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Perutche Solar. CNPJ: 29.782.244/0001-55. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1 text-slate-400">
            Guanambi, Bahia • A Capital do Algodão e da Energia Limpa
          </p>
        </div>
      </div>
    </footer>
  );
};
