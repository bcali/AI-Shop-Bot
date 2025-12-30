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
  shopee: 'bg-shopee',
  lazada: 'bg-lazada',
  amazon: 'bg-amazon',
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
    <div className="bg-md-surface-container-low rounded-md-m overflow-hidden elevation-1 hover:elevation-2 transition-shadow">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className={`absolute top-2 left-2 ${platformColors[product.platform]} text-white px-2 py-0.5 rounded-md-xs text-[10px] font-bold`}>
          {platformNames[product.platform]}
        </div>
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-md-error text-md-on-error px-2 py-0.5 rounded-md-xs text-[10px] font-bold">
            -{discount}%
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="line-clamp-2 mb-2 min-h-[2.5rem] text-sm font-medium text-md-on-surface">{product.name}</h3>
        
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-md-error font-bold text-2xl">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-md-on-surface-variant line-through text-xs">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          {product.priceChange && (
            <div className={`flex items-center gap-1 text-[10px] font-bold ${
              product.priceChange === 'down' ? 'text-success' : 'text-md-error'
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
          <span className="text-xs text-md-on-surface-variant font-medium">{product.rating}</span>
          <span className="text-md-on-surface-variant opacity-70 text-xs">({product.reviews} reviews)</span>
        </div>

        <p className={`text-[10px] font-bold mb-3 ${product.shipping === 'Free Shipping' ? 'text-success' : 'text-md-on-surface-variant'}`}>
          {product.shipping}
        </p>

        <div className="flex gap-2">
          <Button 
            onClick={onBuy}
            className="flex-1 bg-md-primary text-md-on-primary hover:bg-md-primary/90 text-xs h-9 rounded-md-full state-layer shadow-none"
            size="sm"
            disabled={!product.inStock}
          >
            <ShoppingBag className="w-3 h-3 mr-1.5" />
            {product.inStock ? 'Review & Purchase' : 'Out of Stock'}
          </Button>
          <Button 
            onClick={onMonitor}
            variant="outline"
            size="sm"
            className="px-4 h-9 text-xs border-md-outline text-md-primary rounded-md-full state-layer bg-transparent hover:bg-md-primary-container/20"
          >
            Monitor
          </Button>
        </div>
      </div>
    </div>
  );
}
  );
}

