
import { Card } from "@/components/ui/card";
import { WHAT_WE_DO_CARDS } from "@/lib/constants";
import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

export function WhatWeDo() {
  const methodologyImages = PlaceHolderImages.filter(img => WHAT_WE_DO_CARDS.some(i => i.imageId === img.id));
  const findImage = (imageId: string) => methodologyImages.find(img => img.id === imageId);

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Methodology
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We employ a multi-faceted approach to understand and enhance the human-technology interface.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHAT_WE_DO_CARDS.map((item, index) => {
            const image = findImage(item.imageId);
            return (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <Link href="#" className="block group h-full">
                  <Card className="h-full flex flex-col text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 bg-card rounded-none border-0 overflow-hidden relative aspect-[4/5]">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105 blur-sm"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300"></div>
                    <div className="relative flex flex-col h-full p-6 text-white justify-center items-center">
                      <h3 className="!text-xl font-bold">{item.title}</h3>
                      <p className="text-white/80 mt-2 text-sm max-w-xs">{item.description}</p>
                      <Button variant="link" className="mt-4 text-white p-0 h-auto font-semibold group-hover:underline">
                        Learn More &rarr;
                      </Button>
                    </div>
                  </Card>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
