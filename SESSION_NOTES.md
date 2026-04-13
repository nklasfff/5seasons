# Seasons App — Session Notes
## Til brug ved opstart af ny chat

---

## App og repository

**Live URL:** https://nklasfff.github.io/5seasons/
**GitHub repo:** https://github.com/nklasfff/5seasons.git
**Stack:** React + Vite + Tailwind CSS, deployed via gh-pages
**Lokal mappe:** ~/Desktop/5seasons

---

## Sådan arbejder vi sammen

1. Niklas skriver til mig (Claude) i chat
2. Jeg skriver præcise kommandoer til Claude Code
3. Niklas åbner terminal, skriver `claude` for at starte Claude Code
4. Niklas kopierer kommandoen ind i Claude Code
5. Claude Code spørger om tilladelse til bash-kommandoer — tryk **1** (Yes) eller **2** (Yes, don't ask again)
6. Claude Code deployer automatisk med `git push && npm run deploy`
7. Appen er live efter ca. 10 minutter

**Vigtigt:** Skriv ALDRIG Claude Code-kommandoer direkte i terminalen — kun `claude` for at starte Claude Code, og terminal-kommandoer som `mv`, `ls`, `cd`.

**Ved ny session:** Skriv `/compact` i Claude Code ved start af hver session.

---

## Sider bygget

### Home (/)
- Hero: cover-seasons-poster.jpg (fuldhøjde forsidebillede)
- Sektion 1: RIGHT NOW — organ ur SVG + aktiv organ info panel + link til Living System
- Sektion 2: THE FIVE SEASONS — 5 årstidskort der linker til /seasons/:id
- Sektion 3: EXPLORE FURTHER — 4 kort med hero-billeder: Seasons, Body Clock, Pause, Recipes + Cycle
- Dark mode toggle nederst på forsiden (mobil) / i desktop nav
- Desktop navigation: horisontal nav under hero med Home · Seasons · Clock · Pause · Recipes · Dark

### Seasons (/seasons)
- Liste med 5 årstidskort (card-spring/summer/latesummer/autumn/winter.png)
- Hvert kort: billede + navn + element + beskrivelse + temaord

### SeasonDetail (/seasons/:id)
- Hero-billede øverst (ingen tekst ovenpå)
- Sæsonnavn i Cinzel + element + invitation som italic lead
- Tre knapper: ORGANS · ADVICE · THEMES
- Navigation ← → mellem årstider

### Body Clock (/body-clock)
- Hero: hero-body-clock.jpg
- Intro tekst
- Tre tabs: THE CLOCK · TODAY'S RHYTHM · SYMPTOMS
- THE CLOCK: 6 tidsperioder (The Quiet Hours, Morning Energy, The Heart of the Day, Descent into Evening, The Evening Wind-Down, The Healing Hours)
- Tryk på periode åbner de 2 organer med beskrivelse, praksis, ubalance-tegn
- Navigation ← → mellem perioder

### Pause (/pause)
- Hero: hero-pause.jpg
- To tabs: MINDFULNESS & BREATH · THE SEASONS
- MINDFULNESS & BREATH: 4 emner i rækkefølge (Mindfulness, The Pause, The Breath, A Daily Rhythm)
- THE SEASONS: 5 årstider der linker til /pause/:season

### PauseSeasonDetail (/pause/:season)
- Årstidskort + navn + invitation
- To knapper: BREATH PRACTICE · JOURNAL
- Journal gemmes i localStorage med key pause_journal_{season}_{index}

### Recipes (/recipes)
- Hero: hero-recipes.jpg
- 5 årstider som liste der linker til /recipes/:season

### RecipeSeasonDetail (/recipes/:season)
- Årstidskort + navn + principle
- Tre knapper: BREAKFAST · LUNCH · DINNER
- 3 opskrifter per måltid som simple rækker

### RecipeDetail (/recipes/:season/:id)
- Fuld opskrift med ingredienser og fremgangsmåde
- Summer lunch 1/2/3 har egne billeder

### Living System (/living-system)
- Viser dynamikken mellem aktiv årstid og aktivt organ lige nu
- To info-pills: sæson + organ
- Dynamisk tekst om samspillet
- Tre animerede SVG-illustrationer: Harmony, Creative Tension, Transformation
- RIGHT NOW FOR YOU: 3 PracticeRows

### Cycle (/cycle)
- Hero: hero-cycle.png (mørkt cirkelbillede)
- Dag-input (1-28) med — og + knapper
- Gemmer startdato i localStorage (cycle_day_start) og beregner automatisk aktuel dag
- Interaktivt SVG-hjul med 4 segmenter: Winter/Spring/Summer/Autumn
- Tre knapper: BODY · MIND · PRACTICE
- Navigation ← → mellem faser

---

## Billeder i src/assets/images/

### Hero-billeder
- cover-seasons-poster.jpg — forsiden hero
- hero-seasons.jpg — Seasons side
- hero-body-clock.jpg — Body Clock side
- hero-pause.jpg — Pause side
- hero-recipes.jpg — Recipes side
- hero-cycle.png — Cycle side (mørkt design)

### Sæsonkort (JPEG med hvid baggrund)
- card-spring.png / card-summer.png / card-latesummer.png / card-autumn.png / card-winter.png
- I dark mode: border-radius 50% + background #ffffff på img-elementet

### Opskriftsbilleder
- summer_lunch_1.png / summer_lunch_2.png / summer_lunch_3.png

---

## Designsystem (se CLAUDE.md for fuld spec)

**Fonte:** Cormorant Garamond (body) + Cinzel (labels/headers)
**Aldrig:** font-weight 600/700, Inter eller sans-serif

**Farver light:** Background #faf8f5, heading #182818, lead #264028, muted #5a6a58
**Farver dark:** Background #0e1410, surface #161c17, text #d4cfc8, heading #e8f0e8

**Sæsonfarver:**
- Spring #3a7040 / Summer #8a2030 / Late Summer #7a6010 / Autumn #505058 / Winter #2a4a80

**Organ/element farver (til ur og illustrationer):**
- Wood #4a8050 / Fire #903040 / Earth #8a6820 / Metal #686870 / Water #3a5080

---

## Navigation

**Mobil:** Bottom tab bar 60px — Home · Seasons · Body Clock · Pause · Recipes
**Desktop (1024px+):** Horisontal nav under hero
**Dark mode toggle:** Nederst på forsiden (mobil) / i desktop nav som "DARK"/"LIGHT"
**ScrollToTop:** Komponent der scroller til top ved route-skift
**StickyNav:** Vises efter 100px scroll med ← forrige / næste → navigation
**↑ knap:** Vises efter 400px scroll, nede til højre

---

## Pending / Mulige næste skridt

1. Tilføje flere opskriftsbilleder (kun summer lunch har billeder)
2. Vercel + custom subdomain (app.isabelleevita.dk) til professionel URL
3. PDF bonus-materialer til Amazon-lancering er klar i /mnt/user-data/outputs/
4. Living System illustrationer kan forbedres yderligere
5. Cycle-skærm mangler stadig at blive testet grundigt på mobil

---

## Bonus-materialer (klar til download)

Alle i /mnt/user-data/outputs/:
- eating_through_the_seasons.html — 45 opskrifter
- pause_and_presence.html — mindfulness + journal
- body_clock_15p.html — organuret
- my_five_seasons_journal.html — journal
- seasons.json / recipes.json / bodyclock.json / pause_presence.json — data
- CLAUDE.md — designsystem
