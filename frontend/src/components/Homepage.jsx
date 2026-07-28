import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, User, Check, ChevronRight, LayoutDashboard, FileText, BarChart3, Zap } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('simulation');
  const [scenario, setScenario] = useState('vendor');

  return (
    <div className="flex min-h-screen bg-[#09090b]">
      
      {/* Elegant Sidebar */}
      <div className="w-64 bg-[#121212] border-r border-white/5 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-12 text-white font-bold text-xl">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-1.5 rounded-lg">
              <Zap size={20} className="text-white fill-current" />
            </div>
            Negotiate<span className="gradient-text">AI</span>
          </div>
          <nav className="space-y-3 text-sm text-gray-500">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-purple-400 border border-white/10 shadow-sm">
              <LayoutDashboard size={20} /> Scenarios
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-all duration-200 hover:text-white">
              <FileText size={20} /> Sessions
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-all duration-200 hover:text-white">
              <BarChart3 size={20} /> Reports
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition border border-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600"></div>
          <div className="flex flex-col">
            <span className="text-white text-xs font-medium">User Profile</span>
            <span className="text-[10px] text-gray-500">admin@negotiate.ai</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 md:p-12 max-w-6xl mx-auto w-full">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">Select Configuration</h1>
          <p className="text-gray-500">Step 1 of 3: Define your simulation parameters.</p>
        </div>

        {/* Mode Selection */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6"><Sparkles size={16} className="text-purple-400" /> <span className="text-sm font-medium text-purple-400 tracking-wider uppercase">Mode Selection</span></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['simulation', 'practice'].map((m) => (
              <div key={m} onClick={() => setMode(m)} className={`p-8 rounded-2xl border cursor-pointer transition-all duration-300 ${mode === m ? 'border-purple-500 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 shadow-[0_0_30px_rgba(139,92,246,0.1)]' : 'border-white/10 bg-[#121212] hover:border-white/30'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${mode === m ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-gray-500'}`}>
                    {m === 'simulation' ? <Sparkles size={24} /> : <User size={24} />}
                  </div>
                  {mode === m && <Check className="text-purple-400" />}
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">{m === 'simulation' ? 'Simulation Mode' : 'Practice Mode'}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{m === 'simulation' ? 'Watch AI agents negotiate to observe optimal strategies.' : 'Step into the arena. Test your skills against a high-performance AI.'}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scenario Selection */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6"><LayoutDashboard size={16} className="text-indigo-400" /> <span className="text-sm font-medium text-indigo-400 tracking-wider uppercase">Scenario Grid</span></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 'vendor', title: 'Vendor Pricing', desc: 'Negotiate a 15% reduction in yearly cloud infrastructure costs.', tag: 'Procurement' },
              { id: 'job', title: 'Job Offer', desc: 'Execute a high-stakes salary and equity negotiation for a Principal Engineer.', tag: 'HR' },
              { id: 'budget', title: 'Budget Allocation', desc: 'Defend your department\'s R&D budget against quarterly cross-functional cuts.', tag: 'Internal' }
            ].map((s) => (
              <div key={s.id} onClick={() => setScenario(s.id)} className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${scenario === s.id ? 'border-indigo-500 bg-white/5 shadow-lg' : 'border-white/10 bg-[#121212] hover:border-white/30'}`}>
                <div className="flex justify-between mb-4">
                  <span className="text-[10px] font-bold px-3 py-1 border border-white/10 rounded-full text-gray-400 bg-black/40">{s.tag}</span>
                </div>
                <h3 className="text-white font-medium text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex justify-end pt-8 border-t border-white/5">
          <button onClick={() => navigate('/arena')} className="glow-btn flex items-center gap-2">
            Continue <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
