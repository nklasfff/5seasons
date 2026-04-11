import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import recipesData from '../data/recipes.json'
import PageHeader from '../components/ui/PageHeader.jsx'
import Divider from '../components/ui/Divider.jsx'
import InsightBlock from '../components/ui/InsightBlock.jsx'
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

export default function Recipes() {
  const { meta, seasons, recipes } = recipesData
  const [selected, setSelected] = useState('all')

  const filtered = useMemo(
    () => (selected === 'all' ? recipes : recipes.filter((r) => r.season === selected)),
    [recipes, selected],
  )

  const byMeal = useMemo(() => {
    const map = { breakfast: [], lunch: [], dinner: [] }
    for (const r of filtered) {
      if (map[r.meal_type]) map[r.meal_type].push(r)
    }
    return map
  }, [filtered])

  const activeSeason = selected !== 'all' ? seasons[selected] : null
  const wrapperClass = selected === 'all' ? 'spring' : seasonClass(selected)

  return (
    <div className={wrapperClass}>
      <PageHeader label="Recipes" />

      <h1 className="cinzel mb-3 text-[22px] font-light uppercase tracking-[0.12em] text-heading">
        {meta.title}
      </h1>
      <p className="lead mb-2">{meta.subtitle}</p>

      <Divider />

      <SeasonFilter selected={selected} onSelect={setSelected} />

      {activeSeason && (
        <div className="mt-6">
          <SeasonPrinciple season={activeSeason} />
        </div>
      )}

      <div className="mt-10 space-y-12">
        {MEAL_SECTIONS.map(({ key, label }) => (
          <MealSection key={key} label={label} recipes={byMeal[key]} />
        ))}
      </div>

      <Divider />

      <p className="cinzel text-center text-[9px] uppercase tracking-[0.3em] text-muted">
        {filtered.length} {filtered.length === 1 ? 'Recipe' : 'Recipes'}
      </p>
    </div>
  )
}

function SeasonFilter({ selected, onSelect }) {
  const options = [{ id: 'all', label: 'All' }].concat(
    SEASON_ORDER.map((id) => ({ id, label: SEASON_LABELS[id] })),
  )

  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {options.map(({ id, label }) => {
        const isActive = selected === id
        const wrap = id === 'all' ? '' : seasonClass(id)
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className={`${wrap} cinzel pb-1 text-[10px] font-light uppercase tracking-[0.26em] transition-colors`}
            style={{
              color: isActive ? 'var(--accent)' : '#5a6a58',
              borderBottom: isActive
                ? '0.5px solid var(--accent)'
                : '0.5px solid transparent',
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

function SeasonPrinciple({ season }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p className="cinzel text-[11px] uppercase tracking-[0.26em] text-accent">
          {season.element} · {season.flavour}
        </p>
        <p
          className="text-[11px] italic"
          style={{
            color: 'color-mix(in srgb, var(--accent) 80%, #5a6a58)',
          }}
        >
          {season.organs}
        </p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-0">
        <MetaCell label="Nourish with" items={season.foods} />
        <MetaCell label="Reduce" items={season.reduce} />
      </div>

      <div className="mt-4">
        <InsightBlock label="Principle">{season.principle}</InsightBlock>
      </div>
    </div>
  )
}

function MetaCell({ label, items }) {
  return (
    <div
      className="border-b border-r p-3 last:border-r-0"
      style={{
        borderColor: 'color-mix(in srgb, var(--accent) 12%, transparent)',
      }}
    >
      <p className="cinzel mb-1 text-[8.5px] uppercase tracking-[0.18em] text-muted">
        {label}
      </p>
      <p className="text-[12.5px] italic leading-[1.58]">{items.join(', ')}</p>
    </div>
  )
}

function MealSection({ label, recipes }) {
  if (!recipes || recipes.length === 0) return null
  return (
    <section>
      <h2 className="cinzel mb-4 text-[11px] font-light uppercase tracking-[0.26em] text-accent">
        {label}
      </h2>
      <div>
        {recipes.map((r) => (
          <RecipeRow key={r.id} recipe={r} />
        ))}
      </div>
    </section>
  )
}

function RecipeRow({ recipe }) {
  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className={`${seasonClass(recipe.season)} group block`}
    >
      <div
        className="flex items-start gap-4 border-b py-4 last:border-0"
        style={{
          borderColor:
            'color-mix(in srgb, var(--accent) 14%, transparent)',
        }}
      >
        <div
          className="mt-[9px] h-[6px] w-[6px] min-w-[6px] rounded-full"
          style={{ background: 'var(--accent)' }}
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-medium leading-[1.45] text-heading group-hover:text-lead">
            {recipe.title}
          </h3>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
            <span className="cinzel text-[8.5px] uppercase tracking-[0.22em] text-accent">
              {SEASON_LABELS[recipe.season]}
            </span>
            <span className="cinzel text-[8.5px] uppercase tracking-[0.22em] text-muted">
              Serves {recipe.serves}
            </span>
            <span className="cinzel text-[8.5px] uppercase tracking-[0.22em] text-muted">
              {recipe.ingredients.length} ingredients
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
