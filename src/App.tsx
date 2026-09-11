import React, { useState, useEffect } from 'react';
import MarketingLayout from '../app/(marketing)/layout';
import MarketingPage from '../app/(marketing)/page';
import SimularPage from '../app/simular/page';
import ProjetosPage from '../app/projetos/page';
import { WhatsAppFloat } from '../components/ui/WhatsAppFloat';
import { ChatbotChrisFloat } from '../components/ui/ChatbotChrisFloat';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('simular')) return '/simular';
      if (path.includes('projetos')) return '/projetos';
    }
    return '/';
  });

  // Listen for browser back / forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.includes('simular')) {
        setCurrentPath('/simular');
      } else if (path.includes('projetos')) {
        setCurrentPath('/projetos');
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Unified navigate handler
  const navigate = (path: string) => {
    if (path === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render current view
  const renderContent = () => {
    switch (currentPath) {
      case '/simular':
        return <SimularPage onNavigate={navigate} />;
      case '/projetos':
        return <ProjetosPage onNavigate={navigate} />;
      case '/':
      default:
        return (
          <MarketingLayout>
            <MarketingPage onNavigate={navigate} />
          </MarketingLayout>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col selection:bg-[#E51E25] selection:text-white">
      {renderContent()}
      <ChatbotChrisFloat />
      <WhatsAppFloat />
    </div>
  );
}
