
import React, { useState } from 'react';
import { SendIcon } from './icons/SendIcon';
import { Spinner } from './icons/Spinner';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message here..."
        disabled={isLoading}
        className="flex-1 p-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none dark:bg-slate-700 dark:text-slate-100 disabled:opacity-50 transition-shadow"
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="p-3 rounded-full bg-brand-primary text-white hover:bg-sky-600 disabled:bg-slate-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary dark:focus:ring-offset-slate-800 transition-colors"
        aria-label="Send message"
      >
        {isLoading ? <Spinner /> : <SendIcon />}
      </button>
    </form>
  );
};

export default MessageInput;
