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
    <div className="grid grid-cols-2 gap-2 px-4 py-3">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => onActionClick(action.query)}
          className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 rounded-xl border border-purple-100 transition-all active:scale-95 text-center"
        >
          <action.icon className="w-5 h-5 text-purple-600" />
          <span className="text-[10px] font-medium text-gray-700">{action.label}</span>
        </button>
      ))}
    </div>
  );
}

