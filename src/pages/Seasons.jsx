import { Link } from 'react-router-dom'
import seasonsData from '../data/seasons.json'
import Hero from '../components/ui/Hero.jsx'
import HorizontalNav from '../components/layout/HorizontalNav.jsx'
import Divider from '../components/ui/Divider.jsx'
import heroImage from '../assets/images/hero-seasons.jpg'
import { seasonClass } from '../lib/seasonClass.js'
import { seasonCardImages } from '../lib/seasonImage.js'

export default function Seasons() {
  const { meta, seasons } = seasonsData

  return (
    <div className="spring">
      <Hero
        image={heroImage}
        label="The Five Seasons"
        title={meta.title}
        subtitle={meta.subtitle}
      />
      <HorizontalNav />

      <p className="text-[15px] leading-[1.82]">{meta.description}</p>

      <Divider />

      <div className="flex flex-col" style={{ background: 'transparent' }}>
        {seasons.map((season) => (
          <SeasonRow key={season.id} season={season} />
        ))}
      </div>
    </div>
  )
}

function SeasonRow({ season }) {
  return (
    <Link
      to={`/seasons/${season.id}`}
      className={`group block ${seasonClass(season.id)}`}
    >
      <article
        className="flex items-start gap-5 border-b py-6 transition-colors"
        style={{
          borderColor:
            'color-mix(in srgb, var(--accent) 18%, transparent)',
          background: 'transparent',
        }}
      >
        <img
          src={seasonCardImages[season.id]}
          alt=""
          className="h-[124px] w-[124px] flex-shrink-0 object-contain"
          style={{ background: 'transparent' }}
        />
        <div className="min-w-0 flex-1">
          <p className="cinzel text-[9px] uppercase tracking-[0.3em] text-muted">
            {season.element}
          </p>
          <h2 className="cinzel mt-1 text-[19px] font-light uppercase tracking-[0.18em] text-accent">
            {season.name}
          </h2>
          <p
            className="mt-1 text-[11px] italic"
            style={{
              color: 'color-mix(in srgb, var(--accent) 80%, var(--muted))',
            }}
          >
            {season.organs.join(' · ')}
          </p>
          <p className="mt-3 line-clamp-3 text-[13.5px] leading-[1.7] text-body">
            {season.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
            {season.keywords.slice(0, 4).map((k) => (
              <span
                key={k}
                className="cinzel text-[9px] uppercase tracking-[0.22em] text-muted"
              >
                · {k}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}
