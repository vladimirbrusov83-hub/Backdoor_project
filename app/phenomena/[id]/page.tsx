'use client'
import Shell from '@/components/Shell'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import {
  mockPhenomena,
  mockAnnotations,
} from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'

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

const fieldObservations: Record<string, string[]> = {
  phen1: [
    'Tested on Level 0 with MEG-RSR-0012: standing 2m apart, no awareness of each other through any modality.',
    'The effect does not appear to block physical collision — only perception. Confirmed by research team.',
    'Effect is immediate upon entering Level 0. No gradual onset observed.',
    'Some operatives report a feeling of "being alone" even when objectively aware others are present.',
  ],
  phen2: [
    'MEG-EXP-0091: 14h subjective on Level 37, relay showed 2h elapsed. Fourth documented instance.',
    'Effect appears level-specific. No temporal drift documented on Level 0 or Level 1.',
    'Biological markers (hunger, fatigue) track with subjective time, not relay time.',
  ],
  phen3: [
    'First reported: Level 11. Building corridor layout changed between two expeditions 6 days apart.',
    'Research Division surveying six levels for recurrence pattern as of March 2024.',
    'Correlation with entity surge events at 70% confidence — not yet statistically significant.',
  ],
}

type Tab = 'overview' | 'observations'

export default function PhenomenonDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [annotationText, setAnnotationText] = useState('')
  const [annotations, setAnnotations] = useState(mockAnnotations.slice(0, 2))

  const phen = mockPhenomena.find(p => p.id === id)

  if (!phen) {
    return (
      <Shell activePath="/phenomena">
        
          <Sidebar activePath="/phenomena" />
          <main style={{ flex: 1, overflowY: 'auto', padding: '40px 20px' }}>
            <div style={{ color: 'var(--red2)', fontFamily: 'var(--mono)', fontSize: '12px', letterSpacing: '2px' }}>
              &gt; PHENOMENON NOT FOUND — ID: {id}
            </div>
          </main>
        </div>
      </div>
    )
  }

  const observations = fieldObservations[id] ?? []

  const handleSubmitAnnotation = () => {
    if (!annotationText.trim()) return
    setAnnotations(prev => [{
      id: `ann-${Date.now()}`,
      operative_id: mockCurrentOperative.operative_id,
      text: annotationText.trim(),
      timestamp: new Date().toISOString(),
    }, ...prev])
    setAnnotationText('')
  }

  return (
    <Shell activePath="/phenomena">
      
        <Sidebar activePath="/phenomena" />
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          <div style={{ fontSize: '10px', color: 'var(--text3)', letterSpacing: '1px', marginBottom: '14px' }}>
            <a href="/phenomena" style={{ color: 'var(--amber-dim)', textDecoration: 'none' }}>PHENOMENA</a>
            <span style={{ margin: '0 6px' }}>›</span>
            <span>{phen.name.toUpperCase()}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '16px', alignItems: 'start' }}>
            <div>
              {/* Header */}
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '18px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '6px' }}>PHENOMENON — BACK-NET REGISTRY</div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '24px', fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                      {phen.name}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '9px', padding: '3px 10px', letterSpacing: '1px',
                    border: `1px solid ${statusColor[phen.status]}`,
                    color: statusColor[phen.status], background: 'var(--bg3)',
                  }}>
                    {statusLabel[phen.status]}
                  </span>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
                {([['overview', 'OVERVIEW'], ['observations', 'FIELD OBSERVATIONS']] as [Tab, string][]).map(([key, label]) => (
                  <button key={key} onClick={() => setActiveTab(key)} style={{
                    background: activeTab === key ? 'var(--bg2)' : 'transparent',
                    border: 'none',
                    borderRight: '1px solid var(--border)',
                    borderBottom: activeTab === key ? '2px solid var(--amber)' : '2px solid transparent',
                    color: activeTab === key ? 'var(--amber)' : 'var(--text2)',
                    fontFamily: 'var(--mono)', fontSize: '10px', padding: '10px 14px',
                    cursor: 'pointer', letterSpacing: '1px',
                  }}>
                    {label}
                  </button>
                ))}
              </div>

              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderTop: 'none', padding: '18px', marginBottom: '14px' }}>
                {activeTab === 'overview' && (
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '12px' }}>DOCUMENTED DESCRIPTION</div>
                    <div style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 1.9, marginBottom: '20px' }}>{phen.description}</div>

                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                      <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '12px' }}>RESEARCH ANNOTATIONS</div>
                      {annotations.map(ann => (
                        <div key={ann.id} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', padding: '12px', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ fontSize: '10px', color: 'var(--amber)', letterSpacing: '1px' }}>{ann.operative_id}</span>
                            <span style={{ fontSize: '9px', color: 'var(--text3)' }}>{timeAgo(ann.timestamp)}</span>
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--text2)', lineHeight: 1.7 }}>{ann.text}</div>
                        </div>
                      ))}
                      <div style={{ marginTop: '12px', border: '1px solid var(--border)', padding: '12px', background: 'var(--bg3)' }}>
                        <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '2px', marginBottom: '8px' }}>
                          ADD ANNOTATION — {mockCurrentOperative.operative_id}
                        </div>
                        <textarea
                          value={annotationText}
                          onChange={e => setAnnotationText(e.target.value)}
                          placeholder="Enter research note or field observation..."
                          rows={3}
                          style={{
                            width: '100%', background: 'var(--bg2)', border: '1px solid var(--border2)',
                            color: 'var(--text)', fontFamily: 'var(--mono)', fontSize: '11px',
                            padding: '8px 10px', resize: 'vertical', outline: 'none',
                            lineHeight: 1.6, boxSizing: 'border-box',
                          }}
                        />
                        <button onClick={handleSubmitAnnotation} disabled={!annotationText.trim()} style={{
                          marginTop: '8px', background: annotationText.trim() ? 'var(--amber-glow2)' : 'var(--bg2)',
                          border: `1px solid ${annotationText.trim() ? 'var(--amber)' : 'var(--border)'}`,
                          color: annotationText.trim() ? 'var(--amber)' : 'var(--text3)',
                          fontFamily: 'var(--mono)', fontSize: '10px', padding: '6px 14px',
                          cursor: annotationText.trim() ? 'pointer' : 'not-allowed', letterSpacing: '1px',
                        }}>
                          SUBMIT ANNOTATION
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'observations' && (
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '14px' }}>
                      FIELD OBSERVATIONS — {observations.length} LOGGED
                    </div>
                    {observations.length > 0 ? observations.map((obs, i) => (
                      <div key={i} style={{ display: 'flex', gap: '14px', padding: '10px 0', borderBottom: '1px solid var(--border)', alignItems: 'flex-start' }}>
                        <span style={{ fontFamily: 'var(--display)', fontSize: '22px', color: 'var(--amber-dim)', lineHeight: 1, flexShrink: 0, minWidth: '24px' }}>
                          {i + 1}
                        </span>
                        <div style={{ fontSize: '11px', color: 'var(--text2)', lineHeight: 1.8, paddingTop: '2px' }}>{obs}</div>
                      </div>
                    )) : (
                      <div style={{ fontSize: '11px', color: 'var(--text3)' }}>No field observations on file.</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ position: 'sticky', top: 0 }}>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '14px', marginBottom: '12px' }}>
                <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '12px' }}>PHENOMENON DATA</div>
                {[['Name', phen.name], ['Status', statusLabel[phen.status]]].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: '10px' }}>
                    <span style={{ color: 'var(--text3)' }}>{label}</span>
                    <span style={{ color: 'var(--amber)' }}>{val}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '14px' }}>
                <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '12px' }}>OTHER PHENOMENA</div>
                {mockPhenomena.filter(p => p.id !== id).map((p, i, arr) => (
                  <a key={p.id} href={`/phenomena/${p.id}`} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                    textDecoration: 'none',
                  }}>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: 600, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {p.name}
                    </div>
                    <span style={{ fontSize: '8px', color: statusColor[p.status], letterSpacing: '1px', flexShrink: 0 }}>
                      {statusLabel[p.status]}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </main>
          </Shell>
  )
}
