"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useSpring(0, { damping: 30, stiffness: 200 });
  const mouseY = useSpring(0, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovered(!!target.closest("a, button, [role='button']"));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        left: mouseX,
        top: mouseY,
        x: "-50%",
        y: "-50%",
      }}
      className="fixed pointer-events-none z-[9999] hidden lg:block"
    >
      {/* Central dot */}
      <div className="w-1 h-1 bg-brand-gold rounded-full" />

      {/* Luxury Ring */}
      <motion.div
        animate={{
          width: isHovered ? 80 : 32,
          height: isHovered ? 80 : 32,
          borderColor: isHovered ? "rgba(201, 166, 107, 0.8)" : "rgba(201, 166, 107, 0.3)",
          borderWidth: isHovered ? 1 : 0.5,
        }}
        transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-gold"
      />
    </motion.div>
  );
}
