'use client'
import { useState } from 'react'
import TopBar from '@/components/TopBar'
import Sidebar from '@/components/Sidebar'
import RightPanel from '@/components/RightPanel'
import {
  mockPhenomena,
  mockCurrentOperative,
  mockMessages,
  mockActivity,
} from '@/lib/mock-data'
import type { Phenomenon } from '@/lib/types'

type StatusFilter = 'ALL' | 'documented' | 'under_study' | 'unverified'
const STATUS_FILTERS: StatusFilter[] = ['ALL', 'documented', 'under_study', 'unverified']

const statusColor: Record<string, string> = {
  documented:  '#3aaa5a',
  under_study: 'var(--amber)',
  unverified:  'var(--text3)',
}
const statusLabel: Record<string, string> = {
  documented:  'DOCUMENTED',
  under_study: 'UNDER STUDY',
  unverified:  'UNVERIFIED',
}

function PhenomenonCard({ phen }: { phen: Phenomenon }) {
  return (
    <a href={`/phenomena/${phen.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        style={{
          background: 'var(--bg2)',
          border: '1px solid var(--border)',
          padding: '14px',
          height: '100%',
          cursor: 'pointer',
          transition: 'border-color 0.15s',
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border)')}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <div style={{ fontFamily: 'var(--sans)', fontSize: '15px', fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {phen.name}
          </div>
          <span style={{
            fontSize: '8px', padding: '2px 7px', letterSpacing: '1px', flexShrink: 0, marginLeft: '8px',
            border: `1px solid ${statusColor[phen.status]}`,
            color: statusColor[phen.status], background: 'var(--bg3)',
          }}>
            {statusLabel[phen.status]}
          </span>
        </div>
        <div className="clamp-3" style={{ fontSize: '11px', color: 'var(--text2)', lineHeight: 1.7 }}>
          {phen.description}
        </div>
      </div>
    </a>
  )
}

export default function PhenomenaPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL')

  const filtered = mockPhenomena.filter(p => {
    const q = search.toLowerCase()
    const matchSearch = q === '' || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    const matchStatus = statusFilter === 'ALL' || p.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <TopBar operative={mockCurrentOperative} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar activePath="/phenomena" />
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          <div style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '14px' }}>
            <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '5px' }}>
              M.E.G. PROMETHEUS LIBRARY — PHENOMENA REGISTRY
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '22px', fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '2px' }}>
              PHENOMENA REGISTRY —{' '}
              <span style={{ color: 'var(--amber2)' }}>{mockPhenomena.length}</span>{' '}
              DOCUMENTED
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'var(--bg2)', border: '1px solid var(--border2)', padding: '8px 12px', marginBottom: '12px' }}>
            <span style={{ color: 'var(--amber2)', fontSize: '13px' }}>&gt;</span>
            <input
              type="text"
              placeholder="SEARCH PHENOMENA BY NAME OR DESCRIPTION..."
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

          <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
            {STATUS_FILTERS.map(f => (
              <button key={f} onClick={() => setStatusFilter(f)} style={{
                background: statusFilter === f ? 'var(--amber-glow2)' : 'var(--bg2)',
                border: `1px solid ${statusFilter === f ? 'var(--amber)' : 'var(--border)'}`,
                color: statusFilter === f ? 'var(--amber)' : 'var(--text2)',
                fontFamily: 'var(--mono)', fontSize: '10px', padding: '4px 10px',
                cursor: 'pointer', letterSpacing: '1px',
              }}>
                {f === 'ALL' ? 'ALL' : statusLabel[f]}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text3)', fontSize: '12px', letterSpacing: '2px', border: '1px solid var(--border)', background: 'var(--bg2)' }}>
              &gt; NO RESULTS — ADJUST SEARCH OR FILTERS
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {filtered.map(p => <PhenomenonCard key={p.id} phen={p} />)}
            </div>
          )}
        </main>
        <RightPanel operative={mockCurrentOperative} messages={mockMessages} activity={mockActivity} />
      </div>
    </div>
  )
}
