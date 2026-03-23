import Shell from '@/components/Shell'
import TerminalContent from '@/components/TerminalContent'
import {
  mockStats,
  mockAlerts,
  mockLevels,
  mockEntities,
} from '@/lib/mock-data'

export default function HomePage() {
  return (
    <Shell activePath="/">
      <TerminalContent
        alerts={mockAlerts}
        stats={mockStats}
        levels={mockLevels}
        entities={mockEntities}
      />
    </Shell>
  )
}
