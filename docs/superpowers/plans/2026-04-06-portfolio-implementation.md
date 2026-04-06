# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bold, animation-rich developer portfolio with Astro, Tailwind, and a blush pink aesthetic.

**Architecture:** Astro SSG with Content Collections for projects and resume. Tailwind CSS with CSS custom properties for light/dark theming. Vanilla JS for custom cursor, theme toggle, and scroll animations via IntersectionObserver. All components are `.astro` files — no React/Vue/Svelte.

**Tech Stack:** Astro 5, Tailwind CSS 4, TypeScript, Content Collections (Zod schemas), Google Fonts (Playfair Display, Inter, JetBrains Mono)

**Spec:** `docs/superpowers/specs/2026-04-06-portfolio-design.md`

---

## File Structure

```
src/
  assets/
    fonts/           # (if self-hosting later)
  components/
    Nav.astro           # Fixed nav bar with mix-blend-mode
    ThemeToggle.astro   # Dark/light mode toggle button
    CustomCursor.astro  # Dot + ring cursor with JS
    Hero.astro          # Full-viewport hero with animated text
    Marquee.astro       # Scrolling ticker strip
    ProjectCard.astro   # Featured project card on homepage
    SkillsGrid.astro    # 3-column skills with stats
    About.astro         # Photo + bio + stats layout
    Contact.astro       # Centered CTA with ghost text
    Footer.astro        # Simple footer row
    SectionHeader.astro # Reusable numbered section label + heading
    ScrollReveal.astro  # Wrapper that triggers reveal animation
  layouts/
    Layout.astro        # Base HTML shell: fonts, meta, grain, cursor, nav
  pages/
    index.astro         # Homepage: hero, marquee, projects, skills, about, contact
    resume.astro        # Resume/CV page
    projects/
      [...slug].astro   # Dynamic project detail pages from content
  content/
    projects/
      sample-project.md # Sample featured project
    resume/
      resume.md         # Resume content
  content.config.ts     # Content collection schemas
  styles/
    global.css          # Tailwind directives, custom properties, grain, base styles
astro.config.mjs        # Astro config with Tailwind integration
tailwind.config.mjs     # Tailwind config with custom theme
tsconfig.json           # TypeScript config
package.json
```

---

### Task 1: Scaffold Astro Project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`, `src/styles/global.css`, `src/pages/index.astro`, `src/layouts/Layout.astro`

- [ ] **Step 1: Initialize Astro project**

Run:
```bash
cd /Users/tyrion/Dev/portfolio
npm create astro@latest . -- --template minimal --no-install --typescript strict
```

Accept overwriting if prompted. This scaffolds the minimal Astro template.

- [ ] **Step 2: Install dependencies**

Run:
```bash
npm install
npm install @astrojs/tailwind tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Configure Astro with Tailwind**

Replace `astro.config.mjs` with:

```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 4: Create global CSS with Tailwind directives and custom properties**

Create `src/styles/global.css`:

```css
@import "tailwindcss";

@theme {
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-serif: 'Playfair Display', ui-serif, Georgia, serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  --color-blush: #c2577a;
  --color-blush-mid: #d88aa5;
  --color-blush-light: #e8b4c8;
  --color-blush-pale: #f5dce6;
  --color-cream: #fdf8f5;
  --color-dark: #1a1118;
  --color-text: #3d2d35;
  --color-text-light: #8a7a82;
  --color-text-muted: #b8a8b0;
  --color-border: #ede2e6;
}

/* Light theme (default) */
:root {
  --bg: var(--color-cream);
  --fg: var(--color-dark);
  --fg-body: var(--color-text);
  --fg-light: var(--color-text-light);
  --fg-muted: var(--color-text-muted);
  --accent: var(--color-blush);
  --accent-mid: var(--color-blush-mid);
  --accent-light: var(--color-blush-light);
  --accent-pale: var(--color-blush-pale);
  --surface: #ffffff;
  --border: var(--color-border);
}

/* Dark theme */
[data-theme="dark"] {
  --bg: #0f0a0d;
  --fg: #f5eff0;
  --fg-body: #d8ccd0;
  --fg-light: #9a8a92;
  --fg-muted: #5a4a52;
  --accent: #d88aa5;
  --accent-mid: #c2577a;
  --accent-light: #8a4a62;
  --accent-pale: #3a2030;
  --surface: #1a1216;
  --border: #2a1e24;
}

/* Base resets */
* { margin: 0; padding: 0; box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: var(--font-sans);
  background: var(--bg);
  color: var(--fg-body);
  overflow-x: hidden;
  transition: background-color 0.4s ease, color 0.4s ease;
}

/* Grain overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 999;
}

/* Selection color */
::selection {
  background: var(--accent-pale);
  color: var(--accent);
}

/* Scroll reveal base */
.reveal {
  opacity: 0;
  transform: translateY(60px) skewY(1.5deg);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0) skewY(0);
}
.reveal-d1 { transition-delay: 0.15s; }
.reveal-d2 { transition-delay: 0.3s; }
.reveal-d3 { transition-delay: 0.45s; }

/* Hero text reveal animation */
@keyframes text-up {
  from { opacity: 0; transform: translateY(110%) skewY(5deg); }
  to { opacity: 1; transform: translateY(0) skewY(0); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Floating shape animations */
@keyframes float1 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-20px, 30px); }
}
@keyframes float2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(15px, -25px); }
}
@keyframes morph {
  0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; transform: rotate(0deg); }
  25% { border-radius: 58% 42% 35% 65% / 56% 68% 32% 44%; }
  50% { border-radius: 50% 50% 33% 67% / 55% 25% 75% 45%; transform: rotate(90deg); }
  75% { border-radius: 33% 67% 58% 42% / 63% 39% 61% 37%; }
}

/* Scroll bar pulse */
@keyframes pulse-bar {
  0%, 100% { opacity: 1; transform: scaleY(1); }
  50% { opacity: 0.3; transform: scaleY(0.5); transform-origin: top; }
}

/* Marquee scroll */
@keyframes scroll-marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Slide bar for scroll hint */
@keyframes slide-bar {
  0% { left: -100%; }
  50% { left: 0; }
  100% { left: 100%; }
}
```

- [ ] **Step 5: Create base Layout component**

Create `src/layouts/Layout.astro`:

```astro
---
interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'Tyrion — Software Engineer',
  description = 'Developer portfolio — crafting clean, thoughtful digital experiences.'
} = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />

    <!-- Theme initialization (prevent flash) -->
    <script is:inline>
      const saved = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));
    </script>
  </head>
  <body>
    <slot />

    <!-- Scroll reveal observer -->
    <script>
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -80px 0px' }
      );
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    </script>
  </body>
</html>

<style>
  @import '../styles/global.css';
</style>
```

- [ ] **Step 6: Create minimal index page**

Replace `src/pages/index.astro` with:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout>
  <main>
    <h1 style="padding: 200px 56px; font-family: var(--font-serif); font-size: 64px; color: var(--fg);">
      Portfolio coming soon.
    </h1>
  </main>
</Layout>
```

- [ ] **Step 7: Verify dev server starts**

Run:
```bash
npm run dev
```
Expected: Server starts on `localhost:4321`, page shows "Portfolio coming soon." with Inter font on cream background.

- [ ] **Step 8: Add .gitignore and commit**

Create `.gitignore`:
```
node_modules/
dist/
.astro/
.superpowers/
.DS_Store
```

Run:
```bash
git add -A && git commit -m "feat: scaffold Astro project with Tailwind and theme system"
```

---

### Task 2: Navigation + Theme Toggle

**Files:**
- Create: `src/components/Nav.astro`, `src/components/ThemeToggle.astro`
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Create ThemeToggle component**

Create `src/components/ThemeToggle.astro`:

```astro
<button class="theme-toggle" aria-label="Toggle dark mode" type="button">
  <span class="theme-toggle-icon"></span>
