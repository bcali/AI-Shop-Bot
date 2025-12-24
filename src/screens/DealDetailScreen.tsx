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
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 flex items-center gap-3 shadow-lg safe-area-inset-top shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 -ml-2 rounded-full"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-bold flex-1">Alert Details</h2>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Product Info */}
        <div className="bg-white p-4 mb-3 border-b border-gray-200">
          <img
            src={deal.product.image}
            alt={deal.product.name}
            className="w-full h-56 object-cover rounded-2xl mb-4 shadow-sm"
          />
          <div className="flex items-center gap-2 mb-2">
            <div className={`${platformColors[deal.product.platform]} text-white px-2 py-0.5 rounded text-[10px] inline-block font-bold`}>
              {platformNames[deal.product.platform]}
            </div>
            {deal.product.inStock && (
              <span className="text-green-600 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                In Stock
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2">{deal.product.name}</h3>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-3 h-3 ${i < Math.floor(deal.product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`} viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-medium text-gray-700">{deal.product.rating}</span>
            <span>({deal.product.reviews} reviews)</span>
          </div>
        </div>

        {/* Price Status */}
        <div className={`mx-4 mb-4 rounded-2xl p-5 shadow-sm border ${isTriggered ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isTriggered ? 'bg-green-100' : 'bg-blue-100'}`}>
              {isTriggered ? (
                <TrendingDown className="w-6 h-6 text-green-600" />
              ) : (
                <Bell className="w-6 h-6 text-blue-600" />
              )}
            </div>
            <div>
              <span className={`font-bold block ${isTriggered ? 'text-green-800' : 'text-blue-800'}`}>
                {isTriggered ? 'Price Target Reached!' : 'Monitoring Price'}
              </span>
              <span className={`text-xs ${isTriggered ? 'text-green-600' : 'text-blue-600'}`}>
                {isTriggered ? 'Ready for purchase' : 'Waiting for price drop'}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Current Price</span>
              <span className="text-xl font-bold text-red-600">${currentPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Your Target</span>
              <span className={`text-lg font-bold ${isTriggered ? 'text-green-600' : 'text-gray-900'}`}>
                ${deal.targetPrice.toFixed(2)}
              </span>
            </div>
            <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
              <span className="text-gray-600 text-sm font-medium">Difference</span>
              <div className="text-right">
                <span className={`font-bold ${priceDiff <= 0 ? 'text-green-600' : 'text-gray-900'}`}>
                  {priceDiff > 0 ? '+' : ''}{priceDiff.toFixed(2)}
                </span>
                <span className="text-[10px] text-gray-500 ml-1 block">
                  ({percentFromTarget.toFixed(1)}% above target)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Price History */}
        <div className="mx-4 mb-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-purple-500" />
            Price History
          </h3>
          
          <div className="mb-6 h-36 flex items-end gap-2 px-2">
            {deal.priceHistory.map((item, index) => {
              const range = highestPrice - lowestPrice;
              const heightPercent = range === 0 ? 50 : ((item.price - lowestPrice) / range) * 80 + 20;
              const isTarget = item.price <= deal.targetPrice;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[8px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    ${item.price}
                  </div>
                  <div 
                    className={`w-full rounded-t-md transition-all duration-300 ${isTarget ? 'bg-green-400 hover:bg-green-500' : 'bg-purple-400 hover:bg-purple-500'}`}
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">
                    {item.date}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Lowest</span>
              <span className="text-sm font-bold text-green-600">${lowestPrice.toFixed(2)}</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Highest</span>
              <span className="text-sm font-bold text-gray-900">${highestPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="mx-4 mb-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Alert Settings</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 font-medium">Created On</span>
              <span className="text-xs font-bold text-gray-900">{deal.createdAt}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 font-medium">Auto-Buy</span>
              <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Disabled</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 font-medium">Notifications</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 p-4 space-y-3 safe-area-inset-bottom shadow-2xl z-20">
        {isTriggered ? (
          <Button
            onClick={() => onBuyNow(deal)}
            className="w-full bg-green-600 hover:bg-green-700 text-white h-14 rounded-2xl font-bold text-base shadow-lg shadow-green-100 flex items-center justify-center gap-2"
          >
            <Package className="w-5 h-5" />
            Buy Now at ${currentPrice.toFixed(2)}
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full h-14 rounded-2xl font-bold text-base text-gray-400 border-gray-200 cursor-not-allowed"
            disabled
          >
            Price Above Target
          </Button>
        )}
        <Button
          onClick={() => onDisableAlert(deal.id)}
          variant="ghost"
          className="w-full h-10 font-bold text-sm text-red-500 hover:bg-red-50 rounded-xl"
        >
          {deal.isActive ? 'Disable This Alert' : 'Remove This Alert'}
        </Button>
      </div>
    </div>
  );
}

