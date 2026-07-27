import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function OutcomeReport() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const [report, setReport] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/v1/sessions/${sessionId}/report`)
      .then((r) => r.json())
      .then((d) => {
        if (d.detail) setError(d.detail)
        else setReport(d)
      })
      .catch((e) => setError(e.message))
  }, [sessionId])

  if (error) {
    return (
      <div className="container" style={{ paddingTop: 40 }}>
        <div className="card">
          <h2>Error</h2>
          <p>{error}</p>
          <button className="btn btn-secondary" onClick={() => navigate('/')} style={{ marginTop: 16 }}>
            Go Home
          </button>
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="container" style={{ paddingTop: 40, textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading report...</p>
      </div>
    )
  }

  const statusColor =
    report.status === 'accepted'
      ? 'var(--accent)'
      : report.status === 'rejected'
      ? 'var(--accent-danger)'
      : 'var(--accent-warn)'

  const metrics = report.metrics || {}
  const consistency = metrics.consistency_score ?? '-'

  return (
    <div className="container" style={{ paddingTop: 40 }}>
      <div className="card" style={{ marginBottom: 24 }}>
        <h1 style={{ marginBottom: 8 }}>📋 Negotiation Outcome Report</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Session: <code>{sessionId}</code>
        </p>
      </div>

      <div className="report-grid">
        <div className="report-metric">
          <div className="report-metric-label">Status</div>
          <div className="report-metric-value" style={{ color: statusColor }}>
            {report.status.toUpperCase()}
          </div>
        </div>
        <div className="report-metric">
          <div className="report-metric-label">Total Rounds</div>
          <div className="report-metric-value">{report.total_rounds}</div>
        </div>
        <div className="report-metric">
          <div className="report-metric-label">Final Offer</div>
          <div className="report-metric-value">
            {report.final_offer != null ? `$${Number(report.final_offer).toLocaleString()}` : 'N/A'}
          </div>
        </div>
        <div className="report-metric">
          <div className="report-metric-label">Consistency Score</div>
          <div className="report-metric-value">{consistency}</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">Termination Reason</div>
        <p>{report.termination_reason}</p>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">Per-Agent Metrics</div>
        {Object.entries(metrics).filter(([k]) => k !== 'consistency_score').map(([agent, m]) => (
          <div key={agent} style={{ marginBottom: 16, padding: 16, background: 'var(--bg)', borderRadius: 8 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>🎭 {agent}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Opening Offer</div>
                <div style={{ fontWeight: 600 }}>${Number(m.opening_offer).toLocaleString()}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Final Offer</div>
                <div style={{ fontWeight: 600 }}>${Number(m.final_offer).toLocaleString()}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Concession</div>
                <div style={{ fontWeight: 600 }}>${Number(m.total_concession).toLocaleString()}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Reversals</div>
                <div style={{ fontWeight: 600 }}>{m.num_reversals}</div>
              </div>
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Concession Rates</div>
              <div style={{ fontSize: '0.85rem', fontFamily: 'monospace' }}>
                [{m.concession_rates.map((r) => r.toFixed(2)).join(', ')}]
              </div>
            </div>
          </div>
        ))}
        {Object.keys(metrics).filter((k) => k !== 'consistency_score').length === 0 && (
          <p style={{ color: 'var(--text-muted)' }}>No agent metrics available.</p>
        )}
      </div>

      <div className="card" style={{ marginBottom: 40 }}>
        <div className="card-header">Turn History</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {report.turn_history.map((t) => (
            <div key={`${t.turn_number}-${t.agent_id}`} style={{ padding: 12, background: 'var(--bg)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>Round {t.turn_number} — {t.agent_id}</span>
                <span className={`badge badge-${t.action === 'accept_offer' ? 'green' : t.action === 'reject_offer' ? 'red' : 'blue'}`}>
                  {t.action}
                </span>
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t.reasoning || '-'}</div>
              {t.offer != null && (
                <div style={{ marginTop: 6, fontWeight: 600 }}>Offer: ${Number(t.offer).toLocaleString()}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Negotiate Again
        </button>
      </div>
    </div>
  )
}
