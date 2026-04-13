import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import recipesData from '../data/recipes.json'
import StickyNav from '../components/ui/StickyNav.jsx'
import ScrollToTop from '../components/ui/ScrollToTop.jsx'
import cardSpring from '../assets/images/card-spring.png'
import cardSummer from '../assets/images/card-summer.png'
import cardLateSummer from '../assets/images/card-latesummer.png'
import cardAutumn from '../assets/images/card-autumn.png'
import cardWinter from '../assets/images/card-winter.png'
import { seasonClass } from '../lib/seasonClass.js'
import { useThemeMode } from '../lib/theme.js'

const SEASON_CARDS = {
  spring: cardSpring,
  summer: cardSummer,
  late_summer: cardLateSummer,
  autumn: cardAutumn,
  winter: cardWinter,
}

const SEASON_ORDER = ['spring', 'summer', 'late_summer', 'autumn', 'winter']
const SEASON_NAMES = {
  spring: 'Spring',
  summer: 'Summer',
  late_summer: 'Late Summer',
  autumn: 'Autumn',
  winter: 'Winter',
}

export default function RecipeSeasonDetail() {
  const { seasonId } = useParams()
  const { seasons, recipes } = recipesData
  const mode = useThemeMode()

  const season = seasons[seasonId]
  const [activeMealType, setActiveMealType] = useState('breakfast')

  useEffect(() => {
    window.scrollTo(0, 0)
    setActiveMealType('breakfast')
  }, [seasonId])

  const cardStyle = mode === 'dark' ? {} : { mixBlendMode: 'multiply' }

  if (!season) {
    return (
      <div className="spring">
        <div className="py-16 text-center">
          <p className="text-[14px] italic text-muted">Season not found.</p>
          <Link
            to="/recipes"
            className="cinzel mt-4 inline-block text-[10px] uppercase tracking-[0.26em] text-accent"
          >
            ← Back to Recipes
          </Link>
        </div>
      </div>
    )
  }

  // Get previous and next season
  const currentIndex = SEASON_ORDER.indexOf(seasonId)
  const prevSeasonId = currentIndex === 0 ? SEASON_ORDER[SEASON_ORDER.length - 1] : SEASON_ORDER[currentIndex - 1]
  const nextSeasonId = currentIndex === SEASON_ORDER.length - 1 ? SEASON_ORDER[0] : SEASON_ORDER[currentIndex + 1]

  // Filter recipes by season and meal type
  const seasonRecipes = recipes.filter((r) => r.season === seasonId)
  const mealRecipes = seasonRecipes.filter((r) => r.meal_type === activeMealType)

  return (
    <div className={seasonClass(seasonId)} style={{ background: 'transparent' }}>
      {/* Back link */}
      <div className="pt-4 pl-4">
        <Link
          to="/recipes"
          className="cinzel text-[9px] uppercase tracking-[0.28em] text-muted transition-colors hover:text-accent"
        >
          ← The Seasons
        </Link>
      </div>

      {/* Season card image - 180px centered */}
      <img
        src={SEASON_CARDS[seasonId]}
        alt={season.name}
        className="mx-auto mb-6 w-[180px]"
        style={cardStyle}
      />

      {/* Season name and element */}
      <h1 className="cinzel text-center text-[22px] font-light uppercase tracking-[0.14em] text-accent md:text-[24px]">
        {season.name}
      </h1>
      <p className="cinzel mt-1 text-center text-[9px] uppercase tracking-[0.3em] text-muted">
        {season.element}
      </p>

      {/* Season principle - always visible */}
      <p className="lead mt-8">
        {season.principle}
      </p>

      {/* Three navigation buttons */}
      <div className="mt-10 flex gap-x-7 border-b pb-2" style={{ borderColor: 'color-mix(in srgb, var(--accent) 18%, transparent)' }}>
        <NavButton
          label="Breakfast"
          active={activeMealType === 'breakfast'}
          onClick={() => setActiveMealType('breakfast')}
        />
        <NavButton
          label="Lunch"
          active={activeMealType === 'lunch'}
          onClick={() => setActiveMealType('lunch')}
        />
        <NavButton
          label="Dinner"
          active={activeMealType === 'dinner'}
          onClick={() => setActiveMealType('dinner')}
        />
      </div>

      {/* Content area - recipe list */}
      <div className="mt-10 mb-16">
        {mealRecipes.length > 0 ? (
          <div className="space-y-4">
            {mealRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                to={`/recipes/${seasonId}/${recipe.id}`}
                className="block border-b pb-4 transition-opacity last:border-0 hover:opacity-75"
                style={{ borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}
              >
                <h3 className="cinzel text-[14px] font-light uppercase tracking-wide text-heading">
                  {recipe.title}
                </h3>
                <p className="cinzel mt-1 text-[9px] uppercase tracking-[0.3em] text-muted">
                  Serves {recipe.serves}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-[14px] italic text-muted">
            No recipes available for this meal type.
          </p>
        )}
      </div>

      <div className="mt-16 mb-6">
        <p className="cinzel text-center text-[9px] uppercase tracking-[0.3em] text-muted">
          Isabelle Evita Søndergaard
        </p>
      </div>

      {/* Sticky bottom navigation */}
      <StickyNav
        prevLabel={SEASON_NAMES[prevSeasonId]}
        prevUrl={`/recipes/${prevSeasonId}`}
        nextLabel={SEASON_NAMES[nextSeasonId]}
        nextUrl={`/recipes/${nextSeasonId}`}
        currentLabel={season.name}
      />

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Navigation Button                                                  */
/* ------------------------------------------------------------------ */

function NavButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cinzel pb-1 text-[11px] font-light uppercase tracking-[0.26em] transition-colors"
      style={{
        color: active ? 'var(--accent)' : 'var(--muted)',
        borderBottom: active ? '0.5px solid var(--accent)' : '0.5px solid transparent',
        marginBottom: '-9px',
      }}
    >
      {label}
    </button>
  )
}
