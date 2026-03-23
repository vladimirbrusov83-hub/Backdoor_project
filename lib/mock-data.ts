import type {
  LevelDoc, EntityDoc, Alert, ActivityItem, Message, StatsData, Operative,
  Annotation, EncounterReport, BackroomsObject, Phenomenon, LevelDetail, EntityDetail,
  GroupDoc, TaleDoc, ReportDoc, ReviewItem,
} from './types'

export const mockStats: StatsData = {
  levels_logged: 1247,
  entities_filed: 312,
  active_operatives: 4891,
  async_files: null,
}

export const mockAlerts: Alert[] = [
  {
    id: 'a1',
    severity: 'critical',
    message: 'Entity surge reported — Level 1 Sector 7. Multiple hostile entities confirmed.',
    location: 'Level 1 — Sector 7',
    timestamp: '2024-03-22T09:31:00Z',
  },
  {
    id: 'a2',
    severity: 'warning',
    message: 'Communication blackout — Outpost Itinerari. Last signal 6 hours ago. Status unknown.',
    location: 'Outpost Itinerari — The Metro',
    timestamp: '2024-03-22T03:14:00Z',
  },
]

export const mockLevels: LevelDoc[] = [
  {
    id: 'l0',
    type: 'level',
    designation: 0,
    title: 'The Threshold',
    nickname: 'Yellow Hell',
    survival_class: 1,
    entity_count: 'unknown',
    description:
      'Infinite non-Euclidean space characterized by mono-yellow wallpaper, perpetually damp moist carpeting, and fluorescent lighting operating at maximum hum-buzz. Entry via noclip from baseline reality. Primary danger: disorientation and resource depletion. The Isolation Effect prevents contact with other wanderers regardless of proximity.',
    status: 'verified',
    author_id: 'u1',
    author_operative_id: 'MEG-RSR-0012',
    created_at: '2024-01-10T08:00:00Z',
    updated_at: '2024-03-20T14:22:00Z',
    verified_count: 847,
    canon_layer: 'both',
  },
  {
    id: 'l1',
    type: 'level',
    designation: 1,
    title: 'The Habitable Zone',
    nickname: 'Parking Zone',
    survival_class: 2,
    entity_count: 'moderate',
    description:
      'Vast warehouse-like space with concrete floors, exposed pipes, and inconsistent fluorescent lighting. Most habitable known level. Contains reliable electricity and regular supply caches. Subject to blackouts lasting minutes to days, during which hostile entities emerge.',
    status: 'verified',
    author_id: 'u2',
    author_operative_id: 'MEG-EXP-0091',
    created_at: '2024-01-10T08:00:00Z',
    updated_at: '2024-03-21T09:18:00Z',
    verified_count: 1024,
    canon_layer: 'meg',
  },
  {
    id: 'l37',
    type: 'level',
    designation: 37,
    title: 'The Poolrooms',
    survival_class: 2,
    entity_count: 'low',
    description:
      'Endless interconnected pool corridors with warm shallow water, white tile, and softly humming fluorescent lights. One of the more peaceful levels. Almond Water abundant. Entry typically via noclip through walls in Level 4 or Level 5.',
    status: 'verified',
    author_id: 'u3',
    author_operative_id: 'MEG-RSR-0291',
    created_at: '2024-02-14T11:00:00Z',
    updated_at: '2024-03-22T04:11:00Z',
    verified_count: 512,
    canon_layer: 'meg',
  },
  {
    id: 'l482',
    type: 'level',
    designation: 482,
    title: 'The Greenhouse',
    survival_class: 3,
    entity_count: 'moderate',
    description:
      'Sprawling greenhouse complex with overgrown vegetation, broken glass panels, and an unidentified bioluminescent flora. Humidity extreme. Visibility low. Entity type undocumented — behavior suggests territorial response to light sources.',
    status: 'pending',
    author_id: 'u4',
    author_operative_id: 'MEG-EXP-4471',
    created_at: '2024-03-22T07:15:00Z',
    updated_at: '2024-03-22T07:15:00Z',
    verified_count: 0,
    canon_layer: 'meg',
  },
  {
    id: 'l188',
    type: 'level',
    designation: 188,
    title: 'The End',
    survival_class: 4,
    entity_count: 'extreme',
    description:
      'Destination-like level described by survivors as a place that feels like a final destination. Architecture shifts between recognizable environments. Entity density extreme. No known safe zones. Multiple fatalities documented.',
    status: 'verified',
    author_id: 'u5',
    author_operative_id: 'MEG-EXP-0887',
    created_at: '2024-01-28T16:00:00Z',
    updated_at: '2024-03-21T20:44:00Z',
    verified_count: 289,
    canon_layer: 'meg',
  },
]

