

"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PRODUCTS } from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  
  const [product, setProduct] = useState<(typeof PRODUCTS[0]) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = () => {
      if (!id) return;
      
      try {
        const productData = PRODUCTS.find(p => p.id === id);
        setProduct(productData || null);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  
  const productImage = PlaceHolderImages.find(p => p.id === product?.imageId);
  const backgroundImageUrl = "https://images.unsplash.com/photo-1707386301713-1002bc5d6cf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGltYWdlc3xlbnwwfHx8fDE3NjYwNzI0OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080";

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground/60 font-body">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-headline font-bold text-primary mb-4">Product Not Found</h1>
          <p className="text-foreground/60 font-body mb-8">The product you're looking for doesn't exist.</p>
          <Button asChild className="bg-primary hover:bg-secondary text-primary-foreground">
            <Link href="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const benefits = product.keyBenefits?.split('\n').filter(benefit => benefit.trim()) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="bg-white border-b border-foreground/10">
        <div className="max-w-[120rem] mx-auto px-16 py-6">
          <Button
            asChild
            variant="ghost"
            className="text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Link href="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-[120rem] mx-auto px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-headline font-bold text-primary-foreground mb-6">
                {product.name}
              </h1>
              {product.tagline && (
                <p className="text-xl font-body text-accent font-medium mb-6">
                  {product.tagline}
                </p>
              )}
              <p className="text-lg font-body text-primary-foreground/80 leading-relaxed">
                {product.detailedDescription}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {productImage ? (
                <div className="overflow-hidden shadow-2xl">
                  <Image
                    src={productImage.imageUrl}
                    alt={product.name || 'Product'}
                    className="w-full h-96 object-cover"
                    width={600}
                    height={384}
                  />
                </div>
              ) : (
                <div className="w-full h-96 bg-white/10 flex items-center justify-center">
                  <div className="text-center text-primary-foreground">
                    <div className="w-20 h-20 bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-headline font-bold">
                        {product.name?.charAt(0)}
                      </span>
                    </div>
                    <p className="font-body text-lg">{product.name}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      {benefits.length > 0 && (
        <section className="py-24 bg-white text-primary">
          <div className="max-w-[120rem] mx-auto px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-headline font-bold mb-6">Key Benefits</h2>
              <p className="text-lg font-body text-foreground/80 max-w-3xl mx-auto">
                Discover how {product.name} can transform your organization's approach to human-technology interaction.
              </p>
            </motion.div>

            <Carousel
              opts={{ align: "start", loop: true }}
              plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
              className="w-full"
            >
              <CarouselContent className="-ml-4 sm:-ml-8">
                {benefits.map((benefit, index) => (
                  <CarouselItem key={index} className="pl-4 sm:pl-8 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      className="h-full"
                    >
                      <Card className="h-full bg-gradient-to-br from-primary to-accent border-0 shadow-lg text-white">
                        <CardContent className="p-8 h-full">
                          <div className="flex items-start space-x-4 h-full">
                            <div className="flex-shrink-0">
                              <CheckCircle className="w-6 h-6 text-white mt-1" />
                            </div>
                            <p className="text-base font-body leading-relaxed">
                              {benefit.trim()}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>
      )}

      {/* Detailed Information Section */}
      <section className="py-24 relative bg-gradient-to-r from-primary to-accent">
        <div className="max-w-[120rem] mx-auto px-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-md border-white/20 shadow-lg text-white">
                  <CardContent className="p-12">
                    <h2 className="text-3xl font-headline font-bold text-white mb-8">
                      Product Overview
                    </h2>
                    
                    <div className="prose prose-lg max-w-none">
                      <p className="text-base font-body text-white/80 leading-relaxed mb-6">
                        {product.detailedDescription}
                      </p>
                      
                      <div className="bg-black/20 p-8 my-8">
                        <h3 className="text-xl font-headline font-semibold text-white mb-4">
                          Why Choose {product.name}?
                        </h3>
                        <p className="text-base font-body text-white/80 leading-relaxed">
                          Our solution is built on years of research in human-technology interaction, 
                          providing you with evidence-based insights and actionable recommendations 
                          that drive real organizational change.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="sticky top-24"
              >
                <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-headline font-bold text-primary-foreground mb-6">
                      Get Started Today
                    </h3>
                    <p className="text-base font-body text-primary-foreground/80 mb-8">
                      Ready to implement {product.name} in your organization? 
                      Contact our experts to learn more about pricing and implementation.
                    </p>
                    
                    <div className="space-y-4">
                      <Button
                        asChild
                        variant="ghost"
                        className="w-full text-primary-foreground hover:bg-white/10 justify-start"
                      >
                        <Link href="/contact">
                          Contact Sales
                        </Link>
                      </Button>
                      
                      {product.learnMoreUrl && (
                        <Button
                          asChild
                          variant="ghost"
                          className="w-full text-primary-foreground hover:bg-white/10 justify-start"
                        >
                          <a href={product.learnMoreUrl} target="_blank" rel="noopener noreferrer">
                            Documentation
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      )}
                      
                      <Button
                        asChild
                        variant="ghost"
                        className="w-full text-primary-foreground hover:bg-white/10 justify-start"
                      >
                        <Link href="/insights">
                          View Research
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-[120rem] mx-auto px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-headline font-bold text-primary mb-6">
              Explore Our Complete Product Suite
            </h2>
            <p className="text-lg font-body text-foreground/80 mb-8 max-w-2xl mx-auto">
              Discover how our integrated solutions work together to provide comprehensive 
              insights into human-technology interaction.
            </p>
            <Button
              asChild
              className="bg-primary hover:bg-secondary text-primary-foreground px-8 py-3"
            >
              <Link href="/products">
                View All Products
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;

    

    
