import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Project } from '../data/industries'

export default function WorkItem({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: (id: string) => void
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const isReversed = index % 2 === 1

  const previewSrc = `https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&mute=1&loop=1&controls=0&playlist=${project.youtubeId}&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&fs=0&cc_load_policy=0&showinfo=0`

  const videoEl = (
    <div className="work-item-thumb">
      <iframe
        className={`work-item-iframe${project.vertical ? ' work-item-iframe--vertical' : ''}`}
        src={previewSrc}
        title={project.title}
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
      <div className="work-item-overlay" onClick={() => onOpen(project.youtubeId)} />
      <button
        className="work-details-btn"
        aria-label="Watch video"
        onClick={() => onOpen(project.youtubeId)}
      >
        WATCH
      </button>
    </div>
  )

  const descEl = (
    <div className="work-item-desc">
      <span className="work-item-category">{project.category}</span>
      <h3 className="work-item-title">{project.title}</h3>
      <span className="work-item-year">({project.year})</span>
      <p className="work-item-body">{project.description}</p>
      <button className="work-item-watch" onClick={() => onOpen(project.youtubeId)}>
        Watch Film
      </button>
    </div>
  )

  return (
    <motion.div
      ref={ref}
      className={`work-item${isReversed ? ' work-item--reversed' : ''}`}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
    >
      {isReversed ? <>{descEl}{videoEl}</> : <>{videoEl}{descEl}</>}
    </motion.div>
  )
}
