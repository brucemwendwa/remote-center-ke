import OrdersTable from '@/components/admin/OrdersTable';
export default function AdminOrders() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Orders</h1>
      <OrdersTable />
    </div>
  );
}
