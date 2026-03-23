'use client'
import { useState } from 'react'
import TopBar from '@/components/TopBar'
import Sidebar from '@/components/Sidebar'
import RightPanel from '@/components/RightPanel'
import {
  mockCurrentOperative,
  mockMessagesExtended,
  mockActivity,
} from '@/lib/mock-data'

interface Props {
  activePath?: string
  children: React.ReactNode
}

export default function Shell({ activePath = '/', children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-shell">
      <TopBar
        operative={mockCurrentOperative}
        onMenuToggle={() => setSidebarOpen(o => !o)}
      />
      <div className="app-body">
        {/* Mobile sidebar backdrop */}
        <div
          className={`sidebar-backdrop${sidebarOpen ? ' open' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />
        <Sidebar
          activePath={activePath}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="main-content">
          {children}
        </main>
        <div className="right-panel">
          <RightPanel
            operative={mockCurrentOperative}
            messages={mockMessagesExtended}
            activity={mockActivity}
          />
        </div>
      </div>
    </div>
  )
}
