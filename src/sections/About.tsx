import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./About.css";

const stats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "8+", label: "Years Experience" },
  { value: "40+", label: "Happy Clients" },
  { value: "12", label: "Awards Won" },
];

export default function About() {
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const textInView = useInView(textRef, { once: true, margin: "-15% 0px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-10% 0px" });

  return (
    <section className="about" id="about">
      <div className="about-inner">
        <motion.div
          ref={textRef}
          className="about-text"
          initial={{ opacity: 0, x: -50 }}
          animate={textInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="about-heading">
            We Don't Shoot Video.
            <br />
            We Architect Moments.
          </h2>
          <p className="about-body">
            Dallas-based. Full-service. Every frame intentional, every cut
            purposeful — from concept to final cut.
          </p>
          <a href="#contact" className="btn-primary">
            Work With Us
          </a>
        </motion.div>

        <div className="about-stats" ref={statsRef}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1],
                delay: i * 0.1,
              }}
            >
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
