
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { LEADERSHIP_TEAM, BOARD_OF_ADVISORS } from "@/lib/constants";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AnimatedSection } from "@/components/animated-section";
import { GlobalPresence } from "@/components/pages/home/global-presence";
import { StackedCardDeck } from "@/components/stacked-card-deck";

export default function AboutPage() {
  const teamImages = PlaceHolderImages.filter(img => LEADERSHIP_TEAM.some(i => i.imageId === img.id));
  const findImage = (imageId: string) => teamImages.find(img => img.id === imageId);

  const heroImage = {
    description: "Hand holding a jar of stars",
    imageUrl: "https://images.pexels.com/photos/2098428/pexels-photo-2098428.jpeg",
    imageHint: "hand stars"
  };

  const values = [
    { title: "Clarity", description: "We seek truth and provide clarity through rigorous, data-driven analysis." },
    { title: "Integrity", description: "Our work is guided by strong ethical principles and a commitment to intellectual honesty." },
    { title: "Impact", description: "We are dedicated to creating positive, measurable impact for our clients and society." },
  ];
  
  const heroImageUrl = "https://images.pexels.com/photos/2098428/pexels-photo-2098428.jpeg";

  return (
    <main>
      <section className="relative w-full h-screen overflow-hidden">
        {heroImage && (
            <Image
                src={heroImageUrl}
                alt={heroImage.description}
                fill
                className="object-cover object-center"
                data-ai-hint={heroImage.imageHint}
                priority
            />
        )}
        <div className="absolute inset-0 bg-accent/20"></div>
        
        <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="font-bold uppercase tracking-widest text-white">
                <h1 className="text-[calc(2.25rem+5px)] md:text-[calc(3.75rem+5px)] lg:text-[calc(6rem+5px)] font-normal bg-cover bg-center text-transparent bg-clip-text" style={{ backgroundImage: `url(${heroImageUrl})`, textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                    Quantum
                </h1>
                <h2 className="text-2xl md:text-3xl font-normal">
                    Origins
                </h2>
                
                <div className="mt-4">
                    <h1 className="text-[calc(2.25rem+5px)] md:text-[calc(3.75rem+5px)] lg:text-[calc(6rem+5px)] font-normal bg-cover bg-center text-transparent bg-clip-text" style={{ backgroundImage: `url(${heroImageUrl})`, textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                        Infinite
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-normal">
                        DESTINIES
                    </h2>
                </div>
            </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-white text-primary">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Our Guiding Philosophy</h2>
              <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto">
                At Planckpoint, we believe in a pragmatic approach to innovation. Our strategy is simple yet powerful: dedicate 20% of our efforts to pioneering research that pushes boundaries, and channel a focused 80% into robust production that delivers real-world value to our clients today. This balance ensures we remain at the cutting edge while delivering reliable, impactful solutions.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="who-we-are" className="py-20 lg:py-24 bg-background relative">
        <div className="absolute inset-0 moving-gradient -z-0"></div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <AnimatedSection>
              <div className="text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">
                <h2 className="text-3xl font-bold">Who We Are</h2>
                <p className="mt-4 text-white/90 text-lg">Planckpoint was founded on the principle that technology's true potential is only unlocked when its human dimension is fully understood and integrated. We provide the methodologies and tools to measure what has long been considered immeasurable: the nuanced, complex, and powerful impact of people in the technological ecosystem.</p>
                <p className="mt-4 text-white/90 text-lg">Our mission is to empower organizations to build better products, foster healthier work cultures, and make more informed strategic decisions by placing human insight at the core of their operations.</p>
              </div>
            </AnimatedSection>
            <div className="min-h-[450px] lg:min-h-[500px]">
              <AnimatedSection>
                <StackedCardDeck items={values} />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
      
      <section id="leadership" className="py-20 lg:py-24 bg-background border-t">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Leadership</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">The minds behind our mission, guiding our strategy and innovation.</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {LEADERSHIP_TEAM.map((member, index) => {
              const image = findImage(member.imageId);
              return (
                <AnimatedSection key={member.name} delay={index * 0.1}>
                  <Card className="text-center h-full">
                    <CardContent className="pt-6">
                      <div className="relative h-32 w-32 mx-auto overflow-hidden">
                        {image && <Image src={image.imageUrl} alt={member.name} fill className="object-cover" data-ai-hint={image.imageHint} />}
                      </div>
                      <h3 className="mt-4 text-xl font-bold">{member.name}</h3>
                      <p className="text-primary font-medium">{member.role}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
      
      <section id="advisors" className="py-20 lg:py-24 bg-gradient-to-r from-primary to-accent text-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Board of Advisors</h2>
              <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">Industry luminaries who provide strategic counsel and invaluable perspective.</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {BOARD_OF_ADVISORS.map((advisor, index) => (
              <AnimatedSection key={advisor.name} delay={index * 0.1}>
                <Card className="text-center bg-white/10 border-white/20 text-background backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white">{advisor.name}</h3>
                    <p className="text-accent-foreground/80">{advisor.role}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GlobalPresence />

    </main>
  );
}
