import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SCENARIOS = [
  {
    key: 'vendor_pricing',
    title: 'Vendor Pricing',
    desc: 'Negotiate an annual software license fee between a SaaS vendor and a procurement buyer.',
    agentA: 'Vendor (Aggressive, profit-oriented)',
    agentB: 'Buyer (Collaborative, budget-conscious)',
  },
  {
    key: 'job_offer',
    title: 'Job Offer',
    desc: 'Negotiate salary and compensation between a startup recruiter and a senior engineer candidate.',
    agentA: 'HR (Risk-averse, analytical)',
    agentB: 'Candidate (Assertive, confident)',
  },
  {
    key: 'project_budget',
    title: 'Project Budget Allocation',
    desc: 'Negotiate funding for a 6-month initiative between a project manager and finance lead.',
    agentA: 'Manager (Deadline-driven, strategic)',
    agentB: 'Employee (Collaborative, practical)',
  },
]

export default function HomePage() {
  const [selectedScenario, setSelectedScenario] = useState('vendor_pricing')
  const [mode, setMode] = useState('simulation')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const start = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/v1/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario: selectedScenario, mode }),
      })
      const data = await res.json()
      if (res.ok) {
        navigate(`/arena/${data.session_id}`)
      } else {
        alert(data.detail || 'Failed to start session')
      }
    } catch (e) {
      alert('Network error: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ paddingTop: 40 }}>
      <div className="card" style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: '2rem', marginBottom: 8 }}>🤝 Multi-Agent Negotiation Simulator</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Powered by Groq LLM • RAG Knowledge Base • Real-time Analytics
        </p>
      </div>

      <div className="card">
        <div className="card-header">1. Select Scenario</div>
        <div className="scenario-grid">
          {SCENARIOS.map((s) => (
            <div
              key={s.key}
              className={`scenario-card ${selectedScenario === s.key ? 'selected' : ''}`}
              onClick={() => setSelectedScenario(s.key)}
            >
              <div className="scenario-title">{s.title}</div>
              <div className="scenario-desc">{s.desc}</div>
              <div style={{ marginTop: 12, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <div>🎭 {s.agentA}</div>
                <div>🎭 {s.agentB}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-header">2. Select Mode</div>
        <div className="mode-toggle">
          <div className={`mode-btn ${mode === 'simulation' ? 'active' : ''}`} onClick={() => setMode('simulation')}>
            <span className="mode-label">Simulation Mode</span>
            <span className="mode-desc">Watch two AI agents negotiate autonomously</span>
          </div>
          <div className={`mode-btn ${mode === 'practice' ? 'active' : ''}`} onClick={() => setMode('practice')}>
            <span className="mode-label">Practice Mode</span>
            <span className="mode-desc">You negotiate against an AI agent</span>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <button className="btn btn-primary" onClick={start} disabled={loading} style={{ minWidth: 240 }}>
          {loading ? 'Starting...' : 'Start Negotiation'}
        </button>
      </div>
    </div>
  )
}
