import { formatKES } from '@/lib/formatKES';
import ProductForm from '@/components/admin/ProductForm';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { adminProducts, createProduct, deleteProduct } from '@/api/admin';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { normalizeProduct, productId } from '@/lib/products';

function productPayload(values) {
  return {
    name: values.name,
    price: Number(values.price),
    stock: Number(values.stock || 0),
    brandName: values.brand,
    categoryName: values.category,
    images: values.image ? [values.image] : [],
  };
}

export default function AdminProducts() {
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: adminProducts,
  });
  const createMutation = useMutation({
    mutationFn: (values) => createProduct(productPayload(values)),
    onSuccess: () => {
      toast.success('Product added');
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to add product'),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success('Product deleted');
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to delete product'),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={() => setShowForm((v) => !v)}>{showForm ? 'Close' : 'Add Product'}</Button>
      </div>
      {showForm && <ProductForm onSubmit={(values) => createMutation.mutate(values)} />}
      <div className="glass overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 dark:bg-white/5">
            <tr>
              {['Image', 'Name', 'Brand', 'Category', 'Price', 'Stock', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((raw) => {
              const p = normalizeProduct(raw);
              const id = productId(p);
              return (
                <tr key={id} className="border-t border-slate-100 dark:border-white/5">
                  <td className="px-4 py-3">
                    <img src={p.image || `https://picsum.photos/seed/${id}/80/80`} className="w-10 h-10 rounded-lg object-cover" alt="" />
                  </td>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-white/70">{p.brand}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-white/70">{p.category}</td>
                  <td className="px-4 py-3">{formatKES(p.price)}</td>
                  <td className="px-4 py-3">{p.stock}</td>
                  <td className="px-4 py-3">
                    <Button
                      type="button"
                      size="sm"
                      variant="danger"
                      disabled={!id || deleteMutation.isPending}
                      onClick={() => {
                        if (window.confirm(`Delete ${p.name}?`)) deleteMutation.mutate(id);
                      }}
                    >
                      <Trash2 size={14} /> Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!isLoading && !products.length && (
          <div className="p-6">
            <EmptyState title="No products yet" description="Add your first product to see it in this list." />
          </div>
        )}
      </div>
    </div>
  );
}
