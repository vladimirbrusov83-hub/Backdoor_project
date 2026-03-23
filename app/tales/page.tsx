'use client'
import Shell from '@/components/Shell'
import { useState } from 'react'
import {
  mockTales,
} from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'
import type { TaleDoc } from '@/lib/types'

type CanonFilter = 'ALL' | 'meg' | 'async'
type StatusFilter = 'ALL' | 'verified' | 'pending'
const CANON_FILTERS: CanonFilter[] = ['ALL', 'meg', 'async']
const STATUS_FILTERS: StatusFilter[] = ['ALL', 'verified', 'pending']

function TaleCard({ tale }: { tale: TaleDoc }) {
  const excerpt = tale.content.slice(0, 200).trim() + (tale.content.length > 200 ? '…' : '')

  return (
    <a href={`/tales/${tale.id}`} style={{ textDecoration: 'none', display: 'block' }}>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div style={{ fontFamily: 'var(--sans)', fontSize: '15px', fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '1px', flex: 1 }}>
            {tale.title}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end', marginLeft: '10px' }}>
            <span style={{
              fontSize: '8px', padding: '2px 6px', letterSpacing: '1px',
              background: tale.canon_layer === 'async' ? 'rgba(63,46,10,0.4)' : 'var(--bg3)',
              border: `1px solid ${tale.canon_layer === 'async' ? 'var(--amber-dim)' : 'var(--border2)'}`,
              color: tale.canon_layer === 'async' ? 'var(--text3)' : 'var(--text2)',
            }}>
              {tale.canon_layer === 'meg' ? 'M.E.G.' : 'ASYNC'}
            </span>
            {tale.status === 'verified' && (
              <span style={{ fontSize: '8px', color: '#3aaa5a', letterSpacing: '1px' }}>✓ VERIFIED</span>
            )}
          </div>
        </div>

        <div style={{ fontSize: '10px', color: 'var(--amber-dim)', letterSpacing: '1px', marginBottom: '8px' }}>
          {tale.author_operative_id}
        </div>

        <div style={{ fontSize: '11px', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '12px', fontStyle: 'italic' }}>
          &ldquo;{excerpt}&rdquo;
        </div>

        {tale.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '10px' }}>
            {tale.tags.slice(0, 4).map(tag => (
              <span key={tag} style={{
                fontSize: '8px', padding: '1px 6px', letterSpacing: '0.5px',
                background: 'var(--bg3)', border: '1px solid var(--border)',
                color: 'var(--text3)',
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--text3)', borderTop: '1px solid var(--border)', paddingTop: '8px' }}>
          <span>{tale.word_count.toLocaleString()} WORDS</span>
          <span>{timeAgo(tale.created_at)}</span>
        </div>
      </div>
    </a>
  )
}

export default function TalesPage() {
  const [search, setSearch] = useState('')
  const [canonFilter, setCanonFilter] = useState<CanonFilter>('ALL')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL')

  const filtered = mockTales.filter(t => {
    const q = search.toLowerCase()
    const matchSearch = q === '' || t.title.toLowerCase().includes(q) || t.author_operative_id.toLowerCase().includes(q) || t.tags.some(tag => tag.includes(q))
    const matchCanon = canonFilter === 'ALL' || t.canon_layer === canonFilter
    const matchStatus = statusFilter === 'ALL' || t.status === statusFilter
    return matchSearch && matchCanon && matchStatus
  })

  return (
    <Shell activePath="/tales">
      
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          <div style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '14px' }}>
            <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '5px' }}>
              M.E.G. PROMETHEUS LIBRARY — TALES & RECOVERED LOGS
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '22px', fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '2px' }}>
              TALES —{' '}
              <span style={{ color: 'var(--amber2)' }}>{mockTales.length}</span>{' '}
              FILED
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'var(--bg2)', border: '1px solid var(--border2)', padding: '8px 12px', marginBottom: '12px' }}>
            <span style={{ color: 'var(--amber2)', fontSize: '13px' }}>&gt;</span>
            <input
              type="text"
              placeholder="SEARCH TALES BY TITLE, AUTHOR, OR TAG..."
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

          <div style={{ display: 'flex', gap: '5px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            {CANON_FILTERS.map(f => (
              <button key={f} onClick={() => setCanonFilter(f)} style={{
                background: canonFilter === f ? 'var(--amber-glow2)' : 'var(--bg2)',
                border: `1px solid ${canonFilter === f ? 'var(--amber)' : 'var(--border)'}`,
                color: canonFilter === f ? 'var(--amber)' : 'var(--text2)',
                fontFamily: 'var(--mono)', fontSize: '10px', padding: '4px 10px',
                cursor: 'pointer', letterSpacing: '1px',
              }}>
                {f === 'ALL' ? 'ALL CANON' : f === 'meg' ? 'M.E.G.' : 'ASYNC'}
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

          {filtered.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text3)', fontSize: '12px', letterSpacing: '2px', border: '1px solid var(--border)', background: 'var(--bg2)' }}>
              &gt; NO TALES FOUND — ADJUST SEARCH OR FILTERS
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {filtered.map(t => <TaleCard key={t.id} tale={t} />)}
            </div>
          )}
        </main>
          </Shell>
  )
}
