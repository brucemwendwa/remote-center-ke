import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Sun, Moon, Menu, X, Heart } from 'lucide-react';
import { useState } from 'react';
import Logo from '@/components/logo/Logo';
import { useCartStore } from '@/store/cartStore';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/track', label: 'Track' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const count = useCartStore((s) => s.count());
  const openCart = useCartStore((s) => s.open);
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggle);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [q, setQ] = useState('');
  const nav = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    if (q.trim()) nav(`/shop?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-30">
      <div className="container-page mt-3">
        <nav className="glass px-4 py-3 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Logo className="w-9 h-9" withText />
          </Link>

          <ul className="hidden lg:flex items-center gap-1 ml-4">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-xl text-sm font-medium transition ${
                      isActive ? 'text-slate-950 bg-slate-100 dark:text-white dark:bg-white/10' : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/5'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <form onSubmit={onSearch} className="hidden md:flex flex-1 max-w-md mx-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/40" size={16} />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search remotes, brands, covers…"
              className="w-full pl-9 pr-4 py-2 rounded-2xl bg-white border border-slate-200 text-sm text-slate-950 placeholder-slate-400 focus:outline-none focus:border-brand-cyan/50 dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-white/40"
            />
          </form>

          <div className="ml-auto flex items-center gap-1">
            <button onClick={toggleTheme} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10" aria-label="Theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/wishlist" className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 hidden sm:block">
              <Heart size={18} />
            </Link>
            <button onClick={openCart} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 relative">
              <ShoppingCart size={18} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-brand-blue to-brand-cyan text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <div className="relative">
              <button onClick={() => setUserMenu((v) => !v)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10">
                <User size={18} />
              </button>
              <AnimatePresence>
                {userMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="absolute right-0 mt-2 w-48 glass p-2"
                    onMouseLeave={() => setUserMenu(false)}
                  >
                    {user ? (
                      <>
                        <div className="px-3 py-2 text-sm font-semibold border-b border-slate-200 mb-1 dark:border-white/10">
                          {user.name || user.email}
                        </div>
                        <Link to="/account" className="block px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-white/10">My Account</Link>
                        <Link to="/account/orders" className="block px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-white/10">Orders</Link>
                        <button onClick={() => { logout(); setUserMenu(false); }} className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-red-50 text-red-600 dark:hover:bg-white/10 dark:text-red-300">Log out</button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="block px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-white/10">Sign in</Link>
                        <Link to="/register" className="block px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-white/10">Create account</Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={() => setMobileOpen((v) => !v)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 lg:hidden">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="glass mt-2 p-4 lg:hidden"
            >
              <form onSubmit={onSearch} className="mb-3 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/40" size={16} />
                <input
                  value={q} onChange={(e) => setQ(e.target.value)}
                  placeholder="Search…"
                  className="w-full pl-9 pr-4 py-2 rounded-2xl bg-white border border-slate-200 text-sm text-slate-950 placeholder-slate-400 dark:bg-white/5 dark:border-white/10 dark:text-white"
                />
              </form>
              <ul className="space-y-1">
                {links.map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to} onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2 rounded-xl text-sm hover:bg-slate-100 dark:hover:bg-white/10"
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
