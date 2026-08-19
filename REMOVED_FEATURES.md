# Removed Features & Components Log

This document records the features, pages, components, and assets removed from the active portfolio. All information and code snippets needed to restore these features in the future are documented below.

---

## 📋 Summary of Removed Features

| Feature / Component | Source Files Affected | Description | Status |
| :--- | :--- | :--- | :--- |
| **About Navigation Link** | `home.html`, `projects.html` | "About" toggle button inside the top floating navigation pill | **Removed from Active UI** |
| **About Footer Link** | `home.html` | "About" navigation link under the *Explore* footer column | **Removed from Active UI** |
| **About Page & Sections** | `about.html`, `about.css`, `about.js` | Dedicated About Me story page containing biography, education, internships, open source, and AI work | **Archived / Documented** |

---

## 🔍 Detailed Breakdown of Removed Sections & Content

### 1. Hero & Philosophy
- **Tagline**: *"I'm passionate about creating intelligent & impactful web products that empower people."*
- **Overline Tag**: `ABOUT ME` with glowing indicator dot.

### 2. Education & Academic Background
- **Heading**: *My journey in Computer Science & Engineering*
- **Details**: Pursuing B.Tech in Computer Science & Engineering at **Central University of Haryana** (2023–2027). Focus on software engineering foundations, web tech, and AI.
- **Visual Asset**: Campus / student journey photo  
  `https://res.cloudinary.com/dcf0cpuqf/image/upload/v1775931367/IMG-20251211-WA0475_3_uqrk9o.jpg`

### 3. Work Experience & Internships
- **Heading**: *Hands-on Experience & Internships*
- **Details**:
  - **Ignix Social** (Web Developer Intern): React.js, Node.js, microservice containerization with Docker for AWS deployments.
  - **Labmentix** (Full Stack Intern): End-to-end full-stack solutions and secure RESTful APIs using Express and MongoDB.
- **Visual Asset**: Engineering journey photo  
  `https://res.cloudinary.com/dcf0cpuqf/image/upload/v1734466294/airportview_xva1b2.jpg`

### 4. Open-Source Contributions
- **Heading**: *Open-Source & Community Contributions*
- **Details**: **GirlScript Summer of Code (GSSoC)** — Refactored UI components for accessibility, improved responsiveness, boosted Lighthouse UX scores by ~20%, and collaborated via GitHub PRs & code reviews.
- **Visual Asset**: Collaboration photo  
  `https://res.cloudinary.com/dcf0cpuqf/image/upload/v1775932821/IMG-20251213-WA0215_2_m90urw.jpg`

### 5. AI Exploration & Real-Time Tech
- **Heading**: *Building with AI & Real-Time Tech*
- **Details**: Explores Generative AI, LLM orchestration (Groq API, OpenAI API), and real-time multi-client systems using WebSockets / Socket.io (AI Resume Analyzer, Code Room).
- **Visual Asset**: Focus & development graphic  
  `https://res.cloudinary.com/dcf0cpuqf/image/upload/v1734469356/serene_vhuqn3.png`

### 6. Technical Toolbelt & Values
- **Heading**: *Technical Toolbelt & Values*
- **Details**: JavaScript (ES6+), Python, C/C++, React.js, Node.js, Express, SQL, MongoDB, Supabase, Docker, AWS.
- **Visual Asset**: Coding setup graphic  
  `https://res.cloudinary.com/dcf0cpuqf/image/upload/v1739209899/pixelcut-export_2_nxj9ed.jpg`

### 7. Connect, Collaboration & Signature
- **Heading**: *Let's Connect & Collaborate!*
- **Details**: Contact links for Email (`pallaviiik11.11@gmail.com`), LinkedIn, and GitHub.
- **Signature Component**: Custom serif styled signature (*Pallavi Kumari*) using the `Gloock` font.
- **Visual Asset**: Creative explorations photo  
  `https://res.cloudinary.com/dcf0cpuqf/image/upload/v1734466293/dogview_pj6fzz.jpg`

---

## 🎨 UI/UX Component Specifications

1. **Mac-style Window Containers**:
   - Window bar with three colored control dots (red, yellow, green: `#ff5f56`, `#ffbd2e`, `#27c93f`).
   - Glare highlight overlay (`.glare-item-top`) with linear gradient glassmorphic shine.
   - Dual-layout responsive design: alternating double-column staggered grid for desktop (`.section-info-hero.desktop`) and single-column stack for mobile (`.section-info-hero.mobile`).

2. **Interactive Elements**:
   - Interactive custom cursor trail (20 trailing circles with dynamic velocity and scale).
   - Glassmorphic top navigation bar with active glow pill indicator.
   - Mobile slide-out popup menu with toggle animation.

---

## 🔄 Restoration Guide

To re-enable the About section across the website in the future:

### Step 1: Restore Navigation Links

In `home.html` and `projects.html`, re-add the About nav toggle in `.nav-pill`:

```html
<a href="#" class="nav-toggle about w-inline-block" onclick="setActive('about')">
  <div class="text-nav-toggle">About</div>
</a>
```

### Step 2: Restore Footer Link

In `home.html`, re-add the link under the *Explore* column (`.footer-col`):

```html
<a href="/about.html" class="footer-link">About</a>
```

### Step 3: Files Available for Use
The complete standalone files remain available in the repository root if you wish to link to them or integrate their components directly into `home.html`:
- `about.html` — Full page HTML structure
- `about.css` — Dedicated stylesheet with responsive layout and glassmorphic window styles
- `about.js` — Navigation script and interaction handlers
