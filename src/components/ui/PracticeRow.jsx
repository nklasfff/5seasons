export default function PracticeRow({ title, description }) {
  return (
    <div
      className="flex items-start gap-3 border-b py-3 last:border-0"
      style={{
        borderColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
      }}
    >
      <div
        className="mt-2 h-[5px] w-[5px] min-w-[5px] rounded-full"
        style={{
          background: 'color-mix(in srgb, var(--accent) 40%, transparent)',
        }}
      />
      <p className="text-[14px] leading-[1.7]">
        {title && (
          <strong className="font-medium text-heading">{title}.</strong>
        )}{' '}
        {description}
      </p>
    </div>
  )
}
