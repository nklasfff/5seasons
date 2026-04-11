import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import seasonsData from '../data/seasons.json'
import Hero from '../components/ui/Hero.jsx'
import Divider from '../components/ui/Divider.jsx'
import InsightBlock from '../components/ui/InsightBlock.jsx'
import PracticeRow from '../components/ui/PracticeRow.jsx'
import heroImage from '../assets/images/hero-seasons.jpg'
import { seasonClass } from '../lib/seasonClass.js'

const ADVICE_LABELS = {
  food: 'Food',
  movement: 'Movement',
  emotional: 'Emotional',
  sleep: 'Sleep',
}

// First sentence of a paragraph (fallback to the whole thing).
function firstSentence(text) {
  if (!text) return ''
  const match = text.match(/^[^.!?]*[.!?]/)
  return match ? match[0] : text
}

export default function SeasonDetail() {
  const { id } = useParams()
  const season = seasonsData.seasons.find((s) => s.id === id)
  if (!season) return <Navigate to="/seasons" replace />

  const organEntries = Object.entries(season.organ_detail || {})
  const organNames = organEntries.map(
    ([k]) => k.charAt(0).toUpperCase() + k.slice(1).replace('_', ' '),
  )

  return (
    <div className={seasonClass(season.id)}>
      <Hero
        image={heroImage}
        label={season.element}
        title={season.name}
        subtitle={season.core_emotion_balanced}
      />

      <Link
        to="/seasons"
        className="cinzel mb-8 inline-block text-[9px] uppercase tracking-[0.28em] text-muted hover:text-accent"
      >
        ← All seasons
      </Link>

      {/* Content cards */}
      <div className="space-y-4">
        <InvitationCard description={season.description} />

        <CollapsibleCard
          title="Organs"
          preview={organNames.join(' · ')}
        >
          <div className="space-y-5">
            {organEntries.map(([organ, text]) => (
              <div key={organ}>
                <h4 className="cinzel mb-1 text-[10px] font-normal uppercase tracking-[0.25em] text-heading">
                  {organ.replace('_', ' ')}
                </h4>
                <p className="text-[14px] leading-[1.78]">{text}</p>
              </div>
            ))}
          </div>
        </CollapsibleCard>

        <CollapsibleCard
          title="Signs of Imbalance"
          preview={`${season.symptoms_imbalance.length} signs to recognise`}
        >
          <div>
            {season.symptoms_imbalance.map((s, i) => (
              <PracticeRow key={i} description={s} />
            ))}
          </div>

          {season.contributing_causes?.length > 0 && (
            <>
              <h4 className="cinzel mb-1 mt-6 text-[10px] font-normal uppercase tracking-[0.25em] text-heading">
                Contributing Causes
              </h4>
              <div>
                {season.contributing_causes.map((c, i) => (
                  <PracticeRow key={i} description={c} />
                ))}
              </div>
            </>
          )}
        </CollapsibleCard>

        <CollapsibleCard
          title="Seasonal Advice"
          preview="Food · Movement · Emotional · Sleep"
        >
          <div className="space-y-2">
            {['food', 'movement', 'emotional', 'sleep'].map((key) =>
              season.seasonal_advice?.[key] ? (
                <InsightBlock key={key} label={ADVICE_LABELS[key]}>
                  {season.seasonal_advice[key]}
                </InsightBlock>
              ) : null,
            )}
          </div>
        </CollapsibleCard>
      </div>

      {/* Themes */}
      <section className="mt-14">
        <h2 className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
          Themes of the Season
        </h2>
        <p className="mt-2 text-[13.5px] italic leading-[1.74] text-muted">
          Four threads to carry through the season.
        </p>

        <div className="mt-6 space-y-3">
          {season.themes.map((t) => (
            <ThemeCard key={t.theme} theme={t} />
          ))}
        </div>
      </section>

      <Divider />

      <p className="cinzel text-center text-[9px] uppercase tracking-[0.3em] text-muted">
        {season.name} · {season.element}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Invitation card — first sentence visible, Read more expands rest    */
/* ------------------------------------------------------------------ */

function InvitationCard({ description }) {
  const [open, setOpen] = useState(false)
  const head = firstSentence(description)
  const rest = description.slice(head.length).trim()

  return (
    <article
      className="rounded-sm"
      style={{
        background:
          'color-mix(in srgb, var(--accent-light) 55%, transparent)',
        border:
          '0.5px solid color-mix(in srgb, var(--accent) 18%, transparent)',
      }}
    >
      <div className="px-6 pt-5">
        <h3 className="cinzel text-[13px] font-light uppercase tracking-[0.24em] text-accent">
          The Invitation
        </h3>
        <p className="mt-3 text-[14.5px] italic leading-[1.78] text-lead">
          {head}
        </p>
      </div>

      {rest && (
        <>
          <div className="collapse-grid" data-open={open}>
            <div className="collapse-inner">
              <div className="px-6 pt-3">
                <p className="text-[14.5px] leading-[1.8]">{rest}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="mt-4 flex w-full items-center gap-2 px-6 pb-5 text-left"
            aria-expanded={open}
          >
            <span className="cinzel text-[9px] font-light uppercase tracking-[0.24em] text-muted">
              {open ? 'Read less' : 'Read more'}
            </span>
            <span
              className="cinzel text-[12px] font-light text-muted"
              aria-hidden="true"
            >
              {open ? '−' : '+'}
            </span>
          </button>
        </>
      )}
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* Generic collapsible card                                            */
/* ------------------------------------------------------------------ */

function CollapsibleCard({ title, preview, children }) {
  const [open, setOpen] = useState(false)

  return (
    <article
      className="rounded-sm"
      style={{
        background:
          'color-mix(in srgb, var(--accent-light) 55%, transparent)',
        border:
          '0.5px solid color-mix(in srgb, var(--accent) 18%, transparent)',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <div className="min-w-0 flex-1">
          <h3 className="cinzel text-[13px] font-light uppercase tracking-[0.24em] text-accent">
            {title}
          </h3>
          {preview && (
            <p className="mt-1.5 text-[12.5px] italic leading-[1.6] text-muted">
              {preview}
            </p>
          )}
        </div>
        <span
          className="cinzel text-[14px] font-light text-muted"
          aria-hidden="true"
        >
          {open ? '−' : '+'}
        </span>
      </button>

      <div className="collapse-grid" data-open={open}>
        <div className="collapse-inner">
          <div
            className="border-t px-6 pb-6 pt-5"
            style={{
              borderColor:
                'color-mix(in srgb, var(--accent) 16%, transparent)',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* Theme card — small expandable card per theme                        */
/* ------------------------------------------------------------------ */

function ThemeCard({ theme }) {
  const [open, setOpen] = useState(false)
  const preview = firstSentence(theme.text)
  const rest = theme.text.slice(preview.length).trim()

  return (
    <article
      className="rounded-sm"
      style={{
        background:
          'color-mix(in srgb, var(--accent-light) 40%, transparent)',
        border:
          '0.5px solid color-mix(in srgb, var(--accent) 14%, transparent)',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div className="flex items-baseline justify-between gap-4">
          <h4 className="cinzel text-[10.5px] font-normal uppercase tracking-[0.24em] text-accent">
            {theme.theme}
          </h4>
          {rest && (
            <span
              className="cinzel text-[12px] font-light text-muted"
              aria-hidden="true"
            >
              {open ? '−' : '+'}
            </span>
          )}
        </div>
        <p className="mt-2 text-[13.5px] italic leading-[1.72] text-lead">
          {preview}
        </p>
      </button>

      {rest && (
        <div className="collapse-grid" data-open={open}>
          <div className="collapse-inner">
            <div className="px-5 pb-5">
              <p className="text-[13.5px] leading-[1.78]">{rest}</p>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
