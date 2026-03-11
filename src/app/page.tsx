'use client';

import Image from 'next/image';
import { Mail, Github, Linkedin, User, FileDown, Sparkles, Star, Zap } from 'lucide-react';
import { WobblyBox } from '@/components/ui/wobbly-box';
import { HandDrawnButton } from '@/components/ui/hand-drawn-button';
import { ProjectCard } from '@/components/ui/project-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ChatBot } from '@/components/chat-bot';
import { ThemeLanguageToggle } from '@/components/ui/theme-language-toggle';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { useAppContext } from '@/context/app-context';
import { translations } from '@/lib/translations';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetHeader, 
  SheetTitle,
  SheetDescription,
  SheetClose 
} from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Decorative Elements for the sides
const SideDecorations = () => (
  <div className="hidden xl:block pointer-events-none select-none">
    {/* Left Side Decorations */}
    <div className="fixed left-4 top-1/4 -translate-y-1/2 opacity-20">
      <svg width="200" height="400" viewBox="0 0 200 400" fill="none" className="text-foreground">
        <path d="M20,50 Q150,150 20,250 T50,380" stroke="currentColor" strokeWidth="2" strokeDasharray="8 4" fill="none" className="animate-pulse" />
        <circle cx="120" cy="80" r="15" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M80,300 L110,330 M110,300 L80,330" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
    <div className="fixed left-10 bottom-20 opacity-10">
      <Star className="w-16 h-16 rotate-12 text-accent" />
      <div className="mt-4 ml-8">
        <Sparkles className="w-10 h-10 -rotate-12 text-primary" />
      </div>
    </div>

    {/* Right Side Decorations */}
    <div className="fixed right-4 top-1/3 opacity-20">
      <svg width="150" height="300" viewBox="0 0 150 300" fill="none" className="text-foreground">
        <path d="M10,10 C100,50 10,150 130,280" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="40" y="40" width="40" height="40" stroke="currentColor" strokeWidth="2" fill="none" className="rotate-45" />
        <path d="M100,20 Q120,40 100,60" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    </div>
    <div className="fixed right-12 bottom-1/4 opacity-15">
      <Zap className="w-12 h-12 text-accent animate-bounce-slow" />
      <div className="mt-20 -mr-6">
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-primary">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" fill="none" />
        </svg>
      </div>
    </div>
  </div>
);

// Custom Animated Menu Icon (2 lines)
const MenuIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={cn("lucide lucide-menu-icon lucide-menu transition-all duration-300 hover:scale-110 active:rotate-12", className)}
  >
    <path d="M4 6h16"/>
    <path d="M4 18h16"/>
  </svg>
);

// Custom Animated Close Icon
const CloseIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={cn("lucide lucide-x-icon lucide-x transition-all duration-300 hover:scale-110 hover:rotate-90", className)}
  >
    <path d="M6 6 18 18"/>
    <path d="M6 18 18 6"/>
  </svg>
);

const LongArrowRight = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="36" 
    height="24" 
    viewBox="0 0 36 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M2 12h30" />
    <path d="m24 5 8 7-8 7" />
  </svg>
);

const MoveUpArrow = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M8 6L12 2L16 6"/>
    <path d="M12 2V22"/>
  </svg>
);

