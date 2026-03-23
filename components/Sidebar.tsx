'use client'
import {
  mockAlertsExtended,
  mockMessagesExtended,
  mockReviewItems,
} from '@/lib/mock-data'

interface NavItem {
  label: string
  href: string
  badge?: number
  danger?: boolean
  locked?: boolean
}

const unreadAlerts  = mockAlertsExtended.filter(a => a.severity === 'critical' || a.severity === 'warning').length
const unreadMessages = mockMessagesExtended.filter(m => !m.read).length
const pendingReview  = mockReviewItems.length

const mainNav: NavItem[] = [
  { label: 'Terminal', href: '/' },
  { label: 'Database', href: '/database' },
  { label: 'Levels', href: '/levels' },
  { label: 'Entities', href: '/entities' },
  { label: 'Objects', href: '/objects' },
  { label: 'Phenomena', href: '/phenomena' },
  { label: 'Groups', href: '/groups' },
]

const divisionNav: NavItem[] = [
  { label: 'M.E.G. Reports', href: '/reports' },
  { label: 'Tales', href: '/tales' },
  { label: 'Async Division', href: '/async', locked: true },
]

const opsNav: NavItem[] = [
  { label: 'Submit Report', href: '/submit' },
  { label: 'Review Queue', href: '/review', badge: pendingReview },
  { label: 'Alerts', href: '/alerts', badge: unreadAlerts, danger: true },
  { label: 'Messages', href: '/messages', badge: unreadMessages > 0 ? unreadMessages : undefined },
  { label: 'My Dossier', href: '/dossier' },
]

function NavSection({ label, items, active, onClose }: {
  label: string
  items: NavItem[]
  active: string
  onClose?: () => void
}) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{
        fontSize: '9px',
        letterSpacing: '3px',
        color: 'var(--text3)',
        padding: '0 16px 8px',
        textTransform: 'uppercase',
      }}>
        {label}
      </div>
      {items.map(item => (
        <a
          key={item.href}
          href={item.href}
          onClick={() => !item.locked && onClose?.()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '7px 16px',
            fontSize: '12px',
            color: item.locked
              ? 'var(--text3)'
              : active === item.href
                ? 'var(--amber2)'
                : 'var(--text2)',
            textDecoration: 'none',
            borderLeft: `2px solid ${
              active === item.href ? 'var(--amber2)' : 'transparent'
            }`,
            background: active === item.href
              ? 'var(--amber-glow)'
              : 'transparent',
            transition: 'all 0.1s',
            opacity: item.locked ? 0.5 : 1,
          }}
          onMouseEnter={e => {
            if (item.locked) return
            const el = e.currentTarget as HTMLElement
            el.style.background = 'var(--amber-glow)'
            el.style.color = 'var(--amber)'
            el.style.borderLeftColor = 'var(--amber-dim)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            if (active === item.href) return
            el.style.background = 'transparent'
            el.style.color = item.locked ? 'var(--text3)' : 'var(--text2)'
            el.style.borderLeftColor = 'transparent'
          }}
        >
          <span style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'currentColor',
            flexShrink: 0,
          }} />
          <span style={{ flex: 1 }}>{item.label}</span>
          {item.badge !== undefined && (
            <span style={{
              fontSize: '9px',
              background: item.danger ? 'var(--red)' : 'rgba(200,151,42,0.15)',
              color: item.danger ? '#ffaaaa' : 'var(--amber)',
              padding: '1px 5px',
              minWidth: '18px',
              textAlign: 'center',
            }}>
              {item.badge}
            </span>
          )}
          {item.locked && (
            <span style={{ fontSize: '9px', color: 'var(--text3)' }}>🔒</span>
          )}
        </a>
      ))}
    </div>
  )
}

export default function Sidebar({
  activePath = '/',
  isOpen = false,
  onClose,
}: {
  activePath?: string
  isOpen?: boolean
  onClose?: () => void
}) {
  return (
    <nav className={`sidebar-nav${isOpen ? ' open' : ''}`}>
      <NavSection label="Navigation" items={mainNav} active={activePath} onClose={onClose} />
      <NavSection label="Divisions"  items={divisionNav} active={activePath} onClose={onClose} />
      <NavSection label="Operations" items={opsNav} active={activePath} onClose={onClose} />

      {/* Version footer */}
      <div style={{
        padding: '16px',
        marginTop: 'auto',
        fontSize: '9px',
        color: 'var(--text3)',
        letterSpacing: '1px',
        borderTop: '1px solid var(--border)',
      }}>
        <div>THE THRESHOLD</div>
        <div style={{ marginTop: '2px' }}>M.E.G. PROMETHEUS LIBRARY</div>
        <div style={{ marginTop: '2px', color: 'var(--amber-dim)' }}>BUILD 0.1.0-alpha</div>
      </div>
    </nav>
  )
}
