'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles, Search } from 'lucide-react';
import { WobblyBox } from './ui/wobbly-box';
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
  }, [messages, isLoading]);

  // Suggestion logic based on typing
  const suggestions = useMemo(() => {
    if (!input.trim()) return [];
    
    const allKnowledge = [
      ...portfolioData.faq,
      ...portfolioData.projects.map(p => `Ceritakan tentang ${p.title}`),
      ...portfolioData.skills.design.map(s => `Apakah kamu ahli dalam ${s}?`),
      ...portfolioData.skills.technical.map(s => `Bagaimana pengalamanmu dengan ${s}?`)
    ];

    return allKnowledge
      .filter(item => item.toLowerCase().includes(input.toLowerCase()))
      .slice(0, 3);
  }, [input]);

  const handleSend = async (overrideMessage?: string) => {
    const messageToSend = overrideMessage || input.trim();
    if (!messageToSend || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: messageToSend }]);
    setIsLoading(true);

    try {
      const result = await chatWithPortfolio({ 
        message: messageToSend,
        history: messages 
      });
      setMessages(prev => [...prev, { role: 'model', text: result.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Waduh, sepertinya koneksi tinta saya terputus. Coba lagi ya!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (s: string) => {
    handleSend(s);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <WobblyBox 
          variant="default" 
          shadow="lg" 
          className="mb-4 w-[350px] md:w-[400px] h-[550px] flex flex-col p-4 bg-white overflow-hidden"
          rotate={-1}
        >
          {/* Header */}
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

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto space-y-4 mb-2 pr-2 custom-scrollbar"
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
                  "p-3 font-body text-lg border-2 border-foreground shadow-hand-drawn-sm",
                  msg.role === 'user' 
                    ? "bg-primary text-white" 
                    : "bg-secondary text-foreground"
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
              <div className="flex items-center gap-2 font-body text-muted-foreground italic p-2">
                <Loader2 size={16} className="animate-spin" /> Sedang merangkai kata...
              </div>
            )}
          </div>

          {/* Suggestions List */}
          <div className="min-h-[40px] mb-2">
            {suggestions.length > 0 && (
              <div className="flex flex-col gap-1">
                <p className="text-[10px] font-headline text-muted-foreground uppercase tracking-widest ml-1 mb-1 flex items-center gap-1">
                  <Search size={10} /> Mungkin maksud Anda:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s, i) => (
                    <button 
                      key={i}
                      onClick={() => handleSuggestionClick(s)}
                      className="text-xs font-body border-2 border-foreground/30 px-3 py-1 rounded-full hover:bg-accent hover:text-white hover:border-foreground transition-all text-left"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Default FAQ if no typing */}
            {input.length === 0 && messages.length < 3 && !isLoading && (
              <div className="flex flex-wrap gap-2">
                {portfolioData.faq.slice(0, 3).map((q, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSuggestionClick(q)}
                    className="text-xs font-body border-2 border-foreground/30 px-3 py-1 rounded-full hover:bg-primary hover:text-white hover:border-foreground transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex gap-2 items-center mt-auto">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tanya tentang proyek..."
              className="flex-1 font-body text-lg border-2 border-foreground p-2 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
              style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
            />
            <button 
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="p-3 bg-accent text-white border-2 border-foreground hover:scale-110 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale"
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
