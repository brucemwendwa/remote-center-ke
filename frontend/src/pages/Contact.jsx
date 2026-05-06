import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MessageCircle, Phone, Mail } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const submit = (e) => {
    e.preventDefault();
    toast.success('Message sent — we\'ll be in touch shortly.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="container-page py-8 grid lg:grid-cols-2 gap-6">
      <form onSubmit={submit} className="glass p-6 space-y-3">
        <h1 className="text-2xl font-bold">Contact us</h1>
        <Input label="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <label className="block">
          <span className="block text-sm mb-1.5">Message</span>
          <textarea
            rows={5} required value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10"
          />
        </label>
        <Button className="w-full">Send message</Button>
      </form>
      <div className="space-y-3">
        <div className="glass p-5 flex items-center gap-3">
          <Phone className="text-brand-cyan" />
          <a href="tel:0757541507" className="hover:text-white">0757541507</a>
        </div>
        <a href="https://wa.me/254757541507" target="_blank" rel="noreferrer" className="glass p-5 flex items-center gap-3 hover:bg-white/10 transition">
          <MessageCircle className="text-brand-cyan" /> WhatsApp us
        </a>
        <div className="glass p-5 flex items-center gap-3">
          <Mail className="text-brand-cyan" /> hello@remotecenter.co.ke
        </div>
      </div>
    </div>
  );
}
