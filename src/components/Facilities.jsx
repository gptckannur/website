import React from 'react'
import { BookMarked, FlaskConical, Wifi, HeartHandshake, Briefcase, Dumbbell, Shield } from 'lucide-react'
import facilitiesData from '../data/facilities.json'

const ICON_MAP = {
  HeartHandshake,
  Briefcase,
  Shield,
  BookMarked,
  FlaskConical,
  Wifi,
  Dumbbell,
}

const facilities = Array.isArray(facilitiesData) ? facilitiesData : (facilitiesData?.facilities || [])

export default function Facilities() {
  return (
    <section className="section facilities" id="facilities">
      <div className="container">
        <div className="section__header" data-animate="fade-up">
          <span className="section__label">Infrastructure</span>
          <h2 className="section__title">Campus Facilities</h2>
          <div className="section__divider"></div>
        </div>

        <div className="facilities__grid">
          {facilities.map((f, i) => {
            const Icon = ICON_MAP[f.icon] || BookMarked
            return (
              <div
                className={`facility-card ${f.image ? 'facility-card--has-image' : ''}`}
                id={f.id || `facility-${i}`}
                key={f.id || i}
                data-animate="fade-up"
                data-delay={(i + 1) * 60}
              >
                {f.image && (
                  <div className="facility-card__thumb">
                    <img src={f.image} alt={f.title} loading="lazy" />
                  </div>
                )}
                <div className="facility-card__body">
                  <div className="facility-card__icon-badge">
                    <Icon />
                  </div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
