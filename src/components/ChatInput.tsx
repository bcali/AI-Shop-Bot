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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-3 pb-8">
      <div className="flex gap-2 items-end">
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center h-10">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            disabled={disabled}
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-500"
          />
          <button 
            type="button"
            onClick={() => {/* Voice input placeholder */}}
            className="text-gray-400 hover:text-gray-600 ml-2"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>
        <Button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          size="icon"
          className="rounded-full w-10 h-10 bg-purple-500 hover:bg-purple-600 text-white shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

