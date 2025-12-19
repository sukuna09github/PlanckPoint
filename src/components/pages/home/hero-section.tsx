
"use client";

import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/animated-section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative w-full h-screen overflow-hidden">
            <div className="absolute inset-0 moving-gradient" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                <AnimatedSection>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter !leading-tight max-w-4xl">
                        Empower human-centered innovation.
                    </h1>
                </AnimatedSection>
                <AnimatedSection delay={0.2}>
                    <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl">
                        Build technology that works for people.
                    </p>
                </AnimatedSection>
                <AnimatedSection delay={0.4}>
                    <Button asChild size="lg" variant="brand-outline-white" className="mt-8">
                        <Link href="/about">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </AnimatedSection>
            </div>
        </section>
    );
}
