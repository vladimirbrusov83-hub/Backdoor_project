'use client'
import Shell from '@/components/Shell'
import { useState } from 'react'


type DocTypeKey = 'level' | 'entity' | 'tale' | 'object' | 'phenomenon' | 'group'

const DOC_TYPES: {
  key: DocTypeKey
  label: string
  code: string
  description: string
}[] = [
  { key: 'level', label: 'LEVEL REPORT', code: 'FORMAT: LEVEL-RPT-001', description: 'Document a new or updated level' },
  { key: 'entity', label: 'ENTITY REPORT', code: 'FORMAT: ENT-RPT-001', description: 'Document a new or updated entity' },
  { key: 'object', label: 'OBJECT REPORT', code: 'FORMAT: OBJ-RPT-001', description: 'Document an anomalous object' },
  { key: 'phenomenon', label: 'PHENOMENON REPORT', code: 'FORMAT: PHN-RPT-001', description: 'Document an anomalous phenomenon' },
  { key: 'group', label: 'GROUP DOSSIER', code: 'FORMAT: GRP-DOS-001', description: 'Document a known group or faction' },
  { key: 'tale', label: 'TALE', code: 'FORMAT: TALE-001', description: 'First-person narrative or recovered log' },
]

type FieldError = Record<string, string>

function FieldGroup({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div
        style={{
          fontSize: '9px',
          color: error ? 'var(--red2)' : 'var(--text3)',
          letterSpacing: '2px',
          marginBottom: '6px',
          display: 'flex',
          gap: '6px',
          alignItems: 'center',
        }}
      >
        {label}
        {required && <span style={{ color: 'var(--amber-dim)' }}>*</span>}
        {error && (
          <span style={{ color: 'var(--red2)', marginLeft: '4px' }}>— {error}</span>
        )}
      </div>
      {children}
    </div>
  )
}

const inputStyle = (hasError: boolean): React.CSSProperties => ({
  width: '100%',
  background: 'var(--bg3)',
  border: `1px solid ${hasError ? 'var(--red-border)' : 'var(--border2)'}`,
  color: 'var(--text)',
  fontFamily: 'var(--mono)',
  fontSize: '12px',
  padding: '8px 10px',
  outline: 'none',
  letterSpacing: '0.5px',
  boxSizing: 'border-box',
})

const selectStyle = (hasError: boolean): React.CSSProperties => ({
  ...inputStyle(hasError),
  cursor: 'pointer',
  appearance: 'none' as const,
})

