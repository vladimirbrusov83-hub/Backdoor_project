'use client'
import Shell from '@/components/Shell'
import { useState } from 'react'
import {
  mockGroups,
} from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'
import type { GroupDoc } from '@/lib/types'

type AlignFilter = 'ALL' | 'meg' | 'independent' | 'hostile' | 'unknown'
const ALIGN_FILTERS: AlignFilter[] = ['ALL', 'meg', 'independent', 'hostile', 'unknown']

const alignColor: Record<string, string> = {
  meg:         '#3aaa5a',
  independent: 'var(--amber)',
  hostile:     'var(--red2)',
  unknown:     'var(--text3)',
}
const alignLabel: Record<string, string> = {
  meg:         'M.E.G.',
  independent: 'INDEPENDENT',
  hostile:     'HOSTILE',
  unknown:     'UNKNOWN',
}
const alignBorder: Record<string, string> = {
  meg:         '#1a4a28',
  independent: 'var(--amber-dim)',
  hostile:     'var(--red-border)',
  unknown:     'var(--border)',
}

function GroupCard({ group }: { group: GroupDoc }) {
  return (
    <a href={`/groups/${group.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        style={{
          background: 'var(--bg2)',
          border: `1px solid ${alignBorder[group.alignment]}`,
          padding: '14px',
          height: '100%',
          cursor: 'pointer',
          transition: 'border-color 0.15s',
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = alignBorder[group.alignment])}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div>
            <div style={{ fontFamily: 'var(--display)', fontSize: '28px', color: alignColor[group.alignment], lineHeight: 1, marginBottom: '2px' }}>
              {group.code}
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '14px', fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {group.name}
            </div>
            <div style={{ fontSize: '9px', color: 'var(--text3)', marginTop: '2px', letterSpacing: '0.5px' }}>
              {group.full_name}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
            <span style={{
              fontSize: '8px', padding: '2px 7px', letterSpacing: '1px',
              border: `1px solid ${alignBorder[group.alignment]}`,
              color: alignColor[group.alignment], background: 'var(--bg3)',
            }}>
              {alignLabel[group.alignment]}
            </span>
            <span style={{
              fontSize: '8px', padding: '2px 7px', letterSpacing: '1px',
              border: `1px solid ${group.status === 'active' ? '#1a4a28' : 'var(--border)'}`,
              color: group.status === 'active' ? '#3aaa5a' : 'var(--text3)', background: 'var(--bg3)',
            }}>
              {group.status.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="clamp-2" style={{ fontSize: '11px', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '10px' }}>
          {group.description}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--text3)', borderTop: '1px solid var(--border)', paddingTop: '8px' }}>
          <span>MEMBERS: {group.member_count}</span>
          <span>{timeAgo(group.updated_at)}</span>
        </div>
      </div>
    </a>
  )
}

export default function GroupsPage() {
  const [search, setSearch] = useState('')
  const [alignFilter, setAlignFilter] = useState<AlignFilter>('ALL')

  const filtered = mockGroups.filter(g => {
    const q = search.toLowerCase()
    const matchSearch = q === '' || g.name.toLowerCase().includes(q) || g.full_name.toLowerCase().includes(q) || g.description.toLowerCase().includes(q)
    const matchAlign = alignFilter === 'ALL' || g.alignment === alignFilter
    return matchSearch && matchAlign
  })

  return (
    <Shell activePath="/groups">
      
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          <div style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '14px' }}>
            <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '5px' }}>
              M.E.G. PROMETHEUS LIBRARY — GROUP REGISTRY
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '22px', fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '2px' }}>
              GROUP REGISTRY —{' '}
              <span style={{ color: 'var(--amber2)' }}>{mockGroups.length}</span>{' '}
              KNOWN GROUPS
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'var(--bg2)', border: '1px solid var(--border2)', padding: '8px 12px', marginBottom: '12px' }}>
            <span style={{ color: 'var(--amber2)', fontSize: '13px' }}>&gt;</span>
            <input
              type="text"
              placeholder="SEARCH GROUPS BY NAME OR DESCRIPTION..."
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
            {ALIGN_FILTERS.map(f => (
              <button key={f} onClick={() => setAlignFilter(f)} style={{
                background: alignFilter === f ? 'var(--amber-glow2)' : 'var(--bg2)',
                border: `1px solid ${alignFilter === f ? 'var(--amber)' : 'var(--border)'}`,
                color: alignFilter === f ? 'var(--amber)' : 'var(--text2)',
                fontFamily: 'var(--mono)', fontSize: '10px', padding: '4px 10px',
                cursor: 'pointer', letterSpacing: '1px',
              }}>
                {f === 'ALL' ? 'ALL GROUPS' : alignLabel[f]}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text3)', fontSize: '12px', letterSpacing: '2px', border: '1px solid var(--border)', background: 'var(--bg2)' }}>
              &gt; NO RESULTS — ADJUST SEARCH OR FILTERS
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {filtered.map(g => <GroupCard key={g.id} group={g} />)}
            </div>
          )}
        </main>
          </Shell>
  )
}
