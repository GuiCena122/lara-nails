"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Typography } from "./Typography";

export function LuxuryPreloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[999] bg-brand-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIvPjwvc3ZnPg==')]" />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="w-24 h-24 rounded-3xl border border-brand-gold/30 flex items-center justify-center text-brand-gold text-4xl font-black shadow-[0_0_40px_rgba(201,166,107,0.2)] mb-8">
              L
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-10px] rounded-full border-t-2 border-brand-gold/40"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-center"
          >
            <Typography variant="h3" serif className="text-brand-ivory tracking-[0.2em] mb-2 uppercase text-balance">LARA NAILS</Typography>
            <Typography variant="label" className="text-brand-gold text-[8px] tracking-[0.6em] uppercase text-balance">Excellence à Paris</Typography>
          </motion.div>

          {/* Dynamic Progress Line */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-white/5 overflow-hidden">
             <motion.div
               initial={{ x: "-100%" }}
               animate={{ x: "100%" }}
               transition={{ duration: 2.5, ease: "easeInOut" }}
               className="w-full h-full bg-brand-gold shadow-[0_0_10px_#C9A66B]"
             />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
