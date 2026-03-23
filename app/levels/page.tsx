'use client'
import Shell from '@/components/Shell'
import { useState } from 'react'
import {
  mockLevels,
} from '@/lib/mock-data'
import { survivalLabel, survivalColor, entityCountLabel, timeAgo } from '@/lib/utils'
import type { LevelDoc, SurvivalClass } from '@/lib/types'

type SurvivalFilter = 'ALL' | '0' | '1' | '2' | '3' | '4' | '5'
type CanonFilter = 'ALL' | 'meg' | 'async'

const SURVIVAL_FILTERS: SurvivalFilter[] = ['ALL', '0', '1', '2', '3', '4', '5']
const CANON_FILTERS: CanonFilter[] = ['ALL', 'meg', 'async']

function FilterBtn({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? 'var(--amber-glow2)' : 'var(--bg2)',
        border: `1px solid ${active ? 'var(--amber)' : 'var(--border)'}`,
        color: active ? 'var(--amber)' : 'var(--text2)',
        fontFamily: 'var(--mono)',
        fontSize: '10px',
        padding: '4px 10px',
        cursor: 'pointer',
        letterSpacing: '1px',
      }}
    >
      {children}
    </button>
  )
}

function LevelCard({ level }: { level: LevelDoc }) {
  const isRestricted = level.status === 'restricted' || level.canon_layer === 'async'

  return (
    <a href={`/levels/${level.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        style={{
          background: 'var(--bg2)',
          border: `1px solid ${isRestricted ? 'var(--red-border)' : 'var(--border)'}`,
          padding: '14px',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          transition: 'border-color 0.15s',
        }}
        onMouseEnter={e => {
          if (!isRestricted)
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)'
        }}
        onMouseLeave={e => {
          ;(e.currentTarget as HTMLElement).style.borderColor = isRestricted
            ? 'var(--red-border)'
            : 'var(--border)'
        }}
      >
        {isRestricted && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backdropFilter: 'blur(3px)',
              background: 'rgba(10,9,8,0.75)',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '16px', color: 'var(--red-border)' }}>◈</span>
            <span
              style={{ fontSize: '9px', color: 'var(--red2)', letterSpacing: '2px' }}
            >
              CLEARANCE 4 REQUIRED
            </span>
          </div>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '8px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--display)',
              fontSize: '38px',
              color: 'var(--amber)',
              lineHeight: 1,
            }}
          >
            {level.designation}
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}
          >
            <span className={`tag ${survivalColor(level.survival_class)}`}>
              {survivalLabel(level.survival_class)}
            </span>
            {level.status === 'verified' && (
              <span
                style={{
                  fontSize: '8px',
                  color: '#3aaa5a',
                  background: '#0a1f10',
                  border: '1px solid #1a4a28',
                  padding: '2px 6px',
                  letterSpacing: '1px',
                }}
              >
                ✓ M.E.G. VERIFIED
              </span>
            )}
          </div>
        </div>

        <div
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '14px',
            fontWeight: 700,
            color: 'var(--white)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '4px',
          }}
        >
          {level.title}
          {level.nickname && (
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '10px',
                color: 'var(--text3)',
                fontWeight: 400,
                letterSpacing: '0.5px',
                marginLeft: '8px',
                textTransform: 'none',
              }}
            >
              &quot;{level.nickname}&quot;
            </span>
          )}
        </div>

        <div
          className="clamp-2"
          style={{ fontSize: '11px', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '10px' }}
        >
          {level.description}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '9px',
            color: 'var(--text3)',
            borderTop: '1px solid var(--border)',
            paddingTop: '8px',
            marginTop: 'auto',
          }}
        >
          <span>ENTITIES: {entityCountLabel(level.entity_count)}</span>
          <span style={{ color: 'var(--amber-dim)' }}>{level.author_operative_id}</span>
          <span>✓ {level.verified_count}</span>
          <span>{timeAgo(level.updated_at)}</span>
        </div>
      </div>
    </a>
  )
}

export default function LevelsPage() {
  const [search, setSearch] = useState('')
  const [survivalFilter, setSurvivalFilter] = useState<SurvivalFilter>('ALL')
  const [canonFilter, setCanonFilter] = useState<CanonFilter>('ALL')

  const filtered = mockLevels.filter(level => {
    const q = search.toLowerCase()
    const matchSearch =
      q === '' ||
      level.title.toLowerCase().includes(q) ||
      String(level.designation).includes(q) ||
      (level.nickname?.toLowerCase().includes(q) ?? false)
    const matchSurvival =
      survivalFilter === 'ALL' ||
      String(level.survival_class) === survivalFilter
    const matchCanon =
      canonFilter === 'ALL' ||
      level.canon_layer === canonFilter ||
      level.canon_layer === 'both'
    return matchSearch && matchSurvival && matchCanon
  })

  return (
    <Shell activePath="/levels">
      
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {/* Header */}
          <div
            style={{
              marginBottom: '20px',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '14px',
            }}
          >
            <div
              style={{
                fontSize: '9px',
                color: 'var(--text3)',
                letterSpacing: '3px',
                marginBottom: '5px',
              }}
            >
              M.E.G. PROMETHEUS LIBRARY — LEVEL REGISTRY
            </div>
            <div
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '22px',
                fontWeight: 700,
                color: 'var(--white)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              LEVEL REGISTRY —{' '}
              <span style={{ color: 'var(--amber2)' }}>{mockLevels.length}</span>{' '}
              DOCUMENTED LEVELS
            </div>
          </div>

          {/* Search bar */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              background: 'var(--bg2)',
              border: '1px solid var(--border2)',
              padding: '8px 12px',
              marginBottom: '12px',
            }}
          >
            <span style={{ color: 'var(--amber2)', fontSize: '13px' }}>&gt;</span>
            <input
              type="text"
              placeholder="SEARCH LEVELS BY NUMBER, TITLE, OR NICKNAME..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: 'var(--mono)',
                fontSize: '12px',
                color: 'var(--text)',
                letterSpacing: '1px',
                caretColor: 'var(--amber2)',
              }}
            />
            <span style={{ fontSize: '10px', color: 'var(--text3)', flexShrink: 0 }}>
              {filtered.length} RESULTS
            </span>
          </div>

          {/* Filters */}
          <div
            style={{
              display: 'flex',
              gap: '5px',
              marginBottom: '20px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {SURVIVAL_FILTERS.map(f => (
              <FilterBtn key={f} active={survivalFilter === f} onClick={() => setSurvivalFilter(f)}>
                {f === 'ALL' ? 'ALL CLASSES' : `CLASS ${f}`}
              </FilterBtn>
            ))}
            <div
              style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 4px' }}
            />
            {CANON_FILTERS.map(f => (
              <FilterBtn key={f} active={canonFilter === f} onClick={() => setCanonFilter(f)}>
                {f === 'ALL' ? 'ALL CANON' : f === 'meg' ? 'M.E.G.' : 'ASYNC'}
              </FilterBtn>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div
              style={{
                padding: '40px 20px',
                textAlign: 'center',
                color: 'var(--text3)',
                fontSize: '12px',
                letterSpacing: '2px',
                border: '1px solid var(--border)',
                background: 'var(--bg2)',
              }}
            >
              &gt; NO RESULTS FOUND — ADJUST SEARCH OR FILTERS
            </div>
          ) : (
            <div
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}
            >
              {filtered.map(level => (
                <LevelCard key={level.id} level={level} />
              ))}
            </div>
          )}
        </main>
          </Shell>
  )
}
