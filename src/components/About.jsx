import React from 'react'
import { CheckCircle, MapPin, Calendar, Building, Factory } from 'lucide-react'
import { COLLEGE_GATE } from '../mediaPaths'
import aboutData from '../data/about.json'

export default function About() {
  const {
    estYear = '1958',
    heading = 'A Legacy of Technical Excellence',
    paragraphs = [],
    highlights = [
      'AICTE Approved',
      'SBTE Kerala Affiliated',
      'Government Institution',
      '6 Engineering Departments',
      'Established 1958',
      'Boys Hostel Facility',
    ]
  } = aboutData || {}

  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="section__header" data-animate="fade-up">
          <span className="section__label">About Us</span>
          <h2 className="section__title">The <span className="gradient-text-slow">College</span></h2>
          <div className="section__divider"></div>
        </div>

        <div className="about__grid">
          <div className="about__image-wrapper" data-animate="fade-right">
            <div className="about__image-card">
              <img
                src={COLLEGE_GATE}
                alt="GPTC Kannur Campus"
                loading="lazy"
              />
              <div className="about__image-overlay">
                <span>Est. {estYear}</span>
              </div>
            </div>
          </div>
          <div className="about__content" data-animate="fade-left">
            <h3 className="about__heading">{heading}</h3>
            {paragraphs.map((p, i) => {
              const text = typeof p === 'string' ? p : p?.paragraph || ''
              return (
                <p className="about__text" key={i}>
                  {text}
                </p>
              )
            })}
            <div className="about__highlights">
              {highlights.map((rawItem, i) => {
                const itemText = typeof rawItem === 'string' ? rawItem : rawItem?.item || ''
                const lower = itemText.toLowerCase()
                const isEst = lower.includes('established')
                const isHostel = lower.includes('hostel')
                const Icon = isEst ? Calendar : isHostel ? Building : CheckCircle
                return (
                  <div className="about__highlight" key={i}>
                    <Icon size={16} />
                    <span>{itemText}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
