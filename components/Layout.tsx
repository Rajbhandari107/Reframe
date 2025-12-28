
import React from 'react';
import { AppView } from '../types';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  setView: (view: AppView) => void;
  streak: number;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView, streak }) => {
  return (
    <div className={`min-h-screen flex flex-col mx-auto px-6 py-8 md:py-12 ${currentView === AppView.LANDING ? 'max-w-4xl' : 'max-w-2xl'}`}>
      {currentView !== AppView.LANDING && (
        <header className="flex justify-between items-center mb-12">
          <button 
            onClick={() => setView(AppView.LANDING)}
            className="flex items-center gap-2 text-xl font-semibold tracking-tight text-slate-800 hover:opacity-70 transition-opacity"
          >
            <Logo className="w-6 h-6 text-slate-900" />
            <span>Reframe</span>
          </button>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
            <button 
              onClick={() => setView(AppView.HISTORY)}
              className={`hover:text-slate-900 transition-colors ${currentView === AppView.HISTORY ? 'text-slate-900' : ''}`}
            >
              History
            </button>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-slate-600">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              <span>{streak} {streak === 1 ? 'reflection' : 'reflections'}</span>
            </div>
          </div>
        </header>
      )}
      <main className="flex-1">
        {children}
      </main>
      {currentView !== AppView.LANDING && (
        <footer className="mt-24 pt-8 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 font-light">See today. Adjust tomorrow.</p>
        </footer>
      )}
    </div>
  );
};

export default Layout;
