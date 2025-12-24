import { Award } from 'lucide-react';
import { Product } from './ProductCard';
import { Button } from './ui/button';

interface PriceComparisonProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
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

export function PriceComparison({ products, onSelectProduct }: PriceComparisonProps) {
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);
  const cheapest = sortedProducts[0];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
        <Award className="w-4 h-4 text-purple-500" />
        Price Comparison
      </h3>
      
      <div className="space-y-2">
        {sortedProducts.map((product) => {
          const isCheapest = product.id === cheapest.id;
          const priceDiff = product.price - cheapest.price;
          
          return (
            <div 
              key={product.id}
              className={`p-3 rounded-lg border ${
                isCheapest 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`${platformColors[product.platform]} text-white px-2 py-0.5 rounded text-[10px]`}>
                    {platformNames[product.platform]}
                  </div>
                  {isCheapest && (
                    <span className="bg-green-600 text-white px-2 py-0.5 rounded text-[10px]">
                      Best Price
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-red-600 font-bold text-sm">${product.price.toFixed(2)}</div>
                  {!isCheapest && priceDiff > 0 && (
                    <div className="text-[10px] text-gray-500">
                      +${priceDiff.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div className="text-gray-600">
                  ★ {product.rating} • {product.shipping}
                </div>
                <Button 
                  onClick={() => onSelectProduct(product)}
                  size="sm"
                  variant={isCheapest ? "default" : "outline"}
                  className={`h-7 text-[10px] ${isCheapest ? 'bg-green-600 hover:bg-green-700' : ''}`}
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

