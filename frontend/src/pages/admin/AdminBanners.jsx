import EmptyState from '@/components/ui/EmptyState';
export default function AdminBanners() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Banners</h1>
      <EmptyState title="No banners" description="Upload homepage banners and promo tiles." />
    </div>
  );
}
