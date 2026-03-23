'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type AuthMode = 'login' | 'register'
type Department = 'exploration' | 'research' | 'colonization' | 'defense' | 'async'

const BOOT_LINES = [
  '> BACK-NET TERMINAL v4.1',
  '> INITIALIZING PROMETHEUS LIBRARY...',
  '> LOADING M.E.G. OPERATIVE DATABASE...',
  '> CHECKING CLEARANCE PROTOCOLS...',
  '> ESTABLISHING SECURE RELAY...',
  '> CONNECTION VERIFIED — BASE ALPHA RELAY 73%',
  '> AUTHENTICATION REQUIRED.',
]

const DEPARTMENTS: {
  key: Department
  label: string
  code: string
  description: string
  locked?: boolean
}[] = [
  { key: 'exploration', label: 'EXPLORATION', code: 'EXP', description: 'Field operatives. Level mapping and first-contact.' },
  { key: 'research', label: 'RESEARCH', code: 'RSR', description: 'Academic and scientific documentation.' },
  { key: 'colonization', label: 'COLONIZATION', code: 'CLN', description: 'Outpost establishment and management.' },
  { key: 'defense', label: 'DEFENSE', code: 'DEF', description: 'Entity containment and operative protection.' },
  { key: 'async', label: 'ASYNC DIVISION', code: 'INT', description: 'Internal division. Invitation only.', locked: true },
]

// ── Left panel terminal content ────────────────────────────────────────────

const TERMINAL_SECTIONS = [
  {
    heading: 'SYSTEM STATUS',
    lines: [
      { label: 'BACK-NET RELAY',     value: 'ONLINE',         color: 'var(--green2)' },
      { label: 'PROMETHEUS LIB',     value: 'ONLINE',         color: 'var(--green2)' },
      { label: 'M.E.G. DATABASE',    value: 'SYNCING  87%',   color: 'var(--amber)' },
      { label: 'ASYNC DIVISION',     value: 'CLASSIFIED',     color: 'var(--red2)' },
      { label: 'ACTIVE OPERATIVES',  value: '4,891',          color: 'var(--text)' },
      { label: 'LEVELS LOGGED',      value: '1,247',          color: 'var(--text)' },
      { label: 'ENTITIES FILED',     value: '312',            color: 'var(--text)' },
    ],
  },
]

const CLEARANCE_LEVELS = [
  { level: 0, label: 'WANDERER',     desc: 'Unregistered. Read-only access to public documents.' },
  { level: 1, label: 'RECRUIT',      desc: 'New operative. Can submit reports for review.' },
  { level: 2, label: 'FIELD AGENT',  desc: 'Active field status. Full read access + annotations.' },
  { level: 3, label: 'RESEARCHER',   desc: 'Academic clearance. Can verify and publish documents.' },
  { level: 4, label: 'SENIOR AGENT', desc: 'Command access. Review queue and flagging authority.' },
  { level: 5, label: 'IMPRESARIO',   desc: 'Full system access. Async division included.' },
]

const RECENT_ACTIVITY = [
  { time: '00:04:12', op: 'MEG-RSR-0882', action: 'FILED entity report — Smilers (Level 0)' },
  { time: '00:11:37', op: 'MEG-EXP-2214', action: 'VERIFIED level doc — The Poolrooms' },
  { time: '00:23:05', op: 'MEG-DEF-0341', action: 'FLAGGED encounter — unclassified entity' },
  { time: '00:31:49', op: 'MEG-CLN-1103', action: 'SUBMITTED outpost status — Level 4 Alpha' },
  { time: '00:44:20', op: 'MEG-RSR-0519', action: 'PUBLISHED phenomenon — Temporal Drift' },
]

