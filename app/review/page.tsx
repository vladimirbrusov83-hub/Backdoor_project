'use client'
import { useState } from 'react'
import TopBar from '@/components/TopBar'
import Sidebar from '@/components/Sidebar'
import RightPanel from '@/components/RightPanel'
import {
  mockReviewItems,
  mockCurrentOperative,
  mockMessagesExtended,
  mockActivity,
} from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'
import type { ReviewItem } from '@/lib/types'

type Action = 'approve' | 'flag' | 'return'
type ItemState = { action: Action; note: string } | null

const typeLabel: Record<string, string> = {
  level: 'LVL', entity: 'ENT', object: 'OBJ',
  phenomenon: 'PHN', group: 'GRP', tale: 'TALE',
}
const typeColor: Record<string, string> = {
  level: 'var(--amber)', entity: 'var(--red2)', object: 'var(--amber2)',
  phenomenon: 'var(--amber)', group: 'var(--text2)', tale: 'var(--text2)',
}

const actionConfig: Record<Action, { label: string; color: string; bg: string; border: string }> = {
  approve: { label: 'APPROVED',  color: '#3aaa5a', bg: 'rgba(26,92,42,0.15)',   border: '#1a4a28' },
  flag:    { label: 'FLAGGED',   color: 'var(--red2)',  bg: 'rgba(139,32,32,0.15)', border: 'var(--red-border)' },
  return:  { label: 'RETURNED',  color: 'var(--amber)', bg: 'rgba(200,151,42,0.1)', border: 'var(--amber-dim)' },
}

