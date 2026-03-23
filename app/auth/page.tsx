'use client'
import { useState, useEffect } from 'react'

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
    <div
      style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        padding: '16px',
        marginBottom: '20px',
        minHeight: '140px',
      }}
    >
      {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
        <div
          key={i}
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            color: i === visibleLines - 1 ? 'var(--amber2)' : 'var(--text3)',
            lineHeight: 1.8,
            letterSpacing: '0.5px',
          }}
        >
          {line}
        </div>
      ))}
      {visibleLines < BOOT_LINES.length && (
        <span className="cursor-blink" />
      )}
    </div>
  )
}

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [bootDone, setBootDone] = useState(false)
  const [department, setDepartment] = useState<Department | null>(null)
  const [registered, setRegistered] = useState(false)

  // Login form
  const [loginId, setLoginId] = useState('')
  const [loginPw, setLoginPw] = useState('')
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({})

  // Register form
  const [regUsername, setRegUsername] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPw, setRegPw] = useState('')
  const [regErrors, setRegErrors] = useState<Record<string, string>>({})

  const handleLogin = () => {
    const errs: Record<string, string> = {}
    if (!loginId.trim()) errs.id = 'REQUIRED'
    if (!loginPw.trim()) errs.pw = 'REQUIRED'
    setLoginErrors(errs)
  }

  const handleRegister = () => {
    const errs: Record<string, string> = {}
    if (!regUsername.trim()) errs.username = 'REQUIRED'
    if (!regEmail.trim()) errs.email = 'REQUIRED'
    else if (!regEmail.includes('@')) errs.email = 'INVALID FORMAT'
    if (!regPw.trim()) errs.pw = 'REQUIRED'
    else if (regPw.length < 8) errs.pw = 'MIN 8 CHARACTERS'
    if (!department) errs.department = 'SELECT DEPARTMENT'
    setRegErrors(errs)
    if (Object.keys(errs).length === 0) setRegistered(true)
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
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '480px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
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
            THE THRESHOLD
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text3)', letterSpacing: '3px' }}>
            M.E.G. PROMETHEUS LIBRARY — BACK-NET
          </div>
        </div>

        {/* Mode tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border)',
            marginBottom: '20px',
          }}
        >
          {(['login', 'register'] as AuthMode[]).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setRegistered(false) }}
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

        {/* LOGIN */}
        {mode === 'login' && (
          <>
            {!bootDone ? (
              <BootSequence onComplete={() => setBootDone(true)} />
            ) : (
              <div
                style={{
                  background: 'var(--bg2)',
                  border: '1px solid var(--border)',
                  padding: '16px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--amber2)', letterSpacing: '1px', fontFamily: 'var(--mono)' }}>
                  &gt; AUTHENTICATION REQUIRED.
                </div>
              </div>
            )}

            <div style={{ marginBottom: '14px' }}>
              <div
                style={{
                  fontSize: '9px',
                  color: loginErrors.id ? 'var(--red2)' : 'var(--text3)',
                  letterSpacing: '2px',
                  marginBottom: '6px',
                  display: 'flex',
                  gap: '6px',
                }}
              >
                OPERATIVE ID
                {loginErrors.id && <span style={{ color: 'var(--red2)' }}>— {loginErrors.id}</span>}
              </div>
              <input
                type="text"
                placeholder="MEG-EXP-0000"
                value={loginId}
                onChange={e => { setLoginId(e.target.value); setLoginErrors(p => { const n = {...p}; delete n.id; return n }) }}
                style={inputErr(!!loginErrors.id)}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  fontSize: '9px',
                  color: loginErrors.pw ? 'var(--red2)' : 'var(--text3)',
                  letterSpacing: '2px',
                  marginBottom: '6px',
                  display: 'flex',
                  gap: '6px',
                }}
              >
                PASSPHRASE
                {loginErrors.pw && <span style={{ color: 'var(--red2)' }}>— {loginErrors.pw}</span>}
              </div>
              <input
                type="password"
                placeholder="••••••••••••"
                value={loginPw}
                onChange={e => { setLoginPw(e.target.value); setLoginErrors(p => { const n = {...p}; delete n.pw; return n }) }}
                style={inputErr(!!loginErrors.pw)}
              />
            </div>

            <button
              onClick={handleLogin}
              style={{
                width: '100%',
                background: 'var(--amber-glow2)',
                border: '1px solid var(--amber)',
                color: 'var(--amber)',
                fontFamily: 'var(--mono)',
                fontSize: '12px',
                padding: '12px',
                cursor: 'pointer',
                letterSpacing: '3px',
                marginBottom: '14px',
              }}
            >
              AUTHENTICATE
            </button>

            <div style={{ textAlign: 'center', fontSize: '10px', color: 'var(--text3)', letterSpacing: '1px' }}>
              New operative?{' '}
              <button
                onClick={() => setMode('register')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--amber-dim)',
                  fontFamily: 'var(--mono)',
                  fontSize: '10px',
                  cursor: 'pointer',
                  padding: 0,
                  letterSpacing: '1px',
                  textDecoration: 'underline',
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
            <div
              style={{
                fontSize: '9px',
                color: 'var(--text3)',
                letterSpacing: '3px',
                marginBottom: '18px',
              }}
            >
              REQUEST OPERATIVE CLEARANCE
            </div>

            {registered ? (
              <div
                style={{
                  background: 'var(--bg2)',
                  border: '1px solid #1a4a28',
                  padding: '20px',
                }}
              >
                <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text)', lineHeight: 2 }}>
                  <div style={{ color: '#3aaa5a' }}>&gt; REGISTRATION RECEIVED.</div>
                  <div>&gt; PENDING CLEARANCE ASSIGNMENT.</div>
                  <div>&gt; ESTIMATED PROCESSING: 24–72 HOURS.</div>
                  <div style={{ color: 'var(--text3)', marginTop: '6px' }}>
                    &gt; You will be notified at the provided contact address when your clearance is assigned.
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '14px' }}>
                  <div
                    style={{
                      fontSize: '9px',
                      color: regErrors.username ? 'var(--red2)' : 'var(--text3)',
                      letterSpacing: '2px',
                      marginBottom: '6px',
                      display: 'flex',
                      gap: '6px',
                    }}
                  >
                    USERNAME
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
                  <div
                    style={{
                      fontSize: '9px',
                      color: regErrors.email ? 'var(--red2)' : 'var(--text3)',
                      letterSpacing: '2px',
                      marginBottom: '6px',
                      display: 'flex',
                      gap: '6px',
                    }}
                  >
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
                  <div
                    style={{
                      fontSize: '9px',
                      color: regErrors.pw ? 'var(--red2)' : 'var(--text3)',
                      letterSpacing: '2px',
                      marginBottom: '6px',
                      display: 'flex',
                      gap: '6px',
                    }}
                  >
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
                  <div
                    style={{
                      fontSize: '9px',
                      color: regErrors.department ? 'var(--red2)' : 'var(--text3)',
                      letterSpacing: '2px',
                      marginBottom: '10px',
                      display: 'flex',
                      gap: '6px',
                    }}
                  >
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
                          background:
                            department === dept.key
                              ? 'var(--amber-glow2)'
                              : dept.locked
                              ? 'var(--bg3)'
                              : 'var(--bg2)',
                          border: `1px solid ${
                            department === dept.key
                              ? 'var(--amber)'
                              : dept.locked
                              ? 'var(--border)'
                              : 'var(--border)'
                          }`,
                          padding: '10px',
                          cursor: dept.locked ? 'not-allowed' : 'pointer',
                          textAlign: 'left',
                          opacity: dept.locked ? 0.5 : 1,
                          gridColumn: dept.key === 'async' ? '1 / -1' : undefined,
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '3px',
                          }}
                        >
                          <div
                            style={{
                              fontFamily: 'var(--sans)',
                              fontSize: '12px',
                              fontWeight: 700,
                              color: department === dept.key ? 'var(--amber2)' : 'var(--white)',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                            }}
                          >
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
                  style={{
                    width: '100%',
                    background: 'var(--amber-glow2)',
                    border: '1px solid var(--amber)',
                    color: 'var(--amber)',
                    fontFamily: 'var(--mono)',
                    fontSize: '12px',
                    padding: '12px',
                    cursor: 'pointer',
                    letterSpacing: '3px',
                    marginBottom: '12px',
                  }}
                >
                  REQUEST CLEARANCE
                </button>

                <div style={{ textAlign: 'center', fontSize: '10px', color: 'var(--text3)', letterSpacing: '1px' }}>
                  Already registered?{' '}
                  <button
                    onClick={() => setMode('login')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--amber-dim)',
                      fontFamily: 'var(--mono)',
                      fontSize: '10px',
                      cursor: 'pointer',
                      padding: 0,
                      letterSpacing: '1px',
                      textDecoration: 'underline',
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
