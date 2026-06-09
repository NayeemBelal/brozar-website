import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../sections/Hero'
import Work from '../sections/Work'
import Contact from '../sections/Contact'
import { industries } from '../data/industries'
import type { Project } from '../data/industries'
import { supabase } from '../lib/supabase'
import type { DbProject } from '../lib/supabase'

function dbToProject(row: DbProject): Project {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    year: row.year,
    youtubeId: row.youtube_id,
    vertical: row.vertical,
    description: row.description,
  }
}

export default function IndustryPage() {
  const { industry } = useParams<{ industry: string }>()
  const config = industry ? industries[industry] : undefined

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!config) return
    setLoading(true)
    supabase
      .from('projects')
      .select('*')
      .eq('industry', industry)
      .order('sort_order')
      .then(({ data, error }) => {
        if (!error && data) setProjects(data.map(dbToProject))
        setLoading(false)
      })
  }, [industry, config])

  if (!config) return <Navigate to="/" replace />

  return (
    <>
      <Navbar />
      <main>
        <Hero industryLabel={config.industryLabel} />
        {!loading && (
          <Work projects={projects} sectionTitle={config.workTitle} />
        )}
        <Contact />
      </main>
      <Footer />
    </>
  )
}
