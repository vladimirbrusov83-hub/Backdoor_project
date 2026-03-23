'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Operative } from '@/lib/types'
import { clearanceLabel } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

interface Props {
  operative: Operative
}

export default function TopBar({ operative }: Props) {
  const router = useRouter()
  const [time, setTime] = useState('')

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth')
    router.refresh()
  }

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toTimeString().slice(0, 8))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header style={{
      background: 'var(--bg2)',
      borderBottom: '1px solid var(--border)',
      padding: '0 20px',
      height: '42px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
      position: 'relative',
      zIndex: 10,
    }}>
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{
          fontFamily: 'var(--display)',
          fontSize: '22px',
          color: 'var(--amber2)',
          letterSpacing: '3px',
          lineHeight: 1,
        }}>
          BACK-NET
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            color: 'var(--text2)',
            letterSpacing: '1px',
            marginLeft: '10px',
          }}>
            TERMINAL v4.1
          </span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '10px',
          color: 'var(--text3)',
        }}>
          <span className="pulse-dot" />
          <span>BASE ALPHA RELAY — 73%</span>
        </div>
      </div>

      {/* Right */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        fontSize: '11px',
        color: 'var(--text2)',
      }}>
        <span style={{ color: 'var(--text3)' }}>
          {operative.operative_id}
        </span>

        <span style={{
          background: 'rgba(200,151,42,0.08)',
          border: '1px solid var(--amber-dim)',
          color: 'var(--amber)',
          fontSize: '10px',
          padding: '3px 8px',
          letterSpacing: '1px',
        }}>
          CLEARANCE {operative.clearance} — {clearanceLabel(operative.clearance)}
        </span>

        <span style={{
          fontFamily: 'var(--mono)',
          color: 'var(--text3)',
          fontSize: '11px',
          minWidth: '60px',
        }}>
          {time}
        </span>

        <button
          onClick={handleLogout}
          style={{
            background: 'transparent',
            border: '1px solid var(--border2)',
            color: 'var(--text3)',
            fontFamily: 'var(--mono)',
            fontSize: '10px',
            padding: '3px 10px',
            cursor: 'pointer',
            letterSpacing: '1px',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'var(--red-border)'
            el.style.color = 'var(--red2)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'var(--border2)'
            el.style.color = 'var(--text3)'
          }}
        >
          DISCONNECT
        </button>
      </div>
    </header>
  )
}
