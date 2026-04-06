# Portfolio Site — Design Spec

## Overview

A developer + career portfolio site built with Astro (SSG), self-hosted on Coolify. Minimal and clean foundation with bold typography, scroll-driven animations, and a blush pink accent palette. Inspired by [bepatrickdavid.com](https://bepatrickdavid.com/) and [briceclain.com](https://briceclain.com/en/) but slightly simpler.

## Architecture

- **Framework:** Astro (static site generation)
- **Styling:** Tailwind CSS with CSS custom properties for theming
- **Content:** Astro Content Collections (Markdown with typed frontmatter schemas)
- **Animations:** CSS animations + a lightweight JS library (e.g. GSAP or motion) for scroll-triggered reveals and staggered text entrances
- **No JS framework:** Pure `.astro` components. Only vanilla JS islands for the theme toggle and scroll observer.
- **Deployment:** Static build output, deployed to Coolify on user's own server

## Pages & Routes

| Route | Source | Description |
|---|---|---|
| `/` | `src/pages/index.astro` | Homepage — hero, projects, skills, about, contact |
| `/projects/[slug]` | `src/pages/projects/[...slug].astro` | Project detail (case study), generated from markdown |
| `/resume` | `src/pages/resume.astro` | Full resume/CV page |

## Content Structure

```
src/content/
  projects/
    my-first-project.md
  resume/
    resume.md
```

### Project frontmatter schema

```yaml
title: string
description: string
longDescription: string  # for the detail page
label: string            # e.g. "Web Application"
year: number
role: string
timeline: string
status: string           # e.g. "Live", "In Progress"
tech: string[]
featured: boolean
image: string            # cover image path
gallery: string[]        # additional screenshots
liveUrl: string          # optional
githubUrl: string        # optional
order: number            # display order
```

### Resume frontmatter schema

```yaml
experience:
  - role: string
    company: string
    startDate: string
    endDate: string
    description: string
education:
  - degree: string
    school: string
    year: string
skills:
  languages: string[]
  frontend: string[]
  backend: string[]
  tools: string[]
```

## Visual Design

### Typography

- **Headings:** Playfair Display (serif) — bold, expressive, used at large sizes (64-110px for hero, 28-64px for section headings)
- **Body:** Inter (sans-serif) — clean, readable, weights 200-600
- **Code/tags:** JetBrains Mono (monospace) — used for tech stack tags
- **Mixed weights in hero:** The hero uses a contrast of Playfair 900 and Inter 200 on alternating lines for visual rhythm

### Color Palette

**Light theme (default):**

| Token | Value | Usage |
|---|---|---|
| `--blush` | `#c2577a` | Primary accent |
| `--blush-mid` | `#d88aa5` | Secondary accent, hover states |
| `--blush-light` | `#e8b4c8` | Borders, decorative lines |
| `--blush-pale` | `#f5dce6` | Ghost text strokes, floating shapes |
| `--cream` | `#fdf8f5` | Page background |
| `--dark` | `#1a1118` | Headings, primary text |
| `--text` | `#3d2d35` | Body text |
| `--text-light` | `#8a7a82` | Secondary text |
| `--text-muted` | `#b8a8b0` | Tertiary text, labels |
| `--border` | `#ede2e6` | Dividers, card borders |

**Dark theme:**

| Token | Value | Usage |
|---|---|---|
| `--blush` | `#d88aa5` | Primary accent (slightly lighter for contrast) |
| `--blush-mid` | `#c2577a` | Secondary accent |
| `--blush-light` | `#8a4a62` | Borders, decorative lines |
| `--blush-pale` | `#3a2030` | Ghost text, shapes |
| `--cream` | `#0f0a0d` | Page background (warm dark) |
| `--dark` | `#f5eff0` | Headings |
| `--text` | `#d8ccd0` | Body text |
| `--text-light` | `#9a8a92` | Secondary text |
| `--text-muted` | `#5a4a52` | Tertiary text |
| `--border` | `#2a1e24` | Dividers, card borders |

Theme toggle in nav, persisted to `localStorage`. Respects `prefers-color-scheme` as default.

### Visual Effects

- **Grain texture:** Subtle SVG noise overlay across the entire page (opacity ~0.025)
- **Floating shapes:** 2-3 organic blobs in the hero area — soft radial gradients + one morphing outlined shape. CSS animations, slow drift (15-25s cycles)
- **Ghost watermarks:** Large outlined section numbers (e.g. "01") in the hero background using `-webkit-text-stroke`
- **Background text:** "Say hello" ghost text behind the contact section

### Interactions & Animation

- **Custom cursor:** Small blush dot with a trailing ring that follows with eased delay. Ring scales up on interactive elements. `mix-blend-mode: difference` so it inverts over content.
- **Hero text reveal:** Lines stagger in with `translateY(110%) skewY(5deg)` → `translateY(0) skewY(0)`, each delayed ~0.15s apart
- **Scroll reveals:** Sections animate in with `translateY(60px) skewY(1.5deg)` → origin. Triggered by IntersectionObserver at ~10% visibility
- **Scrolling marquee:** Infinite horizontal ticker between hero and content ("Available for freelance", "Full-stack development", etc.) with blush dot separators
- **Nav link underlines:** Animated width from 0 → 100% on hover
- **Project card:** Lifts on hover, inner screenshot scales + slight rotation, gradient overlay fades in from bottom
- **Email underline:** `background-size` animated from `0 2px` → `100% 2px` on hover
- **Skill columns:** Background tints and dots fill with blush on column hover
- **Arrow links:** Gap and arrow width animate on hover
- **Theme toggle:** Circle that fills on hover
- **Resume timeline dots:** Fill with blush on entry hover

### Navigation

- Fixed top bar with `mix-blend-mode: difference` (text always visible)
- Logo: `tyrion.` in Playfair Display (the dot in blush)
- Links: Work, About, Resume, Contact — uppercase, letterspaced
- Theme toggle: Small circle, right-most element
- Sticky with no visible background — content scrolls behind it

## Homepage Sections

### 1. Hero (full viewport height)

- Label: "SOFTWARE ENGINEER" with trailing line
- Three-line heading with staggered reveal:
  - Line 1 (Playfair 900, 110px): `Hi, I'm Name`  (name in italic blush)
  - Line 2 (Inter 200, 64px): `I craft digital experiences`
  - Line 3 (Playfair 900, 110px): `for the web.`
- Description paragraph below (Inter 350, 15px)
- Scroll indicator: vertical text "Scroll" + pulsing line
- Background: ghost "01" watermark, floating blush shapes, morphing blob

### 2. Marquee

- Horizontal scrolling ticker between hero and projects
- Items: "Available for freelance", "Full-stack development", "UI/UX design", "Web applications", "Design systems", "Creative development"
- Blush dot separators
- Bordered top and bottom

### 3. Projects (section 02)

- Numbered label: `02 — SELECTED WORK`
- Heading: `Featured` / `projects` (projects in italic blush)
- Project card: full-width, rounded corners
  - Image area: blush gradient background with dot pattern, inner white card (screenshot), hover overlay with "View project →"
  - Body: grid layout — project info left (label, name, description), meta right (tags, case study link)
- Currently shows 1 featured project. As more are added, stack vertically with alternating layouts or consistent cards.

### 4. Skills (section 03)

- Numbered label: `03 — TOOLKIT`
- Heading: `Skills &` / `technologies` (technologies in italic blush)
- Top area: description paragraph left, stat numbers right (years exp, technologies count)
- 3-column grid in a bordered card: Languages, Frameworks, Tools
- Each column has a Playfair heading with a small "01/02/03" index
- Hover: column background tints, dots fill with blush

### 5. About (section 04)

- Numbered label: `04 — ABOUT`
- Heading: `A bit` / `about me` (about me in italic blush)
- Two-column layout: photo left (3:4 aspect, rounded, with offset border + morphing accent shape), content right
- Pull quote in Playfair italic: "I'm a developer who believes great software starts with great design."
- Bio paragraph
- Stats row in bordered card: Focus, Based in, Status (status in blush)

### 6. Contact (section 05)

- Centered layout
- Ghost "Say hello" background text (large, outlined)
- Heading: `Let's work` / `together` (together in italic blush)
- Subtitle
- Email link with animated underline
- "or find me on" text
- Social links as pill buttons (GitHub, LinkedIn)

### 7. Footer

- Simple flex row: © 2026 left, links center, "Built with Astro" right

## Project Detail Page (`/projects/[slug]`)

- Back link with animated arrow: "← Back to projects"
- Hero: label (type + year), title (Playfair 72px), description, meta row (role, timeline, status)
- Full-width cover image area (rounded, dot pattern, inner screenshot)
- Content sections (narrow max-width, centered):
  - 01 — THE PROBLEM: Why this exists
  - 02 — THE APPROACH: How it was built
  - 03 — TECH STACK: Tag pills
- CTA buttons: Live Site + GitHub
- Screenshot gallery: 2-column grid, hover scale

All content sourced from the project's markdown file.

## Resume Page (`/resume`)

- Hero: "Curriculum Vitae" label, "My résumé" heading, download PDF button
- Numbered sections with header line:
  - **01 Experience:** Timeline layout — vertical line with dot markers, dates left, role/company/description right. Dots fill with blush on hover.
  - **02 Education:** 2-column card grid with degree, school, year. Cards have hover lift.
  - **03 Skills:** 4-column bordered grid (Languages, Frontend, Backend, Tools) with hover column highlight.

All content sourced from resume markdown file.

## Responsive Considerations

- Mobile breakpoint at ~768px
- Nav collapses to hamburger menu
- Hero font sizes scale down (~48-60px on mobile)
- Project card stacks vertically (image on top, info below)
- Skills and resume grids collapse to single column
- Custom cursor disabled on touch devices
- Marquee text scales down
- Floating hero shapes scale down or hide on small screens

## Dark Mode Behavior

- Toggle in nav, saved to `localStorage`
- Defaults to `prefers-color-scheme` on first visit
- Implemented via CSS custom properties on `:root` / `[data-theme="dark"]`
- Transition: all colors animate with `transition: color 0.3s, background-color 0.3s`
- Grain overlay opacity stays the same
- Floating shapes get darker tints
- Ghost text stroke color darkens
