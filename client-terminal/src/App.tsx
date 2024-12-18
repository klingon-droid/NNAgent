import { useState } from 'react';
import { Terminal } from './components/Terminal';
import { Navigation } from './components/Navigation';
import { Background } from './components/Background';
import { Gallery } from './components/pages/Gallery';
import { Docs } from './components/pages/Docs';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('terminal');

  const renderContent = () => {
    switch (activeSection) {
      case 'terminal':
        return <Terminal />;
      case 'agents':
        return <Gallery />;
      case 'docs':
        return <Docs />;
      default:
        return <Terminal />;
    }
  };

  return (
    <div className="min-h-screen text-white">
      <Background />
      
      <Navigation 
        activeSection={activeSection}
        onNavigate={setActiveSection}
      />

      <main className="pt-16 px-4 pb-4">
        <div className="max-w-5xl mx-auto flex items-center justify-center min-h-[calc(100vh-6rem)]">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;