'use client'
import Shell from '@/components/Shell'
import { useState } from 'react'
import {
  mockReports,
} from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'
import type { DocType, DocStatus } from '@/lib/types'

type TypeFilter = 'ALL' | DocType
type StatusFilter = 'ALL' | DocStatus
const TYPE_FILTERS: TypeFilter[] = ['ALL', 'level', 'entity', 'object', 'phenomenon', 'group']
const STATUS_FILTERS: StatusFilter[] = ['ALL', 'verified', 'pending', 'flagged', 'restricted']

const typeLabel: Record<string, string> = {
  level:      'LVL',
  entity:     'ENT',
  object:     'OBJ',
  phenomenon: 'PHN',
  group:      'GRP',
  tale:       'TALE',
}
const statusColors: Record<string, { bg: string; border: string; color: string }> = {
  verified:   { bg: 'rgba(26,92,42,0.15)',    border: '#1a4a28',            color: '#3aaa5a' },
  pending:    { bg: 'rgba(200,151,42,0.1)',   border: 'var(--amber-dim)',   color: 'var(--amber)' },
  flagged:    { bg: 'rgba(139,32,32,0.15)',   border: 'var(--red-border)',  color: 'var(--red2)' },
  restricted: { bg: 'var(--red-bg)',          border: 'var(--red-border)',  color: 'var(--red2)' },
}
const typeColors: Record<string, string> = {
  level:      'var(--amber)',
  entity:     'var(--red2)',
  object:     'var(--amber2)',
  phenomenon: 'var(--amber)',
  group:      'var(--text2)',
  tale:       'var(--text2)',
}
const refPath: Record<string, string> = {
  level:      'levels',
  entity:     'entities',
  object:     'objects',
  phenomenon: 'phenomena',
  group:      'groups',
  tale:       'tales',
}

