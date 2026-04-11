import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import recipesData from '../data/recipes.json'
import Hero from '../components/ui/Hero.jsx'
import Divider from '../components/ui/Divider.jsx'
import InsightBlock from '../components/ui/InsightBlock.jsx'
import heroImage from '../assets/images/hero-recipes.jpg'
import { seasonClass } from '../lib/seasonClass.js'

const SEASON_ORDER = ['spring', 'summer', 'late_summer', 'autumn', 'winter']
const SEASON_LABELS = {
  spring: 'Spring',
  summer: 'Summer',
  late_summer: 'Late Summer',
  autumn: 'Autumn',
  winter: 'Winter',
}

const MEAL_SECTIONS = [
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'lunch', label: 'Lunch' },
  { key: 'dinner', label: 'Dinner' },
]

// TCM-ish month mapping. Late Summer sits in August as a short transition.
function getCurrentSeason() {
  const m = new Date().getMonth() // 0 = Jan
  if (m >= 2 && m <= 4) return 'spring' // Mar–May
  if (m === 5 || m === 6) return 'summer' // Jun–Jul
  if (m === 7) return 'late_summer' // Aug
  if (m >= 8 && m <= 10) return 'autumn' // Sep–Nov
  return 'winter' // Dec–Feb
}

export default function Recipes() {
  const { meta, seasons, recipes } = recipesData
  const [selected, setSelected] = useState(() => getCurrentSeason())

  const filtered = useMemo(
    () => recipes.filter((r) => r.season === selected),
    [recipes, selected],
  )

  const byMeal = useMemo(() => {
    const map = { breakfast: [], lunch: [], dinner: [] }
    for (const r of filtered) {
      if (map[r.meal_type]) map[r.meal_type].push(r)
    }
    return map
  }, [filtered])

  const activeSeason = seasons[selected]

  return (
    <div className={seasonClass(selected)}>
      <Hero
        image={heroImage}
        label="Recipes"
        title={meta.title}
        subtitle={meta.subtitle}
      />

      <p className="lead mb-10">
        Food is medicine. Each season brings its own flavours, its own
        organs, and its own invitation to nourish the body from the inside
        out. Use the filter below to find recipes for the season you are
        living in right now.
      </p>

      <SeasonFilter selected={selected} onSelect={setSelected} />

      <div className="mt-10">
        <SeasonPrinciple season={activeSeason} />
      </div>

      <div className="mt-16 space-y-12">
        {MEAL_SECTIONS.map(({ key, label }) => (
          <CollapsibleMealSection
            key={`${selected}-${key}`}
            label={label}
            recipes={byMeal[key]}
          />
        ))}
      </div>
    </div>
  )
}

function SeasonFilter({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-x-7 gap-y-3">
      {SEASON_ORDER.map((id) => {
        const isActive = selected === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className={`${seasonClass(id)} cinzel pb-1 text-[10px] font-light uppercase tracking-[0.26em] transition-colors`}
            style={{
              color: isActive ? 'var(--accent)' : 'var(--muted)',
              borderBottom: isActive
                ? '0.5px solid var(--accent)'
                : '0.5px solid transparent',
            }}
          >
            {SEASON_LABELS[id]}
          </button>
        )
      })}
    </div>
  )
}

function SeasonPrinciple({ season }) {
  return (
    <div>
      <p className="cinzel text-[11px] uppercase tracking-[0.26em] text-accent">
        {season.element} · {season.flavour}
      </p>
      <p
        className="mt-1 text-[11.5px] italic"
        style={{
          color: 'color-mix(in srgb, var(--accent) 80%, var(--muted))',
        }}
      >
        {season.organs}
      </p>

      <div className="mt-5 space-y-3">
        <p className="text-[13.5px] leading-[1.74]">
          <span className="cinzel mr-2 text-[8.5px] uppercase tracking-[0.2em] text-muted">
            Nourish with
          </span>
          <span className="italic text-lead">{season.foods.join(', ')}</span>
        </p>
        <p className="text-[13.5px] leading-[1.74]">
          <span className="cinzel mr-2 text-[8.5px] uppercase tracking-[0.2em] text-muted">
            Reduce
          </span>
          <span className="italic text-muted">{season.reduce.join(', ')}</span>
        </p>
      </div>

      <div className="mt-5">
        <InsightBlock label="Principle">{season.principle}</InsightBlock>
      </div>
    </div>
  )
}

function CollapsibleMealSection({ label, recipes }) {
  const [open, setOpen] = useState(true)
  if (!recipes || recipes.length === 0) return null

  return (
    <section>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-baseline gap-4 border-b pb-3 text-left transition-colors"
        style={{
          borderColor: 'color-mix(in srgb, var(--accent) 20%, transparent)',
        }}
        aria-expanded={open}
      >
        <span className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
          {label}
        </span>
        <span className="cinzel text-[9px] uppercase tracking-[0.24em] text-muted">
          {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}
        </span>
        <span
          className="cinzel ml-auto text-[13px] font-light text-muted"
          aria-hidden="true"
        >
          {open ? '−' : '+'}
        </span>
      </button>

      {open && (
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {recipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      )}
    </section>
  )
}

function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipes/${recipe.id}`} className="group block">
      <article
        className="h-full rounded-sm p-6 transition-colors"
        style={{
          background:
            'color-mix(in srgb, var(--accent-light) 55%, transparent)',
          border:
            '0.5px solid color-mix(in srgb, var(--accent) 18%, transparent)',
        }}
      >
        <h3 className="text-[16px] font-medium leading-[1.42] text-heading transition-colors group-hover:text-lead">
          {recipe.title}
        </h3>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="cinzel text-[9px] uppercase tracking-[0.24em] text-accent">
            Serves {recipe.serves}
          </span>
          <span
            className="cinzel text-[9px] uppercase tracking-[0.24em]"
            style={{
              color: 'color-mix(in srgb, var(--accent) 55%, var(--muted))',
            }}
          >
            {recipe.ingredients.length} ingredients
          </span>
        </div>
      </article>
    </Link>
  )
}
