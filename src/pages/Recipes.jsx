import { Link } from 'react-router-dom'
import recipesData from '../data/recipes.json'
import Hero from '../components/ui/Hero.jsx'
import HorizontalNav from '../components/layout/HorizontalNav.jsx'
import heroImage from '../assets/images/hero-recipes.jpg'
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

export default function Recipes() {
  const { meta, seasons } = recipesData
  const mode = useThemeMode()
  const cardStyle = mode === 'dark' ? { borderRadius: '50%', background: '#ffffff' } : {}

  return (
    <div className="spring">
      {/* Hero image - no text overlay */}
      <Hero image={heroImage} />
      <HorizontalNav />

      {/* Title section */}
      <div className="mb-10">
        <h1 className="cinzel text-[22px] font-light uppercase tracking-[0.12em] text-heading md:text-[24px]">
          {meta.title}
        </h1>
        <p className="lead mt-8">
          Food is medicine. Each season brings its own flavours, its own organs, and its own invitation to nourish the body from the inside out.
        </p>
      </div>

      {/* Five season entries */}
      <div className="space-y-8" style={{ background: 'transparent' }}>
        {SEASON_ORDER.map((seasonId) => {
          const season = seasons[seasonId]
          const firstSentence = season.principle.split(/[.!?]/)[0].trim() + '.'

          return (
            <Link
              key={seasonId}
              to={`/recipes/${seasonId}`}
              className={`${seasonClass(seasonId)} block transition-opacity hover:opacity-75`}
              style={{ background: 'transparent' }}
            >
              <img
                src={SEASON_CARDS[seasonId]}
                alt={season.name}
                className="mx-auto mb-4 w-[180px]"
                style={cardStyle}
              />
              <h3 className="cinzel text-center text-[18px] font-light uppercase tracking-[0.14em] text-accent">
                {season.name}
              </h3>
              <p className="cinzel mt-1 text-center text-[9px] uppercase tracking-[0.3em] text-muted">
                {season.element}
              </p>
              <p className="lead mt-4 text-center">
                {firstSentence}
              </p>
            </Link>
          )
        })}
      </div>

      <div className="mt-16 mb-6">
        <p className="cinzel text-center text-[9px] uppercase tracking-[0.3em] text-muted">
          Isabelle Evita Søndergaard
        </p>
      </div>
    </div>
  )
}
