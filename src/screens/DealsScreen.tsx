import { TrendingDown, ChevronRight, Bell as BellIcon, Zap, ShoppingBag } from 'lucide-react';
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
    <div className="flex flex-col h-full bg-md-background">
      {/* Header */}
      <header className="bg-md-primary text-md-on-primary px-4 py-3 elevation-2 safe-area-inset-top shrink-0">
        <h2 className="text-lg font-medium tracking-wide">Price Alerts</h2>
        <p className="text-[10px] text-md-on-primary/80 uppercase tracking-widest font-black mt-0.5">
          {activeDeal.length} active {activeDeal.length === 1 ? 'alert' : 'alerts'}
        </p>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Active Alerts */}
        {activeDeal.length > 0 && (
          <div className="p-4">
            <h3 className="mb-4 flex items-center gap-2 text-[10px] font-black text-md-on-surface-variant uppercase tracking-widest px-1">
              <BellIcon className="w-4 h-4 text-md-primary" />
              Monitoring
            </h3>
            <div className="space-y-4">
              {activeDeal.map((deal) => {
                const currentPrice = deal.product.price;
                const isNearTarget = (currentPrice - deal.targetPrice) <= deal.targetPrice * 0.1;

                return (
                  <button
                    key={deal.id}
                    onClick={() => onSelectDeal(deal)}
                    className="w-full bg-md-surface-container-low rounded-md-xl border border-md-outline-variant p-4 elevation-1 text-left state-layer active:elevation-0 transition-all"
                  >
                    <div className="flex gap-4">
                      <img
                        src={deal.product.image}
                        alt={deal.product.name}
                        className="w-20 h-20 object-cover rounded-md-m elevation-1 border border-md-outline-variant"
                      />
                      <div className="flex-1 min-w-0">
                        <div className={`${platformColors[deal.product.platform]} text-white px-2 py-0.5 rounded-md-xs text-[10px] font-bold inline-block mb-1.5`}>
                          {platformNames[deal.product.platform]}
                        </div>
                        <p className="line-clamp-1 text-sm font-bold text-md-on-surface mb-2">{deal.product.name}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="text-[10px] font-bold text-md-on-surface-variant uppercase tracking-wider">
                              Now: <span className="text-md-error ml-1">${currentPrice.toFixed(2)}</span>
                            </div>
                            <div className="text-[10px] font-bold text-md-on-surface-variant uppercase tracking-wider">
                              Target: <span className={isNearTarget ? 'text-success ml-1' : 'text-md-on-surface ml-1'}>
                                ${deal.targetPrice.toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <div className="bg-md-surface-container-highest p-1.5 rounded-full">
                            <ChevronRight className="w-4 h-4 text-md-on-surface-variant" />
                          </div>
                        </div>

                        {isNearTarget && (
                          <div className="mt-3 bg-success/10 text-success px-2 py-1 rounded-md-xs text-[10px] font-black flex items-center gap-1.5 w-fit uppercase tracking-wider">
                            <TrendingDown className="w-3.5 h-3.5" />
                            Price is dropping!
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
          <div className="p-4 bg-success/5 border-y border-success/10">
            <h3 className="mb-4 flex items-center gap-2 text-[10px] font-black text-success uppercase tracking-widest px-1">
              <Zap className="w-4 h-4" />
              Target Reached
            </h3>
            <div className="space-y-4">
              {triggeredDeals.map((deal) => (
                <button
                  key={deal.id}
                  onClick={() => onSelectDeal(deal)}
                  className="w-full bg-md-surface-container-lowest rounded-md-xl border border-success/30 p-4 elevation-2 text-left state-layer active:elevation-0 transition-all"
                >
                  <div className="flex gap-4">
                    <img
                      src={deal.product.image}
                      alt={deal.product.name}
                      className="w-20 h-20 object-cover rounded-md-m elevation-1 border border-md-outline-variant"
                    />
                    <div className="flex-1 min-w-0">
                      <div className={`${platformColors[deal.product.platform]} text-white px-2 py-0.5 rounded-md-xs text-[10px] font-bold inline-block mb-1.5`}>
                        {platformNames[deal.product.platform]}
                      </div>
                      <p className="line-clamp-1 text-sm font-bold text-md-on-surface mb-2">{deal.product.name}</p>
                      
                      <div className="text-sm text-success font-black mb-2">
                        Now ${deal.product.price.toFixed(2)}
                      </div>
                      
                      <div className="bg-success text-md-on-primary px-3 py-1.5 rounded-md-full text-[10px] font-black flex items-center justify-center gap-1.5 w-full uppercase tracking-widest elevation-1">
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Buy Now
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
          <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
            <div className="w-24 h-24 bg-md-surface-container-highest rounded-full flex items-center justify-center mb-6 elevation-1">
              <BellIcon className="w-10 h-10 text-md-primary opacity-40" />
            </div>
            <h3 className="text-xl font-black text-md-on-surface mb-2 tracking-tight uppercase">No Alerts Set</h3>
            <p className="text-md-on-surface-variant text-sm mb-10 leading-relaxed font-medium">
              Start monitoring products and get notified the moment prices drop to your target.
            </p>
            <div className="bg-md-primary-container/30 rounded-md-xl p-5 text-left border border-md-primary-container/50 max-w-sm elevation-1">
              <p className="text-xs text-md-on-primary-container leading-relaxed font-bold">
                <span className="bg-md-primary text-md-on-primary px-1.5 py-0.5 rounded-md-xs mr-1.5">TIP</span> 
                Search for a product in the chat and click <span className="text-md-primary underline decoration-2">Monitor</span> to set up your first alert!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
