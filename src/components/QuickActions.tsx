import { Search, Bell, TrendingDown, Sparkles } from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

const actions = [
  { icon: Search, label: 'Search Products', query: 'Search for wireless headphones' },
  { icon: TrendingDown, label: 'Price Alerts', query: 'Show my price alerts' },
  { icon: Bell, label: 'Deals', query: 'Find the best deals today' },
  { icon: Sparkles, label: 'Recommend', query: 'Recommend popular items' },
];

export function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-4 ml-11">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => onActionClick(action.query)}
          className="flex flex-col items-center justify-center gap-2 p-4 bg-md-surface-container-high hover:bg-md-primary-container/20 rounded-md-xl border border-md-outline-variant transition-all state-layer active:elevation-0 elevation-1 text-center"
        >
          <div className="bg-md-primary-container text-md-primary p-2 rounded-md-m elevation-1 mb-1">
            <action.icon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-black text-md-on-surface uppercase tracking-widest leading-tight">{action.label}</span>
        </button>
      ))}
    </div>
  );
}

