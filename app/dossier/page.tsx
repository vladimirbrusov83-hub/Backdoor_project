'use client'
import Shell from '@/components/Shell'
import {
  mockReports,
  mockCurrentOperative,
  mockActivity,
} from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'

const CLEARANCE_LABELS: Record<number, string> = {
  0: 'UNCLEARED',
  1: 'FIELD AGENT',
  2: 'FIELD AGENT',
  3: 'SENIOR AGENT',
  4: 'DIVISION HEAD',
  5: 'DIRECTOR',
}

const DEPT_LABELS: Record<string, string> = {
  exploration:  'EXPLORATION DIVISION',
  research:     'RESEARCH DIVISION',
  colonization: 'COLONIZATION DIVISION',
  defense:      'DEFENSE DIVISION',
  async:        'ASYNC DIVISION',
}

const CLEARANCE_COLORS: Record<number, string> = {
  0: 'var(--text3)',
  1: 'var(--text2)',
  2: 'var(--amber)',
  3: 'var(--amber2)',
  4: 'var(--red2)',
  5: 'var(--red2)',
}

const typeLabel: Record<string, string> = {
  level: 'LVL', entity: 'ENT', object: 'OBJ',
  phenomenon: 'PHN', group: 'GRP', tale: 'TALE',
}

export default function DossierPage() {
  const op = mockCurrentOperative
  const myReports = mockReports.filter(r => r.author_operative_id === op.operative_id)
  const verifiedReports = myReports.filter(r => r.status === 'verified')
  const pendingReports = myReports.filter(r => r.status === 'pending')
  const myActivity = mockActivity.filter(a => a.operative_id === op.operative_id)

  const joinDate = new Date(op.joined_at)
  const daysActive = Math.floor((Date.now() - joinDate.getTime()) / (1000 * 60 * 60 * 24))

  const clrColor = CLEARANCE_COLORS[op.clearance] ?? 'var(--text2)'

  return (
    <Shell activePath="/dossier">
      
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>

          {/* Header */}
          <div style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '14px' }}>
            <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '5px' }}>
              BACK-NET — OPERATIVE FILE
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '22px', fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '2px' }}>
              OPERATIVE DOSSIER
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '16px', alignItems: 'start' }}>
            <div>

              {/* ID Card */}
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '20px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  {/* Avatar block */}
                  <div style={{
                    width: '64px', height: '64px', flexShrink: 0,
                    background: 'var(--bg3)', border: '1px solid var(--border2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '24px', color: 'var(--amber)', fontFamily: 'var(--display)',
                    letterSpacing: '2px',
                  }}>
                    {op.username.slice(0, 2).toUpperCase()}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '4px' }}>
                      OPERATIVE IDENTIFICATION
                    </div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '20px', fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px' }}>
                      {op.username}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--amber)', letterSpacing: '1px', marginBottom: '8px', fontFamily: 'var(--mono)' }}>
                      {op.operative_id}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text2)', letterSpacing: '1px' }}>
                      {DEPT_LABELS[op.department] ?? op.department.toUpperCase()}
                    </div>
                  </div>

                  {/* Clearance badge */}
                  <div style={{ flexShrink: 0, textAlign: 'center' }}>
                    <div style={{
                      fontSize: '9px', color: 'var(--text3)', letterSpacing: '2px', marginBottom: '6px',
                    }}>CLEARANCE</div>
                    <div style={{
                      fontFamily: 'var(--display)', fontSize: '42px', lineHeight: 1,
                      color: clrColor, marginBottom: '4px',
                    }}>
                      {op.clearance}
                    </div>
                    <div style={{ fontSize: '9px', color: clrColor, letterSpacing: '1.5px' }}>
                      {CLEARANCE_LABELS[op.clearance]}
                    </div>
                  </div>
                </div>

                {/* Clearance bar */}
                <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '2px', marginBottom: '8px' }}>
                    CLEARANCE LEVEL
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[0, 1, 2, 3, 4, 5].map(lvl => (
                      <div key={lvl} style={{
                        flex: 1, height: '6px',
                        background: lvl <= op.clearance ? clrColor : 'var(--bg3)',
                        border: `1px solid ${lvl <= op.clearance ? clrColor : 'var(--border)'}`,
                        transition: 'background 0.3s',
                      }} />
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    {[0, 1, 2, 3, 4, 5].map(lvl => (
                      <div key={lvl} style={{ fontSize: '8px', color: lvl <= op.clearance ? clrColor : 'var(--text3)' }}>
                        {lvl}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
                {[
                  { label: 'REPORTS FILED', value: op.reports_filed, color: 'var(--amber2)' },
                  { label: 'VERIFIED', value: op.reports_verified, color: '#3aaa5a' },
                  { label: 'DAYS ACTIVE', value: daysActive, color: 'var(--amber)' },
                  { label: 'PENDING', value: pendingReports.length, color: pendingReports.length > 0 ? 'var(--amber)' : 'var(--text3)' },
                ].map(stat => (
                  <div key={stat.label} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '14px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--display)', fontSize: '34px', color: stat.color, lineHeight: 1, marginBottom: '6px' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '2px' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent activity */}
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '16px', marginBottom: '16px' }}>
                <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '14px' }}>
                  RECENT ACTIVITY
                </div>
                {myActivity.length === 0 ? (
                  <div style={{ fontSize: '11px', color: 'var(--text3)', letterSpacing: '1px' }}>
                    NO RECENT ACTIVITY ON RECORD
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {myActivity.map((a, i) => (
                      <div key={a.id} style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '8px 0',
                        borderBottom: i < myActivity.length - 1 ? '1px solid var(--border)' : 'none',
                        fontSize: '11px',
                      }}>
                        <span style={{ color: 'var(--amber-dim)', letterSpacing: '1px', minWidth: '60px', flexShrink: 0 }}>
                          {a.action.toUpperCase()}
                        </span>
                        <span style={{ color: 'var(--text)', flex: 1 }}>{a.target}</span>
                        <span style={{ color: 'var(--text3)', fontSize: '9px', flexShrink: 0 }}>{timeAgo(a.timestamp)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Filed reports */}
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '16px' }}>
                <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '14px' }}>
                  FILED REPORTS — {myReports.length} ON RECORD
                </div>
                {myReports.length === 0 ? (
                  <div style={{ fontSize: '11px', color: 'var(--text3)', letterSpacing: '1px' }}>NO REPORTS FILED</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {myReports.map((r, i) => (
                      <div key={r.id} style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '9px 0',
                        borderBottom: i < myReports.length - 1 ? '1px solid var(--border)' : 'none',
                      }}>
                        <span style={{
                          fontSize: '8px', padding: '2px 5px', letterSpacing: '1px', flexShrink: 0,
                          background: 'var(--bg3)', border: '1px solid var(--border2)', color: 'var(--text3)',
                        }}>
                          {typeLabel[r.doc_type] ?? r.doc_type.toUpperCase()}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--white)', flex: 1, fontFamily: 'var(--sans)', fontWeight: 600 }}>
                          {r.title}
                        </span>
                        <span style={{ fontSize: '9px', letterSpacing: '1px', flexShrink: 0,
                          color: r.status === 'verified' ? '#3aaa5a' : r.status === 'flagged' ? 'var(--red2)' : 'var(--amber)',
                        }}>
                          {r.status.toUpperCase()}
                        </span>
                        <span style={{ fontSize: '9px', color: 'var(--text3)', flexShrink: 0 }}>{timeAgo(r.updated_at)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ position: 'sticky', top: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>

              {/* Service record */}
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '14px' }}>
                <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '12px' }}>SERVICE RECORD</div>
                {[
                  ['Operative ID', op.operative_id],
                  ['Department', DEPT_LABELS[op.department]?.split(' ')[0] ?? op.department.toUpperCase()],
                  ['Clearance', `LEVEL ${op.clearance}`],
                  ['Joined', joinDate.toLocaleDateString()],
                  ['Days Active', `${daysActive} DAYS`],
                  ['Reports Filed', String(op.reports_filed)],
                  ['Reports Verified', String(op.reports_verified)],
                  ['Verify Rate', op.reports_filed > 0 ? `${Math.round((op.reports_verified / op.reports_filed) * 100)}%` : 'N/A'],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: '10px' }}>
                    <span style={{ color: 'var(--text3)' }}>{label}</span>
                    <span style={{ color: 'var(--amber)' }}>{val}</span>
                  </div>
                ))}
              </div>

              {/* Standing */}
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '14px' }}>
                <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '12px' }}>OPERATIVE STANDING</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3aaa5a', boxShadow: '0 0 6px #3aaa5a' }} />
                  <span style={{ fontSize: '11px', color: '#3aaa5a', letterSpacing: '1px' }}>GOOD STANDING</span>
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text3)', lineHeight: 1.7 }}>
                  No flags or violations on record. Verification rate within acceptable parameters.
                </div>
              </div>

              {/* Clearance access */}
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '14px' }}>
                <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '12px' }}>ACCESS PERMISSIONS</div>
                {[
                  { label: 'M.E.G. CANON DOCS', access: true },
                  { label: 'ENTITY DATABASE',   access: true },
                  { label: 'ASYNC DIVISION',     access: op.clearance >= 4 },
                  { label: 'RESTRICTED FILES',   access: op.clearance >= 3 },
                  { label: 'DIRECTOR FILES',     access: op.clearance >= 5 },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: '10px' }}>
                    <span style={{ color: 'var(--text3)' }}>{item.label}</span>
                    <span style={{ color: item.access ? '#3aaa5a' : 'var(--red2)', fontSize: '9px', letterSpacing: '1px' }}>
                      {item.access ? '✓ GRANTED' : '✗ DENIED'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
          </Shell>
  )
}