export const mockEntities: EntityDoc[] = [
  {
    id: 'e3',
    type: 'entity',
    entity_number: 'E-003',
    name: 'Smilers',
    threat_level: 4,
    habitat: 'Dark zones. Level 0, 1, 2 and most unlit areas',
    description:
      'Entities visible only as two luminescent points in darkness, resembling eyes. Attracted to low sanity and isolated wanderers. Attack if directly observed. Rendered harmless in consistent light.',
    status: 'verified',
    author_id: 'u1',
    author_operative_id: 'MEG-DEF-1104',
    created_at: '2024-01-10T08:00:00Z',
    updated_at: '2024-03-22T08:30:00Z',
    verified_count: 634,
    canon_layer: 'meg',
  },
  {
    id: 'e8',
    type: 'entity',
    entity_number: 'E-008',
    name: 'Facelings',
    threat_level: 2,
    habitat: 'Level 1, Level 4, multiple colonized levels',
    description:
      'Humanoid entities lacking facial features. Behavior ranges from passive to mildly curious. Rarely hostile without provocation. Frequent in areas with established colonies.',
    status: 'verified',
    author_id: 'u2',
    author_operative_id: 'MEG-RSR-0291',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-03-10T12:00:00Z',
    verified_count: 408,
    canon_layer: 'meg',
  },
  {
    id: 'e1',
    type: 'entity',
    entity_number: 'E-001',
    name: 'Hounds',
    threat_level: 5,
    habitat: 'Levels 1, 2, 5, 6 and exterior levels',
    description:
      'Large quadrupedal entities resembling canines. Exceptional speed and tracking ability. Travel in packs. No known reliable deterrent. Recommended response: immediate evacuation.',
    status: 'verified',
    author_id: 'u3',
    author_operative_id: 'MEG-DEF-0044',
    created_at: '2024-01-10T08:00:00Z',
    updated_at: '2024-02-28T15:00:00Z',
    verified_count: 771,
    canon_layer: 'meg',
  },
  {
    id: 'ea1',
    type: 'entity',
    entity_number: 'ASYNC-L-001',
    name: 'The Lifeform',
    threat_level: 5,
    habitat: 'The Complex — Area 1 through 4',
    description: '[CLASSIFIED — CLEARANCE LEVEL 4 REQUIRED]',
    status: 'restricted',
    author_id: 'u0',
    author_operative_id: 'ASYNC-INT-0001',
    created_at: '1990-02-03T00:00:00Z',
    updated_at: '1990-05-06T00:00:00Z',
    verified_count: 0,
    canon_layer: 'async',
  },
]

export const mockActivity: ActivityItem[] = [
  {
    id: 'act1',
    operative_id: 'MEG-RSR-0291',
    action: 'verified',
    target: 'Level 37 — The Poolrooms',
    target_type: 'level',
    timestamp: '2024-03-22T09:11:00Z',
  },
  {
    id: 'act2',
    operative_id: 'MEG-DEF-1104',
    action: 'updated',
    target: 'Entity 3 — Smilers threat assessment',
    target_type: 'entity',
    timestamp: '2024-03-22T08:30:00Z',
  },
  {
    id: 'act3',
    operative_id: 'MEG-CLN-0559',
    action: 'submitted',
    target: 'Tale — "Static on Level 9"',
    target_type: 'tale',
    timestamp: '2024-03-22T07:48:00Z',
  },
  {
    id: 'act4',
    operative_id: 'MEG-EXP-4471',
    action: 'filed',
    target: 'Level 482 — The Greenhouse',
    target_type: 'level',
    timestamp: '2024-03-22T07:15:00Z',
  },
  {
    id: 'act5',
    operative_id: 'MEG-EXP-0887',
    action: 'updated',
    target: 'Level 188 — The End',
    target_type: 'level',
    timestamp: '2024-03-21T20:44:00Z',
  },
]

export const mockMessages: Message[] = [
  {
    id: 'msg1',
    from: 'SYS · PROMETHEUS LIBRARY',
    subject: 'Level 482 report pending verification',
    preview: 'Your field report for Level 482 — The Greenhouse has been received and is awaiting senior review.',
    timestamp: '2h ago',
    read: false,
    severity: 'normal',
  },
  {
    id: 'msg2',
    from: 'MEG-RSR-0012',
    subject: 'Senior review required before publish',
    preview: 'Your clearance is insufficient for direct publish. Report has been routed to review queue.',
    timestamp: '5h ago',
    read: false,
    severity: 'warning',
  },
  {
    id: 'msg3',
    from: 'SECURITY · RESTRICTED',
    subject: 'Async Division access request DENIED',
    preview: 'Access to Async Division files requires Clearance Level 4. Your current clearance: Level 2.',
    timestamp: '1d ago',
    read: true,
    severity: 'danger',
  },
]

export const mockCurrentOperative: Operative = {
  id: 'u4',
  operative_id: 'MEG-EXP-4471',
  username: 'V. Brusov',
  department: 'exploration',
  clearance: 2,
  reports_filed: 24,
  reports_verified: 18,
  joined_at: '2024-01-15T00:00:00Z',
}

// ── Annotations ───────────────────────────────────────────────────────────────
export const mockAnnotations: Annotation[] = [
  {
    id: 'ann1',
    operative_id: 'MEG-RSR-0012',
    text: 'Confirmed: the Isolation Effect is absolute. Tested with another wanderer at 2m range — zero perceptible awareness of each other through any sensory modality.',
    timestamp: '2024-02-20T14:00:00Z',
  },
  {
    id: 'ann2',
    operative_id: 'MEG-EXP-0091',
    text: 'Thermal readings suggest the fluorescent hum carries low-frequency vibration at 14hz. Potential psychological effect on sanity threshold — correlates with faster onset of Isolation Effect symptoms.',
    timestamp: '2024-02-28T09:30:00Z',
  },
  {
    id: 'ann3',
    operative_id: 'MEG-RSR-0291',
    text: 'Mapping attempts consistently fail after approximately 6 hours of documentation. Level appears to resist cartographic efforts. Grid coordinates reset randomly.',
    timestamp: '2024-03-10T17:15:00Z',
  },
  {
    id: 'ann4',
    operative_id: 'MEG-EXP-4471',
    text: 'Found what appeared to be a door in an eastern section. It was painted on the wall — realistic enough to touch before realizing. Psychological strain was measurable. Filed supplementary report.',
    timestamp: '2024-03-19T11:42:00Z',
  },
]

