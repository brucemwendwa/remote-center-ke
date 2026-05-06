import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { login } from '@/api/auth';
import toast from 'react-hot-toast';
import Logo from '@/components/logo/Logo';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Login() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      setAuth(res.user, res.token);
      toast.success('Welcome back!');
      nav('/account');
    } catch (e) {
      // Demo fallback
      setAuth({ name: 'Demo User', email: data.email, role: 'user' }, 'demo-token');
      toast.success('Signed in (demo mode)');
      nav('/account');
    }
  };

  return (
    <div className="container-page py-12 max-w-md">
      <div className="text-center mb-6"><Logo withText /></div>
      <form onSubmit={handleSubmit(onSubmit)} className="glass p-6 space-y-3">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
        <Button className="w-full" disabled={isSubmitting}>Sign in</Button>
        <div className="flex justify-between text-sm text-white/60">
          <Link to="/forgot" className="hover:text-white">Forgot password?</Link>
          <Link to="/register" className="hover:text-white">Create account</Link>
        </div>
      </form>
    </div>
  );
}
