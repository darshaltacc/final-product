import React from 'react';
import { motion } from 'motion/react';
import { 
  Database, 
  Split, 
  RotateCw, 
  Sigma, 
  List, 
  Box, 
  Focus, 
  Bug, 
  Share2,
  Lock
} from 'lucide-react';
import { Module } from '../types';
import { getDynamicModules } from '../lib/storage';

const ICON_MAP: Record<string, any> = {
  Database,
  Split,
  RotateCw,
  Sigma,
  List,
  Box,
  Focus,
  Bug,
  Share2
};

interface DashboardProps {
  onModuleSelect: (module: Module) => void;
}

export default function Dashboard({ onModuleSelect }: DashboardProps) {
  const dynamicModules = getDynamicModules();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      {/* Page Header */}
      <div className="relative pl-6">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
        <h1 className="text-6xl text-on-background mb-2 leading-none">Learning Path</h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dynamicModules.map((module, index) => {
          const Icon = ICON_MAP[module.icon] || Database;
          return (
            <ModuleCard 
              key={module.id} 
              module={module} 
              icon={<Icon size={32} className="text-secondary" />}
              index={index}
              onClick={() => !module.locked && onModuleSelect(module)}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

function ModuleCard({ module, icon, index, onClick }: { 
  module: Module; 
  icon: React.ReactNode;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={`group relative bg-surface-container-low p-6 transition-all shadow-[8px_8px_0px_0px_#1a1a1a] cursor-pointer
        ${module.locked ? 'opacity-60 grayscale cursor-not-allowed' : 'hover:shadow-[8px_8px_0px_0px_#8eff71] hover:-translate-y-1 active:translate-y-0 active:shadow-[4px_4px_0px_0px_#8eff71]'}
      `}
    >
      <div className="flex justify-between items-start mb-6">
        <span className="font-headline text-4xl text-primary/50">{module.number}</span>
        <div className="h-12 w-12 bg-surface-container-highest flex items-center justify-center p-2 relative">
          {icon}
          {module.locked && (
            <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
              <Lock size={16} className="text-outline" />
            </div>
          )}
        </div>
      </div>

      <h3 className="text-2xl text-on-surface mb-4 h-14 line-clamp-2">
        {module.title}
      </h3>

      <div className="h-1 w-full bg-surface-container-highest mb-4 overflow-hidden relative">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${module.mastery}%` }}
          className="h-full bg-primary" 
        />
      </div>

      <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest font-body">
        <span className={module.mastery === 100 ? 'text-primary' : 'text-on-surface-variant'}>
          {module.locked ? 'Locked' : module.mastery === 100 ? 'Mastered' : `Mastery: ${module.mastery}%`}
        </span>
        <span className="text-on-surface-variant">
          {module.locked ? 'Lvl 0' : `Lvl ${module.level}`}
        </span>
      </div>

      {module.locked && (
        <div className="absolute inset-0 bg-surface/20 backdrop-blur-[1px] flex items-center justify-center">
          <Lock size={40} className="text-outline/40" />
        </div>
      )}
    </motion.div>
  );
}
