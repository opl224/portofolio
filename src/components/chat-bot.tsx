
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { WobblyBox } from './ui/wobbly-box';
import { HandDrawnButton } from './ui/hand-drawn-button';
import { chatWithPortfolio } from '@/ai/flows/portfolio-chat-flow';
import { cn } from '@/lib/utils';
import portfolioData from '@/lib/chatbot-data.json';

type Message = {
  role: 'user' | 'model';
  text: string;
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Halo! Saya asisten tinta Anda. Ada yang bisa saya bantu jelaskan tentang karya-karya di sini?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const result = await chatWithPortfolio({ 
        message: userMsg,
        history: messages 
      });
      setMessages(prev => [...prev, { role: 'model', text: result.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Maaf, tinta saya sedikit macet. Bisa coba tanya lagi nanti?' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (q: string) => {
    setInput(q);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <WobblyBox 
          variant="default" 
          shadow="lg" 
          className="mb-4 w-[350px] md:w-[400px] h-[500px] flex flex-col p-4 bg-white overflow-hidden"
          rotate={-1}
        >
          <div className="flex justify-between items-center border-b-2 border-dashed border-foreground pb-2 mb-4">
            <h3 className="font-headline text-2xl flex items-center gap-2">
              <Sparkles size={20} className="text-accent" /> Chat Asisten
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-secondary rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar"
          >
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex flex-col max-w-[85%]",
                  msg.role === 'user' ? "ml-auto items-end" : "items-start"
                )}
              >
                <div className={cn(
                  "p-3 font-body text-lg border-2 border-foreground",
                  msg.role === 'user' 
                    ? "bg-primary text-white rounded-t-xl rounded-bl-xl" 
                    : "bg-secondary text-foreground rounded-t-xl rounded-br-xl"
                )}
                style={{ 
                  borderRadius: msg.role === 'user' 
                    ? '15px 15px 2px 15px / 15px 15px 2px 15px' 
                    : '15px 15px 15px 2px / 15px 15px 15px 2px' 
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 font-body text-muted-foreground italic">
                <Loader2 size={16} className="animate-spin" /> Sedang merangkai kata...
              </div>
            )}
          </div>

          {/* Quick Suggestions */}
          {messages.length < 3 && !isLoading && (
            <div className="flex flex-wrap gap-2 mb-4">
              {portfolioData.faq.slice(0, 3).map((q, i) => (
                <button 
                  key={i}
                  onClick={() => handleQuickQuestion(q)}
                  className="text-xs font-body border border-foreground/30 px-2 py-1 rounded-full hover:bg-accent/10 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2 items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tanya apapun..."
              className="flex-1 font-body text-lg border-2 border-foreground p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
              style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-3 bg-accent text-white border-2 border-foreground hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
              style={{ borderRadius: '50%' }}
            >
              <Send size={20} strokeWidth={3} />
            </button>
          </div>
        </WobblyBox>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-5 rounded-full border-[3px] border-foreground shadow-hand-drawn hover:shadow-hand-drawn-lg transition-all transform hover:-translate-y-1 active:translate-y-1 active:shadow-none",
          isOpen ? "bg-white text-accent" : "bg-accent text-white"
        )}
      >
        {isOpen ? <X size={32} strokeWidth={3} /> : <MessageCircle size={32} strokeWidth={3} />}
      </button>
    </div>
  );
};