export default function ReportsPage() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('ALL')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL')

  const filtered = mockReports.filter(r => {
    const q = search.toLowerCase()
    const matchSearch = q === '' || r.title.toLowerCase().includes(q) || r.author_operative_id.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q)
    const matchType = typeFilter === 'ALL' || r.doc_type === typeFilter
    const matchStatus = statusFilter === 'ALL' || r.status === statusFilter
    return matchSearch && matchType && matchStatus
  })

  const pendingCount = mockReports.filter(r => r.status === 'pending').length
  const flaggedCount = mockReports.filter(r => r.status === 'flagged').length

  return (
    <Shell activePath="/reports">
      
        <Sidebar activePath="/reports" />
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {/* Header */}
          <div style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '14px' }}>
            <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '5px' }}>
              M.E.G. PROMETHEUS LIBRARY — FIELD REPORTS
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '22px', fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
              M.E.G. FIELD REPORTS —{' '}
              <span style={{ color: 'var(--amber2)' }}>{mockReports.length}</span>{' '}
              ON FILE
            </div>
            {/* Status summary strip */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {pendingCount > 0 && (
                <div style={{ background: 'rgba(200,151,42,0.1)', border: '1px solid var(--amber-dim)', padding: '6px 12px', fontSize: '10px', color: 'var(--amber)', letterSpacing: '1px' }}>
                  ▶ {pendingCount} PENDING REVIEW
                </div>
              )}
              {flaggedCount > 0 && (
                <div style={{ background: 'rgba(139,32,32,0.15)', border: '1px solid var(--red-border)', padding: '6px 12px', fontSize: '10px', color: 'var(--red2)', letterSpacing: '1px' }}>
                  ▲ {flaggedCount} FLAGGED — ACTION REQUIRED
                </div>
              )}
            </div>
          </div>

          {/* Search */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'var(--bg2)', border: '1px solid var(--border2)', padding: '8px 12px', marginBottom: '12px' }}>
            <span style={{ color: 'var(--amber2)', fontSize: '13px' }}>&gt;</span>
            <input
              type="text"
              placeholder="SEARCH REPORTS BY TITLE, AUTHOR, OR SUMMARY..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text)',
                letterSpacing: '1px', caretColor: 'var(--amber2)',
              }}
            />
            <span style={{ fontSize: '10px', color: 'var(--text3)', flexShrink: 0 }}>{filtered.length} RESULTS</span>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '5px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            {TYPE_FILTERS.map(f => (
              <button key={f} onClick={() => setTypeFilter(f)} style={{
                background: typeFilter === f ? 'var(--amber-glow2)' : 'var(--bg2)',
                border: `1px solid ${typeFilter === f ? 'var(--amber)' : 'var(--border)'}`,
                color: typeFilter === f ? 'var(--amber)' : 'var(--text2)',
                fontFamily: 'var(--mono)', fontSize: '10px', padding: '4px 10px',
                cursor: 'pointer', letterSpacing: '1px',
              }}>
                {f === 'ALL' ? 'ALL TYPES' : typeLabel[f] ?? f.toUpperCase()}
              </button>
            ))}
            <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 4px' }} />
            {STATUS_FILTERS.map(f => (
              <button key={f} onClick={() => setStatusFilter(f)} style={{
                background: statusFilter === f ? 'var(--amber-glow2)' : 'var(--bg2)',
                border: `1px solid ${statusFilter === f ? 'var(--amber)' : 'var(--border)'}`,
                color: statusFilter === f ? 'var(--amber)' : 'var(--text2)',
                fontFamily: 'var(--mono)', fontSize: '10px', padding: '4px 10px',
                cursor: 'pointer', letterSpacing: '1px',
              }}>
                {f === 'ALL' ? 'ALL STATUS' : f.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Reports list */}
          {filtered.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text3)', fontSize: '12px', letterSpacing: '2px', border: '1px solid var(--border)', background: 'var(--bg2)' }}>
              &gt; NO REPORTS MATCH — ADJUST SEARCH OR FILTERS
            </div>
          ) : (
            <div style={{ border: '1px solid var(--border)' }}>
              {filtered.map((rpt, i) => {
                const sc = statusColors[rpt.status] ?? statusColors.pending
                const href = `/${refPath[rpt.doc_type] ?? rpt.doc_type}/${rpt.ref_id}`
                return (
                  <div
                    key={rpt.id}
                    style={{
                      borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--amber-glow)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                  >
                    <div style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '6px' }}>
                        {/* Type badge */}
                        <span style={{
                          fontSize: '8px', padding: '2px 6px', letterSpacing: '1px', flexShrink: 0, marginTop: '2px',
                          background: 'var(--bg3)', border: '1px solid var(--border2)',
                          color: typeColors[rpt.doc_type] ?? 'var(--text2)',
                        }}>
                          {typeLabel[rpt.doc_type] ?? rpt.doc_type.toUpperCase()}
                        </span>

                        {/* Title */}
                        <a href={href} style={{ textDecoration: 'none', flex: 1 }}>
                          <div style={{ fontFamily: 'var(--sans)', fontSize: '13px', fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>
                            {rpt.title}
                          </div>
                        </a>

                        {/* Status badge */}
                        <span style={{
                          fontSize: '8px', padding: '2px 8px', letterSpacing: '1px', flexShrink: 0,
                          background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color,
                        }}>
                          {rpt.status.toUpperCase()}
                        </span>
                      </div>

                      {/* Summary */}
                      <div style={{ fontSize: '11px', color: 'var(--text2)', lineHeight: 1.6, marginLeft: '46px', marginBottom: '6px' }}>
                        {rpt.summary}
                      </div>

                      {/* Footer */}
                      <div style={{ display: 'flex', gap: '16px', fontSize: '9px', color: 'var(--text3)', marginLeft: '46px' }}>
                        <span style={{ color: 'var(--amber-dim)' }}>{rpt.author_operative_id}</span>
                        <span>{timeAgo(rpt.updated_at)}</span>
                        <a href={href} style={{ color: 'var(--amber-dim)', textDecoration: 'none', marginLeft: 'auto' }}>
                          VIEW DOCUMENT ›
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </main>
          </Shell>
  )
}