function LevelForm({ errors, data, onChange }: {
  errors: FieldError
  data: Record<string, string>
  onChange: (k: string, v: string) => void
}) {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <FieldGroup label="LEVEL DESIGNATION" required error={errors.designation}>
          <input
            type="text"
            placeholder="e.g. 0, 37, 482"
            value={data.designation ?? ''}
            onChange={e => onChange('designation', e.target.value)}
            style={inputStyle(!!errors.designation)}
          />
        </FieldGroup>
        <FieldGroup label="SURVIVAL CLASS" required error={errors.survival_class}>
          <select
            value={data.survival_class ?? ''}
            onChange={e => onChange('survival_class', e.target.value)}
            style={selectStyle(!!errors.survival_class)}
          >
            <option value="">SELECT CLASS...</option>
            <option value="0">CLASS 0 — SAFE</option>
            <option value="1">CLASS 1 — MINIMAL</option>
            <option value="2">CLASS 2 — UNSAFE</option>
            <option value="3">CLASS 3 — DANGEROUS</option>
            <option value="4">CLASS 4 — HOSTILE</option>
            <option value="5">CLASS 5 — EXTREME</option>
          </select>
        </FieldGroup>
      </div>
      <FieldGroup label="OFFICIAL TITLE" required error={errors.title}>
        <input
          type="text"
          placeholder="Official level designation title"
          value={data.title ?? ''}
          onChange={e => onChange('title', e.target.value)}
          style={inputStyle(!!errors.title)}
        />
      </FieldGroup>
      <FieldGroup label="UNOFFICIAL NICKNAME">
        <input
          type="text"
          placeholder="Common nickname if applicable"
          value={data.nickname ?? ''}
          onChange={e => onChange('nickname', e.target.value)}
          style={inputStyle(false)}
        />
      </FieldGroup>
      <FieldGroup label="ENTITY COUNT" required error={errors.entity_count}>
        <select
          value={data.entity_count ?? ''}
          onChange={e => onChange('entity_count', e.target.value)}
          style={selectStyle(!!errors.entity_count)}
        >
          <option value="">SELECT ENTITY COUNT...</option>
          <option value="none">NONE — No entities confirmed</option>
          <option value="low">LOW — Rare or isolated</option>
          <option value="moderate">MODERATE — Regular encounters</option>
          <option value="high">HIGH — Frequent encounters</option>
          <option value="extreme">EXTREME — Infestation level</option>
          <option value="unknown">UNKNOWN — Insufficient data</option>
        </select>
      </FieldGroup>
      <FieldGroup label="DESCRIPTION" required error={errors.description}>
        <textarea
          rows={6}
          placeholder="Full level description including environment, dangers, notable characteristics..."
          value={data.description ?? ''}
          onChange={e => onChange('description', e.target.value)}
          style={{ ...inputStyle(!!errors.description), resize: 'vertical', lineHeight: 1.7 }}
        />
      </FieldGroup>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <FieldGroup label="KNOWN ENTRANCES">
          <textarea
            rows={4}
            placeholder="One entrance per line..."
            value={data.entrances ?? ''}
            onChange={e => onChange('entrances', e.target.value)}
            style={{ ...inputStyle(false), resize: 'vertical', lineHeight: 1.7 }}
          />
        </FieldGroup>
        <FieldGroup label="KNOWN EXITS">
          <textarea
            rows={4}
            placeholder="One exit per line..."
            value={data.exits ?? ''}
            onChange={e => onChange('exits', e.target.value)}
            style={{ ...inputStyle(false), resize: 'vertical', lineHeight: 1.7 }}
          />
        </FieldGroup>
      </div>
      <FieldGroup label="RECOMMENDED SUPPLIES">
        <textarea
          rows={3}
          placeholder="List recommended supplies, one per line..."
          value={data.supplies ?? ''}
          onChange={e => onChange('supplies', e.target.value)}
          style={{ ...inputStyle(false), resize: 'vertical', lineHeight: 1.7 }}
        />
      </FieldGroup>
    </>
  )
}

