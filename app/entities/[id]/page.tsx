'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import TopBar from '@/components/TopBar'
import Sidebar from '@/components/Sidebar'
import RightPanel from '@/components/RightPanel'
import {
  mockEntities,
  mockEncounterReports,
  mockEntityDetails,
  mockCurrentOperative,
  mockMessages,
  mockActivity,
} from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'

type Tab = 'overview' | 'behavior' | 'survival' | 'encounters'
const TABS: { key: Tab; label: string }[] = [
  { key: 'overview', label: 'OVERVIEW' },
  { key: 'behavior', label: 'BEHAVIOR' },
  { key: 'survival', label: 'SURVIVAL GUIDE' },
  { key: 'encounters', label: 'ENCOUNTER REPORTS' },
]

function ThreatPips({ level, size = 'normal' }: { level: number; size?: 'normal' | 'large' }) {
  const h = size === 'large' ? '6px' : '4px'
  const w = size === 'large' ? '20px' : '14px'
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: w,
            height: h,
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

export default function EntityDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const entity = mockEntities.find(e => e.id === id)
  const detail = mockEntityDetails[id]
  // Show all encounter reports — in a real app would be filtered by entity
  const reports = id === 'e3' ? mockEncounterReports : mockEncounterReports.slice(0, 1)

  if (!entity) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <TopBar operative={mockCurrentOperative} />
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <Sidebar activePath="/entities" />
          <main style={{ flex: 1, overflowY: 'auto', padding: '40px 20px' }}>
            <div style={{ color: 'var(--red2)', fontFamily: 'var(--mono)', fontSize: '12px', letterSpacing: '2px' }}>
              &gt; ENTITY NOT FOUND — ID: {id}
            </div>
          </main>
          <RightPanel operative={mockCurrentOperative} messages={mockMessages} activity={mockActivity} />
        </div>
      </div>
    )
  }

  const isRestricted = entity.status === 'restricted'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <TopBar operative={mockCurrentOperative} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar activePath="/entities" />
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {/* Breadcrumb */}
          <div style={{ fontSize: '10px', color: 'var(--text3)', letterSpacing: '1px', marginBottom: '14px' }}>
            <a href="/entities" style={{ color: 'var(--amber-dim)', textDecoration: 'none' }}>
              ENTITIES
            </a>
            <span style={{ margin: '0 6px' }}>›</span>
            <span>{entity.entity_number}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '16px', alignItems: 'start' }}>
            {/* Main column */}
            <div>
              {/* Document header */}
              <div
                style={{
                  background: isRestricted ? 'var(--red-bg)' : 'var(--bg2)',
                  border: `1px solid ${isRestricted ? 'var(--red-border)' : 'var(--border)'}`,
                  padding: '18px',
                  marginBottom: '14px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div
                      style={{
                        fontSize: '10px',
                        color: isRestricted ? 'var(--red2)' : 'var(--text3)',
                        letterSpacing: '3px',
                        marginBottom: '6px',
                      }}
                    >
                      {entity.entity_number}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--sans)',
                        fontSize: '28px',
                        fontWeight: 700,
                        color: isRestricted ? 'var(--red2)' : 'var(--white)',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        marginBottom: '10px',
                      }}
                    >
                      {entity.name}
                    </div>
                    <ThreatPips level={entity.threat_level} size="large" />
                    <div
                      style={{
                        fontSize: '10px',
                        color: entity.threat_level >= 4 ? 'var(--red2)' : 'var(--text3)',
                        letterSpacing: '1px',
                        marginTop: '5px',
                      }}
                    >
                      THREAT LEVEL {entity.threat_level}
                      {entity.threat_level === 5 && ' — EXTREME DANGER — EVACUATE'}
                      {entity.threat_level === 4 && ' — HIGH DANGER'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                    <span
                      className="tag"
                      style={{
                        background: 'var(--bg3)',
                        border: '1px solid var(--border2)',
                        color: 'var(--text2)',
                      }}
                    >
                      {entity.canon_layer === 'both' ? 'M.E.G. + ASYNC' : entity.canon_layer.toUpperCase()}
                    </span>
                    {entity.status === 'verified' && (
                      <span
                        style={{
                          fontSize: '9px',
                          color: '#3aaa5a',
                          background: '#0a1f10',
                          border: '1px solid #1a4a28',
                          padding: '3px 8px',
                          letterSpacing: '1px',
                        }}
                      >
                        ✓ M.E.G. VERIFIED
                      </span>
                    )}
                    {isRestricted && (
                      <span className="tag tag-locked">RESTRICTED ACCESS</span>
                    )}
                  </div>
                </div>

                {!isRestricted && (
                  <div
                    style={{
                      display: 'flex',
                      gap: '20px',
                      marginTop: '14px',
                      paddingTop: '12px',
                      borderTop: '1px solid var(--border)',
                      fontSize: '10px',
                      color: 'var(--text3)',
                    }}
                  >
                    <span>
                      FILED BY:{' '}
                      <span style={{ color: 'var(--amber)' }}>{entity.author_operative_id}</span>
                    </span>
                    <span>CREATED: {new Date(entity.created_at).toLocaleDateString()}</span>
                    <span>UPDATED: {new Date(entity.updated_at).toLocaleDateString()}</span>
                    <span>
                      VERIFICATIONS:{' '}
                      <span style={{ color: 'var(--amber2)' }}>{entity.verified_count}</span>
                    </span>
                  </div>
                )}
              </div>

              {isRestricted ? (
                <div
                  style={{
                    background: 'var(--red-bg)',
                    border: '1px solid var(--red-border)',
                    padding: '40px 20px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '20px', color: 'var(--red-border)', marginBottom: '10px' }}>◈</div>
                  <div style={{ fontSize: '12px', color: 'var(--red2)', letterSpacing: '2px', marginBottom: '6px' }}>
                    CLEARANCE LEVEL 4 REQUIRED
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text3)' }}>
                    This entity is classified under Async Division protocol.
                    Your current clearance: Level {mockCurrentOperative.clearance}.
                  </div>
                </div>
              ) : (
                <>
                  {/* Tabs */}
                  <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
                    {TABS.map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        style={{
                          background: activeTab === tab.key ? 'var(--bg2)' : 'transparent',
                          border: 'none',
                          borderRight: '1px solid var(--border)',
                          borderBottom: activeTab === tab.key ? '2px solid var(--amber)' : '2px solid transparent',
                          color: activeTab === tab.key ? 'var(--amber)' : 'var(--text2)',
                          fontFamily: 'var(--mono)',
                          fontSize: '10px',
                          padding: '10px 14px',
                          cursor: 'pointer',
                          letterSpacing: '1px',
                          flexShrink: 0,
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div
                    style={{
                      background: 'var(--bg2)',
                      border: '1px solid var(--border)',
                      borderTop: 'none',
                      padding: '18px',
                    }}
                  >
                    {/* OVERVIEW */}
                    {activeTab === 'overview' && (
                      <div>
                        <div
                          style={{
                            fontSize: '9px',
                            color: 'var(--text3)',
                            letterSpacing: '3px',
                            marginBottom: '10px',
                          }}
                        >
                          OVERVIEW
                        </div>
                        <div
                          style={{
                            fontSize: '12px',
                            color: 'var(--text)',
                            lineHeight: 1.9,
                            marginBottom: '18px',
                          }}
                        >
                          {entity.description}
                        </div>

                        <div
                          style={{
                            borderTop: '1px solid var(--border)',
                            paddingTop: '16px',
                            marginBottom: '16px',
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
                            HABITAT
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--text2)', lineHeight: 1.7 }}>
                            {entity.habitat}
                          </div>
                        </div>

                        {detail && (
                          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                            <div
                              style={{
                                fontSize: '9px',
                                color: 'var(--text3)',
                                letterSpacing: '3px',
                                marginBottom: '10px',
                              }}
                            >
                              PHYSICAL DESCRIPTION
                            </div>
                            <div
                              style={{ fontSize: '11px', color: 'var(--text2)', lineHeight: 1.8 }}
                            >
                              {detail.physical_description}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* BEHAVIOR */}
                    {activeTab === 'behavior' && (
                      <div>
                        <div
                          style={{
                            fontSize: '9px',
                            color: 'var(--text3)',
                            letterSpacing: '3px',
                            marginBottom: '12px',
                          }}
                        >
                          BEHAVIORAL PATTERNS
                        </div>
                        {detail ? (
                          <div
                            style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 1.9 }}
                          >
                            {detail.behavior}
                          </div>
                        ) : (
                          <div style={{ fontSize: '11px', color: 'var(--text3)' }}>
                            No behavioral documentation available.
                          </div>
                        )}
                      </div>
                    )}

                    {/* SURVIVAL GUIDE */}
                    {activeTab === 'survival' && (
                      <div>
                        <div
                          style={{
                            fontSize: '9px',
                            color: 'var(--text3)',
                            letterSpacing: '3px',
                            marginBottom: '12px',
                          }}
                        >
                          SURVIVAL GUIDE
                        </div>
                        {detail ? (
                          detail.survival_guide.map((tip, i) => (
                            <div
                              key={i}
                              style={{
                                display: 'flex',
                                gap: '14px',
                                padding: '10px 0',
                                borderBottom: '1px solid var(--border)',
                                alignItems: 'flex-start',
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: 'var(--display)',
                                  fontSize: '26px',
                                  color: entity.threat_level >= 4 ? 'var(--red-border)' : 'var(--amber-dim)',
                                  lineHeight: 1,
                                  flexShrink: 0,
                                  minWidth: '28px',
                                  textAlign: 'right',
                                }}
                              >
                                {i + 1}
                              </span>
                              <div
                                style={{
                                  fontSize: '12px',
                                  color: 'var(--text)',
                                  lineHeight: 1.7,
                                  paddingTop: '2px',
                                }}
                              >
                                {tip}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div style={{ fontSize: '11px', color: 'var(--text3)' }}>
                            No survival guide documented for this entity.
                          </div>
                        )}
                      </div>
                    )}

                    {/* ENCOUNTER REPORTS */}
                    {activeTab === 'encounters' && (
                      <div>
                        <div
                          style={{
                            fontSize: '9px',
                            color: 'var(--text3)',
                            letterSpacing: '3px',
                            marginBottom: '14px',
                          }}
                        >
                          FIELD ENCOUNTER REPORTS — {reports.length} LOGGED
                        </div>
                        {reports.length > 0 ? (
                          reports.map(rep => (
                            <div
                              key={rep.id}
                              style={{
                                background: 'var(--bg3)',
                                border: '1px solid var(--border)',
                                marginBottom: '12px',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  padding: '8px 12px',
                                  borderBottom: '1px solid var(--border)',
                                  background: 'var(--bg2)',
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: '10px',
                                    color: 'var(--amber)',
                                    letterSpacing: '1px',
                                  }}
                                >
                                  RECOVERED LOG · {rep.operative_id}
                                </span>
                                <div
                                  style={{
                                    display: 'flex',
                                    gap: '12px',
                                    fontSize: '9px',
                                    color: 'var(--text3)',
                                  }}
                                >
                                  <span>{rep.date}</span>
                                  <span>{rep.location}</span>
                                </div>
                              </div>
                              <div
                                style={{
                                  padding: '12px',
                                  fontSize: '11px',
                                  color: 'var(--text2)',
                                  lineHeight: 1.8,
                                  fontStyle: 'italic',
                                }}
                              >
                                &ldquo;{rep.text}&rdquo;
                              </div>
                            </div>
                          ))
                        ) : (
                          <div style={{ fontSize: '11px', color: 'var(--text3)' }}>
                            No encounter reports on file.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Metadata sidebar */}
            <div style={{ position: 'sticky', top: '0' }}>
              <div
                style={{
                  background: 'var(--bg2)',
                  border: `1px solid ${isRestricted ? 'var(--red-border)' : 'var(--border)'}`,
                  padding: '14px',
                  marginBottom: '12px',
                }}
              >
                <div
                  style={{
                    fontSize: '9px',
                    color: 'var(--text3)',
                    letterSpacing: '3px',
                    marginBottom: '12px',
                  }}
                >
                  ENTITY STATISTICS
                </div>
                {[
                  ['Entity Number', entity.entity_number],
                  ['Threat Level', String(entity.threat_level) + ' / 5'],
                  ['Canon Layer', entity.canon_layer === 'both' ? 'MEG + ASYNC' : entity.canon_layer.toUpperCase()],
                  ['Status', entity.status.toUpperCase()],
                  ['Verifications', String(entity.verified_count)],
                  ['Filed By', entity.author_operative_id],
                  ['Last Updated', new Date(entity.updated_at).toLocaleDateString()],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '5px 0',
                      borderBottom: '1px solid var(--border)',
                      fontSize: '10px',
                    }}
                  >
                    <span style={{ color: 'var(--text3)' }}>{label}</span>
                    <span style={{ color: isRestricted ? 'var(--red2)' : 'var(--amber)', textAlign: 'right' }}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Other entities */}
              <div
                style={{
                  background: 'var(--bg2)',
                  border: '1px solid var(--border)',
                  padding: '14px',
                }}
              >
                <div
                  style={{
                    fontSize: '9px',
                    color: 'var(--text3)',
                    letterSpacing: '3px',
                    marginBottom: '12px',
                  }}
                >
                  OTHER ENTITIES
                </div>
                {mockEntities
                  .filter(e => e.id !== id && e.status !== 'restricted')
                  .map((e, i, arr) => (
                    <a
                      key={e.id}
                      href={`/entities/${e.id}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 0',
                        borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                        textDecoration: 'none',
                      }}
                    >
                      <div style={{ flex: 1 }}>
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
                          {e.name}
                        </div>
                        <div style={{ fontSize: '9px', color: 'var(--text3)', marginTop: '2px' }}>
                          {e.entity_number}
                        </div>
                      </div>
                      <ThreatPips level={e.threat_level} />
                    </a>
                  ))}
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
