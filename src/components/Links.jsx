import React from 'react'
import { ExternalLink, Link, Shield, ShieldAlert, Phone, Mail, ChevronRight } from 'lucide-react'
import linksData from '../data/links.json'

export default function Links() {
  const {
    importantLinks = [],
    quickLinks = [],
    antiRagging = { phone: '1800-180-5522', email: 'helpline@antiragging.in', url: 'https://antiragging.in/' }
  } = linksData || {}

  return (
    <section className="section links" id="links">
      <div className="container">
        <div className="links__grid">
          <div className="links__column" data-animate="fade-up" data-delay="100">
            <h3 className="links__heading">
              <ExternalLink size={16} />
              Important Links
            </h3>
            <ul className="links__list">
              {importantLinks.map((item, i) => (
                <li key={i}><a href={item.url} target="_blank" rel="noopener noreferrer"><ChevronRight size={14} /> {item.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="links__column" data-animate="fade-up" data-delay="200">
            <h3 className="links__heading">
              <Link size={16} />
              Quick Links
            </h3>
            <ul className="links__list">
              {quickLinks.map((item, i) => {
                const isExternal = item.url && (item.url.startsWith('http') || item.url.startsWith('//'))
                return (
                  <li key={i}>
                    <a
                      href={item.url}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                    >
                      <ChevronRight size={14} /> {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="links__column links__column--highlight" data-animate="fade-up" data-delay="300">
            <h3 className="links__heading">
              <Shield size={16} />
              Anti-Ragging
            </h3>
            <div className="links__anti-ragging">
              <div className="links__ar-badge">
                <ShieldAlert size={40} />
              </div>
              <h4>National Anti-Ragging Helpline</h4>
              <p className="links__ar-phone">
                <Phone size={16} />
                {antiRagging.phone}
              </p>
              <p className="links__ar-email">
                <Mail size={16} />
                {antiRagging.email}
              </p>
              <a href={antiRagging.url} target="_blank" rel="noopener noreferrer" className="btn btn--danger btn--sm">
                Report Ragging
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
