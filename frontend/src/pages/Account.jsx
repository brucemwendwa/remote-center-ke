import { NavLink, Routes, Route } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import EmptyState from '@/components/ui/EmptyState';
import Wishlist from './Wishlist';

function Tab({ to, children }) {
  return (
    <NavLink
      to={to} end
      className={({ isActive }) =>
        `px-4 py-2 rounded-2xl text-sm transition ${
          isActive ? 'bg-gradient-to-r from-brand-blue/30 to-brand-cyan/30' : 'hover:bg-white/5'
        }`
      }
    >
      {children}
    </NavLink>
  );
}

function Profile() {
  const user = useAuthStore((s) => s.user);
  if (!user) return <EmptyState title="Not signed in" description="Sign in to view your profile." />;
  return (
    <div className="glass p-6 max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <dl className="grid sm:grid-cols-2 gap-4">
        <div>
          <dt className="text-sm text-white/60">Name</dt>
          <dd className="font-semibold">{user.name || 'Not set'}</dd>
        </div>
        <div>
          <dt className="text-sm text-white/60">Email</dt>
          <dd className="font-semibold break-all">{user.email}</dd>
        </div>
        <div>
          <dt className="text-sm text-white/60">Role</dt>
          <dd className="font-semibold capitalize">{user.role || 'customer'}</dd>
        </div>
      </dl>
    </div>
  );
}
function Orders() { return <EmptyState title="No orders yet" description="When you place an order it will show here." />; }
function Addresses() { return <EmptyState title="No saved addresses" />; }

export default function Account() {
  return (
    <div className="container-page py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        <Tab to="/account">Profile</Tab>
        <Tab to="/account/orders">Orders</Tab>
        <Tab to="/account/addresses">Addresses</Tab>
        <Tab to="/account/wishlist">Wishlist</Tab>
      </div>
      <Routes>
        <Route path="" element={<Profile />} />
        <Route path="orders" element={<Orders />} />
        <Route path="addresses" element={<Addresses />} />
        <Route path="wishlist" element={<Wishlist embedded />} />
      </Routes>
    </div>
  );
}
