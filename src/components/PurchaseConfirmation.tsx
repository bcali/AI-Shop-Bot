import { Check, Package, CreditCard, MapPin, X } from 'lucide-react';
import { Product } from './ProductCard';
import { Button } from './ui/button';

interface PurchaseConfirmationProps {
  product: Product;
  onConfirm: () => void;
  onCancel: () => void;
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

export function PurchaseConfirmation({ product, onConfirm, onCancel }: PurchaseConfirmationProps) {
  const total = product.price + (product.shipping === 'Free Shipping' ? 0 : 3.99);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4">
        <h3 className="flex items-center gap-2 text-sm font-bold">
          <Package className="w-4 h-4" />
          Confirm Purchase
        </h3>
      </div>

      <div className="p-4 space-y-4">
        {/* Product Info */}
        <div className="flex gap-3">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="flex-1">
            <div className={`${platformColors[product.platform]} text-white px-2 py-0.5 rounded text-[10px] inline-block mb-1`}>
              {platformNames[product.platform]}
            </div>
            <p className="line-clamp-2 text-xs font-medium">{product.name}</p>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Item Price</span>
            <span>${product.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Shipping</span>
            <span className={product.shipping === 'Free Shipping' ? 'text-green-600' : ''}>
              {product.shipping === 'Free Shipping' ? 'FREE' : '$3.99'}
            </span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-sm">
            <span>Total</span>
            <span className="text-red-600">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px]">
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="text-gray-600">Delivery to:</span>
            <span>Home Address</span>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <CreditCard className="w-3 h-3 text-gray-400" />
            <span className="text-gray-600">Payment:</span>
            <span>Card ending in 4242</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            onClick={onCancel}
            variant="outline"
            className="flex-1 h-8 text-xs"
          >
            <X className="w-3 h-3 mr-1" />
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white h-8 text-xs"
          >
            <Check className="w-3 h-3 mr-1" />
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

