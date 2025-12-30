import { CheckCircle2, ChevronRight, Package, ShoppingBag } from 'lucide-react';
import { Product } from './ProductCard';
import { Button } from './ui/button';

interface PurchaseSuccessProps {
  product: Product;
  orderNumber: string;
  total: number;
  onContinueShopping: () => void;
}

export function PurchaseSuccess({ product, orderNumber, total, onContinueShopping }: PurchaseSuccessProps) {
  return (
    <div className="bg-md-surface-container rounded-md-xl elevation-3 overflow-hidden border border-md-outline-variant animate-in fade-in zoom-in duration-300">
      <div className="bg-success text-md-on-primary p-6 flex flex-col items-center justify-center text-center gap-2">
        <div className="bg-white/20 p-3 rounded-full mb-2">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-xl font-black tracking-tight">PURCHASE CONFIRMED!</h3>
        <p className="text-sm font-medium opacity-90">Order #{orderNumber}</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-32 h-32 object-cover rounded-md-xl elevation-2 border-4 border-white"
            />
            <div className="absolute -bottom-2 -right-2 bg-success text-white p-1.5 rounded-full elevation-1">
              <Package className="w-4 h-4" />
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-black text-md-on-surface line-clamp-2 px-4">{product.name}</p>
            <p className="text-2xl font-black text-success">${total.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-md-surface-container-high rounded-md-m p-4 space-y-3 border border-md-outline-variant/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-md-on-surface-variant font-bold uppercase tracking-widest">Status</span>
            <span className="bg-success/10 text-success px-2 py-0.5 rounded-md-xs font-black">PREPARING</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-md-on-surface-variant font-bold uppercase tracking-widest">Delivery</span>
            <span className="text-md-on-surface font-bold">Est. 2-3 Business Days</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={onContinueShopping}
            className="w-full bg-md-primary hover:bg-md-primary/90 text-md-on-primary h-12 rounded-md-full elevation-1 font-bold text-sm state-layer"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Continue Shopping
          </Button>
          <button className="w-full flex items-center justify-center gap-1 text-xs font-black text-md-primary uppercase tracking-widest state-layer py-2 rounded-full">
            View Order Details
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

