import React, { useEffect, useRef, useCallback } from 'react'
import { Award, GraduationCap, Info } from 'lucide-react'
import CountUp from '../hooks/CountUp'
import { HERO_VIDEO, HERO_POSTER } from '../mediaPaths'
import heroData from '../data/hero.json'

export default function Hero({ onNavigate }) {
  const particlesRef = useRef(null)
  const heroRef = useRef(null)
  const contentRef = useRef(null)

  const {
    badge = 'Established 1958 • AICTE Approved',
    titlePrefix = 'Government Polytechnic',
    titleAccent = 'College Kannur',
    tagline = '"Knowledge is Power"',
    description = 'Empowering youth through excellence in technical education since 1958.',
    stats = [
      { number: 65, hasPlus: true, label: 'Years of Excellence' },
      { number: 6, hasPlus: false, label: 'Departments' },
      { number: 1000, hasPlus: true, label: 'Students' },
      { number: 50, hasPlus: true, label: 'Expert Faculty' },
    ]
  } = heroData || {}

  useEffect(() => {
    const container = particlesRef.current
    if (!container) return
    const colors = [
      'rgba(4,120,87,0.6)',
      'rgba(13,148,136,0.5)',
      'rgba(30,64,175,0.4)',
      'rgba(217,119,6,0.4)',
      'rgba(255,255,255,0.3)',
    ]
    let interval
    function createParticle() {
      const p = document.createElement('div')
      p.classList.add('particle')
      const x = Math.random() * 100
      const size = Math.random() * 4 + 1
      const dur = Math.random() * 8 + 6
      const delay = Math.random() * 5
      p.style.left = `${x}%`
      p.style.bottom = '-10px'
      p.style.width = `${size}px`
      p.style.height = `${size}px`
      p.style.animationDuration = `${dur}s`
      p.style.animationDelay = `${delay}s`
      p.style.background = colors[Math.floor(Math.random() * colors.length)]
      container.appendChild(p)
      setTimeout(() => p.remove(), (dur + delay) * 1000)
    }
    for (let i = 0; i < 15; i++) createParticle()
    interval = setInterval(() => {
      if (document.visibilityState === 'visible') createParticle()
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  // 3D Parallax on mouse move
  useEffect(() => {
    let lastMove = 0
    const handleMouseMove = (e) => {
      const now = performance.now()
      if (now - lastMove < 50) return          // throttle to ~20fps
      lastMove = now
      if (!heroRef.current || !contentRef.current) return
      const { innerWidth, innerHeight } = window
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2)
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2)

      const shapes = heroRef.current.querySelectorAll('.hero__shape')
      shapes.forEach((s, i) => {
        const speed = (i + 1) * 15
        s.style.transform = `translate(${x * speed}px, ${y * speed}px)`
      })

      // Slight 3D tilt on content
      contentRef.current.style.transform = `perspective(1000px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateZ(20px)`
    }
    
    const resetTransform = () => {
      if (!contentRef.current) return
      contentRef.current.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateZ(0)`
      const shapes = heroRef.current?.querySelectorAll('.hero__shape')
      shapes?.forEach(s => s.style.transform = `translate(0, 0)`)
    }

    const heroEl = heroRef.current
    if (heroEl) {
      heroEl.addEventListener('mousemove', handleMouseMove)
      heroEl.addEventListener('mouseleave', resetTransform)
    }
    
    return () => {
      if (heroEl) {
        heroEl.removeEventListener('mousemove', handleMouseMove)
        heroEl.removeEventListener('mouseleave', resetTransform)
      }
    }
  }, [])

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero__bg">
        <video
          className="hero__bg-video"
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        <div ref={particlesRef} className="hero__particles"></div>
        <div className="hero__gradient"></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="hero__float-shapes">
        <div className="hero__shape hero__shape--1"></div>
        <div className="hero__shape hero__shape--2"></div>
        <div className="hero__shape hero__shape--3"></div>
        <div className="hero__shape hero__shape--4"></div>
        <div className="hero__shape hero__shape--5"></div>
      </div>

      <div className="container hero__content" ref={contentRef}>
        <div className="hero__badge" data-animate="fade-up">
          <Award size={16} />
          <span>{badge}</span>
        </div>
        <h1 className="hero__title" data-animate="fade-up" data-delay="100">
          {titlePrefix}<br />
          <span className="hero__title-accent">{titleAccent}</span>
        </h1>
        <p className="hero__tagline" data-animate="fade-up" data-delay="200">
          {tagline}
        </p>
        <p className="hero__description" data-animate="fade-up" data-delay="300">
          {description}
        </p>
        <div className="hero__actions" data-animate="fade-up" data-delay="400">
          <button className="btn btn--primary" onClick={() => onNavigate('departments')}>
            <GraduationCap size={18} />
            Explore Departments
          </button>
          <button className="btn btn--outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.3)' }} onClick={() => onNavigate('about')}>
            <Info size={18} />
            Learn More
          </button>
        </div>
        <div className="hero__stats" data-animate="fade-up" data-delay="500">
          {stats.map((st, i) => (
            <div className="hero__stat" key={i}>
              <span className="hero__stat-number"><CountUp end={st.number} /></span>
              {st.hasPlus && <span className="hero__stat-plus">+</span>}
              <span className="hero__stat-label">{st.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hero__scroll-indicator" onClick={() => onNavigate('about')}>
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
