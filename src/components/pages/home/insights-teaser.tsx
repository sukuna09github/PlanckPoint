
"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { INSIGHTS_TEASER_CARDS } from "@/lib/constants";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AnimatedSection } from "@/components/animated-section";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function InsightsTeaser() {
  const insightImages = PlaceHolderImages.filter(img => INSIGHTS_TEASER_CARDS.some(i => i.imageId === img.id));
  const findImage = (imageId: string) => insightImages.find(img => img.id === imageId);

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Latest Insights
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our research, analysis, and success stories.
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
              {INSIGHTS_TEASER_CARDS.map((insight, index) => {
                const image = findImage(insight.imageId);
                return (
                  <CarouselItem key={insight.title} className="pl-8 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Link href="/insights" className="block group h-full">
                        <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 border-0">
                          
                          <div className="aspect-video relative w-full overflow-hidden">
                            {image ? (
                              <Image
                                src={image.imageUrl}
                                alt={insight.title}
                                fill
                                className="object-cover"
                                data-ai-hint={image.imageHint}
                              />
                            ) : (
                              <div className="w-full h-full bg-muted"></div>
                            )}
                          </div>

                          <CardContent className="pt-6 flex-grow">
                            <Badge variant="secondary" className="mb-2 uppercase text-xs font-semibold tracking-wider">
                              {insight.category}
                            </Badge>
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                              {insight.title}
                            </h3>
                          </CardContent>

                          <CardFooter>
                            <span className="text-sm font-semibold text-primary group-hover:underline">
                              Read more &rarr;
                            </span>
                          </CardFooter>

                        </Card>
                      </Link>
                    </div>
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
  );
}
