import { AnimatedSection } from "@/components/animated-section";
import { ContactForm } from "@/components/pages/contact/contact-form";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <AnimatedSection>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We're here to answer your questions. Reach out to us and we'll respond as soon as we can.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-16 lg:mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.1}>
                <ContactForm />
              </AnimatedSection>
            </div>
            <div className="space-y-8">
              <AnimatedSection delay={0.2}>
                <h2 className="text-2xl font-bold mb-4">Our Information</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 mt-1 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <a href="mailto:hello@planckpoint.com" className="hover:text-primary transition-colors">hello@planckpoint.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 mt-1 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">Phone</h3>
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 mt-1 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">Headquarters</h3>
                      <span>123 Innovation Drive<br/>Tech City, USA 90210</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
