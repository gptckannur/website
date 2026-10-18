import React from 'react'
import { BookOpen, Rocket, Monitor, FileText } from 'lucide-react'
import useTilt from '../hooks/useTilt'
import academicsData from '../data/academics.json'

const ICON_MAP = { BookOpen, Rocket, Monitor, FileText }

const programs = (Array.isArray(academicsData) ? academicsData : (academicsData?.programs || [])).map((p, i) => ({
  ...p,
  delay: (i + 1) * 100,
}))

function AcademicCard({ prog }) {
  const Icon = ICON_MAP[prog.icon] || BookOpen
  const tiltRef = useTilt({ max: 12, scale: 1.05, speed: 400 })
  
  return (
    <div ref={tiltRef} className="academic-card float-slow" data-animate="fade-up" data-delay={prog.delay}>
      <div className="academic-card__icon">
        <Icon />
      </div>
      <h3>{prog.title}</h3>
      <p>{prog.desc}</p>
      {prog.tag && <span className="academic-card__tag">{prog.tag}</span>}
      {prog.link && (
        <a href={prog.link} target="_blank" rel="noopener noreferrer" className="academic-card__link">
          {prog.linkText}
        </a>
      )}
    </div>
  )
}

export default function Academics() {
  return (
    <section className="section academics" id="academics">
      <div className="container">
        <div className="section__header" data-animate="fade-up">
          <span className="section__label">Academics</span>
          <h2 className="section__title">Programmes <span className="gradient-text-slow">&amp; Resources</span></h2>
          <div className="section__divider"></div>
        </div>

        <div className="academics__grid">
          {programs.map((prog, i) => (
            <AcademicCard key={i} prog={prog} />
          ))}
        </div>
      </div>
    </section>
  )
}
