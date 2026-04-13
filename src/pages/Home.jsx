import { Link } from 'react-router-dom'
import coverImage from '../assets/images/cover-seasons-poster.jpg'
import seasonsData from '../data/seasons.json'
import PageHeader from '../components/ui/PageHeader.jsx'
import RightNow from '../components/ui/RightNow.jsx'
import HorizontalNav from '../components/layout/HorizontalNav.jsx'
import cardSpring from '../assets/images/card-spring.png'
import cardSummer from '../assets/images/card-summer.png'
import cardLateSummer from '../assets/images/card-latesummer.png'
import cardAutumn from '../assets/images/card-autumn.png'
import cardWinter from '../assets/images/card-winter.png'
import heroBodyClock from '../assets/images/hero-body-clock.jpg'
import heroPause from '../assets/images/hero-pause.jpg'
import heroRecipes from '../assets/images/hero-recipes.jpg'
import heroSeasons from '../assets/images/hero-seasons.jpg'
import heroCycleImage from '../assets/images/hero-cycle.png'
import { seasonClass } from '../lib/seasonClass.js'
import {
  applyTheme,
  setStoredTheme,
  useThemeMode,
} from '../lib/theme.js'

const SEASON_CARDS = {
  spring: cardSpring,
  summer: cardSummer,
  late_summer: cardLateSummer,
  autumn: cardAutumn,
  winter: cardWinter,
}

const EXPLORE_CARDS = [
  {
    to: '/seasons',
    title: 'Seasons',
    description: 'The energy, themes and wisdom of each season',
    image: heroSeasons,
  },
  {
    to: '/body-clock',
    title: 'Body Clock',
    description: 'The twelve organs and their daily rhythm',
    image: heroBodyClock,
  },
  {
    to: '/pause',
    title: 'Pause',
    description: 'Mindfulness, breath and seasonal reflection',
    image: heroPause,
  },
  {
    to: '/recipes',
    title: 'Recipes',
    description: 'Forty-five nourishing recipes, organised by season',
    image: heroRecipes,
  },
  {
    to: '/cycle',
    title: 'The Cycle',
    description: 'Your monthly rhythm through the elements',
    image: heroCycleImage,
  },
]

export default function Home() {
  const { meta, seasons } = seasonsData
  const mode = useThemeMode()

  const toggleTheme = () => {
    const next = mode === 'dark' ? 'light' : 'dark'
    setStoredTheme(next)
    applyTheme(next)
  }

  const cardStyle = mode === 'dark' ? { borderRadius: '50%', background: '#ffffff' } : {}

  return (
    <div className="spring">
      <Hero />
      <HorizontalNav />

      {/* RIGHT NOW section */}
      <section className="mt-14">
        <PageHeader label="Right Now" />
        <p className="lead mb-10">
          Every two hours, energy shifts to a new organ. The clock below shows where your body's vitality is focused right now.
        </p>
        <RightNow />
      </section>

      {/* THE LIVING SYSTEM section */}
      <section className="mt-14">
        <PageHeader label="The Living System" />
        <Link
          to="/living-system"
          className="flex items-center justify-between transition-opacity hover:opacity-75"
        >
          <p className="text-[14px] italic text-muted">
            Understand the deeper dynamic — how your season and this moment work together.
          </p>
          <span className="cinzel ml-4 text-[16px] text-accent">→</span>
        </Link>
      </section>

      {/* THE FIVE SEASONS section */}
      <section className="mt-16">
        <PageHeader label="The Five Seasons" />
        <p className="lead mb-10">
          {meta.description}
        </p>

        <div className="space-y-8" style={{ background: 'transparent' }}>
          {seasons.map((season) => {
            const firstSentence = season.description.split(/[.!?]/)[0].trim() + '.'

            return (
              <Link
                key={season.id}
                to={`/seasons/${season.id}`}
                className={`${seasonClass(season.id)} block transition-opacity hover:opacity-75`}
                style={{ background: 'transparent' }}
              >
                <img
                  src={SEASON_CARDS[season.id]}
                  alt={season.name}
                  className="mx-auto mb-4 w-[180px]"
                  style={{ ...cardStyle, mixBlendMode: 'multiply' }}
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
      </section>

      {/* EXPLORE FURTHER section */}
      <section className="mt-16">
        <PageHeader label="Explore Further" />

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {EXPLORE_CARDS.map((card) => (
            <ExploreCard key={card.to} {...card} />
          ))}
        </div>
      </section>

      {/* Mobile dark mode toggle - only visible on mobile */}
      <div className="mt-8 mb-6 text-center lg:hidden">
        <button
          type="button"
          onClick={toggleTheme}
          className="cinzel text-[11px] text-muted transition-colors hover:text-accent"
        >
          <span className="cinzel mr-2 text-[14px]">
            {mode === 'dark' ? '○' : '●'}
          </span>
          {mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>

      <div className="mb-6">
        <p className="cinzel text-center text-[9px] uppercase tracking-[0.3em] text-muted">
          Isabelle Evita Søndergaard
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <div className="-mx-6 -mt-7 flex min-h-[calc(100svh-60px)] flex-col overflow-hidden bg-[#1a2820] md:-mx-16 lg:mt-12 lg:min-h-[70vh]">
      {/* Image area (top ~75%) */}
      <div className="relative flex-1 bg-[#1a2820]">
        <img
          src={coverImage}
          alt=""
          className="h-full w-full object-cover object-top opacity-[0.88]"
        />
        {/* Soft gradient fade into the dark bottom section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#1a2820]" />
      </div>

      {/* Title block (dark bottom ~25%) */}
      <div className="flex flex-col items-center bg-[#1a2820] px-8 pb-12 pt-0 md:px-16">
        <p className="cinzel mb-3 text-[9px] font-light uppercase tracking-[0.38em] text-green-200/55">
          A Companion
        </p>
        <h1 className="cinzel mb-2 text-center text-[22px] font-light uppercase tracking-[0.1em] text-[#e8f0e8]">
          The Energy of the 5 Seasons
        </h1>
        <p className="mb-5 text-center text-[13px] italic text-green-200/75">
          A Guide to Living in Harmony with the Year
        </p>
        <div className="mb-3 h-px w-8 bg-green-200/35" />
        <p className="cinzel text-[9px] uppercase tracking-[0.3em] text-green-200/55">
          Isabelle Evita Søndergaard
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Explore Card                                                       */
/* ------------------------------------------------------------------ */

function ExploreCard({ to, title, description, image }) {
  return (
    <Link
      to={to}
      className="block transition-opacity hover:opacity-90"
    >
      {/* Image on top */}
      <img
        src={image}
        alt=""
        className="h-[120px] w-full rounded object-cover"
      />

      {/* Text below */}
      <div className="pt-2">
        <h3 className="cinzel text-[11px] uppercase tracking-[0.28em] text-heading">
          {title}
        </h3>
        <p className="mt-1 text-[13px] italic text-muted">
          {description}
        </p>
      </div>
    </Link>
  )
}
