import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="container-page py-20 text-center">
      <div className="text-8xl font-extrabold text-gradient">404</div>
      <p className="text-white/70 mt-3">The page you're looking for doesn't exist.</p>
      <Link to="/" className="inline-block mt-6"><Button>Back to home</Button></Link>
    </div>
  );
}
