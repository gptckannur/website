import React from 'react'
import { HeartHandshake, Trophy, Palette, Calendar, ArrowRight } from 'lucide-react'
import eventsData from '../data/events.json'

const CATEGORY_MAP = {
  NSS: { icon: HeartHandshake, hue: 200 },
  Sports: { icon: Trophy, hue: 120 },
  Cultural: { icon: Palette, hue: 40 },
  Academic: { icon: Calendar, hue: 260 },
  Workshop: { icon: Calendar, hue: 180 },
  Placement: { icon: Trophy, hue: 150 },
}

const events = Array.isArray(eventsData) ? eventsData : (eventsData?.events || [])

export default function Events() {
  return (
    <section className="section events" id="events">
      <div className="container">
        <div className="section__header" data-animate="fade-up">
          <span className="section__label">Campus Life</span>
          <h2 className="section__title">Events & Activities</h2>
          <div className="section__divider"></div>
        </div>

        <div className="events__grid">
          {events.map((ev, i) => {
            const meta = CATEGORY_MAP[ev.category] || { icon: Calendar, hue: 200 }
            const Icon = meta.icon
            return (
              <div
                className={`event-card ${ev.featured ? 'event-card--featured' : ''}`}
                key={i}
                data-animate="fade-up"
                data-delay={(i + 1) * 100}
              >
                <div className="event-card__image">
                  {ev.image ? (
                    <img src={ev.image} alt={ev.title} loading="lazy" />
                  ) : (
                    <div className="event-card__image-placeholder" style={{ '--ev-hue': meta.hue }}>
                      <Icon size={48} />
                    </div>
                  )}
                <div className="event-card__date">
                  <span className="event-card__day">{ev.day}</span>
                  <span className="event-card__month">{ev.month}</span>
                </div>
              </div>
              <div className="event-card__body">
                <span className="event-card__category">{ev.category}</span>
                <h3 className="event-card__title">{ev.title}</h3>
                <p className="event-card__desc">{ev.desc}</p>
                <a href="#" className="event-card__link">
                  Read More <ArrowRight size={14} />
                </a>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
