'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Mail } from 'lucide-react';
import { ProjectCard } from '@/components/ui/project-card';
import { HandDrawnButton } from '@/components/ui/hand-drawn-button';
import { ChatBot } from '@/components/chat-bot';
import { useAppContext } from '@/context/app-context';
import { translations } from '@/lib/translations';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ProjectsPage() {
  const { locale } = useAppContext();
  const t = translations[locale];

  const allProjects = [
    {
      id: 'project1',
      title: locale === 'en' ? "Eco-App Redesign" : "Redesain Aplikasi Eco",
      description: locale === 'en' ? "Interface design for eco-friendly apps with an organic visual approach." : "Desain antarmuka aplikasi ramah lingkungan dengan pendekatan visual yang organik.",
      tags: ["UI/UX", "Mobile", "Sustainability"],
      image: PlaceHolderImages.find(img => img.id === 'project1')
    },
    {
      id: 'project2',
      title: locale === 'en' ? "Hand-Crafted Branding" : "Branding Buatan Tangan",
      description: locale === 'en' ? "Visual identity for a local ceramic studio with earthy tones." : "Identitas visual untuk studio keramik lokal dengan nuansa earthy.",
      tags: ["Branding", "Print", "Illustration"],
      image: PlaceHolderImages.find(img => img.id === 'project2')
    },
    {
      id: 'project3',
      title: locale === 'en' ? "Storybook World" : "Dunia Buku Cerita",
      description: locale === 'en' ? "Digital illustration series for children's books inspired by folklore." : "Seri ilustrasi digital untuk buku anak-anak yang terinspirasi dari dongeng Nusantara.",
      tags: ["Illustration", "Digital Art"],
      image: PlaceHolderImages.find(img => img.id === 'project3')
    },
    {
      id: 'project4',
      title: locale === 'en' ? "Portfolio Website" : "Website Portofolio",
      description: locale === 'en' ? "Web portfolio development using Next.js with dynamic hand-drawn animations." : "Pengembangan portofolio web menggunakan Next.js dengan animasi coretan tangan.",
      tags: ["Web Dev", "React", "Tailwind"],
      image: PlaceHolderImages.find(img => img.id === 'project4')
    },
    {
      id: 'project5',
      title: locale === 'en' ? "Digital Sketchbook" : "Sketsa Digital",
      description: locale === 'en' ? "Experimental project exploring digital charcoal and ink textures." : "Proyek eksperimental mengeksplorasi tekstur arang dan tinta digital.",
      tags: ["Digital Art", "Experiments"],
      image: PlaceHolderImages[0]
    },
    {
      id: 'project6',
      title: locale === 'en' ? "Typography Study" : "Studi Tipografi",
      description: locale === 'en' ? "Hand-lettered font design study for branding purposes." : "Studi desain font buatan tangan untuk keperluan branding.",
      tags: ["Typography", "Design"],
      image: PlaceHolderImages[1]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 relative min-h-screen flex flex-col">
      {/* Simplified Navigation per instructions */}
      <nav className="flex items-center mb-20 px-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 font-headline text-2xl text-primary hover:text-accent transition-all group"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          {t.projects.back}
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-20 text-center md:text-left">
        <h1 className="text-5xl md:text-7xl font-headline text-foreground mb-6">
          {t.projects.allTitle}
        </h1>
        <div className="w-48 h-2 bg-accent/20 wobbly-border -rotate-1 mx-auto md:mx-0" />
      </header>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-20 flex-1">
        {allProjects.map((project, i) => (
          <ProjectCard 
            key={project.id}
            index={i}
            title={project.title}
            description={project.description}
            imageUrl={project.image?.imageUrl || ""}
            imageHint={project.image?.imageHint || "design project"}
            tags={project.tags}
          />
        ))}
      </div>

      {/* CTA Footer */}
      <div className="mt-32 mb-20 text-center">
        <Link href="/#contact">
          <HandDrawnButton variant="accent" size="lg">
            {t.contact.title}
          </HandDrawnButton>
        </Link>
      </div>

      {/* Standard Footer */}
      <footer className="border-t-[3px] border-foreground border-dashed pt-12 pb-20 mt-auto">
        <div className="grid md:grid-cols-3 gap-12 items-center text-center md:text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 border-2 border-foreground overflow-hidden wobbly-border bg-white shadow-hand-drawn-sm">
                <Image 
                  src="/me.png" 
                  alt="Footer Logo" 
                  width={40} 
                  height={40} 
                  className="object-cover grayscale"
                />
              </div>
            </div>
            <p className="font-body text-xl text-foreground">{t.footer.tagline}</p>
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="flex justify-center gap-6">
              <a href="#" className="p-3 border-2 border-foreground rounded-full hover:bg-accent hover:text-white transition-all bg-background text-foreground">
                <Github />
              </a>
              <a href="#" className="p-3 border-2 border-foreground rounded-full hover:bg-primary hover:text-white transition-all bg-background text-foreground">
                <Linkedin />
              </a>
              <a href="#" className="p-3 border-2 border-foreground rounded-full hover:bg-accent hover:text-white transition-all bg-background text-foreground">
                <Mail />
              </a>
            </div>
          </div>
          <div className="text-center md:text-right">
            <span className="font-headline text-5xl text-accent -rotate-2 block">
              {t.footer.stayCreative}
            </span>
          </div>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
}