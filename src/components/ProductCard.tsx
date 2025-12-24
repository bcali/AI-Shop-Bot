import { ShoppingBag, Star, TrendingDown, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  platform: 'shopee' | 'lazada' | 'amazon';
  rating: number;
  reviews: number;
  image: string;
  shipping: string;
  inStock: boolean;
  priceChange?: 'up' | 'down';
  priceChangePercent?: number;
}

interface ProductCardProps {
  product: Product;
  onBuy?: () => void;
  onMonitor?: () => void;
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

export function ProductCard({ product, onBuy, onMonitor }: ProductCardProps) {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-40 object-cover"
        />
        <div className={`absolute top-2 left-2 ${platformColors[product.platform]} text-white px-2 py-1 rounded-md text-[10px]`}>
          {platformNames[product.platform]}
        </div>
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-[10px]">
            -{discount}%
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="line-clamp-2 mb-2 min-h-[2.5rem] text-sm font-medium">{product.name}</h3>
        
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-red-600 font-bold text-base">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-xs">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          {product.priceChange && (
            <div className={`flex items-center gap-1 text-[10px] ${
              product.priceChange === 'down' ? 'text-green-600' : 'text-red-600'
            }`}>
              {product.priceChange === 'down' ? (
                <TrendingDown className="w-3 h-3" />
              ) : (
                <TrendingUp className="w-3 h-3" />
              )}
              {product.priceChangePercent}%
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs">{product.rating}</span>
          <span className="text-gray-400 text-xs">({product.reviews})</span>
        </div>

        <p className="text-[10px] text-gray-600 mb-3">{product.shipping}</p>

        <div className="flex gap-2">
          <Button 
            onClick={onBuy}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs h-8"
            size="sm"
            disabled={!product.inStock}
          >
            <ShoppingBag className="w-3 h-3 mr-1" />
            {product.inStock ? 'Buy Now' : 'Out of Stock'}
          </Button>
          <Button 
            onClick={onMonitor}
            variant="outline"
            size="sm"
            className="px-2 h-8 text-xs"
          >
            Monitor
          </Button>
        </div>
      </div>
    </div>
  );
}

