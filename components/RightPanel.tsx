'use client'
import type { Operative, Message, ActivityItem } from '@/lib/types'
import { clearanceLabel, departmentLabel, initials } from '@/lib/utils'

interface Props {
  operative: Operative
  messages: Message[]
  activity: ActivityItem[]
}

function ThreatPips({ level, max = 5 }: { level: number; max?: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px', marginTop: '4px' }}>
      {Array.from({ length: max }).map((_, i) => (
        <div key={i} style={{
          height: '3px',
          flex: 1,
          background: i < level
            ? level >= 4 ? 'var(--red2)' : 'var(--amber)'
            : 'var(--border)',
        }} />
      ))}
    </div>
  )
}

export default function RightPanel({ operative, messages, activity }: Props) {
  const unread = messages.filter(m => !m.read).length

  return (
    <aside style={{
      background: 'var(--panel)',
      borderLeft: '1px solid var(--border)',
      width: '260px',
      flexShrink: 0,
      overflowY: 'auto',
    }}>

      {/* Operative Dossier */}
      <section style={{
        padding: '14px 16px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          fontSize: '9px',
          letterSpacing: '3px',
          color: 'var(--text3)',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}>
          Operative Dossier
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            background: 'rgba(200,151,42,0.08)',
            border: '1px solid var(--amber-dim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--sans)',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--amber)',
            flexShrink: 0,
            letterSpacing: '1px',
          }}>
            {initials(operative.username)}
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--sans)',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--white)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              {operative.username}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text2)', marginTop: '1px' }}>
              {operative.operative_id}
            </div>
          </div>
        </div>

        {/* Clearance bar */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{
              height: '4px',
              flex: 1,
              background: i < operative.clearance ? 'var(--amber2)' : 'var(--border)',
            }} />
          ))}
        </div>
        <div style={{
          fontSize: '9px',
          color: 'var(--text3)',
          letterSpacing: '1px',
          marginBottom: '10px',
        }}>
          CLEARANCE {operative.clearance} — {clearanceLabel(operative.clearance)}
        </div>

        {/* Stats */}
        {[
          ['Department', departmentLabel(operative.department)],
          ['Reports Filed', String(operative.reports_filed)],
          ['Verified', String(operative.reports_verified)],
        ].map(([label, val]) => (
          <div key={label} style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '10px',
            color: 'var(--text2)',
            padding: '3px 0',
          }}>
            <span>{label}</span>
            <span style={{ color: 'var(--amber)' }}>{val}</span>
          </div>
        ))}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
          <a href="/submit" style={{
            flex: 1,
            background: 'var(--amber-glow)',
            border: '1px solid var(--amber-dim)',
            color: 'var(--amber)',
            fontFamily: 'var(--mono)',
            fontSize: '10px',
            padding: '7px 8px',
            textAlign: 'center',
            cursor: 'pointer',
            letterSpacing: '1px',
            textDecoration: 'none',
            display: 'block',
          }}>
            SUBMIT REPORT
          </a>
          <a href="/dossier" style={{
            flex: 1,
            background: 'var(--bg2)',
            border: '1px solid var(--border2)',
            color: 'var(--text2)',
            fontFamily: 'var(--mono)',
            fontSize: '10px',
            padding: '7px 8px',
            textAlign: 'center',
            cursor: 'pointer',
            letterSpacing: '1px',
            textDecoration: 'none',
            display: 'block',
          }}>
            DOSSIER
          </a>
        </div>
      </section>

      {/* Messages */}
      <section style={{
        padding: '14px 16px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          fontSize: '9px',
          letterSpacing: '3px',
          color: 'var(--text3)',
          textTransform: 'uppercase',
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span>BACK-NET Messages</span>
          {unread > 0 && (
            <span style={{
              background: 'var(--red)',
              color: '#ffaaaa',
              fontSize: '9px',
              padding: '1px 5px',
            }}>
              {unread}
            </span>
          )}
        </div>

        {messages.map(msg => (
          <div key={msg.id} style={{
            background: 'var(--bg3)',
            border: `1px solid ${msg.severity === 'danger' ? 'var(--red-border)' : 'var(--border)'}`,
            padding: '8px 10px',
            marginBottom: '6px',
            cursor: 'pointer',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '3px',
            }}>
              <div style={{
                fontSize: '11px',
                color: msg.severity === 'danger' ? '#c07070' : msg.read ? 'var(--text2)' : 'var(--white)',
                lineHeight: 1.3,
                flex: 1,
              }}>
                {msg.subject}
              </div>
              <div style={{
                fontSize: '9px',
                color: 'var(--text3)',
                flexShrink: 0,
                marginLeft: '6px',
              }}>
                {msg.timestamp}
              </div>
            </div>
            <div style={{
              fontSize: '9px',
              color: msg.severity === 'danger' ? 'var(--red2)' : 'var(--amber-dim)',
              letterSpacing: '1px',
            }}>
              {msg.from}
            </div>
          </div>
        ))}
      </section>

      {/* Activity Feed */}
      <section style={{ padding: '14px 16px' }}>
        <div style={{
          fontSize: '9px',
          letterSpacing: '3px',
          color: 'var(--text3)',
          textTransform: 'uppercase',
          marginBottom: '10px',
        }}>
          Live Activity
        </div>

        {activity.map((item, i) => (
          <div key={item.id} style={{
            display: 'flex',
            gap: '8px',
            padding: '6px 0',
            borderBottom: i < activity.length - 1 ? '1px solid var(--border)' : 'none',
            fontSize: '10px',
            color: 'var(--text2)',
            lineHeight: 1.4,
          }}>
            <div style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: 'var(--amber-dim)',
              flexShrink: 0,
              marginTop: '3px',
            }} />
            <div>
              <span style={{ color: 'var(--amber)' }}>{item.operative_id}</span>
              {' '}{item.action}{' '}
              <span style={{ color: 'var(--text)' }}>{item.target}</span>
            </div>
          </div>
        ))}
      </section>
    </aside>
  )
}