</button>

<style>
  .theme-toggle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1.5px solid currentColor;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s;
    padding: 0;
    color: inherit;
  }
  .theme-toggle:hover {
    background: currentColor;
    transform: scale(1.4);
  }
  .theme-toggle-icon {
    display: none;
  }
</style>

<script>
  const toggle = document.querySelector('.theme-toggle');
  toggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
</script>
```

- [ ] **Step 2: Create Nav component**

Create `src/components/Nav.astro`:

```astro
---
import ThemeToggle from './ThemeToggle.astro';

const links = [
  { label: 'Work', href: '/#projects' },
  { label: 'About', href: '/#about' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/#contact' },
];
---

<nav class="nav">
  <a href="/" class="nav-logo">tyrion<span class="nav-dot">.</span></a>
  <div class="nav-links">
    {links.map((link) => (
      <a href={link.href} class="nav-link">{link.label}</a>
    ))}
    <ThemeToggle />
  </div>
</nav>

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 80;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 28px 56px;
    mix-blend-mode: difference;
  }
  .nav-logo {
    font-family: var(--font-serif);
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
  }
  .nav-dot {
    color: #fff;
  }
  .nav-links {
    display: flex;
    gap: 36px;
    align-items: center;
  }
  .nav-link {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    position: relative;
    padding-bottom: 2px;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: #fff;
    transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .nav-link:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    .nav {
      padding: 20px 24px;
    }
    .nav-link {
      display: none;
    }
  }
</style>
```

- [ ] **Step 3: Add Nav to Layout**

Update `src/layouts/Layout.astro` — add the import and component in the `<body>`:

Add to the frontmatter:
```astro
import Nav from '../components/Nav.astro';
```

Add just inside `<body>`, before `<slot />`:
```astro
<Nav />
```

- [ ] **Step 4: Verify nav renders**

Run `npm run dev`. Expected: Fixed nav at top with "tyrion." logo and links. Clicking the circle toggles dark/light mode. Nav text stays visible over content via mix-blend-mode.

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.astro src/components/ThemeToggle.astro src/layouts/Layout.astro
git commit -m "feat: add navigation with theme toggle"
```

---

### Task 3: Custom Cursor

**Files:**
- Create: `src/components/CustomCursor.astro`
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Create CustomCursor component**

Create `src/components/CustomCursor.astro`:

```astro
<div class="cursor-dot" id="cursor-dot"></div>
<div class="cursor-ring" id="cursor-ring"></div>

<style>
  .cursor-dot {
    width: 8px;
    height: 8px;
    background: var(--accent);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 100;
    mix-blend-mode: difference;
    transition: transform 0.15s ease;
  }
  .cursor-ring {
    width: 36px;
    height: 36px;
    border: 1.5px solid var(--accent);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 100;
    opacity: 0.4;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* Hide on touch devices */
  @media (pointer: coarse) {
    .cursor-dot,
    .cursor-ring {
      display: none;
    }
  }
</style>

<script>
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0, dx = 0, dy = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    function animate() {
      dx += (mx - dx) * 0.15;
      dy += (my - dy) * 0.15;
      dot.style.left = `${mx - 4}px`;
      dot.style.top = `${my - 4}px`;
      ring.style.left = `${dx - 18}px`;
      ring.style.top = `${dy - 18}px`;
      requestAnimationFrame(animate);
    }
    animate();

    // Grow ring on interactive elements
    const interactives = 'a, button, [role="button"], .project-card, .tag, .skill-col';
    document.querySelectorAll(interactives).forEach((el) => {
      el.addEventListener('mouseenter', () => {
        ring.style.transform = 'scale(1.6)';
        ring.style.opacity = '0.2';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.transform = 'scale(1)';
        ring.style.opacity = '0.4';
      });
    });

    // Hide default cursor
    document.body.style.cursor = 'none';
    document.querySelectorAll('a, button').forEach((el) => {
      (el as HTMLElement).style.cursor = 'none';
    });
  }
</script>
```

- [ ] **Step 2: Add CustomCursor to Layout**

Update `src/layouts/Layout.astro` frontmatter:
```astro
import CustomCursor from '../components/CustomCursor.astro';
```

Add just inside `<body>`, before `<Nav />`:
```astro
<CustomCursor />
```

- [ ] **Step 3: Verify cursor works**

Run `npm run dev`. Expected: Small blush dot follows mouse exactly, larger ring trails with eased delay. Ring grows on hover over links/buttons. Hidden on touch devices.

- [ ] **Step 4: Commit**

```bash
git add src/components/CustomCursor.astro src/layouts/Layout.astro
git commit -m "feat: add custom cursor with trailing ring"
```

---

### Task 4: Hero Section

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Hero component**

Create `src/components/Hero.astro`:

