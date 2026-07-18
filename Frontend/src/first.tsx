import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaSun,
  FaMoon,
  FaCut,
  FaCalendarCheck,
  FaMagic,
  FaComments,
  FaStar,
  FaArrowRight,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobeAmericas,
} from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const theme = {
    canvas: isDark ? "bg-[#050505] text-[#e5e5e5]" : "bg-[#faf9f7] text-[#1a1a1a]",
    card: isDark 
      ? "bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl shadow-2xl" 
      : "bg-white/90 border-black/[0.03] shadow-[0_30px_60px_rgba(0,0,0,0.04)] backdrop-blur-2xl",
    textMuted: isDark ? "text-zinc-400" : "text-slate-500",
    accent: "#d4af37",
  };

  return (
    <div className={`min-h-screen ${theme.canvas} transition-colors duration-1000 font-sans selection:bg-[#d4af37]/30 overflow-x-hidden`}>
      
      {/* NOISE OVERLAY */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none z-[100] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-[110] transition-all duration-500 ${isDark ? "border-b border-white/5 bg-black/40" : "border-b border-black/5 bg-white/40"} backdrop-blur-2xl`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-4 cursor-pointer">
            <div className="w-12 h-12 bg-[#d4af37] rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              <FaCut className="text-black text-lg" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tighter uppercase">Atelier<span className="font-light opacity-40">Sync</span></span>
          </motion.div>

          <div className="flex items-center gap-8">
            <button onClick={() => setIsDark(!isDark)} className="p-3 rounded-full hover:bg-white/5 transition-colors">
              {isDark ? <FaSun className="text-[#d4af37] text-lg" /> : <FaMoon className="text-lg" />}
            </button>
            <button onClick={() => navigate("/signup")} className="group relative px-8 py-3 overflow-hidden rounded-full bg-[#d4af37] text-black font-bold text-xs uppercase tracking-widest transition-all hover:bg-[#c4a130] active:scale-95">
              <div className="flex items-center gap-2 relative z-10">
                <span>Get Started</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#d4af37]/10 blur-[120px] rounded-full animate-pulse" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div style={{ y: y1, opacity }}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 mb-8">
              <FaStar className="text-[#d4af37] text-[10px] animate-spin" />
              <span className="text-[10px] font-black tracking-[0.5em] text-[#d4af37] uppercase">The Future of Bespoke</span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] mb-8 tracking-tighter">
              Bespoke <span className="italic font-light opacity-50 block">Craftsmanship.</span> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f5e0a3]">Modern Precision.</span>
            </h1>

            <p className={`max-w-lg text-lg md:text-xl font-light leading-relaxed ${theme.textMuted} mb-12`}>
              Bridging the gap between heritage tailoring and your digital doorstep. We find the perfect needle for your unique silhouette.
            </p>
          </motion.div>

          {/* HERO IMAGE/CARD */}
          <div className="relative h-[600px] hidden lg:block">
            <div className={`absolute top-0 right-0 w-4/5 h-4/5 rounded-[4rem] ${isDark ? 'bg-zinc-900' : 'bg-zinc-200'} overflow-hidden border border-white/10`}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/20 to-transparent" />
            </div>
            <div className={`absolute bottom-0 left-0 w-3/5 h-1/2 rounded-[3rem] ${theme.card} p-8 border border-[#d4af37]/20 flex flex-col justify-end`}>
               <FaMagic className="text-4xl text-[#d4af37] mb-6" />
               <h3 className="text-2xl font-serif mb-2">AI-Powered Fitting</h3>
               <p className={theme.textMuted}>Virtual measurements that capture the nuance of every stitch before they even begin.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-12 border-y border-white/5 bg-white/[0.02] overflow-hidden rotate-[-1deg] scale-105">
        <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }} className="flex gap-20 items-center whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-20">
              <span className="text-4xl font-serif italic opacity-20 font-light uppercase tracking-widest text-[#d4af37]">Savile Row Standards</span>
              <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
              <span className="text-4xl font-serif opacity-20 font-light uppercase tracking-widest">Digital Twin Fitting</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* FEATURES - FOCUSED ON MATCHING & COLLAB */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <div className={`md:col-span-2 p-12 rounded-[3rem] ${theme.card} border flex flex-col justify-between overflow-hidden relative group`}>
              <div className="max-w-md relative z-10">
                <span className="text-[#d4af37] text-[10px] font-black tracking-[0.4em] uppercase mb-4 block underline">Heritage Access</span>
                <h3 className="text-4xl font-serif mb-6">Master Tailors, On Your Time.</h3>
                <p className={`${theme.textMuted} text-lg`}>Step into the world's most exclusive ateliers without the flight. Schedule consultations and fittings with global masters instantly.</p>
              </div>
              <FaCalendarCheck className="absolute -bottom-10 -right-10 text-[200px] opacity-[0.03] group-hover:scale-110 transition-transform duration-700" />
          </div>

          <div className={`p-12 rounded-[3rem] ${theme.card} border group`}>
              <div className="w-16 h-16 bg-[#d4af37] rounded-2xl flex items-center justify-center text-black mb-10 group-hover:rotate-12 transition-transform">
                <FaComments className="text-2xl" />
              </div>
              <h3 className="text-2xl font-serif mb-4">Direct Dialogue</h3>
              <p className={theme.textMuted}>Collaborate directly with your tailor. Share inspirations, discuss fabrics, and track progress through every phase.</p>
          </div>

          <div className={`p-12 rounded-[3rem] ${theme.card} border flex flex-col items-center text-center justify-center group`}>
              <FaMagic className="text-5xl text-[#d4af37] mb-6" />
              <h3 className="text-2xl font-serif mb-2 uppercase tracking-tighter font-bold">Neural Matching</h3>
              <p className={theme.textMuted}>Our algorithm pairs your aesthetic preferences and body type with the world’s most compatible artisans.</p>
          </div>

          <div className={`md:col-span-2 h-[400px] rounded-[3rem] ${isDark ? 'bg-zinc-900/50' : 'bg-zinc-100'} border border-white/5 relative overflow-hidden flex items-center px-12`}>
              <div className="relative z-10 flex items-center gap-8">
                  <div className="w-20 h-20 bg-[#d4af37]/10 rounded-full flex items-center justify-center border border-[#d4af37]/20">
                    <FaGlobeAmericas className="text-3xl text-[#d4af37]" />
                  </div>
                  <div>
                    <h4 className="text-4xl font-serif mb-2">A Global Collective.</h4>
                    <p className={theme.textMuted}>Discover high-end tailoring expertise from Savile Row to Tokyo, curated specifically for you.</p>
                  </div>
              </div>
              <div className="absolute inset-y-0 right-0 w-1/3 bg-[#d4af37]/5 skew-x-12" />
          </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="py-40 px-6 relative border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="relative p-[1px] rounded-[4rem] bg-gradient-to-br from-[#d4af37]/40 to-transparent">
            <div className={`p-12 md:p-24 rounded-[4rem] ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'} flex flex-col md:flex-row items-center gap-20`}>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-[#d4af37] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-[3.5rem] bg-zinc-900 border border-white/10 overflow-hidden relative z-10 flex items-center justify-center">
                   <FaCut className="text-8xl text-[#d4af37]/20 transform -rotate-12" />
                </div>
              </div>

              <div className="flex-1 space-y-10">
                <div>
                  <span className="text-[#d4af37] text-xs font-black uppercase tracking-[0.5em] mb-4 block">Founder & Visionary</span>
                  <h2 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter">Ishan Garg</h2>
                  <p className={`text-xl md:text-2xl italic font-light ${theme.textMuted} mt-4`}>"Crafting digital bridges for tactile masterpieces."</p>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-12 pt-10 border-t border-white/10">
                  <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">Institution</p>
                    <p className="text-lg font-medium tracking-tight">Punjab Engineering College</p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">Direct Inquiry</p>
                    <div className="space-y-2">
                      <a href="mailto:ishangarg.2006@gmail.com" className="flex items-center gap-3 group hover:text-[#d4af37] transition-colors">
                        <FaEnvelope className="opacity-40 text-sm" />
                        <span className="text-base font-medium">ishangarg.2006@gmail.com</span>
                      </a>
                      <a href="tel:7710127740" className="flex items-center gap-3 group hover:text-[#d4af37] transition-colors">
                        <FaPhoneAlt className="opacity-40 text-sm" />
                        <span className="text-base font-medium">+91 77101-27740</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 text-center border-t border-white/5 bg-black/20">
        <div className="flex justify-center gap-12 mb-12 opacity-40">
          {["Instagram", "Twitter", "Vogue", "LinkedIn"].map((link) => (
            <span key={link} className="text-[10px] uppercase tracking-[0.3em] cursor-pointer hover:text-[#d4af37] transition-colors font-bold">{link}</span>
          ))}
        </div>
        <p className={`text-[10px] font-black uppercase tracking-[0.8em] ${theme.textMuted} opacity-20`}>
          © 2026 AtelierSync Studio // Established in Excellence
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;