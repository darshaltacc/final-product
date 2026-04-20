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
import { getStoredBadges } from '../lib/storage';

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

export default function Badges() {
  const currentBadges = getStoredBadges();
  const unlockedCount = currentBadges.filter(b => b.unlocked).length;
  const progressPercent = Math.round((unlockedCount / currentBadges.length) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12 max-w-6xl mx-auto"
    >
      {/* Header Section */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="relative pl-6">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
          <h1 className="text-6xl text-on-background uppercase leading-none mb-2">Badges Gallery</h1>
          <p className="text-on-surface-variant font-bold tracking-widest uppercase text-xs">
            STATUS: <span className="text-tertiary">{unlockedCount}/{currentBadges.length} COLLECTED</span>
          </p>
        </div>

        <div className="w-full lg:w-96">
          <div className="flex justify-between mb-2 font-headline uppercase text-sm tracking-widest">
            <span className="text-primary">Mastery Progress</span>
            <span className="text-tertiary">{progressPercent}%</span>
          </div>
          <div className="h-6 bg-surface-container-highest flex gap-1 p-1">
            {currentBadges.map((badge, i) => (
              <div 
                key={badge.id} 
                className={`h-full flex-1 ${badge.unlocked ? 'bg-primary' : 'bg-surface-container'}`} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentBadges.map((badge, index) => {
          const Icon = ICON_MAP[badge.icon] || Database;
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-surface-container-low p-1 pixel-shadow relative group
                ${!badge.unlocked ? 'opacity-60 grayscale' : 'hover:-translate-y-1 transition-transform'}
              `}
            >
              <div className="bg-surface-container p-8 flex flex-col items-center text-center h-full min-h-[240px]">
                <div className={`w-28 h-28 mb-6 flex items-center justify-center relative border-2 ${badge.unlocked ? 'border-primary/20' : 'border-outline-variant/20'}`}>
                  <Icon 
                    size={56} 
                    className={badge.unlocked ? 'text-primary' : 'text-outline/40'} 
                    strokeWidth={1.5}
                    style={badge.unlocked ? { filter: 'drop-shadow(0 0 8px #8eff71)' } : {}}
                  />
                  {!badge.unlocked && (
                    <div className="absolute top-0 right-0 p-1">
                      <Lock size={16} className="text-outline" />
                    </div>
                  )}
                </div>
                
                <h3 className={`text-xl font-headline uppercase mb-6 ${badge.unlocked ? 'text-on-surface' : 'text-outline'}`}>
                  {badge.title}
                </h3>
                
                <div className={`mt-auto px-6 py-1 font-headline uppercase text-sm tracking-widest 
                  ${badge.unlocked ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-outline'}
                `}>
                  {badge.unlocked ? 'UNLOCKED' : 'LOCKED'}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
