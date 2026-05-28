"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface LuxuryImageProps extends ImageProps {
  aspectRatio?: "square" | "portrait" | "landscape" | "wide" | "full";
}

export function LuxuryImage({ className, aspectRatio = "square", alt, ...props }: LuxuryImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectStyles = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    wide: "aspect-video",
    full: "h-full w-full",
  };

  return (
    <div className={cn("relative overflow-hidden group", aspectStyles[aspectRatio], className)}>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="absolute inset-0 z-10 bg-brand-black flex items-center justify-center overflow-hidden"
          >
            {/* Liquid Gold Skeleton Pulse */}
            <motion.div
              animate={{
                x: ["-150%", "150%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent skew-x-[-20deg]"
            />
            <div className="w-12 h-[0.5px] bg-brand-gold/20 relative z-20" />
          </motion.div>
        )}
      </AnimatePresence>

      <Image
        {...props}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "object-cover transition-transform duration-[2000ms] ease-luxury group-hover:scale-105",
          !isLoaded ? "opacity-0" : "opacity-100"
        )}
      />

      {/* Subtle Grain Overlay on the image */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIvPjwvc3ZnPg==')]" />
    </div>
  );
}
