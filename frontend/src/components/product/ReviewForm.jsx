import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2),
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(5),
});

export default function ReviewForm({ onSubmit }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema), defaultValues: { rating: 5 },
  });
  const submit = async (data) => {
    try {
      await onSubmit?.(data);
      toast.success('Review submitted');
      reset();
    } catch {
      toast.error('Failed to submit review');
    }
  };
  return (
    <form onSubmit={handleSubmit(submit)} className="glass p-5 space-y-3">
      <h4 className="font-bold">Write a review</h4>
      <Input label="Your name" {...register('name')} error={errors.name?.message} />
      <Input label="Rating (1-5)" type="number" min={1} max={5} {...register('rating')} error={errors.rating?.message} />
      <label className="block">
        <span className="block text-sm text-white/80 mb-1.5">Comment</span>
        <textarea
          rows={4}
          className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white"
          {...register('comment')}
        />
        {errors.comment && <span className="text-xs text-red-400">{errors.comment.message}</span>}
      </label>
      <Button type="submit">Submit Review</Button>
    </form>
  );
}
