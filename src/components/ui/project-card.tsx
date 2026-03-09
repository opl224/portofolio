
import React from 'react';
import Image from 'next/image';
import { ExternalLink, Tag } from 'lucide-react';
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
  
  return (
    <div className={cn(
      "group flex flex-col transition-all duration-300",
      !isEven && "md:mt-16"
    )}>
      <WobblyBox 
        decoration={index === 0 ? "tape" : "none"}
        shadow="lg"
        className={cn(
          "overflow-hidden p-0 mb-6 group-hover:scale-[1.02] transition-transform duration-300 bg-white",
          isEven ? "rotate-[-1.5deg]" : "rotate-[1.5deg]"
        )}
      >
        <div className="relative aspect-video">
          <Image 
            src={imageUrl} 
            alt={title} 
            fill 
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            data-ai-hint={imageHint}
          />
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
            <HandDrawnButton variant="accent" size="sm" className="scale-90 group-hover:scale-100 transition-transform">
              Buka Proyek
            </HandDrawnButton>
          </div>
        </div>
      </WobblyBox>

      <div className="px-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-3xl font-headline group-hover:text-primary transition-colors">
            {title}
          </h3>
          <a 
            href={link} 
            className="p-2 border-2 border-foreground rounded-full hover:bg-primary hover:text-white transition-all transform hover:rotate-12"
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
              className="flex items-center gap-1 font-body text-sm bg-secondary/50 px-3 py-1 border-2 border-foreground rounded-full"
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
