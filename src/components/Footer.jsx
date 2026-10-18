import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, ExternalLink, ChevronRight } from 'lucide-react'
import { LOGO } from '../mediaPaths'
import contactData from '../data/contact.json'
import navData from '../data/navigation.json'

export default function Footer({ onNavigate }) {
  const {
    address = 'Thottada, Kannur,\nKerala 670007, India',
    phone = '0497 283 5106',
    email = 'kannurgptc@gmail.com',
  } = contactData || {}

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    onNavigate(sectionId)
  }

  return (
    <footer className="footer" id="contact">
      <div className="footer__top">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand" data-animate="fade-up">
              <div className="footer__logo">
                <img src={LOGO} alt="GPTC Kannur" className="navbar__logo-img navbar__logo-img--lg" />
                <div>
                  <h3>Govt. Polytechnic College Kannur</h3>
                  <p className="footer__tagline">Knowledge is Power</p>
                </div>
              </div>
              <p className="footer__about">
                Government Polytechnic College, Kannur is a premier government-run technical
                education institution in North Kerala, offering AICTE-approved diploma programmes
                since 1958.
              </p>
            </div>

            <div className="footer__contact" data-animate="fade-up" data-delay="100">
              <h4>Contact Us</h4>
              <ul>
                <li>
                  <MapPin size={16} />
                  <a href="https://www.google.com/maps/place/Government+Polytechnic+College,+Kannur/@11.8781989,75.4373111,17z" target="_blank" rel="noopener noreferrer">
                    {address}
                  </a>
                </li>
                {phone && (
                  <li>
                    <Phone size={16} />
                    <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
                  </li>
                )}
                {email && (
                  <li>
                    <Mail size={16} />
                    <a href={`mailto:${email}`}>{email}</a>
                  </li>
                )}
              </ul>
            </div>

            <div className="footer__nav" data-animate="fade-up" data-delay="200">
              <h4>Quick Navigation</h4>
              <ul>
                {[
                  { label: 'Home', id: 'hero' },
                  { label: 'About Us', id: 'about' },
                  { label: 'Departments', id: 'departments' },
                  { label: 'Academics', id: 'academics' },
                  { label: 'Gallery', id: 'gallery' },
                  { label: 'Events', id: 'events' },
                  { label: 'Facilities', id: 'facilities' },
                  { label: 'Important Links', id: 'links' },
                ].map((item, i) => (
                  <li key={i}>
                    <a href={`#${item.id}`} onClick={(e) => handleNavClick(e, item.id)}>
                      {item.label}
                    </a>
                  </li>
                ))}
                {/* Dynamic CMS-managed footer links + auto-linked custom pages */}
                {(() => {
                  const pageModules = import.meta.glob('../data/pages/*.json', { eager: true })
                  const pageItems = Object.values(pageModules)
                    .map(mod => mod.default || mod)
                    .filter(p => p.published !== false && p.showInFooter)
                    .map(p => ({
                      label: p.title,
                      url: `/page/${p.slug}`,
                      openInNewTab: false,
                      order: p.navOrder || 10,
                      _type: 'page'
                    }))
                  const navItems = (navData.footer || []).map(item => ({ ...item, _type: 'nav' }))
                  const allItems = [...navItems, ...pageItems].sort((a, b) => (a.order || 99) - (b.order || 99))

                  return allItems.map((item, i) => {
                    const isExternal = item.url && (item.url.startsWith('http') || item.url.startsWith('//'))
                    if (isExternal || item.openInNewTab) {
                      return (
                        <li key={`dyn-${i}`}>
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            {item.label}
                          </a>
                        </li>
                      )
                    }
                    return (
                      <li key={`dyn-${i}`}>
                        <Link to={item.url}>{item.label}</Link>
                      </li>
                    )
                  })
                })()}
              </ul>
            </div>

            <div className="footer__map" data-animate="fade-up" data-delay="300">
              <h4>Find Us</h4>
              <div className="footer__map-wrapper">
                <iframe
                  src="https://maps.google.com/maps?q=Government+Polytechnic+College,+Thottada,+Kannur,+Kerala+670007&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GPTC Kannur Map"
                ></iframe>
              </div>
              <a
                href="https://www.google.com/maps/place/Government+Polytechnic+College,+Kannur/@11.8781989,75.4373111,17z"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', marginTop: '10px', fontSize: '0.85rem', color: 'var(--primary-light)', textDecoration: 'none', fontWeight: '600' }}
              >
                View Larger Map &amp; Details &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; 2025 Government Polytechnic College Kannur. All rights reserved.</p>
          <p>
            Designed with <span style={{ color: 'var(--danger)' }}>♥</span> for GPTC Kannur
          </p>
        </div>
      </div>
    </footer>
  )
}
