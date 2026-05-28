"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Bienvenue dans votre espace, Lara.");
      router.push("/admin");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Identifiants invalides";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-ivory flex items-center justify-center p-6 selection:bg-brand-gold selection:text-white relative overflow-hidden">
      {/* Dynamic Background Elements - Solar Luxury */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-white rounded-full blur-[100px]" />
      </div>

      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIvPjwvc3ZnPg==')]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Logo Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            className="w-20 h-20 rounded-[2rem] border border-brand-gold/20 flex items-center justify-center text-brand-gold text-4xl font-black mx-auto mb-8 shadow-sm bg-white"
          >
            L
          </motion.div>
          <Typography variant="h2" serif className="text-brand-black mb-3 tracking-tighter">Accès Privé</Typography>
          <Typography variant="label" className="text-brand-gold font-black tracking-[0.2em] uppercase">Administration Lara Nails</Typography>
        </div>

        {/* Login Form - Frosted Alabaster */}
        <div className="bg-white/80 backdrop-blur-2xl border-[0.5px] border-black/5 rounded-[4rem] p-10 md:p-14 shadow-luxury">
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <Typography variant="label" className="px-2 font-black uppercase text-brand-black/40">Identifiant (E-mail)</Typography>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/40 group-focus-within:text-brand-gold transition-colors" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.fr"
                  className="w-full bg-black/5 border border-black/5 rounded-[2rem] pl-14 pr-6 py-5 text-brand-black text-sm outline-none focus:border-brand-gold/40 focus:bg-white transition-all placeholder:text-black/10"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Typography variant="label" className="px-2 font-black uppercase text-brand-black/40">Mot de passe</Typography>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/40 group-focus-within:text-brand-gold transition-colors" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/5 border border-black/5 rounded-[2rem] pl-14 pr-6 py-5 text-brand-black text-sm outline-none focus:border-brand-gold/40 focus:bg-white transition-all placeholder:text-black/10"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                disabled={isLoading}
                type="submit"
                variant="luxury"
                size="lg"
                className="w-full py-7 group border-[0.5px] border-brand-gold/20 text-white"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span className="tracking-[0.4em]">SE CONNECTER</span> <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Footer text */}
        <div className="text-center mt-12 opacity-20">
           <Typography variant="label" className="text-[8px] font-black uppercase tracking-[0.4em]">Propulsé par Lara Nails Pro — Paris</Typography>
        </div>
      </motion.div>
    </main>
  );
}
