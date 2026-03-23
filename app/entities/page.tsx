'use client'
import Shell from '@/components/Shell'
import { useState } from 'react'
import {
  mockEntities,
} from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'
import type { EntityDoc, ThreatLevel } from '@/lib/types'

type ThreatFilter = 'ALL' | '1' | '2' | '3' | '4' | '5'
const THREAT_FILTERS: ThreatFilter[] = ['ALL', '1', '2', '3', '4', '5']

function ThreatPips({ level }: { level: ThreatLevel }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: '5px',
            background:
              i < level
                ? level >= 4
                  ? 'var(--red2)'
                  : 'var(--amber)'
                : 'var(--border2)',
          }}
        />
      ))}
    </div>
  )
}

function EntityCard({ entity }: { entity: EntityDoc }) {
  const isRestricted = entity.status === 'restricted'

  return (
    <a href={`/entities/${entity.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        style={{
          background: 'var(--bg2)',
          border: `1px solid ${isRestricted ? 'var(--red-border)' : entity.threat_level >= 4 ? 'rgba(139,32,32,0.4)' : 'var(--border)'}`,
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
            : entity.threat_level >= 4
            ? 'rgba(139,32,32,0.4)'
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
            <span style={{ fontSize: '9px', color: 'var(--red2)', letterSpacing: '2px' }}>
              CLEARANCE 4 REQUIRED
            </span>
          </div>
        )}

        <div
          style={{ fontSize: '10px', color: 'var(--text3)', letterSpacing: '2px', marginBottom: '5px' }}
        >
          {entity.entity_number}
        </div>

        <div
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--white)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '10px',
          }}
        >
          {entity.name}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <ThreatPips level={entity.threat_level} />
          <div
            style={{
              fontSize: '9px',
              color: entity.threat_level >= 4 ? 'var(--red2)' : 'var(--text3)',
              letterSpacing: '1px',
              marginTop: '4px',
            }}
          >
            THREAT LEVEL {entity.threat_level}
            {entity.threat_level >= 4 && ' — EXTREME DANGER'}
          </div>
        </div>

        <div
          style={{
            fontSize: '9px',
            color: 'var(--text3)',
            letterSpacing: '0.5px',
            marginBottom: '8px',
            lineHeight: 1.5,
          }}
        >
          HABITAT: {entity.habitat}
        </div>

        <div
          className="clamp-3"
          style={{ fontSize: '10px', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '10px' }}
        >
          {entity.description}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '9px',
            color: 'var(--text3)',
            borderTop: '1px solid var(--border)',
            paddingTop: '8px',
          }}
        >
          <span style={{ color: 'var(--amber-dim)' }}>{entity.author_operative_id}</span>
          <span>✓ {entity.verified_count}</span>
          <span>{timeAgo(entity.updated_at)}</span>
        </div>
      </div>
    </a>
  )
}

export default function EntitiesPage() {
  const [search, setSearch] = useState('')
  const [threatFilter, setThreatFilter] = useState<ThreatFilter>('ALL')

  const filtered = mockEntities.filter(entity => {
    const q = search.toLowerCase()
    const matchSearch =
      q === '' ||
      entity.name.toLowerCase().includes(q) ||
      entity.entity_number.toLowerCase().includes(q) ||
      entity.habitat.toLowerCase().includes(q)
    const matchThreat =
      threatFilter === 'ALL' || String(entity.threat_level) === threatFilter
    return matchSearch && matchThreat
  })

  return (
    <Shell activePath="/entities">
      
        <Sidebar activePath="/entities" />
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
              M.E.G. PROMETHEUS LIBRARY — ENTITY REGISTRY
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
              ENTITY REGISTRY —{' '}
              <span style={{ color: 'var(--amber2)' }}>{mockEntities.length}</span>{' '}
              DOCUMENTED ENTITIES
            </div>
          </div>

          {/* Search */}
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
              placeholder="SEARCH ENTITIES BY NAME, NUMBER, OR HABITAT..."
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
            style={{ display: 'flex', gap: '5px', marginBottom: '20px', flexWrap: 'wrap' }}
          >
            {THREAT_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setThreatFilter(f)}
                style={{
                  background: threatFilter === f ? 'var(--amber-glow2)' : 'var(--bg2)',
                  border: `1px solid ${threatFilter === f ? 'var(--amber)' : 'var(--border)'}`,
                  color: threatFilter === f ? 'var(--amber)' : 'var(--text2)',
                  fontFamily: 'var(--mono)',
                  fontSize: '10px',
                  padding: '4px 10px',
                  cursor: 'pointer',
                  letterSpacing: '1px',
                }}
              >
                {f === 'ALL' ? 'ALL THREATS' : `THREAT ${f}`}
              </button>
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
              &gt; NO ENTITIES MATCHED — ADJUST SEARCH OR FILTERS
            </div>
          ) : (
            <div
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}
            >
              {filtered.map(entity => (
                <EntityCard key={entity.id} entity={entity} />
              ))}
            </div>
          )}
        </main>
          </Shell>
  )
}
