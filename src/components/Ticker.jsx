import React from 'react'
import { Megaphone } from 'lucide-react'
import announcementsData from '../data/announcements.json'

const rawList = announcementsData?.announcements || []
const announcements = rawList.map(item => (typeof item === 'string' ? item : item?.message || '')).filter(Boolean)

export default function Ticker() {
  return (
    <div className="ticker" id="announcements">
      <div className="ticker__label">
        <Megaphone size={16} />
        <span>Announcements</span>
      </div>
      <div className="ticker__track">
        <div className="ticker__content">
          {[...announcements, ...announcements].map((item, i) => (
            <React.Fragment key={i}>
              <span className="ticker__item">{item}</span>
              <span className="ticker__separator">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
