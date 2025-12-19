
"use client";

import { useEffect, useRef } from 'react';

export function AtomicAIViewer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Prevent creating duplicate iframes on re-renders in strict mode
    if (container.querySelector('iframe')) return;

    const iframe = document.createElement('iframe');
    const modelId = 'f8081ea92e5e4b47ab40eeba5bb0b27a';
    const embedUrl = `https://sketchfab.com/models/${modelId}/embed?autospin=0.5&autostart=1&preload=1&transparent=1`;

    iframe.src = embedUrl;
    iframe.title = "Art Marble 3D Model";
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; fullscreen; xr-spatial-tracking";
    iframe.setAttribute("webkitallowfullscreen", "true");
    iframe.setAttribute("mozallowfullscreen", "true");
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.display = 'block';

    container.appendChild(iframe);

    const handleDoubleClick = () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        iframe.requestFullscreen().catch(err => {
          console.warn("Fullscreen not supported or denied", err);
        });
      }
    };
    
    // Use a separate function to add the listener after load
    const addFullscreenListener = () => {
      iframe.addEventListener('dblclick', handleDoubleClick);
    };

    iframe.addEventListener('load', addFullscreenListener);

    // Cleanup function to remove iframe and event listeners
    return () => {
      iframe.removeEventListener('load', addFullscreenListener);
      iframe.removeEventListener('dblclick', handleDoubleClick);
      if (container.contains(iframe)) {
        container.removeChild(iframe);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="aspect-video w-full relative overflow-hidden shadow-lg bg-transparent" />
  );
}
