import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center elevation-1 ${
        isUser ? 'bg-md-secondary-container text-md-on-secondary-container' : 'bg-md-primary text-md-on-primary'
      }`}>
        {isUser ? (
          <User className="w-5 h-5" />
        ) : (
          <Bot className="w-5 h-5" />
        )}
      </div>
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[80%]`}>
        <div className={`rounded-md-l px-4 py-3 elevation-1 ${
          isUser 
            ? 'bg-md-primary-container text-md-on-primary-container rounded-tr-md-xs' 
            : 'bg-md-surface-container text-md-on-surface rounded-tl-md-xs'
        }`}>
          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{message}</p>
        </div>
        <span className="text-[10px] font-medium text-md-on-surface-variant mt-1.5 px-1 uppercase tracking-wider">{timestamp}</span>
      </div>
    </div>
  );
}