// ── Encounter Reports ─────────────────────────────────────────────────────────
export const mockEncounterReports: EncounterReport[] = [
  {
    id: 'enc1',
    operative_id: 'MEG-DEF-1104',
    date: '2024-02-14',
    location: 'Level 1 — Sector 7, near blackout zone B',
    text: 'Observed three Smilers at approximately 8 meters. Maintained flashlight contact continuously. They held position for 12 minutes. When secondary light source failed, one advanced. Retreated immediately via Sector 6 corridor. No injuries sustained. Recommendation: maintain dual light sources at all times in Sector 7.',
  },
  {
    id: 'enc2',
    operative_id: 'MEG-EXP-0091',
    date: '2024-01-30',
    location: 'Level 0 — No defined sector',
    text: 'Solo encounter. Could not determine distance — the eyes appeared stationary for 40 minutes while I moved. Eventually realized they were tracking and closing very slowly. Activated secondary lamp. Entities retreated into wall area. No prior sound or movement detectable. Report filed upon return to Level 1.',
  },
  {
    id: 'enc3',
    operative_id: 'MEG-RSR-0012',
    date: '2023-11-22',
    location: 'Level 2 — Grid reference unavailable',
    text: 'Research team of four encountered a group of at least five. Maintained tight formation with four combined light sources. Collective illumination appears to deter them more effectively than solo sources — the entities did not advance despite extended observation period of 25 minutes. Retreated safely.',
  },
]

// ── Objects ───────────────────────────────────────────────────────────────────
export const mockObjects: BackroomsObject[] = [
  {
    id: 'obj1',
    name: 'Almond Water',
    description: 'Colorless, odorless liquid found in wall-mounted vending machines across many levels. Restores sanity and provides moderate hydration. Source entirely unknown — machines refill spontaneously.',
    rarity: 'common',
    danger_level: 'none',
  },
  {
    id: 'obj2',
    name: 'MEG Communicator',
    description: 'Short-range radio device issued by M.E.G. to operatives. Effective up to 400m in most levels. Functions on modified frequency bands not found in baseline reality electronics.',
    rarity: 'uncommon',
    danger_level: 'none',
  },
  {
    id: 'obj3',
    name: 'Memory Blank',
    description: 'Small white rectangular object of unknown composition. Physical contact results in localized memory disruption lasting 2-6 hours. Handle only with protective gloves. Origin and purpose unknown.',
    rarity: 'rare',
    danger_level: 'moderate',
  },
  {
    id: 'obj4',
    name: 'The Slide Rule',
    description: 'Antique brass calculation tool that provides accurate navigation data on Level 0 and Level 1 despite magnetic compass failure. Single known specimen. Method of function is entirely undocumented.',
    rarity: 'unique',
    danger_level: 'none',
  },
]

// ── Phenomena ─────────────────────────────────────────────────────────────────
export const mockPhenomena: Phenomenon[] = [
  {
    id: 'phen1',
    name: 'The Isolation Effect',
    description: 'Documented primarily on Level 0. Wanderers physically present in the same area cannot perceive each other through any sensory modality — visual, auditory, or tactile. Origin unknown. No known countermeasure has been identified.',
    status: 'documented',
  },
  {
    id: 'phen2',
    name: 'Temporal Drift',
    description: 'Time on certain levels does not correlate with baseline reality elapsed time. Wanderers have reported entering a level for subjective days and returning to find only hours had passed — and vice versa. Inconsistent. No predictive model established.',
    status: 'documented',
  },
  {
    id: 'phen3',
    name: 'Resonant Architecture',
    description: 'Buildings and room configurations on multiple levels have been observed shifting layout between visits from the same entry point. Shift events appear to correlate with entity surge reports. Under active study by Research Division as of Q1 2024.',
    status: 'under_study',
  },
]

// ── Level Detail Supplements ──────────────────────────────────────────────────
export const mockLevelDetails: Record<string, LevelDetail> = {
  l0: {
    entrances: [
      'Noclip through any moist drywall in baseline reality',
      'Certain basement areas with off-color carpeting',
      'Forced entry via sustained concentration on interior wall surfaces',
      'Sleeping in specific locations on Level 37',
    ],
    exits: [
      'Noclip through moist carpet → Level 1 (rare, unconfirmed rate)',
      'Finding a door in a wall where none should structurally exist',
      'Sustained linear movement in a single direction for 6+ hours (unverified)',
      'Psychological collapse triggers forced transition to unknown destination',
    ],
    outposts: [
      {
        name: 'None Established',
        status: 'unknown',
        description: 'The Isolation Effect prevents any stable gathering or outpost formation on this level. All colonization attempts have failed. M.E.G. classifies Level 0 as permanently uninhabitable.',
      },
    ],
    survival_tips: [
      'Do not run — footsteps carry and attract entities at distance',
      'Keep almond water in reserve — hydration is critical to sanity maintenance',
      'Mark your path physically — the level is infinite and disorienting',
      'Maintain sanity — psychological deterioration accelerates entity encounters exponentially',
      'Carry dual light sources — primary and backup, both charged',
      'Do not attempt to sleep — the Isolation Effect makes rescue impossible',
    ],
    supplies: [
      'Almond Water (found in vending machines — refills spontaneously)',
      'Flashlight or lamp — maintain lighting at all costs',
      'Food rations (minimum 72 hours)',
      'Navigation device — magnetic compasses are non-functional here',
      'Sanity anchors — personal items from baseline reality',
    ],
  },
  l1: {
    entrances: [
      'Noclipping from Level 0 carpet',
      'Abandoned building basements in baseline reality',
      'Certain service tunnels connecting from Level 5',
    ],
    exits: [
      'Fire exits during blackout conditions → Level 2',
      'Maintenance shafts in Sector 4 → Level 5',
      'Ventilation crawlspaces → Level 6 (rare)',
    ],
    outposts: [
      {
        name: 'Camp Hawkins',
        status: 'active',
        description: 'M.E.G.-maintained supply depot in Sector 3. First point of contact for new arrivals. Medical, food, and radio communication available.',
      },
      {
        name: 'Outpost Itinerari',
        status: 'inactive',
        description: 'Communications relay in Sector 7. Last signal received 6 hours ago. Current status unknown. Avoid Sector 7 until re-established.',
      },
    ],
    survival_tips: [
      'Keep lights on — hostile entities emerge exclusively during blackouts',
      'Do not stray from marked safe zones between Sectors 2 and 4',
      'Register at Camp Hawkins upon arrival — mandatory for evacuation list',
      'Carry backup lighting with minimum 48h battery life',
    ],
    supplies: [
      'Almond Water (supply cache at Camp Hawkins)',
      'Battery packs for lighting — critical',
      'MEG-issued radio communicator',
      'Standard ration packs (Camp Hawkins distribution)',
    ],
  },
}

