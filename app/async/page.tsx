'use client'
import { useState, useEffect } from 'react'
import TopBar from '@/components/TopBar'
import Sidebar from '@/components/Sidebar'
import RightPanel from '@/components/RightPanel'
import {
  mockCurrentOperative,
  mockMessagesExtended,
  mockActivity,
} from '@/lib/mock-data'

const BOOT_LINES = [
  '> BACK-NET — DIVISION ACCESS PORTAL',
  '> OPERATIVE: MEG-EXP-4471',
  '> CLEARANCE LEVEL: 2 — FIELD AGENT',
  '> REQUESTED DIVISION: ASYNC',
  '> MINIMUM CLEARANCE REQUIRED: 4',
  '',
  '> ACCESS DENIED.',
]

export default function AsyncPage() {
  const [lines, setLines] = useState<string[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i >= BOOT_LINES.length) {
        clearInterval(interval)
        setDone(true)
        return
      }
      setLines(prev => [...prev, BOOT_LINES[i]])
      i++
    }, 220)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <TopBar operative={mockCurrentOperative} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar activePath="/async" />
        <main style={{ flex: 1, overflowY: 'auto', padding: '40px' }}>

          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            {/* Terminal output */}
            <div style={{
              background: 'var(--bg2)', border: '1px solid var(--red-border)',
              padding: '28px 32px', marginBottom: '20px',
              fontFamily: 'var(--mono)',
            }}>
              {lines.map((line, i) => (
                <div key={i} style={{
                  fontSize: '12px',
                  color: line.includes('ACCESS DENIED') ? 'var(--red2)'
                    : line.includes('CLEARANCE REQUIRED') ? 'var(--red2)'
                    : line === '' ? 'transparent'
                    : 'var(--text2)',
                  letterSpacing: '0.5px',
                  lineHeight: 2,
                  fontWeight: line.includes('ACCESS DENIED') ? 700 : 400,
                }}>
                  {line || '\u00a0'}
                </div>
              ))}
              {!done && (
                <span className="cursor-blink" style={{ marginTop: '8px', display: 'inline-block' }} />
              )}
            </div>

            {done && (
              <div style={{
                background: 'var(--red-bg)', border: '1px solid var(--red-border)',
                padding: '28px 32px',
              }}>
                <div style={{ fontSize: '9px', color: 'var(--red2)', letterSpacing: '4px', marginBottom: '16px' }}>
                  ▲ CLEARANCE VIOLATION — LOG ENTRY CREATED
                </div>
                <div style={{ fontFamily: 'var(--display)', fontSize: '40px', color: 'var(--red2)', lineHeight: 1, marginBottom: '12px', letterSpacing: '3px' }}>
                  ACCESS DENIED
                </div>
                <div style={{ fontSize: '12px', color: '#c07070', lineHeight: 1.9, marginBottom: '20px' }}>
                  The Async Division operates under Clearance Level 4 protocols.
                  Your current authorization ({' '}
                  <span style={{ color: 'var(--amber)' }}>Level {mockCurrentOperative.clearance}</span>
                  {' '}) is insufficient to access these files.
                </div>
                <div style={{ borderTop: '1px solid var(--red-border)', paddingTop: '16px', fontSize: '10px', color: '#804040', letterSpacing: '1px', lineHeight: 1.8 }}>
                  <div>This access attempt has been logged and flagged for review.</div>
                  <div>Contact your Department Head to request a clearance elevation.</div>
                  <div style={{ marginTop: '8px', color: 'var(--red2)' }}>
                    If you believe this is in error — it is not.
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
                  <a href="/" style={{
                    background: 'var(--bg2)', border: '1px solid var(--border)',
                    color: 'var(--text2)', fontFamily: 'var(--mono)', fontSize: '10px',
                    padding: '8px 18px', cursor: 'pointer', letterSpacing: '1px',
                    textDecoration: 'none',
                  }}>
                    ← RETURN TO TERMINAL
                  </a>
                  <a href="/dossier" style={{
                    background: 'transparent', border: '1px solid var(--red-border)',
                    color: '#804040', fontFamily: 'var(--mono)', fontSize: '10px',
                    padding: '8px 18px', cursor: 'pointer', letterSpacing: '1px',
                    textDecoration: 'none',
                  }}>
                    VIEW MY DOSSIER ›
                  </a>
                </div>
              </div>
            )}
          </div>
        </main>
        <RightPanel operative={mockCurrentOperative} messages={mockMessagesExtended} activity={mockActivity} />
      </div>
    </div>
  )
}
