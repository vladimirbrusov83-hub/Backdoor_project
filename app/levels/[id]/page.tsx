'use client'
import Shell from '@/components/Shell'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import {
  mockLevels,
  mockEntities,
  mockAnnotations,
  mockLevelDetails,
  mockCurrentOperative,
} from '@/lib/mock-data'
import { survivalLabel, survivalColor, entityCountLabel, timeAgo } from '@/lib/utils'

type Tab = 'description' | 'entrances' | 'outposts' | 'entities' | 'annotations'
const TABS: { key: Tab; label: string }[] = [
  { key: 'description', label: 'DESCRIPTION' },
  { key: 'entrances', label: 'ENTRANCES & EXITS' },
  { key: 'outposts', label: 'OUTPOSTS' },
  { key: 'entities', label: 'ENTITIES' },
  { key: 'annotations', label: 'ANNOTATIONS' },
]

function ThreatPips({ level }: { level: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: '12px',
            height: '4px',
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

export default function LevelDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [activeTab, setActiveTab] = useState<Tab>('description')
  const [annotationText, setAnnotationText] = useState('')
  const [annotations, setAnnotations] = useState(mockAnnotations)

  const level = mockLevels.find(l => l.id === id)
  const detail = mockLevelDetails[id]

  const levelEntities = mockEntities.filter(
    e => e.status !== 'restricted' && (
      e.habitat.toLowerCase().includes(String(level?.designation)) ||
      e.habitat.toLowerCase().includes(level?.title?.toLowerCase() ?? '')
    )
  )

  if (!level) {
    return (
      <Shell activePath="/levels">
        
          <main style={{ flex: 1, overflowY: 'auto', padding: '40px 20px' }}>
            <div style={{ color: 'var(--red2)', fontFamily: 'var(--mono)', fontSize: '12px', letterSpacing: '2px' }}>
              &gt; LEVEL NOT FOUND — ID: {id}
            </div>
          </main>
        </Shell>
    )
  }

  const handleSubmitAnnotation = () => {
    if (!annotationText.trim()) return
    setAnnotations(prev => [
      {
        id: `ann-${Date.now()}`,
        operative_id: mockCurrentOperative.operative_id,
        text: annotationText.trim(),
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ])
    setAnnotationText('')
  }

  return (
    <Shell activePath="/levels">
      
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {/* Breadcrumb */}
          <div style={{ fontSize: '10px', color: 'var(--text3)', letterSpacing: '1px', marginBottom: '14px' }}>
            <a href="/levels" style={{ color: 'var(--amber-dim)', textDecoration: 'none' }}>LEVELS</a>
            <span style={{ margin: '0 6px' }}>›</span>
            <span>LEVEL {level.designation}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '16px', alignItems: 'start' }}>
            {/* Main content column */}
            <div>
              {/* Document header */}
              <div
                style={{
                  background: 'var(--bg2)',
                  border: '1px solid var(--border)',
                  padding: '18px',
                  marginBottom: '14px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--display)',
                        fontSize: '64px',
                        color: 'var(--amber)',
                        lineHeight: 1,
                        marginBottom: '4px',
                      }}
                    >
                      LEVEL {level.designation}
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
                      {level.title}
                    </div>
                    {level.nickname && (
                      <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '3px', letterSpacing: '1px' }}>
                        &quot;{level.nickname}&quot;
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                    <span className={`tag ${survivalColor(level.survival_class)}`}>
                      {survivalLabel(level.survival_class)}
                    </span>
                    <span
                      className="tag"
                      style={{
                        background: 'var(--bg3)',
                        border: '1px solid var(--border2)',
                        color: 'var(--text2)',
                      }}
                    >
                      {level.canon_layer === 'both' ? 'M.E.G. + ASYNC' : level.canon_layer.toUpperCase()}
                    </span>
                    {level.status === 'verified' && (
                      <span
                        style={{
                          fontSize: '9px',
                          color: '#3aaa5a',
                          background: '#0a1f10',
                          border: '1px solid #1a4a28',
                          padding: '3px 8px',
                          letterSpacing: '1px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <span
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            background: '#3aaa5a',
                            display: 'inline-block',
                          }}
                        />
                        M.E.G. VERIFIED
                      </span>
                    )}
                  </div>
                </div>

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
                    <span style={{ color: 'var(--amber)' }}>{level.author_operative_id}</span>
                  </span>
                  <span>CREATED: {new Date(level.created_at).toLocaleDateString()}</span>
                  <span>UPDATED: {new Date(level.updated_at).toLocaleDateString()}</span>
                  <span>VERIFICATIONS: <span style={{ color: 'var(--amber2)' }}>{level.verified_count}</span></span>
                </div>
              </div>

              {/* Tabs */}
              <div
                style={{
                  display: 'flex',
                  gap: '0',
                  borderBottom: '1px solid var(--border)',
                  marginBottom: '0',
                }}
              >
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

              {/* Tab content */}
              <div
                style={{
                  background: 'var(--bg2)',
                  border: '1px solid var(--border)',
                  borderTop: 'none',
                  padding: '18px',
                  marginBottom: '14px',
                }}
              >
                {/* DESCRIPTION */}
                {activeTab === 'description' && (
                  <div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'var(--text)',
                        lineHeight: 1.9,
                        marginBottom: '20px',
                      }}
                    >
                      {level.description}
                    </div>

                    {detail && (
                      <>
                        <div
                          style={{
                            fontSize: '9px',
                            color: 'var(--text3)',
                            letterSpacing: '3px',
                            marginBottom: '10px',
                            borderTop: '1px solid var(--border)',
                            paddingTop: '16px',
                          }}
                        >
                          RECOMMENDED SUPPLIES
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                          {detail.supplies.map((s, i) => (
                            <div
                              key={i}
                              style={{
                                display: 'flex',
                                gap: '10px',
                                padding: '5px 0',
                                fontSize: '11px',
                                color: 'var(--text2)',
                                borderBottom: '1px solid var(--border)',
                              }}
                            >
                              <span style={{ color: 'var(--amber)', flexShrink: 0 }}>›</span>
                              {s}
                            </div>
                          ))}
                        </div>

                        <div
                          style={{
                            fontSize: '9px',
                            color: 'var(--text3)',
                            letterSpacing: '3px',
                            marginBottom: '10px',
                            borderTop: '1px solid var(--border)',
                            paddingTop: '16px',
                          }}
                        >
                          SURVIVAL TIPS
                        </div>
                        <div>
                          {detail.survival_tips.map((tip, i) => (
                            <div
                              key={i}
                              style={{
                                display: 'flex',
                                gap: '10px',
                                padding: '6px 0',
                                fontSize: '11px',
                                color: 'var(--text2)',
                                borderBottom: '1px solid var(--border)',
                                alignItems: 'flex-start',
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: 'var(--display)',
                                  fontSize: '18px',
                                  color: 'var(--amber-dim)',
                                  lineHeight: 1.2,
                                  flexShrink: 0,
                                  minWidth: '20px',
                                }}
                              >
                                {i + 1}
                              </span>
                              {tip}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    {!detail && (
                      <div style={{ fontSize: '11px', color: 'var(--text3)', fontStyle: 'italic' }}>
                        No supplementary data available for this level.
                      </div>
                    )}
                  </div>
                )}

                {/* ENTRANCES & EXITS */}
                {activeTab === 'entrances' && (
                  <div>
                    {detail ? (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                          <div
                            style={{
                              fontSize: '9px',
                              color: 'var(--text3)',
                              letterSpacing: '3px',
                              marginBottom: '12px',
                            }}
                          >
                            KNOWN ENTRANCES
                          </div>
                          {detail.entrances.map((e, i) => (
                            <div
                              key={i}
                              style={{
                                display: 'flex',
                                gap: '10px',
                                padding: '8px 0',
                                fontSize: '11px',
                                color: 'var(--text2)',
                                borderBottom: '1px solid var(--border)',
                                alignItems: 'flex-start',
                              }}
                            >
                              <span style={{ color: 'var(--amber)', flexShrink: 0, fontSize: '12px' }}>▶</span>
                              {e}
                            </div>
                          ))}
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: '9px',
                              color: 'var(--text3)',
                              letterSpacing: '3px',
                              marginBottom: '12px',
                            }}
                          >
                            KNOWN EXITS
                          </div>
                          {detail.exits.map((ex, i) => (
                            <div
                              key={i}
                              style={{
                                display: 'flex',
                                gap: '10px',
                                padding: '8px 0',
                                fontSize: '11px',
                                color: 'var(--text2)',
                                borderBottom: '1px solid var(--border)',
                                alignItems: 'flex-start',
                              }}
                            >
                              <span style={{ color: 'var(--amber2)', flexShrink: 0, fontSize: '12px' }}>◀</span>
                              {ex}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div style={{ color: 'var(--text3)', fontSize: '11px' }}>
                        No entrance/exit data documented for this level.
                      </div>
                    )}
                  </div>
                )}

                {/* OUTPOSTS */}
                {activeTab === 'outposts' && (
                  <div>
                    {detail && detail.outposts.length > 0 ? (
                      detail.outposts.map((op, i) => (
                        <div
                          key={i}
                          style={{
                            background: 'var(--bg3)',
                            border: `1px solid ${op.status === 'active' ? '#1a4a28' : op.status === 'inactive' ? 'var(--red-border)' : 'var(--border)'}`,
                            padding: '14px',
                            marginBottom: '10px',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: '8px',
                            }}
                          >
                            <div
                              style={{
                                fontFamily: 'var(--sans)',
                                fontSize: '14px',
                                fontWeight: 700,
                                color: 'var(--white)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                              }}
                            >
                              {op.name}
                            </div>
                            <span
                              style={{
                                fontSize: '9px',
                                padding: '2px 8px',
                                letterSpacing: '1px',
                                background:
                                  op.status === 'active'
                                    ? 'rgba(26,92,42,0.2)'
                                    : op.status === 'inactive'
                                    ? 'var(--red-bg)'
                                    : 'var(--bg3)',
                                border: `1px solid ${
                                  op.status === 'active'
                                    ? '#1a4a28'
                                    : op.status === 'inactive'
                                    ? 'var(--red-border)'
                                    : 'var(--border)'
                                }`,
                                color:
                                  op.status === 'active'
                                    ? '#3aaa5a'
                                    : op.status === 'inactive'
                                    ? 'var(--red2)'
                                    : 'var(--text3)',
                              }}
                            >
                              {op.status.toUpperCase()}
                            </span>
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--text2)', lineHeight: 1.7 }}>
                            {op.description}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{ color: 'var(--text3)', fontSize: '11px' }}>
                        No outposts documented on this level.
                      </div>
                    )}
                  </div>
                )}

                {/* ENTITIES */}
                {activeTab === 'entities' && (
                  <div>
                    <div
                      style={{
                        fontSize: '9px',
                        color: 'var(--text3)',
                        letterSpacing: '3px',
                        marginBottom: '12px',
                      }}
                    >
                      ENTITIES KNOWN TO INHABIT THIS LEVEL
                    </div>
                    {levelEntities.length > 0 ? (
                      levelEntities.map(entity => (
                        <a
                          key={entity.id}
                          href={`/entities/${entity.id}`}
                          style={{ textDecoration: 'none', display: 'block', marginBottom: '8px' }}
                        >
                          <div
                            style={{
                              background: 'var(--bg3)',
                              border: '1px solid var(--border)',
                              padding: '12px',
                              display: 'grid',
                              gridTemplateColumns: 'auto 1fr auto',
                              gap: '12px',
                              alignItems: 'center',
                              transition: 'border-color 0.15s',
                            }}
                            onMouseEnter={e =>
                              ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)')
                            }
                            onMouseLeave={e =>
                              ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border)')
                            }
                          >
                            <div style={{ fontSize: '10px', color: 'var(--text3)', letterSpacing: '1px' }}>
                              {entity.entity_number}
                            </div>
                            <div>
                              <div
                                style={{
                                  fontFamily: 'var(--sans)',
                                  fontSize: '13px',
                                  fontWeight: 700,
                                  color: 'var(--white)',
                                  textTransform: 'uppercase',
                                  letterSpacing: '1px',
                                }}
                              >
                                {entity.name}
                              </div>
                              <div style={{ fontSize: '10px', color: 'var(--text2)', marginTop: '2px' }}>
                                {entity.habitat}
                              </div>
                            </div>
                            <ThreatPips level={entity.threat_level} />
                          </div>
                        </a>
                      ))
                    ) : (
                      <div style={{ color: 'var(--text3)', fontSize: '11px' }}>
                        No specific entity matches found. Check the entity registry for habitat-based
                        search.
                      </div>
                    )}
                    <div
                      style={{
                        marginTop: '14px',
                        padding: '10px 12px',
                        background: 'var(--bg3)',
                        border: '1px solid var(--border)',
                        fontSize: '10px',
                        color: 'var(--text3)',
                      }}
                    >
                      ENTITY COUNT (DOCUMENTED):{' '}
                      <span style={{ color: 'var(--amber)' }}>
                        {entityCountLabel(level.entity_count)}
                      </span>
                    </div>
                  </div>
                )}

                {/* ANNOTATIONS */}
                {activeTab === 'annotations' && (
                  <div>
                    <div
                      style={{
                        fontSize: '9px',
                        color: 'var(--text3)',
                        letterSpacing: '3px',
                        marginBottom: '14px',
                      }}
                    >
                      RESEARCHER ANNOTATIONS — {annotations.length} ENTRIES
                    </div>

                    {annotations.map(ann => (
                      <div
                        key={ann.id}
                        style={{
                          background: 'var(--bg3)',
                          border: '1px solid var(--border)',
                          padding: '12px',
                          marginBottom: '8px',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '8px',
                          }}
                        >
                          <span style={{ fontSize: '10px', color: 'var(--amber)', letterSpacing: '1px' }}>
                            {ann.operative_id}
                          </span>
                          <span style={{ fontSize: '9px', color: 'var(--text3)' }}>
                            {timeAgo(ann.timestamp)}
                          </span>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text2)', lineHeight: 1.7 }}>
                          {ann.text}
                        </div>
                      </div>
                    ))}

                    {/* Add annotation */}
                    <div
                      style={{
                        marginTop: '14px',
                        border: '1px solid var(--border)',
                        padding: '12px',
                        background: 'var(--bg3)',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '9px',
                          color: 'var(--text3)',
                          letterSpacing: '2px',
                          marginBottom: '8px',
                        }}
                      >
                        ADD ANNOTATION — {mockCurrentOperative.operative_id}
                      </div>
                      <textarea
                        value={annotationText}
                        onChange={e => setAnnotationText(e.target.value)}
                        placeholder="Enter research note, field observation, or correction..."
                        rows={3}
                        style={{
                          width: '100%',
                          background: 'var(--bg2)',
                          border: '1px solid var(--border2)',
                          color: 'var(--text)',
                          fontFamily: 'var(--mono)',
                          fontSize: '11px',
                          padding: '8px 10px',
                          resize: 'vertical',
                          outline: 'none',
                          lineHeight: 1.6,
                          boxSizing: 'border-box',
                        }}
                        onFocus={e =>
                          ((e.currentTarget as HTMLElement).style.borderColor = 'var(--amber-dim)')
                        }
                        onBlur={e =>
                          ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)')
                        }
                      />
                      <button
                        onClick={handleSubmitAnnotation}
                        disabled={!annotationText.trim()}
                        style={{
                          marginTop: '8px',
                          background: annotationText.trim() ? 'var(--amber-glow2)' : 'var(--bg2)',
                          border: `1px solid ${annotationText.trim() ? 'var(--amber)' : 'var(--border)'}`,
                          color: annotationText.trim() ? 'var(--amber)' : 'var(--text3)',
                          fontFamily: 'var(--mono)',
                          fontSize: '10px',
                          padding: '7px 16px',
                          cursor: annotationText.trim() ? 'pointer' : 'not-allowed',
                          letterSpacing: '1px',
                        }}
                      >
                        SUBMIT ANNOTATION
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Metadata sidebar */}
            <div style={{ position: 'sticky', top: '0' }}>
              <div
                style={{
                  background: 'var(--bg2)',
                  border: '1px solid var(--border)',
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
                  LEVEL STATISTICS
                </div>
                {[
                  ['Designation', `Level ${level.designation}`],
                  ['Survival Class', survivalLabel(level.survival_class)],
                  ['Entity Count', entityCountLabel(level.entity_count)],
                  ['Canon Layer', level.canon_layer === 'both' ? 'MEG + ASYNC' : level.canon_layer.toUpperCase()],
                  ['Status', level.status.toUpperCase()],
                  ['Verifications', String(level.verified_count)],
                  ['Filed By', level.author_operative_id],
                  ['Last Updated', new Date(level.updated_at).toLocaleDateString()],
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
                    <span style={{ color: 'var(--amber)', textAlign: 'right', maxWidth: '130px' }}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Related levels */}
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
                  RELATED LEVELS
                </div>
                {mockLevels
                  .filter(l => l.id !== id && l.status !== 'restricted')
                  .slice(0, 4)
                  .map(l => (
                    <a
                      key={l.id}
                      href={`/levels/${l.id}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '7px 0',
                        borderBottom: '1px solid var(--border)',
                        textDecoration: 'none',
                        transition: 'color 0.1s',
                      }}
                      onMouseEnter={e =>
                        ((e.currentTarget as HTMLElement).style.color = 'var(--amber)')
                      }
                      onMouseLeave={e =>
                        ((e.currentTarget as HTMLElement).style.color = '')
                      }
                    >
                      <span
                        style={{
                          fontFamily: 'var(--display)',
                          fontSize: '18px',
                          color: 'var(--amber-dim)',
                          lineHeight: 1,
                          minWidth: '30px',
                        }}
                      >
                        {l.designation}
                      </span>
                      <div>
                        <div style={{ fontSize: '11px', color: 'var(--white)', fontFamily: 'var(--sans)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {l.title}
                        </div>
                        <div style={{ fontSize: '9px', color: 'var(--text3)', marginTop: '1px' }}>
                          {survivalLabel(l.survival_class)}
                        </div>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </main>
          </Shell>
  )
}