function TerminalPanel() {
  const [tick, setTick] = useState(0)
  const [activityIdx, setActivityIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setActivityIdx(i => (i + 1) % RECENT_ACTIVITY.length), 4000)
    return () => clearInterval(id)
  }, [])

  const now = new Date()
  const timeStr = now.toTimeString().slice(0, 8)
  const dateStr = now.toISOString().slice(0, 10)

  return (
    <div style={{
      flex: 1,
      background: 'var(--bg2)',
      borderRight: '1px solid var(--border)',
      overflowY: 'auto',
      padding: '32px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: '28px',
      fontFamily: 'var(--mono)',
    }}>

      {/* Header */}
      <div>
        <div style={{ fontSize: '28px', fontFamily: 'var(--display)', color: 'var(--amber2)', letterSpacing: '4px', lineHeight: 1 }}>
          BACK-NET
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text3)', letterSpacing: '2px', marginTop: '4px' }}>
          M.E.G. PROMETHEUS LIBRARY — TERMINAL v4.1
        </div>
        <div style={{ display: 'flex', gap: '16px', marginTop: '10px', fontSize: '10px', color: 'var(--text3)' }}>
          <span>{dateStr}</span>
          <span style={{ color: 'var(--amber-dim)' }}>◆</span>
          <span style={{ fontFamily: 'var(--mono)', color: 'var(--text2)' }}>{timeStr}</span>
          <span style={{ color: 'var(--amber-dim)' }}>◆</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span className="pulse-dot" style={{ width: '5px', height: '5px' }} />
            BASE ALPHA RELAY 73%
          </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)', position: 'relative' }}>
        <span style={{
          position: 'absolute', top: '-8px', left: 0,
          fontSize: '9px', color: 'var(--text3)', letterSpacing: '2px',
          background: 'var(--bg2)', paddingRight: '8px',
        }}>
          SYSTEM STATUS
        </span>
      </div>

      {/* Status grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {TERMINAL_SECTIONS[0].lines.map(({ label, value, color }) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
            <span style={{ color: 'var(--text3)', letterSpacing: '1px' }}>{label}</span>
            <span style={{ color, letterSpacing: '1px' }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)', position: 'relative' }}>
        <span style={{
          position: 'absolute', top: '-8px', left: 0,
          fontSize: '9px', color: 'var(--text3)', letterSpacing: '2px',
          background: 'var(--bg2)', paddingRight: '8px',
        }}>
          CLEARANCE LEVELS
        </span>
      </div>

      {/* Clearance table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {CLEARANCE_LEVELS.map(({ level, label, desc }) => (
          <div key={level} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{
              fontSize: '9px',
              letterSpacing: '1px',
              padding: '2px 6px',
              border: `1px solid ${level === 0 ? 'var(--border2)' : level <= 2 ? 'var(--amber-dim)' : level <= 4 ? 'var(--amber)' : 'var(--amber2)'}`,
              color: level === 0 ? 'var(--text3)' : level <= 2 ? 'var(--amber)' : level <= 4 ? 'var(--amber2)' : 'var(--amber3)',
              background: level === 0 ? 'transparent' : 'var(--amber-glow)',
              flexShrink: 0,
              minWidth: '20px',
              textAlign: 'center',
            }}>
              {level}
            </span>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--white)', letterSpacing: '1px', marginBottom: '1px' }}>{label}</div>
              <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '0.5px', lineHeight: 1.5 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)', position: 'relative' }}>
        <span style={{
          position: 'absolute', top: '-8px', left: 0,
          fontSize: '9px', color: 'var(--text3)', letterSpacing: '2px',
          background: 'var(--bg2)', paddingRight: '8px',
        }}>
          RECENT NETWORK ACTIVITY
        </span>
      </div>

      {/* Activity feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {RECENT_ACTIVITY.map((item, i) => (
          <div
            key={i}
            style={{
              fontSize: '10px',
              opacity: i === activityIdx ? 1 : i === (activityIdx + RECENT_ACTIVITY.length - 1) % RECENT_ACTIVITY.length ? 0.5 : 0.25,
              transition: 'opacity 0.6s ease',
              display: 'flex',
              gap: '10px',
            }}
          >
            <span style={{ color: 'var(--text3)', flexShrink: 0 }}>[{item.time}]</span>
            <span style={{ color: 'var(--amber-dim)', flexShrink: 0 }}>{item.op}</span>
            <span style={{ color: 'var(--text2)' }}>{item.action}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)', position: 'relative' }}>
        <span style={{
          position: 'absolute', top: '-8px', left: 0,
          fontSize: '9px', color: 'var(--text3)', letterSpacing: '2px',
          background: 'var(--bg2)', paddingRight: '8px',
        }}>
          HOW TO GET ACCESS
        </span>
      </div>

      {/* Onboarding steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[
          { n: '01', title: 'REQUEST CLEARANCE', body: 'Click "REQUEST ACCESS" tab and fill in your operative name, contact address, passphrase, and department.' },
          { n: '02', title: 'SELECT DEPARTMENT', body: 'Choose the division that matches your role. Async Division is invitation-only and requires senior clearance.' },
          { n: '03', title: 'AWAIT ASSIGNMENT', body: 'New operatives are assigned Clearance 1 — RECRUIT on registration. Promotions are granted by senior agents.' },
          { n: '04', title: 'AUTHENTICATE', body: 'Use your contact address and passphrase to log in. The terminal will verify your credentials against the M.E.G. database.' },
        ].map(({ n, title, body }) => (
          <div key={n} style={{ display: 'flex', gap: '12px' }}>
            <span style={{
              fontFamily: 'var(--display)',
              fontSize: '22px',
              color: 'var(--amber-dim)',
              lineHeight: 1,
              flexShrink: 0,
              marginTop: '1px',
            }}>
              {n}
            </span>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--amber)', letterSpacing: '1px', marginBottom: '3px' }}>{title}</div>
              <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '0.5px', lineHeight: 1.6 }}>{body}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border)', fontSize: '9px', color: 'var(--text3)', letterSpacing: '1px', lineHeight: 2 }}>
        <div>THE THRESHOLD — M.E.G. PROMETHEUS LIBRARY</div>
        <div>BUILD 0.1.0-alpha <span style={{ color: 'var(--amber-dim)' }}>◆</span> UNAUTHORIZED ACCESS IS A VIOLATION OF M.E.G. PROTOCOL 7</div>
      </div>
    </div>
  )
}

// ── Boot sequence ──────────────────────────────────────────────────────────

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number>(0)

  useEffect(() => {
    if (visibleLines >= BOOT_LINES.length) {
      const t = setTimeout(onComplete, 600)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setVisibleLines(v => v + 1), 160)
    return () => clearTimeout(t)
  }, [visibleLines, onComplete])

  return (
    <div style={{
      background: 'var(--bg2)',
      border: '1px solid var(--border)',
      padding: '16px',
      marginBottom: '20px',
      minHeight: '140px',
    }}>
      {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
        <div key={i} style={{
          fontFamily: 'var(--mono)',
          fontSize: '11px',
          color: i === visibleLines - 1 ? 'var(--amber2)' : 'var(--text3)',
          lineHeight: 1.8,
          letterSpacing: '0.5px',
        }}>
          {line}
        </div>
      ))}
      {visibleLines < BOOT_LINES.length && <span className="cursor-blink" />}
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function AuthPage() {
  const router = useRouter()
  const supabase = createClient()

  const [mode, setMode] = useState<AuthMode>('login')
  const [bootDone, setBootDone] = useState(false)
  const [department, setDepartment] = useState<Department | null>(null)
  const [registered, setRegistered] = useState(false)
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPw, setLoginPw] = useState('')
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({})

  const [regUsername, setRegUsername] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPw, setRegPw] = useState('')
  const [regErrors, setRegErrors] = useState<Record<string, string>>({})

  const handleBootComplete = useCallback(() => setBootDone(true), [])

  const handleLogin = async () => {
    const errs: Record<string, string> = {}
    if (!loginEmail.trim()) errs.email = 'REQUIRED'
    else if (!loginEmail.includes('@')) errs.email = 'INVALID FORMAT'
    if (!loginPw.trim()) errs.pw = 'REQUIRED'
    setLoginErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    setAuthError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail.trim(),
      password: loginPw,
    })

    setLoading(false)

    if (error) {
      setAuthError(error.message.toUpperCase())
    } else {
      router.push('/')
      router.refresh()
    }
  }

  const handleRegister = async () => {
    const errs: Record<string, string> = {}
    if (!regUsername.trim()) errs.username = 'REQUIRED'
    if (!regEmail.trim()) errs.email = 'REQUIRED'
    else if (!regEmail.includes('@')) errs.email = 'INVALID FORMAT'
    if (!regPw.trim()) errs.pw = 'REQUIRED'
    else if (regPw.length < 8) errs.pw = 'MIN 8 CHARACTERS'
    if (!department) errs.department = 'SELECT DEPARTMENT'
    setRegErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    setAuthError(null)

    const { error } = await supabase.auth.signUp({
      email: regEmail.trim(),
      password: regPw,
      options: { data: { username: regUsername.trim(), department } },
    })

    setLoading(false)

    if (error) {
      setAuthError(error.message.toUpperCase())
    } else {
      setRegistered(true)
    }
  }

  const inputBase: React.CSSProperties = {
    width: '100%',
    background: 'var(--bg3)',
    border: '1px solid var(--border2)',
    color: 'var(--text)',
    fontFamily: 'var(--mono)',
    fontSize: '12px',
    padding: '10px 12px',
    outline: 'none',
    letterSpacing: '1px',
    boxSizing: 'border-box',
  }

  const inputErr = (hasErr: boolean): React.CSSProperties => ({
    ...inputBase,
    borderColor: hasErr ? 'var(--red-border)' : 'var(--border2)',
  })

  return (
    <div style={{ display: 'flex', minHeight: '100svh' }}>

      {/* ── Left: terminal info panel ── */}
      <div className="auth-info-panel" style={{ flex: 1, minWidth: 0 }}>
        <TerminalPanel />
      </div>

      {/* ── Right: auth form ── */}
      <div className="auth-form-panel" style={{
        width: '420px',
        flexShrink: 0,
        background: 'var(--bg)',
        overflowY: 'auto',
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            fontFamily: 'var(--display)',
            fontSize: '44px',
            color: 'var(--amber2)',
            letterSpacing: '6px',
            lineHeight: 1,
            marginBottom: '4px',
          }}>
            THE THRESHOLD
          </div>
          <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px' }}>
            M.E.G. PROMETHEUS LIBRARY — BACK-NET
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '20px' }}>
          {(['login', 'register'] as AuthMode[]).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setRegistered(false); setAuthError(null) }}
              style={{
                flex: 1,
                background: mode === m ? 'var(--bg2)' : 'transparent',
                border: 'none',
                borderBottom: mode === m ? '2px solid var(--amber)' : '2px solid transparent',
                color: mode === m ? 'var(--amber)' : 'var(--text2)',
                fontFamily: 'var(--mono)',
                fontSize: '11px',
                padding: '10px',
                cursor: 'pointer',
                letterSpacing: '2px',
              }}
            >
              {m === 'login' ? 'AUTHENTICATE' : 'REQUEST ACCESS'}
            </button>
          ))}
        </div>

        {/* Error */}
        {authError && (
          <div style={{
            background: 'var(--red-bg)',
            border: '1px solid var(--red-border)',
            padding: '10px 14px',
            marginBottom: '16px',
            fontSize: '10px',
            color: 'var(--red2)',
            letterSpacing: '1px',
            fontFamily: 'var(--mono)',
          }}>
            &gt; ERROR — {authError}
          </div>
        )}

        {/* LOGIN */}
        {mode === 'login' && (
          <>
            {!bootDone ? (
              <BootSequence onComplete={handleBootComplete} />
            ) : (
              <div style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                padding: '16px',
                marginBottom: '20px',
              }}>
                <div style={{ fontSize: '11px', color: 'var(--amber2)', letterSpacing: '1px', fontFamily: 'var(--mono)' }}>
                  &gt; AUTHENTICATION REQUIRED.
                </div>
              </div>
            )}

            <div style={{ marginBottom: '14px' }}>
              <div style={{
                fontSize: '9px',
                color: loginErrors.email ? 'var(--red2)' : 'var(--text3)',
                letterSpacing: '2px', marginBottom: '6px',
                display: 'flex', gap: '6px',
              }}>
                CONTACT ADDRESS
                {loginErrors.email && <span style={{ color: 'var(--red2)' }}>— {loginErrors.email}</span>}
              </div>
              <input
                type="email"
                placeholder="operative@meg.net"
                value={loginEmail}
                onChange={e => { setLoginEmail(e.target.value); setLoginErrors(p => { const n = {...p}; delete n.email; return n }) }}
                style={inputErr(!!loginErrors.email)}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{
                fontSize: '9px',
                color: loginErrors.pw ? 'var(--red2)' : 'var(--text3)',
                letterSpacing: '2px', marginBottom: '6px',
                display: 'flex', gap: '6px',
              }}>
                PASSPHRASE
                {loginErrors.pw && <span style={{ color: 'var(--red2)' }}>— {loginErrors.pw}</span>}
              </div>
              <input
                type="password"
                placeholder="••••••••••••"
                value={loginPw}
                onChange={e => { setLoginPw(e.target.value); setLoginErrors(p => { const n = {...p}; delete n.pw; return n }) }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={inputErr(!!loginErrors.pw)}
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? 'transparent' : 'var(--amber-glow2)',
                border: '1px solid var(--amber)',
                color: 'var(--amber)',
                fontFamily: 'var(--mono)',
                fontSize: '12px',
                padding: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '3px',
                marginBottom: '14px',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? '> VERIFYING...' : 'AUTHENTICATE'}
            </button>

            <div style={{ textAlign: 'center', fontSize: '10px', color: 'var(--text3)', letterSpacing: '1px' }}>
              New operative?{' '}
              <button
                onClick={() => { setMode('register'); setAuthError(null) }}
                style={{
                  background: 'none', border: 'none',
                  color: 'var(--amber-dim)', fontFamily: 'var(--mono)',
                  fontSize: '10px', cursor: 'pointer', padding: 0,
                  letterSpacing: '1px', textDecoration: 'underline',
                }}
              >
                Request access
              </button>
            </div>
          </>
        )}

        {/* REGISTER */}
        {mode === 'register' && (
          <>
            <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '18px' }}>
              REQUEST OPERATIVE CLEARANCE
            </div>

            {registered ? (
              <div style={{ background: 'var(--bg2)', border: '1px solid #1a4a28', padding: '20px' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text)', lineHeight: 2 }}>
                  <div style={{ color: '#3aaa5a' }}>&gt; REGISTRATION RECEIVED.</div>
                  <div>&gt; CONFIRM YOUR EMAIL TO ACTIVATE ACCESS.</div>
                  <div>&gt; CHECK YOUR CONTACT ADDRESS FOR VERIFICATION LINK.</div>
                  <div style={{ color: 'var(--text3)', marginTop: '6px' }}>
                    &gt; You will be cleared upon confirmation.
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '14px' }}>
                  <div style={{
                    fontSize: '9px',
                    color: regErrors.username ? 'var(--red2)' : 'var(--text3)',
                    letterSpacing: '2px', marginBottom: '6px',
                    display: 'flex', gap: '6px',
                  }}>
                    OPERATIVE NAME
                    {regErrors.username && <span style={{ color: 'var(--red2)' }}>— {regErrors.username}</span>}
                  </div>
                  <input
                    type="text"
                    placeholder="Your operative name"
                    value={regUsername}
                    onChange={e => { setRegUsername(e.target.value); setRegErrors(p => { const n = {...p}; delete n.username; return n }) }}
                    style={inputErr(!!regErrors.username)}
                  />
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <div style={{
                    fontSize: '9px',
                    color: regErrors.email ? 'var(--red2)' : 'var(--text3)',
                    letterSpacing: '2px', marginBottom: '6px',
                    display: 'flex', gap: '6px',
                  }}>
                    CONTACT ADDRESS
                    {regErrors.email && <span style={{ color: 'var(--red2)' }}>— {regErrors.email}</span>}
                  </div>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={regEmail}
                    onChange={e => { setRegEmail(e.target.value); setRegErrors(p => { const n = {...p}; delete n.email; return n }) }}
                    style={inputErr(!!regErrors.email)}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    fontSize: '9px',
                    color: regErrors.pw ? 'var(--red2)' : 'var(--text3)',
                    letterSpacing: '2px', marginBottom: '6px',
                    display: 'flex', gap: '6px',
                  }}>
                    PASSPHRASE
                    {regErrors.pw && <span style={{ color: 'var(--red2)' }}>— {regErrors.pw}</span>}
                  </div>
                  <input
                    type="password"
                    placeholder="Min. 8 characters"
                    value={regPw}
                    onChange={e => { setRegPw(e.target.value); setRegErrors(p => { const n = {...p}; delete n.pw; return n }) }}
                    style={inputErr(!!regErrors.pw)}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    fontSize: '9px',
                    color: regErrors.department ? 'var(--red2)' : 'var(--text3)',
                    letterSpacing: '2px', marginBottom: '10px',
                    display: 'flex', gap: '6px',
                  }}>
                    DEPARTMENT
                    {regErrors.department && <span style={{ color: 'var(--red2)' }}>— {regErrors.department}</span>}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    {DEPARTMENTS.map(dept => (
                      <button
                        key={dept.key}
                        onClick={() => {
                          if (!dept.locked) {
                            setDepartment(dept.key)
                            setRegErrors(p => { const n = {...p}; delete n.department; return n })
                          }
                        }}
                        style={{
                          background: department === dept.key ? 'var(--amber-glow2)' : dept.locked ? 'var(--bg3)' : 'var(--bg2)',
                          border: `1px solid ${department === dept.key ? 'var(--amber)' : 'var(--border)'}`,
                          padding: '10px',
                          cursor: dept.locked ? 'not-allowed' : 'pointer',
                          textAlign: 'left',
                          opacity: dept.locked ? 0.5 : 1,
                          gridColumn: dept.key === 'async' ? '1 / -1' : undefined,
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                          <div style={{
                            fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: 700,
                            color: department === dept.key ? 'var(--amber2)' : 'var(--white)',
                            textTransform: 'uppercase', letterSpacing: '1px',
                          }}>
                            {dept.label}
                          </div>
                          {dept.locked && (
                            <span style={{ fontSize: '9px', color: 'var(--red2)', letterSpacing: '1px' }}>
                              INVITATION ONLY
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '0.5px' }}>
                          {dept.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleRegister}
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: loading ? 'transparent' : 'var(--amber-glow2)',
                    border: '1px solid var(--amber)',
                    color: 'var(--amber)',
                    fontFamily: 'var(--mono)',
                    fontSize: '12px',
                    padding: '12px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    letterSpacing: '3px',
                    marginBottom: '12px',
                    opacity: loading ? 0.6 : 1,
                  }}
                >
                  {loading ? '> TRANSMITTING...' : 'REQUEST CLEARANCE'}
                </button>

                <div style={{ textAlign: 'center', fontSize: '10px', color: 'var(--text3)', letterSpacing: '1px' }}>
                  Already registered?{' '}
                  <button
                    onClick={() => { setMode('login'); setAuthError(null) }}
                    style={{
                      background: 'none', border: 'none',
                      color: 'var(--amber-dim)', fontFamily: 'var(--mono)',
                      fontSize: '10px', cursor: 'pointer', padding: 0,
                      letterSpacing: '1px', textDecoration: 'underline',
                    }}
                  >
                    Authenticate
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