```astro
<section class="hero" id="hero">
  <!-- Background decorations -->
  <div class="hero-bg-num" aria-hidden="true">01</div>
  <div class="hero-shape hero-shape-1" aria-hidden="true"></div>
  <div class="hero-shape hero-shape-2" aria-hidden="true"></div>
  <div class="hero-shape hero-shape-3" aria-hidden="true"></div>

  <div class="hero-top-row">
    <span class="hero-tag">Software Engineer</span>
    <span class="hero-tag-line" aria-hidden="true"></span>
  </div>

  <h1 class="hero-title">
    <span class="hero-line hero-line-serif">
      <span class="text-slide">Hi, I'm <em>Tyrion</em></span>
    </span>
    <span class="hero-line hero-line-sans">
      <span class="text-slide">I craft digital experiences</span>
    </span>
    <span class="hero-line hero-line-serif">
      <span class="text-slide">for the web.</span>
    </span>
  </h1>

  <div class="hero-bottom">
    <p class="hero-desc">
      <strong>Design-driven developer</strong> focused on building interfaces that feel as good as they look.
    </p>
    <div class="scroll-indicator" aria-hidden="true">
      <span class="scroll-text">Scroll</span>
      <div class="scroll-bar"></div>
    </div>
  </div>
</section>

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 56px 80px;
    position: relative;
    overflow: hidden;
  }

  /* Background number */
  .hero-bg-num {
    position: absolute;
    top: 50%;
    right: -40px;
    transform: translateY(-50%);
    font-family: var(--font-serif);
    font-size: 400px;
    font-weight: 900;
    color: transparent;
    -webkit-text-stroke: 1px var(--accent-pale);
    line-height: 1;
    user-select: none;
    opacity: 0;
    animation: fade-in 1.5s ease forwards 0.3s;
  }

  /* Floating shapes */
  .hero-shape {
    position: absolute;
    border-radius: 50%;
    opacity: 0;
  }
  .hero-shape-1 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, var(--accent-pale), transparent 70%);
    top: 15%;
    right: 15%;
    animation: fade-in 1.5s ease forwards 0.2s, float1 16s ease-in-out infinite 1.7s;
  }
  .hero-shape-2 {
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, color-mix(in srgb, var(--accent-light) 30%, transparent), transparent 70%);
    bottom: 25%;
    right: 35%;
    animation: fade-in 1.5s ease forwards 0.4s, float2 12s ease-in-out infinite 1.9s;
  }
  .hero-shape-3 {
    width: 120px;
    height: 120px;
    border: 1px solid var(--accent-pale);
    top: 30%;
    right: 30%;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    animation: fade-in 1.5s ease forwards 0.6s, morph 15s ease-in-out infinite 2.1s;
  }

  /* Top row */
  .hero-top-row {
    display: flex;
    align-items: baseline;
    gap: 24px;
    margin-bottom: 12px;
  }
  .hero-tag {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 5px;
    color: var(--accent);
    font-weight: 500;
    opacity: 0;
    animation: slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.4s;
  }
  .hero-tag-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, var(--accent-light), transparent);
    opacity: 0;
    animation: slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.5s;
  }

  /* Title */
  .hero-title {
    font-weight: 900;
    color: var(--fg);
    margin-bottom: 0;
    position: relative;
    z-index: 2;
  }
  .hero-line {
    display: block;
    overflow: hidden;
  }
  .hero-line-serif {
    font-family: var(--font-serif);
    font-size: 110px;
    line-height: 0.9;
    letter-spacing: -5px;
    margin-bottom: 4px;
  }
  .hero-line-sans {
    font-family: var(--font-sans);
    font-size: 64px;
    font-weight: 200;
    letter-spacing: -2px;
    line-height: 1.1;
    color: var(--fg-light);
    margin-bottom: 4px;
  }
  .text-slide {
    display: block;
    opacity: 0;
    transform: translateY(110%) skewY(5deg);
    animation: text-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .hero-line:nth-child(1) .text-slide { animation-delay: 0.5s; }
  .hero-line:nth-child(2) .text-slide { animation-delay: 0.65s; }
  .hero-line:nth-child(3) .text-slide { animation-delay: 0.8s; }
  .hero-title em {
    font-style: italic;
    font-weight: 500;
    color: var(--accent);
  }

  /* Bottom */
  .hero-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 48px;
    position: relative;
    z-index: 2;
    opacity: 0;
    animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 1.2s;
  }
  .hero-desc {
    font-size: 15px;
    color: var(--fg-light);
    line-height: 1.75;
    max-width: 340px;
    font-weight: 350;
  }
  .hero-desc strong {
    color: var(--fg-body);
    font-weight: 600;
  }

  /* Scroll indicator */
  .scroll-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .scroll-text {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 4px;
    color: var(--fg-muted);
    writing-mode: vertical-rl;
  }
  .scroll-bar {
    width: 1px;
    height: 50px;
    background: linear-gradient(to bottom, var(--accent), transparent);
    animation: pulse-bar 2.5s ease-in-out infinite;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero {
      padding: 0 24px 60px;
    }
    .hero-line-serif {
      font-size: 48px;
      letter-spacing: -2px;
    }
    .hero-line-sans {
      font-size: 28px;
      letter-spacing: -0.5px;
    }
    .hero-bg-num {
      font-size: 200px;
      right: -20px;
    }
    .hero-shape-1 { width: 180px; height: 180px; }
    .hero-shape-2 { width: 120px; height: 120px; }
    .hero-shape-3 { width: 80px; height: 80px; }
    .hero-bottom {
      flex-direction: column;
      gap: 32px;
      align-items: flex-start;
    }
    .scroll-indicator { display: none; }
  }
</style>
```

- [ ] **Step 2: Update index page with Hero**

Replace `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
---

<Layout>
  <main>
    <Hero />
  </main>
</Layout>
```

- [ ] **Step 3: Verify hero renders**

Run `npm run dev`. Expected: Full-viewport hero with staggered text animation, floating shapes, ghost "01", scroll indicator.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add hero section with animated text reveals and floating shapes"
```

---

### Task 5: Marquee

**Files:**
- Create: `src/components/Marquee.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Marquee component**

Create `src/components/Marquee.astro`:

```astro
---
const items = [
  'Available for work',
  'Full-stack development',
  'UI/UX design',
  'Web applications',
  'Design systems',
  'Creative development',
];
// Duplicate for seamless loop
const allItems = [...items, ...items];
---

<div class="marquee" aria-hidden="true">
  <div class="marquee-track">
    {allItems.map((item) => (
      <div class="marquee-item">
        {item}
        <span class="marquee-dot"></span>
      </div>
    ))}
  </div>
</div>

<style>
  .marquee {
    padding: 28px 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    overflow: hidden;
  }
  .marquee-track {
    display: flex;
    animation: scroll-marquee 30s linear infinite;
    width: max-content;
  }
  .marquee-item {
    font-family: var(--font-serif);
    font-size: 16px;
    font-weight: 400;
    color: var(--fg-muted);
    white-space: nowrap;
    padding: 0 28px;
    display: flex;
    align-items: center;
    gap: 28px;
  }
  .marquee-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--accent-light);
    flex-shrink: 0;
  }
</style>
```

- [ ] **Step 2: Add Marquee to index page**

In `src/pages/index.astro`, add to frontmatter:
```astro
import Marquee from '../components/Marquee.astro';
```

Add after `<Hero />`:
```astro
<Marquee />
```

- [ ] **Step 3: Verify marquee scrolls**

Run `npm run dev`. Expected: Smooth infinite scrolling text strip below hero with blush dots between items.

- [ ] **Step 4: Commit**

```bash
git add src/components/Marquee.astro src/pages/index.astro
git commit -m "feat: add scrolling marquee ticker"
```

---

### Task 6: Content Collections

**Files:**
- Create: `src/content.config.ts`, `src/content/projects/sample-project.md`, `src/content/resume/resume.md`

- [ ] **Step 1: Define content collection schemas**

Create `src/content.config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    longDescription: z.string(),
    label: z.string(),
    year: z.number(),
    role: z.string(),
    timeline: z.string(),
    status: z.string(),
    tech: z.array(z.string()),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    order: z.number().default(0),
  }),
});

const resume = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resume' }),
  schema: z.object({
    experience: z.array(
      z.object({
        role: z.string(),
        company: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        description: z.string(),
      })
    ),
    education: z.array(
      z.object({
        degree: z.string(),
        school: z.string(),
        year: z.string(),
      })
    ),
    skills: z.object({
      languages: z.array(z.string()),
      frontend: z.array(z.string()),
      backend: z.array(z.string()),
      tools: z.array(z.string()),
    }),
  }),
});

export const collections = { projects, resume };
```

- [ ] **Step 2: Create sample project**

Create `src/content/projects/sample-project.md`:

```markdown
---
title: "Portfolio Site"
description: "A design-driven developer portfolio with bold typography and scroll animations."
longDescription: "Built from scratch with Astro and Tailwind CSS, this portfolio showcases a commitment to design-driven development. Features include scroll-triggered animations, a custom cursor, light/dark theming, and a blush pink accent palette inspired by editorial design."
label: "Web Application"
year: 2026
role: "Design & Development"
timeline: "2 weeks"
status: "Live"
tech: ["Astro", "TypeScript", "Tailwind CSS"]
featured: true
liveUrl: "#"
githubUrl: "#"
order: 1
---

## The Problem

Most developer portfolios look the same — dark theme, monospace font, minimal effort. I wanted something that reflected my actual taste: clean but expressive, minimal but memorable.

## The Approach

I started with the content architecture, defining what stories I wanted to tell and how they should flow. Then I designed in the browser, iterating on typography, color, and motion until it felt right.

The stack is intentionally simple: Astro for static generation, Tailwind for styling, and vanilla JS for interactions. No framework overhead for a site that's fundamentally about content.
```

- [ ] **Step 3: Create resume content**

Create `src/content/resume/resume.md`:

