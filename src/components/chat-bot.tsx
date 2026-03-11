'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Send, Loader2, Sparkles, Search } from 'lucide-react';
import { WobblyBox } from './ui/wobbly-box';
import { cn } from '@/lib/utils';
import portfolioData from '@/lib/chatbot-data.json';
import { useAppContext } from '@/context/app-context';
import { translations } from '@/lib/translations';

type Message = {
  role: 'user' | 'model';
  text: string;
};

// Custom Animated Close Icon with updated SVG from user
const CloseIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="60" 
    height="60" 
    viewBox="0 0 60 60" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="4" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={cn("transition-all duration-300 hover:rotate-90", className)}
  >
    <path d="M18 18 42 42"/>
    <path d="M18 42 42 18"/>
  </svg>
);

// Custom Bot Icon SVG
const BotIcon = ({ className, size = 24, strokeWidth = 2 }: { className?: string, size?: number, strokeWidth?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={cn("lucide lucide-bot-message-square", className)}
  >
    <path d="M12 6V2H8"/>
    <path d="M15 11v2"/>
    <path d="M2 12h2"/>
    <path d="M20 12h2"/>
    <path d="M20 16a2 2 0 0 1-2 2H8.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 4 20.286V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/>
    <path d="M9 11v2"/>
  </svg>
);

export const ChatBot = () => {
  const { locale } = useAppContext();
  const t = translations[locale].chat;
  
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: t.welcome }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: 'model', text: t.welcome }]);
  }, [locale, t.welcome]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const getLocalResponse = (userInput: string): string => {
    const query = userInput.toLowerCase();
    const data = portfolioData;
    const isID = locale === 'id';

    if (query.includes('siapa') || query.includes('who') || query.includes('profil') || query.includes('profile')) {
      return isID 
        ? `Saya adalah ${data.profile.name}. ${data.profile.bio}`
        : `I am ${data.profile.name}. ${data.profile.bio}`;
    }

    if (query.includes('skill') || query.includes('keahlian') || query.includes('can you') || query.includes('technical')) {
      return isID
        ? `Saya ahli di bidang desain (${data.skills.design.join(', ')}) dan mahir dalam teknologi seperti ${data.skills.technical.join(', ')}.`
        : `I specialize in design (${data.skills.design.join(', ')}) and am proficient in technologies like ${data.skills.technical.join(', ')}.`;
    }

    if (query.includes('proyek') || query.includes('project') || query.includes('work') || query.includes('karya')) {
      const titles = data.projects.map(p => p.title).join(', ');
      return isID
        ? `Saya sudah mengerjakan beberapa proyek menarik seperti: ${titles}.`
        : `I have worked on several interesting projects like: ${titles}.`;
    }

    if (query.includes('kontak') || query.includes('contact') || query.includes('email')) {
      return data.profile.contact;
    }

    const faqMatch = data.faq.find(f => 
      query.includes(f.question.toLowerCase()) || f.question.toLowerCase().includes(query)
    );
    if (faqMatch) return faqMatch.answer;

    return t.confused;
  };

  const suggestions = useMemo(() => {
    if (!input.trim()) return [];
    
    const allKnowledge = [
      ...portfolioData.faq.map(f => f.question),
      locale === 'id' ? "Apa saja keahlianmu?" : "What are your skills?",
      locale === 'id' ? "Siapa itu InkFolio?" : "Who is InkFolio?",
      locale === 'id' ? "Bagaimana cara menghubungi?" : "How to contact?"
    ];

    return allKnowledge
      .filter(item => item.toLowerCase().includes(input.toLowerCase()))
      .slice(0, 3);
  }, [input, locale]);

  const handleSend = async (overrideMessage?: string) => {
    const messageToSend = overrideMessage || input.trim();
    if (!messageToSend || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: messageToSend }]);
    setIsLoading(true);

    setTimeout(() => {
      const response = getLocalResponse(messageToSend);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <WobblyBox 
          variant="default" 
          shadow="lg" 
          className="mb-4 w-[350px] md:w-[400px] h-[550px] flex flex-col p-4 bg-background overflow-hidden"
          rotate={-1}
        >
          <div className="flex justify-between items-center border-b-2 border-dashed border-foreground pb-2 mb-4">
            <h3 className="font-headline text-2xl flex items-center gap-2 text-foreground">
              <Sparkles size={20} className="text-accent" /> {t.title}
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-secondary rounded-full transition-colors text-foreground"
            >
              <CloseIcon className="w-8 h-8" />
            </button>
          </div>

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
                <Loader2 size={16} className="animate-spin" /> {t.typing}
              </div>
            )}
          </div>

          <div className="min-h-[40px] mb-2">
            {suggestions.length > 0 && (
              <div className="flex flex-col gap-1">
                <p className="text-[10px] font-headline text-muted-foreground uppercase tracking-widest ml-1 mb-1 flex items-center gap-1">
                  <Search size={10} /> {t.suggestionTitle}
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s, i) => (
                    <button 
                      key={i}
                      onClick={() => handleSend(s)}
                      className="text-xs font-body border-2 border-foreground/30 px-3 py-1 rounded-full hover:bg-accent hover:text-white hover:border-foreground transition-all text-left text-foreground bg-background/50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 items-center mt-auto">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.placeholder}
              className="flex-1 font-body text-lg border-2 border-foreground p-2 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all bg-background text-foreground"
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

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-5 rounded-full border-[3px] border-foreground shadow-hand-drawn hover:shadow-hand-drawn-lg transition-all transform hover:-translate-y-1 active:translate-y-1 active:shadow-none",
          isOpen ? "bg-background text-accent" : "bg-accent text-white"
        )}
      >
        {isOpen ? (
          <CloseIcon className="w-8 h-8" />
        ) : (
          <BotIcon size={32} strokeWidth={3} />
        )}
      </button>
    </div>
  );
};
