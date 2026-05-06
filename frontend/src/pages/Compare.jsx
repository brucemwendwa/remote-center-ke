import EmptyState from '@/components/ui/EmptyState';
import { Scale } from 'lucide-react';

export default function Compare() {
  return (
    <div className="container-page py-8">
      <h1 className="text-3xl font-bold mb-6">Compare</h1>
      <EmptyState icon={Scale} title="Nothing to compare yet" description="Add up to 4 products to compare side-by-side." />
    </div>
  );
}