// ── Entity Detail Supplements ─────────────────────────────────────────────────
export const mockEntityDetails: Record<string, EntityDetail> = {
  e3: {
    physical_description: 'Smilers have no confirmed physical form beyond two luminescent points of light, resembling eyes, visible only in total or near-total darkness. Estimated spacing between points: 8-12cm, suggesting a humanoid or large quadruped form. No body mass, heat signature, or tactile presence has ever been documented. Some operatives report a faint smell of ozone in proximity.',
    behavior: 'Smilers are passive in the presence of consistent, stable light. In darkness or near-darkness, they are drawn to wanderers displaying low sanity indicators — erratic movement, audible distress, running. Once a wanderer establishes direct eye contact with a Smiler, the entity immediately transitions to an aggressive pursuit state. Speed during pursuit has been estimated at 40-60 km/h. Smilers do not pursue into lit areas, but will wait at the boundary indefinitely.',
    survival_guide: [
      'Maintain consistent, stable light sources — a single strong flashlight is insufficient; carry backup',
      'Do not make direct eye contact — if you see two glowing points, avert your gaze and increase lighting',
      'Do not run — erratic movement and sounds of distress accelerate approach behavior',
      'Travel in groups when possible — collective light output is more deterring',
      'If your light fails, freeze immediately, activate backup, and do not look toward the Smiler',
      'No known attack can disable a Smiler — evasion and deterrence are the only viable responses',
    ],
  },
  e8: {
    physical_description: 'Facelings are humanoid entities of approximately human height (1.6-1.9m) with smooth, featureless faces — no eyes, nose, mouth, or ears. Skin tone varies from pale to dark. Clothing appears to be drawn from baseline reality at random — office wear, hospital gowns, work uniforms. No evidence of internal anatomy has been recovered.',
    behavior: 'Facelings are generally passive. They mimic human social behaviors — sitting, standing, walking — without apparent purpose. They do not communicate or react to direct address. In areas with established human colonies, they have been observed mimicking colony routines. Aggression has been documented only in response to direct physical provocation or sustained invasion of perceived territory.',
    survival_guide: [
      'Do not provoke — Facelings in aggressive state are considerably stronger than humans',
      'Treat them like strangers in a public space — neutral acknowledgment, no sustained focus',
      'Do not attempt to remove Facelings from colonized areas — disruption increases aggression likelihood',
      'If a Faceling follows you, change direction slowly. Do not run.',
    ],
  },
  e1: {
    physical_description: 'Hounds resemble large canines — approximately wolf-sized or larger — with entirely black, matte-absorbing fur that makes them nearly invisible in low light. Eyes are pale amber and reflect light at extreme distances. Claws and teeth are reinforced beyond biological norms. Multiple specimens have survived injuries that would kill conventional animals.',
    behavior: 'Hounds hunt in packs of 3-12. They communicate via subsonic signals not perceptible to humans. Tracking ability is exceptional — they can follow a wanderer across multiple levels. Once a Hound has your scent, it will pursue indefinitely across level boundaries. Pack coordination is highly intelligent; individual Hounds have been observed driving prey into ambush positions.',
    survival_guide: [
      'If you hear a Hound, begin evacuation immediately — do not wait to confirm',
      'Change levels if possible — they can follow but the transition buys time',
      'Do not attempt to fight — no field operative has successfully engaged a Hound pack and survived',
      'Moving water temporarily disrupts scent tracking — use Level 37 or the Poolrooms if available',
      'Almond Water, when poured on a trail, appears to confuse tracking temporarily',
      'Recommend immediate radio contact with MEG Defense if Hound pack confirmed in your sector',
    ],
  },
}

// ── Re-export helper for recently updated (combines levels + entities) ─────────
export type RecentItem = {
  id: string
  type: 'level' | 'entity' | 'object' | 'phenomenon'
  title: string
  author: string
  updated_at: string
  status: string
}

export const mockRecentItems: RecentItem[] = [
  ...mockLevels.map(l => ({
    id: l.id,
    type: 'level' as const,
    title: `Level ${l.designation} — ${l.title}`,
    author: l.author_operative_id,
    updated_at: l.updated_at,
    status: l.status,
  })),
  ...mockEntities.map(e => ({
    id: e.id,
    type: 'entity' as const,
    title: `${e.entity_number} — ${e.name}`,
    author: e.author_operative_id,
    updated_at: e.updated_at,
    status: e.status,
  })),
].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())

