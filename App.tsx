
import React, { useState, useEffect } from 'react';
import { AppView, ReflectionEntry } from './types';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import AppMain from './components/AppMain';
import History from './components/History';

const STORAGE_KEY = 'reframe_data';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [reflections, setReflections] = useState<ReflectionEntry[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load data from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setReflections(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved reflections", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save data to LocalStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reflections));
    }
  }, [reflections, isInitialized]);

  const saveReflection = (entry: ReflectionEntry) => {
    setReflections(prev => [...prev, entry]);
  };

  const streak = reflections.length;
  
  // Find the last reflection to provide "Yesterday's Plan" context
  const lastEntry = reflections.length > 0 
    ? [...reflections].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] 
    : undefined;

  const renderView = () => {
    switch (view) {
      case AppView.LANDING:
        return <LandingPage onStart={() => setView(AppView.MAIN)} />;
      case AppView.MAIN:
        return <AppMain onSave={saveReflection} yesterdayEntry={lastEntry} />;
      case AppView.HISTORY:
        return <History entries={reflections} />;
      default:
        return <LandingPage onStart={() => setView(AppView.MAIN)} />;
    }
  };

  return (
    <Layout currentView={view} setView={setView} streak={streak}>
      {renderView()}
    </Layout>
  );
};

export default App;
