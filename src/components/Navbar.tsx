import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { industries } from '../data/industries'
import './Navbar.css'

const navLinks = ['Work', 'Services', 'About', 'Contact']

const industryEntries = Object.values(industries)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleIndustryClick = (slug: string) => {
    navigate(`/${slug}`)
    setDropdownOpen(false)
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar ${visible ? 'navbar-visible' : ''}`}>
      <a href="#hero" className="navbar-logo">
        <span className="logo-brozar">BROZAR</span>
        <span className="logo-productions">PRODUCTIONS</span>
      </a>

      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              {link}
            </a>
          </li>
        ))}

        {/* Video Types dropdown */}
        <li className="navbar-dropdown-wrap" ref={dropdownRef}>
          <button
            className={`navbar-dropdown-trigger${dropdownOpen ? ' active' : ''}`}
            onClick={() => setDropdownOpen(o => !o)}
            aria-expanded={dropdownOpen}
          >
            Video Types
            <span className="navbar-dropdown-arrow">▾</span>
          </button>
          {dropdownOpen && (
            <ul className="navbar-dropdown">
              {industryEntries.map(ind => (
                <li key={ind.slug}>
                  <button onClick={() => handleIndustryClick(ind.slug)}>
                    {ind.industryLabel}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>

        <li>
          <a href="#contact" className="navbar-cta" onClick={() => setMenuOpen(false)}>
            Book Now
          </a>
        </li>
      </ul>

      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  )
}
