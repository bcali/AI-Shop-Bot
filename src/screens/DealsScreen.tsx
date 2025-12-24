import { TrendingDown, ChevronRight, Bell as BellIcon } from 'lucide-react';
import { Product } from '../components/ProductCard';

export interface DealAlert {
  id: string;
  product: Product;
  targetPrice: number;
  createdAt: string;
  priceHistory: { date: string; price: number }[];
  isActive: boolean;
  triggered?: boolean;
}

interface DealsScreenProps {
  deals: DealAlert[];
  onSelectDeal: (deal: DealAlert) => void;
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

export function DealsScreen({ deals, onSelectDeal }: DealsScreenProps) {
  const activeDeal = deals.filter((d) => d.isActive);
  const triggeredDeals = deals.filter((d) => d.triggered && !d.isActive);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 shadow-lg safe-area-inset-top shrink-0">
        <h2 className="text-lg font-bold">Price Alerts</h2>
        <p className="text-xs text-purple-100 uppercase tracking-wider font-semibold">
          {activeDeal.length} active {activeDeal.length === 1 ? 'alert' : 'alerts'}
        </p>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Active Alerts */}
        {activeDeal.length > 0 && (
          <div className="p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-700">
              <BellIcon className="w-4 h-4 text-purple-600" />
              Active Alerts
            </h3>
            <div className="space-y-3">
              {activeDeal.map((deal) => {
                const currentPrice = deal.product.price;
                const isNearTarget = (currentPrice - deal.targetPrice) <= deal.targetPrice * 0.1;

                return (
                  <button
                    key={deal.id}
                    onClick={() => onSelectDeal(deal)}
                    className="w-full bg-white rounded-xl border border-gray-200 p-4 shadow-sm text-left active:bg-gray-50 transition-colors"
                  >
                    <div className="flex gap-3">
                      <img
                        src={deal.product.image}
                        alt={deal.product.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className={`${platformColors[deal.product.platform]} text-white px-2 py-0.5 rounded text-[10px] inline-block mb-1`}>
                          {platformNames[deal.product.platform]}
                        </div>
                        <p className="line-clamp-1 text-sm font-medium mb-1">{deal.product.name}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="text-[10px] text-gray-500">
                              Current: <span className="text-red-600 font-bold">${currentPrice.toFixed(2)}</span>
                            </div>
                            <div className="text-[10px] text-gray-500">
                              Target: <span className={isNearTarget ? 'text-green-600 font-bold' : 'text-gray-900 font-bold'}>
                                ${deal.targetPrice.toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>

                        {isNearTarget && (
                          <div className="mt-2 bg-green-50 text-green-700 px-2 py-1 rounded text-[10px] flex items-center gap-1 w-fit">
                            <TrendingDown className="w-3 h-3" />
                            Close to target!
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Triggered Deals */}
        {triggeredDeals.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-green-50/30">
            <h3 className="mb-3 text-sm font-bold text-green-700 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Price Targets Reached
            </h3>
            <div className="space-y-3">
              {triggeredDeals.map((deal) => (
                <button
                  key={deal.id}
                  onClick={() => onSelectDeal(deal)}
                  className="w-full bg-white rounded-xl border border-green-200 p-4 shadow-sm text-left active:bg-green-50 transition-colors"
                >
                  <div className="flex gap-3">
                    <img
                      src={deal.product.image}
                      alt={deal.product.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className={`${platformColors[deal.product.platform]} text-white px-2 py-0.5 rounded text-[10px] inline-block mb-1`}>
                        {platformNames[deal.product.platform]}
                      </div>
                      <p className="line-clamp-1 text-sm font-medium mb-1">{deal.product.name}</p>
                      
                      <div className="text-xs text-green-700 font-bold">
                        Now ${deal.product.price.toFixed(2)} (Target: ${deal.targetPrice.toFixed(2)})
                      </div>
                      
                      <div className="mt-2 flex items-center gap-1 text-[10px] text-green-700 font-medium">
                        <TrendingDown className="w-3 h-3" />
                        Price dropped below your target!
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {deals.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <BellIcon className="w-10 h-10 text-purple-600 opacity-50" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">No Price Alerts Yet</h3>
            <p className="text-gray-500 text-sm mb-8 max-w-xs">
              Start monitoring products and get notified when prices drop to your target
            </p>
            <div className="bg-blue-50 rounded-2xl p-4 text-left border border-blue-100 max-w-sm">
              <p className="text-xs text-blue-800 leading-relaxed">
                <span className="font-bold mr-1">💡 Tip:</span> Search for a product in the chat and click <span className="font-bold">"Monitor"</span> to set up your first alert!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { Zap } from 'lucide-react';

