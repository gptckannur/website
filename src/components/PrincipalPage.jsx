import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Lenis from 'lenis'
import { ArrowLeft, Phone, Mail, Quote, GraduationCap, Lightbulb, Users, Target } from 'lucide-react'
import { LOGO, PRINCIPAL_PHOTO } from '../mediaPaths'
import principalData from '../data/principal.json'

export default function PrincipalPage() {
  const {
    name = 'Dr. Asha Sukumaran',
    designation = 'Principal',
    institution = 'Govt. Polytechnic College Thottada',
    photo = PRINCIPAL_PHOTO,
    phone = '9400210189',
    email = 'kannurgptc@gmail.com',
    fullMessageTitle = "Empowering Tomorrow's Technologists Today",
    leadText = 'Govt.Polytechnic College Thottada is a leading institution dedicated to empowering the youth...',
    paragraphs = [],
    closingText = "Join us in shaping the next generation of skilled professionals and entrepreneurs, driving Kerala's technological advancement and economic growth."
  } = principalData || {}
  // Scroll-reveal observer
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay) || 0
            setTimeout(() => entry.target.classList.add('in-view'), delay)
            observer.unobserve(entry.target)
          }
        }),
        { rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
      )
      document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
      return () => observer.disconnect()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="principal-page">
      {/* Minimal top nav for the page */}
      <nav className="principal-page__nav">
        <div className="container principal-page__nav-inner">
          <Link to="/" className="principal-page__back">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <div className="principal-page__nav-brand">
            <img src={LOGO} alt="GPTC Kannur" className="navbar__logo-img" />
            <span>Govt. Polytechnic College, Kannur</span>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="principal-page__hero">
        <div className="principal-page__hero-bg"></div>
        <div className="principal-page__hero-overlay"></div>
        <div className="container principal-page__hero-content">
          <span className="principal-page__label">From the Desk of the Principal</span>
          <h1 className="principal-page__hero-title">{name}</h1>
          <p className="principal-page__hero-subtitle">{designation}, {institution}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="principal-page__content">
        <div className="container">
          <div className="principal-page__grid">
            {/* Left: Image & Contact Card */}
            <aside className="principal-page__sidebar" data-animate="fade-right">
              <div className="principal-page__photo-card">
                <div className="principal-page__photo-wrapper">
                  <img
                    src={photo || PRINCIPAL_PHOTO}
                    alt={`${name} - ${designation} of ${institution}`}
                    className="principal-page__photo"
                  />
                  <div className="principal-page__photo-accent"></div>
                </div>
                <div className="principal-page__photo-info">
                  <h3>{name}</h3>
                  <span className="principal-page__designation">{designation}</span>
                  <span className="principal-page__institution">{institution}</span>
                </div>
                <div className="principal-page__contact-list">
                  {phone && (
                    <a href={`tel:${phone}`} className="principal-page__contact-item">
                      <Phone size={16} />
                      <span>{phone}</span>
                    </a>
                  )}
                  {email && (
                    <a href={`mailto:${email}`} className="principal-page__contact-item">
                      <Mail size={16} />
                      <span>{email}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Vision Highlights */}
              <div className="principal-page__highlights">
                <div className="principal-page__highlight-item" data-animate="fade-up" data-delay="100">
                  <div className="principal-page__highlight-icon">
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <h4>Technical Excellence</h4>
                    <p>Imparting finest quality skill education</p>
                  </div>
                </div>
                <div className="principal-page__highlight-item" data-animate="fade-up" data-delay="200">
                  <div className="principal-page__highlight-icon">
                    <Lightbulb size={22} />
                  </div>
                  <div>
                    <h4>Innovation & Research</h4>
                    <p>Encouraging research and innovative thinking</p>
                  </div>
                </div>
                <div className="principal-page__highlight-item" data-animate="fade-up" data-delay="300">
                  <div className="principal-page__highlight-icon">
                    <Users size={22} />
                  </div>
                  <div>
                    <h4>Industry Partnerships</h4>
                    <p>Strategic collaborations for real-world readiness</p>
                  </div>
                </div>
                <div className="principal-page__highlight-item" data-animate="fade-up" data-delay="400">
                  <div className="principal-page__highlight-icon">
                    <Target size={22} />
                  </div>
                  <div>
                    <h4>Holistic Development</h4>
                    <p>Nurturing socially responsible leaders</p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right: Message Content */}
            <article className="principal-page__message-area" data-animate="fade-up">
              <div className="principal-page__quote-block">
                <Quote size={40} className="principal-page__quote-icon" />
                <h2 className="principal-page__message-title">
                  {fullMessageTitle}
                </h2>
              </div>

              <div className="principal-page__body">
                {leadText && (
                  <p className="principal-page__lead-text">
                    {leadText}
                  </p>
                )}

                {paragraphs.map((p, i) => (
                  <p key={i}>{typeof p === 'string' ? p : p?.paragraph || ''}</p>
                ))}

                {closingText && (
                  <p className="principal-page__closing-text">
                    {closingText}
                  </p>
                )}
              </div>

              <div className="principal-page__signature">
                <div className="principal-page__signature-line"></div>
                <div className="principal-page__signature-info">
                  <strong>{name}</strong>
                  <span>{designation}</span>
                  <span>{institution}, Kannur</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="principal-page__cta">
        <div className="container principal-page__cta-inner">
          <p>Want to know more about our institution?</p>
          <Link to="/" className="btn btn--primary">
            <ArrowLeft size={18} />
            Back to Homepage
          </Link>
        </div>
      </section>
    </div>
  )
}
