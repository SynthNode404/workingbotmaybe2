
import React, { useState, useCallback } from 'react';
import { Message, MessageAuthor } from './types';
import { CHATBOT_NAME } from './constants';
import { sendMessageToAI } from './services/geminiService';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-message',
      author: MessageAuthor.BOT,
      text: "Hello! I'm your AI assistant. How can I help you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      author: MessageAuthor.USER,
      text,
    };

    const botMessageId = crypto.randomUUID();
    const botMessagePlaceholder: Message = {
      id: botMessageId,
      author: MessageAuthor.BOT,
      text: '...',
    };

    setMessages(prev => [...prev, userMessage, botMessagePlaceholder]);
    setIsLoading(true);

    try {
      const stream = await sendMessageToAI(text);
      let fullResponse = '';

      for await (const chunk of stream) {
        fullResponse += chunk.text;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === botMessageId ? { ...msg, text: fullResponse } : msg
          )
        );
      }
    } catch (error) {
      console.error('Error streaming response:', error);
      const errorMessage = 'Sorry, I encountered an error. Please try again.';
      setMessages(prev =>
        prev.map(msg =>
          msg.id === botMessageId ? { ...msg, text: errorMessage } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <Header title={CHATBOT_NAME} />
      <main className="flex-1 flex flex-col items-center py-4 md:py-8 overflow-hidden">
        <div className="w-full max-w-4xl h-full flex flex-col bg-white dark:bg-slate-800 shadow-xl rounded-lg">
          <ChatWindow messages={messages} />
          <div className="border-t border-slate-200 dark:border-slate-700 p-4">
            <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