```markdown
---
experience:
  - role: "Software Engineer"
    company: "Your Company"
    startDate: "2024"
    endDate: "Present"
    description: "Building and shipping features across the full stack. Focused on frontend architecture, design systems, and developer experience."
  - role: "Junior Developer"
    company: "Previous Company"
    startDate: "2022"
    endDate: "2024"
    description: "Developed web applications and internal tools. Gained experience with React, Node.js, and cloud infrastructure."
  - role: "Intern"
    company: "First Company"
    startDate: "2021"
    endDate: "2022"
    description: "Started my career building small features and fixing bugs. Learned the fundamentals of professional software development."
education:
  - degree: "BSc Computer Science"
    school: "Your University"
    year: "2018 — 2022"
  - degree: "AWS Cloud Practitioner"
    school: "Amazon Web Services"
    year: "2023"
skills:
  languages: ["TypeScript", "Python", "Go", "HTML / CSS"]
  frontend: ["React", "Next.js", "Astro", "Tailwind"]
  backend: ["Node.js", "PostgreSQL", "REST APIs", "GraphQL"]
  tools: ["Docker", "Git", "CI/CD", "Figma"]
---
```

- [ ] **Step 4: Verify collections load**

Run `npm run dev`. Check terminal for any schema validation errors. Expected: Clean startup, no errors.

- [ ] **Step 5: Commit**

```bash
git add src/content.config.ts src/content/
git commit -m "feat: add content collections with project and resume schemas"
```

---

### Task 7: SectionHeader + Projects Section

**Files:**
- Create: `src/components/SectionHeader.astro`, `src/components/ProjectCard.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create reusable SectionHeader**

Create `src/components/SectionHeader.astro`:

```astro
---
interface Props {
  number: string;
  label: string;
  title: string;
  accent: string;
}

const { number, label, title, accent } = Astro.props;
---

<div class="reveal">
  <div class="sect-num">{number} — {label}</div>
  <h2 class="sect-h" set:html={`${title}<br><span class="sect-accent">${accent}</span>`} />
</div>

<style>
  .sect-num {
    font-size: 11px;
    letter-spacing: 4px;
    color: var(--accent);
    font-weight: 500;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .sect-num::after {
    content: '';
    width: 40px;
    height: 1px;
    background: linear-gradient(90deg, var(--accent-light), transparent);
  }
  .sect-h {
    font-family: var(--font-serif);
    font-size: 64px;
    font-weight: 900;
    letter-spacing: -3px;
    color: var(--fg);
    line-height: 1;
    margin-bottom: 56px;
  }
  :global(.sect-accent) {
    color: var(--accent);
    font-style: italic;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .sect-h {
      font-size: 40px;
      letter-spacing: -1.5px;
    }
  }
</style>
```

- [ ] **Step 2: Create ProjectCard component**

Create `src/components/ProjectCard.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  label: string;
  year: number;
  tech: string[];
  slug: string;
  githubUrl?: string;
}

const { title, description, label, year, tech, slug, githubUrl } = Astro.props;
---

<a href={`/projects/${slug}`} class="project-card reveal reveal-d2">
  <div class="proj-img-wrap">
    <div class="proj-img-inner">Project screenshot</div>
    <div class="proj-overlay"><span>View project</span></div>
  </div>
  <div class="proj-body">
    <div class="proj-main">
      <div class="proj-label">{label} — {year}</div>
      <h3 class="proj-name">{title}</h3>
      <p class="proj-desc">{description}</p>
    </div>
    <div class="proj-meta">
      <div class="proj-tags">
        {tech.map((t) => <span class="tag">{t}</span>)}
      </div>
      <span class="proj-link-text">
        Case study <span class="arr"></span>
      </span>
    </div>
  </div>
</a>