// ── Groups ────────────────────────────────────────────────────────────────────
export const mockGroups: GroupDoc[] = [
  {
    id: 'grp1',
    name: 'M.E.G.',
    full_name: 'Major Explorer Group',
    code: 'MEG',
    description:
      'The largest and most organized faction in the Backrooms. Founded by early wanderers with survival and documentation as core missions. Operates the Prometheus Library, Base Alpha, and over 30 outposts across documented levels. M.E.G. operatives are the primary contributors to this database.',
    alignment: 'meg',
    status: 'active',
    member_count: '4,000+',
    headquarters: 'Base Alpha — Level 1, Sector 3',
    founded: '2009-03-15',
    goals: [
      'Document all known levels and entities for wanderer safety',
      'Establish and maintain safe outposts across habitable levels',
      'Provide rescue and extraction for stranded wanderers',
      'Maintain the Prometheus Library and BACK-NET communications relay',
    ],
    author_operative_id: 'MEG-RSR-0001',
    created_at: '2024-01-10T08:00:00Z',
    updated_at: '2024-03-22T08:00:00Z',
  },
  {
    id: 'grp2',
    name: 'B.N.T.G.',
    full_name: 'Backrooms Neutral Trading Group',
    code: 'BNTG',
    description:
      'Independent merchant faction. Operates trade routes between major outposts and colonies. Neutral alignment — trades with all factions except confirmed hostile entities. Known for acquiring rare objects and distributing Almond Water through established supply chains.',
    alignment: 'independent',
    status: 'active',
    member_count: '300–500',
    headquarters: 'The Market — Level 4, Sub-level C',
    founded: '2013-07-22',
    goals: [
      'Maintain neutral trade routes between all factions',
      'Stabilize Almond Water supply distribution',
      'Negotiate inter-faction agreements and non-aggression pacts',
    ],
    author_operative_id: 'MEG-RSR-0291',
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-03-18T14:30:00Z',
  },
  {
    id: 'grp3',
    name: 'Eyes of Argos',
    full_name: 'Eyes of Argos Surveillance Collective',
    code: 'EoA',
    description:
      'Hostile surveillance organization with unknown origin. Leaves camera-like devices in unexplored levels. Behavior suggests organized intelligence gathering on wanderer populations. Has fired upon M.E.G. extraction teams on three confirmed occasions. Considered hostile by M.E.G. Security Division.',
    alignment: 'hostile',
    status: 'active',
    member_count: 'UNKNOWN',
    headquarters: 'UNKNOWN — suspected Level 188 or deeper',
    goals: [
      'Gather intelligence on wanderer populations (suspected)',
      'Monitor unexplored levels (confirmed by device recovery)',
    ],
    author_operative_id: 'MEG-DEF-0044',
    created_at: '2024-02-01T09:00:00Z',
    updated_at: '2024-03-15T19:22:00Z',
  },
  {
    id: 'grp4',
    name: 'The Lost',
    full_name: 'The Lost — Voluntary Isolation Collective',
    code: 'LOST',
    description:
      'Loose collective of wanderers who have chosen to remain in the Backrooms indefinitely rather than seek return to baseline reality. Operate in small cells across low-entity levels. Generally peaceful and non-communicative with organized factions. Some cells have been known to assist lost wanderers.',
    alignment: 'independent',
    status: 'active',
    member_count: 'UNKNOWN — estimated 800+',
    headquarters: 'Distributed — no central base',
    goals: [
      'Maintain voluntary isolation from baseline reality',
      'Self-sustaining survival without faction dependency',
    ],
    author_operative_id: 'MEG-EXP-0091',
    created_at: '2024-02-14T16:00:00Z',
    updated_at: '2024-03-01T11:00:00Z',
  },
]

