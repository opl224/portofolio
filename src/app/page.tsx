import Image from 'next/image';
import { Mail, Github, Linkedin, ExternalLink, ArrowRight, User, Code, Palette, Briefcase } from 'lucide-react';
import { WobblyBox } from '@/components/ui/wobbly-box';
import { HandDrawnButton } from '@/components/ui/hand-drawn-button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero');
  const projectImages = PlaceHolderImages.filter(img => img.id.startsWith('project'));

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-20 px-4">
        <h1 className="text-3xl md:text-4xl font-headline tracking-tight">InkFolio.</h1>
        <div className="hidden md:flex gap-8 font-body text-xl">
          <a href="#projects" className="hover:line-through decoration-accent decoration-2">Projects</a>
          <a href="#about" className="hover:line-through decoration-accent decoration-2">About</a>
          <a href="#contact" className="hover:line-through decoration-accent decoration-2">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center mb-32">
        <div className="space-y-6">
          <WobblyBox variant="accent" className="inline-block px-4 py-1 mb-2 -rotate-2" shadow="sm">
            <span className="text-accent font-headline">Available for work!</span>
          </WobblyBox>
          <h2 className="text-5xl md:text-7xl font-headline leading-tight">
            I sketch <span className="text-primary italic">digital</span> experiences.
          </h2>
          <p className="text-xl md:text-2xl font-body text-foreground/80 leading-relaxed max-w-lg">
            A designer and developer who values human touch over clinical precision. Creating wobbly, authentic, and memorable products.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 pt-4 relative">
            <HandDrawnButton variant="primary" size="lg">
              See my work
            </HandDrawnButton>
            <div className="hidden md:block absolute -right-24 top-0 animate-bounce-slow">
              <svg width="100" height="60" viewBox="0 0 100 60" fill="none" className="stroke-accent stroke-[2.5] fill-none">
                <path d="M10,10 Q50,5 90,50 M90,50 L80,50 M90,50 L90,40" strokeLinecap="round" strokeDasharray="5,5" />
              </svg>
              <span className="font-body text-accent block mt-2 text-center -rotate-6">Click me!</span>
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
              <p className="font-body text-lg font-bold">"Design should feel alive!"</p>
            </WobblyBox>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
        {[
          { label: "Projects Done", value: "24+" },
          { label: "Coffee Cups", value: "850" },
          { label: "Satisfied Clients", value: "12" },
          { label: "Sketchbooks Filled", value: "05" },
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
          <h2 className="text-4xl md:text-5xl font-headline">Selected Projects</h2>
          <div className="hidden md:block">
            <svg width="60" height="40" viewBox="0 0 60 40" fill="none" className="stroke-foreground/20 stroke-2">
              <path d="M5,5 Q30,35 55,5" strokeLinecap="round" strokeDasharray="4,4" />
            </svg>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {projectImages.map((project, i) => (
            <div key={project.id} className={`group ${i % 2 !== 0 ? 'md:mt-12' : ''}`}>
              <WobblyBox 
                decoration={i === 0 ? "tape" : "none"} 
                className={`overflow-hidden p-0 mb-6 transition-transform group-hover:scale-[1.02] ${i % 2 === 0 ? 'rotate-[-1deg]' : 'rotate-[1deg]'}`}
              >
                <div className="relative aspect-video">
                  <Image 
                    src={project.imageUrl} 
                    alt={project.description} 
                    fill 
                    className="object-cover"
                    data-ai-hint={project.imageHint}
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <HandDrawnButton variant="accent" size="sm">
                      View Details
                    </HandDrawnButton>
                  </div>
                </div>
              </WobblyBox>
              <div className="flex justify-between items-start px-2">
                <div>
                  <h3 className="text-2xl md:text-3xl font-headline mb-2">Project {i + 1} Name</h3>
                  <div className="flex gap-2">
                    <span className="font-body text-sm bg-secondary px-2 border border-foreground rounded-full">Branding</span>
                    <span className="font-body text-sm bg-secondary px-2 border border-foreground rounded-full">Web Design</span>
                  </div>
                </div>
                <div className="p-2 border-2 border-foreground rounded-full hover:bg-primary hover:text-white transition-colors">
                  <ExternalLink size={20} strokeWidth={3} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="mb-32">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="order-2 md:order-1 space-y-8">
            <h2 className="text-4xl md:text-5xl font-headline">Who am I?</h2>
            <p className="text-xl md:text-2xl font-body leading-relaxed">
              I'm a human first, a designer second. I believe that digital tools shouldn't strip away the warmth and personality of hand-crafted work. 
              <br/><br/>
              My journey started with a pencil and a piece of paper, and though I use modern software now, I still think with my hands. I love creating messy prototypes that lead to beautiful, functional outcomes.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <WobblyBox variant="post-it" className="rotate-2" shadow="sm">
                <Palette className="mb-2 text-accent" size={24} strokeWidth={3} />
                <h4 className="font-headline text-lg">Design</h4>
                <p className="font-body text-sm">UI/UX, Branding, Illustration</p>
              </WobblyBox>
              <WobblyBox variant="post-it" className="-rotate-2" shadow="sm">
                <Code className="mb-2 text-primary" size={24} strokeWidth={3} />
                <h4 className="font-headline text-lg">Code</h4>
                <p className="font-body text-sm">Next.js, Tailwind, TypeScript</p>
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
                  className="w-full h-full object-cover"
                  style={{ borderRadius: 'inherit' }}
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-accent text-white p-3 border-2 border-foreground rounded-full rotate-12">
                <User size={32} strokeWidth={3} />
              </div>
              <svg width="120" height="120" className="absolute -bottom-10 -left-10 text-foreground/10" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                <path d="M50,10 L50,90 M10,50 L90,50" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mb-32">
        <WobblyBox decoration="tack" className="max-w-3xl mx-auto py-12 px-8" shadow="lg">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-headline mb-4">Let's Scribble Something!</h2>
            <p className="text-xl font-body">Got a project in mind or just want to say hi?</p>
          </div>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-headline text-lg ml-2">Your Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white border-[3px] border-foreground p-3 font-body text-xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                  placeholder="e.g. John Doe"
                  style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
                />
              </div>
              <div className="space-y-2">
                <label className="font-headline text-lg ml-2">Your Email</label>
                <input 
                  type="email" 
                  className="w-full bg-white border-[3px] border-foreground p-3 font-body text-xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                  placeholder="hello@world.com"
                  style={{ borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px' }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-headline text-lg ml-2">The Message</label>
              <textarea 
                rows={4}
                className="w-full bg-white border-[3px] border-foreground p-4 font-body text-xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                placeholder="What's on your mind?..."
                style={{ borderRadius: '30px 30px 30px 255px / 30px 255px 30px 30px' }}
              />
            </div>
            <div className="text-center pt-4">
              <HandDrawnButton variant="accent" size="lg" className="w-full md:w-auto">
                Send Message <ArrowRight className="inline ml-2" />
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
            <p className="font-body text-xl">Drawn with love and coffee.</p>
          </div>
          <div className="flex justify-center gap-6">
            <a href="#" className="p-3 border-2 border-foreground rounded-full hover:bg-accent hover:text-white transition-all hover:-translate-y-1">
              <Github strokeWidth={3} />
            </a>
            <a href="#" className="p-3 border-2 border-foreground rounded-full hover:bg-primary hover:text-white transition-all hover:-translate-y-1">
              <Linkedin strokeWidth={3} />
            </a>
            <a href="#" className="p-3 border-2 border-foreground rounded-full hover:bg-accent hover:text-white transition-all hover:-translate-y-1">
              <Mail strokeWidth={3} />
            </a>
          </div>
          <div className="text-center md:text-right space-y-2">
            <p className="font-body text-lg">© 2024 InkFolio Studio</p>
            <div className="font-headline text-2xl text-accent -rotate-2">Stay Creative!</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
