import type { SurvivalClass, ThreatLevel, Department, ClearanceLevel } from './types'

export function survivalLabel(cls: SurvivalClass): string {
  const map: Record<SurvivalClass, string> = {
    0: 'CLASS 0 — SAFE',
    1: 'CLASS 1 — MINIMAL',
    2: 'CLASS 2 — UNSAFE',
    3: 'CLASS 3 — DANGEROUS',
    4: 'CLASS 4 — HOSTILE',
    5: 'CLASS 5 — EXTREME',
  }
  return map[cls]
}

export function survivalColor(cls: SurvivalClass): string {
  if (cls <= 1) return 'tag-safe'
  if (cls === 2) return 'tag-warning'
  return 'tag-unsafe'
}

export function threatColor(lvl: ThreatLevel): string {
  if (lvl <= 2) return 'on'
  if (lvl <= 3) return 'on'
  return 'on danger'
}

export function departmentLabel(dept: Department): string {
  const map: Record<Department, string> = {
    exploration:   'EXPLORATION DIV.',
    research:      'RESEARCH DIV.',
    colonization:  'COLONIZATION DIV.',
    defense:       'DEFENSE DIV.',
    async:         'ASYNC DIVISION',
  }
  return map[dept]
}

export function departmentCode(dept: Department): string {
  const map: Record<Department, string> = {
    exploration:   'EXP',
    research:      'RSR',
    colonization:  'CLN',
    defense:       'DEF',
    async:         'INT',
  }
  return map[dept]
}

export function clearanceLabel(lvl: ClearanceLevel): string {
  const map: Record<ClearanceLevel, string> = {
    0: 'WANDERER',
    1: 'RECRUIT',
    2: 'FIELD AGENT',
    3: 'RESEARCHER',
    4: 'SENIOR AGENT',
    5: 'IMPRESARIO',
  }
  return map[lvl]
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins  <  1)  return 'just now'
  if (mins  < 60)  return `${mins}m ago`
  if (hours < 24)  return `${hours}h ago`
  return `${days}d ago`
}

export function entityCountLabel(count: string): string {
  const map: Record<string, string> = {
    none:    'NONE',
    low:     'LOW',
    moderate:'MODERATE',
    high:    'HIGH',
    extreme: 'EXTREME',
    unknown: 'UNKNOWN',
  }
  return map[count] ?? count.toUpperCase()
}

export function initials(name: string): string {
  return name
    .split(' ')
    .map(p => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