function EntityForm({ errors, data, onChange }: {
  errors: FieldError
  data: Record<string, string>
  onChange: (k: string, v: string) => void
}) {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <FieldGroup label="ENTITY NUMBER" required error={errors.entity_number}>
          <input
            type="text"
            placeholder="e.g. E-001 or ASYNC-L-001"
            value={data.entity_number ?? ''}
            onChange={e => onChange('entity_number', e.target.value)}
            style={inputStyle(!!errors.entity_number)}
          />
        </FieldGroup>
        <FieldGroup label="THREAT LEVEL" required error={errors.threat_level}>
          <select
            value={data.threat_level ?? ''}
            onChange={e => onChange('threat_level', e.target.value)}
            style={selectStyle(!!errors.threat_level)}
          >
            <option value="">SELECT THREAT LEVEL...</option>
            <option value="1">THREAT 1 — Minimal</option>
            <option value="2">THREAT 2 — Low</option>
            <option value="3">THREAT 3 — Moderate</option>
            <option value="4">THREAT 4 — High</option>
            <option value="5">THREAT 5 — Extreme</option>
          </select>
        </FieldGroup>
      </div>
      <FieldGroup label="COMMON NAME" required error={errors.name}>
        <input
          type="text"
          placeholder="Common name used by operatives"
          value={data.name ?? ''}
          onChange={e => onChange('name', e.target.value)}
          style={inputStyle(!!errors.name)}
        />
      </FieldGroup>
      <FieldGroup label="HABITAT" required error={errors.habitat}>
        <input
          type="text"
          placeholder="Known levels and zones where entity is encountered"
          value={data.habitat ?? ''}
          onChange={e => onChange('habitat', e.target.value)}
          style={inputStyle(!!errors.habitat)}
        />
      </FieldGroup>
      <FieldGroup label="PHYSICAL DESCRIPTION" required error={errors.physical_description}>
        <textarea
          rows={4}
          placeholder="Detailed physical description..."
          value={data.physical_description ?? ''}
          onChange={e => onChange('physical_description', e.target.value)}
          style={{ ...inputStyle(!!errors.physical_description), resize: 'vertical', lineHeight: 1.7 }}
        />
      </FieldGroup>
      <FieldGroup label="BEHAVIORAL NOTES">
        <textarea
          rows={4}
          placeholder="Documented behavioral patterns, triggers, responses..."
          value={data.behavioral_notes ?? ''}
          onChange={e => onChange('behavioral_notes', e.target.value)}
          style={{ ...inputStyle(false), resize: 'vertical', lineHeight: 1.7 }}
        />
      </FieldGroup>
      <FieldGroup label="SURVIVAL GUIDE">
        <textarea
          rows={4}
          placeholder="Numbered survival tips, one per line..."
          value={data.survival_guide ?? ''}
          onChange={e => onChange('survival_guide', e.target.value)}
          style={{ ...inputStyle(false), resize: 'vertical', lineHeight: 1.7 }}
        />
      </FieldGroup>
    </>
  )
}

function TaleForm({ errors, data, onChange }: {
  errors: FieldError
  data: Record<string, string>
  onChange: (k: string, v: string) => void
}) {
  const storyLen = (data.story ?? '').length
  const maxLen = 50000
  return (
    <>
      <FieldGroup label="TALE TITLE" required error={errors.title}>
        <input
          type="text"
          placeholder="Title of your tale or recovered log"
          value={data.title ?? ''}
          onChange={e => onChange('title', e.target.value)}
          style={inputStyle(!!errors.title)}
        />
      </FieldGroup>
      <FieldGroup label="CANON LAYER" required error={errors.canon_layer}>
        <select
          value={data.canon_layer ?? ''}
          onChange={e => onChange('canon_layer', e.target.value)}
          style={selectStyle(!!errors.canon_layer)}
        >
          <option value="">SELECT CANON LAYER...</option>
          <option value="meg">M.E.G. CANON</option>
          <option value="async">ASYNC DIVISION (Requires Clearance 4)</option>
        </select>
      </FieldGroup>
      <FieldGroup label="STORY" required error={errors.story}>
        <textarea
          rows={16}
          placeholder="Write your tale here. First-person narratives, recovered logs, and field accounts are accepted..."
          value={data.story ?? ''}
          onChange={e => onChange('story', e.target.value)}
          style={{ ...inputStyle(!!errors.story), resize: 'vertical', lineHeight: 1.9 }}
        />
        <div
          style={{
            fontSize: '9px',
            color: storyLen > maxLen * 0.9 ? 'var(--amber)' : 'var(--text3)',
            marginTop: '4px',
            textAlign: 'right',
            letterSpacing: '1px',
          }}
        >
          {storyLen.toLocaleString()} / {maxLen.toLocaleString()} CHARACTERS
        </div>
      </FieldGroup>
    </>
  )
}

function ComingSoon({ label }: { label: string }) {
  return (
    <div
      style={{
        padding: '40px 20px',
        textAlign: 'center',
        border: '1px solid var(--border)',
        background: 'var(--bg3)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--display)',
          fontSize: '40px',
          color: 'var(--text3)',
          marginBottom: '8px',
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: '11px', color: 'var(--text3)', letterSpacing: '2px' }}>
        &gt; FORM TEMPLATE IN DEVELOPMENT — CHECK BACK LATER
      </div>
      <div style={{ fontSize: '10px', color: 'var(--text3)', marginTop: '6px' }}>
        Contact MEG-RSR-0012 for manual submission.
      </div>
    </div>
  )
}

