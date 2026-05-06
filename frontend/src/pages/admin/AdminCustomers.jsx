export default function AdminCustomers() {
  const customers = [
    { name: 'Wanjiku Mwangi', email: 'wanjiku@example.com', orders: 5, spent: 8400 },
    { name: 'Brian Otieno', email: 'brian@example.com', orders: 3, spent: 4250 },
    { name: 'Faith Achieng', email: 'faith@example.com', orders: 2, spent: 6100 },
  ];
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Customers</h1>
      <div className="glass overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 dark:bg-white/5">
            <tr>{['Name', 'Email', 'Orders', 'Spent'].map((h) => <th key={h} className="text-left px-4 py-3">{h}</th>)}</tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.email} className="border-t border-slate-100 dark:border-white/5">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-white/70">{c.email}</td>
                <td className="px-4 py-3">{c.orders}</td>
                <td className="px-4 py-3">KES {c.spent.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
