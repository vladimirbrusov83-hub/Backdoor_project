'use client'
import Shell from '@/components/Shell'
import { useState } from 'react'
import {
  mockAlertsExtended,
} from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'
import type { Alert } from '@/lib/types'

type SeverityFilter = 'ALL' | 'critical' | 'warning' | 'info'
const SEVERITY_FILTERS: SeverityFilter[] = ['ALL', 'critical', 'warning', 'info']

const severityConfig = {
  critical: {
    icon: '▲',
    color: 'var(--red2)',
    border: 'var(--red-border)',
    bg: 'var(--red-bg)',
    label: 'CRITICAL',
    labelColor: '#c07070',
  },
  warning: {
    icon: '▶',
    color: 'var(--amber)',
    border: '#4a3a10',
    bg: '#1a1508',
    label: 'WARNING',
    labelColor: 'var(--amber)',
  },
  info: {
    icon: '◆',
    color: 'var(--text3)',
    border: 'var(--border)',
    bg: 'var(--bg3)',
    label: 'INFO',
    labelColor: 'var(--text2)',
  },
}

export default function AlertsPage() {
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('ALL')
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const visible = mockAlertsExtended.filter(a => !dismissed.has(a.id))
  const filtered = visible.filter(a =>
    severityFilter === 'ALL' || a.severity === severityFilter
  )

  const criticalCount = visible.filter(a => a.severity === 'critical').length
  const warningCount  = visible.filter(a => a.severity === 'warning').length

  const handleDismiss = (id: string) => {
    setDismissed(prev => new Set([...prev, id]))
  }

  const handleDismissAll = () => {
    setDismissed(new Set(mockAlertsExtended.map(a => a.id)))
  }

  return (
    <Shell activePath="/alerts">
      
        <Sidebar activePath="/alerts" />
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>

          {/* Header */}
          <div style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '14px' }}>
            <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '5px' }}>
              BACK-NET — ACTIVE ALERTS
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '22px', fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                ACTIVE ALERTS —{' '}
                <span style={{ color: criticalCount > 0 ? 'var(--red2)' : 'var(--amber2)' }}>
                  {visible.length}
                </span>{' '}
                ACTIVE
              </div>
              {visible.length > 0 && (
                <button
                  onClick={handleDismissAll}
                  style={{
                    background: 'var(--bg2)', border: '1px solid var(--border)',
                    color: 'var(--text3)', fontFamily: 'var(--mono)', fontSize: '10px',
                    padding: '5px 12px', cursor: 'pointer', letterSpacing: '1px',
                  }}
                >
                  DISMISS ALL
                </button>
              )}
            </div>
          </div>

          {/* Summary strip */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {criticalCount > 0 && (
              <div style={{ background: 'var(--red-bg)', border: '1px solid var(--red-border)', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--red2)', fontSize: '14px', fontWeight: 'bold' }}>▲</span>
                <span style={{ fontSize: '11px', color: '#c07070', letterSpacing: '1px' }}>
                  {criticalCount} CRITICAL — IMMEDIATE ACTION REQUIRED
                </span>
              </div>
            )}
            {warningCount > 0 && (
              <div style={{ background: '#1a1508', border: '1px solid #4a3a10', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--amber)', fontSize: '14px' }}>▶</span>
                <span style={{ fontSize: '11px', color: 'var(--amber)', letterSpacing: '1px' }}>
                  {warningCount} WARNING — MONITOR SITUATION
                </span>
              </div>
            )}
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '5px', marginBottom: '16px' }}>
            {SEVERITY_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setSeverityFilter(f)}
                style={{
                  background: severityFilter === f ? 'var(--amber-glow2)' : 'var(--bg2)',
                  border: `1px solid ${severityFilter === f ? 'var(--amber)' : 'var(--border)'}`,
                  color: severityFilter === f ? 'var(--amber)' : 'var(--text2)',
                  fontFamily: 'var(--mono)', fontSize: '10px', padding: '4px 10px',
                  cursor: 'pointer', letterSpacing: '1px',
                }}
              >
                {f === 'ALL' ? `ALL (${visible.length})` : `${f.toUpperCase()} (${visible.filter(a => a.severity === f).length})`}
              </button>
            ))}
          </div>

          {/* Alert list */}
          {filtered.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', border: '1px solid var(--border)', background: 'var(--bg2)' }}>
              <div style={{ fontFamily: 'var(--display)', fontSize: '32px', color: '#3aaa5a', marginBottom: '8px' }}>✓</div>
              <div style={{ fontSize: '12px', color: 'var(--text3)', letterSpacing: '2px' }}>
                {dismissed.size > 0 ? 'ALL ALERTS DISMISSED' : 'NO ACTIVE ALERTS'}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text3)', marginTop: '6px' }}>
                BACK-NET STATUS: NOMINAL
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filtered.map(alert => {
                const cfg = severityConfig[alert.severity]
                return (
                  <div
                    key={alert.id}
                    style={{
                      background: cfg.bg,
                      border: `1px solid ${cfg.border}`,
                      padding: '14px 16px',
                      display: 'flex',
                      gap: '14px',
                      alignItems: 'flex-start',
                    }}
                  >
                    <span style={{ color: cfg.color, fontSize: '16px', flexShrink: 0, marginTop: '1px', fontWeight: 'bold' }}>
                      {cfg.icon}
                    </span>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                        <span style={{
                          fontSize: '8px', padding: '2px 7px', letterSpacing: '1px',
                          background: 'rgba(0,0,0,0.3)', border: `1px solid ${cfg.border}`,
                          color: cfg.color,
                        }}>
                          {cfg.label}
                        </span>
                        {alert.location && (
                          <span style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '1px' }}>
                            {alert.location}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '12px', color: cfg.labelColor, lineHeight: 1.7, marginBottom: '6px' }}>
                        {alert.message}
                      </div>
                      <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '1px' }}>
                        {timeAgo(alert.timestamp)}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDismiss(alert.id)}
                      style={{
                        background: 'transparent', border: `1px solid ${cfg.border}`,
                        color: 'var(--text3)', fontFamily: 'var(--mono)', fontSize: '9px',
                        padding: '4px 10px', cursor: 'pointer', letterSpacing: '1px',
                        flexShrink: 0,
                      }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text3)')}
                    >
                      DISMISS
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {dismissed.size > 0 && (
            <div style={{ marginTop: '16px', padding: '8px 12px', background: 'var(--bg2)', border: '1px solid var(--border)', fontSize: '10px', color: 'var(--text3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{dismissed.size} alert{dismissed.size !== 1 ? 's' : ''} dismissed this session</span>
              <button
                onClick={() => setDismissed(new Set())}
                style={{
                  background: 'none', border: 'none', color: 'var(--amber-dim)',
                  fontFamily: 'var(--mono)', fontSize: '9px', cursor: 'pointer',
                  letterSpacing: '1px', padding: 0,
                }}
              >
                RESTORE ALL
              </button>
            </div>
          )}
        </main>
          </Shell>
  )
}
