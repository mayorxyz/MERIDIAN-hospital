<div align="center">

# 🏥 MERIDIAN — General Hospital

**A cinematic, accessibility-first marketing & patient experience platform for a modern hospital — built as a design-forward React SPA with buttery-smooth motion, an animated brand identity, and a fully functional patient hub.**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#-usage--execution)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](#)
[![License](https://img.shields.io/badge/license-MIT-informational)](#-license--acknowledgments)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## 📑 Table of Contents

- [✨ Key Features](#-key-features)
- [🧰 Tech Stack & Prerequisites](#-tech-stack--prerequisites)
- [🚀 Getting Started / Installation](#-getting-started--installation)
- [🎮 Usage & Execution](#-usage--execution)
- [⚙️ Configuration & Environment Variables](#️-configuration--environment-variables)
- [🏗️ Project Architecture](#️-project-architecture--directory-structure)
- [🧪 Testing & Diagnostics](#-testing--diagnostics)
- [🤝 Contributing & Code of Conduct](#-contributing--code-of-conduct)
- [📄 License & Acknowledgments](#-license--acknowledgments)

---

## ✨ Key Features

| | |
|---|---|
| 🎬 **Cinematic page transitions** | Framer Motion–powered route transitions with a shared `pageVariants` orchestration and a consistent custom easing curve (`EASE`). |
| 🧈 **Buttery smooth scrolling** | [Lenis](https://lenis.darkroom.engineering)-driven inertia scrolling on desktop, with automatic fallback to native scrolling on touch devices and for reduced-motion users. |
| ♿ **Accessibility-first motion** | Full `prefers-reduced-motion` support at every layer — CSS keyframes, Framer Motion (`MotionConfig reducedMotion="user"`) and the scroll engine all degrade gracefully. |
| 🖱️ **Delightful micro-interactions** | Custom magnetic buttons, holographic cards, magnetic cursor with contextual labels, text-reveal animations, and confetti on successful form submissions. |
| 📱 **Robust mobile navigation** | Full-screen animated mobile menu — tap *anywhere* to dismiss, always-responsive links (re-tapping the current page scrolls back to top), Escape-key support, and body scroll-locking. |
| 🩺 **Patient Hub** | Interactive cost estimator with live-validated forms (React Hook Form + Zod), insurance & billing accordion, and animated stat counters. |
| ✅ **Schema-validated forms everywhere** | Every user input path is validated with [Zod](https://zod.dev) resolvers wired into React Hook Form, with inline error states and loading indicators. |
| ⚡ **Tiny, fast, no-backend build** | Vite 6 single-bundle output (~155 KB gzipped) that deploys to any static host. |
| 📊 **Data visualization** | Recharts-powered outcome charts and drag-and-drop interactions via `@dnd-kit`. |
| 🎞️ **Infinite marquee ticker** | Seamlessly looping accreditation strip (4-copy, gap-aligned `-50%` translation for a jump-free loop at any viewport width). |

---
## 🧰 Tech Stack & Prerequisites

### Core Technologies

| Layer | Technology |
|---|---|
| **Framework** | React 18 + TypeScript 5.7 |
| **Build tool** | Vite 6 |
| **Styling** | Tailwind CSS 4 (via `@tailwindcss/vite` plugin) |
| **Routing** | React Router DOM 6 (`HashRouter`) |
| **Animation** | Framer Motion 11, Lenis smooth scroll, `canvas-confetti` |
| **Forms** | React Hook Form 7 + `@hookform/resolvers` + Zod |
| **Data viz** | Recharts 2 |
| **Drag & drop** | `@dnd-kit` (core / sortable / utilities) |
| **Backend-ready** | Supabase JS client (`@supabase/supabase-js`) |
| **Icons** | lucide-react |

### System Requirements

- **Node.js** `v18+` (v20 LTS recommended)
- **npm** `v9+` (ships with Node)
- A modern browser (Chrome, Edge, Firefox, Safari — latest 2 versions)
- No database, Docker, or external services are required to run locally

---

## 🚀 Getting Started / Installation

**1. Clone the repository**

```bash
git clone https://github.com/mayorxyz/MERIDIAN-hospital.git
cd MERIDIAN-hospital
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables (optional)**

The app runs fully self-contained with **zero required environment variables**. If you later wire up Supabase for live appointment/doctor data, create your env file from the example:

```bash
cp .env.example .env   # then edit .env with your project credentials
```

See [Configuration & Environment Variables](#️-configuration--environment-variables) for the full reference.

**4. Build steps / migrations**

There is no database to migrate. To verify the project compiles cleanly before developing:

```bash
npm run typecheck   # TypeScript strict check (tsc --noEmit)
npm run build       # Production build to /dist
```

---

## 🎮 Usage & Execution

### Local development

```bash
npm run dev
```

Vite starts a dev server with HMR at:

```
http://localhost:3000
```

### Production build & preview

```bash
npm run build     # outputs static assets to /dist
npm run preview   # serve the production build locally
```

### Application routes

Because the app uses `HashRouter`, it deploys to *any* static host (GitHub Pages, Netlify, S3) with **no rewrite rules needed**.

| Route | Page | Highlights |
|---|---|---|
| `/#/` | **Home** | Animated hero, accreditation marquee, trust strip with animated counters, department showcase with holographic cards |
| `/#/services` | **Specialties** | Scroll-linked department deep-dives with sticky motion effects |
| `/#/doctors` | **Doctors** | Find-a-doctor directory with filtering |
| `/#/patient-hub` | **Patient Hub** | Cost estimator (RHF + Zod), insurance accordion, billing FAQs |
| `/#/about` | **About** | Outcomes, history, animated statistics |
| `/#/contact` | **Contact** | Appointment booking form with confetti success state |

> 🖼️ **Screenshots** — *(placeholders — replace with real captures)*
>
> | Home | Patient Hub |
> |:---:|:---:|
> | `![Home page](docs/screenshots/home.png)` | `![Patient Hub](docs/screenshots/patient-hub.png)` |

---
## ⚙️ Configuration & Environment Variables

Out of the box, **no environment variables are required** — all content (departments, doctors, stats) is served from `src/lib/data.ts`.

If/when you connect Supabase for persistence, add the following to `.env` (mirrored in `.env.example`):

| Variable | Description | Default | Required |
|---|---|:---:|:---:|
| `VITE_SUPABASE_URL` | Your Supabase project URL (e.g. `https://xxxx.supabase.co`) | — | ❌ Optional |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public API key | — | ❌ Optional |
| `VITE_EMERGENCY_PHONE` | Override the 24/7 emergency phone number shown in the nav & footer | `(555) 014-9911` | ❌ Optional |

> ⚠️ Only variables prefixed with `VITE_` are exposed to the client bundle by Vite. **Never** put service-role keys or secrets in a Vite app.

---

## 🏗️ Project Architecture / Directory Structure

```
MERIDIAN-hospital/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.tsx              # Fixed header, desktop nav, animated mobile
│   │   │   │                        #   overlay menu (tap-anywhere-close, ESC, scroll-lock)
│   │   │   └── Footer.tsx           # Sitemap, departments, patient links
│   │   └── ui/
│   │       ├── MagneticButton.tsx   # Cursor-following magnetic CTA buttons
│   │       ├── HolographicCard.tsx  # 3D-tilt glass cards
│   │       ├── TextReveal.tsx       # Word-by-word scroll reveals
│   │       ├── AnimatedCounter.tsx  # Count-up statistic animation
│   │       ├── SmoothScrollWrapper.tsx  # Lenis singleton + scrollToTop() helper
│   │       ├── CustomCursor.tsx     # Custom cursor with contextual labels
│   │       └── NoiseOverlay.tsx     # Film-grain texture overlay
│   ├── pages/
│   │   ├── Home.tsx                 # Hero, marquee, trust strip, departments
│   │   ├── Services.tsx             # Specialty deep-dives (scroll-linked)
│   │   ├── Doctors.tsx              # Doctor directory
│   │   ├── PatientHub.tsx           # Cost estimator + insurance accordions
│   │   ├── About.tsx                # Outcomes & history
│   │   └── Contact.tsx              # Booking form (RHF + Zod + confetti)
│   ├── lib/
│   │   ├── data.ts                  # Departments, doctors, plans, stats
│   │   └── motion.ts                # Shared EASE curve, variants,
│   │                                #   isTouchDevice() / reduceMotion() helpers
│   ├── index.css                    # Tailwind 4 theme tokens + custom keyframes
│   │                                #   (marquee, ECG flow, pulse dot, sliders)
│   ├── App.tsx                      # HashRouter, ScrollManager, AnimatedRoutes,
│   │                                #   MotionConfig, global overlays
│   └── main.tsx                     # React entry point
├── dist/                            # Production build output (generated)
├── index.html                       # Vite HTML shell
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Architecture notes

- **Centralized animation language** — every easing curve and variant lives in `src/lib/motion.ts`, giving the whole site a consistent motion identity.
- **ScrollManager** — a tiny component in `App.tsx` that calls the Lenis-aware `scrollToTop()` on every route change, so navigation (even to the current page) always resets position.
- **Touch-aware enhancement** — Lenis, the custom cursor, and heavy hover effects disable themselves on touch devices; mobile always gets native, 60fps-friendly scrolling.

---
## 🧪 Testing & Diagnostics

The project currently uses **TypeScript strict checking as its primary static safety net** (no unit/E2E suite is wired up yet).

```bash
# Static type check across the whole project
npm run typecheck

# Verify a production build succeeds (catches import/bundling errors)
npm run build

# Serve the production build and smoke-test it manually
npm run preview
```

**Recommended manual QA checklist:**

- [ ] Mobile menu: open → tap empty space (closes), tap current page link (closes + scrolls top), press `Escape` (closes)
- [ ] Reduce-motion: enable *reduced motion* in OS settings → animations degrade gracefully, marquee slows instead of freezing
- [ ] Forms: submit the cost estimator / booking form with invalid input → inline Zod errors appear
- [ ] Routes: deep-link to `/#/patient-hub` and refresh → page loads correctly (hash routing)

> 💡 Planning to add tests? [Vitest](https://vitest.dev) pairs naturally with Vite, and [Playwright](https://playwright.dev) is a great fit for the route/E2E checklist above.

---

## 🤝 Contributing & Code of Conduct

Contributions are welcome! 🎉

### How to contribute

1. **Fork** the repo and create your branch from `main`:
   ```bash
   git checkout -b feat/your-feature
   ```
2. **Keep the codebase consistent** — match the existing conventions:
   - Functional components + hooks only; no class components
   - Tailwind utility classes inline; shared theme tokens live in `src/index.css`
   - All animation timing/curves go through `src/lib/motion.ts`
   - TypeScript strict — `npm run typecheck` must pass
3. **Commit** with clear, imperative messages (`feat:`, `fix:`, `docs:`, `refactor:`).
4. **Open a Pull Request** with a short description and screenshots/GIFs for UI changes.

### Reporting issues

Open a [GitHub Issue](https://github.com/mayorxyz/MERIDIAN-hospital/issues) and include:
- Steps to reproduce (and viewport/device if visual)
- Expected vs. actual behavior
- Browser & OS versions

### Code of Conduct

Be respectful, constructive, and inclusive. Assume good faith in reviews and discussions. Harassment or discriminatory behavior will not be tolerated.

---

## 📄 License & Acknowledgments

### License

Released under the **MIT License** — free to use, modify, and distribute with attribution.

### Acknowledgments

- [React](https://react.dev) & [Vite](https://vite.dev) — the foundation
- [Framer Motion](https://www.framer.com/motion/) — the motion engine
- [Lenis](https://lenis.darkroom.engineering) — smooth scrolling
- [Tailwind CSS](https://tailwindcss.com) — styling system
- [lucide-react](https://lucide.dev) — iconography
- [Supabase](https://supabase.com) — backend-ready infrastructure

---

<div align="center">

**MERIDIAN General Hospital** — *Clinical Trust, Designed.*

⭐ Star this repo if it helped you!

</div>




