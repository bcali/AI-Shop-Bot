import { Award } from 'lucide-react';
import { Product } from './ProductCard';
import { Button } from './ui/button';

interface PriceComparisonProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const platformColors = {
  shopee: 'bg-shopee',
  lazada: 'bg-lazada',
  amazon: 'bg-amazon',
};

const platformNames = {
  shopee: 'Shopee',
  lazada: 'Lazada',
  amazon: 'Amazon',
};

export function PriceComparison({ products, onSelectProduct }: PriceComparisonProps) {
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);
  const cheapest = sortedProducts[0];

  return (
    <div className="bg-md-surface-container rounded-md-xl border border-md-outline-variant p-5 elevation-2">
      <h3 className="mb-4 flex items-center gap-2 text-[10px] font-black text-md-primary uppercase tracking-[0.2em] px-1">
        <Award className="w-5 h-5" />
        Price Comparison
      </h3>
      
      <div className="space-y-3">
        {sortedProducts.map((product) => {
          const isCheapest = product.id === cheapest.id;
          const priceDiff = product.price - cheapest.price;
          
          return (
            <div 
              key={product.id}
              className={`p-4 rounded-md-l border transition-all elevation-1 ${
                isCheapest 
                  ? 'border-success/30 bg-success/5' 
                  : 'border-md-outline-variant bg-md-surface-container-low'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`${platformColors[product.platform]} text-white px-2 py-0.5 rounded-md-xs text-[10px] font-bold`}>
                    {platformNames[product.platform]}
                  </div>
                  {isCheapest && (
                    <span className="bg-success text-white px-2 py-0.5 rounded-md-xs text-[10px] font-black uppercase tracking-wider elevation-1">
                      Best Price
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-md-error font-black text-base">${product.price.toFixed(2)}</div>
                  {!isCheapest && priceDiff > 0 && (
                    <div className="text-[10px] font-bold text-md-on-surface-variant opacity-60">
                      +${priceDiff.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-bold text-md-on-surface-variant uppercase tracking-widest flex items-center gap-1.5">
                  <span className="text-yellow-500">★</span> {product.rating} 
                  <span className="opacity-30">•</span> 
                  <span className={product.shipping === 'Free Shipping' ? 'text-success' : ''}>{product.shipping}</span>
                </div>
                <Button 
                  onClick={() => onSelectProduct(product)}
                  size="sm"
                  className={`h-8 px-4 rounded-md-full font-black text-[10px] uppercase tracking-widest state-layer elevation-1 ${
                    isCheapest ? 'bg-md-primary text-md-on-primary' : 'bg-transparent text-md-primary border-md-outline hover:bg-md-primary-container/20'
                  }`}
                  variant={isCheapest ? "default" : "outline"}
                >
                  Select
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
  );
}

