import { PackageOpen } from 'lucide-react';

export default function EmptyState({ title = 'Nothing here yet', description, action, icon: Icon = PackageOpen }) {
  return (
    <div className="glass p-10 text-center flex flex-col items-center gap-3">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      {description && <p className="text-white/60 max-w-md">{description}</p>}
      {action}
    </div>
  );
}
