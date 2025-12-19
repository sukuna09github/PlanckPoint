import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { GlassCursor } from "@/components/glass-cursor";

export const metadata: Metadata = {
  title: "Planckpoint | Measuring the impact of humans in technology",
  description: "Planckpoint provides cutting-edge tools and thought leadership to measure and amplify human impact in the tech landscape.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.cdnfonts.com" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.cdnfonts.com/css/selawik" as="style" />
        <link rel="preload" href="https://fonts.cdnfonts.com/css/lovelo" as="style" />
      </head>
      <body className={cn("font-body antialiased min-h-screen flex flex-col")}>
        <GlassCursor />
        <Header />
        <div className="flex-grow flex-1">{children}</div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
