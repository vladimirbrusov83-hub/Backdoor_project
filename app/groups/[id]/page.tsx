'use client'
import Shell from '@/components/Shell'
import { useParams } from 'next/navigation'
import {
  mockGroups,
  mockReports,
} from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'

const alignColor: Record<string, string> = {
  meg:         '#3aaa5a',
  independent: 'var(--amber)',
  hostile:     'var(--red2)',
  unknown:     'var(--text3)',
}
const alignLabel: Record<string, string> = {
  meg:         'M.E.G. AFFILIATED',
  independent: 'INDEPENDENT',
  hostile:     'HOSTILE — AVOID',
  unknown:     'ALIGNMENT UNKNOWN',
}

export default function GroupDetailPage() {
  const params = useParams()
  const id = params.id as string
  const group = mockGroups.find(g => g.id === id)

  // Reports that reference this group
  const relatedReports = mockReports.filter(r => r.ref_id === id || r.doc_type === 'group')

  if (!group) {
    return (
      <Shell activePath="/groups">
        
          <Sidebar activePath="/groups" />
          <main style={{ flex: 1, overflowY: 'auto', padding: '40px 20px' }}>
            <div style={{ color: 'var(--red2)', fontFamily: 'var(--mono)', fontSize: '12px', letterSpacing: '2px' }}>
              &gt; GROUP NOT FOUND — ID: {id}
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <Shell activePath="/groups">
      
        <Sidebar activePath="/groups" />
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          <div style={{ fontSize: '10px', color: 'var(--text3)', letterSpacing: '1px', marginBottom: '14px' }}>
            <a href="/groups" style={{ color: 'var(--amber-dim)', textDecoration: 'none' }}>GROUPS</a>
            <span style={{ margin: '0 6px' }}>›</span>
            <span>{group.name}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '16px', alignItems: 'start' }}>
            <div>
              {/* Header */}
              <div style={{
                background: 'var(--bg2)',
                border: `1px solid ${group.alignment === 'hostile' ? 'var(--red-border)' : 'var(--border)'}`,
                padding: '18px', marginBottom: '14px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--display)', fontSize: '48px', color: alignColor[group.alignment], lineHeight: 1, marginBottom: '4px' }}>
                      {group.code}
                    </div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '22px', fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                      {group.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text2)', marginTop: '3px', letterSpacing: '1px' }}>
                      {group.full_name}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                    <span style={{
                      fontSize: '9px', padding: '3px 10px', letterSpacing: '1px',
                      border: `1px solid ${alignColor[group.alignment]}`,
                      color: alignColor[group.alignment], background: 'var(--bg3)',
                    }}>
                      {alignLabel[group.alignment]}
                    </span>
                    <span style={{
                      fontSize: '9px', padding: '3px 10px', letterSpacing: '1px',
                      border: `1px solid ${group.status === 'active' ? '#1a4a28' : 'var(--border)'}`,
                      color: group.status === 'active' ? '#3aaa5a' : 'var(--text3)', background: 'var(--bg3)',
                    }}>
                      {group.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '20px', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border)', fontSize: '10px', color: 'var(--text3)' }}>
                  {group.headquarters && <span>HQ: <span style={{ color: 'var(--amber)' }}>{group.headquarters}</span></span>}
                  <span>MEMBERS: <span style={{ color: 'var(--amber)' }}>{group.member_count}</span></span>
                  {group.founded && <span>FOUNDED: <span style={{ color: 'var(--amber)' }}>{new Date(group.founded).getFullYear()}</span></span>}
                </div>
              </div>

              {/* Description */}
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '18px', marginBottom: '14px' }}>
                <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '12px' }}>OVERVIEW</div>
                <div style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 1.9, marginBottom: '20px' }}>{group.description}</div>

                {group.goals.length > 0 && (
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                    <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '12px' }}>DOCUMENTED GOALS & OPERATIONS</div>
                    {group.goals.map((goal, i) => (
                      <div key={i} style={{ display: 'flex', gap: '10px', padding: '7px 0', fontSize: '11px', color: 'var(--text2)', borderBottom: '1px solid var(--border)', alignItems: 'flex-start' }}>
                        <span style={{ color: alignColor[group.alignment], flexShrink: 0, fontSize: '12px' }}>›</span>
                        {goal}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Related reports */}
              {relatedReports.length > 0 && (
                <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '18px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '12px' }}>RELATED FIELD REPORTS</div>
                  {relatedReports.map((rpt, i) => (
                    <div key={rpt.id} style={{
                      padding: '10px 0',
                      borderBottom: i < relatedReports.length - 1 ? '1px solid var(--border)' : 'none',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <div style={{ fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: 600, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {rpt.title}
                        </div>
                        <span style={{ fontSize: '9px', color: 'var(--amber-dim)', flexShrink: 0 }}>{timeAgo(rpt.updated_at)}</span>
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text2)', lineHeight: 1.6 }}>{rpt.summary}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div style={{ position: 'sticky', top: 0 }}>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '14px', marginBottom: '12px' }}>
                <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '12px' }}>GROUP DATA</div>
                {[
                  ['Code', group.code],
                  ['Alignment', alignLabel[group.alignment]],
                  ['Status', group.status.toUpperCase()],
                  ['Members', group.member_count],
                  ...(group.headquarters ? [['Headquarters', group.headquarters]] : []),
                  ['Filed By', group.author_operative_id],
                  ['Last Updated', new Date(group.updated_at).toLocaleDateString()],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: '10px' }}>
                    <span style={{ color: 'var(--text3)' }}>{label}</span>
                    <span style={{ color: 'var(--amber)', textAlign: 'right', maxWidth: '130px' }}>{val}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '14px' }}>
                <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '12px' }}>OTHER GROUPS</div>
                {mockGroups.filter(g => g.id !== id).map((g, i, arr) => (
                  <a key={g.id} href={`/groups/${g.id}`} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                    textDecoration: 'none',
                  }}>
                    <div>
                      <div style={{ fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: 600, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {g.name}
                      </div>
                      <div style={{ fontSize: '9px', color: 'var(--text3)', marginTop: '1px' }}>{g.code}</div>
                    </div>
                    <span style={{ fontSize: '8px', color: alignColor[g.alignment], letterSpacing: '1px', flexShrink: 0 }}>
                      {alignLabel[g.alignment]}
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