// ── Tales ─────────────────────────────────────────────────────────────────────
export const mockTales: TaleDoc[] = [
  {
    id: 'tale1',
    title: 'Static on Level 9',
    author_operative_id: 'MEG-CLN-0559',
    canon_layer: 'meg',
    content: `The radio found me first.

I heard it through three walls — or what I thought were walls. In Level 9 nothing is a wall the way a wall should be. The geometry here has opinions.

The signal was human. Not entity. I know the difference now; after eight months I can feel it in my sternum like a tuning fork.

I followed it for what my watch said was two hours and what my body said was two days. The corridor narrowed as they always do when you're close to something. The fluorescent tubes above me buzzed at 14hz — I counted, because counting keeps the sanity bar from dropping.

The radio was sitting on a folding table beside a sleeping bag that had been slept in recently. The station: white noise and static. Someone had circled a frequency on the dial with permanent marker.

I keyed the frequency.

The voice on the other end said: "You found it. Good. Now leave before it finds you."

I didn't ask who it was.

I left.

The table was gone when I looked back. The sleeping bag was gone. The radio I was holding was gone.

My watch showed four hours had passed.

I filed this report the moment I returned to Level 1.

The frequency on the dial. I remember it. I'm not writing it down.`,
    word_count: 231,
    created_at: '2024-03-22T07:48:00Z',
    updated_at: '2024-03-22T07:48:00Z',
    status: 'verified',
    tags: ['level-9', 'radio', 'anomaly', 'first-person'],
    related_level: 'l9',
  },
  {
    id: 'tale2',
    title: 'The Last Outpost',
    author_operative_id: 'MEG-EXP-0887',
    canon_layer: 'meg',
    content: `Outpost Seven was supposed to be decommissioned.

Supposed to be. That's the phrase that keeps repeating in my report, in my head, in the dark behind my eyes when I try to sleep.

I was sent to recover equipment. Standard decommission: strip the supply cache, retrieve the radio relay, mark the site as inactive in the registry. A three-hour job for two operatives.

Reyes took the east corridor. I took the west.

The west corridor had a light I didn't remember from the schematics. A warm light — not fluorescent. Not amber emergency backup. Something yellow-orange. Firelight, almost.

I followed it because that's what you do.

The room at the end had been someone's home. A cot, a shelf of books — actual paper books, not whatever passes for paper in the deeper levels. A photograph pinned above the window that looked out onto a wall. In the photograph, a woman and a small boy standing in front of a house I didn't recognize.

Whoever lived here had left recently. The cot was still warm.

Reyes didn't come back from the east corridor.

I found his radio near the entrance. The display read: ALL GOOD, HEADING BACK.

He never headed back.

I didn't put that in the official report. The official report says equipment was recovered, outpost decommissioned, operative Reyes MIA, cause unknown.

Some things you don't write down.

Some things write themselves.`,
    word_count: 264,
    created_at: '2024-03-20T16:30:00Z',
    updated_at: '2024-03-20T16:30:00Z',
    status: 'verified',
    tags: ['outpost', 'mia', 'level-1', 'first-person'],
    related_level: 'l1',
  },
  {
    id: 'tale3',
    title: 'Below the Poolrooms',
    author_operative_id: 'MEG-RSR-0291',
    canon_layer: 'meg',
    content: `There's a drain in Level 37 that no one talks about.

It's in the south corner of the seventh interconnected pool — or what I've designated the seventh, since numbering them is the only way to stay sane. The water there is shallower than elsewhere. The tiles are a slightly different shade of off-white. The hum of the lights overhead carries a frequency I can't name.

The drain is about 60cm across. Standard cast iron grating. Unremarkable.

Except the drain has no pipe beneath it.

I discovered this by accident when I dropped my flashlight and it fell through the grating. I heard it fall for four seconds before it stopped. Not hit bottom — stopped. As in the sound simply ceased.

The flashlight beam was visible from above. It was pointing upward at me from a very great distance.

I left my camp coordinates with the relay and went through feet first.

What's below the Poolrooms is another Poolrooms. Identical. But the water is colder and the lights are dimmer and there is no drain in the south corner of any pool I checked.

I spent twelve hours exploring before I realized: the reflections in the water were wrong.

They showed a ceiling above me, not a water surface below.

I was looking up at another Poolrooms above me.

I climbed out the way I came before I understood what that meant.

I'm filing this as a research annotation, not a full level report. I don't have enough data.

But I think it goes all the way down.`,
    word_count: 276,
    created_at: '2024-03-15T09:20:00Z',
    updated_at: '2024-03-15T09:20:00Z',
    status: 'verified',
    tags: ['level-37', 'poolrooms', 'anomaly', 'research'],
    related_level: 'l37',
  },
  {
    id: 'tale4',
    title: 'Greenhouse Log — Day 3',
    author_operative_id: 'MEG-EXP-4471',
    canon_layer: 'meg',
    content: `Day 3. Humidity: extreme. Visibility: 2–4 meters in most corridors.

The bioluminescent flora has spread overnight. Segments of the eastern greenhouse that were dark yesterday are now faintly lit from below — blue-green, cold light, not unpleasant if you don't think about what's producing it.

I made contact with what I believe is the territorial entity. Indirect contact — I saw its outline through the foliage at approximately 15 meters. It was not moving toward me. It appeared to be watching.

I turned off my flashlight. This is against protocol.

The entity left.

Hypothesis: they are not attracted to light. They are repelled by darkness. Light means you're watching, and they don't like being watched.

Testing this tomorrow with a controlled approach.

Day 3, addendum: the plants here respond to sound. I hummed something my mother used to hum and the nearest growth leaned toward me. I stopped. It straightened.

I didn't tell the relay about the humming.

Some data you keep for yourself until you understand it.

Day 4 update to follow if relay connection holds.`,
    word_count: 202,
    created_at: '2024-03-22T07:15:00Z',
    updated_at: '2024-03-22T07:15:00Z',
    status: 'pending',
    tags: ['level-482', 'greenhouse', 'field-log', 'entities'],
    related_level: 'l482',
  },
]

