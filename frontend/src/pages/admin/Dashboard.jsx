import StatCard from '@/components/admin/StatCard';
import RevenueChart from '@/components/admin/RevenueChart';
import OrdersTable from '@/components/admin/OrdersTable';
import LowStockList from '@/components/admin/LowStockList';
import { ShoppingBag, DollarSign, Users, Package } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="Revenue" value="KES 142,500" hint="+12.4% this week" />
        <StatCard icon={ShoppingBag} label="Orders" value="184" hint="+8 today" />
        <StatCard icon={Users} label="Customers" value="612" />
        <StatCard icon={Package} label="Products" value="48" />
      </div>
      <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
        <RevenueChart />
        <LowStockList />
      </div>
      <div>
        <h3 className="font-bold mb-3">Recent Orders</h3>
        <OrdersTable />
      </div>
    </div>
  );
}
