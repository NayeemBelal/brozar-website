import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Contact.css'

export default function Contact() {
  const leftRef = useRef(null)
  const formRef = useRef(null)
  const leftInView = useInView(leftRef, { once: true, margin: '-15% 0px' })
  const formInView = useInView(formRef, { once: true, margin: '-10% 0px' })

  return (
    <section className="contact" id="contact">
      <div className="contact-inner">

        <motion.div
          ref={leftRef}
          className="contact-left"
          initial={{ opacity: 0, x: -40 }}
          animate={leftInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="contact-eyebrow">Get In Touch</span>
          <h2 className="contact-heading">
            <span className="contact-heading-solid">Let's Create</span>
            <span className="contact-heading-stroke">Something</span>
            <span className="contact-heading-solid">Worth Watching.</span>
          </h2>
          <p className="contact-body">
            Have a project in mind? Reach out — let's build something worth watching.
          </p>
          <div className="contact-info">
            <a href="mailto:hello@brozarproductions.com" className="contact-link">
              hello@brozarproductions.com
            </a>
            <a href="tel:+14045550100" className="contact-link">
              +1 (404) 555-0100
            </a>
          </div>
        </motion.div>

        <motion.form
          ref={formRef}
          className="contact-form"
          onSubmit={(e) => e.preventDefault()}
          initial={{ opacity: 0, y: 50 }}
          animate={formInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          {[
            <div className="form-row" key="row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" placeholder="Your name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="your@email.com" />
              </div>
            </div>,
            <div className="form-group" key="project">
              <label htmlFor="project">Project Type</label>
              <select id="project">
                <option value="">Select a service</option>
                <option>Music Video</option>
                <option>Brand Film</option>
                <option>Event Coverage</option>
                <option>Documentary</option>
                <option>Social Content</option>
                <option>Post Production</option>
              </select>
            </div>,
            <div className="form-group" key="message">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={5} placeholder="Tell us about your project..." />
            </div>,
            <button type="submit" className="contact-submit" key="submit">
              <span>Send It</span>
              <span className="contact-submit-arrow">→</span>
            </button>,
          ].map((el, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.1 }}
            >
              {el}
            </motion.div>
          ))}
        </motion.form>

      </div>
    </section>
  )
}
