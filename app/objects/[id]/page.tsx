'use client'
import { useParams } from 'next/navigation'
import TopBar from '@/components/TopBar'
import Sidebar from '@/components/Sidebar'
import RightPanel from '@/components/RightPanel'
import {
  mockObjects,
  mockCurrentOperative,
  mockMessages,
  mockActivity,
} from '@/lib/mock-data'

const rarityColor: Record<string, string> = {
  common:   'var(--text2)',
  uncommon: 'var(--amber)',
  rare:     'var(--amber2)',
  unique:   'var(--amber3)',
}
const dangerColor: Record<string, string> = {
  none:     '#3aaa5a',
  low:      'var(--text2)',
  moderate: 'var(--amber)',
  high:     'var(--red2)',
  extreme:  'var(--red2)',
}

const locationsByRarity: Record<string, string[]> = {
  common:   ['Level 0 vending machines', 'Level 1 supply caches', 'Various colonized levels'],
  uncommon: ['M.E.G. supply depots', 'B.N.T.G. trade points', 'Level 4 markets'],
  rare:     ['Deep levels — 50+', 'Anomaly sites', 'Entity lairs (recovered)'],
  unique:   ['Single confirmed location — see description'],
}

const usageByDanger: Record<string, string> = {
  none:     'Safe to handle without precautions.',
  low:      'Handle with care. Mild risk in extended contact.',
  moderate: 'Protective equipment required. Consult Research Division before use.',
  high:     'Restricted handling. Defense Division authorization required.',
  extreme:  'DO NOT HANDLE. Containment only. Impresario clearance required.',
}

export default function ObjectDetailPage() {
  const params = useParams()
  const id = params.id as string
  const obj = mockObjects.find(o => o.id === id)

  if (!obj) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <TopBar operative={mockCurrentOperative} />
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <Sidebar activePath="/objects" />
          <main style={{ flex: 1, overflowY: 'auto', padding: '40px 20px' }}>
            <div style={{ color: 'var(--red2)', fontFamily: 'var(--mono)', fontSize: '12px', letterSpacing: '2px' }}>
              &gt; OBJECT NOT FOUND — ID: {id}
            </div>
          </main>
          <RightPanel operative={mockCurrentOperative} messages={mockMessages} activity={mockActivity} />
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <TopBar operative={mockCurrentOperative} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar activePath="/objects" />
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          <div style={{ fontSize: '10px', color: 'var(--text3)', letterSpacing: '1px', marginBottom: '14px' }}>
            <a href="/objects" style={{ color: 'var(--amber-dim)', textDecoration: 'none' }}>OBJECTS</a>
            <span style={{ margin: '0 6px' }}>›</span>
            <span>{obj.name.toUpperCase()}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '16px', alignItems: 'start' }}>
            <div>
              {/* Header */}
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '18px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '6px' }}>OBJECT REGISTRY</div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '26px', fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                      {obj.name}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                    <span style={{
                      fontSize: '9px', padding: '3px 8px', letterSpacing: '1px',
                      border: `1px solid ${rarityColor[obj.rarity]}`,
                      color: rarityColor[obj.rarity], background: 'var(--bg3)',
                    }}>
                      {obj.rarity.toUpperCase()}
                    </span>
                    <span style={{
                      fontSize: '9px', padding: '3px 8px', letterSpacing: '1px',
                      border: `1px solid ${dangerColor[obj.danger_level]}`,
                      color: dangerColor[obj.danger_level], background: 'var(--bg3)',
                    }}>
                      DANGER: {obj.danger_level.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '18px', marginBottom: '14px' }}>
                <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '12px' }}>DESCRIPTION</div>
                <div style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 1.9, marginBottom: '20px' }}>
                  {obj.description}
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '10px' }}>KNOWN LOCATIONS</div>
                  {(locationsByRarity[obj.rarity] ?? []).map((loc, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', padding: '6px 0', fontSize: '11px', color: 'var(--text2)', borderBottom: '1px solid var(--border)', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--amber)', flexShrink: 0 }}>›</span>
                      {loc}
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '10px' }}>HANDLING PROTOCOL</div>
                  <div style={{
                    padding: '12px',
                    background: obj.danger_level === 'none' ? 'rgba(26,92,42,0.1)' : obj.danger_level === 'moderate' ? 'rgba(200,151,42,0.08)' : 'var(--red-bg)',
                    border: `1px solid ${obj.danger_level === 'none' ? '#1a4a28' : obj.danger_level === 'moderate' ? 'var(--amber-dim)' : 'var(--red-border)'}`,
                    fontSize: '11px',
                    color: dangerColor[obj.danger_level],
                    lineHeight: 1.7,
                  }}>
                    {usageByDanger[obj.danger_level]}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ position: 'sticky', top: 0 }}>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '14px', marginBottom: '12px' }}>
                <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '12px' }}>OBJECT STATISTICS</div>
                {[
                  ['Name', obj.name],
                  ['Rarity', obj.rarity.toUpperCase()],
                  ['Danger Level', obj.danger_level.toUpperCase()],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: '10px' }}>
                    <span style={{ color: 'var(--text3)' }}>{label}</span>
                    <span style={{ color: 'var(--amber)' }}>{val}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '14px' }}>
                <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '12px' }}>OTHER OBJECTS</div>
                {mockObjects.filter(o => o.id !== id).map((o, i, arr) => (
                  <a key={o.id} href={`/objects/${o.id}`} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '7px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                    textDecoration: 'none',
                  }}>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: 600, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {o.name}
                    </div>
                    <span style={{ fontSize: '8px', color: rarityColor[o.rarity], letterSpacing: '1px' }}>
                      {o.rarity.toUpperCase()}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </main>
        <RightPanel operative={mockCurrentOperative} messages={mockMessages} activity={mockActivity} />
      </div>
    </div>
  )
}
