import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { forgotPassword } from '@/api/auth';

export default function Forgot() {
  const [email, setEmail] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    try { await forgotPassword({ email }); } catch {}
    toast.success('If the email exists, a reset link was sent.');
  };
  return (
    <div className="container-page py-12 max-w-md">
      <form onSubmit={submit} className="glass p-6 space-y-3">
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Button className="w-full">Send reset link</Button>
      </form>
    </div>
  );
}
