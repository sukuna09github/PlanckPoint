

"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Search, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AnimatedSection } from '@/components/animated-section';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { cn } from "@/lib/utils";
import { mockResearchData } from '@/lib/constants';

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


const ResearchPage: React.FC = () => {
  const [filteredInsights, setFilteredInsights] = useState(mockResearchData);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

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
  
  const latestInsights = [...mockResearchData]
    .sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime())
    .slice(0, 5);

  const [featuredInsight, ...otherInsights] = latestInsights;

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredInsights(mockResearchData);
    } else {
      const filtered = mockResearchData.filter(insight =>
        insight.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        insight.summary?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInsights(filtered);
    }
  }, [searchTerm]);

  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground/60 font-body">Loading research...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
       <section className="bg-gradient-to-br from-primary to-secondary text-white overflow-hidden relative min-h-screen flex items-center justify-center py-20 lg:py-0">
        <div className="w-full px-4 sm:px-6 lg:px-16 2xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-16 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 2xl:col-span-6">
                  <AnimatedSection>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Advanced Research</h1>
                      <p className="mt-6 text-xl text-white/80 max-w-xl">
                        Explore our comprehensive research database featuring cutting-edge studies, white papers, and case studies that shape the future of human-technology collaboration.
                      </p>
                  </AnimatedSection>
                   <div className="mt-10 grid grid-cols-2 gap-8">
                      {otherInsights.map((insight, index) => insight && (
                          <AnimatedSection key={insight._id} delay={0.2 + index * 0.1}>
                            <Link href={`/insights/${insight._id}`} className="block h-full">
                              <div className="relative aspect-[4/3] overflow-hidden group h-full">
                                  <Image
                                      src={insight.mainImage}
                                      alt={insight.title}
                                      fill
                                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-black/40 group-hover:bg-accent/20 transition-all duration-300 flex items-end p-4 text-left">
                                      <div className="transition-opacity duration-300 group-hover:opacity-0 w-full">
                                        <p className="font-semibold text-white text-sm">{insight.title}</p>
                                      </div>
                                      <div className="absolute inset-0 flex items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                          <p className="text-white text-xs transform transition-transform duration-300 group-hover:scale-100 scale-90">{insight.summary}</p>
                                      </div>
                                  </div>
                              </div>
                            </Link>
                          </AnimatedSection>
                      ))}
                  </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-5 2xl:col-span-6 flex flex-col gap-8">
                  {featuredInsight && (
                      <AnimatedSection delay={0.1} className="flex-grow">
                           <Card className="bg-white/10 backdrop-blur-md border-white/20 h-full group flex flex-col">
                              <Link href={`/insights/${featuredInsight._id}`} className="block h-full flex flex-col">
                                <div className="relative aspect-video overflow-hidden w-full">
                                  <Image
                                      src={featuredInsight.mainImage}
                                      alt={featuredInsight.title}
                                      fill
                                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                                </div>
                                <CardHeader>
                                    <Badge variant="secondary" className="w-fit">Featured Research</Badge>
                                    <CardTitle className="!text-2xl text-white pt-2">{featuredInsight.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-white/80 line-clamp-2">{featuredInsight.summary}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="ghost" className="text-white hover:bg-white/10">Read the research <ArrowRight className="ml-2" /></Button>
                                </CardFooter>
                              </Link>
                          </Card>
                      </AnimatedSection>
                  )}
              </div>
          </div>
        </div>
      </section>

      {/* Research Categories */}
      <section className="py-24 bg-background">
        <div className="max-w-[120rem] mx-auto px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-headline font-normal text-primary mb-6">Research Categories</h2>
            <p className="text-lg font-body text-foreground/80 max-w-3xl mx-auto">
              Our research spans multiple domains, providing comprehensive insights into 
              the evolving relationship between humans and technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Digital Transformation',
                description: 'Studies on organizational change and technology adoption',
                count: '25+ Studies',
                image: 'https://static.wixstatic.com/media/61c56d_f6cd93b30bf640b3a4325a8b6b06308f~mv2.jpg'
              },
              {
                title: 'Human-AI Collaboration',
                description: 'Research on effective human-AI interaction patterns',
                count: '18+ Studies',
                image: 'https://static.wixstatic.com/media/61c56d_8801d0855b1f4ab981404fef841c824e~mv2.jpg'
              },
              {
                title: 'Workplace Analytics',
                description: 'Data-driven insights on productivity and engagement',
                count: '32+ Studies',
                image: 'https://static.wixstatic.com/media/61c56d_f6cd93b30bf640b3a4325a8b6b06308f~mv2.jpg'
              },
              {
                title: 'Future of Work',
                description: 'Emerging trends in remote and hybrid work environments',
                count: '15+ Studies',
                image: 'https://static.wixstatic.com/media/61c56d_4361fe968edb461487cc7515b778b550~mv2.jpg'
              }
            ].map((category, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <motion.div
                    className="relative overflow-hidden h-56 flex flex-col justify-end p-8 shadow-xl transition-all duration-300"
                    style={{
                      backgroundImage: `url(${category.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                    <div className="relative z-10">
                        <h3 className="text-lg font-headline font-semibold text-white mb-2 transition-colors duration-300">
                          {category.title}
                        </h3>
                        <p className="text-sm text-white/80 leading-relaxed mb-3">
                          {category.description}
                        </p>
                        <span className="text-xs font-body text-accent font-medium">
                          {category.count}
                        </span>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Research Articles */}
      <section id="research-articles" className="py-24 bg-background">
        <div className="max-w-[120rem] mx-auto px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl font-headline font-normal text-primary mb-8 text-center">
              Research Articles
            </h2>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <Input
                  type="text"
                  placeholder="Search research articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 border-foreground/20 focus:border-primary"
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
                No articles found
              </h3>
              <p className="text-base font-body text-foreground/80 mb-8">
                Try adjusting your search terms or browse all articles.
              </p>
              <Button
                onClick={() => setSearchTerm('')}
                className="bg-primary hover:bg-secondary text-primary-foreground"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredInsights.map((insight, index) => (
                <motion.div
                  key={insight._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-2 hover:scale-105 bg-white border-0 shadow-sm group cursor-pointer">
                    <Link href={`/insights/${insight._id}`} className="block h-full">
                      <CardContent className="p-0 h-full flex flex-col">
                        {insight.mainImage && (
                          <div className="overflow-hidden">
                            <Image
                              src={insight.mainImage}
                              alt={insight.title || 'Research article'}
                              className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                              width={400}
                              height={160}
                            />
                          </div>
                        )}
                        
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="mb-3">
                            <span className="text-xs font-body text-accent font-medium">
                              {formatDate(insight.publicationDate)}
                            </span>
                          </div>

                          <h3 className="text-lg font-headline font-semibold text-primary mb-3 group-hover:text-secondary transition-colors duration-300 flex-shrink-0">
                            {insight.title}
                          </h3>
                          
                          <p className="text-sm font-body text-foreground/80 mb-4 flex-1 line-clamp-2">
                            {insight.summary}
                          </p>

                          <div className="flex items-center justify-between mt-auto">
                            <span
                              
                              className="text-accent hover:underline font-semibold flex items-center"
                            >
                              Read Article
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-[120rem] mx-auto px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-headline font-bold text-primary-foreground mb-6">
              Partner with Our Research Team
            </h2>
            <p className="text-lg font-body text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
              Collaborate with our experts to conduct custom research studies tailored to your 
              organization's specific challenges and opportunities in human-technology interaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10"
              >
                <Link href="/contact">
                  Request Custom Research
                  
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="text-primary-foreground hover:bg-white/10"
                size="lg"
              >
                <Link href="/about">
                  Meet Our Researchers
                  
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ResearchPage;

    



    


    

    
