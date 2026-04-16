# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (Vite)
npm run build     # Production build
npm run preview   # Preview production build locally
node sync.js      # Manually sync Tokko API data to local cache
```

## Architecture

This is a **React + Vite** single-page app using **React Router DOM** for client-side routing. **All components live in a single file: `src/App.jsx`** (~1,600+ lines). There are no separate component files.

### Tech stack
- **Styling:** Tailwind CSS with custom config in `tailwind.config.js`
  - Brand colors: `primary` (#0A162D dark navy), `accent` (#A3FF86 lime green), `background` (#FFFFFF)
  - Font family: Raleway throughout (`font-heading`, `font-drama`, `font-data`)
- **Animations:** GSAP + ScrollTrigger — every page uses `useLayoutEffect` with `gsap.context()` for cleanup
- **Icons:** Lucide React

### Data flow
- Real estate listings come from the **Tokko API** (`VITE_TOKKO_API_KEY` env var required)
- `sync.js` runs on a cron schedule to write cached data to `public/data/developments.json` and `public/data/properties.json`
- `fetchWithCache()` in App.jsx tries the local JSON first, falls back to the live API

### Adding a new page
Every page follows the same pattern — see Sucursales (~line 1087) or Emprendimientos (~line 692) as templates:

1. **Component** — add to `App.jsx` with `useRef` + `useLayoutEffect` for GSAP, `useEffect` for `window.scrollTo(0,0)`. Use a unique CSS class prefix (e.g. `suc-hero`, `suc-scroll`) for GSAP targeting.
2. **Route** — add `<Route path="/..." element={<Component />} />` inside `<Routes>` (~line 1613)
3. **Navbar** — add `<Link>` to both the desktop nav (~line 87) and mobile nav (~line 109), and add `location.pathname === '/...'` detection to `isDarkNav` (~line 62) if the page has a dark hero

### Hero section pattern
Pages use a `h-[60vh]` rounded card with absolute-positioned image + `bg-primary/70` overlay, centered text, `.page-hero` class elements animated with `gsap.from`. The home hero is full-height (`h-[100dvh]`) with a bottom-aligned layout.

### Images
All images are in `public/images/Size Optimized/` and referenced with URL-encoded paths (`/images/Size%20Optimized/filename.jpg`).
