
import React from 'react';
import Logo from './Logo';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col space-y-32 pb-32">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center pt-16 md:pt-24 space-y-10 animate-fade-in">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Logo className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-medium tracking-widest text-slate-400 uppercase">Reframe</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-slate-900 leading-[1.1]">
            See today. <br />
            <span className="text-slate-400">Adjust tomorrow.</span>
          </h1>
        </div>
        
        <p className="text-lg md:text-xl text-slate-500 font-light max-w-xl leading-relaxed">
          A calm reflection and planning tool designed to help you align tomorrow with reality through small, intentional adjustments.
        </p>

        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={onStart}
            className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-medium hover:bg-slate-800 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-slate-200"
          >
            Start Reframing
          </button>
          <p className="text-xs text-slate-400 font-light">
            No signup required · Takes less than a minute
          </p>
        </div>
      </section>

      {/* Value Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 px-4">
        <div className="space-y-4">
          <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
            <span className="text-slate-400 text-sm font-medium">01</span>
          </div>
          <h3 className="text-xl font-medium text-slate-900 tracking-tight">Realistic Planning</h3>
          <p className="text-slate-500 leading-relaxed font-light">
            Stop over-planning and start understanding your actual daily capacity based on lived reality.
          </p>
        </div>
        <div className="space-y-4">
          <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
            <span className="text-slate-400 text-sm font-medium">02</span>
          </div>
          <h3 className="text-xl font-medium text-slate-900 tracking-tight">Intentional Adjustments</h3>
          <p className="text-slate-500 leading-relaxed font-light">
            No productivity scores or streaks. Just one small adjustment to make tomorrow more sustainable.
          </p>
        </div>
        <div className="space-y-4">
          <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
            <span className="text-slate-400 text-sm font-medium">03</span>
          </div>
          <h3 className="text-xl font-medium text-slate-900 tracking-tight">Quiet Reflection</h3>
          <p className="text-slate-500 leading-relaxed font-light">
            A private, minimal space to write freely without the pressure of gamification or performance.
          </p>
        </div>
      </section>

      {/* How it Works */}
      <section className="space-y-12">
        <div className="space-y-4 max-w-lg">
          <h2 className="text-3xl font-medium text-slate-900 tracking-tight">The daily rhythm.</h2>
          <p className="text-slate-500 font-light">Three simple steps to bridge the gap between reflection and action.</p>
        </div>
        <div className="space-y-8">
          {[
            { step: '01', title: 'Reflect on today', desc: 'Write what actually happened. Your energy, your distractions, your wins.' },
            { step: '02', title: 'Plan tomorrow', desc: 'Outline what you hope to do. Be as optimistic as you like.' },
            { step: '03', title: 'Reframe', desc: 'See the gap. Receive one small, honest correction for your next day.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-8 items-start group">
              <span className="text-4xl font-light text-slate-200 group-hover:text-slate-900 transition-colors duration-500">{item.step}</span>
              <div className="space-y-1">
                <h4 className="text-lg font-medium text-slate-800">{item.title}</h4>
                <p className="text-slate-500 font-light max-w-md">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Example Section */}
      <section className="bg-slate-50 rounded-[3rem] p-12 md:p-16 space-y-12">
        <div className="space-y-4 text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-medium text-slate-900 tracking-tight">Awareness, not judgment.</h2>
          <p className="text-slate-500 font-light">Reframe turns messy notes into clarity, highlighting the subtle mismatch between your plans and your habits.</p>
        </div>
        
        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-100 max-w-2xl mx-auto space-y-8">
           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Yesterday's Plan</span>
                <p className="text-sm text-slate-400 italic leading-relaxed">"Read for 2 hours, wake up at 6am, finish project draft."</p>
              </div>
              <div className="space-y-2 border-l border-slate-50 pl-8">
                <span className="text-[10px] uppercase tracking-widest text-slate-900 font-semibold">Today's Reality</span>
                <p className="text-sm text-slate-600 leading-relaxed">"Slept until 8am. Energy was low. Spent afternoon on the draft but only got half done."</p>
              </div>
           </div>
           <div className="pt-8 border-t border-slate-50">
              <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold block mb-4">REFRRAME ADJUSTMENT</span>
              <p className="text-xl font-medium text-slate-800 tracking-tight leading-relaxed">
                "Your energy seems lower in the morning lately. Try moving high-focus work to 2pm tomorrow and aim for an extra hour of rest."
              </p>
           </div>
        </div>
      </section>

      {/* Differentiation Section */}
      <section className="space-y-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-medium text-slate-900 tracking-tight leading-tight">Quiet by design.</h2>
            <p className="text-slate-500 font-light text-lg">We intentionally removed the features that cause noise and pressure in traditional productivity tools.</p>
          </div>
          <ul className="space-y-8">
            {[
              { label: 'No productivity scores', detail: 'You are more than a percentage.' },
              { label: 'No habit pressure', detail: 'No streaks to break or leaderboards to climb.' },
              { label: 'No over-analysis', detail: 'One small adjustment only. Never overload.' },
            ].map((item, i) => (
              <li key={i} className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                  <span className="font-medium text-slate-800">{item.label}</span>
                </div>
                <p className="text-slate-400 text-sm pl-4.5">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center space-y-8 py-24 border-t border-slate-100">
        <h2 className="text-4xl font-medium text-slate-900 tracking-tight">Better, not more.</h2>
        <p className="text-slate-500 font-light max-w-lg mx-auto">Join others who are finding clarity and calmness in their daily rhythm.</p>
        <button
          onClick={onStart}
          className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-medium hover:bg-slate-800 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-slate-200"
        >
          Start Reframing
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
