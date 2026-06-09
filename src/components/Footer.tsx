import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Footer.css'

const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'YouTube', href: 'https://youtube.com' },
  { label: 'TikTok', href: 'https://tiktok.com' },
]

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <footer className="footer" ref={ref}>
      <motion.div
        className="footer-inner"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-brozar">BROZAR</span>
            <span className="logo-productions">PRODUCTIONS</span>
          </div>
          <p className="footer-tagline">We frame your story.</p>
        </div>

        <nav className="footer-socials">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              className="footer-social-link"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.08 }}
            >
              {s.label}
            </motion.a>
          ))}
        </nav>
      </motion.div>

      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <span>© 2025 Brozar Productions. All rights reserved.</span>
      </motion.div>
    </footer>
  )
}
