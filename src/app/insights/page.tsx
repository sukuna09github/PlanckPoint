

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { INSIGHTS_TEASER_CARDS as LATEST_INSIGHTS, RESEARCH_CATEGORIES, mockResearchData } from "@/lib/constants";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AnimatedSection } from "@/components/animated-section";
import { ArrowRight, Search, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { cn } from "@/lib/utils";

const personalEmailProviders = [
  'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com', 'icloud.com', 'msn.com', 'live.com'
];

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }).refine(
    (email) => {
      const domain = email.split('@')[1];
      return !personalEmailProviders.includes(domain.toLowerCase());
    },
    { message: 'Please use a corporate email address.' }
  ),
});


export default function InsightsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('New subscription:', values.email);
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    form.reset();
  }


  const insightImages = PlaceHolderImages.filter(img => LATEST_INSIGHTS.some(i => i.imageId === img.id));
  const findImage = (imageId: string) => insightImages.find(img => img.id === imageId);

  const heroCollageImages = [
    { id: 'hero-main-article', gridClass: 'col-span-3 row-span-2' },
    { id: 'hero-blog-1', gridClass: 'col-span-2' },
    { id: 'hero-case-study', gridClass: 'col-span-2' },
    { id: 'hero-blog-2', gridClass: 'col-span-2' },
    { id: 'hero-tech-ai', gridClass: 'col-span-1' },
  ];

  const featuredInsight = LATEST_INSIGHTS[0];
  const otherInsights = LATEST_INSIGHTS.slice(1, 5);

  const introArtImage = PlaceHolderImages.find(p => p.id === 'insights-intro-art');
  const findCategoryImage = (imageId: string) => PlaceHolderImages.find(img => img.id === imageId);


  const categories = ["all", ...Array.from(new Set(LATEST_INSIGHTS.map(i => i.category)))];

  const filteredInsights = LATEST_INSIGHTS.filter(insight => {
    const matchesCategory = filterCategory === 'all' || insight.category === filterCategory;
    const matchesSearch = searchTerm === '' || insight.title.toLowerCase().includes(searchTerm.toLowerCase()) || insight.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <main className="bg-background">
      <section className="bg-gradient-to-br from-primary to-secondary text-white overflow-hidden relative min-h-screen flex items-center justify-center py-20 lg:py-0">
        <div className="w-full px-4 sm:px-6 lg:px-16 2xl:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-16 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 2xl:col-span-6">
                  <AnimatedSection>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Unlocking Tomorrow's Insights</h1>
                      <p className="mt-6 text-xl text-white/80 max-w-xl">
                        Dive into our ecosystem of analysis, where data-driven narratives and forward-thinking research converge to shape the future.
                      </p>
                  </AnimatedSection>
                   <div className="mt-10 grid grid-cols-2 gap-8">
                      {otherInsights.map((insight, index) => {
                        const image = findImage(insight.imageId)
                        return (
                          insight && (
                          <AnimatedSection key={insight._id} delay={0.2 + index * 0.1}>
                              <div className="relative aspect-[4/3] overflow-hidden group h-full">
                                  {image && <Image
                                      src={image.imageUrl}
                                      alt={insight.title}
                                      fill
                                      className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
                                  />}
                                  <div className="absolute inset-0 bg-black/40 group-hover:bg-accent/20 transition-all duration-300 flex items-end p-4 text-left">
                                    <div className="transition-opacity duration-300 group-hover:opacity-0 w-full">
                                      <p className="font-semibold text-white text-sm">{insight.title}</p>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-white text-xs transform transition-transform duration-300 group-hover:scale-100 scale-90 line-clamp-3">{insight.description}</p>
                                    </div>
                                  </div>
                              </div>
                          </AnimatedSection>
                      ))})}
                  </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-5 2xl:col-span-6 flex flex-col gap-8">
                  {featuredInsight && (
                      <AnimatedSection delay={0.1} className="flex-grow">
                           <Card className="bg-white/10 backdrop-blur-md border-white/20 h-full group flex flex-col">
                           {(() => {
                              const image = findImage(featuredInsight.imageId);
                              return (
                                <div className="relative aspect-video overflow-hidden w-full">
                                {image && <Image
                                    src={image.imageUrl}
                                    alt={featuredInsight.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />}
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                              </div>
                              );
                            })()}
                              
                              <CardHeader>
                                  <Badge variant="secondary" className="w-fit">Case Study</Badge>
                                  <CardTitle className="!text-2xl text-white pt-2">{featuredInsight.title}</CardTitle>
                              </CardHeader>
                              <CardContent className="flex-grow">
                                  <p className="text-white/80 line-clamp-2">{featuredInsight.description}</p>
                              </CardContent>
                              <CardFooter>
                                  <Button variant="ghost" className="text-white hover:bg-white/10">Read the case study <ArrowRight className="ml-2" /></Button>
                              </CardFooter>
                          </Card>
                      </AnimatedSection>
                  )}
              </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="grid md:grid-cols-5 items-center gap-12">
            <div className="md:col-span-2 px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <h2 className="text-3xl font-bold">The Pulse of Progress</h2>
                    <p className="mt-4 text-muted-foreground text-lg">Stay ahead of the curve with our expert analysis on technology, strategy, and human-centric innovation.</p>
                    <Link href="/research" className="text-primary font-semibold hover:underline flex items-center mt-6 w-fit">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </AnimatedSection>
            </div>
            <div className="md:col-span-3">
                <AnimatedSection delay={0.2}>
                  {introArtImage && (
                    <div className="aspect-video relative w-full overflow-hidden">
                      <Image
                          src={introArtImage.imageUrl}
                          alt={introArtImage.description}
                          fill
                          className="object-cover"
                          data-ai-hint={introArtImage.imageHint}
                      />
                    </div>
                  )}
                </AnimatedSection>
            </div>
        </div>
      </section>
      
      <section className="py-24 bg-background">
        <div className="max-w-[120rem] mx-auto px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-headline font-normal text-primary mb-6">Insights Categories</h2>
            <p className="text-lg font-body text-foreground/80 max-w-3xl mx-auto">
              Our insights span multiple domains, providing comprehensive analysis into 
              the evolving relationship between humans and technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {RESEARCH_CATEGORIES.slice(0, 6).map((category, index) => {
                const image = findCategoryImage(category.imageId);
                return (
                    <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                    >
                      <Link href="/research" className="block h-full">
                        <Card className="h-full overflow-hidden relative aspect-[4/5] border-0 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-accent/10">
                          {image && (
                            <Image
                              src={image.imageUrl}
                              alt={category.name || 'Research category'}
                              fill
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 blur-sm"
                              data-ai-hint={image.imageHint}
                            />
                          )}
                           <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300"></div>
                          <CardContent className="relative flex flex-col h-full items-center justify-center p-6 text-center text-white">
                            <h3 className="text-2xl font-headline font-semibold text-white mb-2 group-hover:text-accent-foreground transition-colors duration-300">
                                {category.name}
                            </h3>
                            <p className="text-base font-body text-white/80">
                                {category.description}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                )
            })}
            </div>
        </div>
      </section>

      <section id="research-articles" className="py-24 bg-background">
        <div className="max-w-[120rem] mx-auto px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl font-headline font-bold text-primary mb-8 text-center">
              Latest Insights
            </h2>
            
            <div className="max-w-xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <Input
                  type="search"
                  placeholder="Search insights..."
                  className="pl-12 pr-4 py-3 h-12 border-foreground/20 focus:border-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </motion.div>

          {filteredInsights.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-headline font-semibold text-primary mb-4">
                No insights found
              </h3>
              <p className="text-base font-body text-foreground/80 mb-8">
                Try adjusting your search terms or browse all articles.
              </p>
              <Button
                onClick={() => {setSearchTerm(''); setFilterCategory('all')}}
                className="bg-primary hover:bg-secondary text-primary-foreground"
              >
                Clear Search & Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredInsights.slice(0, 6).map((insight, index) => {
                const image = findImage(insight.imageId);
                return (
                <motion.div
                  key={insight.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-2 hover:scale-105 bg-white border-0 shadow-sm group cursor-pointer">
                    <Link href={`/research`} className="block h-full">
                      <CardContent className="p-0 h-full flex flex-col">
                        {image && (
                          <div className="overflow-hidden">
                            <Image
                              src={image.imageUrl}
                              alt={insight.title || 'Research article'}
                              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                              width={400}
                              height={192}
                              data-ai-hint={image.imageHint}
                            />
                          </div>
                        )}
                        
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="mb-3">
                            <span className="text-xs font-body text-accent font-medium uppercase">
                              {insight.category}
                            </span>
                          </div>

                          <h3 className="text-lg font-headline font-semibold text-primary mb-3 group-hover:text-secondary transition-colors duration-300 flex-shrink-0">
                            {insight.title}
                          </h3>
                          
                          <p className="text-sm font-body text-foreground/80 mb-4 flex-1 line-clamp-2">
                            {insight.description}
                          </p>

                          <div className="flex items-center justify-between mt-auto">
                            <div
                              className="text-accent hover:text-accent hover:bg-accent/10 p-0 h-auto font-body font-semibold flex items-center"
                            >
                              Read Article
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                </motion.div>
              )})}
            </div>
          )}

          <AnimatedSection className="mt-20 text-center" delay={0.3}>
            <Button size="lg" asChild>
              <Link href="/research">View All Research</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );

    

    



    

    
