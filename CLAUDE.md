# Isabelle Evita — Seasons App
## Design System & Development Guide

This file defines the complete visual identity, tone, and architecture for the app.
Read this at the start of every session. Run `/compact` regularly to preserve context.

---

## Core Philosophy

Every element in this app should feel like it belongs to the same book. The design language comes directly from the printed companion books — warm, unhurried, typographically precise. When in doubt, ask: does this look like it belongs on a page of those books? If not, simplify it.

**The three rules that override everything else:**
1. If it looks like a generic app component, it is wrong
2. If the typography is not Cinzel + Cormorant Garamond, it is wrong
3. If it feels busy or cluttered, remove elements until it breathes

---

## Typography

Two fonts only — imported from Google Fonts:

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cinzel:wght@300;400&display=swap');
```

| Role | Font | Weight | Size |
|------|------|--------|------|
| Body text | Cormorant Garamond | 400 | 16px |
| Body italic / lead | Cormorant Garamond | 300 italic | 17–18px |
| Section labels | Cinzel | 300 | 10px, letter-spacing 0.3em, UPPERCASE |
| Chapter titles h1 | Cinzel | 300 | 20–22px, letter-spacing 0.12em |
| Subtitles h2 | Cinzel | 300 | 11px, letter-spacing 0.26em, UPPERCASE |
| Sub-headers h3 | Cinzel | 400 | 10.5px, letter-spacing 0.25em, UPPERCASE |
| Season names | Cinzel | 300 | 17–22px, letter-spacing 0.18em, UPPERCASE |

**Rules:**
- Never use font-weight 600 or 700
- Never use Cinzel for body text
- Never use Inter, system-ui, or any sans-serif font anywhere in the app
- Line-height body: 1.78–1.85
- Line-height lead: 1.86–1.9

---

## Colour Palette — Light Mode

```
Background:       #faf8f5
Surface/cards:    #f4f1ec
Body text:        #222222
Heading:          #182818
Lead text:        #264028
Muted:            #5a6a58
Border:           rgba(100,160,110,0.18)
```

### Season accents

| Season | Primary | Light bg |
|--------|---------|----------|
| Spring | `#3a7040` | `#e8f2e0` |
| Summer | `#8a2030` | `#fdf0f0` |
| Late Summer | `#7a6010` | `#fdf8e8` |
| Autumn | `#505058` | `#f4f4f6` |
| Winter | `#2a4a80` | `#eef2f8` |

---

## Colour Palette — Dark Mode

Dark mode uses deep warm forest tones — not harsh black. It must feel like candlelight.

```
Background:       #0e1410
Surface/cards:    #161c17
Body text:        #d4cfc8
Heading:          #e8f0e8
Lead text:        #a8c4a0
Muted:            #7a8a78
Border:           rgba(255,255,255,0.07)
```

Dark mode season accents (slightly lighter):
```
Spring:      #4a8850
Summer:      #a03040
Late Summer: #9a7820
Autumn:      #686870
Winter:      #3a5a90
```

### Dark mode rules
- Base: `prefers-color-scheme: dark` CSS media query
- Manual override stored in localStorage key `theme`
- Toggle: top-right corner, Cinzel text "light" / "dark", no icons
- Every component must work in both modes — test before committing
- Never hardcode white or black — always CSS variables

---

## Spacing & Layout

```
Page padding mobile:    24px horizontal, 28px vertical
Page padding desktop:   64px horizontal, 58px vertical
Section gap:            24–32px
Element gap:            12–16px
Max content width:      680px centred
Border radius:          4px maximum — never pill shapes on content
```

---

## Component Patterns

### Page header
```jsx
<div className="flex items-center gap-4 mb-7">
  <span className="cinzel text-[10px] tracking-[0.3em] uppercase text-accent whitespace-nowrap">{label}</span>
  <div className="flex-1 h-px" style={{background: 'linear-gradient(to right, var(--accent)/30, transparent)'}} />
</div>
```

### Divider
```jsx
<div className="mx-auto my-[22px]" style={{width:44, height:'0.5px', background:'linear-gradient(to right, transparent, var(--accent), transparent)'}} />
```

### Insight block
```jsx
<div className="border-l-2 border-accent/35 px-4 py-3 my-4"
     style={{background:'color-mix(in srgb, var(--accent-light) 40%, transparent)'}}>
  <p className="cinzel text-[9px] tracking-[0.28em] uppercase text-accent mb-2">{label}</p>
  <p className="italic text-[13.5px] leading-[1.74]">{text}</p>
</div>
```

### Practice row
```jsx
<div className="flex gap-3 py-3 border-b border-accent/10 last:border-0 items-start">
  <div className="w-[5px] h-[5px] min-w-[5px] rounded-full bg-accent/40 mt-2" />
  <p className="text-[14px] leading-[1.7]"><strong className="font-medium">{title}.</strong> {description}</p>
</div>
```

### Collapsible card
Used for SeasonDetail sections, BodyClock organ details, Pause content.
```jsx
<div className="border-b border-accent/15 py-4">
  <button className="w-full flex items-center justify-between" onClick={() => setOpen(!open)}>
    <span className="cinzel text-[10px] tracking-[0.25em] uppercase text-accent">{title}</span>
    <span className="cinzel text-[9px] text-muted">{open ? '—' : '+'}</span>
  </button>
  {open && <div className="mt-4">{children}</div>}
</div>
```
Rules:
- Toggle indicator is Cinzel "—" and "+" — never a chevron icon
- Never use border-radius on card containers
- First card on a page open by default
- Transition: opacity + height, 200ms

