'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-[100] flex flex-col items-center justify-center paper-texture bg-background transition-opacity duration-700",
      progress === 100 ? "opacity-0 pointer-events-none" : "opacity-100"
    )}>
      <div className="relative w-64 h-64 mb-8">
        {/* Sketching Circle Animation */}
        <svg viewBox="0 0 100 100" className="w-full h-full text-foreground fill-none stroke-current stroke-2">
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            className="scribble-path opacity-20"
            strokeDasharray="251"
            strokeDashoffset="251"
          />
          <path 
            d="M50 10 A40 40 0 0 1 90 50 A40 40 0 0 1 50 90 A40 40 0 0 1 10 50 A40 40 0 0 1 50 10" 
            className="scribble-path"
            strokeWidth="3"
          />
          {/* Animated Pencil/Pen Tip */}
          <circle cx="50" cy="10" r="2" fill="currentColor" className="animate-wiggle" />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-headline text-4xl animate-wiggle text-primary">opal</span>
        </div>
      </div>

      <div className="w-64 space-y-4 text-center">
        <h2 className="font-headline text-3xl text-foreground">Scribbling Portofolio...</h2>
        <div className="relative h-4 w-full border-2 border-foreground overflow-hidden wobbly-border bg-white shadow-hand-drawn-sm">
          <div 
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="font-body text-xl text-muted-foreground">{progress}% Ink Loaded</p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center opacity-40">
        <p className="font-body text-sm italic">"Precision is overrated, character is everything."</p>
      </div>
    </div>
  );
};