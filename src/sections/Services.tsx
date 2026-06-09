import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Services.css'

const services = [
  { icon: '◈', title: 'Music Videos', description: 'Visually driven productions that amplify your sound and brand identity.' },
  { icon: '◇', title: 'Brand Films', description: 'Cinematic storytelling that captures the essence of your brand.' },
  { icon: '◉', title: 'Event Coverage', description: 'Multi-camera coverage with same-day highlight delivery.' },
  { icon: '◈', title: 'Documentaries', description: 'Long-form narrative content told with honesty and craft.' },
  { icon: '◻', title: 'Social Content', description: 'Short-form vertical and horizontal cuts optimized for every platform.' },
  { icon: '◆', title: 'Post Production', description: 'Color grading, sound design, and motion graphics in-house.' },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <section className="services" id="services">
      <div className="services-inner">
        <div className="section-header" ref={ref}>
          <motion.p
            className="section-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            What We Do
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            Services
          </motion.h2>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      className="service-card"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.1 }}
    >
      <span className="service-icon">{service.icon}</span>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-desc">{service.description}</p>
      <div className="service-line" />
    </motion.div>
  )
}
