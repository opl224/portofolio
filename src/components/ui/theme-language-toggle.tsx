'use client';

import React from 'react';
import { Sun, Moon, Languages } from 'lucide-react';
import { useAppContext } from '@/context/app-context';
import { WobblyBox } from './wobbly-box';
import { cn } from '@/lib/utils';

export const ThemeLanguageToggle = () => {
  const { theme, toggleTheme, locale, setLocale } = useAppContext();

  return (
    <div className="flex items-center gap-3">
      {/* Language Toggle */}
      <button 
        onClick={() => setLocale(locale === 'en' ? 'id' : 'en')}
        className="flex items-center gap-2 font-headline text-lg border-2 border-foreground px-3 py-1 hover:bg-primary hover:text-white transition-all wobbly-border"
      >
        <Languages size={18} />
        {locale.toUpperCase()}
      </button>

      {/* Theme Toggle */}
      <button 
        onClick={toggleTheme}
        className="p-2 border-2 border-foreground hover:bg-accent hover:text-white transition-all wobbly-border"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </div>
  );
};