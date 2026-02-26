$ErrorActionPreference = "Continue"
$baseUrl = "https://raw.githubusercontent.com/AanandAB/Gptc/main/gptc-react"
$baseDir = "d:\Google Antigravity\College website"

# Source files to download
$sourceFiles = @(
    "src/main.jsx",
    "src/App.jsx",
    "src/index.css",
    "src/data/departments.js",
    "src/hooks/CountUp.jsx",
    "src/hooks/useTilt.js",
    "src/components/About.jsx",
    "src/components/Academics.jsx",
    "src/components/BackToTop.jsx",
    "src/components/CivilFacultyPage.jsx",
    "src/components/ClassroomLayoutPage.jsx",
    "src/components/DepartmentPage.jsx",
    "src/components/Departments.jsx",
    "src/components/DiplomaPage.jsx",
    "src/components/ElectricalFacultyPage.jsx",
    "src/components/ElectronicsFacultyPage.jsx",
    "src/components/Events.jsx",
    "src/components/Facilities.jsx",
    "src/components/Footer.jsx",
    "src/components/Gallery.jsx",
    "src/components/Hero.jsx",
    "src/components/ImageSlider.jsx",
    "src/components/Links.jsx",
    "src/components/MechanicalFacultyPage.jsx",
    "src/components/Navbar.jsx",
    "src/components/PlacementCellPage.jsx",
    "src/components/Preloader.jsx",
    "src/components/Principal.jsx",
    "src/components/PrincipalPage.jsx",
    "src/components/ScrollVideo.jsx",
    "src/components/SmoothScroll.jsx",
    "src/components/TextileFacultyPage.jsx",
    "src/components/Ticker.jsx",
    "src/components/TopBar.jsx",
    "src/components/VisionMission.jsx",
    "src/components/WoodFacultyPage.jsx"
)

# Public image files to download
$publicFiles = @(
    "public/logo.png",
    "public/images/civil.png",
    "public/images/electrical.png",
    "public/images/electronics.png",
    "public/images/mechanical.png",
    "public/images/principal.jpg",
    "public/images/textile.png",
    "public/images/wood.png",
    "public/gallery/Achievement1.jpg",
    "public/gallery/Achievement2.jpg",
    "public/gallery/SPORTS.jpeg",
    "public/videos/campus-scroll.mp4",
    "public/placement/11-768x383.jpg",
    "public/placement/1111-768x576.jpg",
    "public/placement/13-768x1101.jpg",
    "public/placement/56tt-768x994.jpg",
    "public/placement/988-768x479.jpg",
    "public/placement/Sai-Krishna-1536x1086.jpg",
    "public/placement/Training_13-15-768x644.jpg",
    "public/placement/Training_13-15_Full-768x437.jpg",
    "public/placement/Training_9-11.jpg",
    "public/placement/Training_9-11_Full-768x577.jpg",
    "public/placement/hy-768x762.jpg"
)

