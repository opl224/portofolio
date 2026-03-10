import React from 'react';
import Image from 'next/image';
import { ExternalLink, Tag, Code2 } from 'lucide-react';
import { WobblyBox } from './wobbly-box';
import { HandDrawnButton } from './hand-drawn-button';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  tags: string[];
  link?: string;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  imageHint,
  tags,
  link = "#",
  index
}) => {
  const isEven = index % 2 === 0;
  
  const handleOpenProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = link;
  };

  return (
    <div 
      className={cn(
        "group flex flex-col transition-all duration-300 outline-none",
        !isEven && "md:mt-16"
      )}
      tabIndex={0}
    >
      <WobblyBox 
        decoration={index === 0 ? "tape" : "none"}
        shadow="lg"
        className={cn(
          "overflow-hidden p-0 mb-6 group-hover:scale-[1.02] transition-transform duration-300 bg-background cursor-pointer",
          isEven ? "rotate-[-1.5deg]" : "rotate-[1.5deg]"
        )}
      >
        <div className="relative aspect-video">
          <Image 
            src={imageUrl} 
            alt={title} 
            fill 
            className="object-cover grayscale group-hover:grayscale-0 group-focus:grayscale-0 transition-all duration-500"
            data-ai-hint={imageHint}
          />
          
          {/* Overlay for Technologies & CTA */}
          <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300 flex flex-col items-center justify-center backdrop-blur-[6px] p-6 text-center">
            <div className="mb-4 space-y-2">
              <p className="font-headline text-white text-lg flex items-center justify-center gap-2 mb-2">
                <Code2 size={18} /> Tech Stack:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {tags.map((tag, i) => (
                  <span 
                    key={tag} 
                    className={cn(
                      "bg-white text-primary font-body text-sm px-3 py-1 border-2 border-foreground shadow-hand-drawn-sm",
                      i % 2 === 0 ? "rotate-2" : "-rotate-2"
                    )}
                    style={{ borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-2">
              <HandDrawnButton 
                variant="accent" 
                size="sm" 
                className="scale-90 group-hover:scale-100 group-focus:scale-100 transition-transform"
                onClick={handleOpenProject}
              >
                Buka Proyek
              </HandDrawnButton>
            </div>
          </div>
        </div>
      </WobblyBox>

      <div className="px-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-3xl font-headline group-hover:text-primary transition-colors text-foreground">
            {title}
          </h3>
          <a 
            href={link} 
            className="p-2 border-2 border-foreground rounded-full hover:bg-primary hover:text-white transition-all transform hover:rotate-12 text-foreground"
          >
            <ExternalLink size={20} strokeWidth={3} />
          </a>
        </div>
        
        <p className="font-body text-xl text-foreground/70 line-clamp-2">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="flex items-center gap-1 font-body text-sm bg-secondary/50 px-3 py-1 border-2 border-foreground rounded-full text-foreground"
              style={{ borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px' }}
            >
              <Tag size={12} className="text-primary" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
