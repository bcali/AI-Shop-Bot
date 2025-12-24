import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-purple-500">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}

