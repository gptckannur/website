import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, ShieldAlert, ExternalLink } from 'lucide-react'
import navData from '../data/navigation.json'
import { getAllPages } from './CustomPage'
import TenderLogo from './TenderLogo'

export default function TopBar() {
  // Merge navigation.json topbar items + custom pages flagged with showInTopbar
  const navItems = (navData.topbar || []).map(item => ({ ...item, _type: 'nav' }))

  const pageItems = getAllPages()
    .filter(p => p.showInTopbar)
    .map(p => ({
      label: p.title,
      url: `/page/${p.slug}`,
      style: p.topbarStyle || 'link',
      icon: 'none',
      openInNewTab: false,
      order: p.navOrder || 10,
      _type: 'page'
    }))

  const dynamicItems = [...navItems, ...pageItems].sort((a, b) => (a.order || 99) - (b.order || 99))

  return (
    <div className="top-bar" id="top-bar">
      <div className="container top-bar__inner">
        <div className="top-bar__left">
          <a href="tel:04972835106" className="top-bar__item">
            <Phone className="icon-sm" />
            <span>0497 283 5106</span>
          </a>
          <a href="mailto:kannurgptc@gmail.com" className="top-bar__item">
            <Mail className="icon-sm" />
            <span>kannurgptc@gmail.com</span>
          </a>
        </div>
        <div className="top-bar__right">
          {dynamicItems.map((item, i) => {
            const isExternal = item.url && (item.url.startsWith('http') || item.url.startsWith('//'))
            const isTender = item.label?.toLowerCase().includes('tender') || item.url?.includes('tender')

            let className = 'top-bar__item top-bar__anti-ragging'
            if (isTender) {
              className = 'top-bar__badge top-bar__badge--tender'
            } else if (item.style === 'badge') {
              className = 'top-bar__badge'
            }

            if (isExternal || item.openInNewTab) {
              return (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {isTender && <TenderLogo size={14} />}
                  {item.icon === 'ShieldAlert' && <ShieldAlert className="icon-sm" />}
                  <span>{item.label}</span>
                  {isTender && <span className="top-bar__tender-dot" />}
                </a>
              )
            }

            return (
              <Link key={i} to={item.url} className={className}>
                {isTender && <TenderLogo size={14} />}
                <span>{item.label}</span>
                {isTender && <span className="top-bar__tender-dot" />}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
