
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe, Users, Building2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { INSIGHTS_TEASER_CARDS, WHAT_WE_DO_CARDS, PRODUCTS, RESEARCH_ARTICLES } from "@/lib/constants";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AnimatedSection } from "@/components/animated-section";
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const heroSlides = [
    {
      video: "/videos/hero.mp4",
      headline: 'The Psychology of UI: How Color and Shape Influence User Behavior.',
      id: 'mock-1'
    },
    {
      video: "/videos/hero.mp4",
      headline: 'AI in 2025: Predicting the Next Wave of Disruptive Innovation.',
      id: 'mock-2'
    }
  ];

  const insights = INSIGHTS_TEASER_CARDS.slice(0, 5);
  const findImage = (imageId: string) => PlaceHolderImages.find(img => img.id === imageId);
  const whatWeDoImages = PlaceHolderImages.filter(img => WHAT_WE_DO_CARDS.some(i => i.imageId === img.id));
  const findWhatWeDoImage = (imageId: string) => whatWeDoImages.find(img => img.id === imageId);
  
  const latestResearch = [...RESEARCH_ARTICLES]
    .sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime())
    .slice(0, 6);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length, isClient]);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative w-full h-screen flex items-center text-left overflow-hidden">
        <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
        >
            <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm"></div>

        <div className="relative z-10 w-full mx-auto px-6 sm:px-8 lg:px-16">
          {isClient ? (
            <AnimatePresence mode="wait">
                 <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.7 }}
                >
                    <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-headline text-white mb-6 leading-tight max-w-3xl">
                        {heroSlides[currentSlide].headline}
                    </h1>
                    <Link href={`/insights/${heroSlides[currentSlide].id}`} className="text-white font-semibold hover:underline flex items-center w-fit">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </motion.div>
            </AnimatePresence>
          ) : (
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-headline text-white mb-6 leading-tight max-w-3xl">
                Reimagining the future of business with AI-driven digital workforces.
              </h1>
              <Link href={`/insights/${heroSlides[0].id}`} className="text-white font-semibold hover:underline flex items-center w-fit">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          )}
        </div>
      </section>

        <section className="py-24 bg-background">
          <div className="max-w-[120rem] mx-auto px-16">
            <AnimatedSection
              className="text-center mb-16"
            >
              <h2
                className="text-4xl font-headline font-normal text-primary mb-6"
              >
                What We Do
              </h2>
              <p className="text-lg font-body text-foreground/80 max-w-3xl mx-auto">
                We provide strategic consulting and research services that help organizations navigate 
                the complex intersection of human behavior and technology.
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {WHAT_WE_DO_CARDS.map((service, index) => {
                const image = findWhatWeDoImage(service.imageId);
                return(
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ y: -8 }}
                    className="group"
                  >
                    <motion.div
                      className="relative overflow-hidden h-80 flex flex-col justify-between p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                      style={{
                        backgroundImage: image ? `url(${image.imageUrl})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    >
                      <div className="absolute inset-0 backdrop-blur-xl bg-black/30 pointer-events-none" />
                      <div className="relative z-10 flex flex-col justify-between h-full">
                        <motion.div
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <h3 className="text-2xl font-semibold text-white mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                            {service.title}
                          </h3>
                          <p className="text-sm text-accent font-medium mb-4">Strategic Research</p>
                          <p className="text-sm text-white/90 leading-relaxed line-clamp-2">
                            {service.description}
                          </p>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Button
                            className="w-full px-6 py-2.5 text-white font-medium text-sm transition-all duration-300 hover:bg-white/20"
                            variant="ghost"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                          >
                            Learn More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-[120rem] mx-auto px-4 sm:px-8 lg:px-16">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl font-headline font-normal text-primary mb-6">Our Products</h2>
              <p className="text-lg font-body text-foreground/80 max-w-3xl mx-auto">
                Innovative solutions designed to bridge the gap between human potential and technological advancement.
              </p>
            </AnimatedSection>
            
            <AnimatedSection>
              <Carousel
                opts={{ align: "start", loop: true }}
                plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
                className="w-full"
              >
                <CarouselContent className="-ml-4 sm:-ml-8">
                  {PRODUCTS.map((product) => {
                    const image = findImage(product.imageId);
                    return (
                      <CarouselItem key={product.id} className="pl-4 sm:pl-8 md:basis-1/2 lg:basis-1/3">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          viewport={{ once: true, amount: 0.5 }}
                          className="group h-full"
                        >
                          <div className="bg-white overflow-hidden shadow-sm hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 hover:-translate-y-2 flex flex-row h-64 sm:h-72 lg:h-80 group/card">
                            <div className="flex-1 relative overflow-hidden flex flex-col justify-between p-6 sm:p-7 lg:p-8">
                              {image && (
                                <div 
                                  className="absolute inset-0 blur-xl opacity-40"
                                  style={{
                                    backgroundImage: `url(${image.imageUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                  }}
                                />
                              )}
                              
                              <div className="absolute inset-0 bg-black/50" />

                              <div className="relative z-10 flex flex-col justify-between h-full">
                                <h3 className="text-lg sm:text-xl font-headline font-semibold text-white mb-2 group-hover/card:text-accent transition-colors duration-300 line-clamp-1">
                                  {product.name}
                                </h3>

                                <p className="text-sm sm:text-base font-body text-white/90 mb-6 line-clamp-2 flex-1">
                                  {product.description}
                                </p>

                                <Link href={`/products#${product.id}`} className="text-white font-semibold hover:underline flex items-center">
                                    Learn More
                                    <ArrowRight className="w-3 h-3 ml-2" />
                                </Link>
                              </div>
                            </div>

                            <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
                              {image ? (
                                <Image
                                  src={image.imageUrl}
                                  alt={product.name || 'Product'}
                                  width={400}
                                  height={300}
                                  data-ai-hint={image.imageHint}
                                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <span className="text-sm font-body text-foreground/40">Product Image</span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      </CarouselItem>
                    )
                  })}
                </CarouselContent>
              </Carousel>
            </AnimatedSection>
            
            <div className="text-center mt-14">
              <Button
                asChild
                className="bg-primary hover:bg-secondary text-primary-foreground px-8 py-3 transition-all duration-300 font-medium"
              >
                <Link href="/products">
                  View All Products
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

      <section className="py-24 bg-background">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-8 lg:px-16">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-normal text-foreground">
                Latest Research
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our newest publications and analysis.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection className="mt-16" delay={0.2}>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
              className="w-full"
            >
              <CarouselContent className="-ml-4 sm:-ml-8">
                {latestResearch.map((insight) => {
                  const image = findImage(insight.imageId);
                  return (
                    <CarouselItem key={insight.title} className="pl-4 sm:pl-8 md:basis-1/2 lg:basis-1/3">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true, amount: 0.5 }}
                        className="group h-full"
                      >
                      <Link href={`/insights/${insight._id}`} className="block group h-full">
                        <div className="bg-white overflow-hidden shadow-sm hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full group/card">
                          <div className="flex-1 relative overflow-hidden flex flex-col justify-between">
                            {image && (
                               <div className="aspect-video relative w-full overflow-hidden">
                                <Image
                                  src={image.imageUrl}
                                  alt={insight.title}
                                  fill
                                  className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                                  data-ai-hint={image.imageHint}
                                />
                               </div>
                            )}
                            
                            <div className="relative z-10 flex flex-col flex-grow p-6">
                              <Badge variant="secondary" className="mb-2 uppercase text-xs font-semibold tracking-wider w-fit">
                                {insight.category}
                              </Badge>

                              <h3 className="text-lg font-headline font-semibold text-primary mb-2 group-hover/card:text-accent transition-colors duration-300 flex-grow">
                                {insight.title}
                              </h3>

                              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                {insight.summary}
                              </p>

                              <span className="text-primary font-semibold hover:underline flex items-center mt-auto">
                                  Read more
                                  <ArrowRight className="w-3 h-3 ml-2" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                      </motion.div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </AnimatedSection>
          <AnimatedSection className="mt-12 text-center" delay={0.4}>
            <Button size="lg" asChild>
              <Link href="/research">Explore All Research</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

        <section className="py-24 bg-primary">
          <div className="max-w-[120rem] mx-auto px-16">
            <AnimatedSection
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-headline font-normal text-primary-foreground mb-6">Global Presence</h2>
              <p className="text-lg font-body text-primary-foreground/80 max-w-3xl mx-auto">
                With offices around the world, we're positioned to serve clients across all major markets 
                and time zones.
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-headline font-semibold text-primary-foreground mb-2">15+</h3>
                <p className="text-primary-foreground/80 font-body">Countries Served</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-headline font-semibold text-primary-foreground mb-2">8</h3>
                <p className="text-primary-foreground/80 font-body">Global Offices</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-headline font-semibold text-primary-foreground mb-2">200+</h3>
                <p className="text-primary-foreground/80 font-body">Expert Consultants</p>
              </motion.div>
            </div>

            <div className="text-center mt-12">
              <Button
                asChild
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3"
              >
                <Link href="/about">
                  Learn About Our Team
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
};

export default HomePage;

    