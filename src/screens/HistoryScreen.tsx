import { ShoppingBag, Bell, ChevronRight, Search, Clock } from 'lucide-react';
import { Product } from '../components/ProductCard';

export interface HistoryItem {
  id: string;
  type: 'purchase' | 'alert' | 'search';
  date: string;
  time: string;
  product?: Product;
  query?: string;
  total?: number;
  status?: 'completed' | 'shipped' | 'delivered';
}

interface HistoryScreenProps {
  history: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
}

const platformColors = {
  shopee: 'bg-orange-500',
  lazada: 'bg-blue-600',
  amazon: 'bg-yellow-500',
};

const platformNames = {
  shopee: 'Shopee',
  lazada: 'Lazada',
  amazon: 'Amazon',
};

export function HistoryScreen({ history, onSelectItem }: HistoryScreenProps) {
  // Simple grouping by date
  const groupedHistory = history.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item);
    return acc;
  }, {} as Record<string, HistoryItem[]>);

  const getStatusStyle = (status?: string) => {
    switch (status) {
      case 'delivered':
        return 'text-success bg-success/10 border-success/20';
      case 'shipped':
        return 'text-md-primary bg-md-primary-container/30 border-md-primary-container/50';
      default:
        return 'text-amazon bg-amazon/10 border-amazon/20';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'shipped':
        return 'Shipped';
      default:
        return 'Processing';
    }
  };

  return (
    <div className="flex flex-col h-full bg-md-background">
      {/* Header */}
      <header className="bg-md-primary text-md-on-primary px-4 py-3 elevation-2 safe-area-inset-top shrink-0">
        <h2 className="text-lg font-medium tracking-wide">Activity History</h2>
        <p className="text-[10px] text-md-on-primary/80 uppercase tracking-widest font-black mt-0.5">
          {history.length} {history.length === 1 ? 'record' : 'records'}
        </p>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-8">
        {Object.entries(groupedHistory).length > 0 ? (
          Object.entries(groupedHistory).map(([date, items]) => (
            <div key={date}>
              <div className="px-5 py-2.5 bg-md-surface-container-highest sticky top-0 z-10 border-b border-md-outline-variant">
                <h3 className="text-[10px] font-black text-md-on-surface-variant uppercase tracking-[0.2em]">{date}</h3>
              </div>
              
              <div className="p-4 space-y-4">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectItem(item)}
                    className="w-full bg-md-surface-container-low rounded-md-xl border border-md-outline-variant p-4 elevation-1 text-left state-layer active:elevation-0 transition-all"
                  >
                    {item.type === 'purchase' && item.product ? (
                      <div className="flex gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-md-m elevation-1 border border-md-outline-variant"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1.5">
                              <div className="bg-md-tertiary-container/50 p-1 rounded-md-xs">
                                <ShoppingBag className="w-3 h-3 text-md-tertiary" />
                              </div>
                              <span className="text-[9px] font-black text-md-on-surface-variant uppercase tracking-widest">Purchase</span>
                            </div>
                            <span className="text-[9px] font-black text-md-on-surface-variant opacity-60">{item.time}</span>
                          </div>
                          
                          <p className="line-clamp-1 text-sm font-bold text-md-on-surface mb-2.5 leading-none">{item.product.name}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`${platformColors[item.product.platform]} text-white px-2 py-0.5 rounded-md-xs text-[8px] font-black uppercase tracking-tighter`}>
                                {platformNames[item.product.platform]}
                              </div>
                              <span className="text-sm font-black text-md-on-surface">${item.total?.toFixed(2)}</span>
                            </div>
                            <div className={`text-[8px] font-black px-2 py-0.5 rounded-md-full border ${getStatusStyle(item.status)} uppercase tracking-widest`}>
                              {getStatusText(item.status)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : item.type === 'alert' && item.product ? (
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-md-primary-container text-md-on-primary-container rounded-md-m flex items-center justify-center flex-shrink-0 elevation-1 border border-md-primary-container/50">
                          <Bell className="w-6 h-6 text-md-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] font-black text-md-primary uppercase tracking-[0.15em]">Price Alert Set</span>
                            </div>
                            <span className="text-[9px] font-black text-md-on-surface-variant opacity-60">{item.time}</span>
                          </div>
                          <p className="line-clamp-1 text-sm font-bold text-md-on-surface">{item.product.name}</p>
                        </div>
                        <div className="bg-md-surface-container-highest p-1.5 rounded-full">
                          <ChevronRight className="w-4 h-4 text-md-on-surface-variant" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-md-surface-container-highest text-md-on-surface-variant rounded-md-m flex items-center justify-center flex-shrink-0 elevation-1 border border-md-outline-variant">
                          <Search className="w-6 h-6 text-md-on-surface-variant" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[9px] font-black text-md-on-surface-variant uppercase tracking-[0.15em]">New Search</span>
                            <span className="text-[9px] font-black text-md-on-surface-variant opacity-60">{item.time}</span>
                          </div>
                          <p className="text-sm font-black text-md-on-surface italic">&quot;{item.query}&quot;</p>
                        </div>
                        <div className="bg-md-surface-container-highest p-1.5 rounded-full">
                          <ChevronRight className="w-4 h-4 text-md-on-surface-variant" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
            <div className="w-24 h-24 bg-md-surface-container-highest rounded-full flex items-center justify-center mb-6 elevation-1">
              <Clock className="w-10 h-10 text-md-on-surface-variant opacity-40" />
            </div>
            <h3 className="text-xl font-black text-md-on-surface mb-2 tracking-tight uppercase">No History</h3>
            <p className="text-md-on-surface-variant text-sm leading-relaxed font-medium">
              Your searches, alerts, and purchases will be listed here for easy access.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

