import { Link } from 'react-router-dom'
import coverImage from '../assets/images/cover-seasons-poster.jpg'
import seasonsData from '../data/seasons.json'
import PageHeader from '../components/ui/PageHeader.jsx'
import Divider from '../components/ui/Divider.jsx'
import { seasonClass } from '../lib/seasonClass.js'

const GUIDE_SECTIONS = [
  {
    to: '/seasons',
    label: 'Seasons',
    text: 'The five seasons — their elements, organs, emotions, and the practices each one asks for.',
  },
  {
    to: '/body-clock',
    label: 'Body Clock',
    text: 'The twelve organ windows of the day and how to live in rhythm with them.',
  },
  {
    to: '/pause',
    label: 'Pause & Presence',
    text: 'Breath practices and journal questions for each season.',
  },
  {
    to: '/recipes',
    label: 'Recipes',
    text: 'Forty-five nourishing recipes, arranged by season and by meal.',
  },
]

export default function Home() {
  const { meta, seasons } = seasonsData

  return (
    <div className="spring">
      <Hero />

      {/* Intro */}
      <section className="mt-14">
        <PageHeader label="The Guide" />
        <p className="lead">{meta.description}</p>
      </section>

      <Divider />

      {/* Five seasons grid */}
      <section>
        <h2 className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
          The Five Seasons
        </h2>
        <p className="mt-2 text-[13.5px] italic leading-[1.74] text-muted">
          Each season carries its own energy. Some are more perceptible than
          others, but all are equally important.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
          {seasons.map((season) => (
            <SeasonTile key={season.id} season={season} />
          ))}
        </div>
      </section>

      <Divider />

      {/* How to use this guide */}
      <section>
        <h2 className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
          How to Use This Guide
        </h2>
        <p className="mt-2 text-[13.5px] italic leading-[1.74] text-muted">
          Four ways to meet the seasons through the day, the body, the breath,
          and the table.
        </p>

        <div className="mt-5">
          {GUIDE_SECTIONS.map((g) => (
            <GuideRow key={g.to} {...g} />
          ))}
        </div>
      </section>

      <Divider />

      <p className="cinzel text-center text-[9px] uppercase tracking-[0.3em] text-muted">
        Isabelle Evita Søndergaard
      </p>
    </div>
  )
}

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

function SeasonTile({ season }) {
  return (
    <Link
      to={`/seasons/${season.id}`}
      className={`${seasonClass(season.id)} group block`}
    >
      <div
        className="flex h-full flex-col items-center px-3 pb-4 pt-3 text-center"
        style={{
          background: 'var(--accent-light)',
          border:
            '0.5px solid color-mix(in srgb, var(--accent) 25%, transparent)',
          borderRadius: '2px',
        }}
      >
        <div
          className="mb-3 h-[6px] w-[6px] rounded-full"
          style={{ background: 'var(--accent)' }}
        />
        <p className="cinzel text-[8.5px] font-light uppercase tracking-[0.22em] text-muted">
          {season.element}
        </p>
        <p className="cinzel mt-1 text-[11px] font-light uppercase leading-[1.4] tracking-[0.18em] text-accent">
          {season.name}
        </p>
      </div>
    </Link>
  )
}

function GuideRow({ to, label, text }) {
  return (
    <Link
      to={to}
      className="flex items-start gap-3 border-b py-4 last:border-0 transition-colors hover:text-lead"
      style={{
        borderColor: 'color-mix(in srgb, var(--accent) 14%, transparent)',
      }}
    >
      <div
        className="mt-[9px] h-[5px] w-[5px] min-w-[5px] rounded-full"
        style={{
          background: 'color-mix(in srgb, var(--accent) 45%, transparent)',
        }}
      />
      <div className="min-w-0 flex-1">
        <p className="cinzel text-[10px] font-normal uppercase tracking-[0.25em] text-accent">
          {label}
        </p>
        <p className="mt-1 text-[14px] leading-[1.68]">{text}</p>
      </div>
      <span
        className="cinzel mt-1 text-[10px] tracking-[0.15em] text-muted"
        aria-hidden="true"
      >
        →
      </span>
    </Link>
  )
}
