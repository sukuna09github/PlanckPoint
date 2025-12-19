
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type StackedCardItem = {
  title: string;
  description: string;
};

interface StackedCardDeckProps {
  items: StackedCardItem[];
}

export function StackedCardDeck({ items }: StackedCardDeckProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative h-[450px] w-full max-w-xl mx-auto lg:h-[500px]">
      <div className="relative h-full w-[calc(100%-60px)]">
        <AnimatePresence initial={false}>
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            const position = index - activeIndex;
            
            return (
              <motion.div
                key={item.title}
                className={cn(
                  "absolute w-full h-full origin-bottom-right right-0",
                )}
                initial={{
                  x: 0,
                  opacity: 0,
                }}
                animate={{
                  zIndex: isActive ? items.length : items.length - Math.abs(position),
                  opacity: isActive ? 1 : 0.5,
                  x: isActive ? 0 : 20 * position,
                  scale: isActive ? 1 : 1 - (0.05 * Math.abs(position)),
                  rotate: isActive ? 0 : -5 * position,
                  transition: {
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1],
                  },
                }}
              >
                <div
                  className={cn(
                    "h-full w-full flex items-start transition-colors shadow-2xl",
                    "bg-white/10 backdrop-blur-md border border-white/20"
                  )}
                >
                  <div className="p-8 h-full flex flex-col w-full">
                    <h3 className="text-2xl font-bold transition-colors pt-4 whitespace-nowrap text-white text-center w-full">
                      {item.title}
                    </h3>
                    <motion.div
                      className="mt-4 text-white/80 flex-grow overflow-hidden text-center"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        transition: { duration: 0.3, delay: 0.2 },
                      }}
                    >
                      <p className="text-lg">{item.description}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="absolute right-0 top-0 h-full w-[60px] flex flex-col justify-center items-center space-y-2">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={item.title}
              onClick={() => handleClick(index)}
              className={cn(
                "w-full text-center transition-all duration-300 ease-in-out p-2",
                isActive ? 'text-white font-bold' : 'text-white/50'
              )}
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
            >
              {item.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
