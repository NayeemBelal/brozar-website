import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import type { DbProject } from '../lib/supabase'
import { industries, INDUSTRY_KEYS } from '../data/industries'
import WorkItem from '../sections/WorkItem'
import type { Project } from '../data/industries'
import './AdminPage.css'

const CATEGORIES = ['Documentary', 'Promo Video', 'Brand Film', 'Event Coverage', 'Social Content']

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string

function extractYouTubeId(input: string): string | null {
  if (!input) return null
  const s = input.trim()
  // Already an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s
  // youtube.com/watch?v=...
  const watchMatch = s.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  if (watchMatch) return watchMatch[1]
  // youtu.be/...
  const shortMatch = s.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (shortMatch) return shortMatch[1]
  // youtube.com/shorts/...
  const shortsMatch = s.match(/\/shorts\/([a-zA-Z0-9_-]{11})/)
  if (shortsMatch) return shortsMatch[1]
  return null
}


type FormState = {
  youtubeUrl: string
  title: string
  category: string
  year: string
  description: string
  vertical: boolean
}

const emptyForm: FormState = {
  youtubeUrl: '',
  title: '',
  category: 'Documentary',
  year: new Date().getFullYear().toString(),
  description: '',
  vertical: false,
}

// ── Password Gate ────────────────────────────────────────
function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_authed', '1')
      onAuth()
    } else {
      setError(true)
      setPw('')
      setTimeout(() => setError(false), 600)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="admin-gate">
      <div className="admin-gate-box">
        <p className="admin-gate-title">BROZAR ADMIN</p>
        <p className="admin-gate-sub">Enter your password to continue.</p>
        <form onSubmit={submit}>
          <input
            ref={inputRef}
            type="password"
            placeholder="Password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            className={`admin-gate-input${error ? ' error' : ''}`}
            autoFocus
          />
          {error && <p className="admin-gate-error">Incorrect password.</p>}
          <button type="submit" className="admin-gate-btn">Enter Dashboard →</button>
        </form>
      </div>
    </div>
  )
}