export default function Home() {
  const { locale } = useAppContext();
  const t = translations[locale];
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero');
  
  const projects = [
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
    }
  ];

  const techLogos = [
    { src: "/logo/react.svg", name: "React" },
    { src: "/logo/html5.svg", name: "HTML5" },
    { src: "/logo/tailwind.svg", name: "Tailwind" },
    { src: "/logo/expo.svg", name: "Expo" },
    { src: "/logo/flutter.svg", name: "Flutter" },
    { src: "/logo/capacitor.svg", name: "Capacitor" },
    { src: "/logo/firebase.svg", name: "Firebase" },
    { src: "/logo/figma.svg", name: "Figma" },
    { src: "/logo/javascript.svg", name: "JavaScript" },
    { src: "/logo/nodejs.svg", name: "Node.js" },
    { src: "/logo/office.svg", name: "Office" },
  ];

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const startPosition = window.pageYOffset;
    const distance = -startPosition;
    const duration = 2200; 
    let start: number | null = null;

    function step(timestamp: number) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const t = progress / duration;
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; 
      window.scrollTo(0, startPosition + distance * ease);
      if (progress < duration) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  };

  const handleScrollToSection = (sectionId: string) => {
    setIsSheetOpen(false);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 450); 
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 800);
    }
  }, []);

  return (
    <>
      <LoadingScreen />
      <SideDecorations />
      <div id="top" className="max-w-5xl mx-auto px-6 py-10 relative overflow-x-hidden">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-20 px-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 border-2 border-foreground overflow-hidden wobbly-border bg-white shadow-hand-drawn-sm">
              <Image 
                src="/me.png" 
                alt="Logo" 
                width={48} 
                height={48} 
                className="object-cover grayscale hover:grayscale-0 transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex gap-8 font-body text-xl text-foreground">
              <button 
                onClick={() => handleScrollToSection('projects')}
                className="hover:line-through decoration-accent decoration-2 transition-all bg-transparent border-none cursor-pointer"
              >
                {t.nav.projects}
              </button>
              <button 
                onClick={() => handleScrollToSection('about')}
                className="hover:line-through decoration-accent decoration-2 transition-all bg-transparent border-none cursor-pointer"
              >
                {t.nav.about}
              </button>
              <button 
                onClick={() => handleScrollToSection('contact')}
                className="hover:line-through decoration-accent decoration-2 transition-all bg-transparent border-none cursor-pointer"
              >
                {t.nav.contact}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <ThemeLanguageToggle />
              </div>
              
              <div className="md:hidden">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <button className="p-2 transition-all duration-200 text-foreground">
                      <MenuIcon />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="top" className="h-full w-full border-none p-0 flex flex-col paper-texture bg-background overflow-y-auto">
                    <div className="p-8 flex flex-col h-full items-center">
                      <SheetHeader className="w-full p-0 mb-12 flex flex-row items-center justify-between text-left space-y-0">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 border-2 border-foreground overflow-hidden wobbly-border bg-white shadow-hand-drawn-sm">
                            <Image 
                              src="/me.png" 
                              alt="Logo Mobile" 
                              width={48} 
                              height={48} 
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <SheetTitle className="sr-only">Navigasi Portofolio</SheetTitle>
                        <SheetDescription className="sr-only">Pilih bagian portofolio untuk berpindah halaman</SheetDescription>
                        <SheetClose asChild>
                          <button className="p-2 transition-all text-foreground duration-200">
                            <CloseIcon />
                          </button>
                        </SheetClose>
                      </SheetHeader>

                      <div className="flex flex-col gap-8 font-body text-4xl mb-12 items-center text-center">
                        <button 
                          type="button"
                          onClick={() => handleScrollToSection('projects')}
                          className="hover:line-through decoration-accent decoration-4 text-foreground block w-full transition-all text-center bg-transparent border-none cursor-pointer font-body text-4xl"
                        >
                          {t.nav.projects}
                        </button>
                        
                        <button 
                          type="button"
                          onClick={() => handleScrollToSection('about')}
                          className="hover:line-through decoration-accent decoration-4 text-foreground block w-full transition-all text-center bg-transparent border-none cursor-pointer font-body text-4xl"
                        >
                          {t.nav.about}
                        </button>
                        
                        <button 
                          type="button"
                          onClick={() => handleScrollToSection('contact')}
                          className="hover:line-through decoration-accent decoration-4 text-foreground block w-full transition-all text-center bg-transparent border-none cursor-pointer font-body text-4xl"
                        >
                          {t.nav.contact}
                        </button>
                      </div>

                      <div className="w-full border-t-2 border-dashed border-foreground pt-8 mb-10 flex flex-col items-center">
                        <div className="flex flex-col gap-8 items-center w-full">
                          <div className="scale-125">
                            <ThemeLanguageToggle />
                          </div>

                          <div className="flex gap-6 mt-4 justify-center">
                            <a href="#" className="p-4 border-2 border-foreground rounded-full hover:bg-accent hover:text-white transition-all bg-background text-foreground active:scale-90">
                              <Github size={24} strokeWidth={3} />
                            </a>
                            <a href="#" className="p-4 border-2 border-foreground rounded-full hover:bg-primary hover:text-white transition-all bg-background text-foreground active:scale-90">
                              <Linkedin size={24} strokeWidth={3} />
                            </a>
                            <a href="#" className="p-4 border-2 border-foreground rounded-full hover:bg-accent hover:text-white transition-all bg-background text-foreground active:scale-90">
                              <Mail size={24} strokeWidth={3} />
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto text-center pb-12 flex flex-col items-center">
                        <span className="font-headline text-base text-primary -rotate-12 bg-accent/10 px-2 py-0.5 wobbly-border border border-primary/30 mb-[-12px] z-10">opal</span>
                        <p className="font-headline text-accent text-6xl -rotate-2">{t.footer.stayCreative}</p>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-32">
          <div className="space-y-6">
            <WobblyBox variant="accent" className="inline-block px-4 py-1 mb-2 -rotate-2" shadow="sm">
              <span className="text-accent font-headline">{t.hero.status}</span>
            </WobblyBox>
            <h1 className="text-5xl md:text-7xl font-headline leading-tight text-foreground">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl font-body text-foreground/80 leading-relaxed max-w-lg">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-4 relative">
              <HandDrawnButton 
                variant="primary" 
                size="lg" 
                onClick={() => handleScrollToSection('projects')}
              >
                {t.hero.cta}
              </HandDrawnButton>
              <div className="hidden md:block absolute -right-24 top-0 animate-bounce-slow">
                <svg width="100" height="60" viewBox="0 0 100 60" fill="none" className="stroke-accent stroke-[2.5] fill-none">
                  <path d="M10,10 Q50,5 90,50 M90,50 L80,50 M90,50 L90,40" strokeLinecap="round" strokeDasharray="5,5" />
                </svg>
                <span className="font-body text-accent block mt-2 text-center -rotate-6">{t.hero.hint}</span>
              </div>
            </div>
          </div>
          <div className="relative">
            {/* One tape on top-left */}
            <div className="absolute -top-1 -left-10 w-24 h-8 bg-yellow-100/40 backdrop-blur-[1px] rotate-[-35deg] z-20 border-x border-foreground/5 shadow-sm" />
            
            {/* Two crossing tapes on bottom-right */}
            <div className="absolute -bottom-4 -right-21 w-24 h-8 bg-yellow-100/40 backdrop-blur-[1px] rotate-[35deg] z-20 border-x border-foreground/5 shadow-sm" />
            <div className="absolute -bottom-4 -right-8 w-24 h-8 bg-yellow-100/40 backdrop-blur-[1px] rotate-[-55deg] z-20 border-x border-foreground/5 shadow-sm" />

            <WobblyBox className="p-2 rotate-2" shadow="lg">
              <Image 
                src={heroImg?.imageUrl || "https://picsum.photos/seed/ink-hero/800/600"} 
                alt="Hero Illustration" 
                width={800} 
                height={600} 
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                data-ai-hint="creative office"
                style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
              />
            </WobblyBox>
            <div className="absolute -bottom-6 -left-6 hidden md:block z-10">
              <WobblyBox variant="post-it" className="px-6 py-4 rotate-[-6deg]" shadow="md">
                <p className="font-body text-lg font-bold text-foreground">{t.hero.postit}</p>
              </WobblyBox>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
          {[
            { label: t.stats.projects, value: "10+" },
            { label: t.stats.coffee, value: "49" },
            { label: t.stats.clients, value: "3" },
            { label: t.stats.idle, value: "1+" },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className={`mx-auto w-24 h-24 md:w-32 md:h-32 flex items-center justify-center border-[3px] border-foreground mb-4 transition-transform group-hover:rotate-6 text-foreground ${i % 2 === 0 ? 'rotate-[-3deg]' : 'rotate-[3deg]'}`} style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}>
                <span className="text-3xl md:text-4xl font-headline">{stat.value}</span>
              </div>
              <p className="font-body text-lg md:text-xl text-foreground">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Projects Gallery */}
        <section id="projects" className="mb-32 scroll-mt-20">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl md:text-5xl font-headline text-foreground">{t.projects.title}</h2>
            <div className="hidden md:block">
              <svg width="60" height="40" viewBox="0 0 60 40" fill="none" className="stroke-foreground/20 stroke-2">
                <path d="M5,5 Q30,35 55,5" strokeLinecap="round" strokeDasharray="4,4" />
              </svg>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-20 md:gap-y-0">
            {projects.map((project, i) => (
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
        </section>

        {/* About Section */}
        <section id="about" className="mb-32 scroll-mt-20 overflow-hidden">
          <h2 className="text-4xl md:text-5xl font-headline text-foreground mb-12 text-center md:text-left">{t.about.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start mb-16">
            <div className="order-2 md:order-1 space-y-6 min-w-0">
              <p className="text-lg md:text-xl font-body leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: t.about.bio }} />
              
              <div className="pt-4 flex flex-col gap-10">
                <div className="flex justify-center md:justify-start">
                  <a href="/cv.pdf" download="CV_Portfolio.pdf">
                    <HandDrawnButton variant="secondary" size="md" className="flex items-center gap-3">
                      <FileDown size={24} /> {t.about.downloadCV}
                    </HandDrawnButton>
                  </a>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 flex flex-col items-center justify-center mb-8 md:mb-0">
              <div className="relative">
                {/* Tape Decorations */}
                <div className="absolute -top-2 -left-8 w-20 h-6 bg-yellow-100/40 backdrop-blur-[1px] rotate-[-25deg] z-20 border-x border-foreground/5 shadow-sm" />
                <div className="absolute -bottom-2 -right-16 w-20 h-6 bg-yellow-100/40 backdrop-blur-[1px] rotate-[35deg] z-20 border-x border-foreground/5 shadow-sm" />
                <div className="absolute -bottom-2 -right-8 w-20 h-6 bg-yellow-100/40 backdrop-blur-[1px] rotate-[-45deg] z-20 border-x border-foreground/5 shadow-sm" />

                <div className="w-48 h-48 md:w-80 md:h-80 border-[4px] border-foreground p-2 overflow-hidden bg-white shadow-hand-drawn rotate-3" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}>
                  <Image 
                    src="/me.png" 
                    alt="Profile Photo Noval" 
                    width={400} 
                    height={400} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    style={{ borderRadius: 'inherit' }}
                  />
                </div>
                <div className="absolute -top-4 -right-4 bg-accent text-white p-2 md:p-3 border-2 border-foreground rounded-full rotate-12">
                  <User className="w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
                </div>
              </div>
              
              {/* Profile Name */}
              <div className="mt-8 relative group">
                <WobblyBox variant="post-it" shadow="sm" className="px-6 py-2 rotate-[-2deg] group-hover:rotate-0 transition-all">
                  <span className="text-3xl md:text-4xl font-headline text-foreground">Noval Firdaus</span>
                </WobblyBox>
                {/* Scribble Underline Accessory */}
                <svg className="absolute -bottom-4 left-0 w-full h-4 text-accent/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Tech Marquee - Full Width within Container */}
          <div className="relative overflow-hidden w-full h-32 border-y-2 border-dashed border-foreground py-6">
            <div className="flex animate-marquee whitespace-nowrap items-center h-full">
              {[...techLogos, ...techLogos].map((item, i) => (
                <div key={i} className="flex flex-col items-center justify-center mx-8 md:mx-12 group min-w-max">
                  <div className="relative w-12 h-12 grayscale group-hover:grayscale-0 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300 flex items-center justify-center">
                    <Image 
                      src={item.src} 
                      alt={`Logo ${item.name}`}
                      width={48} 
                      height={48} 
                      className="object-contain"
                    />
                  </div>
                  <span className="font-headline text-xs mt-3 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 text-primary">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-32 scroll-mt-20">
          <WobblyBox decoration="tape" className="max-w-3xl mx-auto py-12 px-8" shadow="lg">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-headline mb-4 text-foreground">{t.contact.title}</h2>
              <p className="text-xl font-body text-foreground/80">{t.contact.subtitle}</p>
            </div>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-headline text-lg ml-2 text-foreground">{t.contact.name}</label>
                  <input 
                    type="text" 
                    className="w-full bg-white dark:bg-slate-900 border-[3px] border-foreground p-3 font-body text-xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-foreground"
                    placeholder={t.contact.placeholderName}
                    style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-headline text-lg ml-2 text-foreground">{t.contact.email}</label>
                  <input 
                    type="email" 
                    className="w-full bg-white dark:bg-slate-900 border-[3px] border-foreground p-3 font-body text-xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-foreground"
                    placeholder={t.contact.placeholderEmail}
                    style={{ borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px' }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-headline text-lg ml-2 text-foreground">{t.contact.message}</label>
                <textarea 
                  rows={4}
                  className="w-full bg-white dark:bg-slate-900 border-[3px] border-foreground p-4 font-body text-xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-foreground"
                  placeholder={t.contact.placeholderMessage}
                  style={{ borderRadius: '30px 30px 30px 255px / 30px 255px 30px 30px' }}
                />
              </div>
              <div className="text-center pt-4">
                <HandDrawnButton variant="accent" size="lg" className="w-full md:w-auto">
                  <span className="flex items-center justify-center gap-4">
                    {t.contact.send} <LongArrowRight />
                  </span>
                </HandDrawnButton>
              </div>
            </form>
          </WobblyBox>
        </section>

        {/* Footer */}
        <footer className="border-t-[3px] border-foreground border-dashed pt-12 pb-20">
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
            <div className="flex flex-col items-center gap-12">
              <div className="flex justify-center gap-6">
                <a href="#" className="p-3 border-2 border-foreground rounded-full hover:bg-accent hover:text-white transition-all hover:-translate-y-1 bg-background text-foreground active:scale-90">
                  <Github strokeWidth={3} />
                </a>
                <a href="#" className="p-3 border-2 border-foreground rounded-full hover:bg-primary hover:text-white transition-all hover:-translate-y-1 bg-background text-foreground active:scale-90">
                  <Linkedin strokeWidth={3} />
                </a>
                <a href="#" className="p-3 border-2 border-foreground rounded-full hover:bg-accent hover:text-white transition-all hover:-translate-y-1 bg-background text-foreground active:scale-90">
                  <Mail strokeWidth={3} />
                </a>
              </div>
              <button 
                onClick={handleBackToTop}
                className="flex items-center gap-2 font-headline text-primary hover:text-accent transition-colors group mt-4 bg-transparent border-none cursor-pointer"
              >
                <MoveUpArrow className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                {t.footer.backToTop}
              </button>
            </div>
            <div className="text-center md:text-right space-y-4">
              <div className="flex flex-col items-center md:items-end group mt-4">
                <span className="font-headline text-base text-primary -rotate-12 bg-accent/10 px-2 py-0.5 wobbly-border border border-primary/30 mb-[-12px] md:mr-4 z-10">noval</span>
                <div className="font-headline text-5xl md:text-6xl text-accent -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                  {t.footer.stayCreative}
                </div>
              </div>
            </div>
          </div>
        </footer>
        <ChatBot />
      </div>
    </>
  );
}
