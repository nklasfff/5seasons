import PageHeader from '../components/ui/PageHeader.jsx'
import Divider from '../components/ui/Divider.jsx'

export default function Stub({ label, title, note }) {
  return (
    <div className="spring">
      <PageHeader label={label} />
      <h1 className="cinzel mb-3 text-[22px] font-light uppercase tracking-[0.12em] text-heading">
        {title}
      </h1>
      <p className="lead">{note}</p>
      <Divider />
      <p className="text-[14px] italic text-muted">Coming soon.</p>
    </div>
  )
}
