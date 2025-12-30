"use client";

import { useState, useRef, useEffect } from 'react';
import { User } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import { ProductCard, Product } from '../components/ProductCard';
import { PriceComparison } from '../components/PriceComparison';
import { PurchaseConfirmation } from '../components/PurchaseConfirmation';
import { PurchaseSuccess } from '../components/PurchaseSuccess';
import { PriceTargetModal } from '../components/PriceTargetModal';
import { QuickActions } from '../components/QuickActions';
import { TypingIndicator } from '../components/TypingIndicator';
import { Button } from '../components/ui/button';

interface ChatScreenProps {
  onPurchase?: (product: Product, total: number) => void;
  onMonitor?: (product: Product, targetPrice: number) => void;
  onOpenProfile: () => void;
}

export function ChatScreen({ onPurchase, onMonitor, onOpenProfile }: ChatScreenProps) {
  const { messages, append, isLoading } = useChat({
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: "👋 Hi! I'm your AI Shopping Concierge. I can help you search products, compare prices across Shopee, Lazada, and Amazon, set price alerts, and confirm purchases. What are you looking for today?",
      },
    ],
  });

  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showPriceTargetModal, setShowPriceTargetModal] = useState(false);
  const [selectedProductForMonitor, setSelectedProductForMonitor] = useState<Product | null>(null);
  const [confirmationProduct, setConfirmationProduct] = useState<Product | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState<{product: Product, orderNumber: string, total: number} | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, confirmationProduct, purchaseSuccess]);

  const formatTime = () => {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = (text: string) => {
    setShowQuickActions(false);
    append({
      role: 'user',
      content: text,
    });
  };

  const handleReviewPurchase = (product: Product) => {
    setConfirmationProduct(product);
    setPurchaseSuccess(null);
  };

  const handleMonitorClick = (product: Product) => {
    setSelectedProductForMonitor(product);
    setShowPriceTargetModal(true);
  };

  const handleConfirmPriceTarget = (targetPrice: number) => {
    if (selectedProductForMonitor) {
      onMonitor?.(selectedProductForMonitor, targetPrice);
      setShowPriceTargetModal(false);
      
      const platformNames = {
        shopee: 'Shopee',
        lazada: 'Lazada',
        amazon: 'Amazon',
      };

      append({
        role: 'assistant',
        content: `✅ Price alert created!\n\nProduct: ${selectedProductForMonitor.name}\nPlatform: ${platformNames[selectedProductForMonitor.platform]}\nCurrent Price: $${selectedProductForMonitor.price.toFixed(2)}\nTarget Price: $${targetPrice.toFixed(2)}\n\nI'll notify you when the price drops to or below $${targetPrice.toFixed(2)}. You can view all your alerts in the Deals tab.`,
      });
      setSelectedProductForMonitor(null);
    }
  };

  const handleConfirmPurchase = () => {
    if (confirmationProduct) {
      const total = confirmationProduct.price + (confirmationProduct.shipping === 'Free Shipping' ? 0 : 3.99);
      const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;
      
      onPurchase?.(confirmationProduct, total);
      setPurchaseSuccess({ product: confirmationProduct, orderNumber, total });
      setConfirmationProduct(null);
    }
  };

  const handleCancelPurchase = () => {
    setConfirmationProduct(null);
    append({
      role: 'assistant',
      content: "No problem! The purchase has been cancelled. Let me know if you'd like to look at other options.",
    });
  };

  const handleContinueShopping = () => {
    setPurchaseSuccess(null);
    append({
      role: 'assistant',
      content: "Great! What else can I help you find today? 🛍️",
    });
  };

  return (
    <div className="flex flex-col h-full bg-md-background">
      {/* Header */}
      <header className="bg-md-primary text-md-on-primary px-4 py-3 flex items-center justify-between elevation-2 safe-area-inset-top shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium tracking-wide">Chat</h2>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-md-on-primary hover:bg-md-on-primary/12 rounded-full h-10 w-10 state-layer"
          onClick={onOpenProfile}
        >
          <User className="w-5 h-5" />
        </Button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id}>
            <ChatMessage
              message={m.content}
              isUser={m.role === 'user'}
              timestamp={formatTime()}
            />
            
            {/* Handle Tool Results */}
            {m.toolInvocations?.map((toolInvocation) => {
              const { toolName, toolCallId, state } = toolInvocation;

              if (state === 'result') {
                if (toolName === 'searchProducts') {
                  const { products } = toolInvocation.result;
                  return (
                    <div key={toolCallId} className="grid grid-cols-1 gap-3 mb-4 ml-11">
                      {products.map((product: Product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onBuy={() => handleReviewPurchase(product)}
                          onMonitor={() => handleMonitorClick(product)}
                        />
                      ))}
                    </div>
                  );
                }
              }
              return null;
            })}
          </div>
        ))}

        {confirmationProduct && (
          <div className="ml-11 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <PurchaseConfirmation
              product={confirmationProduct}
              onConfirm={handleConfirmPurchase}
              onCancel={handleCancelPurchase}
            />
          </div>
        )}

        {purchaseSuccess && (
          <div className="ml-11 mb-4">
            <PurchaseSuccess
              product={purchaseSuccess.product}
              orderNumber={purchaseSuccess.orderNumber}
              total={purchaseSuccess.total}
              onContinueShopping={handleContinueShopping}
            />
          </div>
        )}

        {isLoading && <TypingIndicator />}
        
        {showQuickActions && !isLoading && messages.length === 1 && (
          <QuickActions onActionClick={handleSendMessage} />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="shrink-0">
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>

      {/* Price Target Modal */}
      {showPriceTargetModal && selectedProductForMonitor && (
        <PriceTargetModal
          product={selectedProductForMonitor}
          onConfirm={handleConfirmPriceTarget}
          onCancel={() => setShowPriceTargetModal(false)}
        />
      )}
    </div>
  );
}
