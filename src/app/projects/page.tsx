'use client';

import React from 'react';
import Link from 'next/link';
import { ProjectCard } from '@/components/ui/project-card';
import { HandDrawnButton } from '@/components/ui/hand-drawn-button';
import { useAppContext } from '@/context/app-context';
import { translations } from '@/lib/translations';
import { PlaceHolderImages } from '@/lib/placeholder-images';

// Custom Arrow Left SVG from instructions
const ArrowLeftIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="60" 
    height="24" 
    viewBox="0 0 60 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="lucide lucide-arrow-left"
  >
    <path d="m12 19-7-7 7-7"/>
    <path d="M50 12H5"/>
</svg>
);

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
      {/* Simplified Navigation: Back to home only */}
      <nav className="flex items-center mb-20 px-4">
        <Link 
          href="/" 
          className="flex items-center gap-3 font-headline text-2xl text-primary hover:text-accent transition-all group"
        >
          <span className="transition-transform group-hover:-translate-x-2">
            <ArrowLeftIcon />
          </span>
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

      {/* Minimalist Footer: Only "Stay Creative" */}
      <footer className="pt-12 pb-24 mt-auto border-t-[3px] border-foreground border-dashed">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="group relative">
            <span className="font-headline text-base text-primary -rotate-12 bg-accent/10 px-2 py-0.5 wobbly-border border border-primary/30 mb-[-16px] mx-auto block w-fit z-10">opal</span>
            <span className="font-headline text-7xl md:text-9xl text-accent -rotate-2 group-hover:rotate-0 transition-transform duration-500 block">
              {t.footer.stayCreative}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
