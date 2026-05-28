"use client";

import * as React from "react";
import { Upload as UploadIcon, X } from "lucide-react";
import { Typography } from "./Typography";
import { motion } from "framer-motion";

export function Upload() {
  const [preview, setPreview] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      <label className="relative group flex flex-col items-center justify-center w-full h-72 border-2 border-dashed border-brand-gold/20 rounded-[3.5rem] bg-white/[0.02] hover:bg-brand-gold/[0.03] hover:border-brand-gold/40 transition-all duration-700 cursor-pointer overflow-hidden group">
        {preview ? (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-brand-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="bg-brand-gold text-brand-black px-6 py-2 rounded-full font-bold text-xs tracking-widest shadow-xl">
                CHANGER L&apos;IMAGE
              </div>
            </div>
            <button
              onClick={(e) => { e.preventDefault(); setPreview(null); }}
              className="absolute top-6 right-6 p-2.5 bg-brand-black/60 rounded-full text-white hover:bg-brand-gold hover:text-brand-black transition-all shadow-lg z-20"
            >
              <X size={18} />
            </button>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="w-20 h-20 rounded-3xl bg-brand-gold/5 border border-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-brand-black transition-all duration-500 shadow-lg">
              <UploadIcon size={32} />
            </div>
            <Typography variant="h4" serif className="text-brand-ivory mb-2 tracking-tight">Ajouter un chef-d&apos;œuvre</Typography>
            <Typography variant="label" className="text-[9px] text-brand-gold/40">PNG, JPG OU WEBP (MAX. 5MB)</Typography>
          </div>
        )}
        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
      </label>
    </div>
  );
}
