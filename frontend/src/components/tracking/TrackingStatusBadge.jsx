import Badge from '@/components/ui/Badge';

const map = {
  placed: { variant: 'blue', label: 'Order Placed' },
  paid: { variant: 'cyan', label: 'Paid' },
  processing: { variant: 'yellow', label: 'Processing' },
  packed: { variant: 'yellow', label: 'Packed' },
  shipped: { variant: 'cyan', label: 'Shipped' },
  in_transit: { variant: 'cyan', label: 'In Transit' },
  delivered: { variant: 'green', label: 'Delivered' },
};

export default function TrackingStatusBadge({ status }) {
  const c = map[status] || { variant: 'default', label: status };
  return <Badge variant={c.variant}>{c.label}</Badge>;
}
