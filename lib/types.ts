export type ClearanceLevel = 0 | 1 | 2 | 3 | 4 | 5

export type Department =
  | 'exploration'
  | 'research'
  | 'colonization'
  | 'defense'
  | 'async'

export type DocType =
  | 'level'
  | 'entity'
  | 'object'
  | 'phenomenon'
  | 'group'
  | 'tale'
  | 'async'

export type DocStatus =
  | 'pending'
  | 'verified'
  | 'flagged'
  | 'restricted'

export type SurvivalClass = 0 | 1 | 2 | 3 | 4 | 5

export type ThreatLevel = 1 | 2 | 3 | 4 | 5

export interface Operative {
  id: string
  operative_id: string
  username: string
  department: Department
  clearance: ClearanceLevel
  reports_filed: number
  reports_verified: number
  joined_at: string
  bio?: string
}

export interface LevelDoc {
  id: string
  type: 'level'
  designation: number | string
  title: string
  nickname?: string
  survival_class: SurvivalClass
  entity_count: 'none' | 'low' | 'moderate' | 'high' | 'extreme' | 'unknown'
  description: string
  status: DocStatus
  author_id: string
  author_operative_id: string
  created_at: string
  updated_at: string
  verified_count: number
  canon_layer: 'meg' | 'async' | 'both'
}

export interface EntityDoc {
  id: string
  type: 'entity'
  entity_number: string
  name: string
  threat_level: ThreatLevel
  habitat: string
  description: string
  status: DocStatus
  author_id: string
  author_operative_id: string
  created_at: string
  updated_at: string
  verified_count: number
  canon_layer: 'meg' | 'async' | 'both'
}

export interface Alert {
  id: string
  severity: 'info' | 'warning' | 'critical'
  message: string
  location?: string
  timestamp: string
}

export interface ActivityItem {
  id: string
  operative_id: string
  action: string
  target: string
  target_type: DocType
  timestamp: string
}

export interface Message {
  id: string
  from: string
  subject: string
  preview: string
  timestamp: string
  read: boolean
  severity?: 'normal' | 'warning' | 'danger'
}

export interface StatsData {
  levels_logged: number
  entities_filed: number
  active_operatives: number
  async_files: number | null
}

export interface Annotation {
  id: string
  operative_id: string
  text: string
  timestamp: string
}

export interface EncounterReport {
  id: string
  operative_id: string
  date: string
  location: string
  text: string
}

export interface BackroomsObject {
  id: string
  name: string
  description: string
  rarity: 'common' | 'uncommon' | 'rare' | 'unique'
  danger_level: 'none' | 'low' | 'moderate' | 'high' | 'extreme'
}

export interface Phenomenon {
  id: string
  name: string
  description: string
  status: 'documented' | 'under_study' | 'unverified'
}

export interface LevelDetail {
  entrances: string[]
  exits: string[]
  outposts: { name: string; status: 'active' | 'inactive' | 'unknown'; description: string }[]
  survival_tips: string[]
  supplies: string[]
}

export interface EntityDetail {
  physical_description: string
  behavior: string
  survival_guide: string[]
}

export interface GroupDoc {
  id: string
  name: string
  full_name: string
  code: string
  description: string
  alignment: 'meg' | 'independent' | 'hostile' | 'unknown'
  status: 'active' | 'inactive' | 'unknown'
  member_count: string
  headquarters?: string
  founded?: string
  goals: string[]
  author_operative_id: string
  created_at: string
  updated_at: string
}

export interface TaleDoc {
  id: string
  title: string
  author_operative_id: string
  canon_layer: 'meg' | 'async'
  content: string
  word_count: number
  created_at: string
  updated_at: string
  status: DocStatus
  tags: string[]
  related_level?: string
}

export interface ReportDoc {
  id: string
  title: string
  doc_type: DocType
  ref_id: string
  author_operative_id: string
  created_at: string
  updated_at: string
  status: DocStatus
  summary: string
}

export interface ReviewItem {
  id: string
  title: string
  doc_type: DocType
  author_operative_id: string
  author_clearance: ClearanceLevel
  submitted_at: string
  summary: string
  word_count: number
  requires_clearance: ClearanceLevel
}