// ── Main Dashboard ───────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_authed') === '1')

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />

  return <Dashboard onLogout={() => { sessionStorage.removeItem('admin_authed'); setAuthed(false) }} />
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState(INDUSTRY_KEYS[0])
  const [projects, setProjects] = useState<DbProject[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [urlError, setUrlError] = useState('')

  const fetchProjects = async (industry: string) => {
    setLoading(true)
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('industry', industry)
      .order('sort_order')
    setProjects(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects(activeTab)
    setForm(emptyForm)
    setEditingId(null)
    setUrlError('')
  }, [activeTab])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setUrlError('')
  }

  const startEdit = (row: DbProject) => {
    setEditingId(row.id)
    setForm({
      youtubeUrl: row.youtube_id,
      title: row.title,
      category: row.category,
      year: row.year,
      description: row.description,
      vertical: row.vertical,
    })
    setUrlError('')
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this project?')) return
    await supabase.from('projects').delete().eq('id', id)
    if (editingId === id) resetForm()
    fetchProjects(activeTab)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const youtubeId = extractYouTubeId(form.youtubeUrl)
    if (!youtubeId) {
      setUrlError('Could not extract a YouTube ID from this URL.')
      return
    }
    setUrlError('')
    setSaving(true)

    const payload = {
      industry: activeTab,
      title: form.title,
      category: form.category,
      year: form.year,
      youtube_id: youtubeId,
      description: form.description,
      vertical: form.vertical,
      sort_order: editingId ? undefined : projects.length,
    }

    if (editingId) {
      await supabase.from('projects').update(payload).eq('id', editingId)
    } else {
      await supabase.from('projects').insert(payload)
    }

    setSaving(false)
    resetForm()
    fetchProjects(activeTab)
  }

  // Build live preview project
  const previewYoutubeId = extractYouTubeId(form.youtubeUrl)
  const previewProject: Project | null =
    previewYoutubeId && form.title
      ? {
          id: 'preview',
          title: form.title,
          category: form.category,
          year: form.year,
          youtubeId: previewYoutubeId,
          vertical: form.vertical,
          description: form.description,
        }
      : null

  return (
    <div className="admin">
      <header className="admin-header">
        <div className="admin-header-logo">
          <span className="logo-brozar">BROZAR</span>
          <span className="admin-header-badge">Admin Dashboard</span>
        </div>
        <button className="admin-logout" onClick={onLogout}>Log Out</button>
      </header>

      <div className="admin-body">
        {/* Industry tabs */}
        <div className="admin-tabs">
          {INDUSTRY_KEYS.map(key => (
            <button
              key={key}
              className={`admin-tab${activeTab === key ? ' active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {industries[key].industryLabel}
            </button>
          ))}
        </div>

        <div className="admin-columns">
          {/* Left: existing projects */}
          <div>
            <p className="admin-section-title">Projects</p>

            {loading ? (
              <div className="admin-empty">Loading…</div>
            ) : projects.length === 0 ? (
              <div className="admin-empty">No projects yet for this industry.</div>
            ) : (
              <div className="admin-project-list">
                {projects.map(row => (
                  <div
                    key={row.id}
                    className={`admin-project-row${editingId === row.id ? ' editing' : ''}`}
                  >
                    <div className="admin-project-info">
                      <span className="admin-project-name">{row.title}</span>
                      <span className="admin-project-meta">{row.category} · {row.year}</span>
                    </div>
                    <div className="admin-project-actions">
                      <button className="admin-btn-icon" title="Edit" onClick={() => startEdit(row)}>✏</button>
                      <button className="admin-btn-icon delete" title="Delete" onClick={() => handleDelete(row.id)}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button className="admin-add-btn" onClick={resetForm}>+ Add Project</button>
          </div>

          {/* Right: form + preview */}
          <div className="admin-right">
            <form className="admin-form" onSubmit={handleSave}>
              <p className="admin-form-title">{editingId ? 'Edit Project' : 'New Project'}</p>

              <div className="admin-field">
                <label>YouTube URL or Video ID</label>
                <input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={form.youtubeUrl}
                  onChange={e => setForm(f => ({ ...f, youtubeUrl: e.target.value }))}
                  className={urlError ? 'invalid' : ''}
                  required
                />
                {urlError && <span className="field-error">{urlError}</span>}
              </div>

              <div className="admin-field">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Project title"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  required
                />
              </div>

              <div className="admin-form-row">
                <div className="admin-field">
                  <label>Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="admin-field">
                  <label>Year</label>
                  <input
                    type="text"
                    placeholder="2025"
                    value={form.year}
                    onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="admin-field">
                <label>Description</label>
                <textarea
                  rows={3}
                  placeholder="Short description of the project..."
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  required
                />
              </div>

              <div className="admin-checkbox-row">
                <input
                  type="checkbox"
                  id="vertical"
                  checked={form.vertical}
                  onChange={e => setForm(f => ({ ...f, vertical: e.target.checked }))}
                />
                <label htmlFor="vertical">Vertical video (YouTube Shorts / portrait format)</label>
              </div>

              <div className="admin-form-actions">
                <button type="submit" className="admin-save-btn" disabled={saving}>
                  {saving ? 'Saving…' : editingId ? 'Save Changes' : 'Add Project'}
                </button>
                {editingId && (
                  <button type="button" className="admin-cancel-btn" onClick={resetForm}>Cancel</button>
                )}
              </div>
            </form>

            {/* Live preview */}
            <div>
              <p className="admin-preview-label">Live Preview</p>
              {previewProject ? (
                <div className="admin-preview-wrap">
                  <WorkItem project={previewProject} index={0} onOpen={() => {}} />
                </div>
              ) : (
                <div className="admin-preview-empty">
                  Fill in a YouTube URL and title to see a preview.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
