import { cn } from "@/lib/utils";
import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("text-2xl font-logo uppercase text-foreground hover:text-primary transition-colors", className)}>
      Planckpoint
    </Link>
  );
}
