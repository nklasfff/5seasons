# Isabelle Evita — Seasons App
## Design System & Development Guide

This file defines the complete visual identity, tone, and architecture for the app.
Read this at the start of every session. Run `/compact` regularly to preserve context.

---

## Project Overview

A companion app to *The Energy of the 5 Seasons* by Isabelle Evita Søndergaard.
Five sections: Seasons, Body Clock, Pause & Presence, Recipes, Home.
Mobile-first, works on desktop. React + Vite + Tailwind CSS. Deployed on Vercel.

---

## Typography

Two fonts only — imported from Google Fonts:

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cinzel:wght@300;400&display=swap');
```

| Role | Font | Weight | Size |
|------|------|--------|------|
| Body text | Cormorant Garamond | 400 | 16px / 1rem |
| Body italic / lead | Cormorant Garamond | 300 italic | 17–18px |
| Section labels | Cinzel | 300 | 10px, letter-spacing 0.3em, UPPERCASE |
| Chapter titles h1 | Cinzel | 300 | 20–22px, letter-spacing 0.12em |
| Subtitles h2 | Cinzel | 300 | 11px, letter-spacing 0.26em, UPPERCASE |
| Sub-headers h3 | Cinzel | 400 | 10.5px, letter-spacing 0.25em, UPPERCASE |
| Season names | Cinzel | 300 | 17–22px, letter-spacing 0.18em, UPPERCASE |
| Page numbers / tags | Cinzel | 300 | 9–10px, letter-spacing 0.3em |

**Rules:**
- Never use font-weight 600 or 700 — too heavy
- Never use Cinzel for body text
- Line-height for body: 1.78–1.85
- Line-height for lead paragraphs: 1.86–1.9

---

## Colour Palette

### Base colours
```
Background:      #faf8f5   (warm off-white — all pages)
Body text:       #222222
Heading colour:  #182818   (near-black with green undertone)
Lead text:       #264028   (deep forest green)
Muted text:      #5a6a58
Border / divider: rgba(100,160,110,0.18)
```

### Season accent colours
Each season has a primary and a light variant:

| Season | Primary | Light bg | Use |
|--------|---------|----------|-----|
| Spring | `#3a7040` | `#e8f2e0` | Headers, borders, dots |
| Summer | `#8a2030` | `#fdf0f0` | Headers, borders, dots |
| Late Summer | `#7a6010` | `#fdf8e8` | Headers, borders, dots |
| Autumn | `#505058` | `#f4f4f6` | Headers, borders, dots |
| Winter | `#2a4a80` | `#eef2f8` | Headers, borders, dots |

### Cover / dark backgrounds
```
Spring cover:      #1e2818   (deep forest)
Summer cover:      #2a1818   (deep red-black)
Late Summer cover: #1e1a08   (deep ochre-black)
Autumn cover:      #1a1a1c   (near-black)
Winter cover:      #121820   (deep navy-black)
General dark:      #1a2820   (used for the main app cover)
```

### CSS variable pattern (use in components)
```css
.spring  { --accent: #3a7040; --accent-light: #e8f2e0; }
.summer  { --accent: #8a2030; --accent-light: #fdf0f0; }
.lsummer { --accent: #7a6010; --accent-light: #fdf8e8; }
.autumn  { --accent: #505058; --accent-light: #f4f4f6; }
.winter  { --accent: #2a4a80; --accent-light: #eef2f8; }
```

---

## Spacing & Layout

```
Page padding (mobile):   24px horizontal, 28px vertical
Page padding (desktop):  64px horizontal, 58px vertical
Section gap:             24–32px
Element gap:             12–16px
Max content width:       680px (centred on desktop)
```

### Divider line
```css
.divider {
  width: 44px;
  height: 0.5px;
  background: linear-gradient(to right, transparent, var(--accent), transparent);
  margin: 22px auto;
}
```

