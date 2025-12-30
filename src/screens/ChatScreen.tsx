"use client";

import { useState, useRef, useEffect } from 'react';
import { User } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import { ProductCard, Product } from '../components/ProductCard';
import { PriceComparison } from '../components/PriceComparison';
import { PurchaseConfirmation } from '../components/PurchaseConfirmation';
import { QuickActions } from '../components/QuickActions';
import { TypingIndicator } from '../components/TypingIndicator';
import { Button } from '../components/ui/button';

interface ChatScreenProps {
  onPurchase?: (product: Product) => void;
  onMonitor?: (product: Product) => void;
  onOpenProfile: () => void;
}

export function ChatScreen({ onPurchase, onMonitor, onOpenProfile }: ChatScreenProps) {
  const { messages, append, isLoading, setInput } = useChat({
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: "👋 Hi! I'm your AI Shopping Concierge. I can help you search products, compare prices across Shopee, Lazada, and Amazon, set price alerts, and confirm purchases. What are you looking for today?",
      },
    ],
  });

  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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

  const handleBuyProduct = (product: Product) => {
    // Add a system-like message to trigger the confirmation UI
    append({
      role: 'assistant',
      content: `Great choice! Please review your purchase details:`,
      // We'll use tool results or custom annotations if needed, but for now 
      // let's just use the existing local handler for simplicity or custom UI
    });
    // For now, let's keep the local state for specific UI flow if needed
    // but the AI can also trigger this via tools
  };

  const handleMonitorProduct = (product: Product) => {
    onMonitor?.(product);
    
    const platformNames = {
      shopee: 'Shopee',
      lazada: 'Lazada',
      amazon: 'Amazon',
    };

    append({
      role: 'assistant',
      content: `✅ Price alert set for "${product.name}" on ${platformNames[product.platform]}!\n\nCurrent price: $${product.price.toFixed(2)}\n\nI'll notify you when the price drops.`,
    });
  };

  const handleConfirmPurchase = (product: Product) => {
    onPurchase?.(product);
    
    append({
      role: 'assistant',
      content: `🎉 Purchase confirmed!\n\nYour order for "${product.name}" has been placed. You will receive a confirmation email shortly.`,
    });
  };

  const handleCancelPurchase = () => {
    append({
      role: 'assistant',
      content: "No problem! The purchase has been cancelled.",
    });
  };

  const handleSelectProduct = (product: Product) => {
    append({
      role: 'assistant',
      content: `Would you like to proceed with this purchase?`,
    });
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 flex items-center justify-between shadow-lg safe-area-inset-top shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">Chat</h2>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/20 rounded-full h-10 w-10"
          onClick={onOpenProfile}
        >
          <User className="w-6 h-6" />
        </Button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50/50">
        {messages.map((m) => (
          <div key={m.id}>
            <ChatMessage
              message={m.content}
              isUser={m.role === 'user'}
              timestamp={formatTime()} // Ideally we'd have a timestamp in the message object
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
                          onBuy={() => handleBuyProduct(product)}
                          onMonitor={() => handleMonitorProduct(product)}
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
    </div>
  );
}
