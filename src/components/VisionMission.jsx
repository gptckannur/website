import React from 'react'
import { Eye, Target, TrendingUp, Building, Handshake } from 'lucide-react'
import visionData from '../data/vision.json'

const MISSION_ICONS = [TrendingUp, Building, Handshake]

export default function VisionMission() {
  const {
    vision = 'To empower the youth by imparting excellence in technical education and prepare the students as a valuable resource for industry and society by developing effective technical competency.',
    missions = []
  } = visionData || {}

  return (
    <section className="section vision" id="vision">
      <div className="container">
        <div className="section__header" data-animate="fade-up">
          <span className="section__label">Our Purpose</span>
          <h2 className="section__title">Vision & <span className="gradient-text-slow">Mission</span></h2>
          <div className="section__divider"></div>
        </div>
        <div className="vision__grid">
          <div className="vision__card vision__card--vision" data-animate="fade-up" data-delay="100">
            <div className="vision__icon float-slow">
              <Eye />
            </div>
            <h3 className="vision__card-title">Our Vision</h3>
            <p className="vision__card-text">
              "{vision}"
            </p>
          </div>
          <div className="vision__card vision__card--mission" data-animate="fade-up" data-delay="200">
            <div className="vision__icon float-slow">
              <Target />
            </div>
            <h3 className="vision__card-title">Our Mission</h3>
            <ul className="vision__list">
              {missions.map((m, i) => {
                const text = typeof m === 'string' ? m : m?.point || ''
                const Icon = MISSION_ICONS[i] || TrendingUp
                return (
                  <li key={i}><Icon size={16} /><span>{text}</span></li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
