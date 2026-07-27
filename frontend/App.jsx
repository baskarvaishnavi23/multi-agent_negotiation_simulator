import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import NegotiationArena from './components/NegotiationArena'
import OutcomeReport from './components/OutcomeReport'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/arena/:sessionId" element={<NegotiationArena />} />
      <Route path="/report/:sessionId" element={<OutcomeReport />} />
    </Routes>
  )
}

export default App
