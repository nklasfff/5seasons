import { Link } from 'react-router-dom'
import coverImage from '../assets/images/cover-seasons-poster.jpg'
import seasonsData from '../data/seasons.json'
import PageHeader from '../components/ui/PageHeader.jsx'
import RightNow from '../components/ui/RightNow.jsx'
import cardSpring from '../assets/images/card-spring.png'
import cardSummer from '../assets/images/card-summer.png'
import cardLateSummer from '../assets/images/card-latesummer.png'
import cardAutumn from '../assets/images/card-autumn.png'
import cardWinter from '../assets/images/card-winter.png'
import heroBodyClock from '../assets/images/hero-body-clock.jpg'
import heroPause from '../assets/images/hero-pause.jpg'
import heroRecipes from '../assets/images/hero-recipes.jpg'
import heroSeasons from '../assets/images/hero-seasons.jpg'
import { seasonClass } from '../lib/seasonClass.js'

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
]

export default function Home() {
  const { meta, seasons } = seasonsData

  return (
    <div className="spring">
      <Hero />

      {/* RIGHT NOW section */}
      <section className="mt-14">
        <PageHeader label="Right Now" />
        <p className="lead mb-10">
          Every two hours, energy shifts to a new organ. The clock below shows where your body's vitality is focused right now.
        </p>
        <RightNow />
      </section>

      {/* Divider */}
      <div className="mt-16">
        <div className="h-px w-full" style={{ background: 'color-mix(in srgb, var(--accent) 15%, transparent)' }} />
      </div>

      {/* THE FIVE SEASONS section */}
      <section className="mt-16">
        <PageHeader label="The Five Seasons" />
        <p className="lead mb-10">
          {meta.description}
        </p>

        <div className="space-y-8">
          {seasons.map((season) => {
            const firstSentence = season.description.split(/[.!?]/)[0].trim() + '.'

            return (
              <Link
                key={season.id}
                to={`/seasons/${season.id}`}
                className={`${seasonClass(season.id)} block transition-opacity hover:opacity-75`}
              >
                <img
                  src={SEASON_CARDS[season.id]}
                  alt={season.name}
                  className="mx-auto mb-4 w-[180px]"
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

      {/* Divider */}
      <div className="mt-16">
        <div className="h-px w-full" style={{ background: 'color-mix(in srgb, var(--accent) 15%, transparent)' }} />
      </div>

      {/* EXPLORE FURTHER section */}
      <section className="mt-16">
        <PageHeader label="Explore Further" />

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {EXPLORE_CARDS.map((card) => (
            <ExploreCard key={card.to} {...card} />
          ))}
        </div>
      </section>

      <div className="mt-16 mb-6">
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
    <div className="-mx-6 -mt-7 flex min-h-[calc(100svh-60px)] flex-col overflow-hidden bg-[#1a2820] md:-mx-16 md:-mt-14 md:min-h-screen">
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
      className="group relative block h-[120px] overflow-hidden rounded transition-opacity hover:opacity-90"
    >
      {/* Background image */}
      <img
        src={image}
        alt=""
        className="h-full w-full object-cover"
      />

      {/* Dark gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.55))',
        }}
      />

      {/* Text content */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="cinzel text-[11px] uppercase tracking-[0.28em] text-white">
          {title}
        </h3>
        <p className="mt-1 text-[11px] italic leading-[1.5] text-white/80">
          {description}
        </p>
      </div>
    </Link>
  )
}
