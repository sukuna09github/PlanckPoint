
"use client";

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export function GlassCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [isHovering, setIsHovering] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);

  useEffect(() => {
    if (!isClient) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;
    
    let animationFrameId: number;

    const mousePos = { x: -100, y: -100 };
    
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select');
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => {
      setIsGrabbing(true);
    };

    const handleMouseUp = () => {
      setIsGrabbing(false);
    };

    const tick = () => {
      if (dot.style) {
        dot.style.left = `${mousePos.x}px`;
        dot.style.top = `${mousePos.y}px`;
      }
      if (ring.style) {
        ring.style.left = `${mousePos.x}px`;
        ring.style.top = `${mousePos.y}px`;
      }

      animationFrameId = requestAnimationFrame(tick);
    }
    
    tick();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div className="hidden md:block">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={cn('cursor-ring', { 'hover': isHovering, 'grabbing': isGrabbing })} />
    </div>
  );
}