### Page header (section label + rule)
```jsx
<div className="flex items-center gap-4 mb-7">
  <span className="cinzel text-[10px] tracking-[0.3em] uppercase text-accent whitespace-nowrap">
    {label}
  </span>
  <div className="flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent" />
</div>
```

---

## Component Patterns

### Insight block (green left-border callout)
```jsx
<div className="bg-green-50/40 border-l-2 border-accent/35 rounded-r px-4 py-3 my-4">
  <p className="cinzel text-[9px] tracking-[0.28em] uppercase text-accent mb-2">{label}</p>
  <p className="italic text-[13.5px] leading-[1.74] text-lead">{text}</p>
</div>
```

### Practice row (dot + text)
```jsx
<div className="flex gap-3 py-3 border-b border-accent/10 last:border-0 items-start">
  <div className="w-[5px] h-[5px] min-w-[5px] rounded-full bg-accent/40 mt-2" />
  <p className="text-[14px] leading-[1.7]">
    <strong className="font-medium text-heading">{title}.</strong> {description}
  </p>
</div>
```

### Season card (image + meta grid)
```jsx
<div className="flex gap-5 items-start my-4">
  <img src={cardImage} className="w-[148px] h-[148px] object-contain rounded-sm" />
  <div className="flex-1">
    <p className="cinzel text-[17px] font-light tracking-[0.18em] uppercase text-accent">{season}</p>
    <p className="text-[11px] italic text-accent/80 mb-2">{element}</p>
    <div className="grid grid-cols-2">
      {/* 2x2 grid of organ / emotion / direction / keywords */}
    </div>
  </div>
</div>
```

### Two-column grid
```jsx
<div className="grid grid-cols-2">
  <div className="p-3 border-b border-r border-accent/10">
    <p className="cinzel text-[8.5px] tracking-[0.18em] uppercase text-accent/70 mb-1">{label}</p>
    <p className="text-[13px] italic leading-[1.62]">{text}</p>
  </div>
</div>
```

### Breath exercise box
```jsx
<div className="border border-accent/25 rounded p-4 my-4">
  <p className="cinzel text-[9px] tracking-[0.28em] uppercase text-accent mb-3">{title}</p>
  {steps.map((step, i) => (
    <div key={i} className="flex gap-3 py-2 border-b border-accent/10 last:border-0 items-baseline">
      <span className="cinzel text-[9px] tracking-[0.2em] text-accent min-w-[20px]">0{i+1}</span>
      <p className="text-[13.5px] leading-[1.65]">{step}</p>
    </div>
  ))}
  {note && <p className="text-[13px] italic text-muted mt-3">{note}</p>}
</div>
```

### Journal question block
```jsx
<div className="py-3 border-b border-accent/10 last:border-0">
  <p className="cinzel text-[9px] tracking-[0.22em] text-accent mb-1">0{number}</p>
  <p className="text-[14.5px] italic text-heading leading-[1.72]">{question}</p>
  {/* Writing lines */}
  {Array(4).fill(0).map((_, i) => (
    <div key={i} className="h-[26px] border-b border-black/10 mt-1" />
  ))}
</div>
```

---

## Navigation

### Mobile (bottom tab bar)
Five tabs: Home, Seasons, Body Clock, Pause, Recipes.
Fixed to bottom. Height 60px. Background #faf8f5. Top border 0.5px rgba(0,0,0,0.08).
Active tab: accent colour. Inactive: #888.
Font: Cinzel 7.5px, tracking 0.15em, uppercase.

### Desktop (left sidebar)
Width 220px. Same five items as vertical list.
Content area fills remaining width, max 680px centred.

---

## Cover / Hero Pattern

Dark background, image filling top ~75% of screen, soft gradient fade into dark bottom section, title + subtitle centred in bottom section.

