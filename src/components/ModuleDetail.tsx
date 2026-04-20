import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { 
  ChevronRight, 
  Code, 
  Terminal as TerminalIcon,
  Play,
  Loader2,
  CheckCircle2,
  XCircle,
  Trophy
} from 'lucide-react';
import { Module } from '../types';
import { getCompletedChallenges, saveCompletedChallenge, unlockBadge } from '../lib/storage';

interface ModuleDetailProps {
  module: Module;
  onBack: () => void;
}

declare global {
  interface Window {
    loadPyodide: any;
  }
}

export default function ModuleDetail({ module, onBack }: ModuleDetailProps) {
  const [terminalInput, setTerminalInput] = useState('');
  const [logs, setLogs] = useState<string[]>(['System idle. Ready for input.']);
  const [pyodide, setPyodide] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());
  const [showBadgeUnlock, setShowBadgeUnlock] = useState(false);
  
  const pyodideLoadedRef = useRef(false);

  // Load existing progress
  useEffect(() => {
    const saved = getCompletedChallenges(module.id);
    setCompletedChallenges(new Set(saved));
    
    // Set current challenge to the first uncompleted one
    if (module.content?.challenges) {
      const firstUncompleted = module.content.challenges.findIndex(c => !saved.includes(c.id));
      if (firstUncompleted !== -1) {
        setCurrentChallengeIndex(firstUncompleted);
      } else {
        setCurrentChallengeIndex(module.content.challenges.length - 1);
      }
    }
  }, [module.id]);

  useEffect(() => {
    if (pyodideLoadedRef.current) return;
    
    const initPyodide = async () => {
      setIsInitializing(true);
      setLogs(['[SYSTEM] Initializing Python kernel...', '[SYSTEM] Fetching wasm binaries...']);
      
      try {
        if (!window.loadPyodide) {
          const script = document.createElement('script');
          script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
          script.async = true;
          document.head.appendChild(script);
          
          await new Promise((resolve) => {
            script.onload = resolve;
          });
        }

        const py = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
        });
        
        setPyodide(py);
        setLogs(prev => [...prev, '[SYSTEM] Kernel online. Environment ready.']);
        pyodideLoadedRef.current = true;
      } catch (err) {
        console.error("Pyodide loading failed:", err);
        setLogs(prev => [...prev, '[ERROR] Failed to initialize kernel. Check connection.']);
      } finally {
        setIsInitializing(false);
      }
    };

    initPyodide();
  }, []);

  if (!module.content) return <div className="p-20 text-center font-headline text-2xl">Content not available for this module.</div>;

  const currentChallenge = module.content.challenges[currentChallengeIndex];
  const isModuleComplete = completedChallenges.size === (module.content.challenges?.length || 0);

  const runCompiler = async () => {
    if (!pyodide || isRunning || !currentChallenge) return;

    setIsRunning(true);
    setLogs(prev => [...prev, `> Executing block...`]);
    
    try {
      pyodide.runPython(`
import sys
import io
sys.stdout = io.StringIO()
      `);

      await pyodide.runPythonAsync(terminalInput);
      
      const stdout = pyodide.runPython("sys.stdout.getvalue()");
      if (stdout) {
        setLogs(prev => [...prev, ...stdout.split('\n').filter(Boolean)]);
      }

      const isValid = currentChallenge.validation(pyodide.globals);
      
      if (isValid) {
        setLogs(prev => [...prev, '[SUCCESS] Logic check passed.', '[SYSTEM] Challenge completed. XP awarded.']);
        
        const newCompleted = new Set(completedChallenges);
        newCompleted.add(currentChallenge.id);
        setCompletedChallenges(newCompleted);
        saveCompletedChallenge(module.id, currentChallenge.id);

        // Check for total module completion
        if (newCompleted.size === module.content.challenges.length) {
          unlockBadge(module.id);
          setShowBadgeUnlock(true);
          setLogs(prev => [...prev, '', '[ACHIEVEMENT] All challenges cleared.', `[SYSTEM] ${module.id.toUpperCase()}_BADGE unlocked.`]);
        }

        // Auto-advance if not the last challenge and not completed all
        if (currentChallengeIndex < module.content.challenges.length - 1) {
           setTimeout(() => {
             setCurrentChallengeIndex(prev => prev + 1);
             setLogs(prev => [...prev, '', `[SYSTEM] Proceeding to ${module.content!.challenges[currentChallengeIndex + 1].title}...`]);
             setTerminalInput('');
           }, 1500);
        }
      } else {
        setLogs(prev => [...prev, '[INFO] Execution complete. Challenge conditions not yet met. Check your variables.']);
      }
    } catch (err: any) {
      setLogs(prev => [...prev, `[ERROR] ${err.message}`]);
    } finally {
      setIsRunning(false);
    }
  };

  if (!module.content) return <div className="p-20 text-center font-headline text-2xl">Content not available for this module.</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-5xl mx-auto pb-20"
    >
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-outline-variant font-headline text-sm mb-6 uppercase tracking-widest">
        <button onClick={onBack} className="hover:text-primary transition-colors">Modules</button>
        <ChevronRight size={14} />
        <span>Core Programming</span>
        <ChevronRight size={14} className="text-primary" />
        <span className="text-primary">{module.id.toUpperCase()}</span>
      </div>

      <AnimatePresence>
        {showBadgeUnlock && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-background/80"
          >
            <div className="bg-surface-container-high border-2 border-primary p-12 pixel-shadow max-w-sm w-full text-center relative overflow-hidden group">
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
              
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-24 h-24 mx-auto mb-8 bg-primary rounded-full flex items-center justify-center text-on-primary shadow-[0_0_20px_#8eff71]"
              >
                <Trophy size={48} />
              </motion.div>
              
              <h2 className="text-4xl font-headline uppercase mb-4 text-on-surface">Badge Unlocked!</h2>
              <p className="text-on-surface-variant mb-10 font-bold uppercase tracking-widest text-sm">
                SYSTEM_ACHIEVEMENT_IDENTIFIED: <br/>
                <span className="text-primary">{module.title}</span>
              </p>
              
              <button 
                onClick={() => setShowBadgeUnlock(false)}
                className="bg-primary text-on-primary font-headline uppercase tracking-widest px-8 py-3 pixel-shadow-primary hover:bg-white transition-all w-full"
              >
                ACKNOWLEDGE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="mb-12">
        <h1 className="text-6xl text-on-background mb-4 leading-none flex flex-wrap items-center gap-x-4">
          {module.title.split('&').map((part, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="text-primary shadow-[0_0_10px_#8eff71]"> & </span>}
              <span>{part}</span>
            </React.Fragment>
          ))}
          {isModuleComplete && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-primary"
            >
              <CheckCircle2 size={48} />
            </motion.div>
          )}
        </h1>
        <div className="h-1 w-32 bg-primary shadow-[0_0_10px_#8eff71]" />
      </header>

      {/* Sections */}
      <div className="space-y-12 mb-20">
        {module.content.sections.map((section) => (
          <div key={section.id} className="terminal-window border-secondary/50 border-l-4 group">
            <h3 className="text-secondary font-headline text-3xl mb-6 tracking-widest relative">
              <span className="opacity-0 group-hover:opacity-100 absolute -left-10 text-secondary transition-opacity">//</span>
              {section.number}. {section.title}
            </h3>
            
            <div className="prose prose-invert max-w-none text-on-surface-variant text-lg leading-relaxed mb-8">
              <ReactMarkdown>{section.body}</ReactMarkdown>
            </div>

            {section.codeExample && (
              <div className="bg-surface-container p-6 border-l-4 border-primary mt-8 pixel-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <TerminalIcon size={120} />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Code size={16} className="text-primary" />
                  <span className="text-outline-variant font-headline text-xs tracking-widest uppercase">
                    Memory Allocation Example
                  </span>
                </div>
                <pre className="font-mono text-sm leading-relaxed overflow-x-auto text-primary/80 selection:bg-primary/20 selection:text-white">
                  {section.codeExample}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Challenge Section */}
      {currentChallenge && (
        <div className="space-y-10 mb-20">
          <div className="flex items-center justify-between">
            <h3 className="text-4xl font-headline tracking-widest flex items-center gap-4">
              <div className="w-12 h-1 bg-primary" />
              PRACTICE_CHALLENGES
            </h3>
            
            <div className="flex gap-2">
              {module.content.challenges.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-3 h-3 ${
                    completedChallenges.has(module.content!.challenges[i].id) 
                      ? 'bg-primary' 
                      : i === currentChallengeIndex 
                        ? 'bg-secondary animate-pulse' 
                        : 'bg-surface-container-highest'
                  }`} 
                />
              ))}
            </div>
          </div>

          <div className={`bg-surface-container-low pixel-shadow border border-surface-container-highest overflow-hidden transition-all duration-500
            ${completedChallenges.has(currentChallenge.id) ? 'border-primary shadow-[8px_8px_0px_0px_#8eff71]' : ''}
          `}>
            <div className={`flex items-center justify-between px-8 py-4 border-b border-surface-container-highest
              ${completedChallenges.has(currentChallenge.id) ? 'bg-primary/10' : 'bg-surface-container-high'}
            `}>
              <div className="flex items-center gap-4">
                <span className={`font-headline px-3 py-1 text-sm ${completedChallenges.has(currentChallenge.id) ? 'bg-white text-on-primary' : 'bg-primary text-on-primary'}`}>
                  {currentChallenge.level}
                </span>
                <span className={`font-headline text-xl tracking-widest uppercase ${completedChallenges.has(currentChallenge.id) ? 'text-primary' : ''}`}>
                  {currentChallenge.title}
                </span>
              </div>
              <div className="flex items-center gap-4">
                {completedChallenges.has(currentChallenge.id) && (
                  <span className="text-primary font-bold flex items-center gap-2 animate-bounce">
                    COMPLETED <CheckCircle2 size={16} />
                  </span>
                )}
                <span className="text-primary font-headline tracking-widest">+{currentChallenge.xp} XP</span>
              </div>
            </div>

            <div className="p-8">
              <div className="text-on-surface-variant mb-8 text-lg leading-relaxed">
                <span className="text-primary font-bold mr-2">TASK:</span>
                {currentChallenge.task}
              </div>

              {/* Terminal Editor */}
              <div className="bg-surface-container-lowest border-2 border-surface-container-highest relative font-mono">
                <div className="bg-surface-container-highest px-4 py-2 flex items-center justify-between">
                  {/* Controls */}
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                  
                  {/* Navigator */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <button 
                        disabled={currentChallengeIndex === 0}
                        onClick={() => setCurrentChallengeIndex(prev => prev - 1)}
                        className="text-outline-variant hover:text-primary disabled:opacity-20"
                      >
                        <ChevronRight size={16} className="rotate-180" />
                      </button>
                      <span className="text-[10px] font-headline tracking-[0.2em] text-outline-variant">
                        BLOCK_{currentChallengeIndex + 1}/{module.content.challenges.length}
                      </span>
                      <button 
                        disabled={currentChallengeIndex === module.content.challenges.length - 1}
                        onClick={() => setCurrentChallengeIndex(prev => prev + 1)}
                        className="text-outline-variant hover:text-primary disabled:opacity-20"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {isInitializing && <Loader2 size={14} className="animate-spin text-primary" />}
                      <span className="font-headline text-[10px] tracking-[0.3em] text-outline-variant">
                        {isInitializing ? 'INITIALIZING_KERNEL...' : 'EDITOR_CONSOLE_V2.0'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 min-h-[160px] flex group focus-within:bg-primary/5 transition-colors">
                  <div className="text-outline-variant mr-4 select-none text-right w-6 font-headline tracking-widest opacity-30">
                    01<br/>02<br/>03<br/>04<br/>05
                  </div>
                  <textarea 
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    disabled={isInitializing || isRunning}
                    className="w-full bg-transparent border-none focus:ring-0 p-0 font-mono text-primary resize-none h-32 leading-relaxed placeholder:opacity-30 disabled:opacity-50" 
                    placeholder="# WRITE PYTHON CODE HERE..."
                    spellCheck={false}
                  />
                </div>

                <div className="p-4 border-t-2 border-surface-container-highest flex justify-between items-center bg-surface-container-low">
                  <div className="text-outline-variant font-headline text-[10px] tracking-widest uppercase">
                    STATUS: {isRunning ? 'EXECUTING...' : isInitializing ? 'WAITING_FOR_HOST' : 'READY_FOR_INPUT'}
                  </div>
                  <button 
                    onClick={runCompiler}
                    disabled={isInitializing || isRunning || !terminalInput.trim()}
                    className={`bg-primary text-on-primary px-8 py-2 font-headline tracking-widest text-lg transition-all active:translate-y-1 block shadow-[4px_4px_0_0_#0d6100] disabled:opacity-50 disabled:cursor-not-allowed
                      ${!isInitializing && !isRunning && terminalInput.trim() ? 'hover:bg-white hover:shadow-[4px_4px_0_0_#cccccc]' : ''}
                    `}
                  >
                    <div className="flex items-center gap-2">
                      {isRunning ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
                      RUN_COMPILER
                    </div>
                  </button>
                </div>

                <div className="bg-[#050505] p-6 font-mono text-sm border-t-4 border-surface-container-highest max-h-60 overflow-y-auto custom-scrollbar">
                  <div className="text-outline-variant mb-2 text-xs uppercase tracking-tighter flex items-center justify-between">
                    <span>OUTPUT_LOG:</span>
                    <button onClick={() => setLogs(['System reset.'])} className="hover:text-primary transition-colors">CLEAR</button>
                  </div>
                  <AnimatePresence>
                    {logs.map((log, i) => (
                      <motion.div 
                        key={`${log}-${i}`}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex gap-2 mb-1 ${
                          log.startsWith('[ERROR]') ? 'text-red-400' : 
                          log.startsWith('[SUCCESS]') ? 'text-primary' : 
                          log.startsWith('[SYSTEM]') ? 'text-tertiary' : 
                          'text-on-surface-variant'
                        }`}
                      >
                        <span className="text-primary/40 font-bold">&gt;</span>
                        <span className="whitespace-pre-wrap">{log}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div className="flex gap-2">
                    <span className="text-primary/40 font-bold">&gt;</span>
                    <span className="animate-pulse w-2 h-4 bg-primary/40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
