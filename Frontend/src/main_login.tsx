import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSun, FaMoon, FaCut, FaArrowRight, FaShieldAlt, FaFingerprint } from "react-icons/fa";

interface LoginState { email: string; password: string; showPassword: boolean; }

const MainLogin = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);
  const [form, setForm] = useState<LoginState>({
    email: "",
    password: "",
    showPassword: false,
  });

  const theme = {
    canvas: isDark ? "bg-[#050505] text-[#e5e5e5]" : "bg-[#faf9f7] text-[#1a1a1a]",
    card: isDark 
      ? "bg-white/[0.02] border-white/[0.08] backdrop-blur-3xl" 
      : "bg-white border-black/[0.05] shadow-2xl backdrop-blur-3xl",
    textMuted: isDark ? "text-zinc-500" : "text-slate-400",
    input: `w-full bg-transparent border-b py-4 text-sm font-light outline-none transition-all duration-500 focus:scale-[1.01]`,
    inputBorder: isDark ? "border-white/10 focus:border-[#d4af37]" : "border-black/10 focus:border-[#d4af37]",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    try {
      const response = await axios.post("https://tailor-project-backend.vercel.app/user/login", 
        { email: form.email, password: form.password },
        { headers: { "Content-Type": "application/x-www-form-urlencoded", authorization: `Bearer ${token}` } }
      );
      alert(response.data.msg);
      const role = localStorage.getItem("role");
      role === "tailor" ? navigate("/tailor") : navigate("/user");
    } catch (error: any) {
      alert(error.response?.data?.msg || "Login Failed");
    }
  };

  return (
    <div className={`min-h-screen ${theme.canvas} transition-colors duration-1000 flex items-center justify-center p-4 md:p-8 overflow-hidden relative font-sans selection:bg-[#d4af37]/30`}>
      
      {/* Texture Overlays */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-[100] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Radial Glows */}
      <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 ${isDark ? "bg-[#d4af37]/10" : "bg-[#d4af37]/20"}`} />

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`relative w-full max-w-6xl ${theme.card} border rounded-[2.5rem] overflow-hidden flex flex-col lg:grid lg:grid-cols-12 z-10`}
      >
        
        {/* Toggle Theme */}
        <div className="absolute top-8 right-8 z-50">
          <button onClick={() => setIsDark(!isDark)} className={`p-3 rounded-xl border transition-all ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'}`}>
            {isDark ? <FaSun className="text-[#d4af37]" /> : <FaMoon className="text-zinc-600" />}
          </button>
        </div>

        {/* LEFT PANEL: Rich Branding & Content */}
        <div className={`lg:col-span-5 p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r ${isDark ? 'border-white/5 bg-white/[0.01]' : 'border-black/5 bg-black/[0.01]'}`}>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-16">
              <div className="w-12 h-12 bg-[#d4af37] rounded-2xl flex items-center justify-center shadow-[0_10px_25px_rgba(212,175,55,0.3)]">
                <FaCut className="text-black text-lg" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tighter uppercase">Atelier<span className="font-light opacity-40">Sync</span></span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-serif leading-[1] tracking-tighter mb-8">
              Refined <br />
              <span className="italic font-light opacity-30">Access.</span>
            </h1>

            {/* Added Content to fill space */}
            <div className="space-y-6 mt-12">
              {[
                { icon: <FaShieldAlt />, title: "Encrypted Studio", desc: "End-to-end craft security" },
                { icon: <FaFingerprint />, title: "Identity Verified", desc: "Bespoke access protocols" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="text-[#d4af37] text-lg opacity-60 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.title}</h4>
                    <p className={`text-[10px] ${theme.textMuted}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 pt-12">
             <div className="h-[1px] w-12 bg-[#d4af37] mb-6" />
             <p className={`text-[11px] font-medium leading-relaxed tracking-widest uppercase opacity-40 max-w-xs`}>
               The digital loom for the modern master.
             </p>
          </div>

          {/* Background Decorative Icon */}
          <FaCut className="absolute -bottom-16 -left-16 text-[300px] opacity-[0.03] -rotate-12 pointer-events-none" />
        </div>

        {/* RIGHT PANEL: Focused Form */}
        <div className="lg:col-span-7 p-10 lg:p-24 flex flex-col justify-center relative">
          
          {/* Subtle pattern for the right side */}
          <div className={`absolute inset-0 opacity-[0.03] pointer-events-none ${isDark ? 'invert' : ''}`} 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
          />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-12">
            <div className="space-y-10">
              {/* Identity Key */}
              <div className="relative group">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 mb-3 block">Authorization ID</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-0 top-4 text-[#d4af37] opacity-40 group-focus-within:opacity-100 transition-opacity" />
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="EMAIL@ATELIER.COM"
                    className={`${theme.input} ${theme.inputBorder} pl-10 text-xs tracking-[0.1em]`}
                  />
                </div>
              </div>

              {/* Passcode */}
              <div className="relative group">
                <div className="flex justify-between items-end mb-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 block">Secure Passcode</label>
                  <button type="button" className="text-[9px] font-bold uppercase tracking-widest text-[#d4af37] hover:tracking-[0.2em] transition-all">Reset Key</button>
                </div>
                <div className="relative">
                  <FaLock className="absolute left-0 top-4 text-[#d4af37] opacity-40 group-focus-within:opacity-100 transition-opacity" />
                  <input
                    name="password"
                    type={form.showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    className={`${theme.input} ${theme.inputBorder} pl-10 pr-12`}
                  />
                  <button 
                    type="button" 
                    onClick={() => setForm(p => ({...p, showPassword: !p.showPassword}))} 
                    className="absolute right-0 top-4 opacity-40 hover:text-[#d4af37] transition-colors"
                  >
                    {form.showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <motion.button 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                type="submit" 
                className="w-full group relative py-6 overflow-hidden rounded-2xl bg-[#d4af37] text-black font-bold text-[10px] uppercase tracking-[0.6em] shadow-[0_20px_40px_rgba(212,175,55,0.2)] transition-all"
              >
                <div className="flex items-center justify-center gap-4">
                  <span>Open Atelier</span>
                  <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                </div>
                
                {/* Button Shine Effect */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
              </motion.button>
              
              <div className="mt-10 flex items-center justify-center gap-4">
                <div className="h-[1px] w-8 bg-current opacity-10" />
                <span className="text-[9px] font-bold tracking-[0.3em] opacity-20 uppercase">End of Transmission</span>
                <div className="h-[1px] w-8 bg-current opacity-10" />
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default MainLogin;