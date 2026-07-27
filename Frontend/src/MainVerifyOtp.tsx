import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 
import { FaEnvelope, FaKey, FaMoon, FaSun, FaArrowLeft, FaShieldAlt, FaCut } from "react-icons/fa";

const MainVerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(false);

  const emailFromSignup = location.state?.email || "";
  const roleFromSignup = location.state?.role || ""; 

  const [email] = useState(emailFromSignup);
  const [otp, setOtp] = useState("");

  const theme = {
    canvas: isDark ? "bg-[#050505] text-[#e5e5e5]" : "bg-[#fbf9f5] text-[#1a1a1a]",
    card: isDark 
      ? "bg-white/[0.03] border-white/[0.08] backdrop-blur-3xl shadow-2xl" 
      : "bg-white/80 border-black/[0.08] shadow-2xl backdrop-blur-3xl",
    textMuted: isDark ? "text-zinc-500" : "text-zinc-600",
    inputBorder: isDark ? "border-white/10 focus:border-[#d4af37]" : "border-black/15 focus:border-[#d4af37]",
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://tailor-project-backend.vercel.app/user/verify-otp", {
        email,
        otp,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      const activeRole = response.data.role || roleFromSignup;
      if (activeRole) {
        localStorage.setItem("role", activeRole);
      }

      alert(response.data.msg || "Verification successful!");

      if (response.data.token) {
        if (activeRole === "tailor") {
          navigate("/tailor");
        } else {
          navigate("/user");
        }
      } else {
        navigate("/login");
      }

    } catch (error: any) {
      alert(error.response?.data?.msg || "Verification failed");
    }
  };

  return (
    <div className={`min-h-screen ${theme.canvas} transition-colors duration-1000 flex items-center justify-center p-4 md:p-8 overflow-hidden relative font-sans selection:bg-[#d4af37]/30`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif !important; }
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif !important; }
      `}</style>
      
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none z-[100] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className={`absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 ${isDark ? "bg-[#d4af37]" : "bg-[#d4af37]/40"}`} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative w-full max-w-xl ${theme.card} border rounded-[3rem] overflow-hidden z-10 p-8 md:p-16`}
      >
        <FaCut className="absolute -top-10 -right-10 text-[200px] opacity-[0.02] rotate-45 pointer-events-none" />

        <div className="absolute top-8 right-8">
          <button 
            onClick={() => setIsDark(!isDark)}
            className={`p-3 rounded-xl border transition-all ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'}`}
          >
            {isDark ? <FaSun className="text-[#d4af37] text-xs" /> : <FaMoon className="text-zinc-600 text-xs" />}
          </button>
        </div>

        <button 
          onClick={() => navigate(-1)} 
          className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] ${theme.textMuted} hover:text-[#d4af37] transition-colors mb-16`}
        >
          <FaArrowLeft className="text-[8px]" /> Return to Studio
        </button>

        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
             <div className="h-[1px] w-8 bg-[#d4af37]" />
             <span className="text-[10px] font-bold tracking-[0.4em] text-[#d4af37] uppercase">Identity Check</span>
          </div>
          <h2 className={`text-5xl md:text-7xl font-serif tracking-tighter leading-tight`}>
            Verify<br />
            <span className="italic font-light opacity-40">Identity</span>
          </h2>
        </div>

        <form onSubmit={handleVerify} className="space-y-14 relative z-10">
          <div className="relative group opacity-80">
            <label className="text-[9px] font-black uppercase tracking-[0.4em] mb-3 block opacity-40">
              Authentication Path
            </label>
            <div className={`relative flex items-center border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
              <FaEnvelope className="absolute left-0 text-[#d4af37] text-xs opacity-60" />
              <input
                type="email"
                value={email}
                disabled
                className="w-full bg-transparent py-4 pl-8 text-xs tracking-widest font-light outline-none cursor-not-allowed lowercase"
              />
            </div>
          </div>

          <div className="relative group">
            <div className="flex justify-between items-center mb-3">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-[#d4af37]">
                Atelier Passcode
              </label>
              <span className="text-[8px] font-bold text-[#d4af37] animate-pulse uppercase tracking-widest">Awaiting Transmission</span>
            </div>
            
            <div className={`relative flex items-center border-b ${theme.inputBorder} transition-all duration-700`}>
              <FaKey className="absolute left-0 text-xs opacity-40 text-[#d4af37]" />
              <input
                type="text"
                maxLength={6}
                required
                placeholder="0 0 0 0 0 0"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={`w-full bg-transparent py-6 pl-10 text-4xl tracking-[0.6em] font-serif outline-none placeholder:opacity-10 ${isDark ? 'text-white' : 'text-black'}`}
              />
            </div>
            
            <div className="flex justify-end mt-6">
              <button type="button" className="text-[9px] font-black uppercase text-[#d4af37] hover:tracking-[0.2em] transition-all opacity-60 hover:opacity-100 tracking-widest border-b border-[#d4af37]/20 pb-1">
                Resend Code
              </button>
            </div>
          </div>

          <div className="pt-8">
            <motion.button 
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              type="submit" 
              className="w-full group relative py-6 overflow-hidden rounded-2xl bg-[#d4af37] text-black font-bold text-[11px] uppercase tracking-[0.6em] shadow-[0_20px_40px_rgba(212,175,55,0.2)] transition-all"
            >
              <div className="flex items-center justify-center gap-4">
                <span>Authorize Access</span>
              </div>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
            </motion.button>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
              <FaShieldAlt className="text-[#d4af37] text-[10px] opacity-40" />
              <span className="text-[8px] font-bold uppercase tracking-[0.5em] opacity-20">
                End-to-End Encrypted Verification
              </span>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default MainVerifyOtp;