

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/constants";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { DecipherText } from '@/components/decipher-text';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/animated-section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';


const ProductsPage: React.FC = () => {
  const products = PRODUCTS.slice(0, 6);
  const [loading, setLoading] = useState(true);
  const [animatingHeaders, setAnimatingHeaders] = useState<Set<string>>(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const findProductImage = (imageId: string) => {
    return PlaceHolderImages.find(p => p.id === imageId);
  };
  
  const heroBgImage = PlaceHolderImages.find(p => p.id === 'product-hero-background');
  const introArtImage = PlaceHolderImages.find(p => p.id === 'page-intro-art');

  useEffect(() => {
    setLoading(false);
  }, []);

  // Autoplay logic
  useEffect(() => {
    if (!isAutoplay || products.length === 0) return;

    autoplayTimer.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 6000);

    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [isAutoplay, products.length]);

  const handleMouseEnter = () => setIsAutoplay(false);
  const handleMouseLeave = () => setIsAutoplay(true);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    dragStartX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const endX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = dragStartX.current - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev + 1) % products.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
      }
    }
  };

  // Handle hash-based scrolling when the page loads or hash changes
  useEffect(() => {
    if (loading) return;

    const hash = window.location.hash.slice(1); // Remove the '#' character
    if (hash) {
      // Small delay to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname, loading]);

  // Trigger header animations when cards fade in
  const handleCardFadeIn = (productId: string) => {
    setAnimatingHeaders((prev) => new Set(prev).add(productId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with 2-Column Layout */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: heroBgImage ? `url(${heroBgImage.imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient Overlay - Darker left, lighter right */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-accent/20 pointer-events-none" />

        <div className="relative w-full px-6 sm:px-8 lg:px-16 2xl:px-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="z-10 text-center md:text-left"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline text-primary-foreground mb-6 leading-tight">
                Intelligent Systems. Real-World Outcomes
              </h1>
              <p className="text-lg md:text-xl font-body text-primary-foreground/90 leading-relaxed max-w-xl mx-auto md:mx-0">
                Innovative solutions designed to bridge the gap between human potential and technological advancement. Explore our suite of products crafted for modern enterprises.
              </p>
            </motion.div>

            {/* Right Column - Product Slider */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="relative h-[24rem] sm:h-[30rem] md:h-[32rem] lg:h-[36rem] z-10"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseDown={handleDragStart}
              onMouseUp={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchEnd={handleDragEnd}
            >
              <AnimatePresence mode="sync">
                {products.map((product, index) => {
                  const position = (index - currentSlide + products.length) % products.length;
                  const isActive = position === 0;
                  const isNext = position === 1;
                  const isPrev = position === products.length - 1;
                  const productImage = findProductImage(product.imageId);

                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.8, x: 100 }}
                      animate={{
                        opacity: isActive ? 1 : isNext ? 0.4 : isPrev ? 0.2 : 0,
                        scale: isActive ? 1 : isNext ? 0.92 : isPrev ? 0.85 : 0.8,
                        x: isActive ? 0 : isNext ? 100 : isPrev ? -100 : 100,
                        zIndex: isActive ? 30 : isNext ? 20 : isPrev ? 10 : 0,
                      }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className="absolute inset-0 w-full h-full"
                    >
                      {/* Glassmorphism Card */}
                      <Link
                        href={isActive ? `/products#${product.id}` : '#'}
                        onClick={(e) => !isActive && e.preventDefault()}
                        className={cn(`group w-full h-full overflow-hidden shadow-2xl relative`, isActive ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing')}
                      >
                        {/* Product Image */}
                        {productImage && (
                           <div className="w-full h-full relative overflow-hidden flex-shrink-0">
                            <Image
                              src={productImage.imageUrl}
                              alt={product.name || 'Product'}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              data-ai-hint={productImage.imageHint}
                            />
                          </div>
                        )}
                        
                        {/* Static Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:opacity-0">
                           <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground">
                              {product.name}
                            </h3>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-md p-6 md:p-8 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                           <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                              {product.name}
                            </h3>
                            <p className="text-white/80 text-sm line-clamp-3">
                              {product.description}
                            </p>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Slide Indicator Dots - Subtle */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-40">
                {products.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index);
                      setIsAutoplay(false);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-white w-8'
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-background">
        <div className="grid md:grid-cols-5 items-center gap-12 w-full px-0">
            <div className="px-4 sm:px-6 lg:px-8 md:col-span-2">
                <AnimatedSection>
                    <h2 className="text-3xl font-bold">Actionable Insights, Tangible Results</h2>
                    <p className="mt-4 text-muted-foreground text-lg">Our products are designed to provide clarity and actionable insights. We leverage cutting-edge technology to solve complex business problems, focusing on human-centric design and data-driven results.</p>
                    <Link href="/research" className="text-primary font-semibold hover:underline flex items-center mt-6 w-fit">
                        Explore Our Research <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </AnimatedSection>
            </div>
            <AnimatedSection delay={0.2} className="w-full md:col-span-3">
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
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-b from-primary to-secondary">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
            <AnimatedSection className="text-center mb-16">
                <h2 className="text-4xl font-headline font-bold text-primary-foreground mb-6">A Solution for Every Domain</h2>
                <p className="text-lg font-body text-primary-foreground/80 max-w-3xl mx-auto">
                    Our product suite is engineered to address the distinct challenges of various business domains, from high-level strategy to on-the-ground operations.
                </p>
            </AnimatedSection>

            <Tabs defaultValue="strategy" className="w-full">
                <AnimatedSection>
                    <TabsList className="grid w-full grid-cols-3 h-auto bg-white/10 text-white">
                        {PRODUCT_CATEGORIES.map(category => (
                            <TabsTrigger key={category.id} value={category.id} className="group flex flex-col sm:flex-row gap-2 items-center py-3 data-[state=active]:bg-white/20 data-[state=active]:shadow-lg data-[state=active]:text-white relative overflow-hidden">
                                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"></span>
                                <span className="relative z-10 text-sm font-medium">{category.name}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </AnimatedSection>

                {PRODUCT_CATEGORIES.map(category => {
                    const categoryImage = findProductImage(category.imageId);
                    return (
                        <TabsContent key={category.id} value={category.id} className="mt-8">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card className="overflow-hidden border-0 shadow-xl bg-white/5 backdrop-blur-md">
                                    <div className="grid grid-cols-1 lg:grid-cols-2">
                                        <div className="p-8 md:p-12 order-2 lg:order-1 flex flex-col justify-center min-h-[350px]">
                                            
                                            <h3 className="text-2xl font-bold text-white mb-3">{category.name}</h3>
                                            <p className="text-white/70 mb-6">{category.description}</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {category.products.map(productId => {
                                                    const product = PRODUCTS.find(p => p.id === productId);
                                                    if (!product) return null;
                                                    return (
                                                        <Link key={product.id} href={`/products#${product.id}`} className="block group">
                                                            <div className="bg-white/5 p-4 hover:bg-white/10 transition-colors h-full">
                                                                <h4 className="font-semibold text-white group-hover:text-accent">{product.name}</h4>
                                                                <p className="text-sm text-white/70">{product.description}</p>
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="relative min-h-[300px] lg:min-h-0 order-1 lg:order-2">
                                            {categoryImage && (
                                                <Image
                                                    src={categoryImage.imageUrl}
                                                    alt={category.name}
                                                    fill
                                                    className="object-cover"
                                                    data-ai-hint={categoryImage.imageHint}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </TabsContent>
                    )
                })}
            </Tabs>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="space-y-8 md:space-y-12">
            {products.map((product, index) => {
              const productImage = findProductImage(product.imageId);
              return(
              <motion.div
                key={product.id}
                id={product.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: '-100px' }}
                onAnimationComplete={() => handleCardFadeIn(product.id)}
                className="group"
              >
                {/* Card Container - Split Layout */}
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden h-auto md:h-96 flex flex-col md:flex-row shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10 hover:border-accent/20 group/card"
                >
                  {/* Left Half - Blurred Background with Content */}
                  <div className="w-full md:w-1/2 relative overflow-hidden flex flex-col justify-between p-8 md:p-12 order-2 md:order-1">
                    {/* Blurred Background Image */}
                    {productImage && (
                      <div 
                        className="absolute inset-0 blur-xl opacity-40"
                        style={{
                          backgroundImage: `url(${productImage.imageUrl})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    )}
                    
                    {/* Semi-transparent Overlay */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Content - Positioned Above Overlay */}
                    <div className="relative z-10 flex flex-col justify-between h-full">
                      {/* Text Content */}
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <DecipherText
                          text={product.name || 'Product'}
                          className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover/card:text-accent transition-colors duration-300"
                        />

                        <p className="text-sm md:text-base text-white/90 leading-relaxed line-clamp-3">
                          {product.description}
                        </p>
                      </motion.div>

                      {/* Buttons */}
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row gap-3 mt-6"
                      >
                        <Link href={`/products/${product.id}`} className="text-white font-semibold hover:underline flex items-center">
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>

                  {/* Right Half - Unblurred Image */}
                  <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center order-1 md:order-2">
                    {productImage ? (
                      <Image
                        src={productImage.imageUrl}
                        alt={product.name || 'Product'}
                        fill
                        data-ai-hint={productImage.imageHint}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-sm text-foreground/40">Product Image</span>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )})}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-20 md:mt-32 p-8 md:p-16 bg-gradient-to-r from-primary to-secondary w-screen relative left-1/2 right-1/2 -mx-[50vw]"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Transform Your Organization?
            </h2>
            <p className="text-base md:text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Discover how our products can help you measure and optimize the impact of humans in technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="ghost" size="lg" className="text-white hover:bg-white/10">
                <Link href="/research">
                  View Research
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;

    