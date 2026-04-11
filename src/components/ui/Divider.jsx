export default function Divider() {
  return (
    <div
      className="mx-auto my-[22px] h-px w-11"
      style={{
        background:
          'linear-gradient(to right, transparent, var(--accent), transparent)',
        height: '0.5px',
      }}
    />
  )
}
