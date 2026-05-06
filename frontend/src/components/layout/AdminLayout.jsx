import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, Tag, Image as ImageIcon, LogOut, Moon, Sun } from 'lucide-react';
import Logo from '@/components/logo/Logo';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';

const items = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
  { to: '/admin/customers', icon: Users, label: 'Customers' },
  { to: '/admin/coupons', icon: Tag, label: 'Coupons' },
  { to: '/admin/banners', icon: ImageIcon, label: 'Banners' },
];

export default function AdminLayout({ children }) {
  const logout = useAuthStore((s) => s.logout);
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggle);
  const nav = useNavigate();
  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
      <aside className="w-64 shrink-0 border-r border-slate-200 bg-white p-4 hidden md:flex flex-col dark:border-white/10 dark:bg-slate-950">
        <Link to="/admin" className="mb-6 inline-flex items-center gap-2"><Logo withText /></Link>
        <nav className="flex-1 space-y-1">
          {items.map((it) => (
            <NavLink
              key={it.to} to={it.to} end={it.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-2xl text-sm transition ${
                  isActive ? 'bg-gradient-to-r from-brand-blue/15 to-brand-cyan/15 text-slate-950 dark:from-brand-blue/30 dark:to-brand-cyan/30 dark:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white'
                }`
              }
            >
              <it.icon size={18} /> {it.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={toggleTheme}
          className="mb-2 flex items-center gap-3 px-3 py-2 rounded-2xl text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
        <button
          onClick={() => { logout(); nav('/admin/login'); }}
          className="flex items-center gap-3 px-3 py-2 rounded-2xl text-sm text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-500/10"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>
      <main className="flex-1 p-6 overflow-x-hidden">{children}</main>
    </div>
  );
}
