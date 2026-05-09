import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { DEMO_DATA_EVENT, DEMO_STORAGE_KEYS } from '@/lib/demoStore';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false, staleTime: 1000 * 60 },
  },
});

const refreshDemoQueries = () => {
  queryClient.invalidateQueries({ queryKey: ['products'] });
  queryClient.invalidateQueries({ queryKey: ['featured'] });
  queryClient.invalidateQueries({ queryKey: ['product'] });
  queryClient.invalidateQueries({ queryKey: ['related'] });
  queryClient.invalidateQueries({ queryKey: ['admin-products'] });
  queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
  queryClient.invalidateQueries({ queryKey: ['admin-customers'] });
  queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
  queryClient.invalidateQueries({ queryKey: ['admin-coupons'] });
  queryClient.invalidateQueries({ queryKey: ['admin-banners'] });
};

window.addEventListener(DEMO_DATA_EVENT, refreshDemoQueries);
window.addEventListener('storage', (event) => {
  if (Object.values(DEMO_STORAGE_KEYS).includes(event.key)) refreshDemoQueries();
});

// Apply theme class on first load
if (!localStorage.getItem('rck-theme-default-updated')) {
  localStorage.setItem('rck-theme-default-updated', 'true');
  localStorage.setItem('rck-theme', 'light');
}
const stored = localStorage.getItem('rck-theme');
if (stored === 'dark') document.documentElement.classList.add('dark');
else document.documentElement.classList.remove('dark');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'rgba(15,23,42,0.9)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
              },
            }}
          />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);

// Optional service-worker registration (no-op if unsupported / not present)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
