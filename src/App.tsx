import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Terminal } from './components/Terminal';
import { Navigation } from './components/Navigation';
import { Background } from './components/Background';
import { Home } from './components/pages/Home';
import { Gallery } from './components/pages/Gallery';
import { Symx } from './components/pages/Symx';
import { Manifesto } from './components/pages/Manifesto';
import { Whitepaper } from './components/pages/Whitepaper';
import { Docs } from './components/pages/Docs';
import { Logs } from './components/pages/Logs';

const routes = [
  { path: '/', element: 'home' },
  { path: '/terminal', element: 'terminal' },
  { path: '/manifesto', element: 'manifesto' },
  { path: '/characters', element: 'characters' },
  { path: '/symx', element: 'symx' },
  { path: '/logs', element: 'logs' },
  { path: '/whitepaper', element: 'whitepaper' },
  { path: '/docs', element: 'docs' }
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname.slice(1).toLowerCase() || 'home';
    setActiveSection(path);
  }, [location]);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    navigate(`/${section === 'home' ? '' : section}`);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'terminal':
        return <Terminal onNavigate={handleNavigate} />;
      case 'manifesto':
        return <Manifesto />;
      case 'characters':
        return <Gallery />;
      case 'symx':
        return <Symx />;
      case 'logs':
        return <Logs onNavigate={handleNavigate} />;
      case 'whitepaper':
        return <Whitepaper />;
      case 'docs':
        return <Docs />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen text-white">
      <Background />
      <Navigation 
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />
      <main className="pt-16 px-4 pb-4">
        <div className="max-w-5xl mx-auto flex items-center justify-center min-h-[calc(100vh-6rem)]">
          <Routes>
            <Route path="/*" element={renderContent()} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default App;