# Faculty image files
$facultyFiles = @(
    "public/faculty/civil/AMAL V K.jpg",
    "public/faculty/civil/ANEESH K K.jpg",
    "public/faculty/civil/ASEEJA P K.jpg",
    "public/faculty/civil/BINUSREE KS.jpg",
    "public/faculty/civil/MEKHA SHANTHAKUMAR.jpg",
    "public/faculty/civil/MURUKADAS K K.jpg",
    "public/faculty/civil/PRAJEESHA T.jpg",
    "public/faculty/civil/SARATH D.jpg",
    "public/faculty/civil/SMITHA K.jpg",
    "public/faculty/civil/SURJITH P.jpg",
    "public/faculty/civil/SWATHI KRISHNA BS.jpg",
    "public/faculty/electrical/AJITH P..jpg",
    "public/faculty/electrical/DEEPAK C.jpg",
    "public/faculty/electrical/DEVIKA SASI P.jpg",
    "public/faculty/electrical/LIJINA K.jpg",
    "public/faculty/electrical/NIKHIL RAJ.N.jpg",
    "public/faculty/electrical/NIPUNLAL THOTTATHIL.jpg",
    "public/faculty/electrical/TONY LUKOSE.jpg",
    "public/faculty/electrical/aswanthlal a.jpg",
    "public/faculty/electrical/shajul dinesh a.jpg",
    "public/faculty/electronics/BHAVYA R.jpg",
    "public/faculty/electronics/JITHIN LAL V K.jpg",
    "public/faculty/electronics/LIJI C A.jpeg",
    "public/faculty/electronics/PRASANTHAN K.jpeg",
    "public/faculty/electronics/RAMYA K V.jpeg",
    "public/faculty/electronics/SURESH BABU.jpg",
    "public/faculty/electronics/rajesh o k.jpeg",
    "public/faculty/mechanical/AKSHAY P.jpeg",
    "public/faculty/mechanical/ANEESH KUMAR M.jpeg",
    "public/faculty/mechanical/ANOOP K.jpeg",
    "public/faculty/mechanical/C K BIJU KUMAR R.jpg",
    "public/faculty/mechanical/DEEPAK E.jpeg",
    "public/faculty/mechanical/DIVESH KUMAR C.jpeg",
    "public/faculty/mechanical/JIPSON GEORGE.jpeg",
    "public/faculty/mechanical/JOGIL KUMAR K K.jpeg",
    "public/faculty/mechanical/JYOTHISH KUMAR M.jpeg",
    "public/faculty/mechanical/NIDHEESH P.jpeg",
    "public/faculty/mechanical/NIDHIN V.jpeg",
    "public/faculty/mechanical/PRADEEP KUMAR VK.jpg",
    "public/faculty/mechanical/RAJESH N P.jpg",
    "public/faculty/mechanical/RATHNAKARAN T.jpeg",
    "public/faculty/mechanical/ROHITH MAVILA.jpg",
    "public/faculty/mechanical/SUJITH KUMAR P.jpeg",
    "public/faculty/mechanical/SURESH KUMAR P.jpeg",
    "public/faculty/mechanical/VARUNKUMAR.jpeg",
    "public/faculty/mechanical/VINOD A.jpeg",
    "public/faculty/mechanical/anoop a.jpeg",
    "public/faculty/textile/ABHINAV VISHNU.jpg",
    "public/faculty/textile/ANEESH KUMAR PD.jpg",
    "public/faculty/textile/AZHARUDHEEN T.jpg",
    "public/faculty/textile/GOLDA HONEY MADHU.jpg",
    "public/faculty/textile/KIRAN MK.jpg",
    "public/faculty/textile/P SIVA KRISHNA.jpg",
    "public/faculty/textile/RANJITHKUMAR K.jpg",
    "public/faculty/textile/SUMESH C.jpg",
    "public/faculty/textile/VIPINA K.jpg",
    "public/faculty/textile/VIVEK K C.jpg",
    "public/faculty/wood/BIJU K T.jpeg",
    "public/faculty/wood/DIVYATHEJ M V.jpeg",
    "public/faculty/wood/GOKUL K G.jpeg",
    "public/faculty/wood/MUHAMMED ASHARUDHEEN T K.jpeg",
    "public/faculty/wood/NIDHIN NARAYANAN P.jpeg",
    "public/faculty/wood/PRAKASAN V.jpeg",
    "public/faculty/wood/SAJITH P.jpeg",
    "public/faculty/wood/SATHEESH KUMAR T K.jpg",
    "public/faculty/wood/SHAJIN P RAJ.jpeg",
    "public/faculty/wood/SINI C P.jpeg",
    "public/faculty/wood/VINAYAK K.jpeg"
)

$allFiles = $sourceFiles + $publicFiles + $facultyFiles
$total = $allFiles.Count
$current = 0

foreach ($file in $allFiles) {
    $current++
    $localPath = Join-Path $baseDir $file
    $localDir = Split-Path $localPath -Parent
    
    if (-not (Test-Path $localDir)) {
        New-Item -ItemType Directory -Path $localDir -Force | Out-Null
    }
    
    # URL encode spaces in path
    $encodedFile = $file -replace ' ', '%20'
    $url = "$baseUrl/$encodedFile"
    
    Write-Host "[$current/$total] Downloading: $file"
    try {
        Invoke-WebRequest -Uri $url -OutFile $localPath -UseBasicParsing
    } catch {
        Write-Host "  FAILED: $_" -ForegroundColor Red
    }
}

Write-Host "`nDone! Downloaded $current files." -ForegroundColor Green
