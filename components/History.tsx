
import React, { useState } from 'react';
import { ReflectionEntry } from '../types';

interface HistoryProps {
  entries: ReflectionEntry[];
}

const History: React.FC<HistoryProps> = ({ entries }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <p>No reflections yet. Start your journey today.</p>
      </div>
    );
  }

  const selectedEntry = entries.find(e => e.id === selectedId);

  return (
    <div className="space-y-8 fade-in">
      <h2 className="text-2xl font-medium text-slate-900 mb-8">Reflection History</h2>
      
      {!selectedId ? (
        <div className="space-y-4">
          {sortedEntries.map((entry) => (
            <button
              key={entry.id}
              onClick={() => setSelectedId(entry.id)}
              className="w-full text-left p-6 bg-white border border-slate-100 rounded-2xl hover:border-slate-300 transition-all group"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-slate-900">
                  {new Date(entry.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="text-slate-300 group-hover:text-slate-500 transition-colors">→</span>
              </div>
              <p className="text-sm text-slate-500 line-clamp-1 italic">
                {entry.result.realityCheck}
              </p>
            </button>
          ))}
        </div>
      ) : selectedEntry && (
        <div className="space-y-12 pb-12">
          <button 
            onClick={() => setSelectedId(null)}
            className="text-sm text-slate-400 hover:text-slate-900 transition-colors"
          >
            ← Back to history
          </button>

          <header>
             <h3 className="text-xl font-medium text-slate-900">
              {new Date(selectedEntry.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
            </h3>
          </header>

          <section className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Today</h4>
                <p className="text-slate-600 text-sm whitespace-pre-wrap">{selectedEntry.todayInput}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Tomorrow's Plan</h4>
                <p className="text-slate-600 text-sm whitespace-pre-wrap">{selectedEntry.tomorrowInput}</p>
              </div>
            </div>

            <div className="p-8 bg-slate-50 rounded-3xl space-y-8">
              <div className="space-y-4">
                 <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Today, Organized</h4>
                 <div className="grid grid-cols-1 gap-6">
                    {selectedEntry.result.organizedToday.activities.length > 0 && (
                      <div>
                        <span className="text-xs text-slate-400 block mb-1">Activities</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedEntry.result.organizedToday.activities.map((a, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-white border border-slate-200 rounded-md text-slate-600">{a}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedEntry.result.organizedToday.signals.length > 0 && (
                      <div>
                        <span className="text-xs text-slate-400 block mb-1">Signals</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedEntry.result.organizedToday.signals.map((s, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-md">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                 </div>
              </div>

              {selectedEntry.result.organizedTomorrow && (
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Tomorrow, Organized</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEntry.result.organizedTomorrow.activities.map((a, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-slate-200 text-slate-700 rounded-md">{a}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                 <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Reality Check</h4>
                 <p className="text-slate-800 leading-relaxed italic">"{selectedEntry.result.realityCheck}"</p>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                 <h4 className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">Adjustment</h4>
                 <p className="text-sm text-emerald-800 font-medium">{selectedEntry.result.smallAdjustment}</p>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default History;
