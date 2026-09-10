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
    <footer className="bg-[#E51E25] text-white text-sm relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-2xl inline-block shadow-sm">
              <img
                src="/Imagens/Logo Perutche.png"
                alt="Perutche Solar Soluções Energéticas"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-red-100 leading-relaxed">
              <strong>O Rei das Cerâmicas</strong> e líder em energia solar na Bahia. Projetos de alta performance para residências, comércios e indústrias em Guanambi e todo o Sudoeste Baiano.
            </p>
            <div className="space-y-1 text-xs text-white/95 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Projetos 100% Homologados Coelba</span>
              </div>
              <div className="text-[11px] text-amber-200 pl-6">
                Residencial • Comercial • Industrial
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Navegação</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="/" onClick={(e) => handleNav(e, '/')} className="text-red-100 hover:text-white transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="/simular" onClick={(e) => handleNav(e, '/simular')} className="text-red-100 hover:text-white transition-colors">
                  Simulador de Economia
                </a>
              </li>
              <li>
                <a href="/projetos" onClick={(e) => handleNav(e, '/projetos')} className="text-red-100 hover:text-white transition-colors">
                  Projetos Realizados em Guanambi
                </a>
              </li>
              <li>
                <a href="/#segmentos" onClick={(e) => handleNav(e, '/#segmentos')} className="text-red-100 hover:text-white transition-colors">
                  Soluções por Segmento
                </a>
              </li>
              <li>
                <a href="/#kits" onClick={(e) => handleNav(e, '/')} className="text-red-100 hover:text-white transition-colors">
                  Kits Residenciais
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Atendimento & Contato</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span className="text-white">{GUANAMBI_SOLAR_CONFIG.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-white font-semibold">{GUANAMBI_SOLAR_CONFIG.contact.whatsappDisplay}</span>
                  <span className="text-red-100 font-medium">{GUANAMBI_SOLAR_CONFIG.contact.whatsappSecondaryDisplay}</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="text-red-100">{GUANAMBI_SOLAR_CONFIG.contact.email}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span className="text-red-100">{GUANAMBI_SOLAR_CONFIG.contact.openingHours}</span>
              </li>
            </ul>
          </div>

          {/* Regional coverage */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Cidades Atendidas</h4>
            <p className="text-xs text-red-100 leading-relaxed mb-3">
              Atendemos todo o Sudoeste Baiano com equipe própria e equipamentos à pronta entrega:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['Guanambi', 'Caetité', 'Urandi', 'Pindaí', 'Candiba', 'Palmas de Monte Alto', 'Riacho de Santana', 'Iuiu', 'Matina'].map((city) => (
                <span
                  key={city}
                  className="px-2.5 py-1 rounded-md bg-white/15 border border-white/20 text-[11px] font-medium text-white shadow-xs"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-red-100/90">
          <p>© {new Date().getFullYear()} Perutche Solar. CNPJ: 29.782.244/0001-55. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Guanambi, Bahia • A Capital do Algodão e da Energia Limpa
          </p>
        </div>
      </div>
    </footer>
  );
};
