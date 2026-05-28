"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Typography } from "./Typography";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop with Silk effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-black/90 backdrop-blur-md"
          />

          {/* Content with Stone solidity and Gold precision */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            className={cn(
              "relative w-full max-w-lg glass-luxury p-10 md:p-14 rounded-[4rem] border-[0.5px] border-brand-gold/30 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden",
              className
            )}
          >
            {/* Ambient Glow */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full pointer-events-none" />

            <div className="flex items-center justify-between mb-12 relative z-10">
              {title && (
                <div>
                   <Typography variant="h3" serif className="text-brand-ivory mb-1">{title}</Typography>
                   <div className="h-[0.5px] w-8 bg-brand-gold" />
                </div>
              )}
              <button
                onClick={onClose}
                className="p-3 rounded-full bg-white/5 border border-white/5 hover:bg-brand-gold/20 hover:border-brand-gold/40 text-brand-gold transition-all duration-500"
                aria-label="Close"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="relative z-10">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
