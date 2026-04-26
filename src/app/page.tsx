import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />
      <Hero />
      
      <section id="services" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[#e76f51] text-sm font-semibold tracking-widest uppercase mb-4 block">Douceur Infinie</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2d2d2d] mb-16">Nos Services</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Manucure Douce", desc: "Un soin complet pour des mains soyeuses et des ongles parfaitement limés." },
              { title: "Vernis Semi-Permanent", desc: "Couleur éclatante et tenue impeccable jusqu'à 3 semaines." },
              { title: "Soin Spa des Mains", desc: "Hydratation profonde et massage relaxant aux huiles essentielles." }
            ].map((s, i) => (
              <div key={i} className="glass p-8 rounded-[2rem] hover:bg-[#fff5f6]/50 transition-all cursor-default text-center">
                <div className="w-12 h-12 bg-[#ffe8eb] rounded-full flex items-center justify-center text-[#e76f51] mb-6 mx-auto">
                  🌸
                </div>
                <h3 className="text-xl font-serif font-bold mb-4">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
