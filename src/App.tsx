import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ModuleDetail from './components/ModuleDetail';
import Badges from './components/Badges';
import { View, Module } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const handleModuleSelect = (module: Module) => {
    setSelectedModule(module);
    setCurrentView('curriculum');
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    if (view !== 'curriculum') {
      setSelectedModule(null);
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      onViewChange={handleViewChange}
    >
      {currentView === 'dashboard' && (
        <Dashboard onModuleSelect={handleModuleSelect} />
      )}
      
      {currentView === 'curriculum' && (
        <>
          {selectedModule ? (
            <ModuleDetail 
              module={selectedModule} 
              onBack={() => {
                setSelectedModule(null);
                setCurrentView('dashboard');
              }} 
            />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
              <div className="text-4xl text-outline-variant font-headline uppercase tracking-[0.3em]">
                Select a Module from the Dashboard
              </div>
              <p className="text-outline text-lg max-w-md">
                Initialize your learning core by selecting a topic from the main hub.
              </p>
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="bg-primary text-on-primary font-headline text-2xl px-10 py-3 pixel-shadow-primary hover:bg-white transition-all uppercase tracking-widest"
              >
                Return to Hub
              </button>
            </div>
          )}
        </>
      )}

      {currentView === 'badges' && (
        <Badges />
      )}
    </Layout>
  );
}
