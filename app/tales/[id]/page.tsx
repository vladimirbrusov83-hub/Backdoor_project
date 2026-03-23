'use client'
import { useParams } from 'next/navigation'
import TopBar from '@/components/TopBar'
import Sidebar from '@/components/Sidebar'
import RightPanel from '@/components/RightPanel'
import {
  mockTales,
  mockLevels,
  mockCurrentOperative,
  mockMessages,
  mockActivity,
} from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'

export default function TaleDetailPage() {
  const params = useParams()
  const id = params.id as string
  const tale = mockTales.find(t => t.id === id)
  const relatedLevel = tale?.related_level ? mockLevels.find(l => l.id === tale.related_level) : null

  if (!tale) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <TopBar operative={mockCurrentOperative} />
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <Sidebar activePath="/tales" />
          <main style={{ flex: 1, overflowY: 'auto', padding: '40px 20px' }}>
            <div style={{ color: 'var(--red2)', fontFamily: 'var(--mono)', fontSize: '12px', letterSpacing: '2px' }}>
              &gt; TALE NOT FOUND — ID: {id}
            </div>
          </main>
          <RightPanel operative={mockCurrentOperative} messages={mockMessages} activity={mockActivity} />
        </div>
      </div>
    )
  }

  // Split content into paragraphs
  const paragraphs = tale.content.split('\n\n').filter(p => p.trim())

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <TopBar operative={mockCurrentOperative} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar activePath="/tales" />
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          <div style={{ fontSize: '10px', color: 'var(--text3)', letterSpacing: '1px', marginBottom: '14px' }}>
            <a href="/tales" style={{ color: 'var(--amber-dim)', textDecoration: 'none' }}>TALES</a>
            <span style={{ margin: '0 6px' }}>›</span>
            <span>{tale.title.toUpperCase()}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '16px', alignItems: 'start' }}>
            <div>
              {/* Header */}
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '20px', marginBottom: '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '6px' }}>
                      M.E.G. TALE — FORMAT: TALE-001
                    </div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '26px', fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                      {tale.title}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end' }}>
                    <span style={{
                      fontSize: '9px', padding: '3px 8px', letterSpacing: '1px',
                      background: tale.canon_layer === 'async' ? 'rgba(63,46,10,0.4)' : 'var(--bg3)',
                      border: `1px solid ${tale.canon_layer === 'async' ? 'var(--amber-dim)' : 'var(--border2)'}`,
                      color: tale.canon_layer === 'async' ? 'var(--text3)' : 'var(--text2)',
                    }}>
                      {tale.canon_layer === 'meg' ? 'M.E.G. CANON' : 'ASYNC DIVISION'}
                    </span>
                    {tale.status === 'verified' && (
                      <span style={{ fontSize: '9px', color: '#3aaa5a', background: '#0a1f10', border: '1px solid #1a4a28', padding: '2px 8px', letterSpacing: '1px' }}>
                        ✓ VERIFIED
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', paddingTop: '12px', borderTop: '1px solid var(--border)', fontSize: '10px', color: 'var(--text3)' }}>
                  <span>FILED BY: <span style={{ color: 'var(--amber)' }}>{tale.author_operative_id}</span></span>
                  <span>{tale.word_count.toLocaleString()} WORDS</span>
                  <span>{timeAgo(tale.created_at)}</span>
                </div>
              </div>

              {/* Story content */}
              <div style={{
                background: 'var(--bg2)', border: '1px solid var(--border)', borderTop: 'none',
                padding: '28px 32px',
              }}>
                {tale.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                    {tale.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: '8px', padding: '2px 7px', letterSpacing: '0.5px',
                        background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text3)',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {paragraphs.map((para, i) => {
                  // Single-line paragraphs get italic treatment (like a date stamp)
                  const isShort = para.trim().length < 40
                  return (
                    <p key={i} style={{
                      fontSize: isShort ? '10px' : '13px',
                      color: isShort ? 'var(--text3)' : 'var(--text)',
                      lineHeight: isShort ? 1.5 : 2,
                      marginBottom: '20px',
                      fontStyle: isShort ? 'italic' : 'normal',
                      letterSpacing: isShort ? '1px' : '0.2px',
                      fontFamily: isShort ? 'var(--mono)' : 'var(--mono)',
                    }}>
                      {para}
                    </p>
                  )
                })}

                {/* End marker */}
                <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '4px' }}>
                    — END OF DOCUMENT —
                  </span>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ position: 'sticky', top: 0 }}>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '14px', marginBottom: '12px' }}>
                <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '12px' }}>TALE METADATA</div>
                {[
                  ['Author', tale.author_operative_id],
                  ['Canon', tale.canon_layer === 'meg' ? 'M.E.G. CANON' : 'ASYNC'],
                  ['Status', tale.status.toUpperCase()],
                  ['Word Count', tale.word_count.toLocaleString()],
                  ['Filed', new Date(tale.created_at).toLocaleDateString()],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: '10px' }}>
                    <span style={{ color: 'var(--text3)' }}>{label}</span>
                    <span style={{ color: 'var(--amber)' }}>{val}</span>
                  </div>
                ))}
              </div>

              {relatedLevel && (
                <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '14px', marginBottom: '12px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '12px' }}>RELATED LEVEL</div>
                  <a href={`/levels/${relatedLevel.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{ fontFamily: 'var(--display)', fontSize: '28px', color: 'var(--amber)', lineHeight: 1, marginBottom: '2px' }}>
                      LEVEL {relatedLevel.designation}
                    </div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: 600, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {relatedLevel.title}
                    </div>
                  </a>
                </div>
              )}

              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '14px' }}>
                <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '12px' }}>OTHER TALES</div>
                {mockTales.filter(t => t.id !== id).map((t, i, arr) => (
                  <a key={t.id} href={`/tales/${t.id}`} style={{
                    display: 'block', padding: '8px 0',
                    borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                    textDecoration: 'none',
                  }}>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: 600, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
                      {t.title}
                    </div>
                    <div style={{ fontSize: '9px', color: 'var(--text3)' }}>
                      {t.author_operative_id} · {t.word_count.toLocaleString()}w
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </main>
        <RightPanel operative={mockCurrentOperative} messages={mockMessages} activity={mockActivity} />
      </div>
    </div>
  )
}
