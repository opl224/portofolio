import React from 'react';
import { cn } from "@/lib/utils";

interface WobblyBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'post-it' | 'blue' | 'accent';
  decoration?: 'none' | 'tape' | 'tack';
  rotate?: number;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

export const WobblyBox = React.forwardRef<HTMLDivElement, WobblyBoxProps>(
  ({ className, variant = 'default', decoration = 'none', rotate = 0, shadow = 'md', children, ...props }, ref) => {
    const variants = {
      default: 'bg-background border-foreground text-foreground',
      'post-it': 'bg-[#fff9c4] dark:bg-yellow-600/20 border-foreground text-foreground',
      blue: 'bg-[#e3f2fd] dark:bg-blue-900/20 border-primary text-foreground',
      accent: 'bg-accent/10 border-accent text-foreground',
    };

    const shadows = {
      none: '',
      sm: 'shadow-hand-drawn-sm',
      md: 'shadow-hand-drawn',
      lg: 'shadow-hand-drawn-lg',
    };

    return (
      <div
        ref={ref}
        style={{ 
          transform: `rotate(${rotate}deg)`,
          borderRadius: variant === 'post-it' ? '2px 2px 2px 30px / 2px 2px 2px 2px' : '255px 15px 225px 15px / 15px 225px 15px 255px'
        }}
        className={cn(
          "relative border-[3px] p-6 transition-all duration-200",
          variants[variant],
          shadows[shadow],
          className
        )}
        {...props}
      >
        {decoration === 'tape' && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-foreground/20 rotate-[-2deg] z-10" />
        )}
        {decoration === 'tack' && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent shadow-sm z-10" />
        )}
        {children}
      </div>
    );
  }
);

WobblyBox.displayName = "WobblyBox";
