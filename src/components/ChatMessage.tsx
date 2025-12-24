import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-500' : 'bg-purple-500'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[75%]`}>
        <div className={`rounded-2xl px-4 py-2.5 ${
          isUser 
            ? 'bg-blue-500 text-white rounded-tr-sm' 
            : 'bg-gray-100 text-gray-900 rounded-tl-sm'
        }`}>
          <p className="whitespace-pre-wrap break-words text-sm">{message}</p>
        </div>
        <span className="text-[10px] text-gray-500 mt-1 px-1">{timestamp}</span>
      </div>
    </div>
  );
}

