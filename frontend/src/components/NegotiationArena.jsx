import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, User, Bot, ChevronDown, Pause, Play } from 'lucide-react';

const NegotiationArena = () => {
  const navigate = useNavigate();
  const [round, setRound] = useState(4);
  const [currentOffer, setCurrentOffer] = useState("$142,500.00");
  const [input, setInput] = useState("");
  
  // Mock data to simulate WebSocket updates
  const [chatHistory, setChatHistory] = useState([
    { id: 1, agent: 'Agent Alpha (Buyer)', time: '14:02:11', type: 'counter', amount: '$142,500.00', text: 'Based on current market benchmarks for enterprise-tier technical intelligence, our valuation accounts for the 24-month lock-in period requested in Round 3.' },
    { id: 2, agent: 'Agent Sigma (Seller)', time: '14:02:45', type: 'reject', amount: '$168,000.00', text: 'The proposed figure does not adequately cover the priority support SLA. We are willing to move to $168k if the implementation window is reduced to 30 days.' },
    { id: 3, agent: 'Agent Alpha (Buyer)', time: '14:03:12', type: 'counter', amount: '$155,000.00', text: 'Splitting the difference on the support SLA. This is our final move for Round 4. Requesting validation from Vendor Management Office.' },
  ]);

  // Simulate Turn Update
  useEffect(() => {
    // In a real app, this is driven by a WebSocket listener (ws://localhost:8000/ws/{session_id})
    const timer = setTimeout(() => {
      setRound(5);
      setCurrentOffer("$155,000.00");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: chatHistory.length + 1,
      agent: 'You (User)',
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit' }),
      type: 'counter',
      amount: input.match(/\$[\d,]+/)?.[0] || '$0',
      text: input
    };
    setChatHistory([...chatHistory, newMsg]);
    setInput("");
  };

  // Mock End Session
  const handleEndNegotiation = () => {
    navigate('/report');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0B0E14] text-gray-300">
      {/* Sidebar (Static) */}
      <div className="w-64 bg-[#11161F] border-r border-[#2A2D36] p-6 flex flex-col hidden md:flex">
        <div className="flex items-center gap-2 mb-10 text-white font-bold text-xl">
          <div className="bg-purple-600 p-1 rounded"><ArrowRight size={16} /></div> NegotiateAI
        </div>
        <nav className="space-y-2 text-sm text-gray-400">
          <div className="flex items-center gap-3 p-3 hover:bg-[#1E2330] rounded-lg cursor-pointer transition">Scenarios</div>
          <div className="flex items-center gap-3 p-3 bg-[#1E2330] rounded-lg text-white cursor-pointer transition">Sessions</div>
          <div className="flex items-center gap-3 p-3 hover:bg-[#1E2330] rounded-lg cursor-pointer transition">Reports</div>
        </nav>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full relative">
        
        {/* Header */}
        <header className="h-16 border-b border-[#2A2D36] flex items-center justify-between px-6 bg-[#11161F]">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-white">Vendor pricing</h2>
            <span className="text-xs bg-[#2A2D36] px-3 py-1 rounded-full text-gray-400">Round {round} of 10</span>
            <span className="flex items-center gap-1 text-xs text-green-400 bg-green-900/20 px-2 py-1 rounded-full"><div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> LIVE</span>
          </div>
          <div className="flex gap-4 text-gray-400">
            <Pause size={18} className="cursor-pointer hover:text-white" />
            <Play size={18} className="cursor-pointer hover:text-white" />
          </div>
        </header>

        {/* Stance Cards */}
        <div className="grid grid-cols-2 border-b border-[#2A2D36] bg-[#0E121B] p-4 text-sm">
          <div className="border-r border-[#2A2D36] pr-4">
            <div className="flex justify-between text-xs text-purple-400 mb-2">
              <span>BUYER STANCE</span>
              <span className="text-gray-400">Aggressive</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-xs">Focusing on volume-based discounts and multi-year commitment leverage. Maintaining a 15% delta from initial quote.</p>
          </div>
          <div className="pl-4">
            <div className="flex justify-between text-xs text-green-400 mb-2">
              <span>SELLER STANCE</span>
              <span className="text-gray-400">Collaborative</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-xs">Protecting unit margins while offering value-added implementation support. Attempting to anchor around service level tier 2.</p>
          </div>
        </div>

        {/* Chat / Transcript Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#080B12]">
          <div className="flex justify-between text-xs text-gray-500 mb-4">
            <span>NEGOTIATION TRANSCRIPT</span>
            <span>Real-time latency: 42ms</span>
          </div>

          {chatHistory.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.agent.includes('You') ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <span className={`font-medium ${msg.agent.includes('Alpha') ? 'text-blue-400' : msg.agent.includes('Sigma') ? 'text-green-400' : 'text-white'}`}>{msg.agent}</span>
                <span>{msg.time}</span>
              </div>
              
              <div className={`max-w-[80%] md:max-w-[60%] p-4 rounded-lg border border-[#2A2D36] bg-[#11161F] ${msg.agent.includes('You') ? 'border-purple-500/30 bg-purple-900/10' : ''}`}>
                {msg.type === 'reject' && (
                   <span className="text-[10px] font-bold text-green-400 block mb-2 border border-green-400/30 w-fit px-2 py-0.5 rounded">REJECT</span>
                )}
                {msg.type === 'counter' && (
                   <span className="text-[10px] font-bold text-blue-400 block mb-2">COUNTER-OFFER</span>
                )}
                
                <div className="text-2xl font-semibold text-white mb-2">{msg.amount}</div>
                <p className="text-sm text-gray-300 leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Controls / Input */}
        <div className="border-t border-[#2A2D36] bg-[#11161F] p-4">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="bg-[#0B0E14] p-3 rounded border border-[#2A2D36]">
              <div className="text-[10px] text-gray-500">CURRENT GAP</div>
              <div className="text-white font-medium flex items-baseline gap-2">$13,000 <span className="text-[10px] text-red-400">(8.4%)</span></div>
            </div>
            <div className="bg-[#0B0E14] p-3 rounded border border-[#2A2D36]">
              <div className="text-[10px] text-gray-500">CONCESSION RATE</div>
              <div className="text-white font-medium">1.2% <span className="text-[10px] text-gray-500">/round</span></div>
            </div>
            <div className="bg-[#0B0E14] p-3 rounded border border-[#2A2D36]">
              <div className="text-[10px] text-gray-500">EST. ROUNDS LEFT</div>
              <div className="text-white font-medium">6 <span className="text-[10px] text-gray-500">rounds</span></div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleEndNegotiation} className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded font-medium transition">End Session</button>
            </div>
          </div>

          <div className="flex gap-3">
            <input 
              type="text" 
              placeholder="Type your offer or message (e.g., $150,000 for 2-year deal)..."
              className="flex-1 bg-[#0B0E14] border border-[#2A2D36] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              onClick={handleSendMessage}
              className="bg-[#1E2330] hover:bg-[#2A2D36] border border-[#2A2D36] text-white px-6 rounded-lg transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NegotiationArena;
