import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, GraduationCap, Phone, Mail, Briefcase, UserCheck } from 'lucide-react'
import { LOGO } from '../mediaPaths'
import generalData from '../data/faculty/general.json'

const facultyMembers = generalData.facultyMembers || []

function FacultyCard({ member, index }) {
  const initials = member.name
    ? member.name.replace(/^Dr\.?\s*/i, '').split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2)
    : 'GF'

  return (
    <div
      className="faculty-card faculty-card--with-contact"
      data-animate="fade-up"
      data-delay={index * 50}
    >
      <div className="faculty-card__avatar">
        {member.image ? (
          <img src={member.image} alt={member.name} loading="lazy" />
        ) : (
          <div className="faculty-card__initials">{initials}</div>
        )}
      </div>
      <div className="faculty-card__info">
        {member.subject && (
          <span className="faculty-card__tag">{member.subject}</span>
        )}
        <h3 className="faculty-card__name">{member.name}</h3>
        <span className="faculty-card__designation">{member.designation}</span>

        {(member.mobile || member.email) && (
          <div className="faculty-card__contact">
            {member.mobile && (
              <a href={`tel:${member.mobile.replace(/\s+/g, '')}`} className="faculty-card__contact-item">
                <Phone size={14} />
                <span>{member.mobile}</span>
              </a>
            )}
            {member.email && (
              <a href={`mailto:${member.email}`} className="faculty-card__contact-item">
                <Mail size={14} />
                <span>{member.email}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function GeneralStaffPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
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
    <div className="subpage">
      {/* Top Nav */}
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

      {/* Hero */}
      <section className="dept-page__hero" style={{ '--dept-hue': 175 }}>
        <div className="dept-page__hero-bg"></div>
        <div className="dept-page__hero-overlay"></div>
        <div className="container dept-page__hero-content">
          <div className="dept-page__hero-icon">
            <BookOpen size={44} />
          </div>
          <h1 className="dept-page__hero-title">General Department Faculty</h1>
          <p className="dept-page__hero-subtitle">
            Faculty in Applied Sciences &amp; Humanities (Mathematics, Physics, Chemistry, English, and Physical Education).
          </p>
          <div className="dept-page__hero-meta">
            <span><GraduationCap size={16} /> {facultyMembers.length} Teaching Faculty</span>
          </div>

          <div className="staff-tabs" style={{ marginTop: '28px' }}>
            <Link to="/office-staff" className="staff-tab-btn">
              <Briefcase size={16} />
              <span>Office Staff &amp; Workers</span>
            </Link>
            <Link to="/general-staff" className="staff-tab-btn active">
              <GraduationCap size={16} />
              <span>General Department Faculty</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section: Applied Science & Humanities Faculty */}
      <section className="dept-page__section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 36px' }}>
            <h2 className="dept-page__section-title" style={{ justifyContent: 'center' }} data-animate="fade-up">
              <GraduationCap size={24} />
              Applied Sciences &amp; Humanities
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.6' }} data-animate="fade-up" data-delay="100">
              Foundational faculty members guiding students across Mathematics, Physics, Chemistry, English, and Physical Education disciplines.
            </p>
          </div>

          {facultyMembers.length > 0 ? (
            <div className="faculty-grid">
              {facultyMembers.map((member, i) => (
                <FacultyCard key={member.name || i} member={member} index={i} />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '48px 24px',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px dashed var(--border)',
                maxWidth: '600px',
                margin: '0 auto',
                color: 'var(--text-muted)'
              }}
            >
              <UserCheck size={36} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
              <p style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '6px' }}>
                Faculty details will be updated soon.
              </p>
              <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                Faculty entries can be managed directly via the CMS Admin panel.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Switcher CTA */}
      <section className="principal-page__cta">
        <div className="container principal-page__cta-inner">
          <p>Looking for Administrative Office &amp; Support staff?</p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/office-staff" className="btn btn--primary">
              <Briefcase size={18} />
              View Office Staff &amp; Workers
            </Link>
            <Link to="/" className="btn btn--secondary">
              <ArrowLeft size={18} />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
