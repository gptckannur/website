import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import Lenis from 'lenis'
import {
  ArrowLeft, Building2, Zap, Cpu, Cog, Shirt, Trees,
  Target, Eye, GraduationCap, BookOpen, Lightbulb,
  CheckCircle, Users, Clock, Award, X, ChevronLeft, ChevronRight, Maximize2
} from 'lucide-react'
import { departmentData } from '../data/departments'
import { deptHeroImage, DEPT_GALLERY } from '../mediaPaths'
import deptGalleriesData from '../data/department_galleries.json'

const deptIcons = {
  civil: Building2,
  electrical: Zap,
  electronics: Cpu,
  mechanical: Cog,
  textile: Shirt,
  wood: Trees,
}

export default function DepartmentPage() {
  const { deptSlug } = useParams()
  const dept = departmentData[deptSlug]
  const lenisRef = useRef(null)
  const rafIdRef = useRef(null)

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState([])
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [lightboxCategory, setLightboxCategory] = useState('')

  // Lenis smooth scroll
  useEffect(() => {
    window.scrollTo(0, 0)
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.08, wheelMultiplier: 0.8, touchMultiplier: 1.5,
      smoothWheel: true, smoothTouch: false,
    })
    lenisRef.current = lenis
    function raf(time) { lenis.raf(time); rafIdRef.current = requestAnimationFrame(raf) }
    rafIdRef.current = requestAnimationFrame(raf)
    return () => { if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current); lenis.destroy() }
  }, [deptSlug])

  // Get images for this department from editable JSON with fallback
  const deptMedia = deptGalleriesData?.[deptSlug] || DEPT_GALLERY[deptSlug] || { facilities: [], achievements: [] }
  const rawFacilities = deptMedia.facilities || []
  const rawAchievements = deptMedia.achievements || []
  const facilitiesImages = rawFacilities.map(f => (typeof f === 'string' ? f : f?.image || '')).filter(Boolean)
  const achievementsImages = rawAchievements.map(a => (typeof a === 'string' ? a : a?.image || '')).filter(Boolean)

  const openLightbox = (imagesList, index, categoryName) => {
    setLightboxImages(imagesList)
    setActiveImageIndex(index)
    setLightboxCategory(categoryName)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const goNext = useCallback(() => {
    if (lightboxImages.length === 0) return
    setActiveImageIndex(prev => (prev + 1) % lightboxImages.length)
  }, [lightboxImages.length])

  const goPrev = useCallback(() => {
    if (lightboxImages.length === 0) return
    setActiveImageIndex(prev => (prev - 1 + lightboxImages.length) % lightboxImages.length)
  }, [lightboxImages.length])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, goNext, goPrev])

  // Scroll-reveal
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
  }, [deptSlug])

  if (!dept) {
    return (
      <div className="subpage">
        <div className="container" style={{ padding: '120px 0', textAlign: 'center' }}>
          <h2>Department not found</h2>
          <Link to="/" className="btn btn--primary" style={{ marginTop: 24 }}>Go Home</Link>
        </div>
      </div>
    )
  }

  const DeptIcon = deptIcons[deptSlug] || Building2

  return (
    <div className="subpage">
      {/* Hero */}
      <section className="dept-page__hero" style={{ '--dept-hue': dept.hue }}>
        <div className="dept-page__hero-bg" style={{ backgroundImage: `url(${deptHeroImage(deptSlug)})` }}></div>
        <div className="dept-page__hero-overlay"></div>
        <div className="container dept-page__hero-content">
          <div className="dept-page__hero-icon">
            <DeptIcon size={48} />
          </div>
          <h1 className="dept-page__hero-title">{dept.title}</h1>
          <p className="dept-page__hero-subtitle">{dept.subtitle}</p>
          <div className="dept-page__hero-meta">
            <span><Clock size={16} /> {dept.duration}</span>
            <span><Users size={16} /> {dept.intake} Seats</span>
            <span><Award size={16} /> SBTE Kerala</span>
          </div>
          {deptSlug === 'mechanical' && (
            <div className="dept-page__hero-actions" data-animate="fade-up" data-delay="400" style={{ marginTop: '24px' }}>
              <Link to="/mechanical-faculty" className="btn btn--primary" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                <Users size={18} />
                View Faculty Details
              </Link>
            </div>
          )}
          {deptSlug === 'wood' && (
            <div className="dept-page__hero-actions" data-animate="fade-up" data-delay="400" style={{ marginTop: '24px' }}>
              <Link to="/wood-faculty" className="btn btn--primary" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                <Users size={18} />
                View Faculty Details
              </Link>
            </div>
          )}
          {deptSlug === 'textile' && (
            <div className="dept-page__hero-actions" data-animate="fade-up" data-delay="400" style={{ marginTop: '24px' }}>
              <Link to="/textile-faculty" className="btn btn--primary" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                <Users size={18} />
                View Faculty Details
              </Link>
            </div>
          )}
          {deptSlug === 'electronics' && (
            <div className="dept-page__hero-actions" data-animate="fade-up" data-delay="400" style={{ marginTop: '24px' }}>
              <Link to="/electronics-faculty" className="btn btn--primary" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                <Users size={18} />
                View Faculty Details
              </Link>
            </div>
          )}
          {deptSlug === 'civil' && (
            <div className="dept-page__hero-actions" data-animate="fade-up" data-delay="400" style={{ marginTop: '24px' }}>
              <Link to="/civil-faculty" className="btn btn--primary" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                <Users size={18} />
                View Faculty Details
              </Link>
            </div>
          )}
          {deptSlug === 'electrical' && (
            <div className="dept-page__hero-actions" data-animate="fade-up" data-delay="400" style={{ marginTop: '24px' }}>
              <Link to="/electrical-faculty" className="btn btn--primary" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                <Users size={18} />
                View Faculty Details
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* About */}
      <section className="dept-page__section">
        <div className="container">
          <div className="dept-page__about" data-animate="fade-up">
            <div className="dept-page__about-content">
              <h2 className="dept-page__section-title">
                <BookOpen size={24} />
                About the Department
              </h2>
              {dept.about.map((para, i) => (
                <p key={i} className={i === 0 ? 'dept-page__lead' : ''}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="dept-page__section dept-page__section--alt">
        <div className="container">
          <div className="dept-page__vm-grid">
            {/* Vision */}
            <div className="dept-page__vm-card" data-animate="fade-right">
              <div className="dept-page__vm-icon">
                <Eye size={28} />
              </div>
              <h3>Vision</h3>
              <p>{dept.vision}</p>
            </div>
            {/* Mission */}
            <div className="dept-page__vm-card" data-animate="fade-left">
              <div className="dept-page__vm-icon">
                <Target size={28} />
              </div>
              <h3>Mission</h3>
              <ul>
                {dept.mission.map((m, i) => (
                  <li key={i}>
                    <CheckCircle size={14} />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PSOs */}
      {dept.pso && dept.pso.length > 0 && (
        <section className="dept-page__section">
          <div className="container">
            <h2 className="dept-page__section-title" data-animate="fade-up">
              <GraduationCap size={24} />
              Programme Specific Outcomes (PSOs)
            </h2>
            <div className="dept-page__outcomes-grid">
              {dept.pso.map((item, i) => (
                <div className="dept-page__outcome-card" key={i} data-animate="fade-up" data-delay={i * 100}>
                  <span className="dept-page__outcome-badge">PSO{i + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PEOs */}
      {dept.peo && dept.peo.length > 0 && (
        <section className="dept-page__section dept-page__section--alt">
          <div className="container">
            <h2 className="dept-page__section-title" data-animate="fade-up">
              <Lightbulb size={24} />
              Programme Educational Objectives (PEOs)
            </h2>
            <div className="dept-page__outcomes-grid">
              {dept.peo.map((item, i) => (
                <div className="dept-page__outcome-card dept-page__outcome-card--peo" key={i} data-animate="fade-up" data-delay={i * 100}>
                  <span className="dept-page__outcome-badge dept-page__outcome-badge--peo">PEO{i + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Facilities Gallery */}
      {facilitiesImages.length > 0 && (
        <section className="dept-page__section">
          <div className="container">
            <h2 className="dept-page__section-title" data-animate="fade-up">
              <Building2 size={24} />
              Facilities
            </h2>
            <div className="dept-page__gallery-grid">
              {facilitiesImages.map((src, i) => (
                <div 
                  className="dept-page__gallery-item" 
                  key={i} 
                  data-animate="fade-up" 
                  data-delay={i * 100}
                  onClick={() => openLightbox(facilitiesImages, i, `${dept.title} — Facility ${i + 1}`)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View facility ${i + 1}`}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(facilitiesImages, i, `${dept.title} — Facility ${i + 1}`)}
                >
                  <img src={src} alt={`${dept.title} Facility ${i + 1}`} loading="lazy" />
                  <div className="dept-page__gallery-overlay">
                    <Maximize2 size={24} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Achievements Gallery */}
      {achievementsImages.length > 0 && (
        <section className="dept-page__section dept-page__section--alt">
          <div className="container">
            <h2 className="dept-page__section-title" data-animate="fade-up">
              <Award size={24} />
              Achievements
            </h2>
            <div className="dept-page__gallery-grid">
              {achievementsImages.map((src, i) => (
                <div 
                  className="dept-page__gallery-item" 
                  key={i} 
                  data-animate="fade-up" 
                  data-delay={i * 100}
                  onClick={() => openLightbox(achievementsImages, i, `${dept.title} — Achievement ${i + 1}`)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View achievement ${i + 1}`}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(achievementsImages, i, `${dept.title} — Achievement ${i + 1}`)}
                >
                  <img src={src} alt={`${dept.title} Achievement ${i + 1}`} loading="lazy" />
                  <div className="dept-page__gallery-overlay">
                    <Maximize2 size={24} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && lightboxImages.length > 0 && (
        <div
          className="gallery-lightbox active"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Department Photo Viewer"
        >
          <div className="gallery-lightbox__backdrop" />
          <div className="gallery-lightbox__topbar" onClick={(e) => e.stopPropagation()}>
            <span className="gallery-lightbox__counter">
              {activeImageIndex + 1} <span>/ {lightboxImages.length}</span>
            </span>
            <span className="gallery-lightbox__title">
              {lightboxCategory}
            </span>
            <button className="gallery-lightbox__close" onClick={closeLightbox} aria-label="Close viewer">
              <X size={20} />
            </button>
          </div>

          {lightboxImages.length > 1 && (
            <>
              <button
                className="gallery-lightbox__arrow gallery-lightbox__arrow--prev"
                onClick={(e) => { e.stopPropagation(); goPrev() }}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="gallery-lightbox__arrow gallery-lightbox__arrow--next"
                onClick={(e) => { e.stopPropagation(); goNext() }}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div className="gallery-lightbox__stage" onClick={(e) => e.stopPropagation()}>
            <div className="gallery-lightbox__image-wrap loaded">
              <img
                key={activeImageIndex}
                className="gallery-lightbox__image"
                src={lightboxImages[activeImageIndex]}
                alt={lightboxCategory}
              />
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="principal-page__cta">
        <div className="container principal-page__cta-inner">
          <p>Want to explore other departments?</p>
          <Link to="/" className="btn btn--primary">
            <ArrowLeft size={18} />
            Back to Homepage
          </Link>
        </div>
      </section>
    </div>
  )
}
