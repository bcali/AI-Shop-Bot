import { Bell, X, Target, Info } from 'lucide-react';
import { useState } from 'react';
import { Product } from './ProductCard';
import { Button } from './ui/button';

interface PriceTargetModalProps {
  product: Product;
  onConfirm: (targetPrice: number) => void;
  onCancel: () => void;
}

export function PriceTargetModal({ product, onConfirm, onCancel }: PriceTargetModalProps) {
  const [targetPrice, setTargetPrice] = useState(Math.floor(product.price * 0.9));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-md-surface-container rounded-md-xl elevation-5 overflow-hidden border border-md-outline-variant animate-in zoom-in-95 duration-200">
        <div className="bg-md-primary text-md-on-primary p-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-bold tracking-wide">
            <Bell className="w-5 h-5" />
            SET PRICE ALERT
          </h3>
          <button onClick={onCancel} className="state-layer p-1 rounded-full text-md-on-primary/70 hover:text-md-on-primary">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex gap-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-16 h-16 object-cover rounded-md-s elevation-1 border border-md-outline-variant"
            />
            <div className="flex-1 min-w-0">
              <p className="line-clamp-2 text-sm font-bold text-md-on-surface leading-tight mb-1">{product.name}</p>
              <p className="text-sm font-black text-md-error">Current: ${product.price.toFixed(2)}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-md-surface-container-high rounded-md-m p-4 border border-md-outline-variant/50">
              <label className="block text-[10px] font-bold text-md-on-surface-variant uppercase tracking-widest mb-2">
                Your Target Price ($)
              </label>
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-md-primary" />
                <input
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(Number(e.target.value))}
                  className="w-full bg-transparent text-3xl font-black text-md-on-surface outline-none"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex gap-2">
              {[0.9, 0.8, 0.7].map((factor) => {
                const price = Math.floor(product.price * factor);
                return (
                  <button
                    key={factor}
                    onClick={() => setTargetPrice(price)}
                    className={`flex-1 py-2 rounded-md-full border text-[10px] font-black uppercase transition-all ${
                      targetPrice === price 
                        ? 'bg-md-primary text-md-on-primary border-md-primary elevation-1' 
                        : 'bg-transparent text-md-on-surface-variant border-md-outline hover:bg-md-surface-variant/20'
                    }`}
                  >
                    -{Math.round((1 - factor) * 100)}% (${price})
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-md-primary-container/30 rounded-md-m p-3 flex gap-3 border border-md-primary-container/50">
            <Info className="w-5 h-5 text-md-primary shrink-0 mt-0.5" />
            <p className="text-[10px] text-md-on-primary-container font-medium leading-relaxed">
              We'll monitor this product across Shopee, Lazada, and Amazon. You'll receive a push notification the moment the price hits your target.
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button 
              onClick={() => onConfirm(targetPrice)}
              className="w-full bg-md-primary hover:bg-md-primary/90 text-md-on-primary h-12 rounded-md-full elevation-1 font-bold text-sm state-layer"
            >
              Set Alert Now
            </Button>
            <Button 
              onClick={onCancel}
              variant="ghost"
              className="w-full text-md-on-surface-variant hover:bg-md-surface-variant/20 h-10 rounded-md-full font-bold text-xs state-layer"
            >
              Not Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

