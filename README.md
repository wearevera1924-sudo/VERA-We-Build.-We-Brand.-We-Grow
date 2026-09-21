# VERA — We Build. We Brand. We Grow.

A premium, cinematic, one-page digital agency website built with **Vite + React + Framer Motion**.

The website itself is VERA's portfolio piece: three chapters — **BUILD → BRAND → GROW** — that visually evolve as you scroll, wrapped in porcelain-white studio light with royal-blue atmosphere.

---

## Quick start

```bash
npm install
npm run dev      # local preview
npm run build    # production build -> dist/
```

## Architecture

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── BuildSection.jsx      # BUILD chapter + Browser→Fullscreen transition
│   ├── BrandSection.jsx      # BRAND chapter (About statement + Services)
│   ├── GrowSection.jsx       # GROW chapter (Work/portfolio)
│   ├── Process.jsx           # YOU BRING THE IDEA → WE HELP IT GROW
│   ├── Testimonials.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── DeviceBrowser.jsx     # realistic browser mockup (reusable)
│   ├── DevicePhone.jsx       # realistic phone mockup (reusable)
│   ├── LiquidText.jsx        # BUILD ⇄ BRAND ⇄ GROW morphing
│   │
│   ├── CustomCursor.jsx      # cursor core + ring (desktop only)
│   ├── CursorSpotlight.jsx   # SIGNATURE 05 — royal spotlight
│   ├── CursorImageReveal.jsx # SIGNATURE 01 — image reveal near cursor
│   └── MagneticImage.jsx     # SIGNATURE 02 — magnetic images
├── data/
│   ├── projects.js           # ← edit projects / their URLs
│   ├── testimonials.js       # ← edit testimonials
│   ├── services.js           # ← edit services
│   └── contact.js            # ← edit ALL contact info here
├── App.jsx
└── main.jsx
```

## The five signature effects — and how to remove them

Each effect is intentionally isolated so the owner can disable one without breaking anything.

| # | Effect | Component | How to remove |
|---|--------|-----------|---------------|
| 1 | Cursor Image Reveal (desktop) | `CursorImageReveal.jsx` | Remove the component file and its usage in `Work.jsx` / `Navbar.jsx` |
| 2 | Magnetic Image | `MagneticImage.jsx` | Remove its import/usage in `Hero.jsx` and `Work.jsx` — it's a wrapper, so nothing else changes |
| 3 | Browser → Fullscreen transition | `BrowserFullscreen` inside `BuildSection.jsx` | Remove the `<BrowserFullscreen>` block; the section falls back to a static composition |
| 4 | Liquid Text (BUILD→BRAND→GROW) | `LiquidText.jsx` | Remove `<LiquidText>` in `App.jsx`; chapters still flow |
| 5 | Cursor Royal Spotlight (desktop) | `CursorSpotlight.jsx` | Remove its usage in `App.jsx` |

All cursor-based components are desktop-only: they check `matchMedia('(hover: hover) and (pointer: fine)')` and `prefers-reduced-motion`, and render nothing otherwise. Custom cursor + spotlight + image reveal are also gated on viewport width.

## Replacing content

- **Contact**: edit `src/data/contact.js` — every WhatsApp/email/Instagram/phone link reads from it.
- **Projects**: edit `src/data/projects.js` — every "VIEW PROJECT ↗" opens the centralized `url` from there.
- **Testimonials**: edit `src/data/testimonials.js` (demo quotes; set `avatar` to an image path or keep `null` for initials).
- **Services**: edit `src/data/services.js` — `visualType` picks each service's composition (browser / phone / campaign / poster / type / identity).
- **Images**: replace files in `public/assets/` (project-1..6.jpg) and `public/veralogo.jpeg` keeping the same filenames.

## Design system

- **Background**: warm porcelain `#f6f1e8`
- **Ink**: deep black `#141414`
- **Royal blue**: `#2e40e8` (atmosphere + accents)
- **Amber**: `#e09a3e` (controlled warmth)
- **Type**: Fraunces (editorial serif) / Unbounded (display) / Space Grotesk (body)

## Accessibility & performance

- Semantic HTML, focus-visible states, alt text, labeled form fields.
- `prefers-reduced-motion` support — animations simplify while the design stays premium.
- Lazy-loaded images, GPU-friendly transforms (transform/opacity only), no horizontal overflow on any breakpoint.
