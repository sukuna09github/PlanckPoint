
import { GLOBAL_OFFICES } from "@/lib/constants";
import { AnimatedSection } from "@/components/animated-section";
import { Globe } from "lucide-react";

export function GlobalPresence() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center">
            <div className="mx-auto bg-primary/10 text-primary p-3 w-fit">
              <Globe className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground">
              Our Global Presence
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Connecting with clients and talent across the world.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {GLOBAL_OFFICES.map((office) => (
                <div key={office} className="text-center">
                  <span className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors">
                    {office}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
