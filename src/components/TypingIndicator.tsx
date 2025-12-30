import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center elevation-1 bg-md-primary text-md-on-primary">
        <Bot className="w-5 h-5" />
      </div>
      <div className="bg-md-surface-container rounded-md-l rounded-tl-md-xs px-5 py-3 elevation-1">
        <div className="flex gap-1.5 items-center h-5">
          <div className="w-1.5 h-1.5 bg-md-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1.5 h-1.5 bg-md-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1.5 h-1.5 bg-md-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}

