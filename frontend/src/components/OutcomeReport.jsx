import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight, CheckCircle, FileText, TrendingUp, Activity, BrainCircuit } from 'lucide-react';

const data = [
  { name: 'Round 1', buyer: 50, seller: 95 },
  { name: 'Round 3', buyer: 65, seller: 85 },
  { name: 'Round 5', buyer: 75, seller: 78 },
  { name: 'Round 7', buyer: 77.5, seller: 77.5 },
];

const OutcomeReport = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0E14] text-gray-200 p-8 flex justify-center">
      <div className="max-w-6xl w-full">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <FileText className="text-gray-400" size={24} />
            <h1 className="text-2xl font-semibold text-white">Outcome Report</h1>
            <span className="text-[10px] bg-green-900/40 text-green-400 px-3 py-1 rounded-full border border-green-900/50">STATUS: FINALIZED</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <Activity size={18} className="cursor-pointer hover:text-white" />
            <BrainCircuit size={18} className="cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* Main Result Banner */}
        <div className="bg-[#11161F] border border-[#2A2D36] rounded-xl p-8 mb-6 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 border border-green-500/30">
            <CheckCircle className="text-green-400" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white">Agreement at $77,500</h2>
          <p className="text-gray-400 mt-1">Reached in 7 of 10 rounds</p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'DEAL QUALITY', value: '94', sub: '/100' },
            { label: 'EFFICIENCY', value: '82', sub: '%' },
            { label: 'GOAL REACHED', value: 'Yes', sub: '', color: 'text-green-400' },
            { label: 'PACE', value: 'Fast', sub: '', color: 'text-green-400' },
          ].map((kpi, idx) => (
            <div key={idx} className="bg-[#11161F] border border-[#2A2D36] rounded-xl p-4">
              <div className="text-[10px] text-gray-500 font-bold tracking-wider mb-1">{kpi.label}</div>
              <div className={`text-2xl font-bold ${kpi.color || 'text-white'}`}>{kpi.value} <span className="text-sm text-gray-500 font-normal">{kpi.sub}</span></div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Convergence Chart */}
          <div className="md:col-span-2 bg-[#11161F] border border-[#2A2D36] rounded-xl p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-sm font-medium text-white">CONVERGENCE CHART</h3>
              <div className="flex gap-4 text-xs">
                <span className="flex items-center gap-2 text-blue-400"><div className="w-2 h-2 rounded-full bg-blue-400"></div> Agent A (Buyer)</span>
                <span className="flex items-center gap-2 text-green-400"><div className="w-2 h-2 rounded-full bg-green-400"></div> Agent B (Seller)</span>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBuyer" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSeller" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2D36" vertical={false} />
                  <XAxis dataKey="name" tick={{fill: '#6b7280', fontSize: 10}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fill: '#6b7280', fontSize: 10}} axisLine={false} tickLine={false} domain={[40, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#11161F', borderColor: '#2A2D36', color: '#fff' }} 
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="buyer" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBuyer)" strokeWidth={2} />
                  <Area type="monotone" dataKey="seller" stroke="#22c55e" fillOpacity={1} fill="url(#colorSeller)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Key Moments */}
          <div className="bg-[#11161F] border border-[#2A2D36] rounded-xl p-6">
            <h3 className="text-sm font-medium text-white mb-4">KEY MOMENTS</h3>
            <div className="space-y-6 relative before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-[1px] before:bg-[#2A2D36]">
              {[
                { round: 'Round 2', text: 'Agent A anchored with a aggressive $65k opening, testing resistance levels.' },
                { round: 'Round 5', text: 'Agent B conceded on shipping terms to maintain price floor above $75k.' },
                { round: 'Round 7', text: 'Final convergence reached. Agreement locked at optimal technical delta.' },
              ].map((moment, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-[#2A2D36] bg-[#11161F] ${idx === 0 ? 'border-blue-400' : idx === 1 ? 'border-green-400' : 'border-purple-400'}`}></div>
                  <div className="text-xs text-gray-500 font-bold mb-0.5">{moment.round}</div>
                  <p className="text-sm text-gray-300 leading-relaxed">{moment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#11161F] border border-[#2A2D36] rounded-xl p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-sm font-medium text-white">VOLATILITY INDEX</h3>
              <span className="text-xs text-gray-500">0.24</span>
            </div>
            <div className="flex gap-2 h-10 items-end">
              <div className="flex-1 h-4 bg-[#2A2D36] rounded-sm"></div>
              <div className="flex-1 h-6 bg-[#2A2D36] rounded-sm"></div>
              <div className="flex-1 h-8 bg-purple-600/50 rounded-sm"></div>
              <div className="flex-1 h-6 bg-[#2A2D36] rounded-sm"></div>
              <div className="flex-1 h-4 bg-[#2A2D36] rounded-sm"></div>
            </div>
          </div>

          <div className="bg-[#11161F] border border-[#2A2D36] rounded-xl p-6 relative overflow-hidden">
            <h3 className="text-sm font-medium text-white mb-4">STRATEGY EFFECTIVENESS</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1"><span>Logic Consistency</span> <span className="text-green-400">94%</span></div>
                <div className="w-full bg-[#2A2D36] rounded-full h-1.5">
                  <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1"><span>Emotional Control</span> <span className="text-green-400">88%</span></div>
                <div className="w-full bg-[#2A2D36] rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
            </div>
            {/* Decorative Overlay */}
            <div className="absolute -bottom-10 -right-10 opacity-5">
              <BrainCircuit size={160} className="text-white" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button className="px-6 py-2.5 border border-[#2A2D36] rounded-lg text-gray-300 hover:bg-[#1E2330] transition">Export report</button>
          <button onClick={() => navigate('/')} className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition">Run again</button>
        </div>

      </div>
    </div>
  );
};

export default OutcomeReport;
