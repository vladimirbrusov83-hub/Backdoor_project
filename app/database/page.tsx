'use client'
import TopBar from '@/components/TopBar'
import Sidebar from '@/components/Sidebar'
import RightPanel from '@/components/RightPanel'
import {
  mockLevels,
  mockEntities,
  mockObjects,
  mockPhenomena,
  mockStats,
  mockCurrentOperative,
  mockMessages,
  mockActivity,
  mockRecentItems,
} from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'

const categories = [
  {
    label: 'LEVELS',
    code: 'LVL',
    href: '/levels',
    count: mockLevels.length,
    total: mockStats.levels_logged,
    description: 'Documented spatial regions of the Backrooms. Includes survival data, entrances, exits, and entity habitation reports.',
    color: 'var(--amber)',
  },
  {
    label: 'ENTITIES',
    code: 'ENT',
    href: '/entities',
    count: mockEntities.length,
    total: mockStats.entities_filed,
    description: 'Non-human inhabitants of the Backrooms. Classified by threat level and behavioral patterns.',
    color: 'var(--red2)',
  },
  {
    label: 'OBJECTS',
    code: 'OBJ',
    href: '/objects',
    count: mockObjects.length,
    total: mockObjects.length,
    description: 'Items of interest found throughout the Backrooms. Classified by rarity and danger level.',
    color: 'var(--amber2)',
  },
  {
    label: 'PHENOMENA',
    code: 'PHN',
    href: '/phenomena',
    count: mockPhenomena.length,
    total: mockPhenomena.length,
    description: 'Documented anomalous events, recurring effects, and unexplained environmental behaviors.',
    color: 'var(--amber)',
  },
  {
    label: 'GROUPS',
    code: 'GRP',
    href: '/groups',
    count: 14,
    total: 14,
    description: 'Known factions, colonies, and organizations operating within the Backrooms. M.E.G. and independent.',
    color: 'var(--text)',
  },
  {
    label: 'TALES',
    code: 'TALE',
    href: '/tales',
    count: 89,
    total: 89,
    description: 'First-person accounts, recovered logs, and narrative reports filed by operatives and wanderers.',
    color: 'var(--text2)',
  },
]

const statusColors: Record<string, string> = {
  verified: '#3aaa5a',
  pending: 'var(--amber)',
  restricted: 'var(--red2)',
  flagged: 'var(--red2)',
}

const typeLabels: Record<string, string> = {
  level: 'LVL',
  entity: 'ENT',
  object: 'OBJ',
  phenomenon: 'PHN',
}

const mostVerified = [...mockRecentItems]
  .sort((a, b) => {
    const getVerified = (id: string) => {
      const lv = mockLevels.find(l => l.id === id)
      if (lv) return lv.verified_count
      const en = mockEntities.find(e => e.id === id)
      if (en) return en.verified_count
      return 0
    }
    return getVerified(b.id) - getVerified(a.id)
  })
  .slice(0, 5)

