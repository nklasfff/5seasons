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
import { seasonClass } from '../lib/seasonClass.js'

const SEASON_CARDS = {
  spring: cardSpring,
  summer: cardSummer,
  late_summer: cardLateSummer,
  autumn: cardAutumn,
  winter: cardWinter,
}

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

      <div className="mt-10" />

      {/* THE FIVE SEASONS section */}
      <section className="mt-10">
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

      <div className="mt-10" />

      {/* EXPLORE FURTHER section */}
      <section className="mt-10">
        <PageHeader label="Explore Further" />

        <div className="space-y-8">
          <ExploreLink
            to="/body-clock"
            title="Body Clock"
            description="The twelve organs and their daily rhythm."
          />
          <ExploreLink
            to="/pause"
            title="Pause & Presence"
            description="Mindfulness, breath and seasonal reflection."
          />
          <ExploreLink
            to="/recipes"
            title="Recipes"
            description="Forty-five nourishing recipes, organised by season."
          />
          <ExploreLink
            to="/seasons"
            title="The Seasons"
            description="The energy, themes and wisdom of each season."
          />
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
/* Explore Link                                                       */
/* ------------------------------------------------------------------ */

function ExploreLink({ to, title, description }) {
  return (
    <Link
      to={to}
      className="block transition-opacity hover:opacity-75"
    >
      <p className="cinzel text-[14px] font-light uppercase tracking-wide text-accent">
        {title} <span className="text-muted">—</span> <span className="text-[13px] italic normal-case tracking-normal text-lead">{description}</span>
      </p>
    </Link>
  )
}
