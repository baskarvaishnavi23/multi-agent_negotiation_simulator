import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, User, Check, ChevronRight, Zap, Users, Briefcase, PieChart } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('simulation');
  const [scenario, setScenario] = useState('vendor');

  const handleStart = () => {
    // In a real app, this sends a POST /start request to FastAPI
    navigate('/arena');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (Static placeholder) */}
      <div className="w-64 bg-[#11161F] border-r border-[#2A2D36] p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-2 mb-10 text-white font-bold text-xl">
            <Zap className="text-purple-500 fill-current" />
            NegotiateAI
          </div>
          <nav className="space-y-2 text-sm text-gray-400">
            <div className="flex items-center gap-3 p-3 bg-[#1E2330] rounded-lg text-purple-400 border border-[#2A2D36]">
              <Users size={20} /> Scenarios
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-[#1E2330] rounded-lg cursor-pointer transition">
              <Briefcase size={20} /> Sessions
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-[#1E2330] rounded-lg cursor-pointer transition">
              <PieChart size={20} /> Reports
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 md:p-12 max-w-5xl mx-auto">
        <div className="mb-8 text-sm text-gray-500 uppercase tracking-wide">Step 1 of 3</div>
        <h1 className="text-3xl font-semibold text-white mb-8">Select your configuration</h1>

        {/* Mode Selection */}
        <div className="mb-10">
          <div className="text-xs text-purple-400 uppercase tracking-wider mb-4">Mode Selection</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              onClick={() => setMode('simulation')}
              className={`p-6 rounded-xl border cursor-pointer transition-all ${mode === 'simulation' ? 'border-purple-500 bg-[#1A1625] ring-1 ring-purple-500' : 'border-[#2A2D36] bg-[#11161F] hover:border-gray-600'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-[#2A1B4D] rounded-lg text-purple-400"><Sparkles size={24} /></div>
                {mode === 'simulation' && <Check className="text-purple-400" />}
              </div>
              <h3 className="text-white font-medium text-lg">Simulation mode</h3>
              <p className="text-sm text-gray-400 mt-2">Watch AI agents negotiate with each other to observe optimal strategies and outcomes in real-time.</p>
            </div>

            <div 
              onClick={() => setMode('practice')}
              className={`p-6 rounded-xl border cursor-pointer transition-all ${mode === 'practice' ? 'border-purple-500 bg-[#1A1625] ring-1 ring-purple-500' : 'border-[#2A2D36] bg-[#11161F] hover:border-gray-600'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-[#1A2234] rounded-lg text-blue-400"><User size={24} /></div>
                {mode === 'practice' && <Check className="text-purple-400" />}
              </div>
              <h3 className="text-white font-medium text-lg">Practice mode</h3>
              <p className="text-sm text-gray-400 mt-2">Step into the negotiation yourself. Test your skills against a high-performance technical AI agent.</p>
            </div>
          </div>
        </div>

        {/* Scenario Grid */}
        <div className="mb-10">
          <div className="text-xs text-purple-400 uppercase tracking-wider mb-4">Scenario Grid</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 'vendor', title: 'Vendor pricing', desc: 'Negotiate a 15% reduction in yearly cloud infrastructure costs with a major service provider.', tag: 'Procurement' },
              { id: 'job', title: 'Job offer', desc: 'Execute a high-stakes salary and equity negotiation for a Principal Engineer candidate.', tag: 'HR' },
              { id: 'budget', title: 'Budget allocation', desc: 'Defend your department\'s R&D budget against quarterly cross-functional cuts.', tag: 'Internal' }
            ].map((s) => (
              <div
                key={s.id}
                onClick={() => setScenario(s.id)}
                className={`p-6 rounded-xl border cursor-pointer transition-all ${scenario === s.id ? 'border-purple-500 bg-[#1A1625]' : 'border-[#2A2D36] bg-[#11161F] hover:border-gray-600'}`}
              >
                <div className="flex justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-1 border border-[#2A2D36] rounded-full text-gray-300">{s.tag}</span>
                  <span className="text-gray-500 text-xs">ⓘ</span>
                </div>
                <h3 className="text-white font-medium text-lg">{s.title}</h3>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">{s.desc}</p>
                <button className={`w-full mt-4 py-2 border rounded-lg text-sm transition ${scenario === s.id ? 'border-purple-500 text-purple-300 bg-purple-900/20' : 'border-[#2A2D36] text-gray-400 hover:border-gray-500'}`}>
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex justify-end pt-4 border-t border-[#2A2D36]">
          <button 
            onClick={handleStart}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition"
          >
            Continue <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
