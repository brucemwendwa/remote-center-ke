import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { register as apiRegister } from '@/api/auth';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Register() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await apiRegister(data);
      setAuth(res.user, res.token);
      toast.success('Account created');
      nav('/account');
    } catch {
      setAuth({ name: data.name, email: data.email, role: 'user' }, 'demo-token');
      toast.success('Account created (demo)');
      nav('/account');
    }
  };

  return (
    <div className="container-page py-12 max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="glass p-6 space-y-3">
        <h1 className="text-2xl font-bold">Create account</h1>
        <Input label="Name" {...register('name')} error={errors.name?.message} />
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
        <Button className="w-full" disabled={isSubmitting}>Create account</Button>
        <div className="text-sm text-white/60 text-center">
          Already have an account? <Link to="/login" className="text-brand-cyan hover:underline">Sign in</Link>
        </div>
      </form>
    </div>
  );
}
