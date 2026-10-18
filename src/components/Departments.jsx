import React from 'react'
import { Link } from 'react-router-dom'
import { Building2, Zap, Cpu, Cog, Shirt, Trees, Clock, Users, ArrowRight } from 'lucide-react'
import useTilt from '../hooks/useTilt'
import deptCardsData from '../data/department_cards.json'

const ICON_MAP = { Building2, Zap, Cpu, Cog, Shirt, Trees }

const rawDepts = Array.isArray(deptCardsData) ? deptCardsData : (deptCardsData?.departments || [])

const departments = rawDepts.map((d, i) => ({
  ...d,
  id: `dept-${d.slug}`,
  delay: ((i % 3) + 1) * 100,
}))

function DeptCard({ dept }) {
  const Icon = ICON_MAP[dept.icon] || Building2
  const tiltRef = useTilt({ max: 15, scale: 1.05, speed: 400 })

  return (
    <div ref={tiltRef} className="dept-card" id={dept.id} data-animate="fade-up" data-delay={dept.delay} style={{ '--dept-hue': dept.hue }}>
      <><div className="dept-card__icon-wrap float-slow" style={{ '--dept-hue': dept.hue }}>
        <Icon />
      </div><h3 className="dept-card__title">{dept.title}</h3><p className="dept-card__desc">{dept.desc}</p><div className="dept-card__meta">
          <span><Clock size={14} /> {dept.duration}</span>
          <span><Users size={14} /> {dept.seats}</span>
        </div><Link to={`/department/${dept.slug}`} className="dept-card__link">
          Learn More <ArrowRight size={14} />
        </Link></>
    </div>
  )
}

export default function Departments() {
  return (
    <section className="section departments" id="departments">
      <div className="container">
        <div className="section__header" data-animate="fade-up">
          <span className="section__label float-fast">What We Offer</span>
          <h2 className="section__title">Our <span className="gradient-text-slow">Departments</span></h2>
          <div className="section__divider"></div>
          <p className="section__subtitle">Six diverse engineering disciplines nurturing the technical leaders of tomorrow</p>
        </div>
        <div className="departments__grid">
          {departments.map((dept) => (
            <DeptCard key={dept.id} dept={dept} />
          ))}
        </div>
      </div>
    </section>
  )
}
