import TrackingStatusBadge from '@/components/tracking/TrackingStatusBadge';
import { formatKES } from '@/lib/formatKES';
import { dateFmt } from '@/lib/dateFmt';

const sample = [
  { id: 'RCK-1042', customer: 'Wanjiku M.', status: 'shipped', total: 2150, date: Date.now() - 86400000 },
  { id: 'RCK-1041', customer: 'Brian O.', status: 'delivered', total: 950, date: Date.now() - 86400000 * 2 },
  { id: 'RCK-1040', customer: 'Faith A.', status: 'processing', total: 3200, date: Date.now() - 86400000 * 3 },
  { id: 'RCK-1039', customer: 'Kevin K.', status: 'placed', total: 600, date: Date.now() - 3600000 },
];

export default function OrdersTable({ orders = sample }) {
  return (
    <div className="glass overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-100 dark:bg-white/5">
          <tr>
            {['Order', 'Customer', 'Status', 'Total', 'Date'].map((h) => (
              <th key={h} className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-white/70">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t border-slate-100 hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/5">
              <td className="px-4 py-3 font-mono">{o.id}</td>
              <td className="px-4 py-3">{o.customer}</td>
              <td className="px-4 py-3"><TrackingStatusBadge status={o.status} /></td>
              <td className="px-4 py-3">{formatKES(o.total)}</td>
              <td className="px-4 py-3 text-slate-500 dark:text-white/60">{dateFmt(o.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
