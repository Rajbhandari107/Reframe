
import React, { useState } from 'react';
import { analyzeReflection } from '../services/geminiService';
import { ReframeResult, ReflectionEntry } from '../types';

interface AppMainProps {
  onSave: (entry: ReflectionEntry) => void;
  yesterdayEntry?: ReflectionEntry;
}

const AppMain: React.FC<AppMainProps> = ({ onSave, yesterdayEntry }) => {
  const [todayInput, setTodayInput] = useState('');
  const [tomorrowInput, setTomorrowInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ReframeResult | null>(null);

  const handleReframe = async () => {
    if (!todayInput.trim() || !tomorrowInput.trim()) return;

    setIsLoading(true);
    try {
      const yesterdayPlan = yesterdayEntry?.tomorrowInput;
      const analysis = await analyzeReflection(todayInput, tomorrowInput, yesterdayPlan);
      setResult(analysis);
      
      const newEntry: ReflectionEntry = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        todayInput,
        tomorrowInput,
        result: analysis
      };
      
      onSave(newEntry);
    } catch (error) {
      console.error("Analysis failed", error);
      alert("Failed to process reflection. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setTodayInput('');
    setTomorrowInput('');
    setResult(null);
  };

  if (result) {
    return (
      <div className="space-y-12 fade-in pb-20">
        <header className="space-y-2">
          <h2 className="text-3xl font-medium text-slate-900 tracking-tight">Today's Reflection</h2>
          <p className="text-slate-400 font-light">Your perspective, adjusted for tomorrow.</p>
        </header>

        <section className="space-y-12">
          {/* Plan vs Reality Comparison */}
          {result.planVsReality && (
            <div className="space-y-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Plan vs. Reality</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <span className="text-xs font-medium text-emerald-600 block uppercase tracking-tight">Followed Through</span>
                  <ul className="space-y-1.5">
                    {result.planVsReality.followedThrough.length > 0 ? (
                      result.planVsReality.followedThrough.map((item, i) => (
                        <li key={i} className="text-sm text-slate-500 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">{item}</li>
                      ))
                    ) : (
                      <li className="text-sm text-slate-400 italic">No matches found.</li>
                    )}
                  </ul>
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-medium text-slate-400 block uppercase tracking-tight">Left Aside</span>
                  <ul className="space-y-1.5">
                    {result.planVsReality.missed.length > 0 ? (
                      result.planVsReality.missed.map((item, i) => (
                        <li key={i} className="text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">{item}</li>
                      ))
                    ) : (
                      <li className="text-sm text-slate-400 italic">None.</li>
                    )}
                  </ul>
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-medium text-blue-500 block uppercase tracking-tight">Unplanned</span>
                  <ul className="space-y-1.5">
                    {result.planVsReality.unplanned.length > 0 ? (
                      result.planVsReality.unplanned.map((item, i) => (
                        <li key={i} className="text-sm text-slate-500 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">{item}</li>
                      ))
                    ) : (
                      <li className="text-sm text-slate-400 italic">None.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Organized Today */}
          <div className="space-y-6">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Today, Organized</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <span className="text-sm font-medium text-slate-800 block">Activities & Focus</span>
                <ul className="space-y-2">
                  {result.organizedToday.activities.map((a, i) => (
                    <li key={i} className="text-sm text-slate-500 flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                {result.organizedToday.signals.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-slate-800 block">Signals Observed</span>
                    <div className="flex flex-wrap gap-2">
                      {result.organizedToday.signals.map((s, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-md">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {result.organizedToday.patterns.length > 0 && (
                   <div className="space-y-2">
                    <span className="text-sm font-medium text-slate-800 block">Patterns</span>
                    <ul className="space-y-2">
                      {result.organizedToday.patterns.map((p, i) => (
                        <li key={i} className="text-xs text-slate-500 italic">
                          "{p}"
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Organized Tomorrow */}
          <div className="space-y-6">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Tomorrow, Organized</h3>
            <div className="space-y-4">
              <span className="text-sm font-medium text-slate-800 block">Planned Focus</span>
              <ul className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-x-8">
                {result.organizedTomorrow.activities.map((a, i) => (
                  <li key={i} className="text-sm text-slate-500 flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Reality Check */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Reality Check</h3>
            <p className="text-lg text-slate-700 font-light leading-relaxed italic">
              "{result.realityCheck}"
            </p>
          </div>

          {/* Small Adjustment */}
          <div className="p-8 bg-slate-900 text-white rounded-[2rem] space-y-4 shadow-xl shadow-slate-200">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">One Small Adjustment</h3>
            <p className="text-2xl font-medium tracking-tight leading-snug">
              {result.smallAdjustment}
            </p>
            <p className="text-sm text-slate-400 font-light">Focus only on this change tomorrow. Let everything else follow naturally.</p>
          </div>
        </section>

        <button 
          onClick={reset}
          className="w-full py-4 text-slate-400 hover:text-slate-900 transition-colors text-sm font-medium"
        >
          New Reflection
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 fade-in">
      <header className="space-y-2">
        <p className="text-slate-400 font-light">Be honest. Messy is fine.</p>
      </header>

      <div className="space-y-10">
        {/* Today Input */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-slate-800 block">What I did today</label>
          <textarea
            value={todayInput}
            onChange={(e) => setTodayInput(e.target.value)}
            disabled={isLoading}
            placeholder="What actually happened? How was your energy? Write freely..."
            className="w-full h-48 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-1 focus:ring-slate-300 focus:border-transparent outline-none transition-all resize-none text-slate-600 leading-relaxed placeholder:text-slate-300"
          />
        </div>

        {/* Tomorrow Input */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-slate-800 block">What I plan to do tomorrow</label>
          <textarea
            value={tomorrowInput}
            onChange={(e) => setTomorrowInput(e.target.value)}
            disabled={isLoading}
            placeholder="What do you realistically hope to achieve? Be specific but fair to yourself."
            className="w-full h-48 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-1 focus:ring-slate-300 focus:border-transparent outline-none transition-all resize-none text-slate-600 leading-relaxed placeholder:text-slate-300"
          />
        </div>

        <button
          onClick={handleReframe}
          disabled={isLoading || !todayInput.trim() || !tomorrowInput.trim()}
          className={`w-full py-5 rounded-2xl font-semibold transition-all shadow-sm flex items-center justify-center gap-3
            ${isLoading || !todayInput.trim() || !tomorrowInput.trim() 
              ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
              : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.99]'}`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Analyzing...</span>
            </>
          ) : (
            'Reframe'
          )}
        </button>
      </div>
    </div>
  );
};

export default AppMain;
