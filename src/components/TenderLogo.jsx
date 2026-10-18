import React from 'react'

export default function TenderLogo({ size = 24, className = '', glow = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`tender-logo-svg ${className}`}
      style={glow ? { filter: 'drop-shadow(0 2px 8px rgba(245, 158, 11, 0.5))' } : {}}
    >
      <defs>
        <linearGradient id="tenderGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="tenderSheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient id="tenderPaper" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F3F4F6" />
        </linearGradient>
      </defs>

      {/* Outer Hexagon / Shield Frame */}
      <path
        d="M24 2L42 10V22C42 33 34 42 24 46C14 42 6 33 6 22V10L24 2Z"
        fill="url(#tenderGold)"
      />
      <path
        d="M24 5L39 12V22C39 31.5 32.5 39.5 24 43C15.5 39.5 9 31.5 9 22V12L24 5Z"
        fill="#047857"
        opacity="0.95"
      />

      {/* Inner Document */}
      <rect x="15" y="13" width="18" height="22" rx="2" fill="url(#tenderPaper)" />
      {/* Folded corner */}
      <path d="M27 13L33 19H27V13Z" fill="#CBD5E1" />

      {/* Document Lines */}
      <rect x="18" y="18" width="6" height="2" rx="1" fill="#047857" />
      <rect x="18" y="22" width="12" height="1.8" rx="0.9" fill="#94A3B8" />
      <rect x="18" y="26" width="12" height="1.8" rx="0.9" fill="#94A3B8" />
      <rect x="18" y="30" width="8" height="1.8" rx="0.9" fill="#94A3B8" />

      {/* Official Red/Gold Stamp / Seal */}
      <circle cx="28" cy="30" r="4.5" fill="url(#tenderGold)" />
      <circle cx="28" cy="30" r="3.5" fill="#DC2626" />
      <path d="M28 28L28.8 29.6L30.5 29.8L29.2 31L29.6 32.6L28 31.8L26.4 32.6L26.8 31L25.5 29.8L27.2 29.6L28 28Z" fill="#FEF3C7" />
    </svg>
  )
}
