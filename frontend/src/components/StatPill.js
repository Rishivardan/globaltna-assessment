export default function StatPill({ label, value, valueClassName = "" }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white">
      <span className="text-sm text-white/85">{label}</span>
      <span className={`text-lg font-semibold ${valueClassName}`}>{value}</span>
    </div>
  );
}