```jsx
<div className="flex flex-col h-screen bg-[#1a2820] overflow-hidden">
  <div className="relative flex-1 bg-[#1a2820]">
    <img src={coverImage} className="w-full h-full object-cover object-top opacity-88" />
    <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#1a2820]" />
  </div>
  <div className="bg-[#1a2820] flex flex-col items-center px-16 pb-8 pt-0">
    <p className="cinzel text-[9px] tracking-[0.38em] text-green-200/55 uppercase mb-3">{supertext}</p>
    <h1 className="cinzel text-[22px] font-light tracking-[0.1em] text-[#e8f0e8] text-center mb-2">{title}</h1>
    <p className="text-[13px] italic text-green-200/72 text-center mb-5">{subtitle}</p>
    <div className="w-8 h-px bg-green-200/35 mb-3" />
    <p className="text-[11.5px] italic text-green-200/72 text-center leading-[1.68]">{intro}</p>
  </div>
</div>
```

---

## Tone & Voice

**This is Isabelle's voice. Always write in English as if a well-educated British writer had written it.**

- Warm, precise, unhurried
- Never clinical or academic — accessible but never dumbed down
- Poetic where appropriate, but grounded in practical wisdom
- Lead paragraphs are italic and slightly larger — they set the tone
- Insight blocks use a single phrase label (e.g. "A central distinction") followed by concise italic text
- Never use bullet points in body text — use practice rows (dot + text) instead
- Never bold mid-sentence — bold only for the first word/phrase of a practice row

---

## Data Files

All content lives in `src/data/`:

```
seasons.json         — 5 seasons + TCM philosophy (32KB)
recipes.json         — 45 recipes + season food guides (44KB)
bodyclock.json       — 12 organ windows + symptoms + daily rhythm (22KB)
pause_presence.json  — 8 breath practices + journal questions (26KB)
```

### Season IDs (used consistently across all files)
```
spring | summer | late_summer | autumn | winter
```

### Recipe meal types
```
breakfast | lunch | dinner
```

---

## Tailwind Custom Classes to Add

In `tailwind.config.js`, extend with:

```js
fontFamily: {
  serif: ['Cormorant Garamond', 'Georgia', 'serif'],
  display: ['Cinzel', 'serif'],
},
colors: {
  'off-white': '#faf8f5',
  'heading': '#182818',
  'lead': '#264028',
  'muted': '#5a6a58',
  spring: '#3a7040',
  summer: '#8a2030',
  latesummer: '#7a6010',
  autumn: '#505058',
  winter: '#2a4a80',
}
```

Add a helper class for Cinzel:
```css
.cinzel { font-family: 'Cinzel', serif; }
```

---

## File Structure

```
src/
  assets/
    images/
      cover-poppy.jpg          (Art of the Pause cover)
      cover-seasons-poster.jpg (5 seasons poster)
      card-spring.jpg          (IMG_2331)
      card-summer.jpg          (IMG_2332)
      card-latesummer.jpg      (IMG_2330)
      card-autumn.jpg          (IMG_2334)
      card-winter.jpg          (IMG_2333)
      organur.jpg              (organ clock image)
  data/
    seasons.json
    recipes.json
    bodyclock.json
    pause_presence.json
  components/
    ui/
      PageHeader.jsx
      InsightBlock.jsx
      PracticeRow.jsx
      SeasonCard.jsx
      BreathExercise.jsx
      JournalQuestion.jsx
      Divider.jsx
    layout/
      BottomNav.jsx
      Sidebar.jsx
      Layout.jsx
  pages/
    Home.jsx
    Seasons.jsx
    SeasonDetail.jsx
    BodyClock.jsx
    Pause.jsx
    Recipes.jsx
    RecipeDetail.jsx
  App.jsx
  main.jsx
```

---

## Session Rules

1. Run `/compact` at the start of every new session
2. Read CLAUDE.md at the start of every session
3. Build one component or page at a time — do not refactor everything at once
4. Test on mobile viewport (375px) first
5. Never use inline hardcoded hex colours — always use the Tailwind config values or CSS variables
6. Never use font-weight 600 or 700
7. Always use Cinzel for labels, headers, and navigation — never for body text
