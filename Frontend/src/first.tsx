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
  FaUserCheck,
  FaDraftingCompass,
  FaSearch
} from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [authTab, setAuthTab] = useState<"signup" | "login">("signup");

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleSearchTailor = () => {
    navigate("/signup");
  };

  const theme = {
    canvas: isDark 
      ? "bg-[#0b0c10] text-[#f8fafc]" 
      : "bg-gradient-to-br from-amber-50/80 via-white to-orange-50/60 text-slate-900",
    card: isDark
      ? "bg-white/[0.04] border-amber-500/20 backdrop-blur-2xl shadow-2xl shadow-amber-500/5"
      : "bg-white/90 border-amber-200/80 shadow-[0_20px_50px_rgba(217,119,6,0.08)] backdrop-blur-2xl",
    textMuted: isDark ? "text-slate-400" : "text-slate-600",
  };

  const marqueeItems = [
    "Savile Row Standards",
    "Bespoke Fitting",
    "Master Artisans",
    "Custom Silhouette",
    "Precision Tailoring",
    "Handcrafted Details"
  ];

  return (
    <div className={`min-h-screen ${theme.canvas} transition-colors duration-700 font-sans selection:bg-amber-400/30 overflow-x-hidden relative`}>
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[100] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <nav className={`fixed top-0 w-full z-[110] transition-all duration-300 ${
        isDark 
          ? "border-b border-white/10 bg-[#0b0c10]/80" 
          : "border-b border-amber-100 bg-white/80"
      } backdrop-blur-2xl`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
              <FaCut className="text-white text-base -rotate-12" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight uppercase">
              Atelier<span className="font-light text-amber-600">Sync</span>
            </span>
          </motion.div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-full border transition-all ${
                isDark 
                  ? "border-amber-500/30 bg-amber-500/10 text-amber-400" 
                  : "border-amber-200 bg-amber-50/80 text-amber-700 hover:bg-amber-100"
              }`}
            >
              {isDark ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
            </button>

            <div className="flex items-center bg-amber-100/60 dark:bg-white/5 p-1 rounded-full border border-amber-300/60">
              <button
                onClick={() => {
                  setAuthTab("signup");
                  navigate("/signup");
                }}
                className={`px-5 py-1.5 rounded-full text-xs uppercase tracking-wider font-bold transition-all ${
                  authTab === "signup"
                    ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md shadow-amber-500/20"
                    : "text-slate-700 dark:text-slate-300 hover:text-amber-600"
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => {
                  setAuthTab("login");
                  navigate("/login");
                }}
                className={`px-5 py-1.5 rounded-full text-xs uppercase tracking-wider font-bold transition-all ${
                  authTab === "login"
                    ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md shadow-amber-500/20"
                    : "text-slate-700 dark:text-slate-300 hover:text-amber-600"
                }`}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-16">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-amber-300/30 via-orange-300/20 to-yellow-200/40 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          <motion.div style={{ y: y1, opacity }} className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-300 bg-amber-500/10 mb-6 shadow-sm shadow-amber-500/10"
            >
              <FaStar className="text-amber-500 text-[10px]" />
              <span className="text-[10px] font-black tracking-[0.3em] text-amber-700 uppercase">The Bespoke Artisan Network</span>
            </motion.div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif leading-[0.95] mb-6 tracking-tight">
              Master Craftsmanship. <br />
              <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-600 bg-clip-text text-transparent italic font-light">
                Directly Matched.
              </span>
            </h1>

            <p className={`max-w-xl text-base sm:text-lg font-light leading-relaxed ${theme.textMuted} mb-10`}>
              AtelierSync connects individuals seeking exceptional custom garments with premier tailors—crafted to your exact measurement and style.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={handleSearchTailor}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-500/25 flex items-center justify-center gap-3 group"
              >
                <span>Search Tailor</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleSearchTailor}
                className={`px-8 py-4 rounded-2xl border ${
                  isDark 
                    ? "border-white/10 hover:bg-white/5 text-white" 
                    : "border-amber-200 bg-white hover:bg-amber-50 text-slate-800 shadow-md shadow-amber-500/5"
                } font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2`}
              >
                <FaSearch className="text-amber-500" />
                <span>Explore Artisans</span>
              </button>
            </div>
          </motion.div>

          <div className="lg:col-span-5 relative">
            <div className={`relative rounded-[2.5rem] ${theme.card} p-8 border border-amber-300/40 shadow-2xl space-y-6`}>
              <div className="flex items-center justify-between pb-6 border-b border-amber-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 border border-amber-300 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
                    <FaDraftingCompass className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Atelier Search Engine</h4>
                    <p className={`text-xs ${theme.textMuted}`}>Instant Artisan Matching</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold border border-emerald-500/20">
                  Active
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { title: "Personalized Measurements", desc: "Digital profile vault for exact fits" },
                  { title: "Direct Artisan Collaboration", desc: "Real-time updates & fabric selection" },
                  { title: "Verified Tailor Portfolios", desc: "Curated ratings, styles, and shop info" }
                ].map((item, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl ${isDark ? "bg-white/[0.03]" : "bg-amber-50/50"} border border-amber-200/50 flex items-start gap-3.5`}>
                    <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600 mt-0.5">
                      <FaUserCheck className="text-xs" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold">{item.title}</h5>
                      <p className={`text-[11px] ${theme.textMuted} mt-0.5`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className={theme.textMuted}>Average Fit Accuracy</span>
                <span className="font-black text-amber-600">99.4%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-8 border-y border-amber-200/60 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] gap-12 items-center">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((text, i) => (
            <div key={i} className="flex items-center gap-12 shrink-0">
              <span className="text-2xl font-serif italic font-semibold uppercase tracking-widest text-amber-600/70">
                {text}
              </span>
              <div className="w-2 h-2 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
            </div>
          ))}
        </div>
      </div>

      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-amber-600 text-[10px] font-black tracking-[0.4em] uppercase mb-3 block">
            Core Features
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
            Designed for Tailors and Clients
          </h2>
          <p className={`text-sm md:text-base ${theme.textMuted} mt-4`}>
            Everything you need to discover, consult, and craft custom bespoke garments effortlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className={`md:col-span-2 p-10 lg:p-12 rounded-[2.5rem] ${theme.card} border flex flex-col justify-between overflow-hidden relative group`}>
            <div className="max-w-md relative z-10">
              <span className="text-amber-600 text-[10px] font-black tracking-[0.3em] uppercase mb-3 block">
                Bespoke Access
              </span>
              <h3 className="text-3xl font-serif font-bold mb-4">Master Artisans On Demand</h3>
              <p className={`${theme.textMuted} text-base leading-relaxed`}>
                Connect directly with experienced tailors. Browse specialist skills, review previous work, and initiate consultations for custom garments tailored to your lifestyle.
              </p>
            </div>
            <FaCalendarCheck className="absolute -bottom-8 -right-8 text-[180px] text-amber-500/10 group-hover:scale-105 transition-transform duration-500" />
          </div>

          <div className={`p-10 rounded-[2.5rem] ${theme.card} border flex flex-col justify-between group`}>
            <div>
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:rotate-6 transition-transform shadow-lg shadow-amber-500/20">
                <FaComments className="text-2xl" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3">Direct Collaboration</h3>
              <p className={`${theme.textMuted} text-sm leading-relaxed`}>
                Share design references, discuss fabric preferences, and receive fitting progress updates straight from your artisan.
              </p>
            </div>
          </div>

          <div className={`p-10 rounded-[2.5rem] ${theme.card} border flex flex-col justify-between group`}>
            <div>
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:rotate-6 transition-transform shadow-lg shadow-amber-500/20">
                <FaMagic className="text-2xl" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3">Smart Matching</h3>
              <p className={`${theme.textMuted} text-sm leading-relaxed`}>
                Our intelligent discovery pairs your preferred aesthetic, garment type, and fit requirements with compatible tailors.
              </p>
            </div>
          </div>

          <div className={`md:col-span-2 p-10 lg:p-12 rounded-[2.5rem] ${theme.card} border flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden`}>
            <div className="relative z-10 max-w-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600">
                  <FaGlobeAmericas className="text-xl" />
                </div>
                <h4 className="text-2xl font-serif font-bold">Craftsmanship Hub</h4>
              </div>
              <p className={`${theme.textMuted} text-sm leading-relaxed`}>
                Discover distinct tailoring traditions and specialized craftsmanship. From bespoke formalwear to everyday modern fits.
              </p>
            </div>
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-bold text-xs uppercase tracking-wider shrink-0 hover:shadow-lg hover:shadow-amber-500/25 transition-all"
            >
              Join AtelierSync
            </button>
          </div>
        </div>
      </section>

      <section className="py-28 px-6 relative border-t border-amber-200/50">
        <div className="max-w-5xl mx-auto">
          <div className="relative p-[1px] rounded-[3rem] bg-gradient-to-br from-amber-400 via-orange-400 to-amber-200 shadow-2xl shadow-amber-500/10">
            <div className={`p-8 md:p-16 rounded-[3rem] ${isDark ? "bg-[#0c0d12]" : "bg-white"} flex flex-col md:flex-row items-center gap-12`}>
              <div className="relative group shrink-0">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-[2.5rem] bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 border border-amber-300 flex items-center justify-center relative z-10 shadow-2xl shadow-amber-500/30">
                  <FaCut className="text-7xl text-white -rotate-12" />
                </div>
              </div>

              <div className="flex-1 space-y-8">
                <div>
                  <span className="text-amber-600 text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">
                    Founder & Visionary
                  </span>
                  <h2 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight">Ishan Garg</h2>
                  <p className={`text-base italic font-light ${theme.textMuted} mt-2`}>
                    "Building digital bridges to connect timeless craftsmanship with modern wardrobes."
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-8 pt-6 border-t border-amber-100">
                  <div className="space-y-1.5">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">Institution</p>
                    <p className="text-sm font-bold">Punjab Engineering College</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">Contact Inquiry</p>
                    <div className="space-y-1 text-xs font-semibold">
                      <a href="mailto:ishangarg.2006@gmail.com" className="flex items-center gap-2 hover:text-amber-600 transition-colors">
                        <FaEnvelope className="text-amber-500" />
                        <span>ishangarg.2006@gmail.com</span>
                      </a>
                      <a href="tel:7710127740" className="flex items-center gap-2 hover:text-amber-600 transition-colors">
                        <FaPhoneAlt className="text-amber-500" />
                        <span>+91 77101-27740</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 text-center border-t border-amber-200/60 bg-amber-50/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <FaCut className="text-amber-600 text-sm" />
            <span className="font-serif font-bold tracking-tight text-sm">AtelierSync</span>
          </div>

          <p className={`text-[11px] ${theme.textMuted}`}>
            © 2026 AtelierSync. Crafted for artisans & clothing enthusiasts.
          </p>

          <div className="flex gap-6 text-xs font-bold">
            <button onClick={() => navigate("/signup")} className="hover:text-amber-600 transition-colors">Sign Up</button>
            <button onClick={() => navigate("/login")} className="hover:text-amber-600 transition-colors">Log In</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;