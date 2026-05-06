import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { day: 'Mon', revenue: 12000 },
  { day: 'Tue', revenue: 18900 },
  { day: 'Wed', revenue: 14500 },
  { day: 'Thu', revenue: 22100 },
  { day: 'Fri', revenue: 31250 },
  { day: 'Sat', revenue: 28900 },
  { day: 'Sun', revenue: 19800 },
];

export default function RevenueChart() {
  return (
    <div className="glass p-5 h-80">
      <h4 className="font-bold mb-3">Revenue (last 7 days)</h4>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.08)" />
          <XAxis dataKey="day" stroke="rgba(71,85,105,0.85)" />
          <YAxis stroke="rgba(71,85,105,0.85)" />
          <Tooltip contentStyle={{ background: '#ffffff', color: '#0f172a', border: '1px solid rgba(148,163,184,0.45)', borderRadius: 12 }} />
          <Area type="monotone" dataKey="revenue" stroke="#06B6D4" strokeWidth={2} fill="url(#rev)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
