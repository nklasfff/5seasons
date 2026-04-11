export default function BreathExercise({ title, suitableFor, steps = [], note }) {
  return (
    <div
      className="my-4 rounded p-4"
      style={{
        border:
          '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
      }}
    >
      <p className="cinzel mb-1 text-[9px] font-light uppercase tracking-[0.28em] text-accent">
        {title}
      </p>
      {suitableFor && (
        <p className="mb-3 text-[11.5px] italic text-muted">{suitableFor}</p>
      )}
      <div className="mt-1">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex items-baseline gap-3 border-b py-2 last:border-0"
            style={{
              borderColor:
                'color-mix(in srgb, var(--accent) 10%, transparent)',
            }}
          >
            <span className="cinzel min-w-[20px] text-[9px] font-light tracking-[0.2em] text-accent">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="text-[13.5px] leading-[1.65]">{step}</p>
          </div>
        ))}
      </div>
      {note && (
        <p className="mt-3 text-[13px] italic leading-[1.7] text-muted">{note}</p>
      )}
    </div>
  )
}
