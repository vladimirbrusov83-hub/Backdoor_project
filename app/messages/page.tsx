'use client'
import Shell from '@/components/Shell'
import { useState } from 'react'

import type { Message } from '@/lib/types'

const severityBar: Record<string, string> = {
  danger:  'var(--red2)',
  warning: 'var(--amber)',
  normal:  'var(--border)',
}

const severityLabel: Record<string, { bg: string; border: string; color: string }> = {
  danger:  { bg: 'rgba(139,32,32,0.2)', border: 'var(--red-border)', color: 'var(--red2)' },
  warning: { bg: 'rgba(200,151,42,0.12)', border: 'var(--amber-dim)', color: 'var(--amber)' },
  normal:  { bg: 'var(--bg3)', border: 'var(--border)', color: 'var(--text3)' },
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessagesExtended)
  const [selected, setSelected] = useState<Message | null>(messages[0] ?? null)

  const unreadCount = messages.filter(m => !m.read).length

  const handleSelect = (msg: Message) => {
    setSelected(msg)
    if (!msg.read) {
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m))
    }
  }

  const handleMarkAllRead = () => {
    setMessages(prev => prev.map(m => ({ ...m, read: true })))
  }

  const sev = selected?.severity ?? 'normal'
  const sc = severityLabel[sev] ?? severityLabel.normal

  return (
    <Shell activePath="/messages">
      
        <Sidebar activePath="/messages" />
        <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

          {/* Header */}
          <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
            <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '4px' }}>
              BACK-NET — OPERATIVE INBOX
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '20px', fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                MESSAGES{' '}
                {unreadCount > 0 && (
                  <span style={{ color: 'var(--amber)', fontSize: '16px' }}>— {unreadCount} UNREAD</span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  style={{
                    background: 'var(--bg2)', border: '1px solid var(--border)',
                    color: 'var(--text3)', fontFamily: 'var(--mono)', fontSize: '10px',
                    padding: '5px 12px', cursor: 'pointer', letterSpacing: '1px',
                  }}
                >
                  MARK ALL READ
                </button>
              )}
            </div>
          </div>

          {/* Split pane */}
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>

            {/* Message list */}
            <div style={{ width: '320px', borderRight: '1px solid var(--border)', overflowY: 'auto', flexShrink: 0 }}>
              {messages.map(msg => {
                const bar = severityBar[msg.severity ?? 'normal'] ?? 'var(--border)'
                const isSelected = selected?.id === msg.id
                return (
                  <div
                    key={msg.id}
                    onClick={() => handleSelect(msg)}
                    style={{
                      padding: '12px 14px',
                      borderBottom: '1px solid var(--border)',
                      borderLeft: `3px solid ${isSelected ? bar : 'transparent'}`,
                      background: isSelected ? 'var(--amber-glow)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={e => {
                      if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'var(--bg2)'
                    }}
                    onMouseLeave={e => {
                      if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'transparent'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                        {!msg.read && (
                          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--amber)', flexShrink: 0 }} />
                        )}
                        <span style={{ fontSize: '9px', color: 'var(--amber-dim)', letterSpacing: '0.5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {msg.from}
                        </span>
                      </div>
                      <span style={{ fontSize: '9px', color: 'var(--text3)', flexShrink: 0, marginLeft: '8px' }}>{msg.timestamp}</span>
                    </div>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: msg.read ? 400 : 700,
                      color: msg.read ? 'var(--text2)' : 'var(--white)',
                      letterSpacing: '0.3px',
                      marginBottom: '4px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      fontFamily: 'var(--sans)',
                    }}>
                      {msg.subject}
                    </div>
                    <div style={{
                      fontSize: '10px', color: 'var(--text3)', lineHeight: 1.5,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {msg.preview}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Message detail */}
            {selected ? (
              <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
                {/* Severity tag */}
                {selected.severity !== 'normal' && (
                  <div style={{
                    display: 'inline-block', fontSize: '8px', padding: '2px 8px',
                    letterSpacing: '1px', marginBottom: '16px',
                    background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color,
                  }}>
                    {selected.severity === 'danger' ? '▲ PRIORITY: HIGH' : '▶ PRIORITY: ELEVATED'}
                  </div>
                )}

                {/* Subject */}
                <div style={{ fontFamily: 'var(--sans)', fontSize: '20px', fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '14px', lineHeight: 1.3 }}>
                  {selected.subject}
                </div>

                {/* Meta */}
                <div style={{ display: 'flex', gap: '20px', fontSize: '10px', color: 'var(--text3)', paddingBottom: '16px', borderBottom: '1px solid var(--border)', marginBottom: '24px' }}>
                  <span>FROM: <span style={{ color: 'var(--amber)' }}>{selected.from}</span></span>
                  <span>TO: <span style={{ color: 'var(--amber-dim)' }}>MEG-EXP-4471</span></span>
                  <span style={{ marginLeft: 'auto' }}>{selected.timestamp}</span>
                </div>

                {/* Body */}
                <div style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 2, letterSpacing: '0.2px', fontFamily: 'var(--mono)' }}>
                  {selected.preview}
                </div>

                {/* Reply block */}
                <div style={{ marginTop: '40px', padding: '16px', background: 'var(--bg2)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '2px', marginBottom: '10px' }}>
                    COMPOSE REPLY
                  </div>
                  <textarea
                    placeholder="&gt; TYPE RESPONSE..."
                    rows={4}
                    style={{
                      width: '100%', background: 'transparent', border: 'none', outline: 'none',
                      resize: 'none', fontFamily: 'var(--mono)', fontSize: '12px',
                      color: 'var(--text)', letterSpacing: '0.5px', lineHeight: 1.8,
                      caretColor: 'var(--amber2)',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                    <button style={{
                      background: 'var(--amber-glow2)', border: '1px solid var(--amber)',
                      color: 'var(--amber)', fontFamily: 'var(--mono)', fontSize: '10px',
                      padding: '6px 18px', cursor: 'pointer', letterSpacing: '1px',
                    }}>
                      SEND ›
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '11px', color: 'var(--text3)', letterSpacing: '2px' }}>
                  SELECT A MESSAGE TO READ
                </div>
              </div>
            )}
          </div>
        </main>
          </Shell>
  )
}
