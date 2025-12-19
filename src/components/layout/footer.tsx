
import { FOOTER_LINKS, GLOBAL_OFFICES } from "@/lib/constants";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-background">
      <div className="mx-auto w-full px-6 sm:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 flex flex-col">
            <Logo className="text-background hover:text-white" />
            <p className="mt-4 text-sm text-white/70 max-w-xs">
              Measuring the impact of humans in technology.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-white/70 hover:text-white">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-white/70 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {FOOTER_LINKS.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/70">
            <p>&copy; {currentYear} Planckpoint. All rights reserved.</p>
            <p className="mt-4 md:mt-0">Global Presence: {GLOBAL_OFFICES.join(", ")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
