import { Check, Package, CreditCard, MapPin, X } from 'lucide-react';
import { Product } from './ProductCard';
import { Button } from './ui/button';

interface PurchaseConfirmationProps {
  product: Product;
  onConfirm: () => void;
  onCancel: () => void;
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

export function PurchaseConfirmation({ product, onConfirm, onCancel }: PurchaseConfirmationProps) {
  const total = product.price + (product.shipping === 'Free Shipping' ? 0 : 3.99);

  return (
    <div className="bg-md-surface-container rounded-md-xl elevation-3 overflow-hidden border border-md-outline-variant">
      <div className="bg-md-tertiary text-md-on-tertiary p-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-bold tracking-wide">
          <Package className="w-5 h-5" />
          REVIEW YOUR PURCHASE
        </h3>
        <div className="bg-md-tertiary-container/20 p-1 rounded-full">
          <CreditCard className="w-4 h-4" />
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Product Info */}
        <div className="flex gap-4 p-3 bg-md-surface-container-low rounded-md-m border border-md-outline-variant">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-20 h-20 object-cover rounded-md-s elevation-1"
          />
          <div className="flex-1 min-w-0">
            <div className={`${platformColors[product.platform]} text-white px-2 py-0.5 rounded-md-xs text-[10px] font-bold inline-block mb-1.5`}>
              {platformNames[product.platform]}
            </div>
            <p className="line-clamp-2 text-sm font-bold text-md-on-surface leading-snug">{product.name}</p>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-md-surface-container-high rounded-md-m p-4 space-y-3">
          <div className="flex justify-between text-xs font-medium text-md-on-surface-variant">
            <span>Item Subtotal</span>
            <span>${product.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs font-medium text-md-on-surface-variant">
            <span>Shipping Fee</span>
            <span className={product.shipping === 'Free Shipping' ? 'text-success font-bold' : ''}>
              {product.shipping === 'Free Shipping' ? 'FREE' : '$3.99'}
            </span>
          </div>
          <div className="border-t border-md-outline-variant pt-3 flex justify-between font-black text-lg text-md-on-surface">
            <span>Total Amount</span>
            <span className="text-md-error">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Delivery & Payment */}
        <div className="grid grid-cols-1 gap-3 px-1">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 bg-md-surface-container-highest p-1.5 rounded-full">
              <MapPin className="w-3.5 h-3.5 text-md-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-md-on-surface-variant uppercase tracking-widest">Ship to</p>
              <p className="text-xs font-bold text-md-on-surface">123 Shopping Lane, PWA City</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 bg-md-surface-container-highest p-1.5 rounded-full">
              <CreditCard className="w-3.5 h-3.5 text-md-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-md-on-surface-variant uppercase tracking-widest">Payment Method</p>
              <p className="text-xs font-bold text-md-on-surface">Visa •••• 4242</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          <Button 
            onClick={onConfirm}
            className="w-full bg-md-success hover:bg-md-success/90 text-md-on-success h-12 rounded-md-full elevation-1 font-bold text-sm state-layer"
          >
            <Check className="w-5 h-5 mr-2" />
            Confirm Purchase - ${total.toFixed(2)}
          </Button>
          <Button 
            onClick={onCancel}
            variant="ghost"
            className="w-full text-md-on-surface-variant hover:bg-md-surface-variant/20 h-10 rounded-md-full font-bold text-xs state-layer"
          >
            Cancel and Go Back
          </Button>
        </div>
        
        <p className="text-[10px] text-center text-md-on-surface-variant px-4 leading-relaxed opacity-70 italic">
          Safety Notice: This purchase is protected by our secure checkout protocol. No automatic recurring charges.
        </p>
      </div>
    </div>
  );
}

