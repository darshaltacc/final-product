import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Medal,
  Terminal as TerminalIcon,
  Circle
} from 'lucide-react';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function Layout({ children, currentView, onViewChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-on-primary relative overflow-hidden">
      <div className="crt-overlay" />
      
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-background z-50 flex items-center justify-between px-8 border-b-4 border-surface-container-low">
        <div className="text-3xl font-headline uppercase text-primary drop-shadow-[2px_2px_0px_#0d6100] tracking-widest">
          CS LEARNING HUB
        </div>

      </header>

      <div className="flex pt-20 h-screen">
        {/* SideNavBar */}
        <aside className="w-64 bg-surface-container-low border-r-4 border-surface-container-highest z-40 hidden md:flex flex-col pt-10">
          <nav className="flex-1 space-y-2">
            <NavItem 
              icon={<LayoutDashboard size={20} />} 
              label="Dashboard" 
              active={currentView === 'dashboard'} 
              onClick={() => onViewChange('dashboard')}
            />
            <NavItem 
              icon={<BookOpen size={20} />} 
              label="Curriculum" 
              active={currentView === 'curriculum'} 
              onClick={() => onViewChange('curriculum')}
            />
            <NavItem 
              icon={<Medal size={20} />} 
              label="Badges" 
              active={currentView === 'badges'} 
              onClick={() => onViewChange('badges')}
            />
          </nav>
          

        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto relative bg-surface p-8">
          {children}
          

        </main>
      </div>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-container-low border-t-4 border-surface-container-highest flex justify-around items-center z-50">
        <button 
          onClick={() => onViewChange('dashboard')}
          className={`flex flex-col items-center justify-center gap-1 ${currentView === 'dashboard' ? 'text-primary' : 'text-outline'}`}
        >
          <LayoutDashboard size={20} />
          <span className="text-[10px] uppercase font-bold">Dash</span>
        </button>
        <button 
          onClick={() => onViewChange('curriculum')}
          className={`flex flex-col items-center justify-center gap-1 ${currentView === 'curriculum' ? 'text-primary' : 'text-outline'}`}
        >
          <BookOpen size={20} />
          <span className="text-[10px] uppercase font-bold">Edu</span>
        </button>
        <button 
          onClick={() => onViewChange('badges')}
          className={`flex flex-col items-center justify-center gap-1 ${currentView === 'badges' ? 'text-primary' : 'text-outline'}`}
        >
          <Medal size={20} />
          <span className="text-[10px] uppercase font-bold">Awards</span>
        </button>
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean; 
  onClick: () => void 
}) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-6 py-4 transition-all uppercase font-bold text-xs tracking-[0.2em] relative group
        ${active ? 'bg-surface-container-highest text-primary' : 'text-outline hover:bg-surface-container hover:text-primary-container'}
      `}
    >
      {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_#8eff71]" />}
      <span className={active ? 'drop-shadow-[0_0_8px_#8eff71]' : ''}>
        {icon}
      </span>
      <span>{label}</span>
      {active && <motion.div layoutId="active-nav" className="absolute inset-0 bg-primary/5 -z-1" />}
    </button>
  );
}
