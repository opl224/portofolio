import React from 'react';
import { cn } from "@/lib/utils";

interface HandDrawnButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

export const HandDrawnButton = React.forwardRef<HTMLButtonElement, HandDrawnButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: "bg-background border-foreground text-foreground hover:bg-accent hover:text-white dark:hover:text-background",
      secondary: "bg-secondary border-foreground text-secondary-foreground hover:bg-primary hover:text-white dark:hover:text-background",
      accent: "bg-accent border-foreground text-white hover:bg-background hover:text-accent",
    };

    const sizes = {
      sm: "px-4 py-1.5 text-lg",
      md: "px-8 py-3 text-xl",
      lg: "px-10 py-4 text-2xl",
    };

    return (
      <button
        ref={ref}
        style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
        className={cn(
          "font-body border-[3px] shadow-hand-drawn transition-all active:shadow-none active:translate-x-1 active:translate-y-1 hover:shadow-hand-drawn-sm hover:translate-x-[2px] hover:translate-y-[2px]",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

HandDrawnButton.displayName = "HandDrawnButton";
