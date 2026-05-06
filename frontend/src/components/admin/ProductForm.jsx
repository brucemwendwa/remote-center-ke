import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const schema = z.object({
  name: z.string().min(2),
  brand: z.string().min(2),
  category: z.string().min(2),
  price: z.coerce.number().min(0),
  stock: z.coerce.number().min(0),
  image: z.string().url().optional().or(z.literal('')),
});

export default function ProductForm({ defaultValues = {}, onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema), defaultValues,
  });
  return (
    <form onSubmit={handleSubmit((d) => onSubmit?.(d))} className="space-y-3 glass p-5">
      <Input label="Name" {...register('name')} error={errors.name?.message} />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Brand" {...register('brand')} error={errors.brand?.message} />
        <Input label="Category" {...register('category')} error={errors.category?.message} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Price (KES)" type="number" {...register('price')} error={errors.price?.message} />
        <Input label="Stock" type="number" {...register('stock')} error={errors.stock?.message} />
      </div>
      <Input label="Image URL" {...register('image')} error={errors.image?.message} />
      <Button>Save Product</Button>
    </form>
  );
}
