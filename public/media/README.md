# 📁 Media Folder — GPTC Kannur Website

This folder contains **all images and videos** used on the website.
To change any image, simply **replace the file** in the correct folder — no code editing needed!

---

## Folder Structure

```
public/media/
├── common/                    ← Shared across pages
│   ├── logo.png               ← College logo (navbar, footer)
│   └── college-gate.jpg       ← Main campus photo
│
├── hero/                      ← Homepage hero section
│   ├── video.mp4              ← Background video
│   ├── slide-1.jpg            ← Slider image 1
│   └── slide-2.jpg            ← Slider image 2
│
├── principal/                 ← Principal section
│   └── photo.jpg              ← Principal's portrait
│
├── events/                    ← Events section
│   ├── event-1.jpg            ← NSS Camp photo
│   ├── event-2.jpg            ← Sports Day photo
│   └── event-3.jpg            ← Cultural Fest photo
│
├── gallery/                   ← Homepage photo gallery
│   ├── campus/                ← Campus photos
│   ├── achievements/          ← Achievement photos
│   └── sports/                ← Sports photos
│
├── placement/                 ← Placement cell page
│   └── *.jpg                  ← Training & placement photos
│
├── departments/               ← Department pages
│   ├── hero/                  ← Department hero backgrounds
│   │   ├── civil.png
│   │   ├── electrical.png
│   │   ├── electronics.png
│   │   ├── mechanical.png
│   │   ├── textile.png
│   │   └── wood.png
│   ├── civil/
│   │   ├── facilities/        ← Lab & workshop photos
│   │   └── achievements/      ← Award & project photos
│   ├── electrical/
│   │   ├── facilities/
│   │   └── achievements/
│   ├── electronics/
│   │   ├── facilities/
│   │   └── achievements/
│   ├── mechanical/
│   │   ├── facilities/
│   │   └── achievements/
│   ├── textile/
│   │   ├── facilities/
│   │   └── achievements/
│   └── wood/
│       ├── facilities/
│       └── achievements/
│
└── faculty/                   ← Faculty member photos
    ├── civil/                 ← One photo per person
    ├── electrical/
    ├── electronics/
    ├── mechanical/
    ├── textile/
    └── wood/
```

---

## How to Change an Image

### Simple replacement (same filename)
1. Find the folder for the section you want to update
2. Replace the file with your new image — **keep the same filename**
3. The website updates automatically on next build/refresh

### Adding new gallery images
1. Drop the image file into `gallery/{category}/`
2. Open `src/mediaPaths.js`
3. Add one line to the `GALLERY_IMAGES` array with the filename

### Adding new department photos
1. Drop the image file into `departments/{dept}/facilities/` or `achievements/`
2. Open `src/mediaPaths.js`
3. Add one line to the department's array in `DEPT_GALLERY`

### Changing a faculty photo
1. Replace the photo in `faculty/{department}/`
2. Keep the same filename (matches the person's name)

---

## Tips
- **Image formats**: JPG, JPEG, PNG, and WebP are all supported
- **Recommended sizes**: Hero images ~1920×1080, faculty photos ~400×400, gallery ~1200×800
- **File naming**: Keep filenames simple. Avoid special characters except hyphens and underscores
- **The config file**: `src/mediaPaths.js` is the master list connecting folders to the website