<style>
  .project-card {
    position: relative;
    border-radius: 28px;
    overflow: hidden;
    background: var(--surface);
    border: 1px solid var(--border);
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    display: block;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .project-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 40px 100px color-mix(in srgb, var(--accent) 8%, transparent);
    border-color: color-mix(in srgb, var(--accent) 15%, transparent);
  }
  .proj-img-wrap {
    height: 440px;
    background: linear-gradient(160deg, var(--accent-pale), color-mix(in srgb, var(--accent-pale) 60%, var(--bg)));
    position: relative;
    overflow: hidden;
  }
  .proj-img-wrap::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(color-mix(in srgb, var(--accent) 6%, transparent) 1.5px, transparent 1.5px);
    background-size: 24px 24px;
  }
  .proj-img-inner {
    position: absolute;
    inset: 48px;
    background: var(--surface);
    border-radius: 16px;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.06);
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--fg-muted);
    font-size: 14px;
  }
  .project-card:hover .proj-img-inner {
    transform: scale(1.04) rotate(-0.8deg);
  }
  .proj-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(26, 17, 24, 0.7), transparent 60%);
    opacity: 0;
    transition: opacity 0.4s;
    display: flex;
    align-items: flex-end;
    padding: 32px;
  }
  .project-card:hover .proj-overlay { opacity: 1; }
  .proj-overlay span {
    font-size: 13px;
    color: #fff;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  .proj-overlay span::after { content: ' →'; }
  .proj-body {
    padding: 40px 48px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 40px;
    align-items: start;
  }
  .proj-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: var(--accent);
    margin-bottom: 14px;
    font-weight: 600;
  }
  .proj-name {
    font-family: var(--font-serif);
    font-size: 34px;
    font-weight: 900;
    letter-spacing: -1px;
    color: var(--fg);
    margin-bottom: 14px;
  }
  .proj-desc {
    font-size: 15px;
    color: var(--fg-light);
    line-height: 1.7;
    max-width: 480px;
  }
  .proj-meta { text-align: right; padding-top: 4px; }
  .proj-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  .tag {
    font-size: 10px;
    font-family: var(--font-mono);
    padding: 6px 14px;
    border: 1px solid var(--border);
    border-radius: 100px;
    color: var(--fg-light);
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.25s;
  }
  .tag:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
  .proj-link-text {
    font-size: 12px;
    font-weight: 600;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 2px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  .arr {
    display: inline-block;
    width: 20px;
    height: 1px;
    background: var(--accent);
    position: relative;
    transition: width 0.3s;
  }
  .arr::after {
    content: '';
    position: absolute;
    right: 0;
    top: -3px;
    width: 6px;
    height: 6px;
    border-top: 1px solid var(--accent);
    border-right: 1px solid var(--accent);
    transform: rotate(45deg);
  }
  .project-card:hover .arr { width: 36px; }

  @media (max-width: 768px) {
    .proj-img-wrap { height: 260px; }
    .proj-img-inner { inset: 24px; }
    .proj-body {
      padding: 24px;
      grid-template-columns: 1fr;
      gap: 20px;
    }
    .proj-meta { text-align: left; }
    .proj-tags { justify-content: flex-start; }
    .proj-name { font-size: 24px; }
  }
</style>
```

- [ ] **Step 3: Add Projects section to index page**

Update `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import Marquee from '../components/Marquee.astro';
import SectionHeader from '../components/SectionHeader.astro';
import ProjectCard from '../components/ProjectCard.astro';
import { getCollection } from 'astro:content';

const projects = (await getCollection('projects'))
  .filter((p) => p.data.featured)
  .sort((a, b) => a.data.order - b.data.order);
---

<Layout>
  <main>
    <Hero />
    <Marquee />

    <section class="sect" id="projects">
      <SectionHeader number="02" label="SELECTED WORK" title="Featured" accent="projects" />
      {projects.map((project) => (
        <ProjectCard
          title={project.data.title}
          description={project.data.description}
          label={project.data.label}
          year={project.data.year}
          tech={project.data.tech}
          slug={project.id}
          githubUrl={project.data.githubUrl}
        />
      ))}
    </section>
  </main>
</Layout>

<style>
  .sect {
    padding: 160px 56px;
    position: relative;
    max-width: 1100px;
    margin: 0 auto;
  }
  @media (max-width: 768px) {
    .sect { padding: 80px 24px; }
  }
</style>
```

- [ ] **Step 4: Verify projects section renders**

Run `npm run dev`. Expected: Section header "02 — SELECTED WORK / Featured projects" with the sample project card below. Hover effects work on card.

- [ ] **Step 5: Commit**

```bash
git add src/components/SectionHeader.astro src/components/ProjectCard.astro src/pages/index.astro
git commit -m "feat: add projects section with featured project card"
```

---

### Task 8: Skills Section

**Files:**
- Create: `src/components/SkillsGrid.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create SkillsGrid component**

Create `src/components/SkillsGrid.astro`:

```astro
---
const categories = [
  {
    title: 'Languages',
    index: '01',
    items: ['TypeScript', 'Python', 'Go', 'HTML / CSS'],
  },
  {
    title: 'Frameworks',
    index: '02',
    items: ['React', 'Next.js', 'Astro', 'Node.js'],
  },
  {
    title: 'Tools',
    index: '03',
    items: ['Docker', 'Git', 'PostgreSQL', 'Figma'],
  },
];
---

<div class="sk-top reveal reveal-d1">
  <p class="sk-desc">
    I work across the full stack with a love for clean architecture, great DX, and interfaces that feel intentional.
  </p>
  <div class="sk-numbers">
    <div class="sk-num-item">
      <div class="sk-num-val">3+</div>
      <div class="sk-num-label">Years exp.</div>
    </div>
    <div class="sk-num-item">
      <div class="sk-num-val">10+</div>
      <div class="sk-num-label">Technologies</div>
    </div>
  </div>
</div>

<div class="sk-grid reveal reveal-d2">
  {categories.map((cat) => (
    <div class="skill-col">
      <h4>
        {cat.title}
        <span>{cat.index}</span>
      </h4>
      <ul>
        {cat.items.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  ))}
</div>

<style>
  .sk-top {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 80px;
    margin-bottom: 64px;
    align-items: end;
  }
  .sk-desc {
    font-size: 17px;
    color: var(--fg-light);
    line-height: 1.8;
    font-weight: 350;
  }
  .sk-numbers {
    display: flex;
    gap: 48px;
    justify-content: flex-end;
  }
  .sk-num-item { text-align: center; }
  .sk-num-val {
    font-family: var(--font-serif);
    font-size: 48px;
    font-weight: 900;
    color: var(--fg);
    line-height: 1;
  }
  .sk-num-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--fg-muted);
    margin-top: 8px;
  }
  .sk-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    background: var(--surface);
  }
  .skill-col {
    padding: 40px;
    border-right: 1px solid var(--border);
    transition: background 0.3s;
  }
  .skill-col:last-child { border-right: none; }
  .skill-col:hover {
    background: color-mix(in srgb, var(--accent-pale) 30%, var(--surface));
  }
  .skill-col h4 {
    font-family: var(--font-serif);
    font-size: 20px;
    font-weight: 700;
    color: var(--fg);
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .skill-col h4 span {
    font-family: var(--font-sans);
    font-size: 10px;
    color: var(--fg-muted);
    font-weight: 500;
    letter-spacing: 2px;
  }
  .skill-col ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .skill-col li {
    font-size: 14px;
    color: var(--fg-light);
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: color 0.3s;
  }
  .skill-col li::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--accent-light);
    flex-shrink: 0;
    transition: background 0.3s;
  }
  .skill-col:hover li { color: var(--fg-body); }
  .skill-col:hover li::before { background: var(--accent); }

  @media (max-width: 768px) {
    .sk-top {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .sk-numbers { justify-content: flex-start; }
    .sk-grid { grid-template-columns: 1fr; }
    .skill-col { border-right: none; border-bottom: 1px solid var(--border); }
    .skill-col:last-child { border-bottom: none; }
  }
</style>
```

- [ ] **Step 2: Add Skills to index page**

In `src/pages/index.astro`, add import:
```astro
import SkillsGrid from '../components/SkillsGrid.astro';
```

Add after the projects `</section>`:

```astro
<section class="sect" id="skills">
  <SectionHeader number="03" label="TOOLKIT" title="Skills &" accent="technologies" />
  <SkillsGrid />
</section>
```

- [ ] **Step 3: Verify skills renders**

Run `npm run dev`. Expected: 3-column skills grid with stat numbers above. Columns highlight on hover.

- [ ] **Step 4: Commit**

```bash
git add src/components/SkillsGrid.astro src/pages/index.astro
git commit -m "feat: add skills section with 3-column grid and stats"
```

---

### Task 9: About Section

**Files:**
- Create: `src/components/About.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create About component**

Create `src/components/About.astro`:

```astro
<div class="ab-layout reveal reveal-d2">
  <div class="ab-photo-wrap">
    <div class="ab-photo">Photo</div>
    <div class="ab-photo-border" aria-hidden="true"></div>
    <div class="ab-photo-accent" aria-hidden="true"></div>
  </div>
  <div class="ab-content">
    <div class="ab-quote">
      "I'm a developer who believes great software starts with <span>great design</span>."
    </div>
    <p class="ab-text">
      Your story here. Who you are, what you care about, what kind of problems you love solving.
      Write it like you're talking to someone at a coffee shop — not a recruiter.
      This is where your personality shines.
    </p>
    <div class="ab-stats">
      <div class="ab-stat">
        <label>Focus</label>
        <span>Full-stack</span>
      </div>
      <div class="ab-stat">
        <label>Based in</label>
        <span>Your city</span>
      </div>
      <div class="ab-stat">
        <label>Status</label>
        <span class="hl">Available</span>
      </div>
    </div>
  </div>
</div>

<style>
  .ab-layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 72px;
    align-items: start;
  }
  .ab-photo-wrap { position: relative; }
  .ab-photo {
    width: 100%;
    aspect-ratio: 3/4;
    border-radius: 24px;
    background: linear-gradient(160deg, var(--accent-pale), color-mix(in srgb, var(--accent-pale) 60%, var(--bg)));
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--fg-muted);
    font-size: 13px;
    position: relative;
    z-index: 1;
    border: 1px solid var(--border);
  }
  .ab-photo-border {
    position: absolute;
    inset: -14px;
    border: 1px solid var(--accent-pale);
    border-radius: 32px;
    z-index: 0;
  }
  .ab-photo-accent {
    position: absolute;
    bottom: -20px;
    right: -20px;
    width: 80px;
    height: 80px;
    border: 1px solid var(--accent-pale);
    border-radius: 20% 80% 80% 20% / 80% 20% 80% 20%;
    z-index: 0;
    animation: morph 12s ease-in-out infinite;
  }
  .ab-quote {
    font-family: var(--font-serif);
    font-size: 28px;
    font-weight: 500;
    font-style: italic;
    color: var(--fg);
    line-height: 1.4;
    margin-bottom: 28px;
    letter-spacing: -0.5px;
  }
  .ab-quote span { color: var(--accent); }
  .ab-text {
    font-size: 16px;
    color: var(--fg-light);
    line-height: 1.85;
    margin-bottom: 40px;
    font-weight: 350;
  }
  .ab-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    background: var(--surface);
  }
  .ab-stat {
    padding: 24px 28px;
    border-right: 1px solid var(--border);
    transition: background 0.3s;
  }
  .ab-stat:last-child { border-right: none; }
  .ab-stat:hover {
    background: color-mix(in srgb, var(--accent-pale) 30%, var(--surface));
  }
  .ab-stat label {
    display: block;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: var(--fg-muted);
    font-weight: 600;
    margin-bottom: 8px;
  }
  .ab-stat span {
    font-family: var(--font-serif);
    font-size: 17px;
    font-weight: 700;
    color: var(--fg);
  }
  .ab-stat .hl { color: var(--accent); }

  @media (max-width: 768px) {
    .ab-layout {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .ab-photo-wrap { max-width: 240px; }
    .ab-stats { grid-template-columns: 1fr; }
    .ab-stat { border-right: none; border-bottom: 1px solid var(--border); }
    .ab-stat:last-child { border-bottom: none; }
  }
</style>
```

- [ ] **Step 2: Add About to index page**

In `src/pages/index.astro`, add import:
```astro
import About from '../components/About.astro';
```

Add after skills `</section>`:

```astro
<section class="sect" id="about">
  <SectionHeader number="04" label="ABOUT" title="A bit" accent="about me" />
  <About />
</section>
```

- [ ] **Step 3: Verify and commit**

Run `npm run dev`. Expected: Two-column about section with photo placeholder, quote, bio, and stats row.

```bash
git add src/components/About.astro src/pages/index.astro
git commit -m "feat: add about section with photo, quote, and stats"
```

---

### Task 10: Contact + Footer

**Files:**
- Create: `src/components/Contact.astro`, `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Contact component**

Create `src/components/Contact.astro`:

```astro
<section class="cta" id="contact">
  <div class="cta-bg-text" aria-hidden="true">Say hello</div>
  <div class="reveal">
    <div class="cta-num">05 — CONTACT</div>
    <h2 class="cta-heading">Let's work<br><em>together</em></h2>
    <p class="cta-sub">Got a project in mind? I'd love to hear about it.</p>
    <div class="cta-email-wrap">
      <a href="mailto:hello@youremail.com" class="cta-email">hello@youremail.com</a>
    </div>
    <div class="cta-or">or find me on</div>
    <div class="cta-socials">
      <a href="#" class="cta-social" target="_blank" rel="noopener">GitHub</a>
      <a href="#" class="cta-social" target="_blank" rel="noopener">LinkedIn</a>
    </div>
  </div>
</section>

<style>
  .cta {
    padding: 180px 56px;
    text-align: center;
    position: relative;
    overflow: hidden;
    max-width: 1100px;
    margin: 0 auto;
  }
  .cta-bg-text {
    font-family: var(--font-serif);
    font-size: 200px;
    font-weight: 900;
    color: transparent;
    -webkit-text-stroke: 1px var(--accent-pale);
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    user-select: none;
    opacity: 0.5;
  }
  .cta-num {
    font-size: 11px;
    letter-spacing: 4px;
    color: var(--accent);
    font-weight: 500;
    margin-bottom: 24px;
  }
  .cta-heading {
    font-family: var(--font-serif);
    font-size: 80px;
    font-weight: 900;
    letter-spacing: -3px;
    color: var(--fg);
    line-height: 0.95;
    margin-bottom: 20px;
    position: relative;
    z-index: 1;
  }
  .cta-heading em {
    font-style: italic;
    font-weight: 500;
    color: var(--accent);
  }
  .cta-sub {
    font-size: 17px;
    color: var(--fg-light);
    margin-bottom: 48px;
    font-weight: 350;
    position: relative;
    z-index: 1;
  }
  .cta-email-wrap { position: relative; z-index: 1; }
  .cta-email {
    font-family: var(--font-serif);
    font-size: 28px;
    color: var(--accent);
    text-decoration: none;
    font-weight: 700;
    display: inline-block;
    padding-bottom: 6px;
    background-image: linear-gradient(var(--accent), var(--accent));
    background-size: 0 2px;
    background-position: 0 100%;
    background-repeat: no-repeat;
    transition: background-size 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .cta-email:hover { background-size: 100% 2px; }
  .cta-or {
    font-size: 13px;
    color: var(--fg-muted);
    margin: 20px 0;
    font-style: italic;
    position: relative;
    z-index: 1;
  }
  .cta-socials {
    display: flex;
    gap: 16px;
    justify-content: center;
    position: relative;
    z-index: 1;
  }
  .cta-social {
    padding: 12px 28px;
    border: 1.5px solid var(--border);
    border-radius: 100px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--fg-muted);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s;
    background: color-mix(in srgb, var(--surface) 60%, transparent);
    backdrop-filter: blur(8px);
  }
  .cta-social:hover {
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px color-mix(in srgb, var(--accent) 12%, transparent);
  }

  @media (max-width: 768px) {
    .cta { padding: 100px 24px; }
    .cta-heading { font-size: 44px; letter-spacing: -1.5px; }
    .cta-email { font-size: 20px; }
    .cta-bg-text { font-size: 100px; }
  }
</style>
```

- [ ] **Step 2: Create Footer component**

Create `src/components/Footer.astro`:

```astro
<footer class="foot">
  <span>© {new Date().getFullYear()}</span>
  <div class="foot-links">
    <a href="/resume">Resume</a>
    <a href="#" target="_blank" rel="noopener">GitHub</a>
  </div>
  <span>Built with Astro</span>
</footer>

<style>
  .foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px 56px;
    border-top: 1px solid var(--border);
    font-size: 11px;
    color: var(--fg-muted);
    letter-spacing: 1px;
    max-width: 1100px;
    margin: 0 auto;
  }
  .foot-links {
    display: flex;
    gap: 24px;
  }
  .foot-links a {
    color: var(--fg-muted);
    text-decoration: none;
    transition: color 0.3s;
    font-size: 11px;
  }
  .foot-links a:hover { color: var(--accent); }

  @media (max-width: 768px) {
    .foot { padding: 24px; }
  }
</style>
```

- [ ] **Step 3: Add Contact and Footer to index page**

In `src/pages/index.astro`, add imports:
```astro
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
```

Add after the about `</section>`, before `</main>`:
```astro
    <Contact />
  </main>
  <Footer />
```

Note: Footer goes outside `<main>`.

- [ ] **Step 4: Verify and commit**

Run `npm run dev`. Expected: Contact section with ghost "Say hello" text, email link with animated underline, social pills. Footer at bottom.

```bash
git add src/components/Contact.astro src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add contact section and footer, complete homepage"
```

---

### Task 11: Project Detail Page

**Files:**
- Create: `src/pages/projects/[...slug].astro`

- [ ] **Step 1: Create dynamic project page**

Create `src/pages/projects/[...slug].astro`:

```astro
---
import Layout from '../../layouts/Layout.astro';
import Footer from '../../components/Footer.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map((project) => ({
    params: { slug: project.id },
    props: { project },
  }));
}

const { project } = Astro.props;
const { Content } = await render(project);
const { title, description, label, year, role, timeline, status, tech, liveUrl, githubUrl, gallery } = project.data;
---

<Layout title={`${title} — Tyrion`} description={description}>
  <main class="pd">
    <div class="pd-back">
      <a href="/#projects">
        <span class="pd-back-arrow"></span>
        Back to projects
      </a>
    </div>

    <div class="pd-hero">
      <div class="pd-label">{label} — {year}</div>
      <h1 class="pd-title">{title}</h1>
      <p class="pd-subtitle">{project.data.longDescription}</p>
      <div class="pd-meta">
        <div class="pd-meta-item">
          <label>Role</label>
          <span>{role}</span>
        </div>
        <div class="pd-meta-item">
          <label>Timeline</label>
          <span>{timeline}</span>
        </div>
        <div class="pd-meta-item">
          <label>Status</label>
          <span class="pd-status">{status}</span>
        </div>
      </div>
    </div>

    <div class="pd-cover">
      <div class="pd-cover-inner">Full project screenshot</div>
    </div>

    <div class="pd-content">
      <Content />

      <div class="pd-section">
        <div class="pd-section-num">03 — TECH STACK</div>
        <h3>Built with</h3>
        <div class="pd-tags">
          {tech.map((t) => <span class="pd-tag">{t}</span>)}
        </div>
      </div>

      <div class="pd-links">
        {liveUrl && <a href={liveUrl} class="pd-link pd-link-fill" target="_blank" rel="noopener">Live Site ↗</a>}
        {githubUrl && <a href={githubUrl} class="pd-link pd-link-ghost" target="_blank" rel="noopener">GitHub ↗</a>}
      </div>
    </div>
  </main>
  <Footer />
</Layout>

<style>
  .pd {
    max-width: 1100px;
    margin: 0 auto;
  }
  .pd-back {
    padding: 100px 56px 40px;
  }
  .pd-back a {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: var(--fg-muted);
    text-decoration: none;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: color 0.3s;
  }
  .pd-back a:hover { color: var(--accent); }
  .pd-back-arrow {
    display: inline-block;
    width: 20px;
    height: 1px;
    background: var(--fg-muted);
    position: relative;
    transition: all 0.3s;
  }
  .pd-back a:hover .pd-back-arrow {
    background: var(--accent);
    width: 30px;
  }
  .pd-back-arrow::before {
    content: '';
    position: absolute;
    left: 0;
    top: -3px;
    width: 6px;
    height: 6px;
    border-bottom: 1px solid var(--fg-muted);
    border-left: 1px solid var(--fg-muted);
    transform: rotate(45deg);
    transition: border-color 0.3s;
  }
  .pd-back a:hover .pd-back-arrow::before { border-color: var(--accent); }

  .pd-hero { padding: 0 56px 64px; }
  .pd-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 4px;
    color: var(--accent);
    margin-bottom: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .pd-label::after {
    content: '';
    width: 32px;
    height: 1px;
    background: linear-gradient(90deg, var(--accent-light), transparent);
  }
  .pd-title {
    font-family: var(--font-serif);
    font-size: 72px;
    font-weight: 900;
    letter-spacing: -3px;
    color: var(--fg);
    line-height: 0.95;
    margin-bottom: 24px;
  }
  .pd-subtitle {
    font-size: 18px;
    color: var(--fg-light);
    line-height: 1.7;
    max-width: 560px;
    font-weight: 350;
    margin-bottom: 32px;
  }
  .pd-meta { display: flex; gap: 40px; }
  .pd-meta-item label {
    display: block;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: var(--fg-muted);
    font-weight: 600;
    margin-bottom: 6px;
  }
  .pd-meta-item span { font-size: 14px; color: var(--fg-body); font-weight: 500; }
  .pd-status { color: var(--accent) !important; }

  .pd-cover {
    margin: 0 56px 80px;
    height: 480px;
    background: linear-gradient(160deg, var(--accent-pale), color-mix(in srgb, var(--accent-pale) 60%, var(--bg)));
    border-radius: 24px;
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }
  .pd-cover::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(color-mix(in srgb, var(--accent) 6%, transparent) 1.5px, transparent 1.5px);
    background-size: 24px 24px;
  }
  .pd-cover-inner {
    width: 80%;
    height: 75%;
    background: var(--surface);
    border-radius: 16px;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--fg-muted);
    font-size: 14px;
    z-index: 1;
  }

  .pd-content {
    max-width: 680px;
    margin: 0 auto;
    padding: 0 24px 120px;
  }
  .pd-content :global(h2) {
    font-family: var(--font-serif);
    font-size: 28px;
    font-weight: 700;
    color: var(--fg);
    margin-bottom: 16px;
    margin-top: 56px;
    letter-spacing: -0.5px;
  }
  .pd-content :global(p) {
    font-size: 16px;
    color: var(--fg-light);
    line-height: 1.85;
    font-weight: 350;
    margin-bottom: 16px;
  }

  .pd-section { margin-top: 56px; }
  .pd-section-num {
    font-size: 11px;
    letter-spacing: 4px;
    color: var(--accent);
    font-weight: 500;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .pd-section-num::after {
    content: '';
    width: 24px;
    height: 1px;
    background: var(--accent-light);
  }
  .pd-section h3 {
    font-family: var(--font-serif);
    font-size: 28px;
    font-weight: 700;
    color: var(--fg);
    margin-bottom: 16px;
  }
  .pd-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 8px;
  }
  .pd-tag {
    font-size: 11px;
    font-family: var(--font-mono);
    padding: 6px 16px;
    border: 1px solid var(--border);
    border-radius: 100px;
    color: var(--fg-light);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .pd-links {
    display: flex;
    gap: 16px;
    margin-top: 40px;
  }
  .pd-link {
    padding: 14px 32px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: all 0.3s;
  }
  .pd-link-fill {
    background: var(--accent);
    color: #fff;
  }
  .pd-link-fill:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px color-mix(in srgb, var(--accent) 30%, transparent);
  }
  .pd-link-ghost {
    border: 1.5px solid var(--border);
    color: var(--fg-light);
  }
  .pd-link-ghost:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  @media (max-width: 768px) {
    .pd-back { padding: 80px 24px 24px; }
    .pd-hero { padding: 0 24px 40px; }
    .pd-title { font-size: 40px; letter-spacing: -1.5px; }
    .pd-cover { margin: 0 24px 48px; height: 280px; }
  }
</style>
```

- [ ] **Step 2: Verify project detail page**

Run `npm run dev`. Navigate to `/projects/sample-project`. Expected: Back link, project title, description, cover image area, markdown content rendered, tech tags, CTA buttons.

- [ ] **Step 3: Commit**

```bash
git add src/pages/projects/
git commit -m "feat: add project detail page with case study layout"
```

---

### Task 12: Resume Page

**Files:**
- Create: `src/pages/resume.astro`

- [ ] **Step 1: Create resume page**

Create `src/pages/resume.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Footer from '../components/Footer.astro';
import { getCollection } from 'astro:content';

const resumeEntries = await getCollection('resume');
const resumeData = resumeEntries[0]?.data;

if (!resumeData) {
  throw new Error('No resume content found');
}

const { experience, education, skills } = resumeData;

const skillCategories = [
  { title: 'Languages', items: skills.languages },
  { title: 'Frontend', items: skills.frontend },
  { title: 'Backend', items: skills.backend },
  { title: 'Tools', items: skills.tools },
];
---

<Layout title="Resume — Tyrion" description="My professional experience and skills.">
  <main class="rs">
    <div class="rs-hero">
      <div class="rs-hero-left">
        <div class="rs-hero-label">Curriculum Vitae</div>
        <h1 class="rs-title">My <em>résumé</em></h1>
      </div>
      <a href="#" class="rs-download">↓ Download PDF</a>
    </div>

    <!-- Experience -->
    <div class="rs-section">
      <div class="rs-sect-header">
        <span class="rs-sect-num">01</span>
        <span class="rs-sect-title">Experience</span>
        <div class="rs-sect-line"></div>
      </div>
      <div class="rs-timeline">
        {experience.map((exp) => (
          <div class="rs-entry reveal">
            <div class="rs-date">{exp.startDate} —<br />{exp.endDate}</div>
            <div class="rs-entry-body">
              <div class="rs-role">{exp.role}</div>
              <div class="rs-company">{exp.company}</div>
              <p class="rs-desc">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <!-- Education -->
    <div class="rs-section">
      <div class="rs-sect-header">
        <span class="rs-sect-num">02</span>
        <span class="rs-sect-title">Education</span>
        <div class="rs-sect-line"></div>
      </div>
      <div class="rs-edu-grid reveal">
        {education.map((edu) => (
          <div class="rs-edu-card">
            <div class="rs-edu-degree">{edu.degree}</div>
            <div class="rs-edu-school">{edu.school}</div>
            <div class="rs-edu-year">{edu.year}</div>
          </div>
        ))}
      </div>
    </div>

    <!-- Skills -->
    <div class="rs-section rs-section-last">
      <div class="rs-sect-header">
        <span class="rs-sect-num">03</span>
        <span class="rs-sect-title">Skills</span>
        <div class="rs-sect-line"></div>
      </div>
      <div class="rs-skills-grid reveal">
        {skillCategories.map((cat) => (
          <div class="rs-skill-col">
            <h4>{cat.title}</h4>
            <ul>
              {cat.items.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </main>
  <Footer />
</Layout>

<style>
  .rs { max-width: 1100px; margin: 0 auto; }

  .rs-hero {
    padding: 120px 56px 80px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .rs-hero-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 5px;
    color: var(--accent);
    font-weight: 500;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .rs-hero-label::after {
    content: '';
    width: 32px;
    height: 1px;
    background: linear-gradient(90deg, var(--accent-light), transparent);
  }
  .rs-title {
    font-family: var(--font-serif);
    font-size: 64px;
    font-weight: 900;
    letter-spacing: -3px;
    color: var(--fg);
    line-height: 0.95;
  }
  .rs-title em { font-style: italic; font-weight: 500; color: var(--accent); }
  .rs-download {
    padding: 14px 32px;
    background: var(--accent);
    color: #fff;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .rs-download:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px color-mix(in srgb, var(--accent) 30%, transparent);
  }

  .rs-section { padding: 0 56px 80px; }
  .rs-section-last { padding-bottom: 120px; }
  .rs-sect-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 40px;
  }
  .rs-sect-num {
    font-size: 11px;
    letter-spacing: 4px;
    color: var(--accent);
    font-weight: 500;
  }
  .rs-sect-title {
    font-family: var(--font-serif);
    font-size: 24px;
    font-weight: 700;
    color: var(--fg);
  }
  .rs-sect-line { flex: 1; height: 1px; background: var(--border); }

  /* Timeline */
  .rs-timeline { position: relative; padding-left: 148px; }
  .rs-timeline::before {
    content: '';
    position: absolute;
    left: 100px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--border);
  }
  .rs-entry {
    position: relative;
    margin-bottom: 48px;
  }
  .rs-entry::after {
    content: '';
    position: absolute;
    left: -52px;
    top: 8px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    border: 2px solid var(--accent-light);
    background: var(--bg);
    z-index: 1;
    transition: all 0.3s;
  }
  .rs-entry:hover::after { background: var(--accent); border-color: var(--accent); }
  .rs-date {
    position: absolute;
    left: -148px;
    width: 80px;
    font-size: 12px;
    color: var(--fg-muted);
    font-weight: 500;
    padding-top: 4px;
    text-align: right;
  }
  .rs-role {
    font-family: var(--font-serif);
    font-size: 20px;
    font-weight: 700;
    color: var(--fg);
    margin-bottom: 4px;
  }
  .rs-company {
    font-size: 14px;
    color: var(--accent);
    font-weight: 500;
    margin-bottom: 12px;
  }
  .rs-desc {
    font-size: 14px;
    color: var(--fg-light);
    line-height: 1.75;
    font-weight: 350;
  }

  /* Education */
  .rs-edu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .rs-edu-card {
    padding: 32px;
    border: 1px solid var(--border);
    border-radius: 20px;
    background: var(--surface);
    transition: all 0.3s;
  }
  .rs-edu-card:hover {
    border-color: color-mix(in srgb, var(--accent) 15%, transparent);
    box-shadow: 0 12px 40px color-mix(in srgb, var(--accent) 6%, transparent);
  }
  .rs-edu-degree {
    font-family: var(--font-serif);
    font-size: 18px;
    font-weight: 700;
    color: var(--fg);
    margin-bottom: 4px;
  }
  .rs-edu-school { font-size: 14px; color: var(--accent); font-weight: 500; margin-bottom: 4px; }
  .rs-edu-year { font-size: 12px; color: var(--fg-muted); }

  /* Skills */
  .rs-skills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    background: var(--surface);
  }
  .rs-skill-col {
    padding: 32px;
    border-right: 1px solid var(--border);
    transition: background 0.3s;
  }
  .rs-skill-col:last-child { border-right: none; }
  .rs-skill-col:hover {
    background: color-mix(in srgb, var(--accent-pale) 30%, var(--surface));
  }
  .rs-skill-col h4 {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--fg-muted);
    font-weight: 600;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
    transition: color 0.3s;
  }
  .rs-skill-col:hover h4 { color: var(--accent); }
  .rs-skill-col ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .rs-skill-col li {
    font-size: 13px;
    color: var(--fg-light);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .rs-skill-col li::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--accent-light);
    flex-shrink: 0;
    transition: background 0.3s;
  }
  .rs-skill-col:hover li::before { background: var(--accent); }

  @media (max-width: 768px) {
    .rs-hero {
      padding: 80px 24px 48px;
      flex-direction: column;
      align-items: flex-start;
      gap: 24px;
    }
    .rs-title { font-size: 40px; }
    .rs-section { padding: 0 24px 48px; }
    .rs-timeline { padding-left: 32px; }
    .rs-timeline::before { left: 0; }
    .rs-entry::after { left: -20px; }
    .rs-date { position: static; text-align: left; width: auto; margin-bottom: 8px; }
    .rs-edu-grid { grid-template-columns: 1fr; }
    .rs-skills-grid { grid-template-columns: 1fr 1fr; }
    .rs-skill-col:nth-child(2) { border-right: none; }
    .rs-skill-col:nth-child(1),
    .rs-skill-col:nth-child(2) { border-bottom: 1px solid var(--border); }
  }
</style>
```

- [ ] **Step 2: Verify resume page**

Run `npm run dev`. Navigate to `/resume`. Expected: Hero with title and download button. Timeline for experience with hover dots. Education cards. 4-column skills grid.

- [ ] **Step 3: Commit**

```bash
git add src/pages/resume.astro
git commit -m "feat: add resume page with timeline, education, and skills"
```

---

### Task 13: Final Polish + Build Verification

**Files:**
- Modify: `src/layouts/Layout.astro` (ensure scroll observer re-runs on navigation)
- All existing files (review)

- [ ] **Step 1: Add .superpowers to .gitignore if not present**

Verify `.gitignore` contains `.superpowers/`. If not, add it.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Builds successfully with no errors. Static output in `dist/`.

- [ ] **Step 3: Preview production build**

```bash
npm run preview
```

Expected: Site runs from production build. Check all pages:
- `/` — all homepage sections render, animations trigger on scroll
- `/projects/sample-project` — detail page renders with markdown content
- `/resume` — all sections render with data from markdown
- Theme toggle works and persists across pages
- Custom cursor works on desktop

- [ ] **Step 4: Commit final state**

```bash
git add -A
git commit -m "feat: complete portfolio site with all pages and interactions"
```

---

## Summary

| Task | Component | Key Files |
|------|-----------|-----------|
| 1 | Scaffold + Tailwind + Theming | `astro.config.mjs`, `global.css`, `Layout.astro` |
| 2 | Navigation + Theme Toggle | `Nav.astro`, `ThemeToggle.astro` |
| 3 | Custom Cursor | `CustomCursor.astro` |
| 4 | Hero Section | `Hero.astro` |
| 5 | Marquee | `Marquee.astro` |
| 6 | Content Collections | `content.config.ts`, markdown files |
| 7 | Projects Section | `SectionHeader.astro`, `ProjectCard.astro` |
| 8 | Skills Section | `SkillsGrid.astro` |
| 9 | About Section | `About.astro` |
| 10 | Contact + Footer | `Contact.astro`, `Footer.astro` |
| 11 | Project Detail Page | `projects/[...slug].astro` |
| 12 | Resume Page | `resume.astro` |
| 13 | Polish + Build | All files |
