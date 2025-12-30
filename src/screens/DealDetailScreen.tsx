import { ArrowLeft, Bell, TrendingDown, Package, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { DealAlert } from './DealsScreen';

interface DealDetailScreenProps {
  deal: DealAlert;
  onBack: () => void;
  onDisableAlert: (dealId: string) => void;
  onBuyNow: (deal: DealAlert) => void;
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

export function DealDetailScreen({ deal, onBack, onDisableAlert, onBuyNow }: DealDetailScreenProps) {
  const currentPrice = deal.product.price;
  const priceDiff = currentPrice - deal.targetPrice;
  const percentFromTarget = ((currentPrice - deal.targetPrice) / deal.targetPrice) * 100;
  const isTriggered = deal.triggered || currentPrice <= deal.targetPrice;
  const lowestPrice = Math.min(...deal.priceHistory.map((h) => h.price));
  const highestPrice = Math.max(...deal.priceHistory.map((h) => h.price));

  return (
    <div className="flex flex-col h-full bg-md-background">
      {/* Header */}
      <header className="bg-md-primary text-md-on-primary px-4 py-3 flex items-center gap-3 elevation-2 safe-area-inset-top shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="text-md-on-primary hover:bg-md-on-primary/12 -ml-2 rounded-full h-10 w-10 state-layer"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-medium tracking-wide flex-1">Alert Details</h2>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Product Info */}
        <div className="bg-md-surface-container-low p-5 mb-4 elevation-1 border-b border-md-outline-variant">
          <img
            src={deal.product.image}
            alt={deal.product.name}
            className="w-full h-64 object-cover rounded-md-xl mb-5 elevation-2 border-4 border-white"
          />
          <div className="flex items-center gap-2 mb-3">
            <div className={`${platformColors[deal.product.platform]} text-white px-2 py-0.5 rounded-md-xs text-[10px] font-black uppercase tracking-widest`}>
              {platformNames[deal.product.platform]}
            </div>
            {deal.product.inStock && (
              <span className="text-success text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-1.5 bg-success/10 px-2 py-0.5 rounded-md-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                In Stock
              </span>
            )}
          </div>
          <h3 className="text-xl font-black text-md-on-surface leading-tight mb-3 tracking-tight">{deal.product.name}</h3>
          <div className="flex items-center gap-2.5 text-xs font-bold text-md-on-surface-variant opacity-70">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(deal.product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-md-outline-variant fill-md-outline-variant'}`} viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-md-on-surface">{deal.product.rating}</span>
            <span className="uppercase tracking-widest">({deal.product.reviews} reviews)</span>
          </div>
        </div>

        {/* Price Status */}
        <div className={`mx-4 mb-4 rounded-md-xl p-6 elevation-2 border transition-colors duration-300 ${isTriggered ? 'bg-success/5 border-success/30' : 'bg-md-primary-container/10 border-md-primary-container/30'}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 rounded-md-full elevation-1 flex items-center justify-center ${isTriggered ? 'bg-success text-md-on-primary' : 'bg-md-primary text-md-on-primary'}`}>
              {isTriggered ? (
                <TrendingDown className="w-7 h-7" />
              ) : (
                <Bell className="w-7 h-7" />
              )}
            </div>
            <div>
              <span className={`text-sm font-black uppercase tracking-[0.1em] block ${isTriggered ? 'text-success' : 'text-md-primary'}`}>
                {isTriggered ? 'Price Target Reached!' : 'Monitoring Price'}
              </span>
              <span className="text-[10px] font-bold text-md-on-surface-variant opacity-70 uppercase tracking-widest">
                {isTriggered ? 'Ready for immediate purchase' : 'Waiting for price drop'}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black text-md-on-surface-variant uppercase tracking-[0.2em]">Current Price</span>
              <span className="text-3xl font-black text-md-error tracking-tight leading-none">${currentPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black text-md-on-surface-variant uppercase tracking-[0.2em]">Your Target</span>
              <span className={`text-2xl font-black tracking-tight leading-none ${isTriggered ? 'text-success' : 'text-md-on-surface'}`}>
                ${deal.targetPrice.toFixed(2)}
              </span>
            </div>
            <div className="pt-4 border-t border-md-outline-variant/30 flex justify-between items-center">
              <span className="text-[10px] font-black text-md-on-surface-variant uppercase tracking-[0.2em]">Difference</span>
              <div className="text-right">
                <span className={`text-sm font-black ${priceDiff <= 0 ? 'text-success' : 'text-md-on-surface'}`}>
                  {priceDiff > 0 ? '+' : ''}${Math.abs(priceDiff).toFixed(2)}
                </span>
                <span className="text-[9px] font-black text-md-on-surface-variant uppercase tracking-widest ml-1.5 opacity-60">
                  ({Math.abs(percentFromTarget).toFixed(1)}% {priceDiff > 0 ? 'above' : 'below'})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Price History */}
        <div className="mx-4 mb-4 bg-md-surface-container rounded-md-xl p-6 elevation-1 border border-md-outline-variant">
          <h3 className="text-[10px] font-black text-md-primary uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <TrendingDown className="w-4 h-4" />
            Price History
          </h3>
          
          <div className="mb-8 h-40 flex items-end gap-2 px-1">
            {deal.priceHistory.map((item, index) => {
              const range = highestPrice - lowestPrice;
              const heightPercent = range === 0 ? 50 : ((item.price - lowestPrice) / range) * 70 + 30;
              const isTarget = item.price <= deal.targetPrice;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2.5 group relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-md-on-surface text-md-surface text-[9px] font-black px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all z-10 elevation-2 pointer-events-none">
                    ${item.price}
                  </div>
                  <div 
                    className={`w-full rounded-t-md transition-all duration-300 elevation-1 ${isTarget ? 'bg-success hover:bg-success/80' : 'bg-md-primary/40 hover:bg-md-primary/60'}`}
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-[8px] font-black text-md-on-surface-variant uppercase tracking-tighter opacity-60">
                    {item.date}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-md-surface-container-high rounded-md-m p-4 border border-md-outline-variant/50">
              <span className="text-[9px] text-md-on-surface-variant font-black uppercase tracking-widest block mb-1">Lowest</span>
              <span className="text-base font-black text-success tracking-tight">${lowestPrice.toFixed(2)}</span>
            </div>
            <div className="bg-md-surface-container-high rounded-md-m p-4 border border-md-outline-variant/50">
              <span className="text-[9px] text-md-on-surface-variant font-black uppercase tracking-widest block mb-1">Highest</span>
              <span className="text-base font-black text-md-on-surface tracking-tight">${highestPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="mx-4 mb-4 bg-md-surface-container rounded-md-xl p-6 elevation-1 border border-md-outline-variant">
          <h3 className="text-[10px] font-black text-md-primary uppercase tracking-[0.2em] mb-5">Alert Configuration</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-md-on-surface-variant opacity-70 uppercase tracking-widest">Created On</span>
              <span className="text-xs font-black text-md-on-surface uppercase">{deal.createdAt}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-md-on-surface-variant opacity-70 uppercase tracking-widest">Auto-Purchase</span>
              <span className="text-[10px] font-black text-md-error border border-md-error/30 px-2 py-0.5 rounded-md-xs uppercase tracking-widest">Disabled</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-md-on-surface-variant opacity-70 uppercase tracking-widest">Notifications</span>
              <div className="flex items-center gap-2 bg-success/10 px-2 py-0.5 rounded-md-xs border border-success/20">
                <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                <span className="text-[10px] font-black text-success uppercase tracking-widest">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-md-surface-container border-t border-md-outline-variant p-5 pb-8 space-y-3 elevation-4 z-20">
        {isTriggered ? (
          <Button
            onClick={() => onBuyNow(deal)}
            className="w-full bg-success hover:bg-success/90 text-md-on-primary h-16 rounded-md-full font-black text-sm elevation-2 state-layer uppercase tracking-[0.15em]"
          >
            <Package className="w-6 h-6 mr-3" />
            Confirm Purchase - ${currentPrice.toFixed(2)}
          </Button>
        ) : (
          <div className="w-full h-16 bg-md-surface-container-highest border border-md-outline-variant rounded-md-full flex items-center justify-center">
            <span className="text-xs font-black text-md-on-surface-variant opacity-40 uppercase tracking-[0.2em]">Price Above Target</span>
          </div>
        )}
        <Button
          onClick={() => onDisableAlert(deal.id)}
          variant="ghost"
          className="w-full h-12 font-black text-xs text-md-error hover:bg-md-error-container/10 rounded-md-full uppercase tracking-widest state-layer"
        >
          {deal.isActive ? 'Disable This Alert' : 'Remove This Alert'}
        </Button>
      </div>
    </div>
  );
}
  );
}

