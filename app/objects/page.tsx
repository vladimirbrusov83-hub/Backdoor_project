'use client'
import Shell from '@/components/Shell'
import { useState } from 'react'
import {
  mockObjects,
} from '@/lib/mock-data'
import type { BackroomsObject } from '@/lib/types'

type RarityFilter = 'ALL' | 'common' | 'uncommon' | 'rare' | 'unique'
type DangerFilter = 'ALL' | 'none' | 'low' | 'moderate' | 'high' | 'extreme'

const RARITY_FILTERS: RarityFilter[] = ['ALL', 'common', 'uncommon', 'rare', 'unique']
const DANGER_FILTERS: DangerFilter[] = ['ALL', 'none', 'low', 'moderate', 'high', 'extreme']

const rarityColor: Record<string, string> = {
  common:   'var(--text2)',
  uncommon: 'var(--amber)',
  rare:     'var(--amber2)',
  unique:   'var(--amber3)',
}
const rarityBorder: Record<string, string> = {
  common:   'var(--border)',
  uncommon: 'var(--amber-dim)',
  rare:     'var(--amber-dim)',
  unique:   'var(--amber)',
}
const dangerColor: Record<string, string> = {
  none:     '#3aaa5a',
  low:      'var(--text2)',
  moderate: 'var(--amber)',
  high:     'var(--red2)',
  extreme:  'var(--red2)',
}

function ObjectCard({ obj }: { obj: BackroomsObject }) {
  return (
    <a href={`/objects/${obj.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        style={{
          background: 'var(--bg2)',
          border: `1px solid ${rarityBorder[obj.rarity]}`,
          padding: '14px',
          height: '100%',
          transition: 'border-color 0.15s',
          cursor: 'pointer',
        }}
        onMouseEnter={e =>
          ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)')
        }
        onMouseLeave={e =>
          ((e.currentTarget as HTMLElement).style.borderColor = rarityBorder[obj.rarity])
        }
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <div
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '15px',
              fontWeight: 700,
              color: 'var(--white)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {obj.name}
          </div>
          <span
            style={{
              fontSize: '8px',
              padding: '2px 7px',
              letterSpacing: '1px',
              border: `1px solid ${rarityBorder[obj.rarity]}`,
              color: rarityColor[obj.rarity],
              background: 'var(--bg3)',
              flexShrink: 0,
              marginLeft: '8px',
            }}
          >
            {obj.rarity.toUpperCase()}
          </span>
        </div>

        <div
          className="clamp-3"
          style={{ fontSize: '11px', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '12px' }}
        >
          {obj.description}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', borderTop: '1px solid var(--border)', paddingTop: '8px' }}>
          <span style={{ color: 'var(--text3)', letterSpacing: '1px' }}>DANGER:</span>
          <span style={{ color: dangerColor[obj.danger_level], letterSpacing: '1px' }}>
            {obj.danger_level.toUpperCase()}
          </span>
        </div>
      </div>
    </a>
  )
}

export default function ObjectsPage() {
  const [search, setSearch] = useState('')
  const [rarityFilter, setRarityFilter] = useState<RarityFilter>('ALL')
  const [dangerFilter, setDangerFilter] = useState<DangerFilter>('ALL')

  const filtered = mockObjects.filter(obj => {
    const q = search.toLowerCase()
    const matchSearch = q === '' || obj.name.toLowerCase().includes(q) || obj.description.toLowerCase().includes(q)
    const matchRarity = rarityFilter === 'ALL' || obj.rarity === rarityFilter
    const matchDanger = dangerFilter === 'ALL' || obj.danger_level === dangerFilter
    return matchSearch && matchRarity && matchDanger
  })

  return (
    <Shell activePath="/objects">
      
        <Sidebar activePath="/objects" />
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          <div style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '14px' }}>
            <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '5px' }}>
              M.E.G. PROMETHEUS LIBRARY — OBJECT REGISTRY
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '22px', fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '2px' }}>
              OBJECT REGISTRY —{' '}
              <span style={{ color: 'var(--amber2)' }}>{mockObjects.length}</span>{' '}
              DOCUMENTED OBJECTS
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'var(--bg2)', border: '1px solid var(--border2)', padding: '8px 12px', marginBottom: '12px' }}>
            <span style={{ color: 'var(--amber2)', fontSize: '13px' }}>&gt;</span>
            <input
              type="text"
              placeholder="SEARCH OBJECTS BY NAME OR DESCRIPTION..."
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

          <div style={{ display: 'flex', gap: '5px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            {RARITY_FILTERS.map(f => (
              <button key={f} onClick={() => setRarityFilter(f)} style={{
                background: rarityFilter === f ? 'var(--amber-glow2)' : 'var(--bg2)',
                border: `1px solid ${rarityFilter === f ? 'var(--amber)' : 'var(--border)'}`,
                color: rarityFilter === f ? 'var(--amber)' : 'var(--text2)',
                fontFamily: 'var(--mono)', fontSize: '10px', padding: '4px 10px',
                cursor: 'pointer', letterSpacing: '1px',
              }}>
                {f === 'ALL' ? 'ALL RARITIES' : f.toUpperCase()}
              </button>
            ))}
            <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 4px' }} />
            {DANGER_FILTERS.map(f => (
              <button key={f} onClick={() => setDangerFilter(f)} style={{
                background: dangerFilter === f ? 'var(--amber-glow2)' : 'var(--bg2)',
                border: `1px solid ${dangerFilter === f ? 'var(--amber)' : 'var(--border)'}`,
                color: dangerFilter === f ? 'var(--amber)' : 'var(--text2)',
                fontFamily: 'var(--mono)', fontSize: '10px', padding: '4px 10px',
                cursor: 'pointer', letterSpacing: '1px',
              }}>
                {f === 'ALL' ? 'ALL DANGER' : f.toUpperCase()}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text3)', fontSize: '12px', letterSpacing: '2px', border: '1px solid var(--border)', background: 'var(--bg2)' }}>
              &gt; NO RESULTS — ADJUST SEARCH OR FILTERS
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              {filtered.map(obj => <ObjectCard key={obj.id} obj={obj} />)}
            </div>
          )}
        </main>
          </Shell>
  )
}
