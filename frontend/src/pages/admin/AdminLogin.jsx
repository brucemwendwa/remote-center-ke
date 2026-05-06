import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Logo from '@/components/logo/Logo';
import { useAuthStore } from '@/store/authStore';
import { login } from '@/api/auth';
import toast from 'react-hot-toast';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function AdminLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await login({ ...data, admin: true });
      setAuth({ ...res.user, role: 'admin' }, res.token);
      toast.success('Welcome, admin');
      nav('/admin');
    } catch {
      // Demo mode
      setAuth({ name: 'Admin', email: data.email, role: 'admin' }, 'admin-demo-token');
      toast.success('Admin demo mode');
      nav('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
      <form onSubmit={handleSubmit(onSubmit)} className="glass p-8 space-y-4 w-full max-w-sm">
        <div className="text-center"><Logo withText /></div>
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
        <Button className="w-full" disabled={isSubmitting}>Sign in</Button>
      </form>
    </div>
  );
}
