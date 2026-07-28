import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import NegotiationArena from './components/NegotiationArena';
import OutcomeReport from './components/OutcomeReport';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0B0E14] text-gray-200">
        <Routes>
          {/* 
            Option 1: Login is the first page you see.
            If you want Home to be root, swap "/" and "/login" below.
          */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Dashboard / HomePage */}
          <Route path="/home" element={<HomePage />} />
          
          {/* Existing Internal Routes */}
          <Route path="/arena" element={<NegotiationArena />} />
          <Route path="/report" element={<OutcomeReport />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
