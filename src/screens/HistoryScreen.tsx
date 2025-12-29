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
        return 'text-green-600 bg-green-50 border-green-100';
      case 'shipped':
        return 'text-blue-600 bg-blue-50 border-blue-100';
      default:
        return 'text-orange-600 bg-orange-50 border-orange-100';
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
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 shadow-lg safe-area-inset-top shrink-0">
        <h2 className="text-lg font-bold">Activity History</h2>
        <p className="text-xs text-purple-100 uppercase tracking-wider font-semibold">
          {history.length} {history.length === 1 ? 'record' : 'records'}
        </p>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-4">
        {Object.entries(groupedHistory).length > 0 ? (
          Object.entries(groupedHistory).map(([date, items]) => (
            <div key={date}>
              <div className="px-4 py-2 bg-gray-100 sticky top-0 z-10 border-b border-gray-200">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{date}</h3>
              </div>
              
              <div className="p-4 space-y-3">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectItem(item)}
                    className="w-full bg-white rounded-2xl border border-gray-200 p-4 shadow-sm text-left active:bg-gray-50 transition-all active:scale-[0.98]"
                  >
                    {item.type === 'purchase' && item.product ? (
                      <div className="flex gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5">
                              <ShoppingBag className="w-3 h-3 text-purple-600" />
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Purchase</span>
                            </div>
                            <span className="text-[10px] text-gray-400 font-medium">{item.time}</span>
                          </div>
                          
                          <p className="line-clamp-1 text-sm font-bold text-gray-900 mb-2">{item.product.name}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`${platformColors[item.product.platform]} text-white px-2 py-0.5 rounded text-[8px] font-bold`}>
                                {platformNames[item.product.platform]}
                              </div>
                              <span className="text-sm font-black text-gray-900">${item.total?.toFixed(2)}</span>
                            </div>
                            <div className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${getStatusStyle(item.status)} uppercase tracking-tighter`}>
                              {getStatusText(item.status)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : item.type === 'alert' && item.product ? (
                      <div className="flex gap-3 items-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Bell className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-purple-600">Price Alert Set</span>
                            </div>
                            <span className="text-[10px] text-gray-400 font-medium">{item.time}</span>
                          </div>
                          <p className="line-clamp-1 text-sm font-bold text-gray-900">{item.product.name}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Search className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-blue-500">New Search</span>
                            <span className="text-[10px] text-gray-400 font-medium">{item.time}</span>
                          </div>
                          <p className="text-sm font-bold text-gray-900 italic">&quot;{item.query}&quot;</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">No History Yet</h3>
            <p className="text-gray-500 text-sm max-w-xs">
              Your searches, alerts, and purchases will be listed here for easy access.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

