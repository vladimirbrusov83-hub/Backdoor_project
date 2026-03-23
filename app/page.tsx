import TopBar from '@/components/TopBar'
import Sidebar from '@/components/Sidebar'
import RightPanel from '@/components/RightPanel'
import TerminalContent from '@/components/TerminalContent'
import {
  mockStats,
  mockAlerts,
  mockLevels,
  mockEntities,
  mockActivity,
  mockMessages,
  mockCurrentOperative,
} from '@/lib/mock-data'

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <TopBar operative={mockCurrentOperative} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar activePath="/" />
        <TerminalContent
          alerts={mockAlerts}
          stats={mockStats}
          levels={mockLevels}
          entities={mockEntities}
        />
        <RightPanel
          operative={mockCurrentOperative}
          messages={mockMessages}
          activity={mockActivity}
        />
      </div>
    </div>
  )
}
