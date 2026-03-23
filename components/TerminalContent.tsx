'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { LevelDoc, EntityDoc, Alert, StatsData } from '@/lib/types'
import { survivalLabel, survivalColor, timeAgo } from '@/lib/utils'

// ── Alert Strip ──────────────────────────────────────────────────────────────
function AlertStrip({ alerts }: { alerts: Alert[] }) {
  if (!alerts.length) return null
  return (
    <div style={{ marginBottom: '14px' }}>
      {alerts.map(alert => (
        <div key={alert.id} style={{
          background: alert.severity === 'critical' ? 'var(--red-bg)' : '#1a1508',
          border: `1px solid ${alert.severity === 'critical' ? 'var(--red-border)' : '#4a3a10'}`,
          padding: '9px 14px',
          marginBottom: '6px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
        }}>
          <span style={{
            color: alert.severity === 'critical' ? 'var(--red2)' : 'var(--amber)',
            fontSize: '12px',
            flexShrink: 0,
            fontWeight: 'bold',
            marginTop: '1px',
          }}>
            {alert.severity === 'critical' ? '▲' : '▶'}
          </span>
          <div>
            <span style={{
              display: 'block',
              fontSize: '9px',
              letterSpacing: '2px',
              color: alert.severity === 'critical' ? 'var(--red2)' : 'var(--amber)',
              marginBottom: '2px',
            }}>
              {alert.severity.toUpperCase()} ALERT · {alert.location}
            </span>
            <span style={{ fontSize: '11px', color: alert.severity === 'critical' ? '#c07070' : 'var(--text)' }}>
              {alert.message}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Stats Row ────────────────────────────────────────────────────────────────
function StatsRow({ stats }: { stats: StatsData }) {
  const cards = [
    { label: 'Levels Logged',     value: stats.levels_logged.toLocaleString(),    sub: '+3 this week' },
    { label: 'Entities Filed',    value: stats.entities_filed.toLocaleString(),   sub: '8 unverified' },
    { label: 'Active Operatives', value: stats.active_operatives.toLocaleString(), sub: 'online now' },
    { label: 'Async Files',       value: '???', sub: 'RESTRICTED', restricted: true },
  ]
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '8px',
      marginBottom: '14px',
    }}>
      {cards.map(c => (
        <div key={c.label} style={{
          background: 'var(--bg3)',
          border: '1px solid var(--border)',
          padding: '10px 12px',
        }}>
          <div style={{
            fontSize: '9px',
            color: 'var(--text3)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '4px',
          }}>
            {c.label}
          </div>
          <div style={{
            fontFamily: 'var(--sans)',
            fontSize: '26px',
            fontWeight: 700,
            color: c.restricted ? 'var(--text3)' : 'var(--amber2)',
            lineHeight: 1,
          }}>
            {c.value}
          </div>
          <div style={{
            fontSize: '9px',
            color: c.restricted ? 'var(--red2)' : 'var(--text3)',
            marginTop: '3px',
          }}>
            {c.sub}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Command Bar ──────────────────────────────────────────────────────────────
type HistoryLine = { text: string; type: 'input' | 'response' | 'error' | 'link'; href?: string }

const HELP_TEXT = [
  { text: '[BACK-NET]: Available commands:', type: 'response' as const },
  { text: '  go <page>         — navigate: levels, entities, objects, groups, tales, reports, alerts, messages, review, dossier, submit, database', type: 'response' as const },
  { text: '  level <n>         — open level by number (e.g. level 0)', type: 'response' as const },
  { text: '  entity <n>        — open entity by number (e.g. entity 3)', type: 'response' as const },
  { text: '  clear             — clear terminal history', type: 'response' as const },
]

const PAGE_ALIASES: Record<string, string> = {
  levels: '/levels', level: '/levels',
  entities: '/entities', entity: '/entities',
  objects: '/objects', object: '/objects',
  phenomena: '/phenomena', phenomenon: '/phenomena',
  groups: '/groups', group: '/groups',
  tales: '/tales', tale: '/tales',
  reports: '/reports', report: '/reports',
  alerts: '/alerts', alert: '/alerts',
  messages: '/messages', message: '/messages', inbox: '/messages',
  review: '/review', queue: '/review',
  dossier: '/dossier', profile: '/dossier',
  submit: '/submit',
  database: '/database', db: '/database',
  home: '/', terminal: '/',
  async: '/async',
}

function CommandBar({ levels, entities }: { levels: LevelDoc[]; entities: EntityDoc[] }) {
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<HistoryLine[]>([])
  const router = useRouter()

  const push = (lines: HistoryLine[]) => setHistory(h => [...lines.reverse(), ...h])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' || !value.trim()) return
    const raw = value.trim()
    const parts = raw.toLowerCase().split(/\s+/)
    const cmd = parts[0]
    const arg = parts.slice(1).join(' ')

    push([{ text: `> ${raw}`, type: 'input' }])
    setValue('')

    if (cmd === 'clear') {
      setHistory([])
      return
    }

    if (cmd === 'help' || cmd === '?') {
      push(HELP_TEXT)
      return
    }

    if (cmd === 'go' && arg) {
      const dest = PAGE_ALIASES[arg]
      if (dest) {
        push([{ text: `[BACK-NET]: Navigating to ${dest}...`, type: 'response' }])
        setTimeout(() => router.push(dest), 400)
        return
      }
      push([{ text: `[BACK-NET]: Unknown destination "${arg}". Type help for commands.`, type: 'error' }])
      return
    }

    if (cmd === 'level') {
      const num = arg.replace(/^level\s*/i, '')
      const found = levels.find(l => String(l.designation).toLowerCase() === num.toLowerCase())
      if (found) {
        push([
          { text: `[BACK-NET]: Found — LEVEL ${found.designation}: ${found.title}`, type: 'response' },
          { text: `→ Opening file...`, type: 'link', href: `/levels/${found.id}` },
        ])
        setTimeout(() => router.push(`/levels/${found.id}`), 600)
        return
      }
      push([{ text: `[BACK-NET]: No level matching "${arg}" in database.`, type: 'error' }])
      return
    }

    if (cmd === 'entity') {
      const found = entities.find(en =>
        en.entity_number.toLowerCase().includes(arg.toLowerCase()) ||
        en.name.toLowerCase().includes(arg.toLowerCase())
      )
      if (found) {
        push([
          { text: `[BACK-NET]: Found — ${found.entity_number}: ${found.name}`, type: 'response' },
          { text: `→ Opening file...`, type: 'link', href: `/entities/${found.id}` },
        ])
        setTimeout(() => router.push(`/entities/${found.id}`), 600)
        return
      }
      push([{ text: `[BACK-NET]: No entity matching "${arg}" in database.`, type: 'error' }])
      return
    }

    // Fallback: try treating the whole input as a page alias
    const dest = PAGE_ALIASES[cmd]
    if (dest) {
      push([{ text: `[BACK-NET]: Navigating to ${dest}...`, type: 'response' }])
      setTimeout(() => router.push(dest), 400)
      return
    }

    push([{ text: `[BACK-NET]: Unrecognized command. Type "help" for available commands.`, type: 'error' }])
  }

  const colorMap: Record<HistoryLine['type'], string> = {
    input:    'var(--text2)',
    response: 'var(--amber)',
    error:    'var(--red2)',
    link:     '#3aaa5a',
  }

  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border2)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
      }}>
        <span style={{ color: 'var(--amber)', fontSize: '13px' }}>&gt;</span>
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder="type a command — try: help, go levels, level 0, entity smiler..."
          style={{
            background: 'none',
            border: 'none',
            outline: 'none',
            color: 'var(--text)',
            fontFamily: 'var(--mono)',
            fontSize: '12px',
            flex: 1,
            caretColor: 'var(--amber2)',
          }}
        />
        <span className="cursor-blink" />
      </div>
      {history.length > 0 && (
        <div style={{
          background: 'var(--bg2)',
          border: '1px solid var(--border)',
          borderTop: 'none',
          padding: '8px 12px',
          maxHeight: '120px',
          overflowY: 'auto',
        }}>
          {history.slice(0, 10).map((line, i) => (
            <div key={i} style={{
              fontSize: '11px',
              color: colorMap[line.type],
              lineHeight: 1.6,
            }}>
              {line.href ? (
                <a href={line.href} style={{ color: colorMap[line.type], textDecoration: 'none' }}>
                  {line.text}
                </a>
              ) : line.text}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Featured Level ───────────────────────────────────────────────────────────
function FeaturedLevel({ level }: { level: LevelDoc }) {
  return (
    <div style={{
      background: 'var(--bg2)',
      border: '1px solid var(--border)',
      marginBottom: '14px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 14px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg3)',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--display)',
            fontSize: '30px',
            color: 'var(--amber)',
            lineHeight: 1,
          }}>
            LEVEL {level.designation}
          </div>
          <div style={{
            fontFamily: 'var(--sans)',
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--white)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginTop: '2px',
          }}>
            {level.title}
            {level.nickname && (
              <span style={{
                fontFamily: 'var(--mono)',
                fontSize: '11px',
                color: 'var(--text3)',
                fontWeight: 400,
                letterSpacing: '1px',
                marginLeft: '8px',
              }}>
                "{level.nickname}"
              </span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span className={`tag ${survivalColor(level.survival_class)}`}>
            {survivalLabel(level.survival_class)}
          </span>
          {level.status === 'verified' && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '9px',
              color: '#3aaa5a',
              background: '#0a1f10',
              border: '1px solid #1a4a28',
              padding: '3px 8px',
              letterSpacing: '1px',
            }}>
              <span style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: '#3aaa5a',
                display: 'inline-block',
              }} />
              M.E.G. VERIFIED
            </span>
          )}
        </div>
      </div>

      <div style={{
        padding: '12px 14px',
        fontSize: '12px',
        color: 'var(--text2)',
        lineHeight: 1.8,
        borderBottom: '1px solid var(--border)',
      }}>
        {level.description}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        padding: '10px 14px',
        gap: '8px',
      }}>
        {[
          ['Survival Class', survivalLabel(level.survival_class)],
          ['Entity Count', level.entity_count.toUpperCase()],
          ['Canon', level.canon_layer.toUpperCase()],
          ['Filed by', level.author_operative_id],
        ].map(([label, val]) => (
          <div key={label}>
            <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '2px', marginBottom: '2px' }}>
              {label}
            </div>
            <div style={{
              fontSize: '11px',
              color: label === 'Filed by' ? 'var(--amber)' : 'var(--text)',
            }}>
              {val}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Report List ──────────────────────────────────────────────────────────────
function ReportList({ levels }: { levels: LevelDoc[] }) {
  const tagMap: Record<string, string> = {
    pending:    'tag-new',
    verified:   'tag-verified',
    flagged:    'tag-unsafe',
    restricted: 'tag-locked',
  }
  const tagLabel: Record<string, string> = {
    pending:    'PENDING',
    verified:   'VERIFIED',
    flagged:    'FLAGGED',
    restricted: 'LOCKED',
  }

  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
      }}>
        <div style={{ fontSize: '9px', letterSpacing: '3px', color: 'var(--text3)', textTransform: 'uppercase' }}>
          Recent Field Reports
        </div>
        <a href="/reports" style={{
          fontSize: '10px',
          color: 'var(--amber-dim)',
          letterSpacing: '1px',
          textDecoration: 'none',
        }}>
          VIEW ALL ›
        </a>
      </div>

      <div style={{ border: '1px solid var(--border)' }}>
        {levels.map((level, i) => (
          <a
            key={level.id}
            href={`/levels/${level.id}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '52px 1fr auto',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              borderBottom: i < levels.length - 1 ? '1px solid var(--border)' : 'none',
              textDecoration: 'none',
              transition: 'background 0.1s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--amber-glow)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--display)',
                fontSize: '20px',
                color: level.status === 'restricted' ? 'var(--text3)' : 'var(--amber)',
                lineHeight: 1,
              }}>
                {level.status === 'restricted' ? '???' : level.designation}
              </div>
              <div style={{
                fontSize: '8px',
                color: 'var(--text3)',
                letterSpacing: '1px',
                marginTop: '2px',
              }}>
                {level.type.toUpperCase()}
              </div>
            </div>

            <div>
              <div style={{
                fontFamily: 'var(--sans)',
                fontSize: '13px',
                fontWeight: 700,
                color: level.status === 'restricted' ? 'var(--text3)' : 'var(--white)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                {level.title}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text2)', marginTop: '2px' }}>
                {level.status === 'restricted'
                  ? 'Restricted · Clearance 4 required'
                  : `Filed by ${level.author_operative_id} · ${timeAgo(level.updated_at)}`
                }
              </div>
            </div>

            <span className={`tag ${tagMap[level.status]}`}>
              {tagLabel[level.status]}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

// ── Entity Grid ──────────────────────────────────────────────────────────────
function EntityGrid({ entities }: { entities: EntityDoc[] }) {
  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
      }}>
        <div style={{ fontSize: '9px', letterSpacing: '3px', color: 'var(--text3)', textTransform: 'uppercase' }}>
          Entity Registry — Active Threats
        </div>
        <a href="/entities" style={{
          fontSize: '10px',
          color: 'var(--amber-dim)',
          letterSpacing: '1px',
          textDecoration: 'none',
        }}>
          VIEW ALL ›
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {entities.map(entity => (
          <div key={entity.id} style={{
            background: 'var(--bg3)',
            border: `1px solid ${entity.status === 'restricted' ? 'var(--border)' : 'var(--border)'}`,
            padding: '10px 12px',
            cursor: entity.status === 'restricted' ? 'not-allowed' : 'pointer',
            transition: 'border-color 0.1s',
            opacity: entity.status === 'restricted' ? 0.6 : 1,
          }}
            onMouseEnter={e => {
              if (entity.status !== 'restricted')
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)'
            }}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
          >
            <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '2px', marginBottom: '4px' }}>
              {entity.entity_number}
            </div>
            <div style={{
              fontFamily: 'var(--sans)',
              fontSize: '13px',
              fontWeight: 700,
              color: entity.status === 'restricted' ? 'var(--text3)' : 'var(--white)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              {entity.name}
            </div>
            {entity.status === 'restricted' ? (
              <div style={{ fontSize: '9px', color: 'var(--red2)', marginTop: '6px', letterSpacing: '1px' }}>
                RESTRICTED ACCESS
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '3px', marginTop: '6px' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} style={{
                    height: '3px',
                    flex: 1,
                    background: i < entity.threat_level
                      ? entity.threat_level >= 4 ? 'var(--red2)' : 'var(--amber)'
                      : 'var(--border)',
                  }} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main Terminal Content ────────────────────────────────────────────────────
interface Props {
  alerts: Alert[]
  stats: StatsData
  levels: LevelDoc[]
  entities: EntityDoc[]
}

export default function TerminalContent({ alerts, stats, levels, entities }: Props) {
  const featuredLevel = levels.find(l => l.designation === 0)!
  const recentLevels  = levels.filter(l => l.designation !== 0)

  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      {/* Terminal header */}
      <div style={{
        background: 'var(--bg2)',
        borderBottom: '1px solid var(--border)',
        padding: '12px 20px',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: '10px', color: 'var(--text3)', marginBottom: '3px' }}>
          &gt; BACK-NET — AUTHORIZED ACCESS — M.E.G. PROMETHEUS LIBRARY
        </div>
        <div style={{
          fontFamily: 'var(--sans)',
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--amber2)',
          letterSpacing: '3px',
          textTransform: 'uppercase',
        }}>
          The Threshold Database
        </div>
        <div style={{
          fontSize: '10px',
          color: 'var(--text3)',
          marginTop: '2px',
          letterSpacing: '1px',
        }}>
          BACKROOMS RESEARCH NETWORK · SESSION ACTIVE
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ padding: '16px 20px', flex: 1 }}>
        <AlertStrip alerts={alerts} />
        <StatsRow stats={stats} />
        <CommandBar levels={levels} entities={entities} />
        <FeaturedLevel level={featuredLevel} />
        <ReportList levels={recentLevels} />
        <EntityGrid entities={entities} />
      </div>
    </div>
  )
}