export default function SubmitPage() {
  const [selectedType, setSelectedType] = useState<DocTypeKey | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<FieldError>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors(prev => { const n = { ...prev }; delete n[key]; return n })
  }

  const requiredFields: Record<DocTypeKey, string[]> = {
    level: ['designation', 'title', 'survival_class', 'entity_count', 'description'],
    entity: ['entity_number', 'name', 'threat_level', 'habitat', 'physical_description'],
    tale: ['title', 'canon_layer', 'story'],
    object: [],
    phenomenon: [],
    group: [],
  }

  const fieldLabels: Record<string, string> = {
    designation: 'LEVEL DESIGNATION',
    title: 'TITLE',
    survival_class: 'SURVIVAL CLASS',
    entity_count: 'ENTITY COUNT',
    description: 'DESCRIPTION',
    entity_number: 'ENTITY NUMBER',
    name: 'COMMON NAME',
    threat_level: 'THREAT LEVEL',
    habitat: 'HABITAT',
    physical_description: 'PHYSICAL DESCRIPTION',
    canon_layer: 'CANON LAYER',
    story: 'STORY',
  }

  const handleSubmit = () => {
    if (!selectedType) return
    const required = requiredFields[selectedType]
    const newErrors: FieldError = {}
    required.forEach(f => {
      if (!formData[f]?.trim()) newErrors[f] = 'FIELD REQUIRED'
    })
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setSubmitted(true)
  }

  return (
    <Shell activePath="/submit">
      
        <Sidebar activePath="/submit" />
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {/* Header */}
          <div
            style={{
              marginBottom: '20px',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '14px',
            }}
          >
            <div style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '5px' }}>
              BACK-NET — FIELD REPORT SUBMISSION
            </div>
            <div
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--white)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              SUBMIT FIELD REPORT{' '}
              <span style={{ color: '#3aaa5a', fontSize: '14px' }}>
                — CLEARANCE VERIFICATION: PASSED
              </span>
            </div>
          </div>

          {submitted ? (
            <div
              style={{
                background: 'var(--bg2)',
                border: '1px solid #1a4a28',
                padding: '30px 20px',
              }}
            >
              <div style={{ fontSize: '9px', color: '#3aaa5a', letterSpacing: '3px', marginBottom: '10px' }}>
                SUBMISSION RECEIVED
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 2, fontFamily: 'var(--mono)' }}>
                <div style={{ color: 'var(--amber)' }}>&gt; TRANSMISSION COMPLETE.</div>
                <div>&gt; REPORT TYPE: {selectedType?.toUpperCase()}</div>
                <div>&gt; FILED BY: {mockCurrentOperative.operative_id}</div>
                <div>&gt; STATUS: PENDING SENIOR REVIEW</div>
                <div>&gt; ESTIMATED PROCESSING: 24–72 HOURS</div>
                <div style={{ marginTop: '10px', color: 'var(--text3)' }}>
                  &gt; Your report will appear in the review queue. You will be notified via BACK-NET
                  message when it is approved or returned for revision.
                </div>
              </div>
              <button
                onClick={() => { setSubmitted(false); setSelectedType(null); setFormData({}) }}
                style={{
                  marginTop: '20px',
                  background: 'var(--amber-glow2)',
                  border: '1px solid var(--amber)',
                  color: 'var(--amber)',
                  fontFamily: 'var(--mono)',
                  fontSize: '11px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  letterSpacing: '1px',
                }}
              >
                SUBMIT ANOTHER REPORT
              </button>
            </div>
          ) : (
            <>
              {/* Doc type selector */}
              <div style={{ marginBottom: '20px' }}>
                <div
                  style={{
                    fontSize: '9px',
                    color: 'var(--text3)',
                    letterSpacing: '3px',
                    marginBottom: '10px',
                  }}
                >
                  SELECT REPORT TYPE
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
                  {DOC_TYPES.map(dt => (
                    <button
                      key={dt.key}
                      onClick={() => {
                        setSelectedType(dt.key)
                        setFormData({})
                        setErrors({})
                      }}
                      style={{
                        background:
                          selectedType === dt.key ? 'var(--amber-glow2)' : 'var(--bg2)',
                        border: `1px solid ${selectedType === dt.key ? 'var(--amber)' : 'var(--border)'}`,
                        padding: '14px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'border-color 0.15s, background 0.15s',
                      }}
                      onMouseEnter={e => {
                        if (selectedType !== dt.key) {
                          ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)'
                        }
                      }}
                      onMouseLeave={e => {
                        if (selectedType !== dt.key) {
                          ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                        }
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--sans)',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: selectedType === dt.key ? 'var(--amber2)' : 'var(--white)',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          marginBottom: '4px',
                        }}
                      >
                        {dt.label}
                      </div>
                      <div style={{ fontSize: '8px', color: 'var(--text3)', letterSpacing: '1px', marginBottom: '6px' }}>
                        {dt.code}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text2)' }}>
                        {dt.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              {selectedType && (
                <div
                  style={{
                    background: 'var(--bg2)',
                    border: '1px solid var(--border)',
                    padding: '20px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '9px',
                      color: 'var(--text3)',
                      letterSpacing: '3px',
                      marginBottom: '18px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid var(--border)',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>
                      {DOC_TYPES.find(d => d.key === selectedType)?.code} — FILED BY{' '}
                      {mockCurrentOperative.operative_id}
                    </span>
                    <span style={{ color: 'var(--amber-dim)' }}>
                      CLEARANCE {mockCurrentOperative.clearance} —{' '}
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>

                  {selectedType === 'level' && (
                    <LevelForm errors={errors} data={formData} onChange={handleChange} />
                  )}
                  {selectedType === 'entity' && (
                    <EntityForm errors={errors} data={formData} onChange={handleChange} />
                  )}
                  {selectedType === 'tale' && (
                    <TaleForm errors={errors} data={formData} onChange={handleChange} />
                  )}
                  {(selectedType === 'object' || selectedType === 'phenomenon' || selectedType === 'group') && (
                    <ComingSoon label={DOC_TYPES.find(d => d.key === selectedType)?.label ?? ''} />
                  )}

                  {/* Action buttons */}
                  {selectedType !== 'object' && selectedType !== 'phenomenon' && selectedType !== 'group' && (
                    <div style={{ marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                        <button
                          onClick={handleSubmit}
                          style={{
                            background: 'var(--amber-glow2)',
                            border: '1px solid var(--amber)',
                            color: 'var(--amber)',
                            fontFamily: 'var(--mono)',
                            fontSize: '11px',
                            padding: '10px 24px',
                            cursor: 'pointer',
                            letterSpacing: '2px',
                          }}
                        >
                          SUBMIT FOR REVIEW
                        </button>
                        <button
                          style={{
                            background: 'var(--bg3)',
                            border: '1px solid var(--border)',
                            color: 'var(--text3)',
                            fontFamily: 'var(--mono)',
                            fontSize: '11px',
                            padding: '10px 24px',
                            cursor: 'pointer',
                            letterSpacing: '2px',
                          }}
                        >
                          SAVE DRAFT
                        </button>
                      </div>
                      <div
                        style={{ fontSize: '10px', color: 'var(--text3)', lineHeight: 1.6, letterSpacing: '0.5px' }}
                      >
                        &gt; Your report will be reviewed by a senior operative before publication.
                        Fields marked * are required.
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </main>
          </Shell>
  )
}
