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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-black/90 backdrop-blur-md"
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative w-full max-w-lg glass-luxury p-10 md:p-12 rounded-[4rem] border border-brand-gold/20 shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden",
              className
            )}
          >
            {/* Decorative Inner Glow */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center justify-between mb-8">
              {title && (
                <Typography variant="h3" serif className="text-brand-ivory">{title}</Typography>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-brand-gold/20 text-brand-gold transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative z-10">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
