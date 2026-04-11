import { Link, useParams, Navigate } from 'react-router-dom'
import recipesData from '../data/recipes.json'
import PageHeader from '../components/ui/PageHeader.jsx'
import Divider from '../components/ui/Divider.jsx'
import InsightBlock from '../components/ui/InsightBlock.jsx'
import { seasonClass } from '../lib/seasonClass.js'

const SEASON_LABELS = {
  spring: 'Spring',
  summer: 'Summer',
  late_summer: 'Late Summer',
  autumn: 'Autumn',
  winter: 'Winter',
}

const MEAL_LABELS = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
}

export default function RecipeDetail() {
  const { id } = useParams()
  const recipe = recipesData.recipes.find((r) => r.id === id)
  if (!recipe) return <Navigate to="/recipes" replace />

  const seasonMeta = recipesData.seasons[recipe.season]

  return (
    <div className={seasonClass(recipe.season)}>
      <PageHeader
        label={`${SEASON_LABELS[recipe.season]} · ${MEAL_LABELS[recipe.meal_type]}`}
      />

      <Link
        to="/recipes"
        className="cinzel mb-4 inline-block text-[9px] uppercase tracking-[0.28em] text-muted hover:text-accent"
      >
        ← All recipes
      </Link>

      <h1 className="cinzel mb-3 text-[22px] font-light uppercase tracking-[0.12em] text-heading">
        {recipe.title}
      </h1>

      <div className="flex flex-wrap gap-x-4 gap-y-1">
        <span className="cinzel text-[9px] uppercase tracking-[0.26em] text-accent">
          Serves {recipe.serves}
        </span>
        {seasonMeta && (
          <span className="cinzel text-[9px] uppercase tracking-[0.26em] text-muted">
            {seasonMeta.element} · {seasonMeta.flavour}
          </span>
        )}
      </div>

      <Divider />

      {/* Ingredients */}
      <h2 className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
        Ingredients
      </h2>
      <div className="mt-3">
        {recipe.ingredients.map((ing, i) => (
          <div
            key={i}
            className="flex items-start gap-3 border-b py-2.5 last:border-0"
            style={{
              borderColor:
                'color-mix(in srgb, var(--accent) 10%, transparent)',
            }}
          >
            <div
              className="mt-[9px] h-[5px] w-[5px] min-w-[5px] rounded-full"
              style={{
                background: 'color-mix(in srgb, var(--accent) 45%, transparent)',
              }}
            />
            <p className="text-[14px] leading-[1.68]">{ing}</p>
          </div>
        ))}
      </div>

      <Divider />

      {/* Method */}
      <h2 className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
        Method
      </h2>
      <p className="mt-3 text-[14.5px] leading-[1.78]">{recipe.method}</p>

      {/* Why */}
      {recipe.why && (
        <>
          <Divider />
          <h2 className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
            Why It Nourishes
          </h2>
          <div className="mt-3">
            <InsightBlock>{recipe.why}</InsightBlock>
          </div>
        </>
      )}

      <Divider />

      <p className="cinzel text-center text-[9px] uppercase tracking-[0.3em] text-muted">
        {SEASON_LABELS[recipe.season]} · {MEAL_LABELS[recipe.meal_type]}
      </p>
    </div>
  )
}
