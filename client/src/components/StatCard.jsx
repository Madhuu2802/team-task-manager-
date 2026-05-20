export default function StatCard({ label, value, tone = '' }) {
  return <div className={`stat ${tone}`}><small>{label}</small><h2>{value ?? 0}</h2></div>;
}
