export default function StatCard({ icon: Icon, label, value, hint, accent = 'from-brand-blue to-brand-cyan' }) {
  return (
    <div className="glass p-5">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-500 dark:text-white/60">{label}</div>
        {Icon && (
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center`}>
            <Icon size={16} />
          </div>
        )}
      </div>
      <div className="mt-2 text-2xl font-extrabold">{value}</div>
      {hint && <div className="text-xs text-emerald-400 mt-1">{hint}</div>}
    </div>
  );
}
