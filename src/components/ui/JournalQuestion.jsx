export default function JournalQuestion({ number, question, lines = 4 }) {
  return (
    <div
      className="border-b py-3 last:border-0"
      style={{
        borderColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
      }}
    >
      <p className="cinzel mb-1 text-[9px] font-light tracking-[0.22em] text-accent">
        {String(number).padStart(2, '0')}
      </p>
      <p className="text-[14.5px] italic leading-[1.72] text-heading">
        {question}
      </p>
      <div className="mt-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="mt-1 h-[26px]"
            style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}
          />
        ))}
      </div>
    </div>
  )
}