### Season card
```jsx
<div className="flex gap-5 items-start my-4">
  <img src={cardImage} className="w-[148px] h-[148px] object-contain rounded-sm" />
  <div className="flex-1">
    <p className="cinzel text-[17px] font-light tracking-[0.18em] uppercase text-accent">{season}</p>
    <p className="text-[11px] italic text-accent/80 mb-2">{element}</p>
    <div className="grid grid-cols-2 border-t border-accent/15">
      {/* 2x2 meta grid */}
    </div>
  </div>
</div>
```

### Breath exercise
```jsx
<div className="border border-accent/20 p-4 my-4" style={{borderRadius:4}}>
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

### Journal question
```jsx
<div className="py-4 border-b border-accent/10 last:border-0">
  <p className="cinzel text-[9px] tracking-[0.22em] text-accent mb-2">0{number}</p>
  <p className="text-[14.5px] italic leading-[1.72] mb-3">{question}</p>
  <textarea
    className="w-full bg-transparent border-0 border-b border-accent/20 text-[14px] leading-[1.8] resize-none outline-none placeholder:italic placeholder:opacity-40 py-1"
    rows={4}
    placeholder="Write here..."
  />
</div>
```

---

## Organ Clock

The organ clock is an SVG circle on the Home page. It must feel like a precision instrument, not a data visualisation. Elegant, minimal, unhurried.

### Dimensions
```
SVG viewBox:    0 0 340 340
Outer radius:   162px
Inner radius:   68px
Center circle:  68px radius
```

### Segment colours (by element)
```
Wood:   #4a8050
Fire:   #903040
Earth:  #8a6820
Metal:  #686870
Water:  #3a5080
```

### Segment opacity
```
Active:   fill-opacity 0.65, stroke-opacity 1.0, stroke-width 1.5
Inactive: fill-opacity 0.22, stroke-opacity 0.4, stroke-width 0.5
Hover:    fill-opacity 0.40
```

### Center text
```
Line 1: Current time        — Cinzel 11px, muted
Line 2: Active organ name   — Cinzel 14px, accent colour
Line 3: "active now"        — Cinzel 8px, very muted
```

### Text in segments
```
Organ name: Cinzel 9px weight 300 (NOT Inter or any sans-serif)
Time label: Cinzel 7px at 60% opacity
```

### Info panel below clock
```jsx
<div className="mt-6 px-1">
  <p className="cinzel text-[10px] tracking-[0.3em] uppercase text-accent mb-1">{organ} · {time}</p>
  <p className="cinzel text-[18px] font-light tracking-[0.12em] mb-3">{organName}</p>
  <p className="text-[14px] italic leading-[1.82] mb-4">{description}</p>
  <p className="cinzel text-[9px] tracking-[0.22em] uppercase text-accent/70 mb-2">Practice</p>
  <p className="text-[13.5px] leading-[1.74]">{practice}</p>
</div>
```

### Behaviour
- Active organ calculated from `new Date().getHours()` using `time_start` / `time_end` from bodyclock.json
- Updates every 60 seconds
- Click any segment to select it
- On load: active organ selected automatically
- Dark mode: center circle uses `#0e1410` background

---

## Hero Pattern

### Full hero (Home only)
```
Image:      65vh height, object-cover
Overlay:    linear-gradient(to bottom, transparent 40%, #1a2820 100%)
Base:       background #1a2820
Title:      Cinzel 22px centred in base section
```

### Page hero band (Seasons, Body Clock, Pause, Recipes)
```
Height:     240px mobile, 300px desktop
Overlay:    linear-gradient(to bottom, transparent 30%, page-background 100%)
Title:      Cinzel 20px absolute bottom-left over image
```

---

## Navigation

### Mobile bottom tab bar
```
Height:         60px fixed
Background:     #faf8f5 light / #0e1410 dark
Border-top:     0.5px solid rgba(0,0,0,0.08) / rgba(255,255,255,0.06)
Active:         season accent colour
Inactive:       #888888
Font:           Cinzel 7.5px tracking-[0.15em] uppercase
Tabs:           Home · Seasons · Body Clock · Pause · Recipes
```

### Desktop sidebar
```
Width:     220px
Font:      Cinzel 10px tracking-[0.28em] uppercase
Active:    accent colour + 0.5px left border
```

---

## CSS Variable Pattern

```css
.spring  { --accent: #3a7040; --accent-light: #e8f2e0; --cover-bg: #1e2818; }
.summer  { --accent: #8a2030; --accent-light: #fdf0f0; --cover-bg: #2a1818; }
.lsummer { --accent: #7a6010; --accent-light: #fdf8e8; --cover-bg: #1e1a08; }
.autumn  { --accent: #505058; --accent-light: #f4f4f6; --cover-bg: #1a1a1c; }
.winter  { --accent: #2a4a80; --accent-light: #eef2f8; --cover-bg: #121820; }
```

---

## Tone & Voice

Isabelle's voice — warm, precise, unhurried British English.

- Lead paragraph (italic 17–18px) always comes before interactive content
- Insight blocks: Cinzel label + concise italic text
- Never bullet points — use Practice rows
- Never bold mid-sentence
- Sections always introduced with text before tabs, filters, or clocks appear

---

## Data Files

```
src/data/seasons.json         — 5 seasons + philosophy
src/data/recipes.json         — 45 recipes
src/data/bodyclock.json       — 12 organs + daily rhythm
src/data/pause_presence.json  — breath practices + journal
```

Season IDs: `spring | summer | late_summer | autumn | winter`

---

## Session Rules

1. `/compact` at start of every session
2. Read CLAUDE.md at start of every session
3. One component or page per session — never refactor multiple pages at once
4. Test every new component in both light and dark mode before committing
5. Never hardcode colours — always CSS variables or Tailwind config
6. Never font-weight 600 or 700
7. Never Inter or sans-serif — Cinzel and Cormorant Garamond only
8. Ask before every decision: does this look like it belongs in the book?
