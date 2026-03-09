'use client';

import Image from 'next/image';
import { Mail, Github, Linkedin, ArrowRight, ArrowUp, User, Code, Palette, Menu, X } from 'lucide-react';
import { WobblyBox } from '@/components/ui/wobbly-box';
import { HandDrawnButton } from '@/components/ui/hand-drawn-button';
import { ProjectCard } from '@/components/ui/project-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ChatBot } from '@/components/chat-bot';
import { ThemeLanguageToggle } from '@/components/ui/theme-language-toggle';
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

export default function Home() {
  const { locale } = useAppContext();
  const t = translations[locale];
  
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
      description: locale === 'en' ? "Digital illustration series for children's books inspired by folklore." : "Seri ilustrasi digital untuk buku anak-anak yang terinspirasi dari dongeng.",
      tags: ["Illustration", "Digital Art"],
      image: PlaceHolderImages.find(img => img.id === 'project3')
    },
    {
      id: 'project4',
      title: "Inkfolio Website",
      description: locale === 'en' ? "Web portfolio development using Next.js with dynamic hand-drawn animations." : "Pengembangan portofolio web menggunakan Next.js dengan animasi coretan tangan.",
      tags: ["Web Dev", "React", "Tailwind"],
      image: PlaceHolderImages.find(img => img.id === 'project4')
    }
  ];

  return (
    <div id="top" className="max-w-5xl mx-auto px-6 py-10 relative">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-20 px-4">
        <h1 className="text-3xl md:text-4xl font-headline tracking-tight">InkFolio.</h1>
        <div className="flex items-center gap-4 md:gap-8">
          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 font-body text-xl">
            <a href="#projects" className="hover:line-through decoration-accent decoration-2 transition-all">{t.nav.projects}</a>
            <a href="#about" className="hover:line-through decoration-accent decoration-2 transition-all">{t.nav.about}</a>
            <a href="#contact" className="hover:line-through decoration-accent decoration-2 transition-all">{t.nav.contact}</a>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop Only Toggle */}
            <div className="hidden md:block">
              <ThemeLanguageToggle />
            </div>
            
            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2 border-2 border-foreground hover:bg-accent hover:text-white transition-all wobbly-border active:scale-90 duration-200 bg-background text-foreground">
                    <Menu size={24} strokeWidth={2.5} />
                  </button>
                </SheetTrigger>
                <SheetContent side="top" className="h-full w-full border-none p-0 flex flex-col paper-texture bg-background overflow-y-auto">
                  <div className="p-8 flex flex-col h-full">
                    <SheetHeader className="p-0 mb-12 flex flex-row items-center justify-between text-left space-y-0">
                      <SheetTitle className="text-3xl font-headline text-foreground">InkFolio.</SheetTitle>
                      <SheetDescription className="sr-only">Mobile navigation menu</SheetDescription>
                      <SheetClose asChild>
                        <button className="p-2 border-2 border-foreground hover:bg-accent hover:text-white transition-all wobbly-border text-foreground">
                          <X size={28} strokeWidth={2.5} />
                        </button>
                      </SheetClose>
                    </SheetHeader>

                    <div className="flex flex-col gap-8 font-body text-4xl mb-12 items-center text-center">
                      <SheetClose asChild>
                        <a href="#projects" className="hover:line-through decoration-accent decoration-4 text-foreground">{t.nav.projects}</a>
                      </SheetClose>
                      <SheetClose asChild>
                        <a href="#about" className="hover:line-through decoration-accent decoration-4 text-foreground">{t.nav.about}</a>
                      </SheetClose>
                      <SheetClose asChild>
                        <a href="#contact" className="hover:line-through decoration-accent decoration-4 text-foreground">{t.nav.contact}</a>
                      </SheetClose>
                    </div>

                    <div className="border-t-2 border-dashed border-foreground pt-8 mb-10 flex flex-col items-center">
                      <p className="font-headline text-xl mb-6 text-foreground/60 text-center">Settings & Socials</p>
                      <div className="flex flex-col gap-8 items-center w-full">
                        {/* Theme and Lang Toggles */}
                        <div className="scale-125">
                          <ThemeLanguageToggle />
                        </div>

                        {/* Social Media Links */}
                        <div className="flex gap-6 mt-4 justify-center">
                          <a href="#" className="p-4 border-2 border-foreground rounded-full hover:bg-accent hover:text-white transition-all bg-background text-foreground">
                            <Github size={24} strokeWidth={3} />
                          </a>
                          <a href="#" className="p-4 border-2 border-foreground rounded-full hover:bg-primary hover:text-white transition-all bg-background text-foreground">
                            <Linkedin size={24} strokeWidth={3} />
                          </a>
                          <a href="#" className="p-4 border-2 border-foreground rounded-full hover:bg-accent hover:text-white transition-all bg-background text-foreground">
                            <Mail size={24} strokeWidth={3} />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto text-center">
                      <p className="font-headline text-accent text-2xl -rotate-2">{t.footer.stayCreative}</p>
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
          <h2 className="text-5xl md:text-7xl font-headline leading-tight">
            {t.hero.title}
          </h2>
          <p className="text-xl md:text-2xl font-body text-foreground/80 leading-relaxed max-w-lg">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 pt-4 relative">
            <a href="#projects">
              <HandDrawnButton variant="primary" size="lg">
                {t.hero.cta}
              </HandDrawnButton>
            </a>
            <div className="hidden md:block absolute -right-24 top-0 animate-bounce-slow">
              <svg width="100" height="60" viewBox="0 0 100 60" fill="none" className="stroke-accent stroke-[2.5] fill-none">
                <path d="M10,10 Q50,5 90,50 M90,50 L80,50 M90,50 L90,40" strokeLinecap="round" strokeDasharray="5,5" />
              </svg>
              <span className="font-body text-accent block mt-2 text-center -rotate-6">{t.hero.hint}</span>
            </div>
          </div>
        </div>
        <div className="relative">
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
          { label: t.stats.projects, value: "24+" },
          { label: t.stats.coffee, value: "850" },
          { label: t.stats.clients, value: "12" },
          { label: t.stats.sketchbooks, value: "05" },
        ].map((stat, i) => (
          <div key={i} className="text-center group">
            <div className={`mx-auto w-24 h-24 md:w-32 md:h-32 flex items-center justify-center border-[3px] border-foreground mb-4 transition-transform group-hover:rotate-6 ${i % 2 === 0 ? 'rotate-[-3deg]' : 'rotate-[3deg]'}`} style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}>
              <span className="text-3xl md:text-4xl font-headline">{stat.value}</span>
            </div>
            <p className="font-body text-lg md:text-xl">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Projects Gallery */}
      <section id="projects" className="mb-32">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl md:text-5xl font-headline">{t.projects.title}</h2>
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
      <section id="about" className="mb-32">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="order-2 md:order-1 space-y-8">
            <h2 className="text-4xl md:text-5xl font-headline">{t.about.title}</h2>
            <p className="text-xl md:text-2xl font-body leading-relaxed" dangerouslySetInnerHTML={{ __html: t.about.bio }} />
            <div className="grid grid-cols-2 gap-4">
              <WobblyBox variant="post-it" className="rotate-2" shadow="sm">
                <Palette className="mb-2 text-accent" size={24} strokeWidth={3} />
                <h4 className="font-headline text-lg text-foreground">{t.about.design}</h4>
                <p className="font-body text-sm text-foreground/70">{t.about.designSkills}</p>
              </WobblyBox>
              <WobblyBox variant="post-it" className="-rotate-2" shadow="sm">
                <Code className="mb-2 text-primary" size={24} strokeWidth={3} />
                <h4 className="font-headline text-lg text-foreground">{t.about.code}</h4>
                <p className="font-body text-sm text-foreground/70">{t.about.codeSkills}</p>
              </WobblyBox>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 border-[4px] border-foreground p-2 overflow-hidden bg-white shadow-hand-drawn rotate-3" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}>
                <Image 
                  src="https://picsum.photos/seed/ink-profile/400/400" 
                  alt="Profile" 
                  width={400} 
                  height={400} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  style={{ borderRadius: 'inherit' }}
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-accent text-white p-3 border-2 border-foreground rounded-full rotate-12">
                <User size={32} strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mb-32">
        <WobblyBox decoration="tack" className="max-w-3xl mx-auto py-12 px-8" shadow="lg">
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
                {t.contact.send} <ArrowRight className="inline ml-2" />
              </HandDrawnButton>
            </div>
          </form>
        </WobblyBox>
      </section>

      {/* Footer */}
      <footer className="border-t-[3px] border-foreground border-dashed pt-12 pb-20">
        <div className="grid md:grid-cols-3 gap-12 items-center text-center md:text-left">
          <div className="space-y-4">
            <h2 className="text-3xl font-headline">InkFolio.</h2>
            <p className="font-body text-xl">{t.footer.tagline}</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center gap-6">
              <a href="#" className="p-3 border-2 border-foreground rounded-full hover:bg-accent hover:text-white transition-all hover:-translate-y-1 bg-background text-foreground">
                <Github strokeWidth={3} />
              </a>
              <a href="#" className="p-3 border-2 border-foreground rounded-full hover:bg-primary hover:text-white transition-all hover:-translate-y-1 bg-background text-foreground">
                <Linkedin strokeWidth={3} />
              </a>
              <a href="#" className="p-3 border-2 border-foreground rounded-full hover:bg-accent hover:text-white transition-all hover:-translate-y-1 bg-background text-foreground">
                <Mail strokeWidth={3} />
              </a>
            </div>
            <a href="#top" className="flex items-center gap-2 font-headline text-primary hover:text-accent transition-colors group">
              <ArrowUp size={20} strokeWidth={3} className="group-hover:-translate-y-1 transition-transform" />
              {t.footer.backToTop}
            </a>
          </div>
          <div className="text-center md:text-right space-y-2">
            <p className="font-body text-lg">{t.footer.copyright}</p>
            <div className="font-headline text-2xl text-accent -rotate-2">{t.footer.stayCreative}</div>
          </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
}
