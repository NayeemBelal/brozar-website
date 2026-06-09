import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Project } from '../data/industries'
import WorkItem from './WorkItem'
import './Work.css'

const defaultProjects: Project[] = [
  {
    id: 3,
    title: 'TAMU MSA Showdown',
    category: 'Promo Video',
    year: '2025',
    youtubeId: 'mZiZNe5KwQo',
    description:
      'High-energy promo coverage of the TAMU MSA Showdown — built to capture the competition, energy, and culture of the event.',
  },
  {
    id: 2,
    title: 'ICBCS Free Health Clinic',
    category: 'Documentary',
    year: '2024',
    youtubeId: 'fWDalFFlMx4',
    description:
      'A documentary covering the ICBCS Free Health Clinic — highlighting community service and the people who show up when it matters.',
  },
  {
    id: 1,
    title: 'Adel',
    category: 'Documentary',
    year: '2024',
    youtubeId: 'Du43rekPGAs',
    vertical: true,
    description:
      'An intimate portrait following the journey of Adel — raw, unscripted moments captured through cinematic storytelling.',
  },
]


interface WorkProps {
  projects?: Project[]
  sectionTitle?: string
}

export default function Work({ projects = defaultProjects, sectionTitle = 'THE\nWORK\nSPEAKS' }: WorkProps) {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-20% 0px' })
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  useEffect(() => {
    if (!activeVideo) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveVideo(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeVideo])

  const titleLines = sectionTitle.split('\n')

  return (
    <section className="work" id="work">
      <div className="work-heading" ref={headingRef}>
        <motion.h2
          className="work-title"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={headingInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {titleLines.map((line, i) => (
            <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>
          ))}
        </motion.h2>
      </div>

      {projects.length === 0 ? (
        <div className="work-empty">
          <p>Projects coming soon.</p>
        </div>
      ) : (
      <div className="work-list">
        {projects.map((p, i) => (
          <WorkItem key={p.id} project={p} index={i} onOpen={setActiveVideo} />
        ))}
      </div>
      )}

      {activeVideo && (
        <div className="lightbox-backdrop" onClick={() => setActiveVideo(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setActiveVideo(null)} aria-label="Close">
              ×
            </button>
            <iframe
              className="lightbox-iframe"
              src={`https://www.youtube-nocookie.com/embed/${activeVideo}?autoplay=1&controls=1&rel=0&modestbranding=1`}
              title="Video player"
              allow="autoplay; fullscreen; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  )
}
