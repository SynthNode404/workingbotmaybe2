
import React from 'react';
import { Message, MessageAuthor } from '../types';
import { BotIcon } from './icons/BotIcon';
import { UserIcon } from './icons/UserIcon';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.author === MessageAuthor.USER;

  return (
    <div
      className={`flex items-start gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shadow-md">
        {isUser ? <UserIcon /> : <BotIcon />}
      </div>
      <div
        className={`max-w-xl p-4 rounded-2xl shadow ${
          isUser
            ? 'bg-brand-primary text-white rounded-br-none'
            : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-none'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
