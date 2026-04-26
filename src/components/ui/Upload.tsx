"use client";

import * as React from "react";
import { Upload as UploadIcon, X, FileImage } from "lucide-react";
import { cn } from "@/lib/utils";
import { Typography } from "./Typography";

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
      <label className="relative group flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-brand-gold/20 rounded-[2.5rem] bg-white/5 hover:bg-brand-gold/5 transition-all cursor-pointer overflow-hidden">
        {preview ? (
          <div className="absolute inset-0 w-full h-full">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-brand-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Typography variant="span" className="text-white font-bold">Changer l&apos;image</Typography>
            </div>
            <button
              onClick={(e) => { e.preventDefault(); setPreview(null); }}
              className="absolute top-4 right-4 p-2 bg-brand-black/60 rounded-full text-white hover:bg-brand-gold transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-4 group-hover:scale-110 transition-transform">
              <UploadIcon size={28} />
            </div>
            <Typography variant="span" className="text-brand-ivory mb-2">Ajouter un chef-d&apos;œuvre</Typography>
            <Typography variant="label" className="text-[8px]">PNG, JPG ou WebP (max. 5MB)</Typography>
          </div>
        )}
        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
      </label>
    </div>
  );
}
