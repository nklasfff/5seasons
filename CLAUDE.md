# 5 Seasons — Design System & Project Guide

## Tone & Voice

**Isabelle Evita voice**: warm, poetic, elegant. Every line of copy should feel like a letter written by candlelight — unhurried, sensory, intimate. Avoid clinical language. Prefer metaphor, rhythm, and restraint.

---

## Typography

Loaded from Google Fonts in `index.html`.

| Role     | Family               | Tailwind class   |
|----------|----------------------|------------------|
| Body     | Cormorant Garamond   | `font-body`      |
| Headings | Cinzel               | `font-heading`   |

- Headings: all-caps, wide tracking (`tracking-widest`), weight 400–500
- Body: light (300) for prose, regular (400) for UI labels, italic for poetic passages
- Never use system sans-serif fonts for content

---

## Colour Palette

| Season      | Hex       | Tailwind token    |
|-------------|-----------|-------------------|
| Spring      | `#3a7040` | `text-spring`     |
| Summer      | `#8a2030` | `text-summer`     |
| Late Summer | `#7a6010` | `text-lateSummer` |
| Autumn      | `#505058` | `text-autumn`     |
| Winter      | `#2a4a80` | `text-winter`     |
| Background  | `#faf8f5` | `bg-background`   |

Use season colours to tint icons, active states, section headers, and accent elements — never as heavy fills on large areas.

---

## Layout

- **Mobile-first**. Max content width `max-w-sm` centred, with comfortable horizontal padding (`px-6`).
- **Bottom tab navigation** — fixed, 5 tabs, `h-16`, sits above the safe-area inset on iOS.
- Main content area has `pb-16` to avoid being hidden behind the nav bar.
- No top navigation bar (content flows from the top of the viewport).

---

## Navigation Tabs

| Route         | Label       | Icon glyph |
|---------------|-------------|------------|
| `/`           | Home        | ☽          |
| `/seasons`    | Seasons     | ❧          |
| `/body-clock` | Body Clock  | ◎          |
| `/pause`      | Pause       | ◌          |
| `/recipes`    | Recipes     | ✦          |

Active tab: `text-stone-800`. Inactive: `text-stone-400`.

---

## Project Structure

```
src/
  assets/       # Images, illustrations, SVGs
  components/   # Shared UI components (BottomNav, cards, etc.)
  data/         # Static JSON / JS data files (seasons, recipes, etc.)
  pages/        # One file per route (Home, Seasons, BodyClock, Pause, Recipes)
  App.jsx       # Router + layout shell
  main.jsx      # Entry point
  index.css     # Tailwind directives + base layer overrides
```

---

## Tech Stack

| Tool            | Version  |
|-----------------|----------|
| React           | 18       |
| Vite            | 5        |
| Tailwind CSS    | 3        |
| React Router    | 6        |

---

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

---

## Conventions

- Components: PascalCase files, default exports.
- Data files: camelCase, plain JS/JSON, no external state library yet.
- No CSS modules — use Tailwind utility classes exclusively.
- Keep each page component focused on layout + composition; extract anything reused into `components/`.
- Comments only where logic is non-obvious.
