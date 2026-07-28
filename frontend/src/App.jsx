import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import NegotiationArena from './components/NegotiationArena';
import OutcomeReport from './components/OutcomeReport';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0B0E14] text-gray-200">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/arena" element={<NegotiationArena />} />
          <Route path="/report" element={<OutcomeReport />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
