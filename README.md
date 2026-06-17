# Kajoels Portfolio

A personal portfolio website with a hand-drawn sketchbook aesthetic, built with React and powered by GSAP animations.

## Live Demo

[he1st.me](https://he1st.me)

## Tech Stack

- **React** 19 — UI framework
- **Vite** 8 — build tool
- **Tailwind CSS** 4 — styling
- **GSAP** 3.15 — animations (ScrollTrigger, Flip, elastic easing)
- **Custom Font** — Handodle (hand-drawn/sketch style)

## Features

### Sections

| Section | Description |
|---|---|
| Loading | SVG stroke-draw intro animation with decorative elements |
| Hero | Per-letter SVG title, parallax decorations, word-by-word subtitle reveal |
| About | Avatar clip-path reveal, magnetic "VIEW WORK" button, SVG draw effects |
| Education | Timeline cards with logo spin-in and floating cat illustration |
| Tools & Software | 16 tool icons with proximity-scale grid effect |
| Experience | Timeline with infinite-loop photo carousels and GSAP scrub animations |
| Certification | Filterable grid with GSAP Flip transitions and full-screen modal |
| Projects | 3D tilt cards, progress bars for ongoing projects, tech stack icons |
| Article | Featured article with crossfade transitions and article list |
| Contact | Social links, CV download, and navigation footer |

### Unique Visual Elements

- **Hand-drawn sketchbook aesthetic** — SVG noise texture overlay, wavy underlines, hand-drawn box frames around images
- **SVG letter titles** — Every section title is composed of individual letter SVGs with staggered bounce-in animations
- **Custom SVG cursor** — Arrow/hand cursors that auto-detect background color and switch between white/black themes
- **SVG curve dividers** — Hand-drawn bezier curves transition between dark and light sections
- **Mixed font rendering** — Numbers in sans-serif, letters in Handodle font for visual contrast
- **3D tilt cards** — Project cards tilt in 3D following mouse position with perspective transforms
- **Proximity scale** — Tool cards scale up to 1.6x based on cursor distance
- **Magnetic button** — "VIEW WORK" button follows cursor with elastic return
- **GSAP Flip filtering** — Certificate cards animate smoothly between filter categories
- **Scroll-aware navbar** — Hides on scroll down, reappears on scroll up

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
  App.jsx                  # Root component, GSAP setup, section ordering
  index.css                # Tailwind, font-face, global styles
  components/
    LoadingPage.jsx        # Intro loading animation
    CustomCursor.jsx       # SVG cursor system
    SketchBg.jsx           # Paper texture overlay
    Navbar.jsx             # Scroll-aware navigation
    HeroSection.jsx        # Hero with SVG letters + parallax
    AboutSection.jsx       # About me + magnetic button
    EducationSection.jsx   # Education timeline
    ToolsSection.jsx       # Tools grid with proximity scale
    ExperienceSection.jsx  # Experience timeline + photo carousels
    CertificationSection.jsx # Filterable certs with Flip animation
    ProjectsSection.jsx    # Project cards with 3D tilt
    ArticleSection.jsx     # Article list with crossfade
    ContactFooter.jsx      # Contact + footer
    SketchUnderline.jsx    # Reusable wavy underline SVG
    Section.jsx            # Reusable section wrapper
public/
  fonts/Handodle.ttf       # Custom hand-drawn font
  img/                     # SVG letters, icons, screenshots, frames
  cv/                      # Downloadable CV PDF
```

## License

MIT
