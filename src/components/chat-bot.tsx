
'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles, Search } from 'lucide-react';
import { WobblyBox } from './ui/wobbly-box';
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

  // Local response logic (No AI)
  const getLocalResponse = (userInput: string): string => {
    const query = userInput.toLowerCase();
    
    // 1. Check for exact or partial FAQ matches
    const faqMatch = portfolioData.faq.find(f => 
      query.includes(f.question.toLowerCase()) || f.question.toLowerCase().includes(query)
    );
    if (faqMatch) return faqMatch.answer;

    // 2. Profile keywords
    if (query.includes('siapa') || query.includes('profil') || query.includes('nama')) {
      return `Saya adalah ${portfolioData.profile.name}. ${portfolioData.profile.bio}`;
    }

    // 3. Skills keywords
    if (query.includes('skill') || query.includes('keahlian') || query.includes('bisa apa') || query.includes('teknis')) {
      return `Saya ahli di bidang desain (${portfolioData.skills.design.join(', ')}) dan mahir dalam teknologi seperti ${portfolioData.skills.technical.join(', ')}.`;
    }

    // 4. Projects keywords
    if (query.includes('proyek') || query.includes('karya') || query.includes('buat')) {
      const titles = portfolioData.projects.map(p => p.title).join(', ');
      return `Saya sudah mengerjakan beberapa proyek menarik seperti: ${titles}. Ada yang ingin Anda ketahui lebih detail?`;
    }

    // 5. Contact keywords
    if (query.includes('kontak') || query.includes('hubung') || query.includes('email') || query.includes('pesan')) {
      return portfolioData.profile.contact;
    }

    // 6. Greetings
    if (query.includes('halo') || query.includes('hi') || query.includes('hai') || query.includes('pagi') || query.includes('siang')) {
      return "Halo! Senang bertemu Anda. Ingin tahu tentang proyek saya atau keahlian teknis saya?";
    }

    return "Maaf, tinta saya agak bingung. Coba tanya tentang 'proyek', 'keahlian', atau 'siapa profilmu'!";
  };

  // Suggestion logic based on typing
  const suggestions = useMemo(() => {
    if (!input.trim()) return [];
    
    const allKnowledge = [
      ...portfolioData.faq.map(f => f.question),
      ...portfolioData.projects.map(p => `Ceritakan tentang ${p.title}`),
      "Apa saja keahlianmu?",
      "Siapa itu InkFolio?",
      "Bagaimana cara menghubungi?"
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

    // Simulate "thinking" time for natural feel
    setTimeout(() => {
      const response = getLocalResponse(messageToSend);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
      setIsLoading(false);
    }, 600);
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
                <Loader2 size={16} className="animate-spin" /> Sedang menulis...
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
                {portfolioData.faq.slice(0, 3).map((f, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSuggestionClick(f.question)}
                    className="text-xs font-body border-2 border-foreground/30 px-3 py-1 rounded-full hover:bg-primary hover:text-white hover:border-foreground transition-all"
                  >
                    {f.question}
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