export default function DatabasePage() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}
    >
      <TopBar operative={mockCurrentOperative} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar activePath="/database" />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {/* Hero header */}
          <div
            style={{
              background: 'var(--bg2)',
              borderBottom: '1px solid var(--border)',
              padding: '24px 20px 20px',
            }}
          >
            <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '6px' }}>
              M.E.G. PROMETHEUS LIBRARY
            </div>
            <div
              style={{
                fontFamily: 'var(--display)',
                fontSize: '52px',
                color: 'var(--amber2)',
                letterSpacing: '6px',
                lineHeight: 1,
                marginBottom: '4px',
              }}
            >
              BACK-NET DATABASE
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text2)', letterSpacing: '2px' }}>
              BACKROOMS RESEARCH NETWORK · PROMETHEUS LIBRARY · AUTHORIZED ACCESS
            </div>

            {/* Stats row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4,1fr)',
                gap: '8px',
                marginTop: '20px',
              }}
            >
              {[
                { label: 'LEVELS LOGGED', value: mockStats.levels_logged.toLocaleString(), sub: 'documented' },
                { label: 'ENTITIES FILED', value: mockStats.entities_filed.toLocaleString(), sub: 'classified' },
                { label: 'ACTIVE OPERATIVES', value: mockStats.active_operatives.toLocaleString(), sub: 'online' },
                { label: 'ASYNC FILES', value: '???', sub: 'RESTRICTED', danger: true },
              ].map(s => (
                <div
                  key={s.label}
                  style={{
                    background: 'var(--bg3)',
                    border: '1px solid var(--border)',
                    padding: '10px 12px',
                  }}
                >
                  <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '2px', marginBottom: '4px' }}>
                    {s.label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: '26px',
                      fontWeight: 700,
                      color: s.danger ? 'var(--text3)' : 'var(--amber2)',
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: '9px', color: s.danger ? 'var(--red2)' : 'var(--text3)', marginTop: '3px' }}>
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: '20px' }}>
            {/* Category cards */}
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '14px' }}>
                DATABASE CATEGORIES
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                {categories.map(cat => (
                  <a key={cat.label} href={cat.href} style={{ textDecoration: 'none', display: 'block' }}>
                    <div
                      style={{
                        background: 'var(--bg2)',
                        border: '1px solid var(--border)',
                        padding: '16px',
                        cursor: 'pointer',
                        transition: 'border-color 0.15s',
                      }}
                      onMouseEnter={e =>
                        ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)')
                      }
                      onMouseLeave={e =>
                        ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border)')
                      }
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '10px',
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontFamily: 'var(--sans)',
                              fontSize: '18px',
                              fontWeight: 700,
                              color: cat.color,
                              textTransform: 'uppercase',
                              letterSpacing: '2px',
                            }}
                          >
                            {cat.label}
                          </div>
                          <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '1px', marginTop: '2px' }}>
                            FORMAT: {cat.code}-RPT-001
                          </div>
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--display)',
                            fontSize: '36px',
                            color: cat.color,
                            opacity: 0.4,
                            lineHeight: 1,
                          }}
                        >
                          {cat.total}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: '10px',
                          color: 'var(--text2)',
                          lineHeight: 1.6,
                          marginBottom: '10px',
                        }}
                      >
                        {cat.description}
                      </div>
                      <div
                        style={{
                          fontSize: '9px',
                          color: 'var(--amber-dim)',
                          letterSpacing: '1px',
                        }}
                      >
                        VIEW ALL ›
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Two-column bottom section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '14px' }}>
              {/* Recently Updated */}
              <div>
                <div
                  style={{
                    fontSize: '9px',
                    color: 'var(--text3)',
                    letterSpacing: '3px',
                    marginBottom: '10px',
                  }}
                >
                  RECENTLY UPDATED
                </div>
                <div style={{ border: '1px solid var(--border)' }}>
                  {mockRecentItems.slice(0, 10).map((item, i) => (
                    <a
                      key={item.id}
                      href={`/${item.type}s/${item.id}`}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '40px 1fr auto auto',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '9px 12px',
                        borderBottom:
                          i < Math.min(mockRecentItems.length, 10) - 1
                            ? '1px solid var(--border)'
                            : 'none',
                        textDecoration: 'none',
                        transition: 'background 0.1s',
                      }}
                      onMouseEnter={e =>
                        ((e.currentTarget as HTMLElement).style.background = 'var(--amber-glow)')
                      }
                      onMouseLeave={e =>
                        ((e.currentTarget as HTMLElement).style.background = 'transparent')
                      }
                    >
                      <span
                        style={{
                          fontSize: '8px',
                          color: 'var(--text3)',
                          background: 'var(--bg3)',
                          border: '1px solid var(--border)',
                          padding: '2px 4px',
                          textAlign: 'center',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {typeLabels[item.type] ?? item.type.toUpperCase()}
                      </span>
                      <div
                        style={{
                          fontFamily: 'var(--sans)',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: 'var(--white)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {item.title}
                      </div>
                      <span style={{ fontSize: '9px', color: 'var(--amber-dim)', flexShrink: 0 }}>
                        {item.author}
                      </span>
                      <span style={{ fontSize: '9px', color: 'var(--text3)', flexShrink: 0 }}>
                        {timeAgo(item.updated_at)}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Most Verified sidebar */}
              <div>
                <div
                  style={{
                    fontSize: '9px',
                    color: 'var(--text3)',
                    letterSpacing: '3px',
                    marginBottom: '10px',
                  }}
                >
                  MOST VERIFIED
                </div>
                <div style={{ border: '1px solid var(--border)' }}>
                  {mostVerified.map((item, i) => {
                    const verifiedCount =
                      mockLevels.find(l => l.id === item.id)?.verified_count ??
                      mockEntities.find(e => e.id === item.id)?.verified_count ??
                      0
                    return (
                      <a
                        key={item.id}
                        href={`/${item.type}s/${item.id}`}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '24px 1fr auto',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 12px',
                          borderBottom: i < mostVerified.length - 1 ? '1px solid var(--border)' : 'none',
                          textDecoration: 'none',
                          transition: 'background 0.1s',
                        }}
                        onMouseEnter={e =>
                          ((e.currentTarget as HTMLElement).style.background = 'var(--amber-glow)')
                        }
                        onMouseLeave={e =>
                          ((e.currentTarget as HTMLElement).style.background = 'transparent')
                        }
                      >
                        <div
                          style={{
                            fontFamily: 'var(--display)',
                            fontSize: '22px',
                            color: 'var(--text3)',
                            lineHeight: 1,
                            textAlign: 'center',
                          }}
                        >
                          {i + 1}
                        </div>
                        <div>
                          <div
                            style={{
                              fontFamily: 'var(--sans)',
                              fontSize: '12px',
                              fontWeight: 600,
                              color: 'var(--white)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                            }}
                          >
                            {item.title}
                          </div>
                          <div style={{ fontSize: '9px', color: 'var(--text3)', marginTop: '2px' }}>
                            {typeLabels[item.type] ?? item.type.toUpperCase()}
                          </div>
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--sans)',
                            fontSize: '16px',
                            fontWeight: 700,
                            color: 'var(--amber2)',
                            flexShrink: 0,
                          }}
                        >
                          {verifiedCount.toLocaleString()}
                        </div>
                      </a>
                    )
                  })}
                </div>

                {/* Quick links */}
                <div
                  style={{
                    marginTop: '14px',
                    border: '1px solid var(--border)',
                    padding: '12px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '9px',
                      color: 'var(--text3)',
                      letterSpacing: '3px',
                      marginBottom: '10px',
                    }}
                  >
                    QUICK ACCESS
                  </div>
                  {[
                    { label: 'Submit Field Report', href: '/submit' },
                    { label: 'Review Queue (7 pending)', href: '/review' },
                    { label: 'Active Alerts (2)', href: '/alerts' },
                    { label: 'My Dossier', href: '/dossier' },
                  ].map(link => (
                    <a
                      key={link.href}
                      href={link.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 0',
                        fontSize: '11px',
                        color: 'var(--text2)',
                        textDecoration: 'none',
                        borderBottom: '1px solid var(--border)',
                        transition: 'color 0.1s',
                      }}
                      onMouseEnter={e =>
                        ((e.currentTarget as HTMLElement).style.color = 'var(--amber)')
                      }
                      onMouseLeave={e =>
                        ((e.currentTarget as HTMLElement).style.color = 'var(--text2)')
                      }
                    >
                      <span style={{ color: 'var(--amber-dim)', fontSize: '10px' }}>›</span>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <RightPanel
          operative={mockCurrentOperative}
          messages={mockMessages}
          activity={mockActivity}
        />
      </div>
    </div>
  )
}
