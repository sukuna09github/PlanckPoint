
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { PRODUCTS } from "@/lib/constants";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AnimatedSection } from "@/components/animated-section";

export function ProductsTeaser() {
  const productsToShow = PRODUCTS.slice(0, 6);
  const findImage = (imageId: string) => PlaceHolderImages.find(img => img.id === imageId);
  const atomicAiImage = PlaceHolderImages.find(p => p.id === 'atomicai-background');
  const beyondQuadrantsImage = PlaceHolderImages.find(p => p.id === 'beyondquadrants-background');
  const disquoImage = PlaceHolderImages.find(p => p.id === 'product-disquo-background');
  const elwisImage = PlaceHolderImages.find(p => p.id === 'elwis-background');
  const propricingImage = PlaceHolderImages.find(p => p.id === 'propricing-background');
  const skillorbitImage = PlaceHolderImages.find(p => p.id === 'skillorbit-background');

  return (
    <section className="py-20 lg:py-32 bg-background text-foreground">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Suite of Solutions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Innovative tools designed to provide clarity and drive growth.
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
            <CarouselContent className="-ml-8">
              {PRODUCTS.map((product) => {
                let image;
                if (product.id === 'atomicai') {
                  image = atomicAiImage;
                } else if (product.id === 'beyondquadrants') {
                  image = beyondQuadrantsImage;
                } else if (product.id === 'disquo') {
                  image = disquoImage;
                } else if (product.id === 'elwis') {
                  image = elwisImage;
                } else if (product.id === 'propricing') {
                  image = propricingImage;
                } else if (product.id === 'skillorbit') {
                  image = skillorbitImage;
                } else {
                  image = findImage(product.imageId);
                }
                
                return (
                    <CarouselItem key={product.id} className="pl-8 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Card className="h-full flex flex-col bg-card text-card-foreground border-0 group overflow-hidden relative">
                         {image && (
                          <Image
                            src={image.imageUrl}
                            alt={product.name}
                            fill
                            data-ai-hint={image.imageHint}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        )}
                        <div className="relative z-10 flex flex-col flex-grow p-6 bg-foreground/60 text-background backdrop-blur-sm">
                          <CardHeader className="p-0">
                              <div className="flex items-center gap-4">
                                <div className="bg-white/20 text-white p-3">
                                    <product.icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="!text-xl text-white">{product.name}</CardTitle>
                              </div>
                          </CardHeader>
                          <CardContent className="p-0 pt-4 flex-grow">
                            <p className="text-sm text-white/80">
                              {product.description}
                            </p>
                          </CardContent>
                          <CardFooter className="p-0 pt-4">
                            <Button variant="ghost" asChild className="text-white hover:bg-white/10">
                              <Link href={`/products/${product.id}`}>Learn More</Link>
                            </Button>
                          </CardFooter>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </Carousel>
        </AnimatedSection>
        <AnimatedSection className="mt-12 text-center" delay={0.4}>
          <Button size="lg" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