export default function ReviewPage() {
  const [itemStates, setItemStates] = useState<Record<string, ItemState>>({})
  const [activeNote, setActiveNote] = useState<string | null>(null)
  const [noteText, setNoteText] = useState<Record<string, string>>({})

  const pending = mockReviewItems.filter(r => !itemStates[r.id])
  const processed = mockReviewItems.filter(r => !!itemStates[r.id])

  const handleAction = (id: string, action: Action) => {
    setItemStates(prev => ({ ...prev, [id]: { action, note: noteText[id] ?? '' } }))
    setActiveNote(null)
  }

  const handleUndo = (id: string) => {
    setItemStates(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  const ReviewCard = ({ item }: { item: ReviewItem }) => {
    const state = itemStates[item.id]
    const isNoting = activeNote === item.id
    const ac = state ? actionConfig[state.action] : null
    const canApprove = mockCurrentOperative.clearance >= item.requires_clearance

    return (
      <div style={{
        background: ac ? ac.bg : 'var(--bg2)',
        border: `1px solid ${ac ? ac.border : 'var(--border)'}`,
        padding: '14px 16px',
        opacity: state ? 0.75 : 1,
        transition: 'all 0.2s',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
          {/* Type badge */}
          <span style={{
            fontSize: '8px', padding: '2px 6px', letterSpacing: '1px', flexShrink: 0, marginTop: '2px',
            background: 'var(--bg3)', border: '1px solid var(--border2)',
            color: typeColor[item.doc_type] ?? 'var(--text2)',
          }}>
            {typeLabel[item.doc_type] ?? item.doc_type.toUpperCase()}
          </span>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '13px', fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '3px' }}>
              {item.title}
            </div>
            <div style={{ display: 'flex', gap: '14px', fontSize: '9px', color: 'var(--text3)' }}>
              <span style={{ color: 'var(--amber-dim)' }}>{item.author_operative_id}</span>
              <span>CLEARANCE {item.author_clearance}</span>
              <span>{item.word_count.toLocaleString()} WORDS</span>
              <span>{timeAgo(item.submitted_at)}</span>
            </div>
          </div>

          {/* Clearance requirement */}
          <div style={{ flexShrink: 0, textAlign: 'right' }}>
            <div style={{ fontSize: '8px', letterSpacing: '1px', color: canApprove ? '#3aaa5a' : 'var(--red2)', padding: '2px 7px', border: `1px solid ${canApprove ? '#1a4a28' : 'var(--red-border)'}`, background: canApprove ? 'rgba(26,92,42,0.1)' : 'rgba(139,32,32,0.1)' }}>
              REQ CLR {item.requires_clearance}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div style={{ fontSize: '11px', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '10px', paddingLeft: '48px' }}>
          {item.summary}
        </div>

        {/* Processed state */}
        {state && (
          <div style={{ paddingLeft: '48px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '10px', color: ac!.color, letterSpacing: '1.5px', fontWeight: 700 }}>
              ✓ {ac!.label}
            </span>
            {state.note && (
              <span style={{ fontSize: '10px', color: 'var(--text3)', fontStyle: 'italic' }}>
                "{state.note}"
              </span>
            )}
            <button
              onClick={() => handleUndo(item.id)}
              style={{ background: 'none', border: 'none', color: 'var(--text3)', fontFamily: 'var(--mono)', fontSize: '9px', cursor: 'pointer', marginLeft: 'auto', padding: 0, letterSpacing: '1px' }}
            >
              UNDO
            </button>
          </div>
        )}

        {/* Action row */}
        {!state && (
          <div style={{ paddingLeft: '48px' }}>
            {isNoting && (
              <div style={{ marginBottom: '8px', display: 'flex', gap: '6px' }}>
                <input
                  type="text"
                  placeholder="REVIEWER NOTE (OPTIONAL)..."
                  value={noteText[item.id] ?? ''}
                  onChange={e => setNoteText(prev => ({ ...prev, [item.id]: e.target.value }))}
                  autoFocus
                  style={{
                    flex: 1, background: 'var(--bg3)', border: '1px solid var(--border2)',
                    color: 'var(--text)', fontFamily: 'var(--mono)', fontSize: '11px',
                    padding: '5px 10px', outline: 'none', letterSpacing: '0.5px',
                    caretColor: 'var(--amber2)',
                  }}
                />
              </div>
            )}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button
                onClick={() => handleAction(item.id, 'approve')}
                disabled={!canApprove}
                style={{
                  background: canApprove ? 'rgba(26,92,42,0.2)' : 'var(--bg3)',
                  border: `1px solid ${canApprove ? '#1a5c2a' : 'var(--border)'}`,
                  color: canApprove ? '#3aaa5a' : 'var(--text3)',
                  fontFamily: 'var(--mono)', fontSize: '9px', padding: '4px 12px',
                  cursor: canApprove ? 'pointer' : 'not-allowed', letterSpacing: '1px',
                }}
              >
                ✓ APPROVE
              </button>
              <button
                onClick={() => handleAction(item.id, 'flag')}
                style={{
                  background: 'rgba(139,32,32,0.1)', border: '1px solid var(--red-border)',
                  color: 'var(--red2)', fontFamily: 'var(--mono)', fontSize: '9px',
                  padding: '4px 12px', cursor: 'pointer', letterSpacing: '1px',
                }}
              >
                ▲ FLAG
              </button>
              <button
                onClick={() => handleAction(item.id, 'return')}
                style={{
                  background: 'rgba(200,151,42,0.08)', border: '1px solid var(--amber-dim)',
                  color: 'var(--amber)', fontFamily: 'var(--mono)', fontSize: '9px',
                  padding: '4px 12px', cursor: 'pointer', letterSpacing: '1px',
                }}
              >
                ↩ RETURN
              </button>
              <button
                onClick={() => setActiveNote(isNoting ? null : item.id)}
                style={{
                  background: 'none', border: '1px solid var(--border)',
                  color: isNoting ? 'var(--amber)' : 'var(--text3)',
                  fontFamily: 'var(--mono)', fontSize: '9px',
                  padding: '4px 10px', cursor: 'pointer', letterSpacing: '1px',
                  marginLeft: 'auto',
                }}
              >
                + NOTE
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <TopBar operative={mockCurrentOperative} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar activePath="/review" />
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>

          {/* Header */}
          <div style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '14px' }}>
            <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '5px' }}>
              M.E.G. PROMETHEUS LIBRARY — REVIEW QUEUE
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '22px', fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                REVIEW QUEUE —{' '}
                <span style={{ color: pending.length > 0 ? 'var(--amber2)' : '#3aaa5a' }}>
                  {pending.length}
                </span>{' '}
                PENDING
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text3)', letterSpacing: '1px' }}>
                YOUR CLEARANCE:{' '}
                <span style={{ color: 'var(--amber)' }}>LEVEL {mockCurrentOperative.clearance}</span>
              </div>
            </div>
          </div>

          {/* Clearance notice */}
          <div style={{ background: 'rgba(200,151,42,0.06)', border: '1px solid var(--amber-dim)', padding: '8px 14px', marginBottom: '16px', fontSize: '10px', color: 'var(--text3)', letterSpacing: '0.5px' }}>
            ▶ You may only approve documents requiring Clearance Level {mockCurrentOperative.clearance} or below. Higher-clearance items can be flagged or returned.
          </div>

          {/* Pending queue */}
          {pending.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', border: '1px solid var(--border)', background: 'var(--bg2)', marginBottom: '16px' }}>
              <div style={{ fontFamily: 'var(--display)', fontSize: '32px', color: '#3aaa5a', marginBottom: '8px' }}>✓</div>
              <div style={{ fontSize: '12px', color: 'var(--text3)', letterSpacing: '2px' }}>QUEUE CLEARED</div>
              <div style={{ fontSize: '10px', color: 'var(--text3)', marginTop: '6px' }}>ALL ITEMS PROCESSED THIS SESSION</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {pending.map(item => <ReviewCard key={item.id} item={item} />)}
            </div>
          )}

          {/* Processed */}
          {processed.length > 0 && (
            <>
              <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '10px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                PROCESSED THIS SESSION — {processed.length}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {processed.map(item => <ReviewCard key={item.id} item={item} />)}
              </div>
            </>
          )}
        </main>
        <RightPanel operative={mockCurrentOperative} messages={mockMessagesExtended} activity={mockActivity} />
      </div>
    </div>
  )
}
