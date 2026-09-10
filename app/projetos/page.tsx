'use client';

import React, { useState } from 'react';
import { Header } from '../../components/ui/Header';
import { Footer } from '../../components/ui/Footer';
import { PROJETOS_EXECUTADOS } from '../../lib/solar/calculators';
import { GUANAMBI_SOLAR_CONFIG } from '../../lib/solar/tariffs';
import { Button } from '../../components/ui/Button';
import { MapPin, Zap, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, MessageCircle, Search } from 'lucide-react';

export interface ProjetosPageProps {
  onNavigate?: (path: string) => void;
}

export default function ProjetosPage({ onNavigate }: ProjetosPageProps) {
  const [filter, setFilter] = useState<'Todos' | 'Residencial' | 'Comercial' | 'Industrial' | 'Rural'>('Todos');

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const filteredProjects = filter === 'Todos'
    ? PROJETOS_EXECUTADOS
    : PROJETOS_EXECUTADOS.filter((p) => p.clientType === filter);

  const whatsappGeneralUrl = `https://wa.me/${GUANAMBI_SOLAR_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
    'Olá! Vi os projetos da Perutche Solar no site e gostaria de um projeto semelhante para meu imóvel em Guanambi.'
  )}`;

  return (
    <div className="min-h-dvh flex flex-col bg-white text-gray-900">
      <Header currentPath="/projetos" onNavigate={onNavigate} />

      <main id="main-content" className="flex-1 pt-24 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <a
              href="/"
              onClick={(e) => handleNav(e, '/')}
              className="inline-flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-[#E51E25] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar para a Página Inicial
            </a>
          </div>

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FEF3C7] border border-amber-300 text-xs font-semibold text-[#F59E0B] uppercase tracking-wider mb-3">
              Portfólio de Obras em Guanambi e Região
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight text-balance">
              Projetos Realizados com Excelência
            </h1>
            <p className="mt-4 text-base text-gray-600 text-pretty">
              Conheça algumas das usinas solares instaladas e homologadas pela equipe de engenharia da Perutche Solar no sudoeste baiano.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {(['Todos', 'Residencial', 'Comercial', 'Industrial', 'Rural'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  filter === cat
                    ? 'bg-[#E51E25] text-white shadow-md shadow-[#E51E25]/20'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid or Empty State */}
          {filteredProjects.length === 0 ? (
            <div className="py-16 px-6 text-center bg-gray-50 border border-dashed border-gray-300 rounded-3xl max-w-xl mx-auto my-8">
              <div className="size-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#F59E0B] flex items-center justify-center mx-auto mb-4">
                <Search className="size-8 text-[#F59E0B]" strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Nenhum projeto encontrado nesta categoria
              </h3>
              <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto leading-relaxed">
                Não localizamos usinas cadastradas sob o filtro &quot;{filter}&quot;. Você pode redefinir para ver todas as instalações ou solicitar um orçamento sob medida.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Button
                  id="btn-empty-reset-filter"
                  variant="outline"
                  size="sm"
                  onClick={() => setFilter('Todos')}
                >
                  Ver Todos os Projetos
                </Button>
                <Button
                  id="btn-empty-contact-engineer"
                  variant="primary"
                  size="sm"
                  whatsappIcon
                  href={whatsappGeneralUrl}
                  target="_blank"
                >
                  Falar com Engenheiro
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white border border-gray-200 hover:border-[#E51E25]/50 rounded-3xl overflow-hidden transition-all duration-300 group flex flex-col justify-between shadow-sm hover:shadow-md"
                >
                  <div>
                    {/* Image banner */}
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                      
                      {project.badge && (
                        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#E51E25] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                          {project.badge}
                        </span>
                      )}

                      <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                        <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 shadow-sm flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>{project.powerKWp} kWp instalados</span>
                        </div>
                        <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-700 shadow-sm">
                          {project.annualSavings}
                        </div>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <MapPin className="w-4 h-4 text-[#E51E25]" />
                        <span>{project.location}</span>
                      </div>

                      <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-[#E51E25] transition-colors mb-3">
                        {project.title}
                      </h3>

                      <p className="text-sm text-gray-600 leading-relaxed mb-6">
                        {project.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-200 text-xs">
                        <div>
                          <span className="text-gray-500 block">Número de Painéis:</span>
                          <strong className="text-gray-900 font-semibold text-sm">{project.panels} módulos 585W</strong>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Data de Conclusão:</span>
                          <strong className="text-gray-900 font-semibold text-sm">{project.completionDate}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="p-6 sm:p-8 pt-0">
                    <a
                      href={`https://wa.me/${GUANAMBI_SOLAR_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                        `Olá! Gostei do projeto "${project.title}" em Guanambi (${project.powerKWp} kWp). Gostaria de algo semelhante para meu imóvel.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-50 hover:bg-[#E51E25] text-gray-700 hover:text-white font-semibold text-xs border border-gray-200 hover:border-[#E51E25] transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Solicitar Projeto Similar via WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Banner */}
          <div className="mt-16 bg-[#F9FAFB] border border-gray-200 p-8 rounded-3xl text-center shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Seu Telhado Também Pode Gerar Essa Economia
            </h3>
            <p className="text-sm text-gray-600 max-w-xl mx-auto mb-6">
              Agende agora uma visita técnica sem compromisso com o engenheiro da Perutche Solar para avaliação estrutural e elétrica em Guanambi.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="md"
                href="/simular"
                onClick={(e) => handleNav(e, '/simular')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Fazer Simulação Online
              </Button>
              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium text-sm transition-all shadow-sm shadow-green-500/20"
              >
                <MessageCircle className="w-4 h-4" />
                Falar com Engenheiro no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
