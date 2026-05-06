import EmptyState from '@/components/ui/EmptyState';
export default function AdminCoupons() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Coupons</h1>
      <EmptyState title="No coupons yet" description="Create promo codes to drive sales." />
    </div>
  );
}
