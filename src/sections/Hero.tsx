import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { industries } from '../data/industries'
import './Hero.css'

const navLinks = ['Home', 'Work', 'Contact']
const industryEntries = Object.values(industries)

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: 'easeOut', delay },
})

const DESKTOP_VIDEO = 'https://enpscpbvbmhuhuruajbu.supabase.co/storage/v1/object/public/brozarVides/hero-video-desktop.mp4'
const MOBILE_VIDEO = 'https://enpscpbvbmhuhuruajbu.supabase.co/storage/v1/object/public/brozarVides/hero-video-repsonvice.mp4'

interface HeroProps {
  industryLabel?: string
}

export default function Hero({ industryLabel }: HeroProps = {}) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <section className="hero" id="hero">

      {/* Video backgrounds */}
      <video className="hero-video hero-video--desktop" autoPlay loop muted playsInline>
        <source src={DESKTOP_VIDEO} type="video/mp4" />
      </video>
      <video className="hero-video hero-video--mobile" autoPlay loop muted playsInline>
        <source src={MOBILE_VIDEO} type="video/mp4" />
      </video>

      {/* Top bar */}
      <motion.div className="hero-topbar" {...fadeIn(0.2)}>
        <nav className="hero-topbar-right">
          {navLinks.map((l, i) => (
            <motion.a
              key={l}
              href={`#${l.toLowerCase()}`}
              {...fadeIn(0.3 + i * 0.08)}
            >
              {l}
            </motion.a>
          ))}

          {/* Video Types dropdown */}
          <div className="hero-dropdown-wrap" ref={dropdownRef}>
            <button
              className={`hero-dropdown-trigger${dropdownOpen ? ' active' : ''}`}
              onClick={() => setDropdownOpen(o => !o)}
            >
              Video Types
              <span className="hero-dropdown-arrow">▾</span>
            </button>
            {dropdownOpen && (
              <ul className="hero-dropdown">
                {industryEntries.map(ind => (
                  <li key={ind.slug}>
                    <button onClick={() => { navigate(`/${ind.slug}`); setDropdownOpen(false) }}>
                      {ind.industryLabel}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
      </motion.div>

      {/* Oversized headline */}
      <div className="hero-headline-wrap">
        <motion.h1
          className="hero-headline"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        >
          BROZAR<sup className="hero-reg">®</sup>
        </motion.h1>
        <motion.h1
          className="hero-headline hero-headline-second"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
        >
          PRODUCTIONS
        </motion.h1>
        {industryLabel && (
          <motion.p
            className="hero-industry-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.75 }}
          >
            — {industryLabel} —
          </motion.p>
        )}
      </div>

      {/* Left tick marks */}
      <div className="hero-ticks">
        {[...Array(4)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
          >
            +
          </motion.span>
        ))}
      </div>


    </section>
  )
}
