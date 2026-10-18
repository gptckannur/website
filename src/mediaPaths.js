// ============================================================================
// MEDIA PATHS — Single source of truth for all images & videos on the site.
//
// HOW TO CHANGE AN IMAGE:
//   1. Go to the public/media/ folder
//   2. Find the section folder (e.g. hero/, principal/, gallery/)
//   3. Replace the file with your new image (keep the SAME filename)
//   4. The site updates automatically — no code changes needed!
//
// See public/media/README.md for the full folder guide.
// ============================================================================

const BASE = import.meta.env.BASE_URL + 'media/'

// ── Common / Shared ──────────────────────────────────────────────────────────
export const LOGO = BASE + 'common/logo.png'
export const COLLEGE_GATE = BASE + 'common/college-gate.jpg'

// ── Hero Section ─────────────────────────────────────────────────────────────
export const HERO_VIDEO = BASE + 'hero/video.mp4'
export const HERO_POSTER = COLLEGE_GATE

// Hero Slider — add/remove slides here. Drop matching files in public/media/hero/
export const HERO_SLIDES = [
  { src: BASE + 'hero/slide-1.jpg', title: 'Welcome to GPTC Kannur', subtitle: 'Excellence in Technical Education since 1958' },
  { src: BASE + 'hero/slide-2.jpg', title: 'World-Class Campus', subtitle: 'Modern facilities across 6 engineering departments' },
]

// ── Principal ────────────────────────────────────────────────────────────────
export const PRINCIPAL_PHOTO = BASE + 'principal/photo.jpg'

// ── Events ───────────────────────────────────────────────────────────────────
// To change an event image: replace the file in public/media/events/
export const EVENT_IMAGES = {
  'event-1': BASE + 'events/event-1.jpg',
  'event-2': BASE + 'events/event-2.jpg',
  'event-3': BASE + 'events/event-3.jpg',
}

// ── Department Pages ─────────────────────────────────────────────────────────
// Hero background per department — replace in public/media/departments/hero/
export const deptHeroImage = (slug) => BASE + `departments/hero/${slug}.png`

// Faculty photo — replace in public/media/faculty/{dept}/
export const facultyPhoto = (dept, filename) => BASE + `faculty/${dept}/${filename}`

// ── Placement Cell ───────────────────────────────────────────────────────────
// Placement gallery — images listed here. Drop files in public/media/placement/
export const PLACEMENT_IMAGES = [
  { src: BASE + 'placement/Training_9-11.jpg', caption: 'Training Programme – Session 9-11' },
  { src: BASE + 'placement/Training_9-11_Full-768x577.jpg', caption: 'Training Programme – Full Batch' },
  { src: BASE + 'placement/Training_13-15-768x644.jpg', caption: 'Training Programme – Session 13-15' },
  { src: BASE + 'placement/Training_13-15_Full-768x437.jpg', caption: 'Training Programme – Group Photo' },
  { src: BASE + 'placement/Sai-Krishna-1536x1086.jpg', caption: 'Campus Placement Drive' },
  { src: BASE + 'placement/1111-768x576.jpg', caption: 'Industry Interaction Session' },
  { src: BASE + 'placement/11-768x383.jpg', caption: 'Placement Activities' },
  { src: BASE + 'placement/988-768x479.jpg', caption: 'Skill Development Workshop' },
  { src: BASE + 'placement/56tt-768x994.jpg', caption: 'Career Guidance Seminar' },
  { src: BASE + 'placement/13-768x1101.jpg', caption: 'Student Achievement' },
  { src: BASE + 'placement/hy-768x762.jpg', caption: 'TPC Event' },
]

// ── Gallery (Homepage) ───────────────────────────────────────────────────────
// Main photo gallery — images with categories for filtering
// To add a photo: drop the file in public/media/gallery/{category}/ and add an entry here
export const GALLERY_IMAGES = [
  { src: BASE + 'gallery/campus/college-gate.jpg', caption: 'Govt. Polytechnic College, Kannur — Main Entrance Gate (Est. 1958)', category: 'campus', size: 'large' },
  { src: BASE + 'gallery/achievements/Achievement1.jpg', caption: 'Third Prize — Seminar Competition, CALPIO 2026', category: 'achievements', size: 'large' },
  { src: BASE + 'gallery/achievements/Achievement2.jpg', caption: 'First Prize — Seminar Competition, CALPIO 2026', category: 'achievements', size: 'large' },
  { src: BASE + 'gallery/sports/SPORTS.jpeg', caption: 'Inter Poly State Table Tennis — 2nd Runner Up', category: 'sports', size: 'tall' },
]

// ── Department Gallery Images ────────────────────────────────────────────────
// Facilities & Achievements photos per department
// To add images: drop files in public/media/departments/{dept}/facilities/ or achievements/
// Then add an entry below with the filename
const deptGallery = (dept, sub, filename) => BASE + `departments/${dept}/${sub}/${filename}`

export const DEPT_GALLERY = {
  civil: {
    facilities: [],
    achievements: [],
  },
  electrical: {
    facilities: [],
    achievements: [],
  },
  electronics: {
    facilities: [],
    achievements: [],
  },
  mechanical: {
    facilities: [],
    achievements: [],
  },
  textile: {
    facilities: [],
    achievements: [],
  },
  wood: {
    facilities: [],
    achievements: [],
  },
}
