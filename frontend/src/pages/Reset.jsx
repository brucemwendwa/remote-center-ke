import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { resetPassword } from '@/api/auth';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Reset() {
  const [params] = useSearchParams();
  const nav = useNavigate();
  const email = params.get('email') || '';
  const [pw, setPw] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({ email, token: params.get('token'), password: pw });
      toast.success('Password reset. Please sign in.');
      nav('/login');
    } catch {
      toast.error('Reset link is invalid or expired.');
    }
  };
  return (
    <div className="container-page py-12 max-w-md">
      <form onSubmit={submit} className="glass p-6 space-y-3">
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <Input label="New password" type="password" value={pw} onChange={(e) => setPw(e.target.value)} required />
        <Button className="w-full">Reset password</Button>
      </form>
    </div>
  );
}