// ── M.E.G. Reports feed ───────────────────────────────────────────────────────
export const mockReports: ReportDoc[] = [
  {
    id: 'rpt1',
    title: 'Level 37 — The Poolrooms: Annual Verification',
    doc_type: 'level',
    ref_id: 'l37',
    author_operative_id: 'MEG-RSR-0291',
    created_at: '2024-03-22T09:11:00Z',
    updated_at: '2024-03-22T09:11:00Z',
    status: 'verified',
    summary: 'Annual re-verification of Level 37 survival data. Almond Water sources confirmed active. No new entity activity. South drain anomaly appended as research annotation.',
  },
  {
    id: 'rpt2',
    title: 'Entity E-003 Smilers — Threat Assessment Update',
    doc_type: 'entity',
    ref_id: 'e3',
    author_operative_id: 'MEG-DEF-1104',
    created_at: '2024-03-22T08:30:00Z',
    updated_at: '2024-03-22T08:30:00Z',
    status: 'verified',
    summary: 'Threat level maintained at 4. New behavioral data: collective light deterrence confirmed effective at 4+ combined sources. Updated survival guide with group-formation protocol.',
  },
  {
    id: 'rpt3',
    title: 'Level 482 — The Greenhouse: Initial Field Report',
    doc_type: 'level',
    ref_id: 'l482',
    author_operative_id: 'MEG-EXP-4471',
    created_at: '2024-03-22T07:15:00Z',
    updated_at: '2024-03-22T07:15:00Z',
    status: 'pending',
    summary: 'First documented field report for Level 482. Bioluminescent flora confirmed. Territorial entity sighted — behavioral hypothesis filed. Awaiting senior review.',
  },
  {
    id: 'rpt4',
    title: 'Outpost Itinerari — Communication Blackout Investigation',
    doc_type: 'phenomenon',
    ref_id: 'phen1',
    author_operative_id: 'MEG-DEF-0044',
    created_at: '2024-03-22T03:14:00Z',
    updated_at: '2024-03-22T03:14:00Z',
    status: 'flagged',
    summary: 'Signal lost from Outpost Itinerari 6 hours ago. Last known coordinates: Level 1 Sector 7. Rescue team dispatched. Status: UNRESOLVED.',
  },
  {
    id: 'rpt5',
    title: 'Level 188 — The End: Survival Class Re-evaluation',
    doc_type: 'level',
    ref_id: 'l188',
    author_operative_id: 'MEG-EXP-0887',
    created_at: '2024-03-21T20:44:00Z',
    updated_at: '2024-03-21T20:44:00Z',
    status: 'verified',
    summary: 'Re-evaluation recommended survival class increase from 4 to 5 based on new entity density data. Consensus not reached. Class remains 4 pending review board.',
  },
  {
    id: 'rpt6',
    title: 'Object OBJ-003 Memory Blank — New Recovery Site',
    doc_type: 'object',
    ref_id: 'obj3',
    author_operative_id: 'MEG-RSR-0012',
    created_at: '2024-03-19T14:00:00Z',
    updated_at: '2024-03-19T14:00:00Z',
    status: 'verified',
    summary: 'Two additional Memory Blank specimens recovered from Level 6, Sub-corridor 14. Standard containment protocol applied. Both transferred to Research Division.',
  },
  {
    id: 'rpt7',
    title: 'Eyes of Argos — Hostile Incident Report',
    doc_type: 'group',
    ref_id: 'grp3',
    author_operative_id: 'MEG-DEF-1104',
    created_at: '2024-03-17T11:00:00Z',
    updated_at: '2024-03-17T11:00:00Z',
    status: 'flagged',
    summary: 'Third confirmed hostile engagement with Eyes of Argos operatives. Team of 4 fired upon near Level 22 survey point. No casualties. Surveillance device recovered and logged.',
  },
  {
    id: 'rpt8',
    title: 'Temporal Drift Phenomenon — New Instance Logged',
    doc_type: 'phenomenon',
    ref_id: 'phen2',
    author_operative_id: 'MEG-RSR-0291',
    created_at: '2024-03-14T08:30:00Z',
    updated_at: '2024-03-14T08:30:00Z',
    status: 'verified',
    summary: 'Operative MEG-EXP-0091 reported 14-hour subjective duration on Level 37, with relay clock showing 2 hours elapsed. Fourth documented instance of Temporal Drift on Level 37 specifically.',
  },
]

// ── Extended Alerts ───────────────────────────────────────────────────────────
export const mockAlertsExtended: Alert[] = [
  {
    id: 'a1',
    severity: 'critical',
    message: 'Entity surge reported — Level 1 Sector 7. Multiple hostile entities confirmed. All operatives advised to avoid Sector 7 until Defense team clears.',
    location: 'Level 1 — Sector 7',
    timestamp: '2024-03-22T09:31:00Z',
  },
  {
    id: 'a2',
    severity: 'warning',
    message: 'Communication blackout — Outpost Itinerari. Last signal 6 hours ago. Status unknown. Rescue team dispatched.',
    location: 'Outpost Itinerari — The Metro',
    timestamp: '2024-03-22T03:14:00Z',
  },
  {
    id: 'a3',
    severity: 'critical',
    message: 'Hound pack confirmed on Level 2, Sub-corridor 14. Pack size estimated 8–12. Evacuation of Sub-corridor 14 and 15 strongly recommended.',
    location: 'Level 2 — Sub-corridor 14',
    timestamp: '2024-03-21T22:05:00Z',
  },
  {
    id: 'a4',
    severity: 'warning',
    message: 'Temporal Drift event logged — Level 37. Operative MEG-EXP-0091 reported 12h subjective vs 2h relay. Avoid Level 37 if on time-sensitive mission.',
    location: 'Level 37 — The Poolrooms',
    timestamp: '2024-03-21T18:44:00Z',
  },
  {
    id: 'a5',
    severity: 'info',
    message: 'Camp Hawkins supply drop confirmed. Almond Water reserves restocked. Battery packs available at distribution point C.',
    location: 'Camp Hawkins — Level 1 Sector 3',
    timestamp: '2024-03-21T14:00:00Z',
  },
  {
    id: 'a6',
    severity: 'warning',
    message: 'Eyes of Argos operatives spotted near Level 22 survey coordinates. Do not engage. Report sightings to MEG-DEF-0044.',
    location: 'Level 22 — Survey Point Alpha',
    timestamp: '2024-03-21T11:30:00Z',
  },
  {
    id: 'a7',
    severity: 'info',
    message: 'Prometheus Library maintenance window scheduled. BACK-NET relay will experience reduced bandwidth 02:00–04:00. Non-critical transmissions queued.',
    location: 'Base Alpha — Level 1',
    timestamp: '2024-03-21T08:00:00Z',
  },
]

