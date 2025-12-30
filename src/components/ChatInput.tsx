"use client";

import { Send, Mic } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-md-surface-container-high p-4 pb-10 safe-area-inset-bottom border-t border-md-outline-variant elevation-3">
      <div className="flex gap-3 items-center">
        <div className="flex-1 bg-md-surface-container-highest rounded-md-full px-5 py-2.5 flex items-center h-12 elevation-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search products or ask a question..."
            disabled={disabled}
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-md-on-surface-variant font-medium"
          />
          <button 
            type="button"
            onClick={() => {/* Voice input placeholder */}}
            className="text-md-on-surface-variant hover:text-md-primary ml-2 state-layer p-2 rounded-full"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>
        <Button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          size="icon"
          className="rounded-md-full w-12 h-12 bg-md-primary hover:bg-md-primary/90 text-md-on-primary shrink-0 elevation-1 state-layer"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

