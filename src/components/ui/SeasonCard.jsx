import { seasonCardImages } from '../../lib/seasonImage.js'

export default function SeasonCard({ season }) {
  const meta = [
    { label: 'Organ', value: season.organs?.join(' · ') },
    { label: 'Climate', value: season.climate },
    { label: 'Direction', value: season.direction },
    { label: 'Taste', value: season.taste },
  ]

  return (
    <div className="my-4 flex items-start gap-5">
      <img
        src={seasonCardImages[season.id]}
        alt=""
        className="h-[148px] w-[148px] flex-shrink-0 rounded-sm object-contain"
      />
      <div className="flex-1">
        <p className="cinzel text-[17px] font-light uppercase tracking-[0.18em] text-accent">
          {season.name}
        </p>
        <p
          className="mb-2 text-[11px] italic"
          style={{
            color: 'color-mix(in srgb, var(--accent) 80%, transparent)',
          }}
        >
          {season.element}
        </p>
        <div className="grid grid-cols-2">
          {meta.map(({ label, value }) => (
            <div
              key={label}
              className="border-b border-r p-2 last:border-r-0"
              style={{
                borderColor:
                  'color-mix(in srgb, var(--accent) 10%, transparent)',
              }}
            >
              <p
                className="cinzel mb-0.5 text-[8.5px] uppercase tracking-[0.18em]"
                style={{
                  color:
                    'color-mix(in srgb, var(--accent) 70%, transparent)',
                }}
              >
                {label}
              </p>
              <p className="text-[12.5px] italic leading-[1.5]">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