// ── Extended Messages ─────────────────────────────────────────────────────────
export const mockMessagesExtended: Message[] = [
  {
    id: 'msg1',
    from: 'SYS · PROMETHEUS LIBRARY',
    subject: 'Level 482 report pending verification',
    preview: 'Your field report for Level 482 — The Greenhouse has been received and is awaiting senior review. Estimated processing: 24–72 hours.',
    timestamp: '2h ago',
    read: false,
    severity: 'normal',
  },
  {
    id: 'msg2',
    from: 'MEG-RSR-0012',
    subject: 'Senior review required before publish',
    preview: 'Your clearance is insufficient for direct publish. Report has been routed to the review queue. A senior operative will assess within the standard window.',
    timestamp: '5h ago',
    read: false,
    severity: 'warning',
  },
  {
    id: 'msg3',
    from: 'SECURITY · RESTRICTED',
    subject: 'Async Division access request DENIED',
    preview: 'Access to Async Division files requires Clearance Level 4. Your current clearance: Level 2. If you believe this is in error, contact your department head.',
    timestamp: '1d ago',
    read: true,
    severity: 'danger',
  },
  {
    id: 'msg4',
    from: 'MEG-DEF-0044',
    subject: 'Defense advisory — Level 1 Sector 7',
    preview: 'Entity surge confirmed in your registered patrol zone. Defense team en route. Estimated clear time: 3–5 hours. Stay clear of Sector 7 access points.',
    timestamp: '1d ago',
    read: true,
    severity: 'warning',
  },
  {
    id: 'msg5',
    from: 'SYS · BACK-NET',
    subject: 'Weekly activity summary',
    preview: 'Your activity this week: 2 reports filed, 3 verifications submitted, 0 flags received. Current standing: FIELD AGENT in good standing.',
    timestamp: '3d ago',
    read: true,
    severity: 'normal',
  },
  {
    id: 'msg6',
    from: 'MEG-RSR-0291',
    subject: 'Re: Level 37 drain anomaly',
    preview: 'I read your annotation. The drain theory is compelling. I\'m planning a follow-up expedition in the next cycle. Want to co-file the report? Your exploration credit would be acknowledged.',
    timestamp: '4d ago',
    read: true,
    severity: 'normal',
  },
  {
    id: 'msg7',
    from: 'SYS · PROMETHEUS LIBRARY',
    subject: 'Account clearance review due',
    preview: 'Your operative clearance is due for annual review. Submit your activity log to your department head by end of month to maintain current clearance level.',
    timestamp: '5d ago',
    read: true,
    severity: 'normal',
  },
]

// ── Review Queue ──────────────────────────────────────────────────────────────
export const mockReviewItems: ReviewItem[] = [
  {
    id: 'rev1',
    title: 'Level 482 — The Greenhouse: Initial Field Report',
    doc_type: 'level',
    author_operative_id: 'MEG-EXP-4471',
    author_clearance: 2,
    submitted_at: '2024-03-22T07:15:00Z',
    summary: 'First documented field report for Level 482. Bioluminescent flora confirmed. Territorial entity sighted — behavioral hypothesis filed.',
    word_count: 847,
    requires_clearance: 3,
  },
  {
    id: 'rev2',
    title: 'Greenhouse Log — Day 3',
    doc_type: 'tale',
    author_operative_id: 'MEG-EXP-4471',
    author_clearance: 2,
    submitted_at: '2024-03-22T07:15:00Z',
    summary: 'Field log from Level 482 third day expedition. Details bioluminescent flora response to sound and revised entity deterrence hypothesis.',
    word_count: 202,
    requires_clearance: 2,
  },
  {
    id: 'rev3',
    title: 'Entity E-011 — The Corridor Keeper: First Contact',
    doc_type: 'entity',
    author_operative_id: 'MEG-EXP-0887',
    author_clearance: 2,
    submitted_at: '2024-03-21T16:00:00Z',
    summary: 'Newly documented entity observed in Level 6 maintenance corridors. Passive behavior noted. Threat level assessment pending behavioral study.',
    word_count: 512,
    requires_clearance: 3,
  },
  {
    id: 'rev4',
    title: 'Object OBJ-009 — Resonant Glass Fragment',
    doc_type: 'object',
    author_operative_id: 'MEG-RSR-0291',
    author_clearance: 3,
    submitted_at: '2024-03-21T09:30:00Z',
    summary: 'Glass fragment recovered from Level 482 greenhouse panels. Exhibits acoustic anomalies. Danger level assessment: low. Rarity: uncommon.',
    word_count: 320,
    requires_clearance: 2,
  },
  {
    id: 'rev5',
    title: 'Level 6 — The Lights Off Floors: Survival Class Update',
    doc_type: 'level',
    author_operative_id: 'MEG-DEF-1104',
    author_clearance: 3,
    submitted_at: '2024-03-20T14:22:00Z',
    summary: 'Recommending survival class increase from 3 to 4 based on new Hound pack activity data. Three confirmed fatalities in Q1 2024.',
    word_count: 1100,
    requires_clearance: 3,
  },
  {
    id: 'rev6',
    title: 'B.N.T.G. — Trade Route Dossier Update',
    doc_type: 'group',
    author_operative_id: 'MEG-CLN-0559',
    author_clearance: 2,
    submitted_at: '2024-03-19T11:00:00Z',
    summary: 'Updated B.N.T.G. trade route map with three new confirmed supply points. Member count estimate revised upward.',
    word_count: 440,
    requires_clearance: 2,
  },
  {
    id: 'rev7',
    title: 'Phenomenon: Sub-Level Reflection Effect',
    doc_type: 'phenomenon',
    author_operative_id: 'MEG-RSR-0291',
    author_clearance: 3,
    submitted_at: '2024-03-15T09:20:00Z',
    summary: 'Newly proposed phenomenon observed below Level 37 poolrooms. Reflections display inverted perspective suggesting additional sub-layer. Status: unverified, pending peer review.',
    word_count: 680,
    requires_clearance: 3,
  },
]
