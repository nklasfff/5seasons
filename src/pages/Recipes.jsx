import { Link } from 'react-router-dom'
import recipesData from '../data/recipes.json'
import Hero from '../components/ui/Hero.jsx'
import HorizontalNav from '../components/layout/HorizontalNav.jsx'
import heroImage from '../assets/images/hero-recipes.jpg'
import { seasonClass } from '../lib/seasonClass.js'
import { seasonCardImages, seasonCardImagesOld } from '../lib/seasonImage.js'
import { useThemeMode } from '../lib/theme.js'

const SEASON_ORDER = ['spring', 'summer', 'late_summer', 'autumn', 'winter']

export default function Recipes() {
  const { meta, seasons } = recipesData
  const mode = useThemeMode()
  const cardImages = mode === 'dark' ? seasonCardImagesOld : seasonCardImages
  const cardStyle = mode === 'dark' ? {} : { mixBlendMode: 'multiply' }

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
      <div className="flex flex-col" style={{ background: 'transparent' }}>
        {SEASON_ORDER.map((seasonId) => {
          const season = seasons[seasonId]

          return (
            <Link
              key={seasonId}
              to={`/recipes/${seasonId}`}
              className={`group block ${seasonClass(seasonId)}`}
            >
              <article
                className="flex items-start gap-5 border-b py-6 transition-colors"
                style={{
                  borderColor: 'color-mix(in srgb, var(--accent) 18%, transparent)',
                  background: 'transparent',
                }}
              >
                <img
                  src={cardImages[seasonId]}
                  alt=""
                  className="h-[124px] w-[124px] flex-shrink-0 object-contain"
                  style={cardStyle}
                />
                <div className="min-w-0 flex-1">
                  <p className="cinzel text-[9px] uppercase tracking-[0.3em] text-muted">
                    {season.element}
                  </p>
                  <h2 className="cinzel mt-1 text-[19px] font-light uppercase tracking-[0.18em] text-accent">
                    {season.name}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-[13.5px] leading-[1.7] text-body">
                    {season.principle}
                  </p>
                </div>
              </article>
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
