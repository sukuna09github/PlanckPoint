

"use client";

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/use-in-view';

interface DecipherTextProps {
  text: string;
  className?: string;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function DecipherText({ text, className }: DecipherTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    if (hasAnimated) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    let iteration = 0;
    intervalRef.current = setInterval(() => {
      const newText = text
        .split("")
        .map((_char, index) => {
          if (index < iteration) {
            return text[index];
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      
      setDisplayText(newText);
      
      if (iteration >= text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setHasAnimated(true);
      }
      
      iteration += 1 / 3;
    }, 30);
  };

  const reset = () => {
    // No-op if we want it to animate only once
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <span 
      className={cn("inline-block", className)}
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {displayText}
    </span>
  );
}

