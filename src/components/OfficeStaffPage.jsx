import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Building2, Users, Briefcase, Phone, Mail, GraduationCap, UserCheck } from 'lucide-react'
import { LOGO } from '../mediaPaths'
import officeData from '../data/faculty/office.json'

const officeStaff = officeData.officeStaff || []
const officeWorkers = officeData.officeWorkers || []

function StaffCard({ member, index, isWorker = false }) {
  const initials = member.name
    ? member.name.replace(/^Dr\.?\s*/i, '').split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2)
    : 'ST'

  return (
    <div
      className={`faculty-card ${isWorker ? 'faculty-card--worker' : 'faculty-card--with-contact'}`}
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
        {member.section && (
          <span className="faculty-card__tag">{member.section}</span>
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

function EmptyNotice({ title = 'Staff details will be updated soon.' }) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '44px 20px',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px dashed var(--border)',
        maxWidth: '560px',
        margin: '0 auto',
        color: 'var(--text-muted)'
      }}
    >
      <UserCheck size={36} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
      <p style={{ fontSize: '0.98rem', fontWeight: '500', marginBottom: '6px' }}>{title}</p>
      <p style={{ fontSize: '0.84rem', opacity: 0.8 }}>Staff entries can be added anytime through the CMS admin panel.</p>
    </div>
  )
}

export default function OfficeStaffPage() {
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
      <section className="dept-page__hero" style={{ '--dept-hue': 218 }}>
        <div className="dept-page__hero-bg"></div>
        <div className="dept-page__hero-overlay"></div>
        <div className="container dept-page__hero-content">
          <div className="dept-page__hero-icon">
            <Building2 size={44} />
          </div>
          <h1 className="dept-page__hero-title">Administrative &amp; Office Staff</h1>
          <p className="dept-page__hero-subtitle">
            Ministerial officers, administrative personnel, and essential support workers maintaining seamless college operations.
          </p>
          <div className="dept-page__hero-meta">
            <span><Briefcase size={16} /> {officeStaff.length} Office &amp; Ministerial Staff</span>
            <span><Users size={16} /> {officeWorkers.length} Office Workers &amp; Support Staff</span>
          </div>

          <div className="staff-tabs" style={{ marginTop: '28px' }}>
            <Link to="/office-staff" className="staff-tab-btn active">
              <Briefcase size={16} />
              <span>Office Staff &amp; Workers</span>
            </Link>
            <Link to="/general-staff" className="staff-tab-btn">
              <GraduationCap size={16} />
              <span>General Department Faculty</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 1: Office & Ministerial Staff */}
      <section className="dept-page__section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 36px' }}>
            <h2 className="dept-page__section-title" style={{ justifyContent: 'center' }} data-animate="fade-up">
              <Briefcase size={24} />
              Office &amp; Ministerial Staff
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.6' }} data-animate="fade-up" data-delay="100">
              Superintendents, accountants, clerks, and executive staff managing admissions, examinations, establishment, and administrative functions.
            </p>
          </div>

          {officeStaff.length > 0 ? (
            <div className="faculty-grid">
              {officeStaff.map((member, i) => (
                <StaffCard key={member.name || i} member={member} index={i} />
              ))}
            </div>
          ) : (
            <EmptyNotice title="Office and administrative staff details will be updated soon." />
          )}
        </div>
      </section>

      {/* Section 2: Office Workers & Support Staff */}
      <section className="dept-page__section dept-page__section--alt">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 36px' }}>
            <h2 className="dept-page__section-title" style={{ justifyContent: 'center' }} data-animate="fade-up">
              <Users size={24} />
              Office Workers &amp; Support Staff
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.6' }} data-animate="fade-up" data-delay="100">
              Dedicated frontline workers, office attendants, transport, and maintenance personnel upholding institutional efficiency.
            </p>
          </div>

          {officeWorkers.length > 0 ? (
            <div className="faculty-grid faculty-grid--staff">
              {officeWorkers.map((member, i) => (
                <StaffCard key={member.name || i} member={member} index={i} isWorker={true} />
              ))}
            </div>
          ) : (
            <EmptyNotice title="Office workers and support staff details will be updated soon." />
          )}
        </div>
      </section>

      {/* Switcher CTA */}
      <section className="principal-page__cta">
        <div className="container principal-page__cta-inner">
          <p>Looking for General Department teaching faculty?</p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/general-staff" className="btn btn--primary">
              <GraduationCap size={18} />
              View General Department Faculty
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
